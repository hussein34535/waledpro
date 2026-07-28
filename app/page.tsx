"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Download, Monitor, Smartphone, Globe, Zap, Lock, Shield } from "lucide-react"

const C = {
  bg:      "#000000",
  surface: "rgba(255,255,255,0.04)",
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

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: C.blue, marginBottom: 14 }}>
      {children}
    </p>
  )
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: `1px solid ${C.border}` }}>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", textAlign: "right", background: "none", border: "none",
        color: C.text, fontSize: 16, fontWeight: 600, padding: "20px 0",
        cursor: "pointer", fontFamily: "inherit",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
      }}>
        <span>{q}</span>
        <span style={{
          fontSize: 24, color: C.dimmed, fontWeight: 300, flexShrink: 0,
          transform: open ? "rotate(45deg)" : "none",
          transition: "transform .2s ease", display: "inline-block",
        }}>+</span>
      </button>
      {open && (
        <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.8, paddingBottom: 20, textAlign: "right", margin: 0 }}>{a}</p>
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
    <main style={{ background: C.bg, color: C.text, fontFamily: "'Cairo',-apple-system,sans-serif", WebkitFontSmoothing: "antialiased" }}>

      <style>{`
        * { box-sizing: border-box; }

        .btn-android {
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          background: #10b981; color: #ffffff;
          border: none;
          border-radius: 14px; padding: 13px 24px;
          font-size: 15px; font-weight: 800; cursor: pointer; font-family: inherit;
          transition: all .2s ease;
          box-shadow: 0 4px 24px rgba(16,185,129,0.35);
        }
        .btn-android:hover {
          background: #34d399; transform: translateY(-1px); box-shadow: 0 6px 28px rgba(16,185,129,0.45);
        }

        .btn-windows {
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          background: #2997ff; color: #ffffff;
          border: none;
          border-radius: 14px; padding: 13px 24px;
          font-size: 15px; font-weight: 800; cursor: pointer; font-family: inherit;
          transition: all .2s ease;
          box-shadow: 0 4px 24px rgba(41,151,255,0.35);
        }
        .btn-windows:hover {
          background: #3da0ff; transform: translateY(-1px); box-shadow: 0 6px 28px rgba(41,151,255,0.45);
        }

        .btn-secondary {
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          background: rgba(255,255,255,0.05); color: #f5f5f7;
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 14px; padding: 13px 22px;
          font-size: 14px; font-weight: 600; cursor: pointer; font-family: inherit;
          transition: all .2s ease;
          backdrop-filter: blur(10px);
        }
        .btn-secondary:hover {
          background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.25); transform: translateY(-1px);
        }

        /* Desktop View Default */
        .mobile-only { display: none !important; }
        .desktop-only { display: block !important; }

        /* Dedicated Mobile View (<= 640px) */
        @media (max-width: 640px) {
          .desktop-only { display: none !important; }
          .mobile-only { display: block !important; }

          .m-btn-android {
            display: inline-flex; align-items: center; justify-content: center; gap: 6px;
            background: #10b981; color: #ffffff; border: none;
            border-radius: 14px; padding: 13px 20px;
            font-size: 14px; font-weight: 800; cursor: pointer; font-family: inherit;
            box-shadow: 0 4px 20px rgba(16,185,129,0.35); width: 100%;
          }
          .m-btn-windows {
            display: inline-flex; align-items: center; justify-content: center; gap: 6px;
            background: #2997ff; color: #ffffff; border: none;
            border-radius: 14px; padding: 13px 20px;
            font-size: 14px; font-weight: 800; cursor: pointer; font-family: inherit;
            box-shadow: 0 4px 20px rgba(41,151,255,0.35); width: 100%;
          }
          .m-btn-secondary {
            display: inline-flex; align-items: center; justify-content: center; gap: 6px;
            background: rgba(255,255,255,0.05); color: #f5f5f7;
            border: 1px solid rgba(255,255,255,0.14);
            border-radius: 14px; padding: 12px 18px;
            font-size: 13.5px; font-weight: 600; cursor: pointer; font-family: inherit; width: 100%;
          }
        }
      `}</style>

      {/* ================================================================= */}
      {/* 📱 DEDICATED ULTRA-MINIMAL APPLE MOBILE VIEW (CLEAN, SPACIOUS, ZERO CLUTTER) */}
      {/* ================================================================= */}
      <div className="mobile-only" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        
        {/* Minimal Mobile Header */}
        <nav style={{
          position: "sticky", top: 0, zIndex: 100,
          background: "rgba(0,0,0,0.85)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
          borderBottom: `1px solid ${C.border}`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 24px", height: 56,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Image src="/app_icon.png" alt="WaledNet" width={26} height={26} style={{ borderRadius: 7, mixBlendMode: "screen" }} />
            <span style={{ fontWeight: 800, fontSize: 15, letterSpacing: "-0.3px" }}>WaledNet</span>
          </div>

          <a href="https://t.me/waledpro" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: C.blue, textDecoration: "none", fontWeight: 700 }}>
            قناة التليجرام ›
          </a>
        </nav>

        {/* Spacious, Pure Apple Minimal Body */}
        <div style={{ padding: "60px 28px 40px", textAlign: "center", maxWidth: 380, margin: "0 auto", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>

          {/* App Icon */}
          <Image src="/app_icon.png" alt="WaledNet" width={68} height={68}
            style={{ borderRadius: 18, mixBlendMode: "screen", margin: "0 auto 28px", filter: "drop-shadow(0 0 28px rgba(41,151,255,0.4))" }} />

          {/* Clean Device Detection Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: C.surface, border: `1px solid ${C.border}`,
            borderRadius: 980, padding: "5px 16px",
            fontSize: 11, fontWeight: 600, color: C.muted, marginBottom: 24,
          }}>
            {os === "windows" ? <Monitor size={11} color={C.blue} /> : <Smartphone size={11} color="#34d399" />}
            {os === "windows" ? "تم التعرف على جهازك — Windows" : "تم التعرف على جهازك — Android"}
          </div>

          {/* Elegant Headline */}
          <h1 style={{
            fontSize: 34, fontWeight: 900, lineHeight: 1.15, letterSpacing: "-1.2px", margin: "0 auto 16px",
          }}>
            إنترنت حر.<br />
            <span style={{ background: "linear-gradient(90deg,#60a5fa,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              بلا حدود.
            </span>
          </h1>

          {/* Short Subtitle */}
          <p style={{
            fontSize: 13.5, color: C.muted, fontWeight: 400, lineHeight: 1.6, margin: "0 auto 36px", maxWidth: 300,
          }}>
            VPN متطور للأندرويد والويندوز. يدعم VLESS, VMESS, SSH وSlowDNS.
          </p>

          {/* Clean Vertical Stack Buttons with Space */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", maxWidth: 280, margin: "0 auto 20px" }}>
            {os === "android" ? (
              <>
                <button onClick={() => dl("android")} className="m-btn-android">
                  <Download size={15} /> تحميل لـ Android (APK)
                </button>
                <button onClick={() => dl("windows")} className="m-btn-secondary">
                  <Monitor size={14} color={C.blue} /> أو تحميل لـ Windows (EXE)
                </button>
              </>
            ) : (
              <>
                <button onClick={() => dl("windows")} className="m-btn-windows">
                  <Download size={15} /> تحميل لـ Windows (EXE)
                </button>
                <button onClick={() => dl("android")} className="m-btn-secondary">
                  <Smartphone size={14} color="#34d399" /> أو تحميل لـ Android (APK)
                </button>
              </>
            )}
          </div>

          <p style={{ fontSize: 11, color: C.dimmed, fontWeight: 500 }}>
            مجاني · الإصدار v{urls.version}
          </p>

          {flash && (
            <div style={{
              marginTop: 16, display: "inline-flex", alignItems: "center", gap: 6,
              background: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.25)",
              borderRadius: 980, padding: "6px 18px", fontSize: 12, color: "#34d399", fontWeight: 600,
            }}>✓ جاري التحميل...</div>
          )}

        </div>

        {/* Minimal Footer */}
        <footer style={{
          padding: "24px 20px", borderTop: `1px solid ${C.border}`,
          display: "flex", justifyContent: "center", alignItems: "center",
        }}>
          <span style={{ fontSize: 11, color: C.dimmed, fontWeight: 600 }}>
            © 2026 WaledNet VPN. جميع الحقوق محفوظة.
          </span>
        </footer>

      </div>

      {/* ================================================================= */}
      {/* 🖥️ DEDICATED FULL LUXURY APPLE PC VIEW (UNCHANGED DESKTOP DESIGN)  */}
      {/* ================================================================= */}
      <div className="desktop-only">
        
        {/* NAVBAR */}
        <nav style={{
          position: "sticky", top: 0, zIndex: 100,
          background: "rgba(0,0,0,0.85)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
          borderBottom: `1px solid ${C.border}`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 clamp(16px, 5vw, 40px)", height: 60,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Image src="/app_icon.png" alt="WaledNet" width={30} height={30}
              style={{ borderRadius: 7, mixBlendMode: "screen" }} />
            <span style={{ fontWeight: 800, fontSize: 16, letterSpacing: "-0.3px" }}>WaledNet</span>
          </div>

          <div style={{ display: "flex", gap: "clamp(14px,3vw,28px)", fontSize: 13, color: C.muted, fontWeight: 500 }}>
            {[["#platforms","الأجهزة"],["#features","المميزات"],["#faq","الأسئلة"]].map(([href,label]) => (
              <a key={href} href={href} style={{ color: "inherit", textDecoration: "none", transition: "color .2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = C.text)}
                onMouseLeave={e => (e.currentTarget.style.color = C.muted)}>{label}</a>
            ))}
          </div>

          <button onClick={() => dl(os)} className={os === "android" ? "btn-android" : "btn-windows"} style={{ padding: "8px 18px", fontSize: 13, borderRadius: 980, boxShadow: "none" }}>
            <Download size={13} /> تحميل مجاني
          </button>
        </nav>

        {/* HERO */}
        <section style={{ textAlign: "center", padding: "clamp(64px,10vw,112px) 24px clamp(48px,6vw,72px)", maxWidth: 820, margin: "0 auto" }}>

          <Image src="/app_icon.png" alt="WaledNet" width={80} height={80}
            style={{ borderRadius: 18, mixBlendMode: "screen", display: "block", margin: "0 auto 28px", filter: "drop-shadow(0 0 30px rgba(41,151,255,0.3))" }} />

          {/* Device badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            background: C.surface, border: `1px solid ${C.border}`,
            borderRadius: 980, padding: "6px 16px",
            fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 28,
          }}>
            {os === "windows" ? <Monitor size={12} color={C.blue} /> : <Smartphone size={12} color="#34d399" />}
            {os === "windows" ? "تم التعرف على جهازك — Windows" : "تم التعرف على جهازك — Android"}
          </div>

          <h1 style={{
            fontSize: "clamp(40px,9vw,84px)", fontWeight: 900,
            lineHeight: 1.05, letterSpacing: "-2px", margin: "0 auto 18px",
          }}>
            إنترنت حر.<br />
            <span style={{ background: "linear-gradient(90deg,#60a5fa,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              بلا حدود.
            </span>
          </h1>

          <p style={{
            fontSize: "clamp(15px,2.5vw,20px)", color: C.muted, fontWeight: 400,
            lineHeight: 1.65, maxWidth: 540, margin: "0 auto 40px",
          }}>
            VPN متطور يعمل على الويندوز والأندرويد. يدعم VLESS، VMESS، SSH وSlowDNS للإنترنت بدون رصيد باقة.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: "flex", gap: 12, justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
            {os === "android" ? (
              <>
                <button onClick={() => dl("android")} className="btn-android">
                  <Download size={16} /> تحميل لـ Android (APK)
                </button>

                <button onClick={() => dl("windows")} className="btn-secondary">
                  <Monitor size={15} color={C.blue} /> أو تحميل لـ Windows
                </button>
              </>
            ) : (
              <>
                <button onClick={() => dl("windows")} className="btn-windows">
                  <Download size={16} /> تحميل لـ Windows (EXE)
                </button>

                <button onClick={() => dl("android")} className="btn-secondary">
                  <Smartphone size={15} color="#34d399" /> أو تحميل لـ Android
                </button>
              </>
            )}
          </div>

          <p style={{ fontSize: 12, color: C.dimmed, marginTop: 18, fontWeight: 500 }}>
            مجاني · v{urls.version} · Windows 10/11 & Android 6+
          </p>

          {flash && (
            <div style={{
              marginTop: 18, display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.25)",
              borderRadius: 980, padding: "7px 18px", fontSize: 13, color: "#34d399", fontWeight: 600,
            }}>✓ جاري التحميل...</div>
          )}
        </section>

        {/* PLATFORMS */}
        <section id="platforms" style={{ borderTop: `1px solid ${C.border}`, padding: "80px clamp(16px,5vw,24px)" }}>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>

            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <Eyebrow>توافق متكامل</Eyebrow>
              <h2 style={{ fontSize: "clamp(26px,5vw,48px)", fontWeight: 900, letterSpacing: "-1.5px", lineHeight: 1.1, marginBottom: 14 }}>
                تطبيق واحد. منصتان.
              </h2>
              <p style={{ fontSize: "clamp(14px,2vw,17px)", color: C.muted, maxWidth: 420, margin: "0 auto", lineHeight: 1.65 }}>
                نفس الجودة والأداء على الويندوز والأندرويد.
              </p>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
              gap: 16,
            }}>

              {/* Windows */}
              <div style={{
                background: "rgba(41,151,255,0.04)",
                border: "1px solid rgba(41,151,255,0.18)",
                borderRadius: 18, padding: "clamp(24px,4vw,36px) clamp(20px,4vw,28px)",
                display: "flex", flexDirection: "column",
              }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  background: "rgba(41,151,255,0.12)", border: "1px solid rgba(41,151,255,0.22)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 26, marginBottom: 20,
                }}>🖥️</div>

                <h3 style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-0.4px", marginBottom: 4 }}>Windows</h3>
                <p style={{ fontSize: 11, color: C.blue, fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", marginBottom: 18 }}>
                  EXE Installer · 64-bit
                </p>

                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column", gap: 9 }}>
                  {["يعمل على Windows 10 و 11","استهلاك أقل من 25MB RAM","تشغيل تلقائي مع بدء النظام","دعم كامل لتوجيه الترافيك"].map(f => (
                    <li key={f} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 13, color: C.muted }}>
                      <span style={{ color: C.blue, flexShrink: 0, fontWeight: 700 }}>✓</span>{f}
                    </li>
                  ))}
                </ul>

                <button onClick={() => dl("windows")} className="btn-windows" style={{ marginTop: "auto", width: "100%", borderRadius: 11, padding: "12px 18px", fontSize: 14 }}>
                  <Download size={14} /> تحميل WaledNet_Setup.exe
                </button>
              </div>

              {/* Android */}
              <div style={{
                background: "rgba(52,211,153,0.04)",
                border: "1px solid rgba(52,211,153,0.18)",
                borderRadius: 18, padding: "clamp(24px,4vw,36px) clamp(20px,4vw,28px)",
                display: "flex", flexDirection: "column",
              }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  background: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.22)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 26, marginBottom: 20,
                }}>📱</div>

                <h3 style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-0.4px", marginBottom: 4 }}>Android</h3>
                <p style={{ fontSize: 11, color: "#34d399", fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", marginBottom: 18 }}>
                  APK · Android 6.0+
                </p>

                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column", gap: 9 }}>
                  {["يعمل على جميع أجهزة الأندرويد","دعم حصري لبروتوكول SlowDNS","إنترنت بدون رصيد باقة","إشعار حيّ للسرعة والـ Ping"].map(f => (
                    <li key={f} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 13, color: C.muted }}>
                      <span style={{ color: "#34d399", flexShrink: 0, fontWeight: 700 }}>✓</span>{f}
                    </li>
                  ))}
                </ul>

                <button onClick={() => dl("android")} className="btn-android" style={{ marginTop: "auto", width: "100%", borderRadius: 11, padding: "12px 18px", fontSize: 14 }}>
                  <Download size={14} /> تحميل walednet.apk
                </button>
              </div>

            </div>

            <p style={{ textAlign: "center", fontSize: 12, color: C.dimmed, marginTop: 20, fontWeight: 500 }}>
              التطبيق يتعرف تلقائياً على نظام جهازك ويقترح النسخة المناسبة عند الزيارة.
            </p>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" style={{ borderTop: `1px solid ${C.border}`, padding: "80px clamp(16px,5vw,24px)" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>

            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <Eyebrow>البروتوكولات المدعومة</Eyebrow>
              <h2 style={{ fontSize: "clamp(26px,5vw,48px)", fontWeight: 900, letterSpacing: "-1.5px", lineHeight: 1.1, marginBottom: 14 }}>
                أربع تقنيات. حماية كاملة.
              </h2>
              <p style={{ fontSize: "clamp(14px,2vw,17px)", color: C.muted, maxWidth: 420, margin: "0 auto", lineHeight: 1.65 }}>
                أحدث بروتوكولات التشفير وتجاوز الحجب — كلها في تطبيق واحد.
              </p>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))",
              gap: 14,
            }}>
              {[
                { icon: Globe, title: "SlowDNS",      desc: "اتصال مشفر عبر أنفاق DNS. يتجاوز قيود الباقة على جميع الشبكات." },
                { icon: Zap,   title: "VLESS & VMESS", desc: "بروتوكولات الجيل الجديد بسرعة فائقة وتجاوز الجدران النارية." },
                { icon: Lock,  title: "SSH Tunnel",   desc: "تشفير عسكري يحمي خصوصيتك على أي شبكة عامة أو خاصة." },
                { icon: Shield,title: "SNI Bypass",   desc: "خصص حزم SNI للحصول على أقصى سرعة على شبكتك." },
              ].map((f, i) => {
                const Icon = f.icon
                return (
                  <div key={i} style={{
                    padding: "clamp(24px,4vw,36px) clamp(20px,3vw,28px)",
                    background: C.surface,
                    border: `1px solid ${C.border}`,
                    borderRadius: 18,
                    display: "flex",
                    flexDirection: "column",
                  }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 12,
                      background: "rgba(41,151,255,0.1)", border: "1px solid rgba(41,151,255,0.2)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      marginBottom: 16,
                    }}>
                      <Icon size={20} color={C.blue} />
                    </div>
                    <h3 style={{ fontSize: 18, fontWeight: 800, color: C.text, marginBottom: 8, letterSpacing: "-0.3px" }}>{f.title}</h3>
                    <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" style={{ borderTop: `1px solid ${C.border}`, padding: "80px clamp(16px,5vw,24px)" }}>
          <div style={{ maxWidth: 620, margin: "0 auto" }}>

            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <Eyebrow>الأسئلة الشائعة</Eyebrow>
              <h2 style={{ fontSize: "clamp(26px,5vw,44px)", fontWeight: 900, letterSpacing: "-1.2px" }}>
                كل ما تريد معرفته.
              </h2>
            </div>

            <div style={{ borderTop: `1px solid ${C.border}` }}>
              <FaqItem q="هل يعمل على الويندوز والأندرويد بنفس الكفاءة؟"
                a="نعم. كل نسخة مُصممة خصيصاً للمنصة، بنفس البروتوكولات والسيرفرات وبدون أي فرق في الأداء." />
              <FaqItem q="كيف يعمل SlowDNS بدون رصيد باقة؟"
                a="يمرر بياناتك عبر أنفاق DNS مشفرة تعمل على طبقة DNS الأساسية للشبكة، مستقلةً عن الباقة." />
              <FaqItem q="هل التطبيق مجاني تماماً؟"
                a="نعم، مجاني 100% مع تحديثات مستمرة للسيرفرات والبروتوكولات." />
              <FaqItem q="كيف أُضيف حزمة SNI خاصة بي؟"
                a="من قسم (حزم SNI) داخل التطبيق، تستطيع إضافة وتخصيص أي حزمة SNI للحصول على أعلى أداء." />
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section style={{ borderTop: `1px solid ${C.border}`, padding: "80px clamp(16px,5vw,24px)", textAlign: "center" }}>
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <h2 style={{ fontSize: "clamp(32px,6vw,60px)", fontWeight: 900, letterSpacing: "-1.8px", lineHeight: 1.08, marginBottom: 18 }}>
              ابدأ الاتصال.<br />الآن.
            </h2>
            <p style={{ fontSize: "clamp(15px,2vw,18px)", color: C.muted, marginBottom: 40, lineHeight: 1.6 }}>
              مجاني. فوري. بلا قيود.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={() => dl("windows")} className="btn-windows" style={{ borderRadius: 980, padding: "14px 28px" }}>
                <Monitor size={16} /> تحميل لـ Windows
              </button>

              <button onClick={() => dl("android")} className="btn-secondary" style={{ borderRadius: 980, padding: "14px 24px" }}>
                <Smartphone size={16} color="#34d399" /> تحميل لـ Android
              </button>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{
          borderTop: `1px solid ${C.border}`,
          padding: "24px clamp(16px,5vw,40px)",
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

      </div>

    </main>
  )
}
