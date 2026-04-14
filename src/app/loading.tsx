export default function Loading() {
  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
          </div>
        </div>
      </div>
  );
}