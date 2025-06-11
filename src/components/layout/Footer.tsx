 
export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">
            © 2025 BlobNest. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="text-gray-400">Built with Azure Storage SDK</span>
          </div>
      </div>
    </footer>
  );
} 