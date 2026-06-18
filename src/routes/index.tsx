import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import resumeAsset from "@/assets/resume.pdf.asset.json";
import profileAsset from "@/assets/naveen-profile.png.asset.json";

const INTRO_SCRIPT = "Hi there! I'm Naveen Kumar Gairuboina, a full stack developer specializing in the MERN stack. I've shipped four plus production projects, published research in IEEE Xplore on forest fire prediction with ninety one percent accuracy, and solved two hundred plus problems on LeetCode and HackerRank. I love building scalable web applications, REST APIs, and AI powered systems. Let's build something amazing together!";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Naveen Kumar Gairuboina — Full Stack Developer" },
      { name: "description", content: "Portfolio of Gairuboina Naveen Kumar — MERN Full Stack Developer building scalable web apps, REST APIs, and AI-powered systems. IEEE published researcher." },
      { property: "og:title", content: "Naveen Kumar Gairuboina — Full Stack Developer" },
      { property: "og:description", content: "MERN Full Stack Developer · IEEE Published · 4+ Production Projects" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" },
    ],
  }),
  component: Portfolio,
});

const skills = {
  Languages: ["Python", "JavaScript"],
  Frontend: ["React", "Angular", "HTML", "CSS", "Bootstrap"],
  Backend: ["Node.js", "Express.js"],
  Database: ["MongoDB", "MySQL"],
  Tools: ["Git", "VS Code", "Postman", "Firebase"],
};

const projects = [
  {
    name: "BidHeritage",
    tag: "MERN Stack",
    desc: "Auction platform with secure auth, image uploads, and real-time bidding workflow.",
    tech: ["MongoDB", "Express", "React", "Node"],
    accent: "from-cyan-400/30 to-violet-500/30",
  },
  {
    name: "MediMeet",
    tag: "Android + Web",
    desc: "Kotlin Android app + Angular/MySQL web for booking doctors, video calls & medicine delivery with Firebase auth.",
    tech: ["Kotlin", "Angular", "Firebase", "MySQL"],
    accent: "from-violet-500/30 to-amber-400/30",
  },
  {
    name: "A1-Fashions",
    tag: "MERN E-Commerce",
    desc: "Full e-commerce app with JWT auth, REST APIs and role-based access for Admin/User flows.",
    tech: ["JWT", "MongoDB", "Express", "React"],
    accent: "from-amber-400/30 to-cyan-400/30",
  },
  {
    name: "Movies Pulse",
    tag: "TMDb API",
    desc: "Trending & popular movies fetched weekly from TMDb with responsive Bootstrap UI across 3 breakpoints.",
    tech: ["HTML", "CSS", "JS", "REST"],
    accent: "from-cyan-400/30 to-amber-400/30",
  },
];

const experience = [
  {
    role: "MERN Full Stack with AI — Intern",
    date: "May 2025 – Jun 2025",
    points: [
      'Built "SnapShare" — MERN photo sharing with dynamic feed & real-time updates.',
      "Integrated OTP password reset via Nodemailer — security up 80%.",
      "Added feedback system improving UX & speed by 40%.",
    ],
  },
  {
    role: "Infosys Springboard 5.0 — Intern, Django",
    date: "Oct 2024 – Dec 2024",
    points: [
      'Frontend developer on "Travel Guide Using AI".',
      "Shipped responsive cross-browser UI — 20% engagement uplift.",
    ],
  },
];

