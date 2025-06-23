import { useState, useEffect } from "react";
import CurrencyConverter from "./components/CurrencyConverter";

export default function App() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const parallax = document.getElementById("parallax-bg");
      if (parallax) {
        const x = (e.clientX / window.innerWidth) * 10;
        const y = (e.clientY / window.innerHeight) * 10;
        parallax.style.transform = `translate(${x}px, ${y}px)`;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className={dark ? "dark min-h-screen w-full" : "min-h-screen w-full"}>
      {/* animated background */}
      <div id="parallax-bg" className="animated-bg"></div>
      {/* noise overlay */}
      <div className="noise-overlay"></div>
      {/* vignette */}
      <div className="vignette"></div>

      {/* main content */}
      <div
        className={`relative min-h-screen w-full flex justify-center items-center p-4 transition-colors ${
          dark ? "bg-black/60 text-white" : "bg-white/60 text-black"
        }`}
      >
        <div className="w-full max-w-xl p-6 rounded-xl backdrop-blur-md bg-white/20 dark:bg-black/20 border border-white/20 shadow-xl">
          <button onClick={() => setDark(!dark)} className="mb-4 neon-button">
            {dark ? "Light Mode" : "Dark Mode"}
          </button>
          <h1 className="text-3xl font-bold text-center mb-4 animated-text">
            Currency Converter
          </h1>
          <CurrencyConverter />
        </div>
      </div>
    </div>
  );
}
