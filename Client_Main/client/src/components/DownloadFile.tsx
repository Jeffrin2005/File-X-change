import { FunctionComponent, useState } from "react";

const DownloadFile: FunctionComponent<{
  downloadPageLink: string;
}> = ({ downloadPageLink }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(downloadPageLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <div className="p-1">
      <div className="relative group">
        {/* Main neon glow container */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-cyan-500 to-green-400 
          rounded-xl opacity-75 group-hover:opacity-100 blur-lg transition duration-1000 
          group-hover:duration-200 animate-pulse"></div>
        
        {/* Main content container */}
        <div className="relative p-6 bg-gray-800/90 backdrop-blur-sm ring-1 ring-gray-900/5 rounded-lg leading-none flex 
          items-center justify-center space-x-6">
          <div className="space-y-4 w-full">
            {/* Title with rainbow gradient */}
            <h3 className="text-2xl font-bold text-center mb-4 text-transparent bg-clip-text 
              bg-gradient-to-r from-purple-400 via-cyan-400 to-green-400 animate-gradient-x">
              Your Download Link
            </h3>
            
            {/* Link container with rainbow neon effect */}
            <div className="group/link relative">
              {/* Rainbow border animation */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4f46e5] via-[#06b6d4] to-[#22c55e]
                rounded-lg opacity-75 group-hover/link:opacity-100 blur transition duration-300
                animate-border-flow"></div>
              
              {/* URL content */}
              <div className="relative flex items-center bg-gray-900 p-4 rounded-lg 
                transform transition-all duration-300 group-hover/link:scale-105">
                <span className="text-gray-300 break-all mr-2 group-hover/link:text-transparent 
                  group-hover/link:bg-clip-text group-hover/link:bg-gradient-to-r 
                  group-hover/link:from-purple-400 group-hover/link:via-cyan-400 
                  group-hover/link:to-green-400">{downloadPageLink}</span>
                <button
                  className="ml-auto p-2 rounded-full hover:bg-gray-700 transition-colors duration-200
                    group-hover/link:bg-gradient-to-r group-hover/link:from-purple-500 
                    group-hover/link:via-cyan-500 group-hover/link:to-green-500"
                  onClick={handleCopy}
                >
                  {copied ? (
                    <svg
                      className="w-5 h-5 text-green-400 transition-all duration-300 transform scale-110"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5 text-gray-400 group-hover/link:text-white 
                        transition-colors duration-200"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            
            {/* Animated dots with rainbow colors */}
            <div className="flex justify-center space-x-2 mt-4">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse delay-75"></span>
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse delay-150"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadFile;