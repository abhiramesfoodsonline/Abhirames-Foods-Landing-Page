import { motion, AnimatePresence } from "framer-motion";

const bubbleData = [
    { size: 6, cx: "30", delay: 0 },
    { size: 4, cx: "55", delay: 0.3 },
    { size: 5, cx: "70", delay: 0.6 },
    { size: 3, cx: "42", delay: 0.9 },
];


export const PageLoader = () => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, transition: { duration: 0.1, ease: "easeOut" as const } }}
            exit={{ opacity: 0, scale: 0.9, y: -20, transition: { duration: 0.35, ease: "easeIn" as const } }}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
        >
            <div className="absolute w-64 h-64 rounded-full bg-primary/5 blur-3xl" />

            <div className="relative w-24 h-28 mb-6">
                <svg viewBox="0 0 96 112" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-lg">
                    <rect x="20" y="6" width="56" height="14" rx="4" fill="hsl(var(--primary))" opacity="0.9" />
                    <rect x="26" y="2" width="44" height="8" rx="3" fill="hsl(var(--primary))" />

                    <path d="M16 22 Q12 26 12 32 L12 94 Q12 102 20 102 L76 102 Q84 102 84 94 L84 32 Q84 26 80 22 Z"
                          fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="2" />

                    <clipPath id="jarClip">
                        <path d="M16 22 Q12 26 12 32 L12 94 Q12 102 20 102 L76 102 Q84 102 84 94 L84 32 Q84 26 80 22 Z" />
                    </clipPath>

                    {/* Animated brine fill */}
                    <motion.rect
                        x="12" y="20" width="72" height="84"
                        fill="hsl(var(--primary))"
                        opacity="0.15"
                        clipPath="url(#jarClip)"
                        style={{ transformOrigin: "48px 104px" }}
                        animate={{
                            scaleY: [0, 0.3, 0.6, 0.85, 1],
                        }}
                        transition={{
                            duration: 1.4,
                            ease: "easeInOut" as const,
                            repeat: Infinity,
                            repeatType: "reverse" as const,
                        }}
                    />

                    <ellipse cx="38" cy="65" rx="12" ry="8" fill="hsl(var(--primary))" opacity="0.7" />
                    <ellipse cx="38" cy="65" rx="8" ry="5" fill="hsl(var(--primary))" opacity="0.4" />
                    <line x1="38" y1="57" x2="38" y2="73" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.5" />
                    <line x1="30" y1="65" x2="46" y2="65" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.5" />
                    <ellipse cx="60" cy="75" rx="10" ry="7" fill="hsl(var(--primary))" opacity="0.6" />
                    <ellipse cx="60" cy="75" rx="6" ry="4" fill="hsl(var(--primary))" opacity="0.3" />
                    <ellipse cx="42" cy="83" rx="9" ry="6" fill="hsl(var(--primary))" opacity="0.5" />

                    {/* Bubbles */}
                    {bubbleData.map((b, i) => (
                        <motion.circle
                            key={i}
                            cx={b.cx}
                            cy="95"
                            r={b.size / 2}
                            fill="hsl(var(--primary))"
                            clipPath="url(#jarClip)"
                            animate={{ cy: [95, 30], opacity: [0.5, 0] }}
                            transition={{
                                duration: 1.6,
                                repeat: Infinity,
                                delay: b.delay,
                                ease: "easeIn" as const,
                            }}
                        />
                    ))}

                    <path d="M22 30 Q20 50 22 70" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.2" />
                </svg>
            </div>


            {/* Bouncing dots */}
            <div className="flex items-center gap-1">
                {"Loading".split("").map((letter, i) => (
                    <motion.span
                        key={i}
                        className="font-display text-lg font-semibold text-foreground mb-3 tracking-wide"
                        animate={{ y: [0, -6, 0] }}
                        transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.08,
                            ease: "easeInOut" as const,
                        }}
                    >
                        {letter}
                    </motion.span>
                ))}
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-primary ml-0.5"
                        animate={{ y: [0, -6, 0] }}
                        transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: "Loading".length * 0.08 + i * 0.08,
                            ease: "easeInOut" as const,
                        }}
                    />
                ))}
            </div>
        </motion.div>
    );
};