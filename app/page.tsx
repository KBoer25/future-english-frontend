"use client";

import { useState } from "react";

type Question = {
  id: number;
  prompt: string;
  imageIllustration?: string;
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
  const [hasEntered, setHasEntered] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"quizzes" | "materials">("quizzes");
  const [selectedLevel, setSelectedLevel] = useState<string>("Kindergarten");
  const [selectedTopic, setSelectedTopic] = useState<string>("Daily Life");
  
  const [activeModuleKey, setActiveModuleKey] = useState<string | null>(null);
  const [activeStudyId, setActiveStudyId] = useState<string | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const levels = ["Kindergarten", "Primary School", "Junior High", "Senior High", "C1 Advanced"];
  
  const getTopicsForLevel = (lvl: string) => {
    if (lvl === "Kindergarten" || lvl === "Primary School") {
      return ["Daily Life", "Social Media", "Academic & Debate"];
    }
    return ["Daily Life", "Social Media", "Job Interviews", "Academic & Debate"];
  };

  const topics = getTopicsForLevel(selectedLevel);

  // Dynamic Quiz generator ensuring 5 batches for every Level + Topic combination
  const getModulesForSelection = () => {
    const list: Record<string, ModuleData> = {};
    const icons = ["🛒", "📱", "💼", "⚖️", "🌟", "📚", "🗺️", "💡", "🎯", "🏛️"];

    levels.forEach((lvl) => {
      const lvlTopics = getTopicsForLevel(lvl);
      lvlTopics.forEach((top, topIdx) => {
        for (let i = 1; i <= 5; i++) {
          const key = `${lvl}-${top}-Quiz${i}`.replace(/\s+/g, "");
          list[key] = {
            title: `${lvl}: Quiz ${i} - ${top} Masterclass`,
            image: icons[(topIdx + i) % icons.length],
            level: lvl,
            category: top,
            source: `${lvl} Certified English Curriculum (Batch ${i})`,
            questions: [
              {
                id: 1,
                prompt: `[${lvl} | ${top}] Question 1: Which core principle best describes effective communication in this scenario?`,
                imageIllustration: "🌟📘💡",
                options: [
                  { label: `Applying clear, context-appropriate vocabulary and rules`, isCorrect: true },
                  { label: `Using ambiguous or misleading phrasing`, isCorrect: false },
                  { label: `Ignoring structural guidelines entirely`, isCorrect: false }
                ],
                explanation: `Precise phrasing and adherence to structured conventions are vital for success in ${top}.`
              },
              {
                id: 2,
                prompt: `[${lvl} | ${top}] Question 2: What is the most appropriate action when executing this task?`,
                imageIllustration: "🎯📝✨",
                options: [
                  { label: `Following standard methodological steps systematically`, isCorrect: true },
                  { label: `Proceeding randomly without an objective`, isCorrect: false },
                  { label: `Disregarding feedback from instructors`, isCorrect: false }
                ],
                explanation: `Systematic execution ensures accurate performance and steady progress.`
              },
              {
                id: 3,
                prompt: `[${lvl} | ${top}] Question 3: Identify the correct grammatical or structural pattern:`,
                imageIllustration: "📚🔍💬",
                options: [
                  { label: `Standardized syntactical form matching official curriculum benchmarks`, isCorrect: true },
                  { label: `Colloquial slang with broken syntax`, isCorrect: false },
                  { label: `Unrelated word pairings`, isCorrect: false }
                ],
                explanation: `Benchmark syntactical forms validate linguistic competence.`
              },
              {
                id: 4,
                prompt: `[${lvl} | ${top}] Question 4: What is the primary objective of mastering this skill?`,
                imageIllustration: "🏆📈⭐",
                options: [
                  { label: `Enhancing practical fluency, accuracy, and confidence`, isCorrect: true },
                  { label: `Memorizing isolated facts without application`, isCorrect: false },
                  { label: `Avoiding practical exercises`, isCorrect: false }
                ],
                explanation: `Practical fluency connects theoretical knowledge to real-world utility.`
              },
              {
                id: 5,
                prompt: `[${lvl} | ${top}] Question 5: Evaluate the outcome of proper implementation:`,
                imageIllustration: "✅🎉👏",
                options: [
                  { label: `Optimized communication and successful resolution`, isCorrect: true },
                  { label: `Persistent operational error`, isCorrect: false },
                  { label: `Incomplete documentation`, isCorrect: false }
                ],
                explanation: `Proper execution consistently yields positive, verified outcomes.`
              }
            ]
          };
        }
      });
    });
    return list;
  };

  const currentQuizModules = getModulesForSelection();

  // STUDY MATERIALS DATABASE
  const studyGuides: StudyMaterial[] = [
    {
      id: "Kindergarten-DailyLife",
      title: "Kindergarten: Daily Life & Phonemic Foundations",
      level: "Kindergarten",
      category: "Daily Life",
      summary: "Verified early childhood literacy framework based on Systematic Synthetic Phonics standards for sound and word recognition.",
      illustration: "🧸🍎✨",
      accentColor: "bg-pink-50 border-pink-100 text-pink-600",
      subTopics: [
        {
          title: "1. Phonemic Awareness & Auditory Discrimination",
          subtitle: "Isolating individual sounds in spoken words",
          explanation: ["Phonemic awareness is purely auditory. Children learn to distinguish individual phonemes inside spoken words before reading print."],
          examples: ["Isolating beginning sounds: 'Sun' starts with /s/", "Segmenting syllables like 'ap-ple'."]
        }
      ]
    }
  ];

  const handleSelectOption = (qId: number, optIdx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const currentModule = activeModuleKey ? currentQuizModules[activeModuleKey] : null;

  const totalQuestions = currentModule ? currentModule.questions.length : 0;
  const answeredCount = currentModule ? Object.keys(selectedAnswers).length : 0;
  const isComplete = totalQuestions > 0 && answeredCount === totalQuestions;
  const correctCount = currentModule
    ? currentModule.questions.reduce((acc, q) => {
        const selectedOpt = selectedAnswers[q.id];
        return selectedOpt !== undefined && q.options[selectedOpt].isCorrect ? acc + 1 : acc;
      }, 0)
    : 0;

  // WELCOME LANDING SCREEN
  if (!hasEntered) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#FAFAFA] via-pink-50/40 to-sky-50/40 text-gray-800 font-sans flex items-center justify-center p-6">
        <div className="max-w-2xl w-full bg-white/80 backdrop-blur-md rounded-3xl p-10 md:p-14 shadow-xl border border-gray-100 text-center relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#E95599]/10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-[#55b1d4]/10 rounded-full blur-2xl"></div>

          <div className="text-6xl mb-6">🚀🌍✨</div>
          
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4 tracking-wide">
            Welcome to <span className="text-[#E95599] font-medium">Future</span><span className="font-bold text-[#55b1d4]">English</span>
          </h1>
          
          <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-lg mx-auto">
            Master interactive quizzes and 3D flashcard study materials tailored from Kindergarten to C1 Advanced. Fun, simple, and practical learning awaits you!
          </p>

          <button
            onClick={() => setHasEntered(true)}
            className="w-full md:w-auto px-10 py-4 bg-gradient-to-r from-[#E95599] to-[#55b1d4] hover:opacity-95 text-white font-bold text-lg rounded-2xl shadow-lg transition transform hover:-translate-y-0.5 cursor-pointer"
          >
            Start Learning Now →
          </button>
        </div>
      </main>
    );
  }

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
            ← Back to Quiz Selection
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
          <p className="text-sm text-gray-500 mb-8">Total Questions: {currentModule.questions.length} (5 Questions in this Batch)</p>

          {isComplete && (
            <div className="mb-12 p-8 rounded-3xl bg-gradient-to-r from-pink-50 via-sky-50 to-amber-50 border-2 border-[#55b1d4]/30 text-center shadow-md">
              <div className="text-5xl mb-3">🎉🏆✨</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Quiz Batch Completed!</h3>
              <p className="text-lg text-gray-700 font-medium mb-4">
                You scored <span className="text-[#E95599] font-bold">{correctCount}</span> out of <span className="font-bold">{totalQuestions}</span> correct!
              </p>
              <button
                onClick={() => setSelectedAnswers({})}
                className="bg-gray-900 hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-2xl transition cursor-pointer text-sm shadow-sm"
              >
                🔄 Retry This Quiz Batch
              </button>
            </div>
          )}

          <div className="space-y-12">
            {currentModule.questions.map((q, qIndex) => {
              const selectedOptIdx = selectedAnswers[q.id];

              return (
                <div key={q.id} className="border-t border-gray-100 pt-8">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold text-[#55b1d4] uppercase tracking-wider block">
                      Question {qIndex + 1} of {currentModule.questions.length}
                    </span>
                    {q.imageIllustration && (
                      <span className="text-3xl bg-gray-50 px-4 py-2 rounded-2xl border border-gray-100 shadow-xs">
                        {q.imageIllustration}
                      </span>
                    )}
                  </div>
                  
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

  // STUDY GUIDE FLASHCARD MODE VIEW
  const currentStudyGuide = activeStudyId ? (() => {
    let guide = studyGuides.find(g => g.id === activeStudyId);
    if (!guide) {
      const [lvl, top] = activeStudyId.split("-");
      guide = {
        id: activeStudyId,
        title: `${lvl || selectedLevel}: Master Guide on ${top || selectedTopic}`,
        level: lvl || selectedLevel,
        category: top || selectedTopic,
        summary: `Comprehensive academic and practical study flashcards designed for students focusing on this topic.`,
        illustration: "⚖️🏛️📝",
        accentColor: "bg-sky-50 border-sky-100 text-sky-600",
        subTopics: [
          {
            title: `1. Core Principles & Concepts`,
            subtitle: "Fundamental rules and terminology",
            explanation: [
              `Mastering this topic requires structured understanding of core rules and terminology.`,
              `Students learn practical applications and standard conventions used in real-world environments.`
            ],
            examples: [`Standardized rule application.`, `Contextual vocabulary usage in everyday scenarios.`]
          }
        ]
      };
    }
    return guide;
  })() : null;

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
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{currentStudyGuide.title}</h2>
          <p className="text-gray-600 text-base mb-8 pb-6 border-b border-gray-100 leading-relaxed">
            {currentStudyGuide.summary}
          </p>

          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">
              Interactive 3D Flashcards (Click any card to flip)
            </h3>
            <span className="text-xs bg-sky-50 text-sky-600 font-semibold px-3 py-1 rounded-full border border-sky-100">
              🔄 Tap to Flip
            </span>
          </div>

          {/* FLASHCARDS STACK */}
          <div className="space-y-8">
            {currentStudyGuide.subTopics.map((sub, idx) => {
              const cardKey = idx;
              const isFlipped = !!flippedCards[cardKey];

              return (
                <div
                  key={idx}
                  onClick={() => setFlippedCards(prev => ({ ...prev, [cardKey]: !isFlipped }))}
                  className="cursor-pointer min-h-[260px] transition transform hover:scale-[1.01]"
                >
                  <div
                    className={`relative w-full rounded-3xl border-2 transition-all duration-300 shadow-md p-8 bg-white flex flex-col justify-between ${
                      isFlipped ? "border-[#55b1d4] bg-sky-50/20" : "border-gray-200 hover:border-[#55b1d4]/60"
                    }`}
                  >
                    {!isFlipped ? (
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <span className="bg-[#55b1d4] text-white w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shadow-xs">
                            {idx + 1}
                          </span>
                          <span className="text-xs font-semibold text-sky-600 bg-sky-50 px-3 py-1 rounded-full">
                            Front (Click to Reveal Back) ➔
                          </span>
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">{sub.title}</h4>
                        <p className="text-base text-gray-600 font-medium">{sub.subtitle}</p>
                      </div>
                    ) : (
                      <div className="space-y-4 animate-fade-in">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-bold text-[#55b1d4] uppercase tracking-wider">
                            Back of Card (Core Explanation & Examples)
                          </span>
                          <span className="text-xs text-gray-400 font-semibold">🔄 Click to Flip Back</span>
                        </div>
                        
                        <div className="space-y-2">
                          {sub.explanation.map((para, pIdx) => (
                            <p key={pIdx} className="text-sm md:text-base text-gray-700 leading-relaxed bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
                              {para}
                            </p>
                          ))}
                        </div>

                        <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-100 space-y-1">
                          <span className="text-xs font-bold text-blue-900 uppercase block mb-1">Practical Examples:</span>
                          {sub.examples.map((ex, eIdx) => (
                            <div key={eIdx} className="text-sm text-blue-950 font-medium flex items-center gap-2">
                              <span className="text-[#55b1d4]">✦</span> {ex}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
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
            📚 Study Materials (3D Flashcards)
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
          Choose your school level and topic category below to explore interactive 3D flashcard study guides and quiz batches.
        </p>

        {/* STEP 1: SELECT SCHOOL LEVEL */}
        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Select School Level</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {levels.map((lvl) => (
              <button
                key={lvl}
                onClick={() => {
                  setSelectedLevel(lvl);
                  const validTopics = getTopicsForLevel(lvl);
                  if (!validTopics.includes(selectedTopic)) {
                    setSelectedTopic(validTopics[0]);
                  }
                }}
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
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Select Topic Category</h3>
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

      {/* TAB 1: PRACTICE QUIZZES (STRICTLY FILTERED BY SELECTED LEVEL & TOPIC) */}
      {activeTab === "quizzes" && (
        <section className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {Object.entries(currentQuizModules)
            .filter(([_, mod]) => mod.level === selectedLevel && mod.category === selectedTopic)
            .map(([key, mod]) => (
              <div
                key={key}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm transition hover:shadow-md flex flex-col justify-between"
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
                  onClick={() => setActiveModuleKey(key)}
                  className="w-full py-3 px-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-[#55b1d4] hover:text-white transition font-semibold text-xs cursor-pointer"
                >
                  Start Quiz (5 Questions) →
                </button>
              </div>
            ))}
        </section>
      )}

      {/* TAB 2: STUDY MATERIALS (DYNAMIC MATCHER GUARANTEED TO MATCH SELECTED LEVEL & TOPIC) */}
      {activeTab === "materials" && (
        <section className="max-w-4xl mx-auto space-y-6">
          {(() => {
            // Build the exact expected ID for the selected combination
            const targetId = `${selectedLevel}-${selectedTopic}`.replace(/\s+/g, "");
            
            // Find in database or auto-generate robust fallback guide
            let matchedGuide = studyGuides.find(g => g.id === targetId || (g.level === selectedLevel && g.category === selectedTopic));

            if (!matchedGuide) {
              matchedGuide = {
                id: targetId,
                title: `${selectedLevel}: Master Guide on ${selectedTopic}`,
                level: selectedLevel,
                category: selectedTopic,
                summary: `Comprehensive academic and practical study flashcards designed for ${selectedLevel} students focusing on ${selectedTopic}.`,
                illustration: selectedTopic === "Daily Life" ? "🛒🌍✨" : selectedTopic === "Social Media" ? "📱💬🛡️" : selectedTopic === "Job Interviews" ? "💼👔📈" : "⚖️🏛️📝",
                accentColor: "bg-sky-50 border-sky-100 text-sky-600",
                subTopics: [
                  {
                    title: `1. Core Principles of ${selectedTopic}`,
                    subtitle: `Fundamental rules and terminology for ${selectedLevel}`,
                    explanation: [
                      `Mastering ${selectedTopic} at the ${selectedLevel} stage requires structured understanding of core rules and terminology.`,
                      `Students learn practical applications and standard conventions used in real-world environments.`
                    ],
                    examples: [`Standardized rule application for ${selectedTopic}.`, `Contextual vocabulary usage in everyday scenarios.`]
                  },
                  {
                    title: `2. Advanced Strategies & Applications`,
                    subtitle: "Practical exercises and structural patterns",
                    explanation: [
                      `Applying theoretical concepts to structured communication and problem-solving.`,
                      `Avoiding common pitfalls and refining your stylistic register.`
                    ],
                    examples: [`Constructing clear, grammatically correct statements.`, `Evaluating structural integrity in formal discourse.`]
                  }
                ]
              };
            }

            return (
              <div
                onClick={() => setActiveStudyId(matchedGuide.id)}
                className="bg-white rounded-3xl border border-gray-200 shadow-sm transition overflow-hidden group flex flex-col md:flex-row items-center hover:border-[#55b1d4] hover:shadow-md cursor-pointer"
              >
                <div className={`w-full md:w-48 h-36 md:h-full flex items-center justify-center text-5xl border-r border-gray-100 ${matchedGuide.accentColor}`}>
                  {matchedGuide.illustration}
                </div>
                <div className="p-8 flex-1">
                  <div className="flex justify-between items-center mb-3">
                    <span className="bg-[#55b1d4]/10 text-[#55b1d4] text-xs font-bold px-3 py-1 rounded-full">
                      {matchedGuide.level}
                    </span>
                    <span className="text-xs text-gray-400 font-medium group-hover:text-[#55b1d4] transition">
                      Open 3D Flashcards 🔄 →
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{matchedGuide.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{matchedGuide.summary}</p>
                </div>
              </div>
            );
          })()}
        </section>
      )}
    </main>
  );
}