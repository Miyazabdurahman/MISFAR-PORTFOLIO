import { useScrollReveal } from '../hooks/useScrollReveal';
import { MapPin, Calendar, ArrowUpRight } from 'lucide-react';

interface Project {
  title: string;
  org: string;
  location: string;
  period: string;
  description: string;
  tags: string[];
  current?: boolean;
}

const projects: Project[] = [
  {
    title: 'Testing & Commissioning Engineer',
    org: 'Avanceon Middle East & South Asia',
    location: 'Riyadh, Saudi Arabia',
    period: 'Aug 2023 — Feb 2026',
    description:
      'Involved in the instrumentation and control systems for one of the largest metro rail networks in the Middle East. Responsible for installation, testing, and commissioning of field instruments, junction boxes, and cable routing across multiple metro lines. Collaborated closely with multi-disciplinary teams to ensure system integration and compliance with project specifications.',
    tags: ['Instrumentation', 'Control Systems', 'SCADA', 'Commissioning', 'Metro Rail'],
  },
  {
    title: 'Instrumentation & Automation Engineer',
    org: 'Industrial Facility',
    location: 'Dammam, Saudi Arabia',
    period: '2026 — Present',
    current: true,
    description:
      'Working on instrumentation installation and PLC-based automation for an industrial plant in the Eastern Province. Handling loop checking, calibration of process instruments, and integration of field devices with the central control system. Ensuring instruments meet safety and process requirements through systematic commissioning procedures.',
    tags: ['PLC', 'Automation', 'Loop Checking', 'Calibration', 'Industrial'],
  },
];

function ExperienceCard({ project, index }: { project: Project; index: number }) {
  return (
    <div
      className={`exp-card reveal-child`}
      style={{ transitionDuration: '800ms', transitionDelay: `${index * 150 + 200}ms` }}
    >
      {project.current && <div className="exp-current-badge"></div>}

      <div className="exp-card-header">
        <div className="exp-card-left">
          <div className="exp-index">0{index + 1}</div>
          <div>
            <h3 className="exp-title">{project.title}</h3>
            <p className="exp-org">{project.org}</p>
          </div>
        </div>
        <div className="exp-card-meta">
          <span className="exp-meta-item">
            <Calendar size={11} />
            {project.period}
          </span>
          <span className="exp-meta-item">
            <MapPin size={11} />
            {project.location}
          </span>
        </div>
      </div>

      <div className="exp-divider" />

      <p className="exp-description">{project.description}</p>

      <div className="exp-tags">
        {project.tags.map(tag => (
          <span key={tag} className="pill">{tag}</span>
        ))}
      </div>
    </div>
  );
}

