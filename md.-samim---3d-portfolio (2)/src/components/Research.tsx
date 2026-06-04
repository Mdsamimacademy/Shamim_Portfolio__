import { motion } from 'motion/react';
import { BookOpen, BarChart3, Users, Zap, TrendingUp } from 'lucide-react';
import { Research } from '../types';

interface ResearchProps {
  research: Research;
}

export default function ResearchSection({ research }: ResearchProps) {
  // Model accuracy stats based on the thesis findings
  const modelBenchmarks = [
    { name: 'XGBoost (Optimized)', score: 84.4, color: 'from-cyan-500 to-indigo-500', isWinner: true },
    { name: 'Random Forest', score: 82.1, color: 'from-slate-400 to-slate-300', isWinner: false },
    { name: 'LightGBM', score: 81.5, color: 'from-slate-400 to-slate-300', isWinner: false },
    { name: 'SVM Classifier', score: 78.8, color: 'from-slate-400 to-slate-300', isWinner: false },
    { name: 'Logistic Regression', score: 75.2, color: 'from-slate-400 to-slate-300', isWinner: false },
    { name: 'Naive Bayes', score: 71.0, color: 'from-slate-400 to-slate-300', isWinner: false }
  ];

  return (
    <section id="research" className="py-24 px-4 bg-[#090d16] border-t border-white/5 relative overflow-hidden">
      {/* Background visual accents */}
      <div className="absolute top-[-10%] right-[-10%] w-[350px] h-[350px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[350px] h-[350px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Heading */}
        <div className="text-center md:text-left mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-mono tracking-[0.25em] text-cyan-400 uppercase mb-3 block animate-pulse"
          >
            [ ACADEMIC WORK ]
          </motion.span>
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-display font-black tracking-tighter uppercase text-white leading-none"
          >
            Highlighted <span className="text-outline-white">ML Research</span>
          </motion.h3>
        </div>

        {/* Major Thesis Overview Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Details & Abstract Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-slate-900/40 border border-white/10 p-6 sm:p-8 rounded-2xl backdrop-blur-md flex flex-col justify-between shadow-2xl relative overflow-hidden"
          >
            <div className="space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-mono font-bold uppercase tracking-wider rounded-full shadow-2xs">
                <BookOpen className="w-3.5 h-3.5" />
                Undergraduate Capstone Thesis
              </div>

              <h4 className="text-xl sm:text-2xl font-display font-black text-white tracking-tight leading-snug uppercase">
                {research.title || "Survey-Based Machine Learning Analysis of Social Media Influence on Youth Opinion Change in Bangladesh"}
              </h4>

              <p className="text-slate-305 text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">
                {research.description || "Collected and analyzed survey data from 317 Bangladeshi youths to predict political opinion change driven by social media. Applied preprocessing, feature engineering, class balancing using SMOTE, and hyperparameter optimization."}
              </p>

              {/* Research stats cards */}
              <div className="grid grid-cols-3 gap-3.5 pt-4">
                <div className="p-4 rounded-xl bg-[#030712] border border-white/5 text-center">
                  <Users className="w-5 h-5 text-cyan-400 mx-auto mb-2" />
                  <span className="text-slate-500 text-[9px] font-mono font-bold block uppercase tracking-wider">SAMPLE SIZE</span>
                  <span className="text-slate-200 text-xs sm:text-sm font-bold block mt-1">317 Cohort</span>
                </div>
                <div className="p-4 rounded-xl bg-[#030712] border border-white/5 text-center">
                  <TrendingUp className="w-5 h-5 text-cyan-400 mx-auto mb-2" />
                  <span className="text-slate-500 text-[9px] font-mono font-bold block uppercase tracking-wider">ACCURACY</span>
                  <span className="text-cyan-400 text-xs sm:text-sm font-black block mt-1">84.4%</span>
                </div>
                <div className="p-4 rounded-xl bg-[#030712] border border-white/5 text-center">
                  <Zap className="w-5 h-5 text-cyan-400 mx-auto mb-2" />
                  <span className="text-slate-500 text-[9px] font-mono font-bold block uppercase tracking-wider">METHOD</span>
                  <span className="text-slate-200 text-[10px] font-mono font-bold block mt-1 leading-tight">SMOTE Voting</span>
                </div>
              </div>

              <div>
                <span className="text-[9px] text-slate-400 font-mono block uppercase tracking-widest font-bold mb-2">// METHODOLOGY TOOLSTACK:</span>
                <div className="flex flex-wrap gap-1.5">
                  {research.techStack && research.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-[9px] rounded bg-slate-950 border border-white/10 text-slate-300 font-mono tracking-wide font-bold uppercase"
                    >
                      {tech.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions Buttons */}
            <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-white/5">
              {research.reportLink && (
                <a
                  href={research.reportLink}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="px-5 py-2.5 bg-white border border-white text-slate-950 font-display font-bold text-[11px] uppercase tracking-wider rounded-xl active:scale-95 transition-all cursor-pointer shadow-md hover:bg-slate-100"
                >
                  View Thesis Report
                </a>
              )}
              {research.githubLink && (
                <a
                  href={research.githubLink}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 border border-white/10 text-white font-display font-bold text-[11px] uppercase tracking-wider rounded-xl active:scale-95 transition-all cursor-pointer"
                >
                  View Repo Code
                </a>
              )}
              {research.liveLink && (
                <a
                  href={research.liveLink}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 border border-white/10 text-white font-display font-bold text-[11px] uppercase tracking-wider rounded-xl active:scale-95 transition-all cursor-pointer"
                >
                  Live Deployment
                </a>
              )}
            </div>
          </motion.div>

          {/* Graphical Benchmark Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-5 bg-slate-900/40 border border-white/10 p-6 rounded-2xl backdrop-blur-md flex flex-col justify-between shadow-2xl relative overflow-hidden"
          >
            <div className="text-left">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-5 h-5 text-cyan-400" />
                <h5 className="text-md font-display font-black text-white uppercase tracking-tight">Classifier Benchmarks</h5>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-6 font-sans">
                Comparative accuracy comparison of algorithms evaluated prior to selection of final optimized ensembled voting classifier schema.
              </p>

              {/* Bar chart visualization */}
              <div className="space-y-4">
                {modelBenchmarks.map((model, idx) => (
                  <div key={idx} className="space-y-1 text-left">
                    <div className="flex justify-between text-[10px] font-mono font-bold tracking-wide">
                      <span className={model.isWinner ? 'text-cyan-400 font-bold' : 'text-slate-400'}>
                        {model.name} {model.isWinner && '🏆'}
                      </span>
                      <span className={model.isWinner ? 'text-cyan-400 font-black' : 'text-slate-400'}>
                        {model.score}%
                      </span>
                    </div>
                    {/* The bar */}
                    <div className="h-2 w-full bg-[#030712] rounded-full overflow-hidden border border-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${model.score}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 + idx * 0.1 }}
                        className={`h-full bg-gradient-to-r ${model.color} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/5 text-[9px] text-slate-500 font-mono text-left font-bold tracking-wide leading-relaxed">
              {"* Optimized ensemble achieved using voting classifiers with adjusted SMOTE synthetic weights."}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
