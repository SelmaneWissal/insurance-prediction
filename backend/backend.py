import sys
import joblib
import pandas as pd
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import os
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(current_dir)

from transformers import AddFeaturesTransformer
from dotenv import load_dotenv
import transformers
sys.modules['transformers'] = transformers

load_dotenv() 
frontend_url = os.getenv("FRONTEND_URL")


sys.modules['__main__'].AddFeaturesTransformer = AddFeaturesTransformer

model_path = os.path.join(current_dir, "insurance_random_forest_model.pkl")
try:
    model = joblib.load(model_path)
except Exception as e:
    print(f"Erreur chargement modèle : {e}")

app = FastAPI(title="API Prédiction Assurance")

class Assure(BaseModel):
    age: int
    sex: str
    bmi: float
    children: int
    smoker: str
    region: str

# Configuration CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"], 
    allow_headers=["*"],
)

@app.post("/predict")
def predict(assure: Assure):
    data = pd.DataFrame([{
        "age": float(assure.age),  
        "sex": assure.sex,
        "bmi": float(assure.bmi),  
        "children": int(assure.children),
        "smoker": assure.smoker,
        "region": assure.region
    }])

    try:
        prediction = model.predict(data)
        return {
            "charges_predites": round(float(prediction[0]), 2),
            "status": "success"
        }
    except Exception as e:
        print(f"ERREUR PREDICTION: {e}")
        return {"error": str(e), "status": "failed"}