import { useState, useRef } from "react";

const App = () => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<number | undefined>(undefined);

  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600)
      .toString()
      .padStart(2, "0");

    const mins = Math.floor((totalSeconds % 3600) / 60)
      .toString()
      .padStart(2, "0");

    const secs = (totalSeconds % 60).toString().padStart(2, "0");

    return `${hrs}:${mins}:${secs}`;
  };

  const handleStart = () => {
    if (isRunning) return;

    setIsRunning(true);

    intervalRef.current = window.setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  const handlePause = () => {
    if (!isRunning) return;

    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const handleReset = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setTime(0);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white font-sans antialiased selection:bg-amber-500/30 overflow-hidden">
      {/* --- Premium Background Glows (Warm Amber) --- */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-amber-300/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-80 h-80 bg-amber-400/10 rounded-full blur-[120px] pointer-events-none" />

      {/* --- Main Container (Deeper Backdrop, subtle border) --- */}
      <div className="relative z-10 flex flex-col items-center bg-slate-900/60 backdrop-blur-lg border border-slate-800 p-10 md:p-14 rounded-3xl shadow-[0_0_60px_-15px_rgba(0,0,0,0.7)] max-w-md w-full mx-4 transition-all duration-300">
        {/* Subtle texture overlay for premium feel */}
        <div className="absolute inset-0 rounded-3xl bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiIHZpZXdCb3g9IjAgMCA0IDQiPjxnIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGcgZmlsbD0iIzk0YTNCOCIgZmlsbC1vcGFjaXR5PSIwLjA1Ij48cGF0aCBkPSJNMCAwaDR2NEgwVjB6bTIgMnYyaDJWMkgyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20 pointer-events-none" />

        <h1 className="relative text-[10px] font-semibold tracking-[0.3em] text-slate-500 uppercase mb-8">
          Stopwatch
        </h1>

        {/* --- Animated Timer Display (Rich Material & Glow) --- */}
        <div className="relative flex items-center justify-center w-64 h-64 rounded-full border border-slate-800 bg-slate-950 shadow-[inset_0_0_20px_rgba(0,0,0,0.6)] mb-10 group overflow-hidden">
          {/* Subtle metal grain sheen on the base ring */}
          <div className="absolute inset-1 rounded-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800/60 via-slate-900 to-slate-950/20" />

          {/* Animated Outer Ring (Platinum/Gold Blend when running) */}
          <div
            className={`absolute inset-0 rounded-full border-2 border-transparent transition-all duration-700 ${
              isRunning
                ? "border-t-amber-400 border-r-amber-400/30 animate-spin [animation-duration:5s]"
                : "border-slate-800"
            }`}
          />

          {/* Time Text (Warmer, softer colors and glow) */}
          <p
            className={`relative text-4xl md:text-5xl font-mono font-light tracking-wider tabular-nums transition-all duration-300 ${
              isRunning
                ? "text-amber-300 drop-shadow-[0_0_15px_rgba(251,191,36,0.35)]" // Warmer Amber Gold
                : "text-slate-300" // Sophisticated Platinum Grey
            }`}
          >
            {formatTime(time)}
          </p>
        </div>

        {/* --- Controls Grid (Single Accent Strategy) --- */}
        <div className="grid grid-cols-3 gap-4 w-full relative">
          {/* Reset Button (Understated & Function-focused) */}
          <button
            onClick={handleReset}
            disabled={time === 0}
            className="py-3 px-4 rounded-xl bg-slate-800/30 border border-slate-700/30 text-slate-300 font-medium text-sm transition-all duration-200 active:scale-95 disabled:opacity-30 disabled:pointer-events-none hover:bg-slate-800 hover:text-white"
          >
            Reset
          </button>

          {/* Pause Button (Understated & Function-focused) */}
          <button
            onClick={handlePause}
            disabled={!isRunning}
            className="py-3 px-4 rounded-xl bg-slate-800/30 border border-slate-700/30 text-slate-300 font-medium text-sm transition-all duration-200 active:scale-95 disabled:opacity-30 disabled:pointer-events-none hover:bg-slate-800 hover:text-white"
          >
            Pause
          </button>

          {/* Start Button (The SINGLE Premium Accent: Rich Gold/Amber) */}
          <button
            onClick={handleStart}
            disabled={isRunning}
            className="py-3 px-4 rounded-xl bg-amber-400 text-slate-950 font-semibold text-sm shadow-xl shadow-amber-400/20 transition-all duration-200 active:scale-95 disabled:opacity-40 disabled:pointer-events-none hover:bg-amber-300 hover:shadow-amber-300/40"
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
