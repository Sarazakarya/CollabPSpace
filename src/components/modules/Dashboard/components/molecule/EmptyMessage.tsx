type Props = {
  title: string;
  message: string;
};

export default function EmptyMessage({ title, message }: Props) {
  return (
    <div className="flex h-56 flex-col items-center justify-center gap-2 text-center">
      <p className="ds-text-sm font-semibold">{title}</p>
      <p className="ds-text-xs ds-text-secondary">{message}</p>
    </div>
  );
}
