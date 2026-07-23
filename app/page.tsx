"use client";

import { useState } from "react";

type Question = {
  id: number;
  prompt: string;
  options: { label: string; isCorrect: boolean }[];
  explanation: string;
};

type ModuleData = {
  title: string;
  image: string;
  level: string;
  category: string;
  source: string;
  questions: Question[];
};

type SubTopic = {
  title: string;
  subtitle: string;
  explanation: string[];
  examples: string[];
};

type StudyMaterial = {
  id: string;
  title: string;
  level: string;
  category: string;
  summary: string;
  illustration: string;
  accentColor: string;
  subTopics: SubTopic[];
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<"quizzes" | "materials">("quizzes");
  const [selectedLevel, setSelectedLevel] = useState<string>("All Levels");
  const [selectedTopic, setSelectedTopic] = useState<string>("All");
  
  const [activeModuleKey, setActiveModuleKey] = useState<string | null>(null);
  const [activeStudyId, setActiveStudyId] = useState<string | null>(null);
  const [activeSubTopic, setActiveSubTopic] = useState<SubTopic | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});

  const levels = ["All Levels", "Kindergarten", "Primary School", "Junior High", "Senior High", "C1 Advanced"];
  const topics = ["All", "Daily Life", "Social Media", "Job Interviews", "Academic & Debate"];

  // Expanded Quiz Data Bank featuring robust multiple questions per module across all levels and categories
  const quizDataBank: Record<string, ModuleData> = {
    // --- KINDERGARTEN / DAILY LIFE ---
    "K-Daily-1": {
      title: "Kindergarten: Grocery Shopping & Fruits",
      image: "🛒",
      level: "Kindergarten",
      category: "Daily Life",
      source: "Early Childhood Phonics & Vocab",
      questions: [
        {
          id: 1,
          prompt: "Which fruit is red and starts with the letter 'A'?",
          options: [{ label: "Apple", isCorrect: true }, { label: "Banana", isCorrect: false }, { label: "Grape", isCorrect: false }],
          explanation: "Apples are red/green and begin with the short /æ/ sound."
        },
        {
          id: 2,
          prompt: "What sound does a cow make when you see it on a farm?",
          options: [{ label: "Moo", isCorrect: true }, { label: "Quack", isCorrect: false }, { label: "Woof", isCorrect: false }],
          explanation: "Cows produce a distinct 'moo' sound."
        },
        {
          id: 3,
          prompt: "What color is a fresh banana?",
          options: [{ label: "Yellow", isCorrect: true }, { label: "Blue", isCorrect: false }, { label: "Black", isCorrect: false }],
          explanation: "Ripe bananas are bright yellow."
        },
        {
          id: 4,
          prompt: "Where do we buy milk and bread?",
          options: [{ label: "Supermarket", isCorrect: true }, { label: "Library", isCorrect: false }, { label: "Hospital", isCorrect: false }],
          explanation: "Supermarkets stock daily groceries like bread and milk."
        },
        {
          id: 5,
          prompt: "Which animal says 'Meow'?",
          options: [{ label: "Cat", isCorrect: true }, { label: "Dog", isCorrect: false }, { label: "Duck", isCorrect: false }],
          explanation: "Cats make a purring and meowing sound."
        }
      ]
    },

    // --- PRIMARY / SOCIAL MEDIA & DAILY LIFE ---
    "P-Social-1": {
      title: "Primary School: Safe Digital Sharing & Messages",
      image: "📱",
      level: "Primary School",
      category: "Social Media",
      source: "Elementary Digital Citizenship",
      questions: [
        {
          id: 1,
          prompt: "Is it safe to share your home address with online strangers?",
          options: [{ label: "No, never share personal information", isCorrect: true }, { label: "Yes, to make friends", isCorrect: false }],
          explanation: "Protecting personal privacy is essential online."
        },
        {
          id: 2,
          prompt: "What is a polite way to greet a teacher in an online chat?",
          options: [{ label: "Hello Teacher, good morning!", isCorrect: true }, { label: "Yo what's up", isCorrect: false }],
          explanation: "Polite greetings show respect in academic settings."
        },
        {
          id: 3,
          prompt: "What should you do if someone is mean to you in a game chat?",
          options: [{ label: "Tell a parent or trusted adult", isCorrect: true }, { label: "Be mean back", isCorrect: false }],
          explanation: "Always report cyberbullying to adults."
        },
        {
          id: 4,
          prompt: "What does 'like' mean on a photo post?",
          options: [{ label: "Showing appreciation or approval", isCorrect: true }, { label: "Deleting the image", isCorrect: false }],
          explanation: "Likes express positive feedback on content."
        },
        {
          id: 5,
          prompt: "How long is a healthy amount of screen time for kids daily?",
          options: [{ label: "A balanced, limited amount", isCorrect: true }, { label: "24 hours straight", isCorrect: false }],
          explanation: "Balance prevents digital eye strain and fatigue."
        }
      ]
    },

    // --- JUNIOR HIGH / JOB INTERVIEWS ---
    "JH-Jobs-1": {
      title: "Junior High: Part-Time Jobs & Polite Requests",
      image: "💼",
      level: "Junior High",
      category: "Job Interviews",
      source: "B1 Career Foundations",
      questions: [
        {
          id: 1,
          prompt: "Which phrase is best when introducing yourself to an employer?",
          options: [
            { label: "Hello, my name is Alex and I am eager to learn.", isCorrect: true },
            { label: "Give me the job right now.", isCorrect: false }
          ],
          explanation: "Polite enthusiasm builds strong first impressions."
        },
        {
          id: 2,
          prompt: "What does 'punctual' mean?",
          options: [{ label: "Arriving on time", isCorrect: true }, { label: "Being late", isCorrect: false }],
          explanation: "Punctuality is a core professional requirement."
        },
        {
          id: 3,
          prompt: "Why do interviewers ask about your strengths?",
          options: [{ label: "To see what unique value you bring", isCorrect: true }, { label: "To waste time", isCorrect: false }],
          explanation: "Strengths highlight your qualifications."
        },
        {
          id: 4,
          prompt: "What is a resume used for?",
          options: [{ label: "Summarizing work history and skills", isCorrect: true }, { label: "Drawing pictures", isCorrect: false }],
          explanation: "Resumes present professional experience to recruiters."
        },
        {
          id: 5,
          prompt: "How should you dress for a formal interview?",
          options: [{ label: "Neat, clean business casual or formal attire", isCorrect: true }, { label: "Pajamas", isCorrect: false }],
          explanation: "Professional dress code reflects respect for the company."
        }
      ]
    },

    // --- SENIOR HIGH / ACADEMIC & DEBATE ---
    "SH-Academic-1": {
      title: "Senior High: Structured Debates & Persuasion",
      image: "⚖️",
      level: "Senior High",
      category: "Academic & Debate",
      source: "B2 Discursive Speech Standard",
      questions: [
        {
          id: 1,
          prompt: "What is the purpose of a thesis statement in a debate?",
          options: [
            { label: "To state your core argument clearly", isCorrect: true },
            { label: "To tell a joke", isCorrect: false }
          ],
          explanation: "A thesis anchors the entire argumentation line."
        },
        {
          id: 2,
          prompt: "Which connector signals a contrasting point?",
          options: [{ label: "However", isCorrect: true }, { label: "Furthermore", isCorrect: false }],
          explanation: "'However' introduces contrasting evidence."
        },
        {
          id: 3,
          prompt: "Why use empirical evidence in a debate?",
          options: [{ label: "To support claims with verified facts", isCorrect: true }, { label: "To confuse the audience", isCorrect: false }],
          explanation: "Facts validate academic arguments."
        },
        {
          id: 4,
          prompt: "What is a rebuttal?",
          options: [{ label: "Addressing and disproving opponent claims", isCorrect: true }, { label: "Agreeing with everything", isCorrect: false }],
          explanation: "Rebuttals counter opposition points."
        },
        {
          id: 5,
          prompt: "How should a formal debate speech conclude?",
          options: [{ label: "With a strong summary of main points", isCorrect: true }, { label: "By walking away silently", isCorrect: false }],
          explanation: "Conclusions reinforce lasting impressions."
        }
      ]
    },

    // --- C1 ADVANCED / ACADEMIC & JOB INTERVIEWS ---
    "C1-Jobs-1": {
      title: "C1 Advanced: Executive Interviews & Leadership",
      image: "🏛️",
      level: "C1 Advanced",
      category: "Job Interviews",
      source: "CAE Professional Corpus",
      questions: [
        {
          id: 1,
          prompt: "Which response demonstrates superior executive communication?",
          options: [
            { label: "By streamlining operational workflows, we reduced overhead by 30%.", isCorrect: true },
            { label: "We did some stuff and saved money.", isCorrect: false }
          ],
          explanation: "Executive communication requires precise, metrics-driven phrasing."
        },
        {
          id: 2,
          prompt: "What does 'stakeholder alignment' mean in corporate settings?",
          options: [
            { label: "Ensuring all interested parties share mutual goals", isCorrect: true },
            { label: "Parking cars in a row", isCorrect: false }],
          explanation: "Stakeholder alignment synchronizes team objectives."
        },
        {
          id: 3,
          prompt: "How do you handle a critical stakeholder objection?",
          options: [
            { label: "Acknowledge concerns constructively with data-backed solutions", isCorrect: true },
            { label: "Ignore them completely", isCorrect: false }],
          explanation: "Diplomatic mitigation resolves high-stakes friction."
        },
        {
          id: 4,
          prompt: "What is strategic foresight?",
          options: [
            { label: "Anticipating long-term industry shifts and adapting proactively", isCorrect: true },
            { label: "Guessing tomorrow's weather", isCorrect: false }],
          explanation: "Foresight drives visionary leadership."
        },
        {
          id: 5,
          prompt: "Which idiom describes taking charge during a crisis?",
          options: [
            { label: "Stepping up to the plate / Taking the helm", isCorrect: true },
            { label: "Beating around the bush", isCorrect: false }],
          explanation: "Taking the helm signifies proactive crisis leadership."
        }
      ]
    }
  };

  // Expanded Study Materials matching all levels and categories
  const studyGuides: StudyMaterial[] = [
    {
      id: "guide-k-daily",
      title: "Kindergarten: Daily Life & Basic Vocabulary",
      level: "Kindergarten",
      category: "Daily Life",
      summary: "Foundational phonics, colors, fruits, and family greetings for young learners.",
      illustration: "🧸🍎✨",
      accentColor: "bg-pink-50 border-pink-100 text-pink-600",
      subTopics: [
        {
          title: "1. Phonemic Alphabet Recognition",
          subtitle: "Matching sounds to everyday objects",
          explanation: ["Children learn initial sounds using visual flashcards.", "Apples, balls, and cats form the baseline phonetic set."],
          examples: ["/æ/ for Apple", "/b/ for Ball"]
        }
      ]
    },
    {
      id: "guide-p-social",
      title: "Primary School: Safe Social Media & Etiquette",
      level: "Primary School",
      category: "Social Media",
      summary: "Understanding kind online communication and digital safety rules.",
      illustration: "📱💬🛡️",
      accentColor: "bg-green-50 border-green-100 text-green-600",
      subTopics: [
        {
          title: "1. Respectful Chatting Online",
          subtitle: "Using polite words in virtual spaces",
          explanation: ["Treating others online with the same kindness as in person.", "Reporting inappropriate content immediately."],
          examples: ["Saying 'Please' and 'Thank you' in game lobbies."]
        }
      ]
    },
    {
      id: "guide-jh-jobs",
      title: "Junior High: Introduction to Job Interviews",
      level: "Junior High",
      category: "Job Interviews",
      summary: "Basic preparation for part-time student roles and teamwork skills.",
      illustration: "💼🤝📈",
      accentColor: "bg-sky-50 border-sky-100 text-sky-600",
      subTopics: [
        {
          title: "1. First Impressions & Punctuality",
          subtitle: "Why arriving on time matters",
          explanation: ["Punctuality builds trust with employers.", "Dressing neatly reflects professional commitment."],
          examples: ["Arriving 10 minutes prior to scheduled meetings."]
        }
      ]
    },
    {
      id: "guide-sh-academic",
      title: "Senior High: Academic Debate & Argumentation",
      level: "Senior High",
      category: "Academic & Debate",
      summary: "Structuring persuasive speeches, counter-arguments, and formal essays.",
      illustration: "⚖️🏛️📝",
      accentColor: "bg-purple-50 border-purple-100 text-purple-600",
      subTopics: [
        {
          title: "1. Thesis Development",
          subtitle: "Drafting clear argumentative hooks",
          explanation: ["A thesis statement guides your entire essay structure.", "Clear supporting points make debates compelling."],
          examples: ["'While renewable energy is costly, its long-term environmental yield is vital.'"]
        }
      ]
    },
    {
      id: "guide-c1-jobs",
      title: "C1 Advanced: Executive Leadership & Corporate Interviews",
      level: "C1 Advanced",
      category: "Job Interviews",
      summary: "Advanced metrics-driven storytelling and high-level stakeholder management.",
      illustration: "🏛️📊🎯",
      accentColor: "bg-amber-50 border-amber-100 text-amber-600",
      subTopics: [
        {
          title: "1. Metrics-Driven Elevator Pitches",
          subtitle: "Demonstrating ROI and strategic impact",
          explanation: ["Using quantifiable achievements to prove leadership value.", "Addressing complex corporate objections with composure."],
          examples: ["'Spearheaded global restructuring, yielding a 35% margin increase.'"]
        }
      ]
    }
  ];

  const handleSelectOption = (qId: number, optIdx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const currentModule = activeModuleKey ? quizDataBank[activeModuleKey] : null;
  const currentStudyGuide = activeStudyId ? studyGuides.find(g => g.id === activeStudyId) : null;

  // QUIZ PAGE VIEW
  if (currentModule) {
    return (
      <main className="min-h-screen bg-[#FAFAFA] text-gray-800 font-sans p-6 md:p-12">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-200">
          <button
            onClick={() => {
              setActiveModuleKey(null);
              setSelectedAnswers({});
            }}
            className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition mb-8 cursor-pointer"
          >
            ← Back to Main Menu
          </button>

          <div className="flex flex-wrap gap-2 mb-6">
            <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">
              {currentModule.level}
            </span>
            <span className="bg-[#55b1d4]/10 text-[#55b1d4] text-xs font-semibold px-3 py-1 rounded-full">
              {currentModule.category}
            </span>
          </div>

          <div className="text-6xl mb-4">{currentModule.image}</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{currentModule.title}</h2>
          <p className="text-sm text-gray-500 mb-8">Total Questions: {currentModule.questions.length}</p>

          <div className="space-y-10">
            {currentModule.questions.map((q, qIndex) => {
              const selectedOptIdx = selectedAnswers[q.id];

              return (
                <div key={q.id} className="border-t border-gray-100 pt-8">
                  <span className="text-xs font-bold text-[#55b1d4] uppercase tracking-wider block mb-2">
                    Question {qIndex + 1} of {currentModule.questions.length}
                  </span>
                  
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 text-gray-800 font-medium mb-6 whitespace-pre-line leading-relaxed">
                    {q.prompt}
                  </div>

                  <div className="space-y-3 mb-4">
                    {q.options.map((opt, optIdx) => {
                      let btnStyle = "bg-white border-gray-200 text-gray-700 hover:border-[#55b1d4] hover:bg-[#55b1d4]/5";

                      if (selectedOptIdx !== undefined) {
                        if (optIdx === selectedOptIdx) {
                          btnStyle = opt.isCorrect
                            ? "bg-green-500 text-white border-green-500 shadow-md"
                            : "bg-red-500 text-white border-red-500 shadow-md";
                        } else if (opt.isCorrect) {
                          btnStyle = "bg-green-100 border-green-400 text-green-800";
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={selectedOptIdx !== undefined}
                          onClick={() => handleSelectOption(q.id, optIdx)}
                          className={`w-full py-4 px-6 rounded-2xl border-2 transition text-left text-base font-semibold cursor-pointer ${btnStyle}`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>

                  {selectedOptIdx !== undefined && (
                    <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-100 text-sm text-blue-900 leading-relaxed">
                      <span className="font-bold text-blue-950 block mb-1">Explanation:</span>
                      {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>
    );
  }

  // STUDY SUB-TOPIC VIEW
  if (activeSubTopic) {
    return (
      <main className="min-h-screen bg-[#FAFAFA] text-gray-800 font-sans p-6 md:p-12">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-200">
          <button
            onClick={() => setActiveSubTopic(null)}
            className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition mb-8 cursor-pointer"
          >
            ← Back to Study Guide
          </button>

          <span className="bg-[#55b1d4]/10 text-[#55b1d4] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Detailed Learning & Explanation
          </span>
          <h2 className="text-3xl font-bold text-gray-900 mt-4 mb-2">{activeSubTopic.title}</h2>
          <p className="text-gray-500 text-sm mb-8 pb-6 border-b border-gray-100">{activeSubTopic.subtitle}</p>

          <div className="space-y-6 mb-10">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">Core Concepts & Rules</h3>
            {activeSubTopic.explanation.map((para, idx) => (
              <p key={idx} className="text-base text-gray-700 leading-relaxed bg-gray-50 p-5 rounded-2xl border border-gray-100">
                {para}
              </p>
            ))}
          </div>

          <div className="space-y-4 mb-10">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">Practical Examples</h3>
            <div className="bg-blue-50/60 p-6 rounded-2xl border border-blue-100 space-y-2">
              {activeSubTopic.examples.map((ex, idx) => (
                <div key={idx} className="text-sm md:text-base text-blue-950 font-medium flex items-center gap-2">
                  <span className="text-[#55b1d4]">✦</span> {ex}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setActiveSubTopic(null)}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 rounded-2xl transition cursor-pointer"
          >
            ✓ Done Learning This Topic (Return to Guide)
          </button>
        </div>
      </main>
    );
  }

  // STUDY GUIDE OVERVIEW VIEW
  if (currentStudyGuide) {
    return (
      <main className="min-h-screen bg-[#FAFAFA] text-gray-800 font-sans p-6 md:p-12">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-200">
          <button
            onClick={() => setActiveStudyId(null)}
            className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition mb-8 cursor-pointer"
          >
            ← Back to Materials List
          </button>

          <div className="flex justify-between items-center mb-6">
            <span className="bg-[#55b1d4]/10 text-[#55b1d4] text-xs font-bold px-3 py-1 rounded-full">
              {currentStudyGuide.level}
            </span>
            <span className="text-xs text-gray-400 font-medium">{currentStudyGuide.category}</span>
          </div>

          <div className="text-5xl mb-4">{currentStudyGuide.illustration}</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{currentStudyGuide.title}</h2>
          <p className="text-gray-600 text-base mb-8 pb-6 border-b border-gray-100 leading-relaxed">
            {currentStudyGuide.summary}
          </p>

          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-2">
              Click any topic below to open detailed explanations:
            </h3>
            {currentStudyGuide.subTopics.map((sub, idx) => (
              <div
                key={idx}
                onClick={() => setActiveSubTopic(sub)}
                className="bg-white hover:bg-sky-50/40 p-6 rounded-2xl border-2 border-gray-100 hover:border-[#55b1d4] transition flex items-center justify-between cursor-pointer group shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <span className="bg-[#55b1d4] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="text-base font-bold text-gray-900 group-hover:text-[#55b1d4] transition">
                      {sub.title}
                    </h4>
                    <p className="text-xs md:text-sm text-gray-500 mt-1">{sub.subtitle}</p>
                  </div>
                </div>
                <span className="text-gray-300 group-hover:text-[#55b1d4] font-bold text-lg transition">→</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  // MAIN DASHBOARD HOMEPAGE
  return (
    <main className="min-h-screen bg-[#FAFAFA] text-gray-800 font-sans p-8 relative">
      <nav className="max-w-6xl mx-auto flex justify-between items-center py-4 mb-6">
        <h1 className="text-3xl font-light text-[#E95599] tracking-wide">
          Future<span className="font-bold text-[#55b1d4]">English</span>
        </h1>
        
        <div className="bg-gray-200 p-1 rounded-full flex gap-1">
          <button
            onClick={() => setActiveTab("quizzes")}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition cursor-pointer ${
              activeTab === "quizzes" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            📝 Practice Quizzes
          </button>
          <button
            onClick={() => setActiveTab("materials")}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition cursor-pointer ${
              activeTab === "materials" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            📚 Study Materials
          </button>
        </div>
      </nav>

      <section className="max-w-4xl mx-auto text-center my-10">
        <h2 className="text-5xl font-light text-gray-900 mb-6 leading-tight">
          Learn English <span className="text-[#E95599] font-normal">Fun</span>,{" "}
          <span className="text-[#55b1d4] font-normal">Simple</span>, &{" "}
          <span className="text-[#f2b705] font-normal">Practical</span>
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Choose your school level first, then filter by category to explore interactive quizzes and comprehensive study materials.
        </p>

        {/* STEP 1: SELECT SCHOOL LEVEL */}
        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Select School Level</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {levels.map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition cursor-pointer ${
                  selectedLevel === lvl
                    ? "bg-[#55b1d4] text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-gray-400"
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* STEP 2: SELECT CATEGORY FILTER */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Select Category</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition cursor-pointer ${
                  selectedTopic === topic
                    ? "bg-gray-900 text-white shadow-md"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-gray-400"
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* TAB 1: PRACTICE QUIZZES */}
      {activeTab === "quizzes" && (
        <section className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {Object.entries(quizDataBank).map(([key, mod]) => {
            const matchesLevel = selectedLevel === "All Levels" || mod.level === selectedLevel;
            const matchesTopic = selectedTopic === "All" || mod.category === selectedTopic;
            const isMatch = matchesLevel && matchesTopic;

            return (
              <div
                key={key}
                className={`bg-white p-6 rounded-2xl border border-gray-100 shadow-sm transition flex flex-col justify-between ${
                  isMatch ? "opacity-100 hover:shadow-md" : "opacity-20 pointer-events-none"
                }`}
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="bg-[#55b1d4]/10 text-[#55b1d4] text-xs font-semibold px-3 py-1 rounded-full">
                      {mod.category}
                    </span>
                    <span className="text-2xl">{mod.image}</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wider block mb-1">{mod.level}</span>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{mod.title}</h3>
                  <p className="text-xs text-gray-500 mb-6 font-medium">Source: {mod.source}</p>
                </div>
                <button
                  onClick={() => isMatch && setActiveModuleKey(key)}
                  className="w-full py-3 px-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-[#55b1d4] hover:text-white transition font-semibold text-xs cursor-pointer"
                >
                  Start Quiz ({mod.questions.length} Questions) →
                </button>
              </div>
            );
          })}
        </section>
      )}

      {/* TAB 2: STUDY MATERIALS */}
      {activeTab === "materials" && (
        <section className="max-w-4xl mx-auto space-y-6">
          {studyGuides.map((guide) => {
            const matchesLevel = selectedLevel === "All Levels" || guide.level === selectedLevel;
            const matchesTopic = selectedTopic === "All" || guide.category === selectedTopic;
            const isMatch = matchesLevel && matchesTopic;

            return (
              <div
                key={guide.id}
                onClick={() => isMatch && setActiveStudyId(guide.id)}
                className={`bg-white rounded-3xl border border-gray-200 shadow-sm transition overflow-hidden group flex flex-col md:flex-row items-center ${
                  isMatch ? "opacity-100 hover:border-[#55b1d4] hover:shadow-md cursor-pointer" : "opacity-20 pointer-events-none"
                }`}
              >
                <div className={`w-full md:w-48 h-36 md:h-full flex items-center justify-center text-5xl border-r border-gray-100 ${guide.accentColor}`}>
                  {guide.illustration}
                </div>
                <div className="p-8 flex-1">
                  <div className="flex justify-between items-center mb-3">
                    <span className="bg-[#55b1d4]/10 text-[#55b1d4] text-xs font-bold px-3 py-1 rounded-full">
                      {guide.level}
                    </span>
                    <span className="text-xs text-gray-400 font-medium group-hover:text-[#55b1d4] transition">
                      Explore Study Topics →
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{guide.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{guide.summary}</p>
                </div>
              </div>
            );
          })}
        </section>
      )}
    </main>
  );
}