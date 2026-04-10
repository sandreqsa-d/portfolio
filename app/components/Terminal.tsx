"use client";

import { useState, useEffect, useRef } from "react";

type Line = { text: string; header?: boolean };

const PROMPT = "C:\\Users\\Sandro> ";

const BOOT_LINES: Line[] = [
  { text: "Portfolio [Version 1.1.1]", },
  { text: " Sandreqsa_d. All rights reserved." },
  { text: " " },
  { text: "Welcome to my terminal styled portfolio!" },
  { text: " " },
  { text: "Type 'help' to see all available commands." },
  { text: "" },
];

//responses

const RESPONSES: Record<string, Line[]> = {
  help: [
    { text: "" },
    { text: "Available commands:", header: true },
    { text: "" },
    { text: "  whoami        — Quick introduction" },
    { text: "  about         — Professional summary" },
    { text: "  skills        — Technical skill set" },
    { text: "  experience    — Work & project experience" },
    { text: "  education     — Education & certifications" },
    { text: "  contact       — Get in touch" },
    { text: "  clear         — Clear the terminal" },
    { text: "" },
  ],
  whoami: [
    { text: "" },
    { text: "  Name      : Sandro Gegechkori", header: true },
    { text: "  Role      : Junior Front-End Developer" },
    { text: "  Location  : Martvili, Georgia" },
    { text: "  Grade     : 11th grade (Private School Skhivi)" },
    { text: "  Status    : Open to opportunities" },
    { text: "" },
    { text: "  Type 'about' for a full professional summary." },
    { text: "" },
  ],
  about: [
    { text: "" },
    { text: "════════════════════════════════════════", header: true },
    { text: " MY PROFESSIONAL SUMMARY", header: true },
    { text: "════════════════════════════════════════", header: true },
    { text: "" },
    { text: "  Junior Front-End Developer with 1+ year of experience" },
    { text: "  building responsive websites using HTML, CSS," },
    { text: "  JavaScript, and Firebase." },
    { text: "" },
    { text: "  I have built multi-page websites with features like:" },
    { text: "    · Login / Signup systems" },
    { text: "    · Search & filtering" },
    { text: "    · Dark mode" },
    { text: "    · Smooth animations" },
    { text: "    · Local storage" },
    { text: "" },
    { text: "  Also experienced with Flutter for mobile app dev," },
    { text: "  combining clean design with interactive functionality." },
    { text: "" },
    { text: "  Goal: grow as a developer, work on real-world projects," },
    { text: "  sharpen teamwork, and master advanced technologies." },
    { text: "" },
  ],
  skills: [
    { text: "" },
    { text: "════════════════════════════════════════", header: true },
    { text: "  TECHNICAL SKILLS", header: true },
    { text: "════════════════════════════════════════", header: true },
    { text: "" },
    { text: "  Languages   : HTML · CSS · JavaScript · C++ · Dart" },
    { text: "  Frameworks  : Flutter · Firebase · React · Next.js" },
    { text: "  Tools       : Git · VS Code · Arduino · MS Office" },
    { text: "" },
    { text: "  Specialties:", header: true },
    { text: "    · Responsive Web Design" },
    { text: "    · Front-End Development" },
    { text: "    · Mobile App Development (Flutter)" },
    { text: "    · Debugging & Optimization" },
    { text: "    · Electronics & Arduino" },
    { text: "    · Hardware Troubleshooting" },
    { text: "" },
    { text: "  Soft Skills:", header: true },
    { text: "    · Problem Solving · Teamwork · Communication" },
    { text: "    · Time Management · Technical Support" },
    { text: "" },
  ],
  experience: [
    { text: "" },
    { text: "════════════════════════════════════════", header: true },
    { text: "  WORK & PROJECT EXPERIENCE", header: true },
    { text: "════════════════════════════════════════", header: true },
    { text: "" },
    { text: "  [1] Technical Support Assistant          2020 – 2024", header: true },
    { text: "      COMP100, Georgia" },
    { text: "      > Provided tech support for hardware/software issues" },
    { text: "      > Diagnosed computers, phones, and network problems" },
    { text: "      > Assisted with software install, setup, and maintenance" },
    { text: "      > Built strong communication and customer service skills" },
    { text: "" },
    { text: "  [2] Junior Front-End Developer           2024 – Present", header: true },
    { text: "      Self-Employed / Independent Projects, Georgia" },
    { text: "      > Built responsive multi-page sites (HTML · CSS · JS)" },
    { text: "      > Implemented login, search, filtering, dark mode" },
    { text: "      > Created mobile-friendly UIs with smooth animations" },
    { text: "      > Improved debugging and performance optimization skills" },
    { text: "" },
    { text: "  [3] Flutter Mobile App Developer         2024 – 2025", header: true },
    { text: "      TechSchool x GeoLab Project, Georgia" },
    { text: "      > Developed a social media app with Flutter + Firebase" },
    { text: "      > Built auth, dark/light mode UI, responsive layouts" },
    { text: "      > Worked on scalable app architecture" },
    { text: "      > Strengthened teamwork and project management skills" },
    { text: "" },
    { text: "  [4] Robotics & Electronics               2022 – Present", header: true },
    { text: "      Independent Projects, Georgia" },
    { text: "      > Built Arduino-based microcontroller projects" },
    { text: "      > Designed automated water pressure regulation concepts" },
    { text: "      > Researched low-cost water filtration systems" },
    { text: "      > Developed hardware programming and troubleshooting skills" },
    { text: "" },
  ],
  education: [
    { text: "" },
    { text: "════════════════════════════════════════", header: true },
    { text: "  EDUCATION & CERTIFICATIONS", header: true },
    { text: "════════════════════════════════════════", header: true },
    { text: "" },
    { text: "  School       : Private School Skhivi, Georgia", header: true },
    { text: "  Grade        : 11th (Graduation: June / July 2027)" },
    { text: "  Major        : General Education" },
    { text: "" },
    { text: "  Programs & Courses:", header: true },
    { text: "    > Komarovi STEAM School   — Scholarship Program (2024)" },
    { text: "    > TechSchool x GeoLab     — Flutter Mobile App Dev" },
    { text: "    > re:educate              — Front-End Development Course" },
    { text: "" },
    { text: "  Certifications:", header: true },
    { text: "    > Front-End Development Course  ·  re:educate        (2025)" },
    { text: "    > Scholarship Program           ·  Komarovi STEAM    (2024)" },
    { text: "" },
    { text: "  Projects:", header: true },
    { text: "    > Responsive multi-page websites (HTML · CSS · JS)" },
    { text: "    > Social media mobile app       (Flutter · Firebase)" },
    { text: "    > Arduino / electronics experiments" },
    { text: "" },
  ],
  contact: [
    { text: "" },
    { text: "==================================", header: true },
    { text: "  CONTACT INFORMATION", header: true },
    { text: "==================================", header: true },
    { text: "" },
    { text: "  Email    : gegechkorisandro1@gmail.com", header: true },
    { text: "  Phone    : (+995) 598 71 70 04" },
    { text: "  Location : Martvili, Georgia" },
    { text: "" },
    { text: "  I am open to:" },
    { text: "    · Junior developer positions" },
    { text: "    · Freelance / contract projects" },
    { text: "    · Internships" },
    { text: "    · Collaborative open-source work" },
    { text: "" },
    { text: "  Feel free to reach out — I respond quickly!" },
    { text: "" },
  ],
  lalaland: [
    { text: "ur not sopouse to see this...  ;))" },
    { text: "This will be our little secret but i dont have a gf :(" },
    { text: "YET..." },
  ]
};

