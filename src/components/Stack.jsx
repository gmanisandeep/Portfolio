import React from 'react';

const DEV_STACK = [
  { name: 'HTML/CSS', icon: '🌐', color: '#e34f26' },
  { name: 'JavaScript', icon: '⚡', color: '#f7df1e' },
  { name: 'Node.js', icon: '🟩', color: '#339933' },
  { name: 'React', icon: '⚛️', color: '#61dafb' },
  { name: 'Express', icon: '🛤️', color: '#ffffff' },
  { name: 'Flutter', icon: '🐦', color: '#02569b' },
  { name: 'Python', icon: '🐍', color: '#3776ab' },
  { name: 'SQLite', icon: '🗃️', color: '#003b57' },
  { name: 'Firebase', icon: '🔥', color: '#ffca28' },
  { name: 'Git', icon: '🌿', color: '#f05032' },
  { name: 'REST APIs', icon: '🔗', color: '#a855f7' },
  { name: 'Gemini API', icon: '✨', color: '#4285f4' },
];

const CREATIVE_STACK = [
  { name: 'Filmmaking', icon: '🎬', color: '#ffd500' },
  { name: 'Premiere Pro', icon: '🎞️', color: '#9999ff' },
  { name: 'DaVinci', icon: '🎨', color: '#ff3333' },
  { name: 'UI/UX Design', icon: '✏️', color: '#ff7262' },
  { name: 'Canva', icon: '🖼️', color: '#00c4cc' },
  { name: 'Brand Design', icon: '💎', color: '#ffd500' },
  { name: 'Storyboarding', icon: '📋', color: '#f4f3ef' },
  { name: 'Photography', icon: '📷', color: '#ffffff' },
  { name: 'Music Videos', icon: '🎵', color: '#e13833' },
  { name: 'Documentary', icon: '🎙️', color: '#aaa' },
];

export default function Stack() {
  return (
    <section className="py-32 px-[5%] md:px-[10%] relative z-10" id="skills-section">
      
      <div className="font-display text-2xl tracking-[0.15em] text-accent-gold uppercase mb-12 flex items-center gap-6">
        002 — Stack
        <div className="flex-1 h-[1px] bg-fg/10" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
        {/* Dev Column */}
        <div className="relative">
          <h3 className="text-fg-muted font-mono text-sm tracking-[0.2em] uppercase mb-8 flex items-center gap-4">
            Dev Brain
            <div className="h-[1px] flex-1 bg-gradient-to-r from-fg/10 to-transparent" />
          </h3>
          <div className="flex flex-wrap gap-4">
            {DEV_STACK.map((skill, i) => (
              <div 
                key={i} 
                className="px-5 py-2.5 rounded-full border border-white/10 bg-[#0f0f0f]/80 backdrop-blur-md flex items-center gap-3 hover:border-white/30 transition-colors cursor-default"
                style={{ boxShadow: `inset 0 0 10px ${skill.color}15` }}
              >
                <span className="text-xl md:text-2xl">{skill.icon}</span>
                <span 
                  className="font-heading font-black text-xs md:text-sm uppercase tracking-[0.15em]" 
                  style={{ color: skill.color }}
                >
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Film Column */}
        <div className="relative">
          <h3 className="text-fg-muted font-mono text-sm tracking-[0.2em] uppercase mb-8 flex items-center gap-4">
            Film Eye
            <div className="h-[1px] flex-1 bg-gradient-to-r from-fg/10 to-transparent" />
          </h3>
          <div className="flex flex-wrap gap-4">
            {CREATIVE_STACK.map((skill, i) => (
              <div 
                key={i} 
                className="px-5 py-2.5 rounded-full border border-white/10 bg-[#0f0f0f]/80 backdrop-blur-md flex items-center gap-3 hover:border-white/30 transition-colors cursor-default"
                style={{ boxShadow: `inset 0 0 10px ${skill.color}15` }}
              >
                <span className="text-xl md:text-2xl">{skill.icon}</span>
                <span 
                  className="font-heading font-black text-xs md:text-sm uppercase tracking-[0.15em]" 
                  style={{ color: skill.color }}
                >
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
