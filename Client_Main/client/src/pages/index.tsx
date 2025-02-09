import DropZoneComponent from "@components/DropZoneComponent";
import { useState } from "react";
import RenderFile from "@components/RenderFile";
import axios from "axios";
axios.defaults.baseURL = 'http://localhost:8000';
import DownloadFile from "@components/DownloadFile";

export default function Home() {
  const [file, setFile] = useState(null);
  const [id, setId] = useState(null);
  const [downloadPageLink, setDownloadPageLink] = useState(null);
  const [uploadState, setUploadState] = useState<"Uploading" | "Upload Failed" | "Uploaded" | "Upload">("Upload");

  const handleUpload = async () => {
    if (uploadState === "Uploading") return;
    if (!file) {
      console.log("No file selected");
      return;
    }

    setUploadState("Uploading");
    const formData = new FormData();
    formData.append("myFile", file);

    try {
      const { data } = await axios({
        method: "POST",
        data: formData,
        url: "/api/files/upload",
        headers: {
          "Content-Type": "multipart/form-data"
        },
      });
      
      console.log("Upload response:", data);
      setDownloadPageLink(data.downloadPageLink);
      setId(data.id);
      setUploadState("Uploaded");
    } catch (error) {
      console.error("Upload error:", error);
      if (axios.isAxiosError(error) && error.response) {
        console.log("Server error response:", error.response.data);
      } else {
        console.log('Error uploading file:', error.message);
      }
      setUploadState("Upload Failed");
    }
  };

  const resetComponent = () => {
    setFile(null);
    setUploadState("Upload");
    setDownloadPageLink(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff1f71] via-[#ff764d] to-[#ffa83f] mb-8 text-center
        [text-shadow:_2px_2px_10px_rgb(255_255_255_/_20%)]
        animate-gradient-x hover:scale-105 transition-transform duration-300">
        Got a File ? Share It Like Fake News
      </h1>
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
        <div className="relative">
          {!downloadPageLink && <DropZoneComponent setFile={setFile} />}
          {file && (
            <RenderFile
              file={{
                format: file.type.split("/")[1],
                sizeInBytes: file.size,
                name: file.name
              }}
            />
          )}
          <div className="flex justify-center w-full">
            {!downloadPageLink && file && (
              <button
                className="p-2 my-5 bg-gray-900 rounded-md w-44 focus:outline-none hover:bg-gray-800 transition-colors duration-200"
                onClick={handleUpload}
              >
                {uploadState}
              </button>
            )}
            {downloadPageLink && (
              <div className="p-2 text-center">
                <DownloadFile downloadPageLink={downloadPageLink} />
                <button
                  className="p-2 my-5 bg-gray-900 rounded-md w-44 focus:outline-none hover:bg-gray-800"
                  onClick={resetComponent}
                >
                  Upload New File
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
