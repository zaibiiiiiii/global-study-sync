import Image from "next/image";

export default function EditorialImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <figure className={`group min-w-0 ${className}`}>
      <div className="relative isolate aspect-[3/2] overflow-hidden rounded-[3px] border border-forest/10 bg-sage/55">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 640px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
        />
      </div>
    </figure>
  );
}
