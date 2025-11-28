export function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-2 border-b border-white/10 last:border-none">
      <span className="opacity-70">{label}</span>
      <span>{value}</span>
    </div>
  );
}
