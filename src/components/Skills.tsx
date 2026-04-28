import { useScrollReveal } from '../hooks/useScrollReveal';

interface SkillGroup {
  category: string;
  icon: string;
  items: { name: string; level: number }[];
}

const skillGroups: SkillGroup[] = [
  {
    category: 'Core Engineering',
    icon: '⚙',
    items: [
      { name: 'Instrumentation Engineering', level: 95 },
      { name: 'Control Systems', level: 90 },
      { name: 'Process Automation', level: 88 },
      { name: 'Electrical & Instrumentation (EIE)', level: 85 },
      { name: 'Electronics', level: 80 },
    ],
  },
  {
    category: 'Automation & Software',
    icon: '⌨',
    items: [
      { name: 'PLC Programming', level: 88 },
      { name: 'SCADA', level: 85 },
      { name: 'DCS', level: 80 },
      { name: 'HMI Development', level: 78 },
      { name: 'CoDeSys', level: 75 },
      { name: 'Allen Bradley', level: 80 },
      { name: 'Simulink', level: 70 },
      { name: 'C Programming', level: 72 },
    ],
  },
  {
    category: 'Field & Commissioning',
    icon: '🔧',
    items: [
      { name: 'Variable-Frequency Drives (VFD)', level: 85 },
      { name: 'Cable Tray Routing', level: 90 },
      { name: 'Junction Box Installation', level: 88 },
      { name: 'Loop Checking', level: 92 },
      { name: 'Calibration', level: 87 },
    ],
  },
  {
    category: 'Standards & Tools',
    icon: '📐',
    items: [
      { name: 'EtherNet/IP', level: 78 },
      { name: 'FBD (Function Block Diagram)', level: 82 },
      { name: 'AutoCAD', level: 75 },
      { name: 'UART Communication', level: 72 },
      { name: 'MS Office', level: 88 },
    ],
  },
  {
    category: 'Soft Skills',
    icon: '◈',
    items: [
      { name: 'Problem Solving', level: 92 },
      { name: 'Oral Communication', level: 88 },
      { name: 'Organization', level: 85 },
      { name: 'Adaptability', level: 90 },
      { name: 'Technical Writing', level: 80 },
    ],
  },
];

export default function Skills() {
  const ref = useScrollReveal();

  return (
    <>
      <style>{`
        #skills {
          position: relative;
          padding: 9rem 1.5rem;
          overflow: hidden;
        }

        .skills-grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(34,211,238,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,211,238,0.025) 1px, transparent 1px);
          background-size: 56px 56px;
          pointer-events: none;
          opacity: 0.5;
        }

        .skills-inner {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .skills-eyebrow { position: relative; margin-bottom: 0.5rem; }
        .skills-bg-num {
          position: absolute;
          right: 0; top: -2rem;
          font-family: 'Syne', sans-serif;
          font-size: clamp(6rem, 14vw, 10rem);
          font-weight: 800;
          color: rgba(34,211,238,0.04);
          line-height: 1;
          pointer-events: none;
          user-select: none;
        }

        .skills-layout {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        @media (max-width: 768px) {
          .skills-layout { grid-template-columns: 1fr; }
          .skills-group.wide { grid-column: span 1; }
        }

        .skills-group {
          background: rgba(7,11,20,0.7);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 0px;
          padding: 1.75rem;
          transition: border-color 0.3s, background 0.3s;
          position: relative;
          overflow: hidden;
        }

        .skills-group::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(34,211,238,0.35), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .skills-group:hover {
          border-color: rgba(34,211,238,0.18);
          background: rgba(7,11,20,0.95);
        }
        .skills-group:hover::after { opacity: 1; }

        .skills-group.wide { grid-column: span 2; }
        @media (max-width: 768px) {
          .skills-group.wide { grid-column: span 1; }
        }

        .group-header {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 1.2rem;
        }

        .group-icon {
          font-size: 1rem;
          opacity: 0.7;
        }

        .group-title {
          font-family: 'DM Mono', monospace;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: #22d3ee;
          text-transform: uppercase;
        }

        /* 🔥 NEW PILLS */
        .skill-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin-top: -0.5rem;
          margin-top: -0.5rem;
        }

        .pill {
          font-family: 'Syne', sans-serif !important;
          font-size: 0.85rem;
          font-weight: 550;
          color: #e2e8f0;
          padding: 6px 10px !important;
          border-radius: 6px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.02);
          transition: all 0.2s ease;
          margin-top: 0.1rem;
        }

        .pill:hover {
          border-color: rgba(34,211,238,0.4);
          color: white;
        }

        /* ── MOBILE ONLY ── */
        @media (max-width: 768px) {
          #skills {
            padding: 6rem 1.25rem;
          }

          .skills-bg-num {
            display: none;
          }

          .skills-eyebrow {
            text-align: center;
          }

          .skills-eyebrow .tag-label {
            justify-content: center;
          }

          .skills-inner .section-heading {
            text-align: center;
          }

          .skills-layout {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .skills-group.wide {
            grid-column: span 1;
          }

          .group-header {
            justify-content: center;
          }

          .skill-pills {
            justify-content: center;
          }
        }
      `}</style>

      <section id="skills">

        <div className="skills-inner" ref={ref}>
          <div className="skills-eyebrow">
            <p className="tag-label reveal-child">03. Skills</p>
            <div className="skills-bg-num">03</div>
          </div>

          <h2 className="section-heading reveal-child">
            Technologies & Tools
          </h2>

          <div className="skills-layout">
            {skillGroups.map((group, gi) => {
              const isWide = gi === 0;
              return (
                <div
                  key={group.category}
                  className={`skills-group reveal-child ${isWide ? 'wide' : ''}`}
                  style={{ transitionDelay: `${gi * 100 + 200}ms` }}
                >
                  <div className="group-header">
                    <span className="group-icon">{group.icon}</span>
                    <span className="group-title">{group.category}</span>
                  </div>

                  <div className="skill-pills">
                    {group.items.map(skill => (
                      <span key={skill.name} className="pill">
                        {skill.name}
                      </span>
                    ))}
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}