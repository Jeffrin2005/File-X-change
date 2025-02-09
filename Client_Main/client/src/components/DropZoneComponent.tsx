import { useCallback, FunctionComponent, Dispatch } from "react";
import { useDropzone } from "react-dropzone";

const DropZoneComponent: FunctionComponent<{setFile: Dispatch<any>}> = ({setFile}) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragAccept, isDragReject } = useDropzone({ 
    onDrop,
    multiple: false,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'audio/mpeg': []
    }
  });

  return (
    <div className="p-4 z-10">
      <div
        {...getRootProps()}
        className={`relative h-80 w-80 rounded-xl cursor-pointer focus:outline-none transition-all duration-500 group
          before:content-[''] before:absolute before:-inset-1 before:bg-gradient-to-r before:from-[#ff1f71] before:via-[#ff764d] before:to-[#ffa83f] before:rounded-xl before:blur-sm before:opacity-0 before:transition-opacity before:duration-500
          hover:before:opacity-100
          ${isDragAccept ? 
            'before:!bg-gradient-to-r before:!from-green-400 before:!to-green-600 before:!opacity-100 before:animate-pulse scale-105' : 
            isDragReject ? 
            'before:!bg-gradient-to-r before:!from-red-500 before:!to-red-600 before:!opacity-100 scale-95' : 
            ''}`}
      >
        <div className={`relative h-full w-full rounded-xl flex items-center justify-center bg-gray-900/90 border-2 border-dashed
          ${isDragAccept ? 
            'border-green-400' : 
            isDragReject ? 
            'border-red-500' : 
            'border-gray-600'}`}>
          <input {...getInputProps()} />
          <div className={`flex flex-col items-center justify-center text-center transition-all duration-300
            ${isDragAccept ? 'text-green-400 scale-110' : 
              isDragReject ? 'text-red-400 scale-90' : 
              'text-gray-300'}`}>
            <img 
              src="/images/folder.png" 
              alt="upload" 
              className={`w-16 h-16 mb-4 transition-transform duration-300 
                ${isDragAccept ? 'scale-110 animate-bounce' : 
                  isDragReject ? 'scale-90 animate-shake' : 
                  'scale-100 group-hover:scale-105'}`} 
            />
            {isDragReject ? (
              <div className="animate-bounce">
                <p className="text-xl font-bold text-red-400">Invalid File Type!</p>
                <p className="mt-2 text-sm text-red-300/80">Only jpeg, png & mp3 files supported</p>
              </div>
            ) : isDragAccept ? (
              <div className="animate-pulse">
                <p className="text-xl font-bold text-green-400">Perfect!</p>
                <p className="mt-2 text-sm text-green-300/80">Drop to upload your file</p>
              </div>
            ) : (
              <div className="transition-all duration-300">
                <p className="text-lg font-semibold group-hover:text-white">Drag & Drop Files here</p>
                <p className="mt-2 text-sm text-gray-500 group-hover:text-gray-400">Only jpeg, png & mp3 files supported</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropZoneComponent;