function Portfolio() {
  const resumeUrl = resumeAsset.url;
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speakIntro = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const synth = window.speechSynthesis;
    if (isSpeaking) {
      synth.cancel();
      setIsSpeaking(false);
      return;
    }
    synth.cancel();

    const setVoiceAndSpeak = () => {
      const u = new SpeechSynthesisUtterance(INTRO_SCRIPT);
      u.rate = 0.94;
      u.pitch = 0.58;
      u.volume = 1;
      u.lang = "en-US";
      const voices = synth.getVoices();
      const femaleNames = /\bfemale\b|woman|samantha|victoria|karen|moira|tessa|serena|zira|jenny|aria|sonya|lisa|emma|amy|olivia|susan|kate|catherine|laura|jane/i;
      const maleNames = /\bmale\b|\bman\b|david|mark|alex|fred|bruce|james|john|paul|richard|tom|daniel|george|henry|michael|ryan|steve|edward|aaron|arthur|oliver|thomas|microsoft david|microsoft james|microsoft mark|microsoft george|microsoft ryan|google uk english male/i;
      const englishMaleVoices = voices.filter((v) => /en[-_](US|GB|IN|AU|CA)/i.test(v.lang) && !femaleNames.test(v.name));
      const maleVoice =
        englishMaleVoices.find((v) => maleNames.test(v.name)) ||
        englishMaleVoices.find((v) => /en[-_]GB/i.test(v.lang)) ||
        englishMaleVoices[0];
      if (maleVoice) u.voice = maleVoice;
      u.onend = () => setIsSpeaking(false);
      u.onerror = () => setIsSpeaking(false);
      utteranceRef.current = u;
      setIsSpeaking(true);
      synth.speak(u);
    };

    if (synth.getVoices().length === 0 && synth.onvoiceschanged !== undefined) {
      const handler = () => {
        synth.removeEventListener("voiceschanged", handler);
        setVoiceAndSpeak();
      };
      synth.addEventListener("voiceschanged", handler);
    } else {
      setVoiceAndSpeak();
    }
  };


  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 glass border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#top" className="font-display font-bold text-lg">
            <span className="text-gradient">naveen</span>
            <span className="text-muted-foreground">.dev</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#about" className="hover:text-foreground transition">About</a>
            <a href="#skills" className="hover:text-foreground transition">Skills</a>
            <a href="#projects" className="hover:text-foreground transition">Projects</a>
            <a href="#experience" className="hover:text-foreground transition">Experience</a>
            <a href="#contact" className="hover:text-foreground transition">Contact</a>
          </div>
          <a
            href={resumeUrl}
            download="GAIRUBOINA_NAVEEN_KUMAR.pdf"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition glow"
          >
            <DownloadIcon /> Resume
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section id="top" className="relative pt-32 pb-24 px-6 grid-bg">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-12 items-center">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-mono mb-6">
              <span className="size-2 rounded-full bg-green-400 animate-glow-pulse" />
              Available for opportunities
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] mb-6">
              Hi, I'm <span className="text-gradient">Naveen</span>.<br />
              I build <span className="shimmer-text">full-stack</span><br />
              experiences.
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
              Full Stack Developer crafting MERN applications, REST APIs, and AI-powered systems.
              Published research in IEEE Xplore and passionate about building scalable, production-grade software.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={resumeUrl}
                download="GAIRUBOINA_NAVEEN_KUMAR.pdf"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:scale-105 transition-transform glow"
              >
                <DownloadIcon /> Download Resume
                <span className="opacity-0 group-hover:opacity-100 transition">→</span>
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass font-medium hover:bg-white/5 transition"
              >
                View Projects
              </a>
              <a
                href="mailto:gairuboina.naveenkumar45@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass font-medium hover:bg-white/5 transition"
              >
                Let's talk
              </a>
            </div>

          </div>

          {/* Circular Profile Picture with Effects — click to hear intro */}
          <div className="relative flex flex-col items-center justify-center animate-fade-up" style={{ animationDelay: "200ms" }}>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 via-violet-500/30 to-amber-400/30 blur-3xl opacity-50 animate-glow-pulse" />
            {/* Rotating gradient ring */}
            <button
              type="button"
              onClick={speakIntro}
              aria-label={isSpeaking ? "Stop introduction" : "Play voice introduction"}
              className="group relative size-72 md:size-80 lg:size-96 cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-violet-400/50 rounded-full"
            >
              <div className={`absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400 via-violet-500 to-amber-400 animate-spin-slow ${isSpeaking ? "opacity-100" : "opacity-80"}`} />
              <div className="absolute inset-[3px] rounded-full bg-[var(--color-background)]" />
              <div className={`absolute inset-[6px] rounded-full overflow-hidden animate-float shadow-[0_0_60px_-10px_oklch(0.68_0.21_305_/_0.5)] transition-transform group-hover:scale-[1.02] ${isSpeaking ? "ring-4 ring-cyan-400/60" : ""}`}>
                <img
                  src={profileAsset.url}
                  alt="Gairuboina Naveen Kumar — Full Stack Developer"
                  loading="eager"
                  className="w-full h-full object-cover"
                />
                {/* Speaking sound waves overlay */}
                {isSpeaking && (
                  <div className="absolute inset-0 flex items-end justify-center pb-6 bg-gradient-to-t from-black/60 to-transparent pointer-events-none">
                    <div className="flex items-end gap-1 h-10">
                      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                        <span
                          key={i}
                          className="w-1.5 rounded-full bg-cyan-300"
                          style={{
                            animation: `eq 0.9s ease-in-out ${i * 0.08}s infinite`,
                            height: "40%",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {/* Status dot */}
              <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full glass text-xs font-mono">
                <span className={`size-2.5 rounded-full ${isSpeaking ? "bg-cyan-400" : "bg-green-400"} animate-glow-pulse`} />
                {isSpeaking ? "speaking" : "online"}
              </div>
            </button>
            {/* Hint pill */}
            <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-mono text-muted-foreground">
              <SpeakerIcon active={isSpeaking} />
              {isSpeaking ? "Click photo to stop" : "Click my photo to hear intro"}
            </div>
          </div>



        </div>
      </section>

      {/* About */}
      <Section id="about" eyebrow="01 — About" title="A developer with a research mindset.">
        <div className="grid md:grid-cols-2 gap-8">
          <p className="text-muted-foreground leading-relaxed">
            I'm a final-year CSE student at Narasaraopeta Engineering College (76%) with a deep
            love for building production-grade web experiences. From auction platforms to
            healthcare apps, I ship features that feel polished and perform under real load.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            My research on <span className="text-foreground">forest fire prediction using ML, NDVI &
            weather data</span> hit 91.46% accuracy and was published in IEEE Xplore — a glimpse
            into how I blend engineering with curiosity.
          </p>
        </div>
        <div className="mt-10 grid sm:grid-cols-3 gap-4">
          {[
            { k: "B.Tech CSE", v: "76% · Narasaraopeta EC" },
            { k: "Intermediate MPC", v: "91% · Sri Chaitanya" },
            { k: "SSC", v: "91% · ZP High School" },
          ].map((e) => (
            <div key={e.k} className="glass rounded-xl p-5">
              <div className="text-xs font-mono text-muted-foreground mb-1">{e.k}</div>
              <div className="font-medium">{e.v}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Skills */}
      <Section id="skills" eyebrow="02 — Toolbox" title="Tech I work with.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.entries(skills).map(([cat, items]) => (
            <div key={cat} className="glass rounded-2xl p-6 hover:bg-white/5 transition group">
              <div className="text-xs font-mono text-primary mb-3 group-hover:tracking-wider transition-all">
                ./{cat.toLowerCase()}
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map((s) => (
                  <span key={s} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Projects */}
      <Section id="projects" eyebrow="03 — Work" title="Selected projects.">
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <div
              key={p.name}
              className="group relative glass rounded-2xl p-7 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div className={`absolute -top-20 -right-20 size-48 rounded-full bg-gradient-to-br ${p.accent} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity`} />
              <div className="relative">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-xs font-mono text-muted-foreground">0{i + 1}</div>
                  <span className="text-xs font-mono px-2 py-1 rounded-full bg-white/5">{p.tag}</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">{p.name}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <span key={t} className="text-xs font-mono text-primary/80">#{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Experience */}
      <Section id="experience" eyebrow="04 — Journey" title="Experience.">
        <div className="space-y-4">
          {experience.map((e) => (
            <div key={e.role} className="glass rounded-2xl p-7 relative">
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
                <h3 className="text-xl font-semibold">{e.role}</h3>
                <span className="text-xs font-mono text-muted-foreground">{e.date}</span>
              </div>
              <ul className="space-y-2">
                {e.points.map((pt) => (
                  <li key={pt} className="text-muted-foreground text-sm flex gap-3">
                    <span className="text-primary mt-1.5 size-1.5 rounded-full bg-primary shrink-0" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Publication */}
      <Section eyebrow="05 — Research" title="Published in IEEE Xplore.">
        <div className="glass rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 size-64 bg-gradient-to-br from-violet-500/20 to-cyan-400/20 blur-3xl" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono mb-4">
              📄 IEEE Publication · 91.46% Accuracy
            </div>
            <h3 className="text-2xl font-bold mb-3 max-w-3xl">
              A Machine Learning Framework for Forest Fire Prediction in the Nallamala Forest Using NDVI and Synthetic Weather Data
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Built a stacked ensemble model with SMOTE balancing on NDVI satellite data and
              weather signals — predicting forest fire risk with 91.46% accuracy.
            </p>
          </div>
        </div>
      </Section>

      {/* Achievements + Certificates */}
      <Section eyebrow="06 — Wins" title="Achievements & Certifications.">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass rounded-2xl p-7">
            <h3 className="font-display font-semibold mb-4 text-lg">🏆 Achievements</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>📄 Published research paper in IEEE Xplore</li>
              <li>💻 Solved 200+ problems on LeetCode & HackerRank</li>
              <li>🐍 Completed NPTEL — Joy of Computing Using Python</li>
            </ul>
          </div>
          <div className="glass rounded-2xl p-7">
            <h3 className="font-display font-semibold mb-4 text-lg">🎓 Certifications</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>JavaScript (Basic & Intermediate) — HackerRank</li>
              <li>Node.js (Basic & Intermediate) — HackerRank</li>
              <li>The Joy of Computing using Python — NPTEL</li>
              <li>Python — GeeksforGeeks</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Contact */}
      <section id="contact" className="px-6 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-xs font-mono text-primary mb-4">07 — Contact</div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Let's build <span className="text-gradient">something</span>.
          </h2>
          <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
            Open to full-time roles, internships, and freelance collaborations.
            Drop me a line — I reply fast.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <a
              href="mailto:gairuboina.naveenkumar45@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:scale-105 transition glow"
            >
              ✉ gairuboina.naveenkumar45@gmail.com
            </a>
            <a
              href={resumeUrl}
              download="GAIRUBOINA_NAVEEN_KUMAR.pdf"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass font-medium hover:bg-white/5 transition"
            >
              <DownloadIcon /> Download Resume
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Social label="GitHub" href="https://github.com/GAIRUBOINANAVEENKUMAR" />
            <Social label="LinkedIn" href="https://linkedin.com" />
            <Social label="LeetCode" href="https://leetcode.com/u/user4598oX" />
            <Social label="HackerRank" href="https://hackerrank.com/gairuboina_nave1" />
            <Social label="Phone" href="tel:+919059109173" />
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 px-6 py-8 text-center text-sm text-muted-foreground">
        Designed & built by Naveen Kumar · © {new Date().getFullYear()} · Bengaluru, India
      </footer>
    </div>
  );
}

function Section({ id, eyebrow, title, children }: { id?: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <div className="text-xs font-mono text-primary mb-3">{eyebrow}</div>
          <h2 className="text-3xl md:text-5xl font-bold">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div className="text-3xl font-display font-bold text-gradient">{n}</div>
      <div className="text-xs text-muted-foreground mt-1">{l}</div>
    </div>
  );
}

function Social({ label, href }: { label: string; href: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition relative group">
      {label}
      <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all" />
    </a>
  );
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function SpeakerIcon({ active }: { active: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={active ? "text-cyan-300" : ""}>
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      {active && <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />}
      {active && <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />}
    </svg>
  );
}
