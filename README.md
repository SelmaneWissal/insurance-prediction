# 🛡️ PredictCare PRO - Assisted Actuarial Intelligence

**PredictCare PRO** is a full-stack Machine Learning application designed to forecast annual medical insurance charges with high precision. By leveraging a robust **Random Forest Regressor**, the system transforms demographic and health-related data into actionable actuarial insights through a modern, responsive web interface.

---

## 🚀 Live Links
* **Web Interface:** [https://insurance-prediction-pi.vercel.app/](https://insurance-prediction-pi.vercel.app/)
* **Predictive API:** [https://wissalselmane-insurance-prediction-api.hf.space](https://wissalselmane-insurance-prediction-api.hf.space)

---

## 🛠️ Tech Stack

### **Data Science & Machine Learning**
* **Python**: Core programming language.
* **Scikit-Learn**: Used for the **Random Forest Regressor**, pipeline construction, and data preprocessing.
* **Pandas & NumPy**: For data manipulation and numerical analysis.
* **Matplotlib & Seaborn**: For exploratory data analysis (EDA) and model evaluation plots.

### **Backend Infrastructure**
* **FastAPI**: High-performance Python framework used to serve the predictive model.
* **Joblib**: For efficient serialization and loading of the trained ML model.
* **Hugging Face Spaces**: Cloud hosting for the Python backend and model.

### **Frontend Development**
* **React (TypeScript)**: For building a type-safe and interactive user interface.
* **Tailwind CSS**: For modern, responsive styling and layout.
* **Vite**: Next-generation frontend tooling for rapid development and optimized builds.
* **Vercel**: Deployment platform for the frontend application.

---

## 🧠 Machine Learning: The Random Forest Core
The engine of this project is a **Random Forest Regressor**, developed in the `InsurancePrediction.ipynb` notebook. This model was selected for its superior performance:

* **Ensemble Power**: By aggregating results from multiple decision trees, the model significantly reduces variance and eliminates the overfitting tendencies seen in single-tree models.
* **Target Optimization**: A **log-transformation** was applied to the `charges` variable during training. This crucial step normalized the skewed distribution of medical costs, allowing the model to predict high-value claims more accurately.
* **Feature Importance**: The training process highlights **Smoking Status**, **BMI**, and **Age** as the most influential variables in determining insurance premiums.
* **Custom Pipeline**: The deployment utilizes a specialized Scikit-Learn pipeline, including a custom `AddFeaturesTransformer` for automated feature engineering and preprocessing.



---

## 📁 Repository Structure
```text
.
├── backend/                  # Python FastAPI Backend
│   ├── backend.py            # API routes and server logic
│   ├── transformers.py       # Custom ML transformers (AddFeaturesTransformer)
│   ├── insurance_random_forest_model.pkl  # Trained Random Forest Model
│   └── requirements.txt      # Production environment dependencies
├── frontend/                 # React + TypeScript Frontend
│   ├── services/             # API Communication logic (PredictionService.ts)
│   ├── src/                  # Application source code
│   ├── public/               # Static assets and site favicon
│   ├── index.html            # Application entry point
│   └── package.json          # Frontend dependencies
├── training_model/ # Data Science notebook (EDA & Model Training)
└── README.md                 # Project documentation
