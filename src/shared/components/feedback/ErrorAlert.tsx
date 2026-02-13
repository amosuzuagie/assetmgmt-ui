interface Props {
  message: string;
  onRetry?: () => void;
}

export const ErrorAlert = ({ message, onRetry }: Props) => {
  return (
    <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded flex justify-between items-center">
      <span>{message}</span>

      {onRetry && (
        <button
          onClick={onRetry}
          className="ml-4 text-sm font-medium underline"
        >
          Retry
        </button>
      )}
    </div>
  );
};
