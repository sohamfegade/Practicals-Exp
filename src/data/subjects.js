export const SUBJECTS = [
  {
    id: "mdm",
    shortName: "MDM",
    fullName: "Modern Digital Mobile Communication",
    code: "",
    icon: "",
    status: "active",
    badge: "10 Practicals",
    tagline: "Wireless Spectrum, Cellular Frequency Reuse in MATLAB/Python, Wi-Fi Scanning, Bluetooth & Path Loss.",
    description: "Hands-on wireless and mobile communication experiments covering EM spectrum allocation, Tx-Channel-Rx simulation, cellular frequency reuse visualization, Wi-Fi channel mapping, signal propagation vs distance, and Bluetooth throughput analysis.",
    experimentsCount: 10,
    accentColor: "#059669"
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
  }
];
