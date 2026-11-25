interface AvatarProps {
  initials: string;
  size?: number;
  src?: string | null;
  alt?: string;
}

export default function Avatar({
  initials,
  size = 24,
  src,
  alt = "User avatar",
}: AvatarProps) {
  return (
    <span
      className="ds-text-primary inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-(--color-bg-card) bg-blue-500/10 font-semibold"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.38,
      }}
    >
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        initials
      )}
    </span>
  );
}
