import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Mark, Micro, Serif, ShieldDeep, ShieldTimeout } from "./marks";

/* ── Device frame ────────────────────────────────────────────────────────
   Navy-on-navy, matching the app's own base rather than a generic black
   handset. The inner canvas uses C.bgGrad exactly. */

export function Phone({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-[290px] flex-none rounded-[46px] border border-rule-strong p-[10px] shadow-device sm:w-[310px]",
        "bg-[linear-gradient(165deg,#2f2760_0%,#171233_55%,#0e0b22_100%)]",
        className
      )}
    >
      <div className="relative aspect-[290/622] overflow-hidden rounded-[37px] bg-[image:var(--gradient-app-bg)]">
        {children}
      </div>
    </div>
  );
}

/** Status bar — the app renders inside the notch inset. */
function StatusBar() {
  return (
    <div className="flex items-center justify-between px-[18px] pt-3 text-[11px] text-foreground">
      <span className="font-display font-bold tracking-tight">9:41</span>
      <span className="flex items-center gap-[3px]" aria-hidden>
        <span className="flex items-end gap-[2px]">
          {[4, 6, 8, 10].map((h) => (
            <span
              key={h}
              className="w-[2.5px] rounded-[1px] bg-foreground"
              style={{ height: h }}
            />
          ))}
        </span>
        <span className="ml-1 h-[10px] w-[18px] rounded-[3px] border border-ink-3 p-[1.5px]">
          <span className="block h-full w-3/4 rounded-[1px] bg-foreground" />
        </span>
      </span>
    </div>
  );
}

/** Home header — `CHomeHead`: mark, greeting, and the state pill. */
function HomeHeader({
  greeting,
  sub,
  status,
  tone,
}: {
  greeting: string;
  sub: string;
  status: string;
  tone: "money" | "amber" | "coral";
}) {
  const dot = {
    money: "bg-money",
    amber: "bg-amber",
    coral: "bg-coral",
  }[tone];

  return (
    <div className="flex items-center justify-between gap-2 px-[18px] pt-4">
      <div className="flex min-w-0 items-center gap-2.5">
        <Mark size={22} />
        <div className="min-w-0">
          <div className="truncate font-display text-[13.5px] font-bold tracking-tight">
            {greeting}
          </div>
          <div className="truncate text-[11px] text-ink-3">{sub}</div>
        </div>
      </div>
      <div className="flex flex-none items-center gap-1.5 rounded-full border border-rule bg-surface px-2.5 py-1.5">
        <span className={cn("h-[6px] w-[6px] rounded-full", dot)} />
        <span className="slash-micro text-[8.5px] text-ink-2">{status}</span>
      </div>
    </div>
  );
}