function Terminal() {

  // setting up states
  const [outputLines, setOutputLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  //autoscroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  });

  //slowly lines appearing at boot
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < BOOT_LINES.length) {
        setOutputLines((prev) => [...prev, BOOT_LINES[i]]);
        i++;
      } else {
        clearInterval(timer);
      }
    }, 60);

    return () => clearInterval(timer);
  }, []);

  //handling inputed commands

  function handleCommand(input: string) {
    const trimmed = input.trim().toLowerCase();

    if (trimmed === "clear") {
      setOutputLines([]);
      return;
    }

    const commandLine: Line = { text: PROMPT + input };
    const response = RESPONSES[trimmed];

    //command error

    setOutputLines((prev) => [
      ...prev,
      commandLine,
      ...(response ?? [
        { text: "" },
        { text: `'${input}' is not recognized as an internal or external command,` },
        { text: "operable program or batch file." },
        { text: "" },
        { text: "Type 'help' to see available commands." },
        { text: "" },
      ]),
    ]);
  }

  //handling enter key

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    }
  }


  //rendering-----------------------------------------------------------------------
  return (
    <div className="terminal-wrap" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-body">
        {/* output lines */}
        {outputLines.map((line, i) => {
          if (!line) return null;
          return (
            <span key={i} className={`line${line.header ? " header" : ""}`}>
              {line.text}
            </span>
          )
        })}

        {/* input row */}
        <div className="input-row">
          <span className="prompt">{PROMPT}</span>
          <input
            ref={inputRef}
            className="terminal-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            aria-label="Terminal input"
          />
        </div>

        {/* autoscroll div*/}
        <div ref={bottomRef} />

        {/* lalaland */}
        <div className="lalaland"><p>
          try typing "lalaland"
        </p>
        </div>
      </div>
    </div>
  );
}
export default Terminal;

