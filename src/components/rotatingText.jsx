import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function RotatingText({
  texts = ["DEVELOPER", "DESIGNER", "CREATOR"],
  mainClassName = "hero-content",
  staggerFrom = "first",
  initial = { y: "100%", opacity: 0 },
  animate = { y: 0, opacity: 1 },
  exit = { y: "-120%", opacity: 0 },
  staggerDuration = 0.03,
  splitLevelClassName = "",
  transition = { type: "spring", damping: 30, stiffness: 400 },
  rotationInterval = 2500,
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % texts.length);
    }, rotationInterval);
    return () => clearInterval(interval);
  }, [texts.length, rotationInterval]);

  const current = texts[index];

  const characters = Array.from(current);

  const getDelay = (i, length) => {
    switch (staggerFrom) {
      case "last":
        return (length - 1 - i) * staggerDuration;
      case "center": {
        const center = Math.floor(length / 2);
        return Math.abs(center - i) * staggerDuration;
      }
      case "first":
      default:
        return i * staggerDuration;
    }
  };

  return (
    <div className={`flex ${mainClassName}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={current}
          className={`inline-block ${splitLevelClassName}`}
          aria-label={current}
          style={{ display: "inline-flex", overflow: "hidden" }}
        >
          {characters.map((char, i) => (
            <motion.span
              key={char + i}
              initial={initial}
              animate={animate}
              exit={exit}
              transition={{
                ...transition,
                delay: getDelay(i, characters.length),
              }}
              style={{ display: "inline-block" }}
              aria-hidden="true"
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}