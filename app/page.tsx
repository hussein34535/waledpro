"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Download, Monitor, Smartphone, Shield, Zap, Globe, Lock, HelpCircle } from "lucide-react"

const C = {
  bg:      "#000000",
  surface: "rgba(255,255,255,0.035)",
  surfaceH:"rgba(255,255,255,0.07)",
  border:  "rgba(255,255,255,0.09)",
  text:    "#f5f5f7",
  muted:   "rgba(245,245,247,0.55)",
  dimmed:  "rgba(245,245,247,0.3)",
  blue:    "#2997ff",
  blueH:   "#3da0ff",
  green:   "#10b981",
  greenH:  "#34d399",
}

const UPDATE_JSON_URL = "https://raw.githubusercontent.com/hussein34535/waledupdate/refs/heads/main/update.json"

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: `1px solid ${C.border}` }}>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", textAlign: "right", background: "none", border: "none",
        color: C.text, fontSize: 14, fontWeight: 600, padding: "14px 4px",
        cursor: "pointer", fontFamily: "inherit",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
      }}>
        <span>{q}</span>
        <span style={{
          fontSize: 18, color: C.dimmed, fontWeight: 300, flexShrink: 0,
          transform: open ? "rotate(45deg)" : "none",
          transition: "transform .2s ease", display: "inline-block",
        }}>+</span>
      </button>
      {open && (
        <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.7, paddingBottom: 14, textAlign: "right", margin: 0 }}>{a}</p>
      )}
    </div>
  )
}

