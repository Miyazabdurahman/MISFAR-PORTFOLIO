import { useScrollReveal } from '../hooks/useScrollReveal';

const facts = [
  { label: 'Education',  value: 'B.Tech — Instrumentation Engineering', sub: 'CUSAT, Cochin' },
  { label: 'Location',   value: 'India', sub: 'Kerala, Malappuram' },
  { label: 'Experience', value: '2.5+ Years', sub: 'Metro & Industrial' },
  { label: 'Domain',     value: 'Control Systems', sub: 'Automation · SCADA · PLC' },
];

export default function About() {
  const ref = useScrollReveal();

  return (
    <>
      <style>{`
        #about {
          position: relative;
          padding: 9rem 1.5rem;
          overflow: hidden;
        }

        .about-grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(34,211,238,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,211,238,0.025) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(ellipse 70% 70% at 15% 50%, black 20%, transparent 80%);
          pointer-events: none;
        }

        .about-orb {
          position: absolute;
          width: 500px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%);
          top: -10px; left: -120px;
          pointer-events: none;
        }

        .about-inner {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        /* big faint number */
        .about-eyebrow-wrap {
          position: relative;
          margin-bottom: 0.5rem;
        }
        .about-bg-num {
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

        .about-body {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: start;
        }

        @media (max-width: 900px) {
          .about-body { grid-template-columns: 1fr; gap: 3rem; }
        }

        /* LEFT — text */
        .about-text p {
          font-family: 'Syne', sans-serif;
          font-size: clamp(0.95rem, 1.4vw, 1.05rem);
          color: #94a3b8;
          line-height: 1.85;
          margin-bottom: 1.3rem;
        }
        .about-text p strong {
          color: #e2e8f0;
          font-weight: 600;
        }

        .about-quote {
          margin-top: 2rem;
          padding: 1.2rem 1.5rem;
          border-left: 2px solid rgba(34,211,238,0.4);
          background: rgba(34,211,238,0.03);
          border-radius: 0 4px 4px 0;
        }
        .about-quote p {
          font-family: 'DM Mono', monospace !important;
          font-size: 0.85rem !important;
          color: #64748b !important;
          font-style: italic;
          margin: 0 !important;
        }
        .about-quote span {
          display: block;
          font-family: 'DM Mono', monospace;
          font-size: 0.7rem;
          color: #22d3ee;
          margin-top: 0.5rem;
          font-style: normal;
        }

        /* RIGHT — fact cards */
   /* 🔥 EXACT MATCH TO YOUR REFERENCE */

/* 🔥 EXACT STRUCTURE LIKE YOUR REFERENCE */

.fact-grid {
  background-image: linear-gradient(rgba(34,211,238,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,211,238,0.025) 1px, transparent 1px);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px;
  padding: 1.5rem;
}

/* spacing between blocks */
.fact-cell {
  padding: 0;
}

/* first block */
.fact-cell:first-child {
  margin-bottom: 1rem;
}

/* rest blocks */
.fact-cell:not(:first-child) {
  border-top: 1px solid rgba(255,255,255,0.08);
  padding-top: 1rem;
  margin-top: 1rem;
}

/* 🔥 TEXT — MATCH TAILWIND LOOK */

.fact-label {
  font-family: 'DM Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  color: #22d3ee;
  text-transform: uppercase;
  margin-bottom: 0.3rem;
}

.fact-value {
  font-family: 'Syne', sans-serif;
  font-size: 0.95rem;
  font-weight: 500; /* 🔥 IMPORTANT (not bold like before) */
  color: #ffffff;
}

.fact-sub {
  font-family: 'Syne', sans-serif;
  font-size: 0.7rem;
  color: #6b7280; /* softer gray like reference */
  margin-top: 0.1rem;
}
        /* resume cta */
        .about-cta {
          margin-top: 2.5rem;
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        /* ── MOBILE ONLY ── */
        @media (max-width: 768px) {
          #about {
            padding: 6rem 1.25rem;
          }

          .about-bg-num {
            display: none;
          }

          .about-eyebrow-wrap {
            text-align: center;
          }

          .tag-label {
            justify-content: center;
          }

          .section-heading {
            text-align: center;
          }

          .about-body {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }

          .about-text p {
            text-align: center;
          }

          .about-quote {
            text-align: left;
          }

          .about-cta {
            justify-content: center;
          }

          .fact-grid {
            max-width: 100%;
          }

          .fact-cell {
            text-align: center;
          }
        }
      `}</style>

      <section id="about">
        <div className="about-orb" />

        <div className="about-inner" ref={ref}>
          <div className="about-eyebrow-wrap">
            <p className="tag-label reveal-child" style={{ transitionDuration: '700ms', transitionDelay: '0ms' }}>
              01. About Me
            </p>
            <div className="about-bg-num" aria-hidden>01</div>
          </div>

          <h2 className="section-heading reveal-child" style={{ transitionDuration: '700ms', transitionDelay: '100ms' }}>
            Who I Am
          </h2>

          <div className="about-body">
            {/* LEFT */}
            <div className="about-text reveal-child" style={{ transitionDuration: '800ms', transitionDelay: '200ms' }}>
              <p>
                I'm an <strong>Instrumentation Engineer</strong> with over 2.5 years of
                hands-on experience working on large-scale metro and industrial projects
                across Saudi Arabia. My work spans design, installation, commissioning,
                and maintenance of instrumentation and control systems in demanding,
                high-stakes environments.
              </p>
              <p>
                I thrive at the intersection of <strong>precision engineering and automation</strong> —
                ensuring critical systems operate reliably, safely, and efficiently.
                From PLC programming to SCADA integration, I bring a systematic,
                detail-driven approach to every project.
              </p>
              <p>
                I hold a <strong>B.Tech in Instrumentation Engineering</strong> from
                Cochin University of Science and Technology (CUSAT), where I built
                a strong foundation in control systems, signal processing, and
                industrial automation.
              </p>

            

              <div className="about-cta">
                <a href="/misentho.pdf" target="_blank" rel="noopener noreferrer" className="btn-primary">
                  Download Resume
                </a>
                <a
                  href="#contact"
                  className="btn-secondary"
                  onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                >
                  Get In Touch
                </a>
              </div>
            </div>

            {/* RIGHT */}
            <div className="reveal-child" style={{ transitionDuration: '800ms', transitionDelay: '320ms' }}>
              <div className="fact-grid">
                {facts.map(f => (
                  <div key={f.label} className="fact-cell">
                    <div className="fact-label">{f.label}</div>
                    <div className="fact-value">{f.value}</div>
                    <div className="fact-sub">{f.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
