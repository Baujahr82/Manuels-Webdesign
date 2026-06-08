/* @ds-bundle: {"format":3,"namespace":"MRDienstleistungenDesignSystem_e71aff","components":[],"sourceHashes":{"ui_kits/website/Button.jsx":"0113ccd2a285","ui_kits/website/Eyebrow.jsx":"56191ce49f3f","ui_kits/website/Footer.jsx":"5e81ddda6577","ui_kits/website/Header.jsx":"dd22ca482a24","ui_kits/website/Hero.jsx":"79b0c4cdaf7a","ui_kits/website/Logo.jsx":"8c134c04017d"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.MRDienstleistungenDesignSystem_e71aff = window.MRDienstleistungenDesignSystem_e71aff || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// ui_kits/website/Button.jsx
try { (() => {
// Button.jsx — variants: primary (mint fill), ghost (border only), dark (ink fill).
function Button({
  children,
  variant = 'primary',
  onClick,
  href,
  iconAfter,
  style = {}
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const variants = {
    primary: {
      base: {
        background: 'var(--mint-500)',
        color: '#fff',
        borderColor: 'transparent'
      },
      hover: {
        background: 'var(--mint-600)'
      }
    },
    ghost: {
      base: {
        background: 'transparent',
        color: 'var(--ink)',
        borderColor: 'var(--line)'
      },
      hover: {
        borderColor: 'var(--ink)'
      }
    },
    dark: {
      base: {
        background: 'var(--ink)',
        color: '#fff',
        borderColor: 'transparent'
      },
      hover: {
        background: 'var(--neutral-700)'
      }
    }
  };
  const v = variants[variant];
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    fontFamily: 'var(--font-body)',
    fontWeight: 600,
    fontSize: 16,
    padding: '13px 24px',
    borderRadius: 100,
    border: '1.5px solid transparent',
    cursor: 'pointer',
    transition: 'transform 150ms var(--ease), background 200ms var(--ease), border-color 200ms var(--ease), color 200ms var(--ease)',
    transform: press ? 'translateY(0)' : hover ? 'translateY(-2px)' : 'translateY(0)',
    textDecoration: 'none',
    ...v.base,
    ...(hover ? v.hover : {}),
    ...style
  };
  const Tag = href ? 'a' : 'button';
  return /*#__PURE__*/React.createElement(Tag, {
    href: href,
    onClick: onClick,
    style: baseStyle,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false)
  }, /*#__PURE__*/React.createElement("span", null, children), iconAfter && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex'
    }
  }, iconAfter));
}
window.Button = Button;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Button.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Eyebrow.jsx
try { (() => {
// Eyebrow.jsx — small uppercase label, used above section titles.
function Eyebrow({
  children,
  color = 'var(--mint-600)',
  style = {}
}) {
  return /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
      fontSize: 14,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color,
      margin: 0,
      ...style
    }
  }, children);
}
window.Eyebrow = Eyebrow;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Footer.jsx
try { (() => {
// Footer.jsx — three-column footer with contact, address, links. Top-anchored `kontakt` id.
function Footer({
  onNav
}) {
  return /*#__PURE__*/React.createElement("footer", {
    id: "kontakt",
    style: {
      borderTop: '1px solid var(--line)',
      padding: '48px 0 36px',
      marginTop: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--maxw)',
      margin: '0 auto',
      padding: '0 var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "footer-grid",
    style: {
      display: 'grid',
      gridTemplateColumns: '2fr 1.2fr 1fr',
      gap: 28
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Logo, {
    variant: "mr-dienstleistungen",
    height: 56
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 18,
      fontSize: 15,
      lineHeight: 1.7,
      color: 'var(--neutral-500)'
    }
  }, "Manuel Rudorfer", /*#__PURE__*/React.createElement("br", null), "Hellerichstr. 11", /*#__PURE__*/React.createElement("br", null), "75181 Pforzheim")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '1rem',
      fontWeight: 700,
      color: 'var(--ink)',
      marginBottom: 12
    }
  }, "Kontakt"), /*#__PURE__*/React.createElement("a", {
    href: "mailto:manuel-dienstleistungen@gmx.de",
    style: {
      display: 'block',
      fontSize: 15,
      color: 'var(--ink)',
      opacity: .85,
      lineHeight: 1.9,
      textDecoration: 'none'
    }
  }, "manuel-dienstleistungen@gmx.de"), /*#__PURE__*/React.createElement("a", {
    href: "tel:+4901777892311",
    style: {
      display: 'block',
      fontSize: 15,
      color: 'var(--ink)',
      opacity: .85,
      lineHeight: 1.9,
      textDecoration: 'none'
    }
  }, "0177 \u2013 789 2311")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '1rem',
      fontWeight: 700,
      color: 'var(--ink)',
      marginBottom: 12
    }
  }, "Leistungen"), [['buttons', 'Buttonschmiede'], ['webdesign', 'Webdesign'], ['vermietung', 'Vermietung']].map(([id, label]) => /*#__PURE__*/React.createElement("a", {
    key: id,
    href: `#${id}`,
    onClick: e => {
      e.preventDefault();
      onNav(id);
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },
    style: {
      display: 'block',
      fontSize: 15,
      color: 'var(--ink)',
      opacity: .85,
      lineHeight: 1.9,
      textDecoration: 'none'
    }
  }, label)))), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 28,
      fontSize: 13,
      color: 'var(--neutral-500)'
    }
  }, "\xA9 2026 MR-Dienstleistungen \xB7 Manuel Rudorfer \xB7 Pforzheim \u2014 Impressumspflichtige Angaben bitte vor Ver\xF6ffentlichung erg\xE4nzen.")));
}
window.Footer = Footer;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Header.jsx
try { (() => {
// Header.jsx — sticky top nav. Background gets blur + paper-tone when scrolled. Nav tabs activate the right page.
function Header({
  page,
  onNav
}) {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const links = [['buttons', 'Buttons'], ['webdesign', 'Webdesign'], ['vermietung', 'Vermietung']];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: scrolled ? 'rgba(251,250,247,.88)' : 'rgba(251,250,247,.0)',
      backdropFilter: scrolled ? 'blur(10px) saturate(140%)' : 'none',
      borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
      transition: 'all 240ms var(--ease)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--maxw)',
      margin: '0 auto',
      padding: '0 var(--gutter)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 74
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#start",
    onClick: e => {
      e.preventDefault();
      onNav('start');
    },
    style: {
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none'
    },
    "aria-label": "MR-Dienstleistungen Startseite"
  }, /*#__PURE__*/React.createElement(Logo, {
    height: 36
  })), /*#__PURE__*/React.createElement("nav", {
    className: "desktop-nav",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 28
    }
  }, links.map(([id, label]) => {
    const active = page === id;
    return /*#__PURE__*/React.createElement("a", {
      key: id,
      href: `#${id}`,
      onClick: e => {
        e.preventDefault();
        onNav(id);
      },
      style: {
        fontFamily: 'var(--font-body)',
        fontSize: 16,
        fontWeight: 500,
        color: 'var(--ink)',
        opacity: active ? 1 : 0.7,
        textDecoration: 'none',
        transition: 'opacity 200ms var(--ease), color 200ms var(--ease)',
        position: 'relative',
        paddingBottom: 2,
        borderBottom: active ? '1.5px solid var(--mint-500)' : '1.5px solid transparent'
      },
      onMouseEnter: e => {
        if (!active) {
          e.currentTarget.style.opacity = '1';
          e.currentTarget.style.color = 'var(--mint-600)';
        }
      },
      onMouseLeave: e => {
        if (!active) {
          e.currentTarget.style.opacity = '0.7';
          e.currentTarget.style.color = 'var(--ink)';
        }
      }
    }, label);
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => onNav('kontakt'),
    style: {
      padding: '11px 20px',
      fontSize: 15
    }
  }, "Kontakt")), /*#__PURE__*/React.createElement("button", {
    className: "mobile-toggle",
    onClick: () => setOpen(o => !o),
    "aria-label": "Men\xFC",
    style: {
      display: 'none',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      padding: 8,
      color: 'var(--ink)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "22",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round"
  }, open ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  })) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
    x1: "4",
    y1: "7",
    x2: "20",
    y2: "7"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "4",
    y1: "17",
    x2: "20",
    y2: "17"
  }))))), open && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px var(--gutter) 22px',
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      background: 'rgba(251,250,247,.96)',
      borderTop: '1px solid var(--line)'
    }
  }, links.map(([id, label]) => /*#__PURE__*/React.createElement("a", {
    key: id,
    href: `#${id}`,
    onClick: e => {
      e.preventDefault();
      onNav(id);
      setOpen(false);
    },
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 22,
      fontWeight: 600,
      color: 'var(--ink)',
      textDecoration: 'none'
    }
  }, label)), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => {
      onNav('kontakt');
      setOpen(false);
    },
    style: {
      alignSelf: 'flex-start'
    }
  }, "Kontakt")));
}
window.Header = Header;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Header.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Hero.jsx
try { (() => {
// Hero.jsx — landing hero. Eyebrow, big headline with mint accent + spark, lead, two CTAs.
function Hero({
  onNav
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      padding: '96px 0 72px',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--maxw)',
      margin: '0 auto',
      padding: '0 var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      animation: 'mr-rise .7s var(--ease) both'
    }
  }, "Pforzheim \xB7 seit Tag\xA0eins pers\xF6nlich"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'clamp(2.4rem, 6vw, 4rem)',
      lineHeight: 1.06,
      letterSpacing: '-0.01em',
      color: 'var(--ink)',
      margin: '18px 0 22px',
      maxWidth: '16ch',
      animation: 'mr-rise .7s var(--ease) both',
      animationDelay: '.08s',
      opacity: 0
    }
  }, "Drei Dinge, ein Anspruch: ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--mint-600)'
    }
  }, "richtig gut gemacht"), ".", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--mint-500)',
      marginLeft: 4
    }
  }, "\u2726")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '1.2rem',
      color: 'var(--ink)',
      opacity: 0.85,
      maxWidth: '42ch',
      lineHeight: 1.6,
      marginBottom: 32,
      animation: 'mr-rise .7s var(--ease) both',
      animationDelay: '.16s',
      opacity: 0
    }
  }, "Hinter MR-Dienstleistungen steckt eine Person, kein Callcenter. Ob Ansteck-Buttons, eine saubere Webseite oder etwas zum Leihen \u2014 du hast immer denselben Ansprechpartner."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      flexWrap: 'wrap',
      animation: 'mr-rise .7s var(--ease) both',
      animationDelay: '.24s',
      opacity: 0
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => {
      document.getElementById('leistungen')?.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }, "Leistungen ansehen"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: () => onNav('kontakt')
  }, "Schreib mir"))));
}
window.Hero = Hero;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Logo.jsx
try { (() => {
// Logo.jsx — uses the real MR SVG. `variant`: "mr" (default) or "mr-dienstleistungen" (long form).
function Logo({
  variant = 'mr',
  height = 40,
  withWordmark = true
}) {
  if (variant === 'mr-dienstleistungen') {
    return /*#__PURE__*/React.createElement("img", {
      src: "../../assets/MR-Logo-Dienstleistungen.svg",
      alt: "MR-Dienstleistungen",
      style: {
        height,
        width: 'auto',
        display: 'block'
      }
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/MR-Logo.svg",
    alt: "MR",
    style: {
      height,
      width: 'auto',
      display: 'block'
    }
  }), withWordmark && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: '1.15rem',
      color: 'var(--ink)',
      letterSpacing: '-0.01em'
    }
  }, "Dienstleistungen"));
}
window.Logo = Logo;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Logo.jsx", error: String((e && e.message) || e) }); }

})();