export default function Page() {
  const [os, setOs] = useState<"windows" | "android">("windows")
  const [flash, setFlash] = useState(false)
  const [urls, setUrls] = useState({
    windows: "https://github.com/hussein34535/waledupdate/releases/download/v3.0.0/WaledNet_Setup.exe",
    android: "https://github.com/hussein34535/waledupdate/releases/download/v3.0.0/walednet.apk",
    version: "3.0.0",
  })

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase()
    if (ua.includes("android") || ua.includes("mobile")) setOs("android")

    fetch(UPDATE_JSON_URL)
      .then(res => res.json())
      .then(data => {
        if (data) {
          setUrls({
            windows: data.windows_url || "https://github.com/hussein34535/waledupdate/releases/download/v3.0.0/WaledNet_Setup.exe",
            android: data.android_url || "https://github.com/hussein34535/waledupdate/releases/download/v3.0.0/walednet.apk",
            version: data.version || "3.0.0",
          })
        }
      })
      .catch(() => {})
  }, [])

  const dl = (type: "windows" | "android") => {
    const targetUrl = type === "windows" ? urls.windows : urls.android
    window.location.href = targetUrl
    setFlash(true); setTimeout(() => setFlash(false), 2800)
  }

  return (
    <main style={{ background: C.bg, color: C.text, fontFamily: "'Cairo',-apple-system,sans-serif", WebkitFontSmoothing: "antialiased", minHeight: "100vh" }}>

      <style>{`
        * { box-sizing: border-box; }
        .hero-btn-primary {
          display: inline-flex; items-center; justify-content: center; gap: 6px;
          background: rgba(16,185,129,0.12); color: #34d399;
          border: 1.5px solid rgba(16,185,129,0.4);
          border-radius: 12px; padding: 10px 18px;
          font-size: 13px; font-weight: 700; cursor: pointer; font-family: inherit;
          transition: all .2s; backdrop-filter: blur(8px);
          box-shadow: 0 4px 16px rgba(16,185,129,0.15);
        }
        .hero-btn-primary:hover {
          background: rgba(16,185,129,0.22); border-color: rgba(52,211,153,0.6); transform: translateY(-1px);
        }
        .hero-btn-secondary {
          display: inline-flex; items-center; justify-content: center; gap: 6px;
          background: rgba(41,151,255,0.1); color: #60a5fa;
          border: 1.5px solid rgba(41,151,255,0.35);
          border-radius: 12px; padding: 10px 16px;
          font-size: 13px; font-weight: 700; cursor: pointer; font-family: inherit;
          transition: all .2s; backdrop-filter: blur(8px);
        }
        .hero-btn-secondary:hover {
          background: rgba(41,151,255,0.2); border-color: rgba(96,165,250,0.6); transform: translateY(-1px);
        }
        @media (max-width: 480px) {
          .nav-links { display: none !important; }
          .feature-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 10px !important; }
          .platform-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 10px !important; }
          .btn-group { gap: 8px !important; }
        }
      `}</style>

      {/* ═══════════════ NAVBAR ═══════════════ */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(0,0,0,0.85)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        borderBottom: `1px solid ${C.border}`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 20px", height: 54, maxWidth: 840, margin: "0 auto",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Image src="/app_icon.png" alt="WaledNet" width={26} height={26} style={{ borderRadius: 6, mixBlendMode: "screen" }} />
          <span style={{ fontWeight: 800, fontSize: 15, letterSpacing: "-0.3px" }}>WaledNet</span>
        </div>

        <div className="nav-links" style={{ display: "flex", gap: 20, fontSize: 13, color: C.muted, fontWeight: 500 }}>
          <a href="#features" style={{ color: "inherit", textDecoration: "none" }}>المميزات</a>
          <a href="#faq" style={{ color: "inherit", textDecoration: "none" }}>الأسئلة</a>
        </div>

        <button onClick={() => dl(os)} className="hero-btn-primary" style={{ padding: "6px 14px", fontSize: 12, borderRadius: 10 }}>
          <Download size={13} /> تحميل مجاني
        </button>
      </nav>

      <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 16px 40px", textAlign: "center" }}>

        {/* ═══════════════ HERO (COMPACT & CENTERED) ═══════════════ */}
        <section style={{ padding: "32px 0 24px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          
          <Image src="/app_icon.png" alt="WaledNet" width={64} height={64}
            style={{ borderRadius: 16, mixBlendMode: "screen", margin: "0 auto 16px", filter: "drop-shadow(0 0 20px rgba(41,151,255,0.3))" }} />

          {/* Device badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: C.surface, border: `1px solid ${C.border}`,
            borderRadius: 980, padding: "5px 14px",
            fontSize: 11, fontWeight: 600, color: C.muted, marginBottom: 16,
          }}>
            {os === "windows" ? <Monitor size={11} color={C.blue} /> : <Smartphone size={11} color="#34d399" />}
            {os === "windows" ? "تم التعرف على جهازك — Windows" : "تم التعرف على جهازك — Android"}
          </div>

          <h1 style={{
            fontSize: "clamp(26px,6vw,44px)", fontWeight: 900,
            lineHeight: 1.15, letterSpacing: "-1px", margin: "0 auto 10px",
          }}>
            إنترنت حر. <span style={{ background: "linear-gradient(90deg,#60a5fa,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>بلا حدود.</span>
          </h1>

          <p style={{
            fontSize: 13, color: C.muted, fontWeight: 400,
            lineHeight: 1.6, maxWidth: 440, margin: "0 auto 20px",
          }}>
            VPN متطور للويندوز والأندرويد. يدعم VLESS, VMESS, SSH وSlowDNS بدون رصيد باقة.
          </p>

          {/* Compact Buttons Side by Side */}
          <div className="btn-group" style={{ display: "flex", gap: 10, justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
            {os === "android" ? (
              <>
                <button onClick={() => dl("android")} className="hero-btn-primary">
                  <Download size={14} /> Android (APK)
                </button>
                <button onClick={() => dl("windows")} className="hero-btn-secondary">
                  <Monitor size={14} /> Windows (EXE)
                </button>
              </>
            ) : (
              <>
                <button onClick={() => dl("windows")} className="hero-btn-secondary">
                  <Download size={14} /> Windows (EXE)
                </button>
                <button onClick={() => dl("android")} className="hero-btn-primary">
                  <Smartphone size={14} /> Android (APK)
                </button>
              </>
            )}
          </div>

          <p style={{ fontSize: 11, color: C.dimmed, marginTop: 12, fontWeight: 500 }}>
            مجاني · v{urls.version} · Windows 10/11 & Android 6+
          </p>

          {flash && (
            <div style={{
              marginTop: 12, display: "inline-flex", alignItems: "center", gap: 6,
              background: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.25)",
              borderRadius: 980, padding: "5px 14px", fontSize: 12, color: "#34d399", fontWeight: 600,
            }}>✓ جاري التحميل...</div>
          )}
        </section>

        {/* ═══════════════ COMPACT 2x2 PROTOCOLS GRID ═══════════════ */}
        <section id="features" style={{ padding: "20px 0", borderTop: `1px solid ${C.border}` }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: C.blue, marginBottom: 12 }}>
            البروتوكولات المدعومة
          </p>

          <div className="feature-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 10,
            textAlign: "center",
          }}>
            {[
              { icon: Globe, title: "SlowDNS", desc: "أنفاق DNS بدون رصيد باقة", color: "#60a5fa" },
              { icon: Zap,   title: "VLESS & VMESS", desc: "سرعة فائقة وتجاوز الحجب", color: "#a78bfa" },
              { icon: Lock,  title: "SSH Tunnel", desc: "تشفير عسكري لحماية بياناتك", color: "#34d399" },
              { icon: Shield,title: "SNI Bypass", desc: "حزم SNI مخصصة لشبكتك", color: "#f59e0b" },
            ].map((f, i) => {
              const Icon = f.icon
              return (
                <div key={i} style={{
                  padding: "14px 10px",
                  background: C.surface,
                  border: `1px solid ${C.border}`,
                  borderRadius: 14,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justify: "center",
                }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: 10,
                    background: `${f.color}15`, border: `1px solid ${f.color}30`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: 8,
                  }}>
                    <Icon size={16} color={f.color} />
                  </div>
                  <h3 style={{ fontSize: 13, fontWeight: 800, color: C.text, margin: "0 0 4px", letterSpacing: "-0.2px" }}>{f.title}</h3>
                  <p style={{ fontSize: 11, color: C.muted, margin: 0, lineHeight: 1.4 }}>{f.desc}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* ═══════════════ COMPACT PLATFORMS ROW ═══════════════ */}
        <section style={{ padding: "16px 0", borderTop: `1px solid ${C.border}` }}>
          <div className="platform-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 10,
          }}>
            <div onClick={() => dl("windows")} style={{
              background: "rgba(41,151,255,0.04)",
              border: "1px solid rgba(41,151,255,0.2)",
              borderRadius: 14, padding: "12px 10px", cursor: "pointer",
              display: "flex", flexDirection: "column", alignItems: "center",
            }}>
              <Monitor size={18} color={C.blue} style={{ marginBottom: 6 }} />
              <span style={{ fontSize: 13, fontWeight: 800, color: C.text }}>Windows</span>
              <span style={{ fontSize: 10, color: C.blue, fontWeight: 700, marginTop: 2 }}>EXE · 64-bit</span>
            </div>

            <div onClick={() => dl("android")} style={{
              background: "rgba(52,211,153,0.04)",
              border: "1px solid rgba(52,211,153,0.2)",
              borderRadius: 14, padding: "12px 10px", cursor: "pointer",
              display: "flex", flexDirection: "column", alignItems: "center",
            }}>
              <Smartphone size={18} color="#34d399" style={{ marginBottom: 6 }} />
              <span style={{ fontSize: 13, fontWeight: 800, color: C.text }}>Android</span>
              <span style={{ fontSize: 10, color: "#34d399", fontWeight: 700, marginTop: 2 }}>APK · 6.0+</span>
            </div>
          </div>
        </section>

        {/* ═══════════════ COMPACT FAQ ═══════════════ */}
        <section id="faq" style={{ padding: "20px 0 10px", borderTop: `1px solid ${C.border}` }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 12 }}>
            <HelpCircle size={14} color={C.blue} />
            <span style={{ fontSize: 13, fontWeight: 800, color: C.text }}>الأسئلة الشائعة</span>
          </div>

          <div style={{ borderTop: `1px solid ${C.border}` }}>
            <FaqItem q="هل يعمل على الويندوز والأندرويد بنفس الكفاءة؟"
              a="نعم. كل نسخة مُصممة خصيصاً للمنصة، بنفس البروتوكولات والسيرفرات وبدون أي فرق في الأداء." />
            <FaqItem q="كيف يعمل SlowDNS بدون رصيد باقة؟"
              a="يمرر بياناتك عبر أنفاق DNS مشفرة تعمل على طبقة DNS الأساسية للشبكة، مستقلةً عن الباقة." />
            <FaqItem q="كيف أُضيف حزمة SNI خاصة بي؟"
              a="من قسم (حزم SNI) داخل التطبيق، تستطيع إضافة وتخصيص أي حزمة SNI للحصول على أعلى أداء." />
          </div>
        </section>

        {/* ═══════════════ COMPACT FOOTER ═══════════════ */}
        <footer style={{
          paddingTop: 24, borderTop: `1px solid ${C.border}`,
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Image src="/app_icon.png" alt="WaledNet" width={18} height={18} style={{ borderRadius: 4, mixBlendMode: "screen" }} />
            <span style={{ fontSize: 11, color: C.dimmed, fontWeight: 600 }}>
              © 2026 WaledNet VPN. جميع الحقوق محفوظة.
            </span>
          </div>
          <a href="https://t.me/waledpro" target="_blank" rel="noopener noreferrer"
            style={{ fontSize: 11, color: C.blue, textDecoration: "none", fontWeight: 700 }}>
            قناة الدعم على تليجرام ›
          </a>
        </footer>

      </div>

    </main>
  )
}
