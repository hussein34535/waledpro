"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Download, Monitor, Smartphone } from "lucide-react"

// ─── Spacing & Color System ───────────────────────────────────────
const C = {
  bg:       "#000000",
  surface:  "rgba(255,255,255,0.04)",
  border:   "rgba(255,255,255,0.08)",
  text:     "#f5f5f7",
  muted:    "rgba(245,245,247,0.5)",
  dimmed:   "rgba(245,245,247,0.28)",
  blue:     "#2997ff",
  blueHover:"#3da0ff",
}

// Reusable pill label above section headings
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: C.blue, marginBottom: 14 }}>
      {children}
    </p>
  )
}

// FAQ accordion item
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: `1px solid ${C.border}` }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", textAlign: "right", background: "none", border: "none",
          color: C.text, fontSize: 16, fontWeight: 600, padding: "20px 0",
          cursor: "pointer", fontFamily: "inherit",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
        }}
      >
        <span>{q}</span>
        <span style={{
          fontSize: 24, color: C.dimmed, fontWeight: 300, flexShrink: 0,
          transform: open ? "rotate(45deg)" : "none",
          transition: "transform .25s ease",
          display: "inline-block",
        }}>+</span>
      </button>
      {open && (
        <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.8, paddingBottom: 20 }}>
          {a}
        </p>
      )}
    </div>
  )
}