/** Tab bar — `CTabBar`. */
function TabBar() {
  const tabs: [string, string][] = [
    ["Home", "M3 12l9-9 9 9v9a2 2 0 0 1-2 2h-4v-7H9v7H5a2 2 0 0 1-2-2z"],
    [
      "Vault",
      "M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zM9 12a3 3 0 1 0 6 0 3 3 0 0 0-6 0z",
    ],
    ["Rules", "M4 6h16M4 12h10M4 18h16"],
    ["You", "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-7 9c0-3.87 3.13-7 7-7s7 3.13 7 7"],
  ];

  return (
    <div className="absolute inset-x-0 bottom-0 flex justify-around border-t border-rule bg-background/90 pb-4 pt-2.5 backdrop-blur-sm">
      {tabs.map(([label, d], i) => (
        <div key={label} className="flex flex-col items-center gap-1">
          <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke={i === 0 ? "#b388ff" : "#8b82b8"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d={d} />
          </svg>
          <span
            className={cn(
              "text-[8.5px] font-bold",
              i === 0 ? "text-accent" : "text-ink-3"
            )}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

/**
 * The streak ring — `CStreakBadge`. A serif numeral inside a green
 * progress ring with a soft aura. This is the app's signature element.
 */
export function StreakRing({
  value,
  label,
  size = 112,
  tone = "money",
  /** Fraction of the ring that is filled, 0–1. */
  progress = 1,
  /**
   * The app reserves Instrument Serif for the streak count — one serif
   * moment per screen. Money keeps Space Grotesk's tabular numerals.
   */
  numerals = "serif",
}: {
  value: ReactNode;
  label: string;
  size?: number;
  tone?: "money" | "coral" | "accent";
  progress?: number;
  numerals?: "serif" | "display";
}) {
  const stroke = { money: "#34f0b5", coral: "#ff5c8a", accent: "#b388ff" }[tone];
  const text = {
    money: "text-money",
    coral: "text-coral",
    accent: "text-accent",
  }[tone];
  const circumference = 2 * Math.PI * 47;

  return (
    <div
      className="relative grid flex-none place-items-center"
      style={{ width: size, height: size }}
    >
      {/* Aura */}
      <div
        className="absolute inset-0 rounded-full blur-[12px]"
        style={{ background: stroke, opacity: 0.18 }}
      />
      {/* Track */}
      <div className="absolute inset-[6px] rounded-full border-2 border-rule" />
      {/* Progress */}
      <svg
        className="absolute inset-[6px] -rotate-90"
        viewBox="0 0 100 100"
        aria-hidden
      >
        <circle
          cx="50"
          cy="50"
          r="47"
          fill="none"
          stroke={stroke}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - progress)}
        />
      </svg>
      <div className="relative text-center">
        {numerals === "serif" ? (
          <Serif className="block leading-none text-foreground">
            <span style={{ fontSize: size * 0.44 }}>{value}</span>
          </Serif>
        ) : (
          <span
            className={cn("slash-num block", text)}
            style={{ fontSize: size * 0.34 }}
          >
            {value}
          </span>
        )}
        <div
          className={cn("slash-micro mt-1.5 text-[8px]", text)}
          style={{ fontSize: Math.max(8, size * 0.075) }}
        >
          {label}
        </div>
      </div>
    </div>
  );
}

/** Linear spend bar — the app's `greenGrad` fill on a `bg3` track. */
export function SpendBar({
  pct,
  tone = "money",
  className,
}: {
  pct: number;
  tone?: "money" | "amber" | "coral";
  className?: string;
}) {
  const fill = {
    money: "var(--gradient-green)",
    amber: "linear-gradient(135deg,#ffd980,#f5a623)",
    coral: "var(--gradient-coral)",
  }[tone];

  return (
    <div
      className={cn(
        "h-2 w-full overflow-hidden rounded-full bg-surface-2",
        className
      )}
    >
      <div
        className="h-full rounded-full"
        style={{ width: `${pct}%`, backgroundImage: fill }}
      />
    </div>
  );
}

/* ── Screen: home, healthy week ─────────────────────────────────────────
   Mirrors `C_HomeHealthy` from design-reference/slash-badge/c-home.jsx. */

export function HomeScreen() {
  return (
    <>
      <StatusBar />
      <HomeHeader
        greeting="Hey Jordan."
        sub="Week 08 · Tuesday"
        status="On track"
        tone="money"
      />

      <div className="absolute inset-x-0 bottom-[62px] top-[86px] overflow-hidden px-[18px]">
        {/* Streak card — the centerpiece */}
        <div className="relative overflow-hidden rounded-xl border border-money/20 bg-[image:var(--gradient-card)] px-4 py-[18px] text-center">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(52,240,181,0.14),transparent_65%)]" />
          <div className="relative flex justify-center">
            <StreakRing value="12" label="Day streak" size={102} />
          </div>
          <div className="relative mt-3 font-display text-[17px] font-bold tracking-[-0.025em]">
            <Serif className="text-[21px]">Twelve</Serif> days, no blocks.
          </div>
          <p className="relative mt-1.5 text-[11.5px] leading-snug text-ink-2">
            Best streak yet. Next milestone: 14.
          </p>
          <div className="relative mt-3 flex justify-center gap-[4px]">
            {Array.from({ length: 14 }).map((_, i) => (
              <span
                key={i}
                className={cn(
                  "h-[9px] w-[9px] rounded-full",
                  i < 12 ? "bg-money" : "border border-rule bg-surface-2"
                )}
                style={i < 12 ? { opacity: 1 - (12 - i) * 0.04 } : undefined}
              />
            ))}
          </div>
        </div>

        {/* Remaining this week */}
        <div className="mt-3 rounded-lg border border-rule bg-surface px-4 py-3.5">
          <div className="flex items-baseline justify-between gap-2">
            <Micro className="text-[8.5px]">This week · remaining</Micro>
            <span className="slash-mono text-[9px] font-bold tracking-[0.08em] text-money">
              3D LEFT
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="slash-num text-[42px] text-money">$28</span>
            <span className="text-[11.5px] text-ink-3">of $75</span>
          </div>
          <SpendBar pct={63} className="mt-2.5" />
          <div className="slash-mono mt-1.5 flex justify-between text-[9px] text-ink-3">
            <span>$47 spent</span>
            <span>Resets Sun</span>
          </div>
        </div>

        {/* Recent catch */}
        <div className="mt-3">
          <Micro className="text-[8.5px]">Recent catches</Micro>
          <div className="mt-2 flex items-center gap-3 rounded-md border border-rule bg-surface px-3 py-2.5">
            <div className="flex-1">
              <div className="font-display text-[12.5px] font-bold">Amazon</div>
              <div className="text-[10.5px] text-ink-3">Tue 11:47 PM</div>
            </div>
            <span className="slash-mono text-[12px] font-bold text-money">
              +$42
            </span>
          </div>
        </div>
      </div>

      <TabBar />
    </>
  );
}

/* ── Screen: the block shield ───────────────────────────────────────────
   Apple's ShieldConfiguration renders a fixed centred stack: icon, title,
   subtitle, then buttons. Mirrors `BlockShield.jsx`. */

export function ShieldScreen({ tier }: { tier: "timeout" | "deep" }) {
  const cfg =
    tier === "timeout"
      ? {
          // Timeout is a material blur over the host app: what you reached
          // for stays visible, just out of reach. Gradient is the canonical
          // `d_grad` from design-reference/components/BlockTiers.jsx.
          bg: "linear-gradient(180deg, rgba(64,40,130,0.94) 0%, rgba(28,16,72,0.97) 100%)",
          blur: true,
          icon: <ShieldTimeout size={68} className="text-[#c7b6ff]" />,
          title: "Sit with it.",
          subtitle: "Wait it out and Amazon opens for one hour.",
          countdown: true,
          primary: "Wait",
          secondary: "Close the app",
        }
      : {
          // Deep is solid — no blur, because you are not getting through.
          bg: "#0d0820",
          blur: false,
          icon: <ShieldDeep size={68} className="text-[#a48ded]" />,
          title: "Closed for the week.",
          subtitle: "Resets Sunday 00:00.\nYou set this limit. No override.",
          countdown: false,
          primary: "Understood",
          secondary: null,
        };

  return (
    <>
      {/* Host app underneath, so the shield reads as an overlay. */}
      <HostAppBackdrop />

      <div
        className="absolute inset-0 flex flex-col px-5 pb-7"
        style={{
          background: cfg.bg,
          backdropFilter: cfg.blur ? "blur(24px) saturate(160%)" : undefined,
          WebkitBackdropFilter: cfg.blur
            ? "blur(24px) saturate(160%)"
            : undefined,
        }}
      >
        {/* The OS keeps the status bar above the shield. */}
        <div className="flex items-center justify-between px-1 pt-3 text-[11px] text-[#ede6ff]">
          <span className="font-display font-bold tracking-tight">9:41</span>
          <span className="flex items-end gap-[2px]" aria-hidden>
            {[4, 6, 8, 10].map((h) => (
              <span
                key={h}
                className="w-[2.5px] rounded-[1px] bg-[#ede6ff]"
                style={{ height: h }}
              />
            ))}
          </span>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center gap-4 pb-6 text-center">
          {cfg.icon}
          <div className="text-[19px] font-semibold leading-tight tracking-[-0.01em] text-[#ede6ff]">
            {cfg.title}
          </div>
          <p className="max-w-[220px] whitespace-pre-line text-balance text-[12.5px] leading-relaxed text-[#ede6ff]/70">
            {cfg.subtitle}
          </p>
          {cfg.countdown && <ShieldCountdown />}
        </div>

        <div className="flex flex-col gap-1">
          <div className="rounded-md bg-[#ede6ff] py-3 text-center text-[14px] font-semibold text-[#1b1240]">
            {cfg.primary}
          </div>
          {cfg.secondary && (
            <div className="py-3 text-center text-[14px] font-medium text-[#ede6ff]">
              {cfg.secondary}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/** The 60-second wait, drawn as the app's ring motif. */
function ShieldCountdown() {
  const circumference = 2 * Math.PI * 46;
  return (
    <div className="relative mt-2 grid h-[92px] w-[92px] place-items-center">
      <div className="absolute inset-0 rounded-full border-2 border-[#ede6ff]/12" />
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100" aria-hidden>
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke="#c7b6ff"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * 0.28}
        />
      </svg>
      <div className="relative text-center">
        <div className="slash-mono text-[19px] font-bold text-[#ede6ff]">
          0:43
        </div>
        <div className="slash-micro mt-0.5 text-[7.5px] text-[#ede6ff]/55">
          Remaining
        </div>
      </div>
    </div>
  );
}

/** A neutral shopping-app stub behind the shield — no real trademarks. */
function HostAppBackdrop() {
  return (
    <div className="absolute inset-0 bg-white" aria-hidden>
      <div className="h-14 bg-[#131a22]" />
      <div className="space-y-2 px-3 py-3">
        <div className="h-8 rounded-md bg-neutral-200" />
        <div className="h-20 rounded-md bg-[#ffe5b4]" />
        <div className="grid grid-cols-2 gap-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="space-y-1.5">
              <div className="h-20 rounded bg-neutral-100" />
              <div className="h-2 w-3/4 rounded bg-neutral-200" />
              <div className="h-2 w-1/3 rounded bg-neutral-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
