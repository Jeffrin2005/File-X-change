import type { AppProps } from 'next/app'
import "../../styles/globals.css";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000"; 
function MyApp({ Component, pageProps }: AppProps) {
  return (
  <div className="h-screen font-serif bg-gray-900 text-white
  grid place-items-center">
    <div>
    <Component {...pageProps} />
    </div>
    </div>
  );
}

export default MyApp;
