export default function Spinner({ label }: { label?: string }) {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="flex items-center gap-3">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-transparent" />
        {label ? <span className="text-sm text-gray-600">{label}</span> : null}
      </div>
    </div>
  );
}