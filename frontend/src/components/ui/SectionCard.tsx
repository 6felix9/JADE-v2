interface SectionCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

export default function SectionCard({ children, className = "", title, subtitle }: SectionCardProps) {
  return (
    <section className={`bg-white p-8 rounded-xl shadow-sm border border-gray-200 space-y-6 ${className}`}>
      {(title || subtitle) && (
        <div className="space-y-2">
          {title && <h2 className="text-xl font-semibold text-gray-800">{title}</h2>}
          {subtitle && <p className="text-gray-500">{subtitle}</p>}
        </div>
      )}
      {children}
    </section>
  );
}

