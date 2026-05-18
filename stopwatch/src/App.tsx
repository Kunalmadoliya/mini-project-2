import { useState, useRef } from "react";

const App = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  // Format time into HH:MM:SS
  const formatTime = (totalSeconds) => {
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
    intervalRef.current = setInterval(() => {
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white font-sans antialiased selection:bg-cyan-500/30">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-80 h-80 bg-violet-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 flex flex-col items-center bg-slate-900/40 backdrop-blur-xl border border-slate-800 p-10 md:p-14 rounded-3xl shadow-2xl max-w-md w-full mx-4 transition-all duration-300 hover:border-slate-700/60">
        <h1 className="text-xs font-semibold tracking-[0.25em] text-slate-400 uppercase mb-8">
          Stopwatch
        </h1>

        {/* Animated Timer Display */}
        <div className="relative flex items-center justify-center w-64 h-64 rounded-full border border-slate-800 bg-slate-950/50 shadow-inner mb-10 group">
          {/* Animated Outer Ring Glowing Effect when running */}
          <div
            className={`absolute inset-0 rounded-full border-2 border-transparent transition-all duration-700 ${
              isRunning
                ? "border-t-cyan-500 border-r-cyan-500/30 animate-spin [animation-duration:4s]"
                : "border-slate-800"
            }`}
          />

          <p
            className={`text-4xl md:text-5xl font-mono font-light tracking-wider tabular-nums transition-all duration-300 ${
              isRunning
                ? "text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.3)]"
                : "text-slate-200"
            }`}
          >
            {formatTime(time)}
          </p>
        </div>

        {/* Controls Grid */}
        <div className="grid grid-cols-3 gap-4 w-full">
          {/* Reset Button */}
          <button
            onClick={handleReset}
            disabled={time === 0}
            className="py-3 px-4 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-300 font-medium text-sm transition-all duration-200 active:scale-95 disabled:opacity-40 disabled:pointer-events-none hover:bg-slate-800 hover:text-white"
          >
            Reset
          </button>

          {/* Pause Button */}
          <button
            onClick={handlePause}
            disabled={!isRunning}
            className="py-3 px-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 font-medium text-sm transition-all duration-200 active:scale-95 disabled:opacity-30 disabled:pointer-events-none hover:bg-amber-500/20"
          >
            Pause
          </button>

          {/* Start Button */}
          <button
            onClick={handleStart}
            disabled={isRunning}
            className="py-3 px-4 rounded-xl bg-cyan-500 text-slate-950 font-semibold text-sm shadow-lg shadow-cyan-500/20 transition-all duration-200 active:scale-95 disabled:opacity-40 disabled:pointer-events-none hover:bg-cyan-400 hover:shadow-cyan-400/30"
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
