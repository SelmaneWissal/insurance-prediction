
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { PredictionService } from './services/PredictionService';
import { PatientProfile, PredictionResult } from './types';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<PatientProfile>({
    age: 30,
    bmi: 25.0,
    sex: 'male',
    children: 0,
    smoker: 'no',
    region: 'northeast'
  });
  const [result, setResult] = useState<PredictionResult | null>(null);

  const handlePredict = async () => {
    setLoading(true);
    try {
      const service = new PredictionService();
      const data = await service.predictCharges(profile);
      setResult(data);
    } catch (error) {
      console.error("Prediction failed", error);
      alert("Error connecting to Actuarial Intelligence system.");
    } finally {
      setLoading(false);
    }
  };
  const handleNumberChange = (
  field: keyof PatientProfile, 
  value: string, 
  min: number, 
  max: number
) => {
  let num = parseInt(value);
  
  // Si le champ est vide (pendant la saisie), on peut laisser 0 ou NaN temporairement
  if (isNaN(num)) num = min; 
  
  // On contraint la valeur entre les bornes min et max
  const validatedValue = Math.max(min, Math.min(max, num));
  
  setProfile({ ...profile, [field]: validatedValue });
};
  return (
    <div className="max-w-7xl mx-auto p-8 lg:p-12">
      {/* Header */}
      <header className="flex items-center gap-5 mb-12">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-900 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg shadow-blue-500/20">
          <i className="bi bi-shield-plus"></i>
        </div>
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 leading-tight">
            Predict<span className="text-blue-600">Care</span> <span className="text-slate-300 font-light">PRO</span>
          </h1>
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-400">Assisted Actuarial Intelligence</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Input Section - The "Glossy Brilliant" Card */}
        <section className="glossy-card rounded-[2.5rem] overflow-hidden flex flex-col">
          <div className="bg-slate-50/50 px-8 py-6 border-b border-slate-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 text-xl shadow-sm">
              <i className="bi bi-person-vcard-fill"></i>
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-800 leading-none">Patient File</h2>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Personal Information</p>
            </div>
          </div>

          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Age */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">
                  <i className="bi bi-person-fill text-blue-500"></i> Age
                </label>
                <input 
                  type="number" 
                  value={profile.age}
                  onChange={(e) => handleNumberChange('age', e.target.value, 1, 100)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-semibold text-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* BMI */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">
                  <i className="bi bi-speedometer2 text-blue-500"></i> BMI
                </label>
                <input 
                  type="number" 
                  step="0.1"
                  value={profile.bmi}
                  onChange={(e) => setProfile({...profile, bmi: parseFloat(e.target.value)})}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-semibold text-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* Sex */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">
                  <i className="bi bi-gender-ambiguous text-blue-500"></i> Sex
                </label>
                <select 
                  value={profile.sex}
                  onChange={(e) => setProfile({...profile, sex: e.target.value as any})}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-semibold text-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              {/* Children */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">
                  <i className="bi bi-people-fill text-blue-500"></i> Children
                </label>
                <input 
                  type="number" 
                  value={profile.children}
                  onChange={(e) => handleNumberChange('children', e.target.value, 0, 10)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-semibold text-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            {/* Smoker */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">
                <i className="bi bi-fire text-orange-500"></i> Smoking Status
              </label>
              <select 
                value={profile.smoker}
                onChange={(e) => setProfile({...profile, smoker: e.target.value as any})}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-semibold text-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              >
                <option value="no">Non-smoker</option>
                <option value="yes">Regular smoker</option>
              </select>
            </div>

            {/* Region */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">
                <i className="bi bi-geo-alt-fill text-blue-500"></i> Region
              </label>
              <select 
                value={profile.region}
                onChange={(e) => setProfile({...profile, region: e.target.value as any})}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-semibold text-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              >
                <option value="northeast">Northeast</option>
                <option value="northwest">Northwest</option>
                <option value="southeast">Southeast</option>
                <option value="southwest">Southwest</option>
              </select>
            </div>

            <button 
              onClick={handlePredict}
              disabled={loading}
              className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-800 hover:from-blue-700 hover:to-indigo-900 text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-500/30 transform transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-widest text-sm"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  AI ANALYSIS IN PROGRESS...
                </span>
              ) : "START PREDICTION"}
            </button>
          </div>
        </section>

        {/* Results Section */}
        <section className="h-full">
          {result ? (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Result Spotlight */}
              <div className="glossy-card p-12 rounded-[3rem] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50 group-hover:scale-110 transition-transform duration-700"></div>
                
                <div className="relative z-10">
                  <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase mb-6">
                    <i className="bi bi-graph-up-arrow"></i> Annual Estimated Charges
                  </span>
                  
                  <div className="text-7xl font-black text-slate-900 tracking-tighter mb-8">
                    ${result.estimatedCharges.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-slate-50/80 p-6 rounded-2xl border border-slate-100 backdrop-blur-sm">
                      <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">Risk Index</p>
                      <p className="text-3xl font-black text-slate-800">{result.riskIndex}</p>
                    </div>
                    <div className="bg-slate-50/80 p-6 rounded-2xl border border-slate-100 backdrop-blur-sm">
                      <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">AI Trust Level</p>
                      <p className="text-3xl font-black text-slate-800">{result.confidence}%</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visualization */}
              <div className="glossy-card p-8 rounded-[2.5rem]">
                <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
                  <i className="bi bi-bar-chart-fill text-blue-600"></i> Factor Weights
                </h3>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={result.impactFactors}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} 
                        dy={10}
                      />
                      <YAxis hide />
                      <Tooltip 
                        cursor={{fill: 'rgba(248,250,252,0.8)'}}
                        contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', padding: '12px'}}
                      />
                      <Bar dataKey="impact" radius={[8, 8, 0, 0]} barSize={40}>
                        {result.impactFactors.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === 3 && profile.smoker === 'yes' ? '#f97316' : '#2563eb'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[500px] flex flex-col items-center justify-center border-4 border-dashed border-slate-200 rounded-[3rem] p-12 text-center text-slate-300">
              <div className="text-8xl mb-8 opacity-20">
                <i className="bi bi-file-earmark-medical"></i>
              </div>
              <h3 className="text-2xl font-black text-slate-400 mb-4">System Pending</h3>
              <p className="max-w-xs text-sm font-medium leading-relaxed text-slate-400">
                Please provide the client's complete profile to generate a detailed predictive report using our actuarial AI.
              </p>
            </div>
          )}
        </section>
      </div>

      <footer className="mt-24 text-center">
        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
          &copy; 2026 PredictCare Intelligence | Système Actif
        </div>
      </footer>
    </div>
  );
};

export default App;
