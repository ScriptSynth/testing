"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── Terminal line data ── */
interface TerminalLine {
  text: string;
  type: "command" | "output" | "success" | "info" | "accent" | "dim";
  delay: number; // ms after the previous line
}

const terminalSequence: TerminalLine[] = [
  { text: "$ syros analyze --file standup-notes.md", type: "command", delay: 0 },
  { text: "", type: "dim", delay: 600 },
  { text: "📄 Reading meeting notes...", type: "info", delay: 400 },
  { text: '   Source: "Weekly Standup — Feb 7, 2026"', type: "dim", delay: 300 },
  { text: "   Words: 342 │ Participants: 4", type: "dim", delay: 250 },
  { text: "", type: "dim", delay: 200 },
  { text: "🧠 Running AI analysis...", type: "info", delay: 500 },
  { text: "   ├─ NLP pipeline ··········· ✔", type: "success", delay: 400 },
  { text: "   ├─ Entity extraction ······ ✔", type: "success", delay: 350 },
  { text: "   ├─ Deadline detection ····· ✔", type: "success", delay: 300 },
  { text: "   └─ Assignee matching ······ ✔", type: "success", delay: 300 },
  { text: "", type: "dim", delay: 200 },
  { text: "✅ Found 3 action items:", type: "accent", delay: 400 },
  { text: "", type: "dim", delay: 100 },
  { text: '   1. "Update landing page copy"', type: "output", delay: 300 },
  { text: "      → Assigned to: Sarah  │  Due: Feb 10", type: "dim", delay: 250 },
  { text: '   2. "Send proposal to Acme Corp"', type: "output", delay: 300 },
  { text: "      → Assigned to: James  │  Due: Feb 8", type: "dim", delay: 250 },
  { text: '   3. "Schedule design review meeting"', type: "output", delay: 300 },
  { text: "      → Assigned to: Maria  │  Due: Feb 9", type: "dim", delay: 250 },
  { text: "", type: "dim", delay: 300 },
  { text: "🔄 Syncing to Trello → Board: \"Sprint 12\"", type: "info", delay: 500 },
  { text: "   ├─ Card created: Update landing page copy", type: "success", delay: 350 },
  { text: "   ├─ Card created: Send proposal to Acme Corp", type: "success", delay: 300 },
  { text: "   └─ Card created: Schedule design review", type: "success", delay: 300 },
  { text: "", type: "dim", delay: 200 },
  { text: "🎉 Done! 3 tasks synced to Trello in 2.4s", type: "accent", delay: 400 },
];

/* ── Color mapping ── */
const typeColors: Record<TerminalLine["type"], string> = {
  command: "text-green-400",
  output: "text-slate-200",
  success: "text-emerald-400",
  info: "text-sky-400",
  accent: "text-violet-400 font-semibold",
  dim: "text-slate-500",
};

export function AnimatedTerminal() {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [isTyping, setIsTyping] = useState(false);
  const [displayedCmd, setDisplayedCmd] = useState("");
  const [hasStarted, setHasStarted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [visibleLines, displayedCmd]);

  const runAnimation = () => {
    // Clear any pending timeouts
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    setVisibleLines(0);
    setDisplayedCmd("");
    setIsComplete(false);
    setHasStarted(true);

    // Type the first command character by character
    const cmd = terminalSequence[0].text;
    let charIndex = 0;
    setIsTyping(true);

    const typeInterval = setInterval(() => {
      charIndex++;
      setDisplayedCmd(cmd.slice(0, charIndex));
      if (charIndex >= cmd.length) {
        clearInterval(typeInterval);
        setIsTyping(false);
        // After typing, start showing lines
        let cumulativeDelay = 500; // pause after typing
        for (let i = 1; i < terminalSequence.length; i++) {
          cumulativeDelay += terminalSequence[i].delay;
          const t = setTimeout(() => {
            setVisibleLines(i + 1);
            if (i === terminalSequence.length - 1) {
              setIsComplete(true);
            }
          }, cumulativeDelay);
          timeoutsRef.current.push(t);
        }
      }
    }, 35);

    timeoutsRef.current.push(typeInterval as unknown as ReturnType<typeof setTimeout>);
  };

  // Start automatically when component mounts
  useEffect(() => {
    const t = setTimeout(runAnimation, 800);
    return () => {
      clearTimeout(t);
      timeoutsRef.current.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-700/80 bg-[#0f1219] shadow-2xl shadow-indigo-500/10">
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-slate-700/60 bg-[#161b26] px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <div className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-xs font-medium text-slate-500">syros — terminal</span>
        <button
          onClick={runAnimation}
          className="rounded-md px-2.5 py-1 text-xs font-medium text-slate-400 transition-colors hover:bg-slate-700/50 hover:text-slate-200"
          title="Replay"
        >
          {isComplete ? "↻ Replay" : ""}
        </button>
      </div>

      {/* Terminal content */}
      <div
        ref={containerRef}
        className="h-[340px] overflow-y-auto p-5 font-mono text-[13px] leading-relaxed scrollbar-thin"
      >
        {/* First line — typed */}
        {hasStarted && (
          <div className="flex">
            <span className={typeColors.command}>
              {displayedCmd}
              {isTyping && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="inline-block w-2 h-4 ml-0.5 -mb-0.5 bg-green-400"
                />
              )}
            </span>
          </div>
        )}

        {/* Remaining lines */}
        <AnimatePresence>
          {terminalSequence.slice(1, visibleLines).map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15 }}
              className={`${typeColors[line.type]} ${line.text === "" ? "h-3" : ""}`}
            >
              {line.text}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Blinking cursor at end */}
        {hasStarted && !isTyping && !isComplete && (
          <motion.div
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity }}
            className="mt-1 h-4 w-2 bg-slate-400"
          />
        )}
      </div>
    </div>
  );
}
