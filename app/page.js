"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, ChevronRight, Stethoscope, Menu, X, Sparkles } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import Icon from "@/components/Icon";
import { translations } from "@/lib/translations";
import { C, LOGO_LIGHT, LOGO_DARK } from "@/lib/constants";

/* ─── Reusable UI Pieces ─── */
function Tag({ children, green }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "8px 20px",
        borderRadius: 100,
        fontSize: 13,
        fontWeight: 600,
        letterSpacing: 0.3,
        background: green ? `${C.green}15` : `${C.blue}15`,
        color: green ? C.greenDeep : C.blue,
        border: `1px solid ${green ? C.green : C.blue}20`,
      }}
    >
      <Sparkles size={13} />
      {children}
    </span>
  );
}

function Btn({ children, primary, green, style: st = {} }) {
  return (
    <button
      className="sira-btn"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "16px 32px",
        borderRadius: 14,
        border: "none",
        fontSize: 15,
        fontWeight: 600,
        cursor: "pointer",
        background: green
          ? `linear-gradient(135deg, ${C.green}, ${C.greenDeep})`
          : primary
            ? `linear-gradient(135deg, ${C.blue}, ${C.blueDeep})`
            : "rgba(255,255,255,0.9)",
        color: primary || green ? "#fff" : C.text,
        boxShadow: primary
          ? `0 8px 32px ${C.blue}40, 0 2px 8px ${C.blue}20`
          : green
            ? `0 8px 32px ${C.green}40, 0 2px 8px ${C.green}20`
            : `0 2px 12px rgba(0,0,0,0.06), inset 0 0 0 1.5px ${C.border}`,
        backdropFilter: !primary && !green ? "blur(12px)" : undefined,
        ...st,
      }}
    >
      {children}
    </button>
  );
}

function SectionTitle({ children, center }) {
  return (
    <h2
      style={{
        fontFamily: "'Instrument Sans', sans-serif",
        fontSize: "clamp(28px, 4vw, 44px)",
        fontWeight: 800,
        letterSpacing: "-0.03em",
        margin: "16px 0",
        lineHeight: 1.15,
        ...(center ? { textAlign: "center" } : {}),
      }}
    >
      {children}
    </h2>
  );
}

function SectionSub({ children, center }) {
  return (
    <p
      style={{
        fontSize: 17,
        color: C.muted,
        maxWidth: 560,
        marginBottom: 48,
        lineHeight: 1.75,
        ...(center ? { textAlign: "center", margin: "0 auto 48px" } : {}),
      }}
    >
      {children}
    </p>
  );
}

/* ─── Floating Orb Background ─── */
function GlowOrb({ color, size, top, left, right, bottom, blur = 120, opacity = 0.12 }) {
  return (
    <div
      className="glow-orb"
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        filter: `blur(${blur}px)`,
        opacity,
        top,
        left,
        right,
        bottom,
        pointerEvents: "none",
      }}
    />
  );
}

