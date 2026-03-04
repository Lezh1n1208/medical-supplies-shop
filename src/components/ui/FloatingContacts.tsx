"use client";
import { useState } from "react";

// ── Types ────────────────────────────────────────────────────────────────────
interface ContactItem {
  id: string;
  label: string;
  sublabel: string;
  href: string;
  color: string;
  ripple: string;
  icon: React.ReactNode;
}

// ── SVG Icons ────────────────────────────────────────────────────────────────
function FacebookIcon() {
  return (
    <svg
      width={22}
      height={22}
      viewBox="0 0 24 24"
      fill="white"
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  );
}

function ZaloIcon() {
  return (
    <svg
      width={22}
      height={22}
      viewBox="0 0 24 24"
      fill="white"
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.254 2 11.5c0 2.7 1.17 5.132 3.05 6.87L4 22l3.75-1.268C9.097 21.538 10.517 22 12 22c5.523 0 10-4.254 10-9.5S17.523 2 12 2zm-1.07 5.5h1.46v4.17l3.01-4.17h1.68l-3.2 4.33 3.38 4.67h-1.77l-3.1-4.35v4.35h-1.46V7.5zm-3.68.93c.39 0 .71.32.71.71v5.72a.71.71 0 01-1.42 0V9.14c0-.39.32-.71.71-.71z" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg
      width={22}
      height={22}
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

// ── Data ─────────────────────────────────────────────────────────────────────
const contacts: ContactItem[] = [
  {
    id: "facebook",
    label: "Facebook",
    sublabel: "Nhắn tin ngay",
    href: "https://facebook.com",
    color: "#1877F2",
    ripple: "rgba(24,119,242,0.35)",
    icon: <FacebookIcon />,
  },
  {
    id: "zalo",
    label: "Zalo",
    sublabel: "0983.498.177",
    href: "https://zalo.me/0983498177",
    color: "#0068FF",
    ripple: "rgba(0,104,255,0.35)",
    icon: <ZaloIcon />,
  },
  {
    id: "maps",
    label: "Google Maps",
    sublabel: "Xem đường đi",
    href: "https://maps.google.com/?q=135/9+KP+Tan+Phu+2+Tan+Dong+Hiep+Ho+Chi+Minh",
    color: "#EA4335",
    ripple: "rgba(234,67,53,0.35)",
    icon: <MapPinIcon />,
  },
];

// ── Component ────────────────────────────────────────────────────────────────
export function FloatingContacts() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <>
      {/* ── Keyframes injected once ──────────────────────────────── */}
      <style>{`
        /* Ripple: 2 concentric rings expanding outward */
        @keyframes ripple-ring {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(2.4); opacity: 0; }
        }

        /* Shake: snappy left-right wiggle every 4 s */
        @keyframes shake {
          0%, 85%, 100% { transform: rotate(0deg); }
          88%            { transform: rotate(-18deg); }
          91%            { transform: rotate(16deg); }
          94%            { transform: rotate(-10deg); }
          97%            { transform: rotate(8deg); }
        }

        /* Tooltip slide-in */
        @keyframes tooltip-in {
          from { opacity: 0; transform: translateX(6px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .float-btn {
          animation: shake 4s ease-in-out infinite;
        }
        .float-btn:nth-child(2) { animation-delay: 1.3s; }
        .float-btn:nth-child(3) { animation-delay: 2.6s; }

        .ripple-1 {
          animation: ripple-ring 2s ease-out infinite;
        }
        .ripple-2 {
          animation: ripple-ring 2s ease-out infinite 0.7s;
        }

        .float-tooltip {
          animation: tooltip-in 0.18s ease forwards;
        }
      `}</style>

      {/* ── Fixed container ──────────────────────────────────────── */}
      <aside
        className="fixed z-50 flex flex-col gap-3"
        style={{ bottom: "24px", right: "20px" }}
        aria-label="Liên hệ nhanh"
      >
        {contacts.map((c) => (
          <div key={c.id} className="relative flex items-center justify-end">
            {/* Tooltip (visible on hover) */}
            {hoveredId === c.id && (
              <div className="float-tooltip absolute right-16 flex flex-col items-end pointer-events-none">
                <span
                  className="text-white font-bold whitespace-nowrap rounded-lg px-3 py-1.5 shadow-lg"
                  style={{
                    fontSize: "12px",
                    backgroundColor: c.color,
                    lineHeight: 1.4,
                  }}
                >
                  {c.label}
                  <br />
                  <span
                    style={{ fontSize: "10px", fontWeight: 400, opacity: 0.9 }}
                  >
                    {c.sublabel}
                  </span>
                </span>
                {/* Arrow */}
                <div
                  style={{
                    width: 0,
                    height: 0,
                    borderTop: "5px solid transparent",
                    borderBottom: "5px solid transparent",
                    borderLeft: `6px solid ${c.color}`,
                    position: "absolute",
                    right: "-6px",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                />
              </div>
            )}

            {/* Button wrapper — ripple rings sit here */}
            <div className="relative flex items-center justify-center float-btn">
              {/* Ripple ring 1 */}
              <span
                className="ripple-1 absolute inset-0 rounded-full pointer-events-none"
                style={{
                  backgroundColor: c.ripple,
                  borderRadius: "50%",
                }}
              />
              {/* Ripple ring 2 */}
              <span
                className="ripple-2 absolute inset-0 rounded-full pointer-events-none"
                style={{
                  backgroundColor: c.ripple,
                  borderRadius: "50%",
                }}
              />

              {/* Icon button */}
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={c.label}
                onMouseEnter={() => setHoveredId(c.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="relative flex items-center justify-center rounded-full shadow-xl transition-transform duration-150 hover:scale-110 active:scale-95"
                style={{
                  width: "52px",
                  height: "52px",
                  backgroundColor: c.color,
                  boxShadow: `0 4px 18px ${c.ripple}`,
                  zIndex: 1,
                }}
              >
                {c.icon}
              </a>
            </div>
          </div>
        ))}
      </aside>
    </>
  );
}
