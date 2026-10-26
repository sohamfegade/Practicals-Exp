import { useState, useMemo } from "react";
import aiExperiments from "./data/experiments.json";
import asddExperiments from "./data/asdd_experiments.json";
import { SUBJECTS } from "./data/subjects";
import "./style.css";

const EXPERIMENTS_MAP = {
  ai: aiExperiments,
  asdd: asddExperiments,
};

function App() {
  const [activeSubjectId, setActiveSubjectId] = useState("ai"); // Default to first tab (AI & SC)
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [cardFilter, setCardFilter] = useState("all");
  const [copiedKey, setCopiedKey] = useState(null);
  const [notifyModalOpen, setNotifyModalOpen] = useState(false);
  const [notifiedEmail, setNotifiedEmail] = useState("");
  const [notificationSent, setNotificationSent] = useState(false);

  const currentSubject = useMemo(
    () => SUBJECTS.find((s) => s.id === activeSubjectId) || SUBJECTS[0],
    [activeSubjectId]
  );

  const currentSubjectExperiments = useMemo(
    () => EXPERIMENTS_MAP[activeSubjectId] || [],
    [activeSubjectId]
  );

  const selected = useMemo(
    () => currentSubjectExperiments.find((item) => item.id === selectedId),
    [currentSubjectExperiments, selectedId]
  );

  const displayedVariants = useMemo(() => {
    if (!selected?.variants || selected.variants.length === 0) return [];
    if (cardFilter === "all") return selected.variants;
    return selected.variants.filter((v) => v.id === cardFilter);
  }, [selected, cardFilter]);

  // Filtered experiments for active subject
  const filteredExperiments = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return currentSubjectExperiments;
    return currentSubjectExperiments.filter((item) => {
      const variantsText = item.variants
        ? item.variants.map((v) => `${v.label} ${v.badge} ${v.filename}`).join(" ")
        : "";
      return `${item.id} ${item.name} ${item.language} ${item.problemStatement || ""} ${variantsText}`
        .toLowerCase()
        .includes(q);
    });
  }, [currentSubjectExperiments, query]);

  // Filtered planned experiments for upcoming subjects (SMLDS, MDM)
  const filteredPlannedExperiments = useMemo(() => {
    if (!currentSubject.plannedExperiments) return [];
    const q = query.trim().toLowerCase();
    if (!q) return currentSubject.plannedExperiments;
    return currentSubject.plannedExperiments.filter((item) =>
      `${item.id} ${item.title} ${item.tools} ${item.type}`.toLowerCase().includes(q)
    );
  }, [currentSubject, query]);

  function handleTabChange(subjectId) {
    setActiveSubjectId(subjectId);
    setSelectedId(null);
    setCardFilter("all");
    setQuery("");
    setCopiedKey(null);
  }

  async function copyText(text, key) {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      window.setTimeout(() => setCopiedKey(null), 1600);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      const ok = document.execCommand("copy");
      textarea.remove();
      if (ok) {
        setCopiedKey(key);
        window.setTimeout(() => setCopiedKey(null), 1600);
      }
    }
  }

  function handleNotifySubmit(e) {
    e.preventDefault();
    if (!notifiedEmail.trim()) return;
    setNotificationSent(true);
    setTimeout(() => {
      setNotifyModalOpen(false);
      setNotificationSent(false);
      setNotifiedEmail("");
    }, 2200);
  }

  const hasActiveExperiments = currentSubjectExperiments.length > 0;

  return (
    <div className="shell">
      {/* Top Header */}
      <header className="topbar">
        <button
          className="brand"
          onClick={() => {
            setActiveSubjectId("ai");
            setSelectedId(null);
          }}
          aria-label="OmniLab Hub Home"
        >
          <div className="brand-logo">
            <span className="logo-symbol">⬡</span>
          </div>
          <div className="brand-text">
            <span className="brand-name">OmniLab <span className="hub-text">Hub</span></span>
            <span className="brand-tag">Multi-Subject Practical Portal</span>
          </div>
        </button>

        <div className="topbar-right">
          <span className="semester-badge">Semester 6 Practicals</span>
          <div className="subject-counter">
            <span className="live-dot"></span>
            <span>4 Subjects</span>
          </div>
        </div>
      </header>

      {/* Navigation Subject Tabs */}
      <nav className="subject-tabs-nav" aria-label="Practical Subjects">
        <div className="tabs-container">
          {SUBJECTS.map((subject) => {
            const isActive = subject.id === activeSubjectId;
            return (
              <button
                key={subject.id}
                className={`subject-tab ${isActive ? "active" : ""} ${subject.status}`}
                onClick={() => handleTabChange(subject.id)}
                aria-selected={isActive}
                role="tab"
              >
                <span className="tab-icon">{subject.icon}</span>
                <span className="tab-label">{subject.shortName}</span>
                <span className={`tab-badge ${subject.status}`}>
                  {subject.badge}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="main-content">
        {hasActiveExperiments ? (
          !selected ? (
            <>
              {/* Hero Section for Subjects with Practicals */}
              <section className="hero">
                <div className="hero-badge-wrap">
                  <span className="course-chip">
                    <span className="chip-dot active"></span>
                    {currentSubject.code} · {currentSubject.fullName}
                  </span>
                </div>
                <h1>Find it. Open it. Copy it.</h1>
                <p className="subhead">
                  {currentSubject.tagline} {currentSubject.description}
                </p>

                <div className="search-wrapper">
                  <label className="search">
                    <span className="search-icon" aria-hidden="true">⌕</span>
                    <input
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder={`Search ${currentSubject.shortName} experiments (e.g., Git, Docker, Jira, CI/CD)...`}
                      aria-label="Search experiments"
                    />
                    {query && (
                      <button
                        className="clear-search"
                        onClick={() => setQuery("")}
                        aria-label="Clear search"
                      >
                        ×
                      </button>
                    )}
                  </label>
                </div>

                <div className="meta-stats">
                  <span className="stat-pill">
                    <strong>{currentSubjectExperiments.length}</strong> Complete Practical Entries
                  </span>
                  <span className="bullet">·</span>
                  <span className="stat-pill"><strong>Distinct</strong> Commands &amp; Source Files</span>
                  <span className="bullet">·</span>
                  <span className="stat-pill">Ready for Lab Submissions &amp; Viva</span>
                </div>
              </section>

              {/* Experiments List (Clean 4 experiments for ASDD) */}
              <section className="list-section">
                <div className="section-heading">
                  <div>
                    <h2>Available Experiments ({currentSubjectExperiments.length})</h2>
                    <p className="section-subtext">
                      Click any experiment below to view its tasks, terminal commands, files, and expected outputs
                    </p>
                  </div>
                  <span className="count-pill">
                    {filteredExperiments.length} of {currentSubjectExperiments.length} shown
                  </span>
                </div>

                <div className="experiment-list">
                  {filteredExperiments.map((item) => (
                    <button
                      className="experiment-card"
                      key={item.id}
                      onClick={() => {
                        setSelectedId(item.id);
                        setCardFilter("all");
                        setCopiedKey(null);
                      }}
                    >
                      <span className="number">
                        {String(item.id).padStart(2, "0")}
                      </span>
                      <div className="exp-info">
                        <strong>{item.name}</strong>
                        {item.problemStatement && (
                          <span className="exp-problem-snippet">
                            {item.problemStatement}
                          </span>
                        )}
                        {item.variants && item.variants.length > 0 && (
                          <div className="exp-variants-pills">
                            <span className="v-pill-label">Code Options:</span>
                            {item.variants.map((v) => (
                              <span key={v.id} className="v-pill">
                                {v.icon} {v.label}
                              </span>
                            ))}
                          </div>
                        )}
                        <div className="exp-meta">
                          <span className="lang-tag">{item.language}</span>
                          <span className="status-indicator ready">● Verified Answer &amp; Code</span>
                        </div>
                      </div>
                      <span className="arrow" aria-hidden="true">→</span>
                    </button>
                  ))}

                  {filteredExperiments.length === 0 && (
                    <div className="empty">
                      <div className="empty-icon">🔍</div>
                      <p>No practicals match <strong>“{query}”</strong>.</p>
                      <button className="reset-btn" onClick={() => setQuery("")}>
                        Clear search filter
                      </button>
                    </div>
                  )}
                </div>
              </section>
            </>
          ) : (
            /* Selected Experiment Detail View */
            <section className="detail">
              <button
                className="back"
                onClick={() => {
                  setSelectedId(null);
                  setCardFilter("all");
                  setCopiedKey(null);
                }}
              >
                ← Back to all {currentSubject.shortName} experiments
              </button>

              <div className="detail-header-card">
                <div className="detail-title">
                  <span className="number large">
                    {String(selected.id).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="eyebrow">
                      EXPERIMENT {selected.id} · {currentSubject.shortName}
                    </p>
                    <h1>{selected.name}</h1>
                    <div className="detail-badges">
                      <span className="language">{selected.language}</span>
                      <span className="subject-tag">{currentSubject.fullName}</span>
                    </div>
                  </div>
                </div>

                {/* Problem Statement Card */}
                {selected.problemStatement && (
                  <div className="problem-statement-card">
                    <div className="ps-header">
                      <span className="ps-badge">Problem Statement</span>
                    </div>
                    <p className="ps-text">{selected.problemStatement}</p>
                  </div>
                )}

                {/* Tasks to Perform Checklist */}
                {selected.tasks && selected.tasks.length > 0 && (
                  <div className="tasks-card">
                    <div className="tasks-header">
                      <strong>Tasks to Perform</strong>
                      <span className="tasks-count">{selected.tasks.length} Tasks</span>
                    </div>
                    <ul className="tasks-checklist">
                      {selected.tasks.map((task, idx) => (
                        <li key={idx}>
                          <span className="task-step-num">{idx + 1}</span>
                          <span className="task-step-desc">{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Quick Master Copy Bar for ASDD */}
                {selected.fullScript && (
                  <div className="master-copy-bar">
                    <div className="master-copy-info">
                      <span className="master-copy-icon">⚡</span>
                      <div>
                        <strong>Copy Complete Experiment Answer</strong>
                        <p>Copies all commands, configs, and conclusions into your clipboard at once.</p>
                      </div>
                    </div>
                    <button
                      className={`copy-button master ${copiedKey === "full" ? "copied" : ""}`}
                      onClick={() => copyText(selected.fullScript, "full")}
                    >
                      {copiedKey === "full" ? "✓ All Copied!" : "Copy Full Answer"}
                    </button>
                  </div>
                )}

                {/* Quick 1-Click Copy Bar for Code Variants (BFS, DFS, Both) */}
                {selected.variants && selected.variants.length > 0 && (
                  <div className="variants-master-bar">
                    <div className="variants-bar-header">
                      <span className="variants-spark-icon">⚡</span>
                      <div className="variants-bar-title-text">
                        <strong>1-Click Quick Copy &amp; Jump</strong>
                        <p>Instantly copy the required Prolog code directly to your clipboard or jump to its card below:</p>
                      </div>
                    </div>
                    <div className="variants-quick-buttons">
                      {selected.variants.map((v) => {
                        const isCopied = copiedKey === `quick-${v.id}`;
                        return (
                          <button
                            key={v.id}
                            className={`variant-quick-btn ${isCopied ? "copied" : ""}`}
                            onClick={() => {
                              copyText(v.code, `quick-${v.id}`);
                              const el = document.getElementById(`card-${v.id}`);
                              if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                            }}
                            title={`Copy ${v.label} code`}
                            type="button"
                          >
                            <span className="v-btn-icon">{v.icon}</span>
                            <span className="v-btn-text">
                              {isCopied ? `✓ Copied ${v.label}!` : `Copy ${v.label}`}
                            </span>
                            <span className="v-btn-badge">{v.badge}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* RENDER STRUCTURED STEPS (Distinguishing Commands vs File Code vs Output vs GUI) */}
              {selected.steps && selected.steps.length > 0 ? (
                <div className="structured-steps-container">
                  <div className="steps-section-title">
                    <h2>Step-by-Step Practical Execution Guide</h2>
                    <p>Commands to run in terminal and files to create are clearly separated below</p>
                  </div>

                  <div className="steps-list">
                    {selected.steps.map((st) => (
                      <div className="step-card" key={st.step}>
                        <div className="step-card-header">
                          <span className="step-badge">Step {st.step}</span>
                          <h3 className="step-card-title">{st.title}</h3>
                        </div>

                        {st.description && (
                          <p className="step-description">{st.description}</p>
                        )}

                        {/* 1. TERMINAL COMMANDS BLOCK */}
                        {st.commands && (
                          <div className="command-block">
                            <div className="block-toolbar command-toolbar">
                              <span className="block-label">
                                <span className="terminal-prompt">$</span> Command to run in Terminal / PowerShell
                              </span>
                              <button
                                className={`copy-btn-inline ${copiedKey === `cmd-${st.step}` ? "copied" : ""}`}
                                onClick={() => copyText(st.commands, `cmd-${st.step}`)}
                              >
                                {copiedKey === `cmd-${st.step}` ? "✓ Copied" : "Copy Command"}
                              </button>
                            </div>
                            <pre className="command-pre"><code>{st.commands}</code></pre>
                          </div>
                        )}

                        {/* 2. SOURCE FILE TO CREATE BLOCK */}
                        {st.file && (
                          <div className="file-block">
                            <div className="block-toolbar file-toolbar">
                              <span className="block-label">
                                <span className="file-icon">📄</span> File to create: <strong>{st.file.name}</strong>
                              </span>
                              <button
                                className={`copy-btn-inline file ${copiedKey === `file-${st.step}` ? "copied" : ""}`}
                                onClick={() => copyText(st.file.content, `file-${st.step}`)}
                              >
                                {copiedKey === `file-${st.step}` ? "✓ Copied File Content" : `Copy ${st.file.name}`}
                              </button>
                            </div>
                            <pre className="file-pre"><code>{st.file.content}</code></pre>
                            {st.commandTip && (
                              <div className="tip-box">
                                <span className="tip-icon">💡</span>
                                <span>{st.commandTip}</span>
                              </div>
                            )}
                          </div>
                        )}

                        {/* 3. EXPECTED OUTPUT BLOCK */}
                        {st.output && (
                          <div className="output-block">
                            <div className="block-toolbar output-toolbar">
                              <span className="block-label">
                                <span className="output-icon">🖥️</span> Expected Terminal / Console Output
                              </span>
                              <button
                                className={`copy-btn-inline output ${copiedKey === `out-${st.step}` ? "copied" : ""}`}
                                onClick={() => copyText(st.output, `out-${st.step}`)}
                              >
                                {copiedKey === `out-${st.step}` ? "✓ Copied Output" : "Copy Output"}
                              </button>
                            </div>
                            <pre className="output-pre"><code>{st.output}</code></pre>
                          </div>
                        )}

                        {/* 4. JIRA GUI INSTRUCTIONS */}
                        {st.guiSteps && (
                          <div className="gui-steps-card">
                            <div className="block-toolbar gui-toolbar">
                              <span className="block-label">
                                <span className="gui-icon">⚙️</span> Jira Workflow Instructions
                              </span>
                            </div>
                            <ol className="gui-list">
                              {st.guiSteps.map((gs, i) => (
                                <li key={i}>{gs}</li>
                              ))}
                            </ol>
                          </div>
                        )}

                        {/* 5. JIRA WORK ITEMS (Stories, Tasks, Bugs) */}
                        {st.items && (
                          <div className="work-items-grid">
                            {st.items.map((item, idx) => (
                              <div className={`work-item-card ${item.type.toLowerCase()}`} key={idx}>
                                <div className="work-item-header">
                                  <span className={`issue-pill ${item.type.toLowerCase()}`}>
                                    {item.type}
                                  </span>
                                  <span className="item-key">{item.key}</span>
                                  <span className={`priority-pill ${item.priority.toLowerCase().replace(/[^a-z]/g, "")}`}>
                                    {item.priority}
                                  </span>
                                </div>
                                <h4 className="work-item-summary">{item.summary}</h4>
                                <pre className="work-item-desc"><code>{item.description}</code></pre>
                                {item.acceptance && (
                                  <div className="item-acceptance">
                                    <strong>Acceptance Criteria:</strong>
                                    <pre><code>{item.acceptance}</code></pre>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        {/* 6. COMPARISON TABLE */}
                        {st.comparison && (
                          <div className="comparison-table-wrap">
                            <table className="comparison-table">
                              <thead>
                                <tr>
                                  <th>Feature</th>
                                  <th>GitHub Actions</th>
                                  <th>Jenkins</th>
                                </tr>
                              </thead>
                              <tbody>
                                {st.comparison.map((row, i) => (
                                  <tr key={i}>
                                    <td><strong>{row.feature}</strong></td>
                                    <td>{row.gha}</td>
                                    <td>{row.jenkins}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* CONCLUSION CARD */}
                  {selected.conclusion && (
                    <div className="conclusion-card">
                      <div className="conclusion-header">
                        <span className="conclusion-icon">📝</span>
                        <div className="conclusion-title">
                          <h3>Experiment Conclusion (Answer for Journal / Viva)</h3>
                          <p>Summary of operations performed, tools utilized, and outcomes achieved</p>
                        </div>
                        <button
                          className={`copy-btn-inline ${copiedKey === "conclusion" ? "copied" : ""}`}
                          onClick={() => copyText(selected.conclusion, "conclusion")}
                        >
                          {copiedKey === "conclusion" ? "✓ Copied Conclusion" : "Copy Conclusion"}
                        </button>
                      </div>
                      <p className="conclusion-text">{selected.conclusion}</p>
                    </div>
                  )}
                </div>
              ) : selected.variants && selected.variants.length > 0 ? (
                /* Multi-code cards section (BFS, DFS, Both in Exp 3) */
                <div className="separate-code-cards-section">
                  <div className="cards-filter-toolbar">
                    <div className="filter-toolbar-left">
                      <span className="cards-count-label">
                        Showing {displayedVariants.length} of {selected.variants.length} Code Cards
                      </span>
                    </div>
                    <div className="cards-filter-tabs">
                      <button
                        className={`cards-filter-tab ${cardFilter === "all" ? "active" : ""}`}
                        onClick={() => setCardFilter("all")}
                        type="button"
                      >
                        All Cards ({selected.variants.length})
                      </button>
                      {selected.variants.map((v) => (
                        <button
                          key={v.id}
                          className={`cards-filter-tab ${cardFilter === v.id ? "active" : ""}`}
                          onClick={() => setCardFilter(v.id)}
                          type="button"
                        >
                          <span>{v.icon}</span> {v.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="code-cards-stack">
                    {displayedVariants.map((v) => {
                      const cardIndex = selected.variants.findIndex((item) => item.id === v.id) + 1;
                      const isCopied = copiedKey === `card-${v.id}`;
                      return (
                        <div className="code-card-item" id={`card-${v.id}`} key={v.id}>
                          <div className="code-card-header">
                            <div className="code-card-title-group">
                              <span className="card-badge-num">Card 0{cardIndex}</span>
                              <span className="card-icon-big">{v.icon}</span>
                              <div className="card-title-meta">
                                <h3 className="code-card-title">{v.title}</h3>
                                <div className="code-card-tags">
                                  <span className="card-lang-tag">{selected.language}</span>
                                  <span className="card-filename-tag">{v.filename}</span>
                                  <span className="card-algo-tag">{v.badge}</span>
                                  {v.query && (
                                    <span className="card-query-tag">
                                      Query: <code>{v.query}</code>
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <button
                              className={`copy-button card-copy-btn ${isCopied ? "copied" : ""}`}
                              onClick={() => copyText(v.code, `card-${v.id}`)}
                              type="button"
                            >
                              {isCopied ? `✓ Copied ${v.label}!` : `Copy ${v.label} Code`}
                            </button>
                          </div>

                          {v.description && (
                            <p className="code-card-description">{v.description}</p>
                          )}

                          <div className="code-card-body">
                            <div className="code-card-topbar">
                              <div className="terminal-dots">
                                <span></span><span></span><span></span>
                              </div>
                              <span className="code-filename-disp">{v.filename}</span>
                              <span className="code-lines-count">{v.code.split("\n").length} lines</span>
                            </div>
                            <pre><code>{v.code}</code></pre>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {selected.note && (
                    <div className="note-card">
                      <span className="note-icon">💡</span>
                      <div className="note-content">
                        <strong>Exam &amp; Execution Note:</strong>
                        <p>{selected.note}</p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Fallback for single-code AI experiments */
                selected.code && (
                  <div className="code-panel">
                    <div className="code-toolbar">
                      <div className="toolbar-left">
                        <span className="terminal-dots">
                          <span></span><span></span><span></span>
                        </span>
                        <span className="code-filename">solution.py</span>
                      </div>
                      <button
                        className={`copy-button ${copiedKey === "ai-code" ? "copied" : ""}`}
                        onClick={() => copyText(selected.code, "ai-code")}
                      >
                        {copiedKey === "ai-code" ? "✓ Copied to Clipboard!" : "Copy Full Code"}
                      </button>
                    </div>
                    <pre><code>{selected.code}</code></pre>
                    {selected.note && (
                      <div className="note-card">
                        <span className="note-icon">💡</span>
                        <div className="note-content">
                          <strong>Exam &amp; Execution Note:</strong>
                          <p>{selected.note}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )
              )}
            </section>
          )
        ) : (
          /* Render UPCOMING SUBJECTS (SMLDS, MDM) */
          <section className="upcoming-section">
            <div className="upcoming-hero">
              <div className="upcoming-header-top">
                <span className="upcoming-subject-chip">
                  <span className="chip-icon">{currentSubject.icon}</span>
                  <span>{currentSubject.code}</span>
                  <span className="bullet">·</span>
                  <span>{currentSubject.fullName}</span>
                </span>
                <span className="status-badge-glow">
                  <span className="pulsing-dot"></span>
                  Content Upcoming
                </span>
              </div>

              <h1 className="upcoming-headline">
                {currentSubject.shortName} Practicals Are Coming Soon
              </h1>
              <p className="upcoming-tagline">
                {currentSubject.tagline}
              </p>
              <p className="upcoming-description">
                {currentSubject.description}
              </p>

              <div className="upcoming-actions">
                <button
                  className="btn-notify"
                  onClick={() => setNotifyModalOpen(true)}
                >
                  <span className="btn-icon">🔔</span>
                  Get Notified When Uploaded
                </button>
                <button
                  className="btn-switch-ai"
                  onClick={() => handleTabChange("asdd")}
                >
                  ⚡ View ASDD Practicals (4 Ready)
                </button>
                <button
                  className="btn-switch-ai"
                  onClick={() => handleTabChange("ai")}
                >
                  🤖 View AI Practicals (14 Ready)
                </button>
              </div>
            </div>

            {/* Preparation Roadmap */}
            <div className="roadmap-card">
              <h3 className="roadmap-title">Preparation &amp; Verification Roadmap</h3>
              <div className="roadmap-steps">
                <div className="roadmap-step completed">
                  <div className="step-circle">✓</div>
                  <div className="step-info">
                    <strong>1. Syllabus Analysis</strong>
                    <p>Curriculum topics and practical list mapped</p>
                  </div>
                </div>
                <div className="roadmap-step in-progress">
                  <div className="step-circle">⟳</div>
                  <div className="step-info">
                    <strong>2. Code Verification</strong>
                    <p>Transcribing &amp; testing scripts in Python / Docker</p>
                  </div>
                </div>
                <div className="roadmap-step pending">
                  <div className="step-circle">⏳</div>
                  <div className="step-info">
                    <strong>3. Production Release</strong>
                    <p>Copyable code &amp; viva notes deployment</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Planned Experiments List */}
            <div className="planned-curriculum-section">
              <div className="section-heading">
                <div>
                  <h2>Planned Practical Curriculum</h2>
                  <p className="section-subtext">
                    Estimated practical experiments scheduled for this lab course
                  </p>
                </div>
                <span className="count-pill">
                  {filteredPlannedExperiments.length} planned topics
                </span>
              </div>

              <div className="search-wrapper compact">
                <label className="search compact-search">
                  <span className="search-icon" aria-hidden="true">⌕</span>
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={`Search planned ${currentSubject.shortName} topics...`}
                    aria-label={`Search planned ${currentSubject.shortName} topics`}
                  />
                  {query && (
                    <button
                      className="clear-search"
                      onClick={() => setQuery("")}
                    >
                      ×
                    </button>
                  )}
                </label>
              </div>

              <div className="planned-grid">
                {filteredPlannedExperiments.map((exp) => (
                  <div className="planned-card" key={exp.id}>
                    <div className="planned-card-header">
                      <span className="planned-num">Exp {String(exp.id).padStart(2, "0")}</span>
                      <span className="planned-badge">{exp.type}</span>
                    </div>
                    <h3 className="planned-title">{exp.title}</h3>
                    <div className="planned-footer">
                      <span className="planned-tools">{exp.tools}</span>
                      <span className="upcoming-tag">Upcoming</span>
                    </div>
                  </div>
                ))}

                {filteredPlannedExperiments.length === 0 && (
                  <div className="empty">
                    <p>No planned practicals match “{query}”.</p>
                    <button className="reset-btn" onClick={() => setQuery("")}>
                      Clear filter
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Notification / Submit Modal */}
      {notifyModalOpen && (
        <div className="modal-backdrop" onClick={() => setNotifyModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setNotifyModalOpen(false)}
              aria-label="Close modal"
            >
              ×
            </button>
            {notificationSent ? (
              <div className="modal-success">
                <div className="success-icon">✓</div>
                <h3>Request Registered!</h3>
                <p>
                  Thank you! We will prioritize uploading <strong>{currentSubject.fullName} ({currentSubject.shortName})</strong> practicals.
                </p>
              </div>
            ) : (
              <form onSubmit={handleNotifySubmit}>
                <div className="modal-icon-badge">{currentSubject.icon}</div>
                <h3>{currentSubject.shortName} Practicals Alert</h3>
                <p className="modal-sub">
                  Enter your email or practical topic to get notified immediately once verified source codes are uploaded.
                </p>
                <div className="form-group">
                  <label htmlFor="user-email">Email or College ID</label>
                  <input
                    id="user-email"
                    type="text"
                    required
                    placeholder="student@university.edu"
                    value={notifiedEmail}
                    onChange={(e) => setNotifiedEmail(e.target.value)}
                  />
                </div>
                <div className="modal-buttons">
                  <button type="submit" className="modal-btn-submit">
                    Notify Me When Ready
                  </button>
                  <button
                    type="button"
                    className="modal-btn-cancel"
                    onClick={() => setNotifyModalOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-left">
            <strong>OmniLab Hub</strong> — Engineering Practical &amp; Viva Code Portal
            <span>Covering AI &amp; Soft Computing, ASDD, SMLDS, and MDM</span>
          </div>
          <div className="footer-right">
            <span>Runs 100% in browser</span>
            <span>·</span>
            <span>Fast 1-click code copying</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
