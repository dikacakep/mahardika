import { useState, useEffect } from "react";

const TEXTS_TO_TYPE = ["Web Developer", "Discord Bot Developer", "Roblox Developer", "WhatsApp BOT Developer"];

export default function LoopingGradientText({
  className = "",
  colors = ["#0099ff", "#0055ff", "#0099ff"],
  animationSpeed = 3,
  typingSpeed = 100,
  deletingSpeed = 75,
  pauseDuration = 2000,
}) {
  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = TEXTS_TO_TYPE[textIndex];

    const handleTyping = () => {
      if (isDeleting) {
        if (displayedText.length > 0) {
          setDisplayedText(currentText.substring(0, displayedText.length - 1));
        } else {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % TEXTS_TO_TYPE.length);
        }
      } else {
        if (displayedText.length < currentText.length) {
          setDisplayedText(currentText.substring(0, displayedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, textIndex, deletingSpeed, typingSpeed, pauseDuration]);

  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
    animationDuration: `${animationSpeed}s`,
  };

  return (
    <div className={`relative flex w-full items-center justify-start ${className}`}>
      <div
        className="inline-block relative z-2 text-left text-xl lg:text-3xl font-medium text-transparent bg-cover animate-gradient"
        style={{
          ...gradientStyle,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          backgroundSize: "300% 100%",
        }}
      >
        <span>{displayedText}</span>
        <span
          className="ml-1 inline-block h-5 w-0.5 animate-blink bg-white"
          style={{ height: "1.25em", verticalAlign: "bottom" }}
        />
      </div>
    </div>
  );
}
