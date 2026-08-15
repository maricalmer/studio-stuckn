import { fontVariables } from "@/app/fonts";
import "@/app/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div className={fontVariables}>
      <Component {...pageProps} />
    </div>
  );
}
