type Variant = "primary" | "secondary" | "danger" | "warning";

interface Props {
  label: string;
  onClick?: () => void;
  variant?: Variant;
  disabled?: boolean;
}

export const ActionButton = ({
  label,
  onClick,
  variant = "primary",
  disabled = false,
}: Props) => {
  const base =
    "px-4 py-2 rounded-md text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed";

  const styles: Record<Variant, string> = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
    warning: "bg-yellow-500 text-white hover:bg-yellow-400",
  };

  return (
    <button
      className={`${base} ${styles[variant]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
