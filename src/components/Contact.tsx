import { useScrollReveal } from '../hooks/useScrollReveal';
import { Mail, Linkedin, Instagram, ArrowUpRight, MapPin } from 'lucide-react';

const socials = [
  {
    label: 'Email',
    value: 'mastermisfar1@gmail.com',
    sub: 'Response within 24hrs',
    icon: Mail,
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=mastermisfar1@gmail.com',
  },
  {
    label: 'LinkedIn',
    value: '/in/Misfar-Ahmad',
    sub: 'Professional network',
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/misfar-ahmad/',
  },
  {
    label: 'Instagram',
    value: '@the_misfar',
    sub: 'Personal updates',
    icon: Instagram,
    href: 'https://www.instagram.com/the_misfar/',
  },
];

export default function Contact() {
  const ref = useScrollReveal();

  return (
    <>
      <style>{`
        #contact {
          position: relative;
          padding: 9rem 1.5rem 0;
          overflow: hidden;
        }

        .contact-bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(34,211,238,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,211,238,0.025) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 20%, transparent 80%);
          pointer-events: none;
        }

        .contact-orb {
          position: absolute;
          width: 700px; height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(34,211,238,0.07) 0%, transparent 70%);
          bottom: 200px; left: 50%;
          transform: translateX(-50%);
          pointer-events: none;
          filter: blur(30px);
        }

        .contact-inner {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
          padding-bottom: 6rem;
        }

        .contact-eyebrow { position: relative; margin-bottom: 0.5rem; }
        .contact-bg-num {
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

        .contact-body {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: start;
        }

        @media (max-width: 900px) {
          .contact-body { grid-template-columns: 1fr; gap: 3rem; }
        }

        .contact-left p {
          font-family: 'Syne', sans-serif;
          font-size: clamp(0.9rem, 1.4vw, 1rem) !important;
          color: #64748b;
          line-height: 1.85;
          max-width: 420px;
          margin-bottom: 2.5rem;
        }

        .contact-location {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'DM Mono', monospace;
          font-size: 0.72rem;
          color: #475569;
          margin-top: 0.5rem;
          margin-bottom: 2.5rem;
          letter-spacing: 0.04em;
        }
        .contact-location svg { color: #22d3ee; flex-shrink: 0; }

        /* contact cards */
        .contact-cards {
          display: flex;
          flex-direction: column;
          gap: 1px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 4px;
          overflow: hidden;
        }

        .contact-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.1rem 1.5rem;
          background: rgba(7,11,20,0.8);
          text-decoration: none;
          transition: all 0.2s;
          group: true;
        }

        .contact-card:hover {
          background: rgba(12,17,32,0.98);
        }

        .contact-card-left {
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }

        .contact-icon-wrap {
          width: 38px; height: 38px;
          border-radius: 3px;
          background: rgba(34,211,238,0.06);
          border: 1px solid rgba(34,211,238,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #22d3ee;
          flex-shrink: 0;
          transition: all 0.2s;
        }
        .contact-card:hover .contact-icon-wrap {
          background: rgba(34,211,238,0.12);
          border-color: rgba(34,211,238,0.35);
          box-shadow: 0 0 16px rgba(34,211,238,0.15);
        }

        .contact-card-label {
          font-family: 'DM Mono', monospace;
          font-size: 0.62rem;
          letter-spacing: 0.1em;
          color: #475569;
          text-transform: uppercase;
          margin-bottom: 0.2rem;
          font-weight: 1000;
        }

        .contact-card-value {
          font-family: 'Syne', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          color: #94a3b8;
          transition: color 0.2s;
        }
        .contact-card:hover .contact-card-value { color: #f1f5f9; }

        .contact-card-sub {
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem;
          color: #334155;
          margin-top: 0.1rem;
        }

        .contact-arrow {
          color: #334155;
          transition: all 0.2s;
          flex-shrink: 0;
        }
        .contact-card:hover .contact-arrow {
          color: #22d3ee;
          transform: translate(2px, -2px);
        }

        /* comment!! availability badge 
        .avail-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'DM Mono', monospace;
          font-size: 0.68rem;
          letter-spacing: 0.08em;
          color: #22d3ee;
          background: rgba(34,211,238,0.06);
          border: 1px solid rgba(34,211,238,0.2);
          padding: 7px 14px;
          border-radius: 2px;
          margin-bottom: 2rem;
        } 
        .avail-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #22d3ee;
          animation: pulse-glow 2s ease-in-out infinite;
          flex-shrink: 0;
        } 
        @keyframes pulse-glow {
          0%,100% { box-shadow: 0 0 0 0 rgba(34,211,238,0.5); }
          50%      { box-shadow: 0 0 0 5px rgba(34,211,238,0); }
        } comment!!*/

        /* ── Footer ── */
        .site-footer {
          position: relative;
          z-index: 2;
          border-top: 1px solid rgba(255,255,255,0.04);
          padding: 2rem 0;
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .footer-left {
          font-family: 'DM Mono', monospace;
          font-size: 0.68rem;
          color: #1e293b;
          letter-spacing: 0.08em;
        }

        .footer-sig {
          font-family: 'Syne', sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          color: #22d3ee !important;
          letter-spacing: 0.05em;
        }
        .footer-sig span { color: #1e293b; }

        .footer-right {
          font-family: 'DM Mono', monospace;
          font-size: 0.68rem;
          color: #1e293b;
        }

        /* ── MOBILE ONLY ── */
        @media (max-width: 768px) {
          #contact {
            padding: 6rem 1.25rem 0;
          }

          .contact-bg-num {
            display: none;
          }

          .contact-eyebrow {
            text-align: center !important;
          }

          .contact-eyebrow .tag-label {
            justify-content: center !important;
          }

          .contact-inner .section-heading {
            text-align: center !important;
          }

          .contact-body {
            grid-template-columns: 1fr;
            gap: 2.5rem;
            margin-top: -2rem;
            text-align: center !important;
          }

          .contact-left p {
            text-align: center !important;
            max-width: 100%;
            margin-left: auto;
            margin-right: auto;
          }

          .contact-location {
            justify-content: center !important;
            margin-top: 1rem;
          }

          .contact-left {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .site-footer {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 0.5rem;
          }

          .footer-left {
            text-align: center;
          }
        }
      `}</style>

      <section id="contact">
        <div className="contact-orb" />

        <div className="contact-inner" ref={ref}>
          <div className="contact-eyebrow">
            <p className="tag-label reveal-child" style={{ transitionDuration: '700ms', transitionDelay: '0ms' }}>
              04. Contact
            </p>
            <div className="contact-bg-num" aria-hidden>04</div>
          </div>

          <h2 className="section-heading reveal-child" style={{ transitionDuration: '700ms', transitionDelay: '100ms' }}>
            Let's Connect
          </h2>

          <div className="contact-body">
            {/* LEFT */}
            <div className="reveal-child" style={{ transitionDuration: '800ms', transitionDelay: '200ms' }}>
               {/* <div className="avail-badge">
                <span className="avail-dot" />
                Open to new opportunities
              </div> */}

              <p>
                Whether you have a project to discuss, a role to explore, or simply want
                to connect — I'd love to hear from you. I'm currently based in India and
                open to opportunities in the GCC and beyond.
              </p>

              <div className="contact-location">
                <MapPin size={12} />
               Kerala . India
              </div>

              <a href="/misentho.pdf" target="_blank" rel="noopener noreferrer" className="btn-primary">
                Download Resume
                <ArrowUpRight size={14} />
              </a>
            </div>

            {/* RIGHT */}
            <div className="reveal-child" style={{ transitionDuration: '800ms', transitionDelay: '320ms' }}>
              <div className="contact-cards">
                {socials.map(s => {
                  const Icon = s.icon;
                  return (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="contact-card">
                      <div className="contact-card-left">
                        <div className="contact-icon-wrap">
                          <Icon size={16} />
                        </div>
                        <div>
                          <div className="contact-card-label">{s.label}</div>
                          <div className="contact-card-value">{s.value}</div>
                          <div className="contact-card-sub">{s.sub}</div>
                        </div>
                      </div>
                      <ArrowUpRight size={15} className="contact-arrow" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '0 1.5rem' }}>
          <footer className="site-footer">
            <div>
              <div className="footer-sig">Misfar <span>Ahmad</span></div>
              <div className="footer-left" style={{ marginTop: '0.3rem' }}>Instrumentation Engineer · KSA</div>
            </div>
            <div className="footer-right">
              © {new Date().getFullYear()} · Designed & built with care
            </div>
          </footer>
        </div>
      </section>
    </>
  );
}
