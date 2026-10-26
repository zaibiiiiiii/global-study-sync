export default function IntroductionFlowDiagram() {
  return (
    <figure className="mt-7 w-full max-w-[460px]" aria-label="How study requirements and site capabilities lead to an introduction">
      <svg
        viewBox="0 0 560 390"
        role="img"
        aria-labelledby="introduction-flow-title introduction-flow-description"
        className="h-auto w-full overflow-visible"
        fill="none"
      >
        <title id="introduction-flow-title">Study requirements and site capabilities converge in one introduction</title>
        <desc id="introduction-flow-description">
          Study requirements and site capabilities are considered together to facilitate an introduction and one conversation.
        </desc>
        <g stroke="#F4F7F8" strokeLinecap="round">
          <path d="M18 74C155 74 214 194 322 194" strokeWidth="2.5" />
          <path d="M18 148C150 148 220 194 322 194" strokeOpacity=".38" strokeWidth="1.5" />
          <path d="M18 242C150 242 220 194 322 194" strokeOpacity=".38" strokeWidth="1.5" />
          <path d="M18 316C155 316 214 194 322 194" strokeWidth="2.5" />
          <path d="M341 194H530" strokeWidth="2.5" />
          <circle cx="18" cy="74" r="5" fill="#F4F7F8" stroke="none" />
          <circle cx="18" cy="316" r="5" fill="#F4F7F8" stroke="none" />
          <circle cx="530" cy="194" r="5" fill="#F4F7F8" stroke="none" />
        </g>
        <circle cx="331" cy="194" r="12" fill="#C49A6C" />
        <text x="18" y="42" fill="#F4F7F8" fontSize="20" fontWeight="600">Study requirements</text>
        <text x="18" y="366" fill="#F4F7F8" fontSize="20" fontWeight="600">Site capabilities</text>
        <text x="366" y="168" fill="#F4F7F8" fontSize="20" fontWeight="600">One conversation</text>
        <text x="331" y="235" textAnchor="middle" fill="#F4F7F8" fontSize="19" fontWeight="600">Introduction</text>
      </svg>
    </figure>
  );
}
