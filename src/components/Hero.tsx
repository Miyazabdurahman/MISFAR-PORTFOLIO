import { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';

const roles = [
  'Instrumentation Engineer',
  'Automation Specialist',
  'Control Systems Expert',
  'PLC & SCADA Engineer',
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const current = roles[roleIndex];
    if (!deleting && charIndex < current.length) {
      const t = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, 60);
      return () => clearTimeout(t);
    }
    if (!deleting && charIndex === current.length) {
      const t = setTimeout(() => setDeleting(true), 2000);
      return () => clearTimeout(t);
    }
    if (deleting && charIndex > 0) {
      const t = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      }, 35);
      return () => clearTimeout(t);
    }
    if (deleting && charIndex === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }
  }, [charIndex, deleting, roleIndex]);

  const scrollDown = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        #hero {
          font-family: 'Inter', system-ui, sans-serif;
          position: relative;
        }

        .hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(34,211,238,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,211,238,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
          pointer-events: none;
        }

        .hero-orb-1 {
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(34,211,238,0.12) 0%, transparent 70%);
          top: -100px;
          right: -100px;
          pointer-events: none;
          animation: orbFloat 8s ease-in-out infinite;
        }

        .hero-orb-2 {
          position: absolute;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(59,130,246,0.10) 0%, transparent 70%);
          bottom: 0px;
          left: -80px;
          pointer-events: none;
          animation: orbFloat 11s ease-in-out infinite reverse;
        }

        @keyframes orbFloat {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }

        /* Scan line effect */
        .hero-scan {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.03) 2px,
            rgba(0,0,0,0.03) 4px
          );
          pointer-events: none;
          z-index: 1;
        }

        .tag-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.25em;
          color: #22d3ee;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 1.2rem;
          opacity: 0;
          animation: fadeUp 0.6s ease forwards 0.2s;
        }

        .tag-label::before {
          content: '';
          display: inline-block;
          width: 24px;
          height: 1px;
          background: #22d3ee;
        }

        .hero-name {
          font-size: clamp(2.8rem, 6vw,5rem);
          font-weight: 800;
          color: #fff;
          line-height: 1.05;
          letter-spacing: -0.02em;
          margin-bottom: 0.5rem;
          margin-top: 0.5rem;
          opacity: 0;
          animation: fadeUp 0.7s ease forwards 0.35s;
        }

        .hero-name span {
          background: linear-gradient(135deg, #fff 40%, #22d3ee 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-role {
          font-family: 'JetBrains Mono', monospace;
          font-size: clamp(1.7rem, 2.2vw, 1.35rem);
          font-weight: 700;
          color: #94a3b8;
          margin-bottom: 1.8rem;
          margin-top: 0.2rem;
          height: 1.2rem;
          display: flex;
          align-items: center;
          opacity: 0;
          animation: fadeUp 0.7s ease forwards 0.5s;
        }

        .cursor {
          display: inline-block;
          width: 2px;
          height: 1.2em;
          background: #22d3ee;
          margin-left: 3px;
          animation: blink 1s step-end infinite;
          vertical-align: middle;
          flex-shrink: 0;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .hero-desc {
          color: #64748b;
          font-size: clamp(1.25rem, 1.5vw, 1rem);
          line-height: 1.7;
          max-width: 600px;
          margin-bottom: 3.5rem;
          opacity: 0;
          animation: fadeUp 0.7s ease forwards 0.65s;
          font-family: 'Inter', system-ui, sans-serif;
          font-weight: 100;
        }

        .hero-btns {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          opacity: 0;
          animation: fadeUp 0.7s ease forwards 0.8s;
        }

        .btn-primary {
          padding: 12px 28px;
          background: #22d3ee;
          color: #000;
          font-family: 'Inter', system-ui, sans-serif;
          font-weight: 700;
          font-size: 0.78rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border-radius: 3px;
          text-decoration: none;
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
        }

        .btn-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0.15);
          transform: translateX(-100%);
          transition: transform 0.3s ease;
        }

        .btn-primary:hover::before {
          transform: translateX(0);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(34,211,238,0.35);
        }

        .btn-secondary {
          padding: 12px 28px;
          border: 1px solid rgba(255,255,255,0.12);
          color: #94a3b8;
          font-family: 'Inter', system-ui, sans-serif;
          font-weight: 600;
          font-size: 0.78rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border-radius: 3px;
          text-decoration: none;
          transition: all 0.2s ease;
          background: transparent;
        }

        .btn-secondary:hover {
          border-color: rgba(34,211,238,0.5);
          color: #22d3ee;
          transform: translateY(-2px);
          background: rgba(34,211,238,0.04);
        }

        /* ── Photo side ── */
        .photo-wrapper {
         position: relative;
         display: flex;
        align-items: flex-end;
        justify-content: center;
        opacity: 0;
      animation: fadeIn 1s ease forwards 0.4s;
       flex-shrink: 0;

  transform: translateY(70px); /* 🔥 DESKTOP FIX (move down) */
}
        /* Glowing ring behind photo */
        .photo-ring {
          position: absolute;
          width: 360px;
          height: 360px;
          border-radius: 50%;
          border: 1px solid rgba(34,211,238,0.15);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -60%);
          animation: ringPulse 4s ease-in-out infinite;
        }

        .photo-ring-2 {
          position: absolute;
          width: 420px;
          height: 420px;
          border-radius: 50%;
          border: 1px solid rgba(34,211,238,0.07);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -60%);
          animation: ringPulse 4s ease-in-out infinite 1s;
        }

        @keyframes ringPulse {
          0%, 100% { opacity: 0.6; transform: translate(-50%, -60%) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -60%) scale(1.03); }
        }

        /* Cyan glow radial behind image */
       .photo-glow {
  position: absolute;
  width: 550px;
  height: 550px;
  

  background: radial-gradient(
    circle at 50% 60%,
    rgba(34,211,238,0.25) 0%,
    rgba(34,211,238,0.15) 25%,
    rgba(34,211,238,0.07) 50%,
    transparent 80%
  );

  top: 50%;
  left: 50%;
  transform: translate(-50%, -55%);
  pointer-events: none;

  filter: blur(45px);   /* 🔥 MAIN FIX */
  opacity: 0.9;
}

        /* Teal ground-light pool */
        .photo-ground {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translate(-42%,-99%);
          width: 400px;
          height: 100px;
          background: radial-gradient(ellipse at 50% 100%, rgba(34,211,238,0.2) 0%, transparent 90%);
          filter: blur(10px);
          pointer-events: none;
        }

        .hero-photo {
  ...
  mask-image: linear-gradient(
    to bottom,
    black 60%,
    rgba(0,0,0,0.6) 75%,
    rgba(0,0,0,0.2) 90%,
    transparent 100%
  );

  -webkit-mask-image: linear-gradient(
    to bottom,
    black 60%,
    rgba(0,0,0,0.6) 75%,
    rgba(0,0,0,0.2) 90%,
    transparent 100%
  );
}

        /* Decorative corner bracket top-left of photo */
        .photo-bracket {
          position: absolute;
          top: 5%;
          left: 7%;
          width: 40px;
          height: 40px;
          border-top: 2px solid rgba(34,211,238,0.5);
          border-left: 2px solid rgba(34,211,238,0.5);
          z-index: 20;
        }

        .photo-bracket-br {
          position: absolute;
          bottom: 12%;
          right: 5%;
          width: 40px;
          height: 40px;
          border-bottom: 2px solid rgba(34,211,238,0.5);
          border-right: 2px solid rgba(34,211,238,0.5);
          z-index: 20;
        }

        /* Stats badge floating */
        .stat-badge {
          position: absolute;
          background: rgba(10,14,26,0.85);
          border: 1px solid rgba(34,211,238,0.2);
          backdrop-filter: blur(12px);
          border-radius: 4px;
          padding: 10px 16px;
          z-index: 30;
          font-family: 'Inter', system-ui, sans-serif;
        }

        .stat-badge-1 {
          left: 0;
          top: 20%;
          animation: badgeFloat 5s ease-in-out infinite;
        }

        .stat-badge-2 {
          right: 0;
          bottom: 28%;
          animation: badgeFloat 5s ease-in-out infinite 2.5s;
        }

        @keyframes badgeFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        .stat-number {
          font-size: 0.9rem;
          font-weight: 700;
          color: #22d3ee;
          line-height: 1;
        }

        .stat-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.6rem;
          color: #64748b;
          letter-spacing: 0.05em;
          margin-top: 2px;
        }

        /* Scroll button */
        .scroll-btn {
          position: absolute;
          bottom: 2.5rem;
          left: 50%;
          transform: translateX(-50%);
          color: #334155;
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.2s;
          animation: bounce 2s ease-in-out infinite;
        }

        .scroll-btn:hover { color: #22d3ee; }

        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(6px); }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* Layout */
        .hero-inner {
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: flex-end;
          justify-content: space-between;
          gap: 2rem;
          padding-bottom: 4rem;
          position: relative;
          z-index: 10;
        }

        .hero-text {
          max-width: 520px;
          padding-bottom: 2rem;
        }

      @media (max-width: 768px) {


        .hero-inner {
        flex-direction: column-reverse;
        align-items: center;
        padding-bottom: 4rem;
        gap: 2rem;
        }

      .hero-text {
      text-align: center;
      padding-bottom: 10;
      max-width: 100%;
    }
.photo-wrapper {
  transform: translateY(0); /* 🔥 RESET for mobile */
}
  .tag-label {
    justify-content: center;
    font-size: 0.65rem;
    margin-bottom: 0.8rem;
  }

  /* 🔥 NAME (slightly smaller for mobile) */
  .hero-name {
    font-size: 2.8rem;
    line-height: 1.15;
    margin-bottom: 0.4rem;
  }

  /* 🔥 ROLE (center + spacing fix) */
  .hero-role {
    justify-content: center;
    text-align: center;
    font-size: 0.9rem;
    height: auto;
    margin-bottom: 1.2rem;
  }

  /* 🔥 DESCRIPTION (clean readable spacing) */
  .hero-desc {
    font-size: 0.95rem;
    line-height: 1.5;
    margin: 0 auto 1.9rem;
    padding: 0 1.5rem;
  }

  /* 🔥 BUTTONS (better tap spacing) */
  .hero-btns {
    justify-content: center;
    gap: 10px;
  }

  .btn-primary,
  .btn-secondary {
    padding: 10px 18px;
    font-size: 0.7rem;
  }

  /* 🔥 PHOTO SIZE */
    .hero-photo {
    width: 900% !important;   /* 🔥 bigger */
    max-width: 420px;         /* control limit */
    bottom: -150px !important; /* move down for better framing */
  }


  /* 🔥 REMOVE FLOATING BADGES */
  .stat-badge {
    display: none;
  }

  

  /* 🔥 REDUCE VISUAL NOISE */
  .photo-ring,
  .photo-ring-2 {
    width: 130px;
    height: 130px;
    opacity: 100;
  }

  .photo-glow {
    width: 300px;
    height: 300px;
    opacity: 0.7;
  }

  /* 🔥 GROUND GLOW SMALLER */
  .photo-ground {
    width: 220px;
    height: 50px;
    bottom: -55px !important;
  }

  .photo-wrapper {
  height: 320px !important;
  overflow: hidden
  opacity:0;
}
  .photo-bracket,
.photo-bracket-br {
  display: none;
}

}
  
      `}</style>

      <section
        id="hero"
        style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '0 1.5rem', position: 'relative', overflow: 'hidden' }}
      >
        {/* Scan lines */}
        <div className="hero-scan" />
        {/* Orbs */}
        <div className="hero-orb-1" />
        <div className="hero-orb-2" />

        <div className="hero-inner">

          {/* LEFT — Text */}
          <div className="hero-text">
            <p className="tag-label">Hi, my name is</p>

            <h1 className="hero-name">
              <span>Misfar Ahmad</span>
            </h1>

            <div className="hero-role">
              <span>{displayed}</span>
              <span className="cursor" />
            </div>

            <p className="hero-desc">
              Instrumentation Engineer with 2.5+ years of experience in metro and
              industrial projects in Saudi Arabia.
            </p>

            <div className="hero-btns">
              <a
                href="#experience"
                className="btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#experience')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                View Experience
              </a>
              <a
                href="#contact"
                className="btn-secondary"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Contact
              </a>
            </div>
          </div>

          {/* RIGHT — Photo */}
          <div className="photo-wrapper" style={{ width: 'clamp(280px, 38vw, 480px)', height: 'clamp(340px, 45vw, 540px)', position: 'relative' }}>

            {/* Glow layers */}
            <div className="photo-glow" />
            <div className="photo-ring" />
            <div className="photo-ring-2" />
            <div className="photo-ground" />

            {/* Corner brackets */}
            <div className="photo-bracket" />
            <div className="photo-bracket-br" />

            {/* Floating stat badges */}
            <div className="stat-badge stat-badge-1">
              <div className="stat-number">2.5+</div>
              <div className="stat-label">Years Experience</div>
            </div>
                
            <div className="stat-badge stat-badge-2">
              <div className="stat-number">KSA</div>
              <div className="stat-label">Metro & Industrial</div>
            </div>

            {/* Photo */}
            <img
  src="/miisf.png"
  alt="Misfar Ahmad"
  className="hero-photo"
  style={{
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translate(-50%, -25%)',
  }}
/>
          </div>

        </div>

        {/* Scroll button */}
        <button onClick={scrollDown} className="scroll-btn" aria-label="Scroll down">
          <ArrowDown size={18} />
        </button>
      </section>
    </>
  );
}
