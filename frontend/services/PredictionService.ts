import { PatientProfile, PredictionResult } from "../types";

export class PredictionService {
  
  private readonly BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
  private readonly API_URL = `${this.BASE_URL}/predict`;

  async predictCharges(profile: PatientProfile): Promise<PredictionResult> {
    try {
      console.log("Envoi des données au backend :", profile);

      const response = await fetch(this.API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          age: Number(profile.age),
          sex: profile.sex,
          bmi: Number(profile.bmi),
          children: Number(profile.children),
          smoker: profile.smoker,
          region: profile.region
        })
      });

      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erreur serveur (${response.status}): ${errorText}`);
      }

      const data = await response.json();
      console.log("Réponse du backend :", data);

      if (data.error) {
        throw new Error(data.error);
      }

      
      const result: PredictionResult = {
        estimatedCharges: data.charges_predites || 0,
        riskIndex: this.calculateRiskIndex(profile),
        confidence: 87, 
        impactFactors: this.calculateImpactFactors(profile)
      };

      return result;

    } catch (error) {
      console.error("Erreur PredictionService :", error);
      throw error;
    }
  }

  private calculateRiskIndex(profile: PatientProfile): number {
    let risk = 20;
    if (profile.age > 50) risk += 20;
    if (profile.bmi > 30) risk += 20;
    if (profile.smoker === "yes") risk += 40;
    if (profile.children > 2) risk += 10;
    return Math.min(risk, 100);
  }

  private calculateImpactFactors(profile: PatientProfile) {
    return [
      { name: "Age", impact: profile.age > 50 ? 30 : 10 },
      { name: "BMI", impact: profile.bmi > 30 ? 25 : 10 },
      { name: "Smoking", impact: profile.smoker === "yes" ? 40 : 5 },
      { name: "Children", impact: profile.children > 2 ? 15 : 5 }
    ];
  }
}