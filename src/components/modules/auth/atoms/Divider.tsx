export default function Divider({ label = "or" }: { label?: string }) {
  return (
    <div className="flex items-center gap-3" role="separator">
      <span className="h-px flex-1 bg-border" />
      <span className="ds-text-xs ds-text-secondary">{label}</span>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}