export default function Page() {
  const [os, setOs] = useState<"windows" | "android">("windows")
  const [flash, setFlash] = useState(false)

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase()
    if (ua.includes("android") || ua.includes("mobile")) setOs("android")
  }, [])

  const dl = (type: "windows" | "android") => {
    const a = document.createElement("a")
    a.href  = type === "windows" ? "/walednet-setup.exe" : "/waledpro.apk"
    a.download = type === "windows" ? "WaledNet-Setup.exe" : "WaledNet.apk"
    document.body.appendChild(a); a.click(); document.body.removeChild(a)
    setFlash(true); setTimeout(() => setFlash(false), 2800)
  }

  return (
    <main style={{ background: C.bg, color: C.text, fontFamily: "'Cairo',-apple-system,sans-serif", WebkitFontSmoothing: "antialiased" }}>

      {/* ════════════════════════ NAVBAR ════════════════════════ */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(0,0,0,0.82)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
        borderBottom: `1px solid ${C.border}`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 40px", height: 60,
      }}>
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Image src="/app_icon.png" alt="WaledNet" width={30} height={30}
            style={{ borderRadius: 7, mixBlendMode: "screen" }} />
          <span style={{ fontWeight: 800, fontSize: 16, letterSpacing: "-0.3px" }}>WaledNet</span>
        </div>

        {/* Links — hide on small */}
        <div style={{ display: "flex", gap: 28, fontSize: 13, color: C.muted, fontWeight: 500 }}>
          {["#platforms|الأجهزة", "#features|المميزات", "#faq|الأسئلة الشائعة"].map(l => {
            const [href, label] = l.split("|")
            return (
              <a key={href} href={href} style={{ color: "inherit", textDecoration: "none", transition: "color .2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = C.text)}
                onMouseLeave={e => (e.currentTarget.style.color = C.muted)}>
                {label}
              </a>
            )
          })}
        </div>

        {/* Pill CTA */}
        <button onClick={() => dl(os)} style={{
          background: C.blue, color: "#fff", border: "none",
          borderRadius: 980, padding: "8px 20px",
          fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
          transition: "background .2s",
        }}
          onMouseEnter={e => (e.currentTarget.style.background = C.blueHover)}
          onMouseLeave={e => (e.currentTarget.style.background = C.blue)}
        >
          تحميل مجاني
        </button>
      </nav>

      {/* ════════════════════════ HERO ════════════════════════ */}
      <section style={{ textAlign: "center", padding: "112px 24px 72px", maxWidth: 820, margin: "0 auto" }}>

        {/* App Icon */}
        <Image src="/app_icon.png" alt="WaledNet Icon" width={88} height={88}
          style={{ borderRadius: 20, mixBlendMode: "screen", marginBottom: 32, display: "block", margin: "0 auto 32px" }} />

        {/* OS Detection badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 7,
          background: C.surface, border: `1px solid ${C.border}`,
          borderRadius: 980, padding: "6px 16px",
          fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 32,
        }}>
          {os === "windows" ? <Monitor size={12} color={C.blue} /> : <Smartphone size={12} color="#34d399" />}
          {os === "windows" ? "تم التعرف على جهازك — Windows" : "تم التعرف على جهازك — Android"}
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: "clamp(48px, 9vw, 84px)", fontWeight: 900,
          lineHeight: 1.04, letterSpacing: "-2.5px",
          margin: "0 auto 20px",
        }}>
          إنترنت حر.<br />
          <span style={{ background: "linear-gradient(90deg,#60a5fa,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            بلا حدود.
          </span>
        </h1>

        {/* Sub-headline */}
        <p style={{
          fontSize: "clamp(17px, 2.5vw, 21px)", color: C.muted, fontWeight: 400,
          lineHeight: 1.65, maxWidth: 540, margin: "0 auto 48px",
        }}>
          VPN متطور يعمل على الويندوز والأندرويد. يدعم
          VLESS، VMESS، SSH وSlowDNS للإنترنت بدون رصيد باقة.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => dl(os)} style={{
            display: "flex", alignItems: "center", gap: 10,
            background: C.blue, color: "#fff", border: "none",
            borderRadius: 14, padding: "15px 30px",
            fontSize: 16, fontWeight: 800, cursor: "pointer", fontFamily: "inherit",
            letterSpacing: "-0.2px", transition: "all .2s",
            boxShadow: "0 4px 28px rgba(41,151,255,0.28)",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = C.blueHover; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = C.blue;      e.currentTarget.style.transform = "none"; }}
          >
            <Download size={17} />
            {os === "android" ? "تحميل لـ Android (APK)" : "تحميل لـ Windows (EXE)"}
          </button>

          <button onClick={() => dl(os === "android" ? "windows" : "android")} style={{
            display: "flex", alignItems: "center", gap: 10,
            background: C.surface, color: C.text,
            border: `1px solid ${C.border}`,
            borderRadius: 14, padding: "15px 26px",
            fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
            transition: "all .2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = C.surface;                e.currentTarget.style.transform = "none"; }}
          >
            {os === "android" ? <Monitor size={15} color={C.blue} /> : <Smartphone size={15} color="#34d399" />}
            {os === "android" ? "أو تحميل لـ Windows" : "أو تحميل لـ Android"}
          </button>
        </div>

        {/* Micro copy */}
        <p style={{ fontSize: 12, color: C.dimmed, marginTop: 18, fontWeight: 500 }}>
          مجاني · بدون إعلانات · v3.0.0 · Windows 10/11 & Android 6+
        </p>

        {/* Download flash */}
        {flash && (
          <div style={{
            marginTop: 20, display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.25)",
            borderRadius: 980, padding: "7px 18px",
            fontSize: 13, color: "#34d399", fontWeight: 600,
          }}>
            ✓ جاري التحميل
          </div>
        )}
      </section>

      {/* ════════════════════════ SCREENSHOT ════════════════════════ */}
      <div style={{ maxWidth: 1080, margin: "0 auto 96px", padding: "0 24px" }}>
        <div style={{
          borderRadius: 20, overflow: "hidden",
          border: `1px solid ${C.border}`,
          boxShadow: "0 60px 120px rgba(0,0,0,0.95), 0 0 0 1px rgba(255,255,255,0.03), 0 0 100px rgba(41,151,255,0.04)",
        }}>
          {/* Window chrome */}
          <div style={{
            background: "rgba(22,22,24,0.98)", padding: "13px 18px",
            display: "flex", alignItems: "center", gap: 7,
            borderBottom: `1px solid ${C.border}`,
          }}>
            {["#ff5f57","#ffbd2e","#28c840"].map(c => (
              <div key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c }} />
            ))}
            <span style={{ marginRight: 14, fontSize: 12, color: C.dimmed, fontWeight: 500 }}>
              WaledNet VPN · v3.0.0
            </span>
          </div>
          <Image src="/windows_screen.png" alt="WaledNet Interface" width={1080} height={620}
            style={{ display: "block", width: "100%", height: "auto" }} priority />
        </div>
      </div>

      {/* ════════════════════════ PLATFORMS ════════════════════════ */}
      <section id="platforms" style={{ borderTop: `1px solid ${C.border}`, padding: "96px 24px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>

          {/* Section header */}
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <Eyebrow>توافق متكامل</Eyebrow>
            <h2 style={{ fontSize: "clamp(30px, 5vw, 52px)", fontWeight: 900, letterSpacing: "-1.5px", lineHeight: 1.1, marginBottom: 16 }}>
              تطبيق واحد. منصتان.
            </h2>
            <p style={{ fontSize: 18, color: C.muted, maxWidth: 480, margin: "0 auto", lineHeight: 1.6, fontWeight: 400 }}>
              نفس الجودة والأداء على الويندوز والأندرويد، بتصميمَين مخصصَين لكل جهاز.
            </p>
          </div>

          {/* Platform cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: 16 }}>
            {[
              {
                icon: <Monitor size={24} color={C.blue} />,
                bg: "rgba(41,151,255,0.1)", border: "rgba(41,151,255,0.2)",
                title: "Windows", sub: ".exe installer · 64-bit",
                desc: "مُحسَّن لأجهزة ويندوز 10 و 11. استهلاك أقل من 25MB RAM مع دعم كامل لتوجيه الترافيك.",
                btn: "تحميل WaledNet-Setup.exe", color: C.blue, type: "windows" as const,
              },
              {
                icon: <Smartphone size={24} color="#34d399" />,
                bg: "rgba(52,211,153,0.1)", border: "rgba(52,211,153,0.2)",
                title: "Android", sub: ".apk sideload · Android 6+",
                desc: "خفيف وسريع على جميع الأجهزة. يدعم SlowDNS للإنترنت بدون رصيد مع إشعار حيّ للسرعة.",
                btn: "تحميل WaledNet.apk", color: "#34d399", type: "android" as const,
              },
            ].map(p => (
              <div key={p.type} style={{
                background: C.surface, border: `1px solid ${C.border}`,
                borderRadius: 18, padding: "36px 32px",
                display: "flex", flexDirection: "column", gap: 0,
              }}>
                {/* Icon */}
                <div style={{
                  width: 50, height: 50, background: p.bg,
                  border: `1px solid ${p.border}`, borderRadius: 14,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 20,
                }}>
                  {p.icon}
                </div>

                {/* Title */}
                <h3 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 4 }}>{p.title}</h3>
                <p style={{ fontSize: 12, color: C.dimmed, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 16 }}>{p.sub}</p>

                {/* Description */}
                <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.75, marginBottom: 28, flex: 1 }}>{p.desc}</p>

                {/* CTA */}
                <button onClick={() => dl(p.type)} style={{
                  display: "flex", alignItems: "center", gap: 8,
                  background: p.bg, color: p.color,
                  border: `1px solid ${p.border}`,
                  borderRadius: 980, padding: "10px 20px",
                  fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
                  alignSelf: "flex-start", transition: "opacity .2s",
                }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.75")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                >
                  <Download size={13} />
                  {p.btn}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════ FEATURES ════════════════════════ */}
      <section id="features" style={{ borderTop: `1px solid ${C.border}`, padding: "96px 24px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>

          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <Eyebrow>البروتوكولات المدعومة</Eyebrow>
            <h2 style={{ fontSize: "clamp(30px, 5vw, 52px)", fontWeight: 900, letterSpacing: "-1.5px", lineHeight: 1.1, marginBottom: 16 }}>
              أربع تقنيات. حماية كاملة.
            </h2>
            <p style={{ fontSize: 18, color: C.muted, maxWidth: 480, margin: "0 auto", lineHeight: 1.6, fontWeight: 400 }}>
              نوفر أحدث بروتوكولات التشفير وتجاوز الحجب — كلها في تطبيق واحد.
            </p>
          </div>

          {/* 2×2 Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            {[
              { emoji: "🌐", title: "SlowDNS", color: "#34d399",
                desc: "اتصال مشفر عبر أنفاق DNS. يتجاوز قيود الباقة على جميع شبكات المحمول المحلية." },
              { emoji: "⚡", title: "VLESS & VMESS", color: "#60a5fa",
                desc: "بروتوكولات الجيل الجديد بسرعة نقل فائقة وقدرة عالية على تجاوز الجدران النارية." },
              { emoji: "🔒", title: "SSH Tunneling", color: "#a78bfa",
                desc: "تشفير عسكري المستوى يحمي خصوصيتك على أي شبكة عامة أو خاصة." },
              { emoji: "🚀", title: "SNI Bypass", color: "#f59e0b",
                desc: "أضف وخصص حزم SNI الخاصة بك لتحقيق أقصى سرعة على شبكتك تحديداً." },
            ].map((f, i) => (
              <div key={i} style={{
                padding: "44px 40px",
                background: i % 2 === 0 ? C.surface : "rgba(255,255,255,0.02)",
                borderTop: i >= 2 ? `1px solid ${C.border}` : "none",
                borderRight: i % 2 === 0 ? `1px solid ${C.border}` : "none",
              }}>
                <div style={{ fontSize: 40, marginBottom: 20 }}>{f.emoji}</div>
                <h3 style={{ fontSize: 19, fontWeight: 800, color: C.text, marginBottom: 10, letterSpacing: "-0.3px" }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.8 }}>{f.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ════════════════════════ FAQ ════════════════════════ */}
      <section id="faq" style={{ borderTop: `1px solid ${C.border}`, padding: "96px 24px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>

          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <Eyebrow>الأسئلة الشائعة</Eyebrow>
            <h2 style={{ fontSize: "clamp(30px, 5vw, 48px)", fontWeight: 900, letterSpacing: "-1.2px" }}>
              كل ما تريد معرفته.
            </h2>
          </div>

          <div style={{ borderTop: `1px solid ${C.border}` }}>
            <FaqItem q="هل يعمل على الويندوز والأندرويد بنفس الكفاءة؟"
              a="نعم. كل نسخة مُصممة خصيصاً للمنصة، بنفس البروتوكولات والسيرفرات وبدون أي فرق في الأداء." />
            <FaqItem q="كيف يعمل SlowDNS بدون رصيد باقة؟"
              a="يمرر بياناتك عبر أنفاق DNS مشفرة تعمل على طبقة DNS الأساسية للشبكة، مستقلةً عن الباقة." />
            <FaqItem q="هل التطبيق مجاني وبدون إعلانات تماماً؟"
              a="نعم، مجاني 100% وخالٍ من الإعلانات، مع تحديثات مستمرة للسيرفرات والبروتوكولات." />
            <FaqItem q="كيف أُضيف حزمة SNI خاصة بي؟"
              a="من قسم (حزم SNI) داخل التطبيق، تستطيع إضافة وتخصيص أي حزمة SNI للحصول على أعلى أداء." />
          </div>

        </div>
      </section>

      {/* ════════════════════════ FINAL CTA ════════════════════════ */}
      <section style={{ borderTop: `1px solid ${C.border}`, padding: "96px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <h2 style={{
            fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 900,
            letterSpacing: "-2px", lineHeight: 1.08, marginBottom: 20,
          }}>
            ابدأ الاتصال.<br />الآن.
          </h2>
          <p style={{ fontSize: 18, color: C.muted, marginBottom: 44, lineHeight: 1.6 }}>
            مجاني. فوري. بلا قيود.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => dl("windows")} style={{
              display: "flex", alignItems: "center", gap: 10,
              background: C.blue, color: "#fff", border: "none",
              borderRadius: 980, padding: "15px 32px",
              fontSize: 16, fontWeight: 800, cursor: "pointer", fontFamily: "inherit",
              transition: "all .2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = C.blueHover; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = C.blue;      e.currentTarget.style.transform = "none"; }}
            >
              <Monitor size={17} /> تحميل لـ Windows
            </button>
            <button onClick={() => dl("android")} style={{
              display: "flex", alignItems: "center", gap: 10,
              background: C.surface, color: C.text,
              border: `1px solid ${C.border}`,
              borderRadius: 980, padding: "15px 28px",
              fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
              transition: "all .2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.09)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = C.surface;                e.currentTarget.style.transform = "none"; }}
            >
              <Smartphone size={16} /> تحميل لـ Android
            </button>
          </div>
        </div>
      </section>

      {/* ════════════════════════ FOOTER ════════════════════════ */}
      <footer style={{
        borderTop: `1px solid ${C.border}`,
        padding: "28px 40px",
        display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Image src="/app_icon.png" alt="WaledNet" width={22} height={22}
            style={{ borderRadius: 5, mixBlendMode: "screen" }} />
          <span style={{ fontSize: 12, color: C.dimmed, fontWeight: 600 }}>
            © 2026 WaledNet VPN. جميع الحقوق محفوظة.
          </span>
        </div>
        <a href="https://t.me/waledpro" target="_blank" rel="noopener noreferrer"
          style={{ fontSize: 12, color: C.blue, textDecoration: "none", fontWeight: 700 }}>
          قناة الدعم على تليجرام ›
        </a>
      </footer>

    </main>
  )
}