export default function Experience() {
  const ref = useScrollReveal();

  return (
    <>
      <style>{`
        #experience {
          position: relative;
          padding: 9rem 1.5rem;
          overflow: hidden;
        }

        .exp-bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(34,211,238,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,211,238,0.025) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(ellipse 60% 80% at 85% 50%, black 10%, transparent 75%);
          pointer-events: none;
        }

        .exp-orb {
          position: absolute;
          width: 600px; height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(34,211,238,0.05) 0%, transparent 70%);
          top: 50px; right: -150px;
          pointer-events: none;
          filter: blur(20px);
        }

        .exp-inner {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .exp-eyebrow {
          position: relative;
          margin-bottom: 0.5rem;
        }
        .exp-bg-num {
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

        .exp-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          position: relative;
        }

        /* left timeline bar */
        .exp-list::before {
          content: '';
          position: absolute;
          left: 28px;
          top: 0; bottom: 0;
          width: 1px;
          background: linear-gradient(to bottom, transparent, rgba(34,211,238,0.2) 20%, rgba(34,211,238,0.2) 80%, transparent);
        }

        .exp-card {
          background: rgba(7,11,20,0.7);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 4px;
          padding: 2rem 2rem 2rem 4.5rem;
          position: relative;
          transition: border-color 0.3s, background 0.3s, transform 0.3s;
        }

        .exp-card:hover {
          border-color: rgba(34,211,238,0.2);
          background: rgba(7,11,20,0.95);
          transform: translateX(4px);
        }

        /* timeline dot */
        .exp-card::before {
          content: '';
          position: absolute;
          left: 23px;
          top: 2.2rem;
          width: 9px; height: 9px;
          border-radius: 50%;
          background: #22d3ee;
          box-shadow: 0 0 10px rgba(34,211,238,0.5);
          transition: box-shadow 0.3s;
        }
        .exp-card:hover::before {
          box-shadow: 0 0 18px rgba(34,211,238,0.8);
        }
          .exp-card:first-child::before {
          box-shadow: none;
           opacity: 0.4; /* optional */
        }

        .exp-card:first-child:hover::before {
        box-shadow: none;
        }

        /* top glow line on hover */
        .exp-card::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(34,211,238,0.4), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .exp-card:hover::after { opacity: 1; }


        .exp-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1.5rem;
          margin-bottom: 1.25rem;
          flex-wrap: wrap;
        }

        .exp-card-left {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .exp-index {
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem;
          color: rgba(34,211,238,0.4);
          letter-spacing: 0.1em;
          padding-top: 4px;
          flex-shrink: 0;
        }

        .exp-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1rem, 1.8vw, 1.2rem);
          font-weight: 700;
          color: #f1f5f9;
          margin: 0 0 0.3rem;
          transition: color 0.2s;
        }
        .exp-card:hover .exp-title { color: #22d3ee; }

        .exp-org {
          font-family: 'DM Mono', monospace;
          font-size: 0.88rem;
          color: rgba(34,211,238,0.7);
          margin: 0;
        }

        .exp-card-meta {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          text-align: right;
          flex-shrink: 0;
        }

        .exp-meta-item {
          font-family: 'DM Mono', monospace;
          font-size: 0.68rem;
          color: #475569;
          display: flex;
          align-items: center;
          gap: 5px;
          justify-content: flex-end;
        }

        .exp-divider {
          height: 1px;
          background: linear-gradient(90deg, rgba(34,211,238,0.15), transparent);
          margin-bottom: 1.25rem;
        }

        .exp-description {
          font-family: 'Syne', sans-serif;
          font-size: 0.92rem;
          color: #64748b;
          line-height: 1.8;
          margin-bottom: 1.25rem;
        }

        .exp-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        @media (max-width: 640px) {
          .exp-card { padding-left: 3.5rem; }
          .exp-card-header { flex-direction: column; }
          .exp-card-meta { text-align: left; }
          .exp-meta-item { justify-content: flex-start; }
        }

        /* ── MOBILE ONLY ── */
        @media (max-width: 768px) {
          #experience {
            padding: 6rem 1.25rem;
          }

          .exp-bg-num {
            display: none;
          }

          .exp-eyebrow {
            text-align: center;
          }

          .exp-eyebrow .tag-label {
            justify-content: center;
          }

          .exp-inner .section-heading {
            text-align: center;
          }

          .exp-list::before {
            display: none;
          }

          .exp-card {
            padding: 1.5rem 1.25rem;
          }

          .exp-card::before {
            display: none;
          }

          .exp-card:hover {
            transform: none;
          }

          .exp-card-header {
            flex-direction: column;
            gap: 0.75rem;
            align-items: center;
            text-align: center;
          }

          .exp-card-left {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 0.5rem;
          }

          .exp-card-meta {
            text-align: center;
            align-items: center;
          }

          .exp-meta-item {
            justify-content: center;
          }

          .exp-description {
            text-align: center;
          }

          .exp-tags {
            justify-content: center;
          }
        }
      `}</style>

      <section id="experience">
        <div className="exp-orb" />

        <div className="exp-inner" ref={ref}>
          <div className="exp-eyebrow">
            <p className="tag-label reveal-child" style={{ transitionDuration: '700ms', transitionDelay: '0ms' }}>
              02. Experience
            </p>
            <div className="exp-bg-num"  aria-hidden>02</div>
          </div>

          <h2 className="section-heading reveal-child" style={{ transitionDuration: '700ms', transitionDelay: '100ms' }}>
            Where I've Worked
          </h2>

          <div className="exp-list">
            {projects.map((p, i) => (
              <ExperienceCard key={p.title} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
