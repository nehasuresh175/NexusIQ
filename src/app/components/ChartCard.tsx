import { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  children: ReactNode;
}

export function ChartCard({ title, children }: ChartCardProps) {
  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
      <h3 className="mb-4">{title}</h3>
      {children}
    </div>
  );
}
