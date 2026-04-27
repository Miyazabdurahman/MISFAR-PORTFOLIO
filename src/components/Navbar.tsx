import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'About', href: '#about', num: '' },
  { label: 'Experience', href: '#experience', num: '' },
  { label: 'Skills', href: '#skills', num: '' },
  { label: 'Contact', href: '#contact', num: '' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');
  const [showNav, setShowNav] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 40);

      const sections = links.map(l => document.querySelector(l.href));
      sections.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom > 0) {
          setActive(links[i].href);
        }
      });

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <style>{`
        .nav-wrap {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          transition: all 0.4s ease;
          border-bottom: 0px solid rgb(11, 213, 253);

        }

        .nav-wrap.scrolled {
          background: rgba(5,8,16,0.92);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        .nav-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1.1rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .nav-logo {
          display: flex;
          align-items: center;
        }

        .logo-img {
          height: 15px;
          width: auto;
          display: block;
           transform: translateY(2px); /* up */
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          list-style: none;
          margin: 0; padding: 0;
        }

        .nav-link {
          font-family: 'Syne', sans-serif;
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          color: #64748b;
          text-decoration: none;
          padding: 6px 14px;
          border-radius: 2px;
          transition: all 0.2s;
          position: relative;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .nav-link .num {
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem;
          color: #22d3ee;
          opacity: 0.7;
        }

        .nav-link:hover, .nav-link.active {
          color: #fff;
        }

        .nav-link.active { color: #22d3ee; }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0; left: 14px; right: 14px;
          height: 1px;
          background: #22d3ee;
          transform: scaleX(0);
          transition: transform 0.2s;
        }

        .nav-link:hover::after, .nav-link.active::after {
          transform: scaleX(1);
        }

        .resume-btn {
          font-family: 'DM Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          color: #22d3ee;
          border: 1px solid rgba(34,211,238,0.35);
          padding: 7px 16px;
          border-radius: 2px;
          text-decoration: none;
          margin-left: 0.5rem;
          transition: all 0.2s;
          text-transform: uppercase;
        }

        .resume-btn:hover {
          background: rgba(34,211,238,0.08);
          border-color: #22d3ee;
          box-shadow: 0 0 16px rgba(34,211,238,0.15);
        }

        .mobile-toggle {
          display: none;
          background: none;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          padding: 4px;
        }

        @media (max-width: 768px) {
          .nav-links, .resume-btn { display: none; }
          .mobile-toggle { display: block; }
        }

        .mobile-menu {
          background: rgba(5,8,16,0.98);
          border-top: 1px solid rgba(34,211,238,0.08);
          padding: 1rem 1.5rem 1.5rem;
        }

        .mobile-menu ul {
          list-style: none;
          margin: 0; padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .mobile-menu .nav-link {
          padding: 10px 0;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          border-radius: 0;
          font-size: 0.9rem;
        }

        .mobile-menu .nav-link::after { display: none; }

        .mobile-resume {
          display: inline-block;
          margin-top: 1rem;
        }

        .nav-wrap.hide { transform: translateY(-100%); }
        .nav-wrap.show { transform: translateY(0); }
      `}</style>

      <nav className={`nav-wrap ${scrolled ? 'scrolled' : ''} ${showNav ? 'show' : 'hide'}`}>
        <div className="nav-inner">

          <a href="#hero" className="nav-logo" onClick={e => handleNav(e, '#hero')}>
            <img src="/logogo.png" alt="logo" className="logo-img" />
          </a>

          <ul className="nav-links">
            {links.map(l => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`nav-link ${active === l.href ? 'active' : ''}`}
                  onClick={e => handleNav(e, l.href)}
                >
                  <span className="num">{l.num}</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="/misentho.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="resume-btn"
          >
            Resume
          </a>

          <button
            className="mobile-toggle"
            onClick={() => setMenuOpen(v => !v)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

        </div>

        {menuOpen && (
          <div className="mobile-menu">
            <ul>
              {links.map(l => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className={`nav-link ${active === l.href ? 'active' : ''}`}
                    onClick={e => handleNav(e, l.href)}
                  >
                    <span className="num">{l.num}</span>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href="/misentho.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="resume-btn mobile-resume"
            >
              Resume
            </a>
          </div>
        )}
      </nav>
    </>
  );
}