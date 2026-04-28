import { useScrollReveal } from '../hooks/useScrollReveal';
import { Mail, Linkedin, Instagram, ArrowUpRight, MapPin, Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { useState, useEffect } from 'react';

// ✏️  Paste your Formspree endpoint here after creating a form at formspree.io
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xqewvrjz';

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

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function Contact() {
  const ref = useScrollReveal();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<Status>('idle');

  const [errors, setErrors] = useState({
  name: '',
  email: '',
  message: '',
});

const [showToast, setShowToast] = useState(false);

 const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  // clear error when typing
  setErrors(prev => ({ ...prev, [e.target.name]: '' }));
};


const validate = () => {
  const newErrors = { name: '', email: '', message: '' };
  let valid = true;

  if (!formData.name.trim()) {
    newErrors.name = 'Name is required';
    valid = false;
  }

  if (!formData.email.trim()) {
    newErrors.email = 'Email is required';
    valid = false;
  } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
    newErrors.email = 'Enter a valid email';
    valid = false;
  }

  if (!formData.message.trim()) {
    newErrors.message = 'Message is required';
    valid = false;
  }

  setErrors(newErrors);
  return valid;
};

useEffect(() => {
  if (showToast) {
    const t = setTimeout(() => setShowToast(false), 3000);
    return () => clearTimeout(t);
  }
}, [showToast]);


  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validate()) return; // 🔥 important

  setStatus('sending');

  try {
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({ name: '', email: '', message: '' });
      setShowToast(true);
    } else {
      setStatus('error');
    }
  } catch {
    setStatus('error');
  }
};

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

        /* ── Top block: description + socials ── */
        .contact-top {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: start;
          margin-bottom: 4rem;
        }

        @media (max-width: 900px) {
          .contact-top { grid-template-columns: 1fr; gap: 3rem; }
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

        /* ── Social cards ── */
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

        /* ── Divider ── */
        .contact-divider {
          height: 2px;
          width:100%;
          background: linear-gradient(90deg, transparent, rgba(34,211,238,0.15), transparent);
          margin-bottom: 3rem;
        }

        /* ── Form section ── */
        .contact-form-wrap {
          background: rgba(7,11,20,0.6);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 4px;
          padding: 2rem;
        }


        .contact-form-heading {
          font-family: 'DM Mono', monospace;
          font-size: 0.8rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #22d3ee;
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .contact-form-heading::before {
          content: '';
          display: inline-block;
          width: 16px;
          height: 1px;
          background: #22d3ee;
          flex-shrink: 0;
        }

        /* 2-col form grid */
        .contact-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem 2rem;
          align-items: start;
        }

        @media (max-width: 768px) {
          .contact-form-grid {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }
        }

        /* Left column: stacked fields */
        .contact-form-left {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        /* Right column: textarea fills height */
        .contact-form-right {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        /* Field group */
        .cf-field {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }

        .cf-label {
          font-family: 'DM Mono', monospace;
          font-size: 0.8rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #475569;
          font-weight: 400;  
        }

        .cf-input {
          width: 100%;
          background: rgba(12,17,32,0.8);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 3px;
          padding: 0.7rem 0.9rem;
          font-family: 'DM Mono', monospace;
          font-size: 0.85rem;
          color: #e2e8f0;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          -webkit-appearance: none;
        }

        .cf-input::placeholder {
          color: #334155;
        }

        .cf-input:focus {
          border-color: rgba(34,211,238,0.4);
          background: rgba(12,17,32,0.98);
          box-shadow: 0 0 0 3px rgba(34,211,238,0.06);
        }

        /* Textarea stretches to fill right column height */
        .cf-textarea {
          width: 100%;
          flex: 1;
          background: rgba(12,17,32,0.8);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 3px;
          padding: 0.7rem 0.9rem;
          font-family: 'DM Mono', monospace;
          font-size: 0.85rem;
          color: #e2e8f0;
          outline: none;
          resize: vertical;
          min-height: 180px;
          line-height: 1.65;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }

        .cf-textarea::placeholder {
          color: #334155;
        }

        .cf-textarea:focus {
          border-color: rgba(34,211,238,0.4);
          background: rgba(12,17,32,0.98);
          box-shadow: 0 0 0 3px rgba(34,211,238,0.06);
        }

        /* Right column message label + textarea + send btn */
        .cf-message-label {
          font-family: 'DM Mono', monospace;
          font-size: 0.8rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #475569;
          font-weight: 400;
          margin-bottom: 0.45rem;
        }

        .cf-send-row {
          display: flex;
          justify-content: flex-end;
          margin-top: 1rem;
        }

        

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

          .contact-top {
            grid-template-columns: 1fr;
            gap: 2.5rem;
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

          .contact-form-wrap {
            padding: 1.5rem 1.25rem;
          }

          .cf-send-row {
            justify-content: center;
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

        /* ── Tablet tweaks ── */
        @media (min-width: 769px) and (max-width: 1024px) {
          .contact-form-wrap { padding: 2rem 1.75rem; }
          .contact-form-grid { gap: 1.25rem 1.5rem; }
        }

        /* ── Form status messages ── */
        .cf-status {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-family: 'DM Mono', monospace;
          font-size: 0.72rem;
          letter-spacing: 0.06em;
          padding: 0.75rem 1rem;
          border-radius: 3px;
          margin-top: 1rem;
        }
        .cf-status-success {
          background: rgba(34,211,238,0.06);
          border: 1px solid rgba(34,211,238,0.2);
          color: #22d3ee;
        }
        .cf-status-error {
          background: rgba(239,68,68,0.06);
          border: 1px solid rgba(239,68,68,0.2);
          color: #f87171;
        }
        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none !important;
          box-shadow: none !important;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .cf-spinner { animation: spin 0.8s linear infinite; flex-shrink: 0; }

        .cf-error {
  font-size: 0.65rem;
  color: #f87171;
  font-family: 'DM Mono', monospace;
  margin-top: 2px;
}

.toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: rgba(7,11,20,0.95);
  border: 1px solid rgba(34,211,238,0.2);
  padding: 0.8rem 1rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'DM Mono', monospace;
  font-size: 0.7rem;
  color: #22d3ee;
  z-index: 9999;
}
      `}</style>

      <section id="contact">
        <div className="contact-orb" />

        <div className="contact-inner" ref={ref}>
          {/* ── Eyebrow ── */}
          <div className="contact-eyebrow">
            <p className="tag-label reveal-child" style={{ transitionDuration: '700ms', transitionDelay: '0ms' }}>
              04. Contact
            </p>
            <div className="contact-bg-num" aria-hidden>04</div>
          </div>

          <h2 className="section-heading reveal-child" style={{ transitionDuration: '700ms', transitionDelay: '100ms' }}>
            Let's Connect
          </h2>

          {/* ── Top: description + socials ── */}
          <div className="contact-top">
            {/* LEFT */}
            <div className="contact-left reveal-child" style={{ transitionDuration: '800ms', transitionDelay: '200ms' }}>
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

            {/* RIGHT: social cards */}
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

          {/* ── Divider ── 
          <div className="contact-divider reveal-child" style={{ transitionDuration: '600ms', transitionDelay: '400ms' }} />
*/}

          {/* ── Contact Form ── */}
          <div className="contact-form-wrap reveal-child" style={{ transitionDuration: '800ms', transitionDelay: '480ms' }}>
            <div className="contact-form-heading">Send a message</div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="contact-form-grid">

                {/* Left column — three stacked inputs */}
                <div className="contact-form-left">
                  <div className="cf-field">
                    <label htmlFor="cf-name" className="cf-label">Name</label>
                    <input
                      id="cf-name"
                      name="name"
                      type="text"
                      placeholder="Your full name"
                      className="cf-input"
                      value={formData.name}
                      onChange={handleChange}
                      autoComplete="name"
                    />
                    {errors.name && <span className="cf-error">{errors.name}</span>}
                  </div>

                  <div className="cf-field">
                    <label htmlFor="cf-email" className="cf-label">Email</label>
                    <input
                      id="cf-email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      className="cf-input"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                    />{errors.email && <span className="cf-error">{errors.email}</span>}
                  </div>

                  <div className="cf-field">
                    <label htmlFor="cf-subject" className="cf-label">Subject</label>
                    <input
                      id="cf-subject"
                      name="subject"
                      type="text"
                      placeholder="What's this about?"
                      className="cf-input"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Right column — textarea + send button */}
                <div className="contact-form-right">
                  <div className="cf-message-label">Message</div>
                  <textarea
                    id="cf-message"
                    name="message"
                    placeholder="Tell me about your project, opportunity, or just say hello..."
                    className="cf-textarea"
                    value={formData.message}
                    onChange={handleChange}
                  />{errors.message && <span className="cf-error">{errors.message}</span>}
                  <div className="cf-send-row">
                    <button
                      type="submit"
                      className="btn-primary"
                      disabled={status === 'sending'}
                    >
                      {status === 'sending'
                        ? <><Loader size={13} className="cf-spinner" /> Sending…</>
                        : <>Send Message <Send size={13} /></>}
                    </button>
                  </div>

                  {status === 'success' && (
                    <div className="cf-status cf-status-success">
                      <CheckCircle size={14} />
                      Message sent — I'll get back to you within 24 hrs.
                    </div>
                  )}
                  {status === 'error' && (
                    <div className="cf-status cf-status-error">
                      <AlertCircle size={14} />
                      Something went wrong. Please try again or email me directly.
                    </div>
                  )}
                </div>

              </div>
            </form>
          </div>
        </div>

       

        {/* ── Footer ── */}
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
{showToast && (
  <div className="toast">
    <CheckCircle size={14} />
    Message sent successfully
  </div>
)}

      </section>
    </>
  );
}