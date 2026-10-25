export const SUBJECTS = [
  {
    id: "ai",
    shortName: "AI & SC",
    fullName: "Artificial Intelligence & Soft Computing",
    code: "",
    icon: "",
    status: "active",
    badge: "8 Practicals Ready",
    tagline: "Find it. Open it. Copy it.",
    description: "Core search algorithms, Minimax, Generative AI models, RAG pipelines, and soft computing neural network simulations.",
    experimentsCount: 14,
    accentColor: "#2563eb"
  },
  {
    id: "asdd",
    shortName: "ASDD",
    fullName: "Agile Software Development & DevOps",
    code: "",
    icon: "",
    status: "active",
    badge: "4 Practicals",
    tagline: "Git Version Control, CI/CD with GitHub Actions & Jenkins, Jira Scrum, and Docker.",
    description: "Hands-on DevOps & Agile practicals including Git repository management, automated CI/CD pipelines, Jira Scrum project workflows, and Java Docker containerization.",
    experimentsCount: 4,
    accentColor: "#ea580c"
  },
  {
    id: "smlds",
    shortName: "SMLDS",
    fullName: "Statistical Machine Learning & Data Science",
    code: "",
    icon: "",
    status: "upcoming",
    badge: "Content Upcoming",
    tagline: "Statistical modeling & data science pipelines in preparation.",
    description: "Exploratory data analysis, supervised and unsupervised statistical learning, regression diagnostics, PCA, and classification models.",
    accentColor: "#7c3aed",
    plannedExperiments: [
      { id: 1, title: "Data Preprocessing, Handling Missing Values & Feature Scaling", tools: "Python · Pandas · Seaborn", type: "Data Prep" },
      { id: 2, title: "Simple & Multiple Linear Regression with Residual Diagnostics", tools: "Python · Scikit-Learn · Statsmodels", type: "Regression" },
      { id: 3, title: "Logistic Regression & ROC-AUC Classification Metrics", tools: "Python · Scikit-Learn", type: "Classification" },
      { id: 4, title: "K-Nearest Neighbors (KNN) Classifier with Distance Metrics", tools: "Python · NumPy · Scikit-Learn", type: "Supervised" },
      { id: 5, title: "Decision Tree Classifier & Information Gain Calculation", tools: "Python · Scikit-Learn · Graphviz", type: "Tree Models" },
      { id: 6, title: "Ensemble Methods: Random Forest & Gradient Boosting Classifier", tools: "Python · Scikit-Learn", type: "Ensemble" },
      { id: 7, title: "Principal Component Analysis (PCA) for Dimensionality Reduction", tools: "Python · Matplotlib", type: "Unsupervised" },
      { id: 8, title: "K-Means & Hierarchical Agglomerative Clustering", tools: "Python · Scikit-Learn", type: "Clustering" },
      { id: 9, title: "Naive Bayes Classification for Text & Categorical Datasets", tools: "Python · Scikit-Learn", type: "Bayesian" },
      { id: 10, title: "Time Series Modeling using ARIMA & Exponential Smoothing", tools: "Python · Statsmodels", type: "Time Series" }
    ],
    curriculumSummary: "Curriculum covers statistical hypothesis tests, linear/logistic regression, tree-based models, clustering techniques, dimensionality reduction, and evaluation metrics."
  },
  {
    id: "mdm",
    shortName: "MDM",
    fullName: "Master Data Management",
    code: "",
    icon: "",
    status: "upcoming",
    badge: "Content Upcoming",
    tagline: "Enterprise data governance & golden record systems in preparation.",
    description: "Enterprise single-source-of-truth architectures, probabilistic record linkage, deduplication algorithms, data quality auditing, and schema governance.",
    accentColor: "#059669",
    plannedExperiments: [
      { id: 1, title: "Master Data Entity Modeling & Schema Architecture Design", tools: "ER Modeling · PostgreSQL", type: "Architecture" },
      { id: 2, title: "Data Profiling, Completeness Auditing & Anomaly Detection", tools: "Python · Great Expectations", type: "Data Quality" },
      { id: 3, title: "Deterministic Exact-Match Deduplication Pipeline", tools: "SQL · Python", type: "Deduplication" },
      { id: 4, title: "Probabilistic Record Linkage & Fuzzy String Matching (Levenshtein / Jaro-Winkler)", tools: "RecordLinkage · FuzzyWuzzy", type: "Matching" },
      { id: 5, title: "Golden Record Creation & Survivorship Rules Implementation", tools: "Python Engine · SQL", type: "Golden Record" },
      { id: 6, title: "Address Standardization, Cleansing & Geo-enrichment", tools: "Geocoding API · Python", type: "Data Cleansing" },
      { id: 7, title: "Data Lineage Tracking & Enterprise Metadata Cataloging", tools: "OpenLineage · DataHub", type: "Governance" },
      { id: 8, title: "Master Data Change Request (MDCR) Workflow & Audit Trail", tools: "BPMN · Node/Python Engine", type: "Workflows" },
      { id: 9, title: "MDM REST API Integration for ERP & CRM System Synchronization", tools: "FastAPI · JSON Schema", type: "Integration" },
      { id: 10, title: "Data Privacy Masking, Anonymization & Governance Compliance", tools: "Faker · Hash Utilities", type: "Compliance" }
    ],
    curriculumSummary: "Focuses on master data models, deterministic & probabilistic entity resolution, golden record survivorship, data quality scorecards, and regulatory compliance."
  }
];
