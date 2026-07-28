"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Download, Monitor, Smartphone } from "lucide-react"

const C = {
  bg:      "#000000",
  surface: "rgba(255,255,255,0.04)",
  border:  "rgba(255,255,255,0.08)",
  text:    "#f5f5f7",
  muted:   "rgba(245,245,247,0.5)",
  dimmed:  "rgba(245,245,247,0.28)",
  blue:    "#2997ff",
  blueH:   "#3da0ff",
}

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
          transition: "transform .25s ease", display: "inline-block",
        }}>+</span>
      </button>
      {open && (
        <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.8, paddingBottom: 20 }}>{a}</p>
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
    a.href = type === "windows" ? "/walednet-setup.exe" : "/waledpro.apk"
    a.download = type === "windows" ? "WaledNet-Setup.exe" : "WaledNet.apk"
    document.body.appendChild(a); a.click(); document.body.removeChild(a)
    setFlash(true); setTimeout(() => setFlash(false), 2800)
  }

  return (
    <main style={{ background: C.bg, color: C.text, fontFamily: "'Cairo',-apple-system,sans-serif", WebkitFontSmoothing: "antialiased" }}>

      <style>{`
        @media (max-width: 640px) {
          .nav-links { display: none !important; }
          .hero-btns { flex-direction: column !important; width: 100% !important; }
          .hero-btns button { width: 100% !important; justify-content: center !important; }
        }
      `}</style>

      {/* ═══════════════ NAVBAR ═══════════════ */}
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

        <div className="nav-links" style={{ display: "flex", gap: "clamp(14px,3vw,28px)", fontSize: 13, color: C.muted, fontWeight: 500 }}>
          {[["#platforms","الأجهزة"],["#features","المميزات"],["#faq","الأسئلة"]].map(([href,label]) => (
            <a key={href} href={href} style={{ color: "inherit", textDecoration: "none", transition: "color .2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = C.text)}
              onMouseLeave={e => (e.currentTarget.style.color = C.muted)}>{label}</a>
          ))}
        </div>

        <button onClick={() => dl(os)} style={{
          background: C.blue, color: "#fff", border: "none",
          borderRadius: 980, padding: "8px 18px",
          fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
          transition: "background .2s", whiteSpace: "nowrap",
        }}
          onMouseEnter={e => (e.currentTarget.style.background = C.blueH)}
          onMouseLeave={e => (e.currentTarget.style.background = C.blue)}
        >تحميل مجاني</button>
      </nav>

      {/* ═══════════════ HERO ═══════════════ */}
      <section style={{ textAlign: "center", padding: "clamp(40px,7vw,96px) 20px clamp(36px,5vw,64px)", maxWidth: 820, margin: "0 auto" }}>

        <Image src="/app_icon.png" alt="WaledNet" width={72} height={72}
          style={{ borderRadius: 18, mixBlendMode: "screen", display: "block", margin: "0 auto 24px" }} />

        {/* Device badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 7,
          background: C.surface, border: `1px solid ${C.border}`,
          borderRadius: 980, padding: "6px 16px",
          fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 24,
        }}>
          {os === "windows" ? <Monitor size={12} color={C.blue} /> : <Smartphone size={12} color="#34d399" />}
          {os === "windows" ? "تم التعرف على جهازك — Windows" : "تم التعرف على جهازك — Android"}
        </div>

        <h1 style={{
          fontSize: "clamp(30px,7.5vw,72px)", fontWeight: 900,
          lineHeight: 1.1, letterSpacing: "-1.5px", margin: "0 auto 16px",
        }}>
          إنترنت حر.<br />
          <span style={{ background: "linear-gradient(90deg,#60a5fa,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            بلا حدود.
          </span>
        </h1>

        <p style={{
          fontSize: "clamp(14px,2.2vw,19px)", color: C.muted, fontWeight: 400,
          lineHeight: 1.65, maxWidth: 520, margin: "0 auto 32px",
        }}>
          VPN متطور يعمل على الويندوز والأندرويد. يدعم VLESS، VMESS، SSH وSlowDNS للإنترنت بدون رصيد باقة.
        </p>

        {/* CTA Buttons */}
        <div className="hero-btns" style={{ display: "flex", gap: 12, justifyContent: "center", alignItems: "center" }}>
          {os === "android" ? (
            <>
              <button onClick={() => dl("android")} style={{
                display: "flex", alignItems: "center", gap: 9,
                background: "#10b981", color: "#fff", border: "none",
                borderRadius: 14, padding: "14px 26px",
                fontSize: 15, fontWeight: 800, cursor: "pointer", fontFamily: "inherit",
                transition: "all .2s", boxShadow: "0 4px 24px rgba(16,185,129,0.25)",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "#34d399"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#10b981"; e.currentTarget.style.transform = "none"; }}
              ><Download size={16} /> تحميل لـ Android (APK)</button>

              <button onClick={() => dl("windows")} style={{
                display: "flex", alignItems: "center", gap: 9,
                background: C.surface, color: C.text, border: `1px solid ${C.border}`,
                borderRadius: 14, padding: "14px 22px",
                fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
                transition: "all .2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = C.surface; e.currentTarget.style.transform = "none"; }}
              ><Monitor size={15} color={C.blue} /> أو تحميل لـ Windows</button>
            </>
          ) : (
            <>
              <button onClick={() => dl("windows")} style={{
                display: "flex", alignItems: "center", gap: 9,
                background: C.blue, color: "#fff", border: "none",
                borderRadius: 14, padding: "14px 26px",
                fontSize: 15, fontWeight: 800, cursor: "pointer", fontFamily: "inherit",
                transition: "all .2s", boxShadow: "0 4px 24px rgba(41,151,255,0.25)",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = C.blueH; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = C.blue;  e.currentTarget.style.transform = "none"; }}
              ><Download size={16} /> تحميل لـ Windows (EXE)</button>

              <button onClick={() => dl("android")} style={{
                display: "flex", alignItems: "center", gap: 9,
                background: C.surface, color: C.text, border: `1px solid ${C.border}`,
                borderRadius: 14, padding: "14px 22px",
                fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
                transition: "all .2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = C.surface; e.currentTarget.style.transform = "none"; }}
              ><Smartphone size={15} color="#34d399" /> أو تحميل لـ Android</button>
            </>
          )}
        </div>

        <p style={{ fontSize: 12, color: C.dimmed, marginTop: 18, fontWeight: 500 }}>
          مجاني · v3.0.0 · Windows 10/11 & Android 6+
        </p>

        {flash && (
          <div style={{
            marginTop: 18, display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.25)",
            borderRadius: 980, padding: "7px 18px", fontSize: 13, color: "#34d399", fontWeight: 600,
          }}>✓ جاري التحميل</div>
        )}
      </section>

      {/* ═══════════════ PLATFORMS ═══════════════ */}
      <section id="platforms" style={{ borderTop: `1px solid ${C.border}`, padding: "60px clamp(16px,5vw,24px)" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>

          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <Eyebrow>توافق متكامل</Eyebrow>
            <h2 style={{ fontSize: "clamp(24px,4.5vw,44px)", fontWeight: 900, letterSpacing: "-1px", lineHeight: 1.1, marginBottom: 12 }}>
              تطبيق واحد. منصتان.
            </h2>
            <p style={{ fontSize: "clamp(13px,2vw,16px)", color: C.muted, maxWidth: 420, margin: "0 auto", lineHeight: 1.65 }}>
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
              borderRadius: 18, padding: "clamp(24px,4vw,32px) clamp(20px,4vw,28px)",
              display: "flex", flexDirection: "column",
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: "rgba(41,151,255,0.12)", border: "1px solid rgba(41,151,255,0.22)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 24, marginBottom: 16,
              }}>🖥️</div>

              <h3 style={{ fontSize: 20, fontWeight: 900, letterSpacing: "-0.4px", marginBottom: 4 }}>Windows</h3>
              <p style={{ fontSize: 11, color: C.blue, fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", marginBottom: 16 }}>
                EXE Installer · 64-bit
              </p>

              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px", display: "flex", flexDirection: "column", gap: 9 }}>
                {["يعمل على Windows 10 و 11","استهلاك أقل من 25MB RAM","تشغيل تلقائي مع بدء النظام","دعم كامل لتوجيه الترافيك"].map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 13, color: C.muted }}>
                    <span style={{ color: C.blue, flexShrink: 0, fontWeight: 700 }}>✓</span>{f}
                  </li>
                ))}
              </ul>

              <button onClick={() => dl("windows")} style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
                background: C.blue, color: "#fff", border: "none",
                borderRadius: 11, padding: "12px 18px",
                fontSize: 14, fontWeight: 800, cursor: "pointer", fontFamily: "inherit",
                transition: "all .2s", marginTop: "auto",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = C.blueH; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = C.blue;  e.currentTarget.style.transform = "none"; }}
              ><Download size={14} /> تحميل WaledNet-Setup.exe</button>
            </div>

            {/* Android */}
            <div style={{
              background: "rgba(52,211,153,0.04)",
              border: "1px solid rgba(52,211,153,0.18)",
              borderRadius: 18, padding: "clamp(24px,4vw,32px) clamp(20px,4vw,28px)",
              display: "flex", flexDirection: "column",
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.22)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 24, marginBottom: 16,
              }}>📱</div>

              <h3 style={{ fontSize: 20, fontWeight: 900, letterSpacing: "-0.4px", marginBottom: 4 }}>Android</h3>
              <p style={{ fontSize: 11, color: "#34d399", fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", marginBottom: 16 }}>
                APK · Android 6.0+
              </p>

              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px", display: "flex", flexDirection: "column", gap: 9 }}>
                {["يعمل على جميع أجهزة الأندرويد","دعم حصري لبروتوكول SlowDNS","إنترنت بدون رصيد باقة","إشعار حيّ للسرعة والـ Ping"].map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 13, color: C.muted }}>
                    <span style={{ color: "#34d399", flexShrink: 0, fontWeight: 700 }}>✓</span>{f}
                  </li>
                ))}
              </ul>

              <button onClick={() => dl("android")} style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
                background: "#10b981", color: "#fff", border: "none",
                borderRadius: 11, padding: "12px 18px",
                fontSize: 14, fontWeight: 800, cursor: "pointer", fontFamily: "inherit",
                transition: "all .2s", marginTop: "auto",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "#34d399"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#10b981"; e.currentTarget.style.transform = "none"; }}
              ><Download size={14} /> تحميل WaledNet.apk</button>
            </div>

          </div>

          <p style={{ textAlign: "center", fontSize: 12, color: C.dimmed, marginTop: 20, fontWeight: 500 }}>
            التطبيق يتعرف تلقائياً على نظام جهازك ويقترح النسخة المناسبة عند الزيارة.
          </p>
        </div>
      </section>

      {/* ═══════════════ FEATURES ═══════════════ */}
      <section id="features" style={{ borderTop: `1px solid ${C.border}`, padding: "60px clamp(16px,5vw,24px)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>

          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <Eyebrow>البروتوكولات المدعومة</Eyebrow>
            <h2 style={{ fontSize: "clamp(24px,4.5vw,44px)", fontWeight: 900, letterSpacing: "-1px", lineHeight: 1.1, marginBottom: 12 }}>
              أربع تقنيات. حماية كاملة.
            </h2>
            <p style={{ fontSize: "clamp(13px,2vw,16px)", color: C.muted, maxWidth: 420, margin: "0 auto", lineHeight: 1.65 }}>
              أحدث بروتوكولات التشفير وتجاوز الحجب — كلها في تطبيق واحد.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
            gap: 14,
          }}>
            {[
              { emoji: "🌐", title: "SlowDNS",      desc: "اتصال مشفر عبر أنفاق DNS. يتجاوز قيود الباقة على جميع الشبكات." },
              { emoji: "⚡", title: "VLESS & VMESS", desc: "بروتوكولات الجيل الجديد بسرعة فائقة وتجاوز الجدران النارية." },
              { emoji: "🔒", title: "SSH Tunnel",   desc: "تشفير عسكري يحمي خصوصيتك على أي شبكة عامة أو خاصة." },
              { emoji: "🚀", title: "SNI Bypass",   desc: "خصص حزم SNI للحصول على أقصى سرعة على شبكتك." },
            ].map((f, i) => (
              <div key={i} style={{
                padding: "24px 20px",
                background: C.surface,
                border: `1px solid ${C.border}`,
                borderRadius: 16,
              }}>
                <div style={{ fontSize: 32, marginBottom: 14 }}>{f.emoji}</div>
                <h3 style={{ fontSize: 17, fontWeight: 800, color: C.text, marginBottom: 8, letterSpacing: "-0.3px" }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.75 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FAQ ═══════════════ */}
      <section id="faq" style={{ borderTop: `1px solid ${C.border}`, padding: "60px clamp(16px,5vw,24px)" }}>
        <div style={{ maxWidth: 620, margin: "0 auto" }}>

          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <Eyebrow>الأسئلة الشائعة</Eyebrow>
            <h2 style={{ fontSize: "clamp(24px,4.5vw,40px)", fontWeight: 900, letterSpacing: "-1px" }}>
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

      {/* ═══════════════ FINAL CTA ═══════════════ */}
      <section style={{ borderTop: `1px solid ${C.border}`, padding: "60px clamp(16px,5vw,24px)", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(28px,5.5vw,52px)", fontWeight: 900, letterSpacing: "-1.5px", lineHeight: 1.1, marginBottom: 16 }}>
            ابدأ الاتصال.<br />الآن.
          </h2>
          <p style={{ fontSize: "clamp(14px,2vw,17px)", color: C.muted, marginBottom: 32, lineHeight: 1.6 }}>
            مجاني. فوري. بلا قيود.
          </p>
          <div className="hero-btns" style={{ display: "flex", gap: 12, justifyContent: "center", alignItems: "center" }}>
            <button onClick={() => dl("windows")} style={{
              display: "flex", alignItems: "center", gap: 9,
              background: C.blue, color: "#fff", border: "none",
              borderRadius: 980, padding: "14px 28px",
              fontSize: 15, fontWeight: 800, cursor: "pointer", fontFamily: "inherit", transition: "all .2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = C.blueH; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = C.blue;  e.currentTarget.style.transform = "none"; }}
            ><Monitor size={16} /> تحميل لـ Windows</button>

            <button onClick={() => dl("android")} style={{
              display: "flex", alignItems: "center", gap: 9,
              background: C.surface, color: C.text, border: `1px solid ${C.border}`,
              borderRadius: 980, padding: "14px 24px",
              fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all .2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.09)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = C.surface;                e.currentTarget.style.transform = "none"; }}
            ><Smartphone size={16} /> تحميل لـ Android</button>
          </div>
        </div>
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer style={{
        borderTop: `1px solid ${C.border}`,
        padding: "20px clamp(16px,5vw,40px)",
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
