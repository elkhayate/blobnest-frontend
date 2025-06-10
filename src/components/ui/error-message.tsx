interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <h2 className="text-lg font-semibold text-red-600">Error</h2>
      <p className="mt-2 text-sm text-gray-600">{message}</p>
    </div>
  );
} 