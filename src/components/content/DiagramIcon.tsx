type DiagramKind = "study" | "sites" | "feasibility" | "network" | "connections";

export default function DiagramIcon({
  kind,
  light = false,
  className = "",
}: {
  kind: DiagramKind;
  light?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 200 120"
      fill="none"
      className={`${light ? "text-ivory" : "text-forest"} ${className}`}
      aria-hidden="true"
    >
      {kind === "study" && (
        <>
          <rect x="57" y="12" width="72" height="96" rx="5" stroke="currentColor" strokeWidth="2.5" />
          <path d="M72 34h42M72 49h42M72 64h25" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="120" cy="82" r="14" stroke="#C49A6C" strokeWidth="2.5" />
          <path d="m130 92 10 10" stroke="#C49A6C" strokeWidth="3" strokeLinecap="round" />
          <circle cx="73" cy="84" r="4" fill="#C49A6C" />
        </>
      )}
      {kind === "sites" && (
        <>
          <path d="M40 32h120M40 60h120M40 88h120" stroke="currentColor" strokeOpacity=".2" strokeWidth="1.5" strokeDasharray="3 6" />
          {[0, 1, 2, 3, 4].map((column) =>
            [0, 1, 2].map((row) => {
              const selected = column === 3 && row === 1;
              return (
                <circle
                  key={`${column}-${row}`}
                  cx={40 + column * 30}
                  cy={32 + row * 28}
                  r={selected ? 7 : 3.5}
                  fill={selected ? "#C49A6C" : "currentColor"}
                  fillOpacity={selected ? 1 : 0.62}
                />
              );
            }),
          )}
          <circle cx="130" cy="60" r="14" stroke="#C49A6C" strokeWidth="1.5" strokeOpacity=".55" />
        </>
      )}
      {kind === "feasibility" && (
        <>
          {[30, 60, 90].map((y, index) => (
            <g key={y}>
              <rect x="43" y={y - 10} width="20" height="20" rx="4" stroke="currentColor" strokeWidth="2.5" />
              <path d={`m48 ${y} 4 4 7-8`} stroke={index === 2 ? "#C49A6C" : "currentColor"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d={`M80 ${y}h${index === 1 ? 62 : 76}`} stroke="currentColor" strokeOpacity=".8" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          ))}
          <path d="M158 27v66" stroke="#C49A6C" strokeWidth="1.5" strokeDasharray="3 6" />
        </>
      )}
      {kind === "network" && (
        <>
          <path d="M48 88 100 30 152 88M48 88 100 62 152 88M100 30v32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="48" cy="88" r="7" fill="currentColor" />
          <circle cx="100" cy="30" r="7" fill="currentColor" />
          <circle cx="152" cy="88" r="7" fill="currentColor" />
          <circle cx="100" cy="62" r="9" fill="#C49A6C" />
          <circle cx="100" cy="62" r="14" stroke="#C49A6C" strokeOpacity=".55" strokeWidth="1.5" />
        </>
      )}
      {kind === "connections" && (
        <>
          <circle cx="82" cy="60" r="35" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="118" cy="60" r="35" stroke="currentColor" strokeWidth="2.5" />
          <path d="M47 60h35m36 0h35" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="100" cy="60" r="7" fill="#C49A6C" />
          <circle cx="47" cy="60" r="5" fill="currentColor" />
          <circle cx="153" cy="60" r="5" fill="currentColor" />
        </>
      )}
    </svg>
  );
}
