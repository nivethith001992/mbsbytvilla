type OrganicSeparatorProps = {
  from?: string;
  to?: string;
  flip?: boolean;
  variant?: "wave" | "soft" | "deep";
};

export function OrganicSeparator({
  from = "var(--warm-white)",
  to = "var(--surface)",
  flip = false,
  variant = "wave",
}: OrganicSeparatorProps) {
  const paths = {
    wave: "M0,64 C240,120 480,0 720,48 C960,96 1200,16 1440,64 L1440,120 L0,120 Z",
    soft: "M0,40 C360,100 720,10 1080,55 C1260,78 1380,70 1440,50 L1440,120 L0,120 Z",
    deep: "M0,20 C200,90 500,110 760,60 C1000,15 1240,95 1440,40 L1440,120 L0,120 Z",
  };

  return (
    <div
      className="relative -mt-px overflow-hidden leading-none"
      style={{ background: from }}
      aria-hidden
    >
      <svg
        className={`organic-curve ${flip ? "rotate-180" : ""}`}
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        style={{ color: to }}
      >
        <path d={paths[variant]} />
      </svg>
    </div>
  );
}
