export default function SectionTitle({
  eyebrow,
  title,
  children,
  align = "left",
  light = false,
}: {
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <div className={`${align === "center" ? "mx-auto text-center" : ""} max-w-3xl`}>
      {eyebrow && <p className={`mb-4 text-xs font-semibold uppercase tracking-[.18em] ${light ? "text-[#d6c8ad]" : "text-forest/70"}`}>{eyebrow}</p>}
      <h2 className={`text-balance text-3xl font-semibold sm:text-4xl lg:text-[44px] ${light ? "text-ivory" : "text-forest"}`}>{title}</h2>
      {children && <div className={`mt-5 max-w-2xl text-[15px] leading-7 ${align === "center" ? "mx-auto" : ""} ${light ? "text-ivory/75" : "text-charcoal/70"}`}>{children}</div>}
    </div>
  );
}