/* ─── Main Page ─── */
export default function HomePage() {
  const [lang, setLang] = useState("fr");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const d = translations[lang];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const section = { maxWidth: 1180, margin: "0 auto", padding: "100px 24px" };

  return (
    <>
      {/* ═══════════ NAV ═══════════ */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: scrolled ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,0)",
          backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
          borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent",
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          padding: scrolled ? "10px 0" : "18px 0",
        }}
      >
        <div
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Image src={LOGO_LIGHT} alt="Sira Medical Pro" width={96} height={38} style={{ objectFit: "contain" }} priority />

          {/* Desktop nav */}
          <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: 36 }}>
            {Object.entries(d.nav)
              .slice(0, 3)
              .map(([k, v]) => (
                <a key={k} href={`#${k}`} className="sira-link" style={{ fontSize: 14, fontWeight: 500, color: C.muted }}>
                  {v}
                </a>
              ))}

            {/* Language toggle */}
            <div style={{ display: "flex", background: C.borderLight, borderRadius: 10, padding: 3, gap: 2 }}>
              {["FR", "EN"].map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l.toLowerCase())}
                  style={{
                    padding: "5px 14px",
                    borderRadius: 8,
                    border: "none",
                    cursor: "pointer",
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: 0.5,
                    background: lang === l.toLowerCase() ? C.blue : "transparent",
                    color: lang === l.toLowerCase() ? "#fff" : C.muted,
                    transition: "all 0.25s",
                  }}
                >
                  {l}
                </button>
              ))}
            </div>

            <Btn primary style={{ padding: "10px 22px", fontSize: 13 }}>
              {d.nav.download}
            </Btn>
          </div>

          {/* Mobile toggle */}
          <button
            className="mobile-toggle"
            onClick={() => setMobileMenu(!mobileMenu)}
            style={{
              display: "none",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              border: "none",
              background: "transparent",
              cursor: "pointer",
            }}
          >
            {mobileMenu ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileMenu && (
          <div
            style={{
              background: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(20px)",
              borderTop: `1px solid ${C.border}`,
              padding: "16px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {Object.entries(d.nav)
              .slice(0, 3)
              .map(([k, v]) => (
                <a
                  key={k}
                  href={`#${k}`}
                  onClick={() => setMobileMenu(false)}
                  style={{ fontSize: 15, fontWeight: 500, color: C.text, padding: "8px 0" }}
                >
                  {v}
                </a>
              ))}
            <div style={{ display: "flex", gap: 8, paddingTop: 8 }}>
              {["FR", "EN"].map((l) => (
                <button
                  key={l}
                  onClick={() => {
                    setLang(l.toLowerCase());
                    setMobileMenu(false);
                  }}
                  style={{
                    padding: "8px 20px",
                    borderRadius: 8,
                    border: `1px solid ${C.border}`,
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: 600,
                    background: lang === l.toLowerCase() ? C.blue : "#fff",
                    color: lang === l.toLowerCase() ? "#fff" : C.text,
                  }}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* ═══════════ HERO ═══════════ */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          background: `linear-gradient(180deg, #F0F7FC 0%, #fff 50%, ${C.bg} 100%)`,
        }}
      >
        {/* Background glow orbs */}
        <GlowOrb color={C.blue} size={600} top="-10%" left="-5%" blur={160} opacity={0.08} />
        <GlowOrb color={C.green} size={500} top="10%" right="-8%" blur={140} opacity={0.07} />
        <GlowOrb color={C.blue} size={300} bottom="5%" right="20%" blur={100} opacity={0.05} />
        <GlowOrb color={C.green} size={250} bottom="15%" left="10%" blur={100} opacity={0.04} />

        {/* Grid pattern overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.03) 1px, transparent 0)",
            backgroundSize: "40px 40px",
            pointerEvents: "none",
          }}
        />

        {/* Decorative rings */}
        <div
          className="hero-ring"
          style={{
            position: "absolute",
            top: "12%",
            right: "8%",
            width: 400,
            height: 400,
            borderRadius: "50%",
            border: `1.5px solid ${C.blue}12`,
          }}
        />
        <div
          className="hero-ring"
          style={{
            position: "absolute",
            bottom: "8%",
            left: "5%",
            width: 300,
            height: 300,
            borderRadius: "50%",
            border: `1.5px solid ${C.green}12`,
          }}
        />

        <div
          className="section-pad"
          style={{
            ...section,
            paddingTop: 160,
            paddingBottom: 100,
            position: "relative",
            width: "100%",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <FadeIn>
            <Tag>{d.hero.badge}</Tag>
          </FadeIn>

          <FadeIn delay={0.08}>
            <h1
              className="hero-title"
              style={{
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: 72,
                fontWeight: 800,
                lineHeight: 1.04,
                margin: "28px 0",
                letterSpacing: "-0.04em",
                maxWidth: 700,
              }}
            >
              {d.hero.title1}
              <br />
              <span
                style={{
                  background: `linear-gradient(135deg, ${C.blue}, ${C.green})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {d.hero.title2}
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.16}>
            <p
              style={{
                fontSize: 18,
                color: C.muted,
                maxWidth: 520,
                lineHeight: 1.8,
                marginBottom: 40,
              }}
            >
              {d.hero.sub}
            </p>
          </FadeIn>

          <FadeIn delay={0.24}>
            <div className="cta-btns" style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
              <Btn primary>
                {d.hero.cta1} <ArrowRight size={18} />
              </Btn>
              <Btn>
                {d.hero.cta2} <ChevronRight size={18} />
              </Btn>
            </div>
          </FadeIn>

          {/* Mini preview cards */}
          <FadeIn delay={0.36} style={{ marginTop: 64 }}>
            <div className="hero-cards" style={{ display: "flex", gap: 16, justifyContent: "center" }}>
              <div
                className="sira-card"
                style={{
                  background: "rgba(255,255,255,0.8)",
                  backdropFilter: "blur(20px)",
                  borderRadius: 20,
                  padding: "24px 28px",
                  boxShadow: "0 16px 64px -12px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.03)",
                  border: `1px solid rgba(255,255,255,0.6)`,
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  minWidth: 290,
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 16,
                    background: `linear-gradient(135deg, ${C.blue}18, ${C.blue}08)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Stethoscope size={24} color={C.blue} strokeWidth={1.6} />
                </div>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>Dr. Amina Benali</div>
                  <div style={{ fontSize: 13, color: C.muted }}>{d.doctorName}</div>
                  <div
                    style={{
                      fontSize: 12,
                      color: C.green,
                      fontWeight: 700,
                      marginTop: 4,
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <span
                      className="pulse-dot"
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        background: C.green,
                        display: "inline-block",
                      }}
                    />
                    {d.available}
                  </div>
                </div>
              </div>

              <div
                className="sira-card"
                style={{
                  background: "rgba(255,255,255,0.8)",
                  backdropFilter: "blur(20px)",
                  borderRadius: 20,
                  padding: "24px 28px",
                  boxShadow: "0 16px 64px -12px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.03)",
                  border: `1px solid rgba(255,255,255,0.6)`,
                  textAlign: "left",
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    color: C.light,
                    fontWeight: 700,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                    marginBottom: 8,
                  }}
                >
                  {d.nextAppt}
                </div>
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: 30,
                    background: `linear-gradient(135deg, ${C.blue}, ${C.blueDeep})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontFamily: "'Instrument Sans', sans-serif",
                  }}
                >
                  14:30
                </div>
                <div style={{ fontSize: 13, color: C.muted, marginTop: 2 }}>{d.today}</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════ FOR PATIENTS ═══════════ */}
      <section id="patients" style={{ background: C.bg, position: "relative", overflow: "hidden" }}>
        <GlowOrb color={C.blue} size={400} top="-15%" right="-5%" blur={140} opacity={0.05} />
        <div className="section-pad" style={{ ...section, position: "relative" }}>
          <FadeIn><Tag>{d.patients.tag}</Tag></FadeIn>
          <FadeIn delay={0.06}><SectionTitle>{d.patients.title}</SectionTitle></FadeIn>
          <FadeIn delay={0.1}><SectionSub>{d.patients.sub}</SectionSub></FadeIn>
          <div className="grid-4">
            {d.patients.cards.map((c, i) => (
              <FadeIn key={i} delay={0.08 + i * 0.06}>
                <div
                  className="sira-card"
                  style={{
                    background: i === 0 ? `linear-gradient(160deg, ${C.blue}08, #fff)` : "#fff",
                    borderRadius: 20,
                    padding: "32px 28px",
                    border: `1px solid ${i === 0 ? C.blue + "25" : C.border}`,
                    height: "100%",
                    boxShadow: i === 0 ? `0 8px 40px ${C.blue}10` : "0 2px 12px rgba(0,0,0,0.02)",
                  }}
                >
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 16,
                      background: i === 0 ? `linear-gradient(135deg, ${C.blue}18, ${C.blue}08)` : C.borderLight,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 22,
                    }}
                  >
                    <Icon name={c.icon} size={22} color={i === 0 ? C.blue : C.muted} />
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10 }}>{c.title}</h3>
                  <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.75 }}>{c.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FOR PROFESSIONALS ═══════════ */}
      <section id="professionals" style={{ position: "relative", overflow: "hidden" }}>
        <GlowOrb color={C.green} size={350} bottom="-10%" left="-5%" blur={120} opacity={0.06} />
        <div className="section-pad" style={{ ...section, position: "relative" }}>
          <FadeIn><Tag green>{d.pros.tag}</Tag></FadeIn>
          <FadeIn delay={0.06}><SectionTitle>{d.pros.title}</SectionTitle></FadeIn>
          <FadeIn delay={0.1}><SectionSub>{d.pros.sub}</SectionSub></FadeIn>
          <div className="grid-4">
            {d.pros.cards.map((c, i) => (
              <FadeIn key={i} delay={0.08 + i * 0.06}>
                <div
                  className="sira-card"
                  style={{
                    background: i === 1 ? `linear-gradient(160deg, ${C.green}08, #fff)` : "#fff",
                    borderRadius: 20,
                    padding: "32px 28px",
                    border: `1px solid ${i === 1 ? C.green + "25" : C.border}`,
                    height: "100%",
                    boxShadow: i === 1 ? `0 8px 40px ${C.green}10` : "0 2px 12px rgba(0,0,0,0.02)",
                  }}
                >
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 16,
                      background: i === 1 ? `linear-gradient(135deg, ${C.green}18, ${C.green}08)` : C.borderLight,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 22,
                    }}
                  >
                    <Icon name={c.icon} size={22} color={i === 1 ? C.green : C.muted} />
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10 }}>{c.title}</h3>
                  <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.75 }}>{c.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FEATURES ═══════════ */}
      <section id="features" style={{ background: C.bg, position: "relative", overflow: "hidden" }}>
        <GlowOrb color={C.blue} size={300} top="10%" left="-8%" blur={120} opacity={0.05} />
        <GlowOrb color={C.green} size={250} bottom="10%" right="-5%" blur={100} opacity={0.04} />
        <div className="section-pad" style={{ ...section, position: "relative" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <FadeIn><Tag>{d.features.tag}</Tag></FadeIn>
            <FadeIn delay={0.06}><SectionTitle center>{d.features.title}</SectionTitle></FadeIn>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {d.features.items.map((f, i) => (
              <FadeIn key={i} delay={0.1 + i * 0.1}>
                <div
                  className="feature-row sira-card"
                  style={{
                    display: "flex",
                    gap: 36,
                    alignItems: "center",
                    background: "#fff",
                    borderRadius: 24,
                    padding: "48px 44px",
                    border: `1px solid ${C.border}`,
                    flexDirection: i % 2 === 1 ? "row-reverse" : "row",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
                  }}
                >
                  <div
                    style={{
                      width: 96,
                      height: 96,
                      borderRadius: 28,
                      flexShrink: 0,
                      background: `linear-gradient(135deg, ${i === 0 ? C.blue : C.green}15, ${i === 0 ? C.blue : C.green}05)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: `0 8px 32px ${i === 0 ? C.blue : C.green}12`,
                    }}
                  >
                    <Icon name={f.icon} size={38} color={i === 0 ? C.blue : C.green} />
                  </div>
                  <div>
                    <h3
                      style={{
                        fontFamily: "'Instrument Sans', sans-serif",
                        fontSize: 24,
                        fontWeight: 800,
                        marginBottom: 14,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {f.title}
                    </h3>
                    <p style={{ fontSize: 16, color: C.muted, lineHeight: 1.85 }}>{f.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ HOW IT WORKS ═══════════ */}
      <section style={{ position: "relative", overflow: "hidden" }}>
        <GlowOrb color={C.green} size={300} top="-10%" right="10%" blur={120} opacity={0.04} />
        <div className="section-pad" style={{ ...section, position: "relative" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <FadeIn><Tag green>{d.steps.tag}</Tag></FadeIn>
            <FadeIn delay={0.06}><SectionTitle center>{d.steps.title}</SectionTitle></FadeIn>
          </div>
          <div className="grid-3">
            {d.steps.items.map((s, i) => (
              <FadeIn key={i} delay={0.1 + i * 0.1}>
                <div
                  className="sira-card"
                  style={{
                    textAlign: "center",
                    padding: "40px 28px",
                    background: "#fff",
                    borderRadius: 24,
                    border: `1px solid ${C.border}`,
                    height: "100%",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.02)",
                  }}
                >
                  <div
                    style={{
                      width: 68,
                      height: 68,
                      borderRadius: 22,
                      margin: "0 auto 24px",
                      background: `linear-gradient(135deg, ${C.blue}14, ${C.green}10)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'Instrument Sans', sans-serif",
                      fontSize: 24,
                      fontWeight: 800,
                      color: C.blue,
                      boxShadow: `0 6px 24px ${C.blue}10`,
                    }}
                  >
                    {s.n}
                  </div>
                  <h3 style={{ fontSize: 19, fontWeight: 700, marginBottom: 12 }}>{s.title}</h3>
                  <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.75 }}>{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ WHY SIRA ═══════════ */}
      <section style={{ background: C.bg, position: "relative", overflow: "hidden" }}>
        <GlowOrb color={C.blue} size={350} bottom="-10%" left="15%" blur={130} opacity={0.05} />
        <div className="section-pad" style={{ ...section, position: "relative" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <FadeIn><Tag>{d.trust.tag}</Tag></FadeIn>
            <FadeIn delay={0.06}><SectionTitle center>{d.trust.title}</SectionTitle></FadeIn>
          </div>
          <div className="grid-3">
            {d.trust.items.map((item, i) => (
              <FadeIn key={i} delay={0.1 + i * 0.08}>
                <div
                  className="sira-card"
                  style={{
                    textAlign: "center",
                    padding: "40px 28px",
                    background: "#fff",
                    borderRadius: 24,
                    border: `1px solid ${C.border}`,
                    height: "100%",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.02)",
                  }}
                >
                  <div
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 20,
                      margin: "0 auto 22px",
                      background: `linear-gradient(135deg, ${C.blue}15, ${C.blue}05)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: `0 6px 24px ${C.blue}10`,
                    }}
                  >
                    <Icon name={item.icon} size={26} color={C.blue} />
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{item.title}</h3>
                  <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.75 }}>{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section style={{ padding: "100px 24px" }}>
        <FadeIn>
          <div
            style={{
              maxWidth: 820,
              margin: "0 auto",
              textAlign: "center",
              background: `linear-gradient(160deg, ${C.blue}08, ${C.green}06, ${C.blue}04)`,
              borderRadius: 32,
              padding: "72px 48px",
              border: `1px solid ${C.blue}15`,
              position: "relative",
              overflow: "hidden",
              boxShadow: `0 24px 80px -16px ${C.blue}12`,
            }}
          >
            <GlowOrb color={C.green} size={250} top={-80} right={-60} blur={80} opacity={0.1} />
            <GlowOrb color={C.blue} size={200} bottom={-60} left={-40} blur={80} opacity={0.1} />
            <div style={{ position: "relative" }}>
              <h2
                style={{
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontSize: "clamp(24px, 4vw, 40px)",
                  fontWeight: 800,
                  marginBottom: 18,
                  letterSpacing: "-0.03em",
                }}
              >
                {d.cta.title}
              </h2>
              <p style={{ fontSize: 17, color: C.muted, marginBottom: 40, lineHeight: 1.75, maxWidth: 500, margin: "0 auto 40px" }}>
                {d.cta.sub}
              </p>
              <div className="cta-btns" style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
                <Btn primary>{d.cta.btn1} <ArrowRight size={18} /></Btn>
                <Btn green>{d.cta.btn2}</Btn>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer style={{ background: C.dark, color: "rgba(255,255,255,0.55)", padding: "72px 24px 36px" }}>
        <div
          className="footer-grid"
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "2.2fr 1fr 1fr 1fr",
            gap: 48,
          }}
        >
          <div>
            <Image src={LOGO_DARK} alt="Sira" width={93} height={36} style={{ objectFit: "contain", marginBottom: 20 }} />
            <p style={{ fontSize: 14, lineHeight: 1.85, maxWidth: 260 }}>{d.footer.desc}</p>
          </div>
          {d.footer.cols.map((col, i) => (
            <div key={i}>
              <h4 style={{ color: "#fff", fontSize: 13, fontWeight: 700, marginBottom: 20, letterSpacing: 0.5, textTransform: "uppercase" }}>
                {col.t}
              </h4>
              {col.items.map((item, j) => (
                <div key={j} className="sira-link" style={{ fontSize: 14, marginBottom: 14, cursor: "pointer" }}>
                  {item}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div
          style={{
            maxWidth: 1180,
            margin: "52px auto 0",
            paddingTop: 28,
            borderTop: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
            fontSize: 13,
          }}
        >
          <span>{d.footer.copy}</span>
          <div style={{ display: "flex", gap: 4, background: "rgba(255,255,255,0.06)", borderRadius: 10, padding: 3 }}>
            {["FR", "EN"].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l.toLowerCase())}
                style={{
                  padding: "5px 14px",
                  borderRadius: 8,
                  border: "none",
                  cursor: "pointer",
                  fontSize: 12,
                  fontWeight: 700,
                  background: lang === l.toLowerCase() ? "rgba(255,255,255,0.15)" : "transparent",
                  color: lang === l.toLowerCase() ? "#fff" : "rgba(255,255,255,0.4)",
                  transition: "all 0.25s",
                }}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
