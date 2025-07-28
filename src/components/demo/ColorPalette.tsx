// Demo component to showcase the new medical color palette
export default function ColorPalette() {
  const colors = [
    { name: "Primary Blue", class: "bg-primary", hex: "#1e40af" },
    { name: "Secondary Green", class: "bg-secondary", hex: "#059669" },
    { name: "Accent Red", class: "bg-accent", hex: "#dc2626" },
    { name: "Cardiology", class: "bg-cardiology", hex: "#dc2626" },
    { name: "Dermatology", class: "bg-dermatology", hex: "#f59e0b" },
    { name: "Gynecology", class: "bg-gynecology", hex: "#ec4899" },
    { name: "Pediatrics", class: "bg-pediatrics", hex: "#10b981" },
    { name: "Orthopedics", class: "bg-orthopedics", hex: "#3b82f6" },
  ];

  return (
    <div className="p-8 bg-surface">
      <h2 className="text-2xl font-bold text mb-6">
        Medical Color Palette
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {colors.map((color) => (
          <div key={color.name} className="text-center">
            <div
              className={`w-20 h-20 rounded-lg ${color.class} mx-auto mb-2 shadow-lg`}
            />
            <p className="text-sm font-medium text">{color.name}</p">
            <p className="text-xs text-secondary">{color.hex}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
