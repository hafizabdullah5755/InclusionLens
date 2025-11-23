// src/data/strategies.js

export const STRATEGIES = [
  {
    id: "dyslexia-1",
    category: "Dyslexia",
    title: "Reduce visual overload",
    barrier: "Dense text and cluttered layouts reduce comprehension.",
    quickFix: [
      "Use clear headings and chunked bullet points",
      "Increase line spacing to 1.5",
      "Limit text per slide/worksheet",
    ],
    classroomUse: [
      "Provide a simplified version alongside the original",
      "Use colour overlays or tinted paper options",
    ],
    tags: ["reading", "worksheets", "slides", "focus"],
    evidence: "Aligned with UDL multiple means of representation.",
    printable: true,
  },
  {
    id: "adhd-1",
    category: "ADHD",
    title: "Break tasks into micro-steps",
    barrier: "Long instructions cause attention drop-off.",
    quickFix: [
      "Give 1–2 step instructions at a time",
      "Use timer checkpoints",
      "Ask pupil to repeat the next step",
    ],
    classroomUse: [
      "Use visual task lists on board",
      "Allow movement breaks between steps",
    ],
    tags: ["instructions", "focus", "behaviour", "tempo"],
    evidence: "Supports executive function scaffolding.",
    printable: true,
  },
  {
    id: "autism-1",
    category: "Autism",
    title: "Preview and structure transitions",
    barrier: "Unpredictable transitions increase anxiety.",
    quickFix: [
      "Say what’s happening next before switching tasks",
      "Use a visual schedule",
      "Offer a consistent transition cue",
    ],
    classroomUse: [
      "Give a 2-minute warning before changes",
      "Use the same routine language daily",
    ],
    tags: ["routine", "anxiety", "transitions"],
    evidence: "Predictability supports emotional regulation.",
    printable: true,
  },
  {
    id: "eal-1",
    category: "EAL",
    title: "Support vocabulary pre-teaching",
    barrier: "Unfamiliar vocab blocks meaning.",
    quickFix: [
      "Pre-teach 3–5 key words",
      "Add visual cues to new terms",
      "Use sentence stems",
    ],
    classroomUse: [
      "Pair with a bilingual glossary if possible",
      "Let them explain in home language first",
    ],
    tags: ["language", "vocabulary", "meaning"],
    evidence: "UDL + cognitive load reduction.",
    printable: true,
  },
  {
    id: "sensory-1",
    category: "Sensory",
    title: "Offer reduced sensory input",
    barrier: "Noise/light overwhelm can cause shutdown.",
    quickFix: [
      "Offer quiet corner or headphones",
      "Reduce background audio",
      "Avoid flashing visuals",
    ],
    classroomUse: [
      "Provide seat options away from high traffic",
      "Let pupil step out briefly if needed",
    ],
    tags: ["sensory", "regulation", "environment"],
    evidence: "Supports sensory processing needs.",
    printable: true,
  },
];
