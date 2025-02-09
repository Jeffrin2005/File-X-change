import axios from "axios";
import { GetServerSidePropsContext } from "next";
import { sizeInMB } from "@utils/sizeInMb";
import fileDownload from "js-file-download";

const download = ({ file: { id, filename, size } }) => {
  const handleDownload = async () => {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `http://localhost:8000/api/download/${id}`,
        responseType: 'blob',
      });
      
      fileDownload(data, filename);
    } catch (error) {
      console.error('Download error:', error);
      alert('Error downloading file. Please try again.');
    }
  };

  return (
    <div className="grid h-screen place-items-center bg-gray-900">
      <div className="relative group">
        {/* Outer neon glow effects */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 
          rounded-xl opacity-75 group-hover:opacity-100 blur-lg transition duration-1000 
          group-hover:duration-200 animate-pulse"></div>
        <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
          rounded-xl opacity-50 group-hover:opacity-75 blur-xl transition duration-1000 
          group-hover:duration-200 animate-pulse delay-75"></div>

        {/* Main content container */}
        <div className="relative flex flex-col items-center justify-center py-8 px-6 space-y-6 
          bg-gray-800/90 backdrop-blur-xl rounded-xl shadow-2xl min-w-[24rem] max-w-lg
          border border-gray-700/50">
          
          {!id ? (
            <div className="relative group/error">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-600 
                rounded-lg opacity-75 blur-sm transition duration-300"></div>
              <div className="relative text-center p-6 bg-gray-800/95 rounded-lg">
                <h2 className="text-2xl font-bold mb-3 text-transparent bg-clip-text 
                  bg-gradient-to-r from-red-400 to-orange-400">
                  Oops! File Not Found
                </h2>
                <p className="text-gray-300">Please check the URL or the download link might be expired.</p>
              </div>
            </div>
          ) : (
            <>
              {/* Download icon with glow */}
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
                  rounded-full opacity-60 blur-md animate-pulse"></div>
                <div className="relative p-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
                  rounded-full transform hover:scale-110 transition-all duration-300">
                  <img src="/images/file-download.png" alt="" className="w-16 h-16" />
                </div>
              </div>

              {/* Title with gradient */}
              <h1 className="text-2xl font-bold text-transparent bg-clip-text 
                bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient-x">
                Your file is ready to download
              </h1>

              {/* File info with glass effect */}
              <div className="relative group/info w-full">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 
                  rounded-lg opacity-50 group-hover/info:opacity-75 blur transition duration-300"></div>
                <div className="relative flex items-center p-4 bg-gray-800/90 rounded-lg">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-400 
                      rounded-lg opacity-40 blur-sm"></div>
                    <img
                      src={`/images/${filename.split(".")[1]}.png`}
                      alt={filename}
                      className="relative w-14 h-14"
                    />
                  </div>
                  <div className="flex flex-col ml-4 flex-1">
                    <span className="text-white font-medium">{filename}</span>
                    <span className="text-gray-400">{`${sizeInMB(size)} MB`}</span>
                  </div>
                </div>
              </div>

              {/* Download button with neon effect */}
              <button 
                className="relative group/button w-full"
                onClick={handleDownload}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 
                  rounded-lg opacity-75 group-hover/button:opacity-100 blur transition duration-300
                  animate-pulse"></div>
                <div className="relative px-6 py-3 bg-gray-900 rounded-lg flex items-center justify-center
                  transform transition-all duration-300 group-hover/button:scale-[1.02]">
                  <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r 
                    from-purple-400 to-pink-400">Download File</span>
                </div>
              </button>

              {/* Animated dots */}
              <div className="flex justify-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse delay-75"></span>
                <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse delay-150"></span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const { id } = ctx.params;
    const { data } = await axios.get(`http://localhost:8000/api/files/${id}`);
    
    return {
      props: {
        file: data,
      },
    };
  } catch (error) {
    console.error('Error fetching file:', error);
    return {
      props: {
        file: { id: null },
      },
    };
  }
};

export default download;
