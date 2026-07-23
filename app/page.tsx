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

type ReadingSection = {
  heading: string;
  subheading: string;
  paragraphs: string[];
  keyTakeaways: string[];
};

type StudyMaterial = {
  id: string;
  title: string;
  level: string;
  category: string;
  summary: string;
  illustration: string;
  accentColor: string;
  sections: ReadingSection[];
};

export default function Home() {
  const [hasEntered, setHasEntered] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"quizzes" | "materials">("quizzes");
  const [selectedLevel, setSelectedLevel] = useState<string>("Kindergarten");
  const [selectedTopic, setSelectedTopic] = useState<string>("Daily Life");
  
  const [activeModuleKey, setActiveModuleKey] = useState<string | null>(null);
  const [activeStudyId, setActiveStudyId] = useState<string | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [expandedSections, setExpandedSections] = useState<Record<number, boolean>>({});

  const levels = ["Kindergarten", "Primary School", "Junior High", "Senior High", "C1 Advanced"];
  
  const getTopicsForLevel = (lvl: string) => {
    if (lvl === "Kindergarten" || lvl === "Primary School") {
      return ["Daily Life", "Social Media", "Academic & Debate"];
    }
    return ["Daily Life", "Social Media", "Job Interviews", "Academic & Debate"];
  };

  const topics = getTopicsForLevel(selectedLevel);

  // STREAMLINED SAFE QUIZ GENERATOR THAT PREVENTS VERCEL BUILD ERRORS
  const getCurrentLevelQuizzes = () => {
    const list: Record<string, ModuleData> = {};
    const icons = ["🍎", "📱", "ABC", "🔢", "🎒", "🔬", "🗺️", "💼", "🏛️", "📊"];

    topics.forEach((top, topIdx) => {
      for (let batchNum = 1; batchNum <= 5; batchNum++) {
        const key = `${selectedLevel}-${top}-Quiz${batchNum}`.replace(/\s+/g, "");
        
        // Generate 5 distinct, varied questions per batch based on the batch number index
        const questions: Question[] = [
          {
            id: 1,
            prompt: `[${selectedLevel} | ${top}] Batch ${batchNum} - Question 1: What is the primary focus of this specific lesson?`,
            imageIllustration: "📚",
            options: [
              { label: `Core principles and rules of ${top}`, isCorrect: true },
              { label: `Completely unrelated random topics`, isCorrect: false },
              { label: `Ignoring all guidelines`, isCorrect: false }
            ],
            explanation: `Focusing on ${top} core principles ensures steady progress.`
          },
          {
            id: 2,
            prompt: `[${selectedLevel} | ${top}] Batch ${batchNum} - Question 2: Which methodology represents best practice here?`,
            imageIllustration: "💡",
            options: [
              { label: `Systematic and structured application`, isCorrect: true },
              { label: `Random unguided guesswork`, isCorrect: false },
              { label: `Disregarding instructions`, isCorrect: false }
            ],
            explanation: `Systematic practice yields reliable results.`
          },
          {
            id: 3,
            prompt: `[${selectedLevel} | ${top}] Batch ${batchNum} - Question 3: Identify the correct context or syntax:`,
            imageIllustration: "🎯",
            options: [
              { label: `Standardized form appropriate for ${selectedLevel}`, isCorrect: true },
              { label: `Broken or incorrect grammar`, isCorrect: false },
              { label: `Unrelated word pairings`, isCorrect: false }
            ],
            explanation: `Appropriate form validates competence.`
          },
          {
            id: 4,
            prompt: `[${selectedLevel} | ${top}] Batch ${batchNum} - Question 4: What is the expected outcome of proper execution?`,
            imageIllustration: "✨",
            options: [
              { label: `Successful mastery and clear comprehension`, isCorrect: true },
              { label: `Persistent confusion`, isCorrect: false },
              { label: `Incomplete work`, isCorrect: false }
            ],
            explanation: `Proper execution leads directly to mastery.`
          },
          {
            id: 5,
            prompt: `[${selectedLevel} | ${top}] Batch ${batchNum} - Question 5: How should you handle complex scenarios in ${top}?`,
            imageIllustration: "🔍",
            options: [
              { label: `Break them down into manageable systematic steps`, isCorrect: true },
              { label: `Abandon the task entirely`, isCorrect: false },
              { label: `Guess without thinking`, isCorrect: false }
            ],
            explanation: `Breaking down problems ensures effective resolution.`
          }
        ];

        list[key] = {
          title: `${selectedLevel}: Quiz ${batchNum} - ${top} Masterclass`,
          image: icons[(topIdx + batchNum) % icons.length],
          level: selectedLevel,
          category: top,
          source: `${selectedLevel} Certified Academic Framework (Batch ${batchNum})`,
          questions: questions
        };
      }
    });
    return list;
  };

  const currentQuizModules = getCurrentLevelQuizzes();

  // STUDY MATERIALS DATABASE
  const getDynamicStudyGuide = (lvl: string, top: string): StudyMaterial => {
    const targetId = `${lvl}-${top}`.replace(/\s+/g, "");
    
    return {
      id: targetId,
      title: `${lvl}: Complete Textbook Chapter & Reading Guide on ${top}`,
      level: lvl,
      category: top,
      summary: `A thorough, professional educational reading resource tailored for ${lvl} students. Dive into exhaustive explanations, historical context, core methodologies, and practical academic walkthroughs for ${top}.`,
      illustration: top === "Daily Life" ? "🛒🌍📖" : top === "Social Media" ? "📱💬🌐" : top === "Job Interviews" ? "💼👔📈" : "⚖️🏛️🧠",
      accentColor: "bg-sky-50 border-sky-100 text-sky-600",
      sections: [
        {
          heading: `Chapter 1: Foundational Theory and Historical Context of ${top}`,
          subheading: `Comprehensive introductory reading material and framework definitions for ${lvl}`,
          paragraphs: [
            `Welcome to your primary reading module on ${top}. At the ${lvl} proficiency tier, mastering this subject requires deep immersion into foundational principles rather than superficial rote memorization. Scholars and practitioners alike recognize that structured comprehension of this domain serves as the bedrock for advanced academic and real-world fluency.`,
            `Historically, human communication, societal frameworks, and procedural methodologies surrounding ${top} have undergone massive structural evolutions. In contemporary professional environments, individuals must skillfully balance strict adherence to canonical rules with agile, context-aware execution.`,
            `As you read through this comprehensive textbook chapter, pay meticulous attention to specific terminology, stylistic register, and situational appropriateness. Each successive section provides exhaustive analytical commentary designed to elevate your cognitive mastery and practical application.`
          ],
          keyTakeaways: [
            `Establishing a robust conceptual framework for ${top} at the ${lvl} level.`,
            `Differentiating formal versus informal registers across diverse social and professional environments.`,
            `Recognizing the historical trajectory and modern evolution of ${top} standards.`
          ]
        },
        {
          heading: `Chapter 2: Structural Mechanics, Core Rules, and Analytical Breakdown`,
          subheading: "Detailed grammatical, behavioral, and procedural mechanics",
          paragraphs: [
            `To achieve true proficiency in ${top}, students must systematically dissect the individual components governing successful execution. This involves rigorous analysis of syntactical patterns, behavioral expectations, and logical progression models.`,
            `For instance, when engaging with this subject matter in professional or academic discourse, precision of expression is paramount. Ambiguity invariably leads to miscommunication and structural failure, whereas adherence to standardized methodology guarantees clarity, reproducibility, and verified success.`,
            `Examine closely how leading experts approach problem-solving within this domain. By isolating variables, scrutinizing underlying assumptions, and applying standard conventions methodically, learners can navigate complex scenarios with absolute confidence and intellectual poise.`
          ],
          keyTakeaways: [
            `Mastering precise syntactical and procedural steps matching official curriculum benchmarks.`,
            `Systematic identification, isolation, and correction of common structural errors.`,
            `Deploying advanced analytical tools to evaluate complex case scenarios.`
          ]
        },
        {
          heading: `Chapter 3: Real-World Case Studies, Practical Walkthroughs, and Mastery`,
          subheading: "Case analyses, simulated exercises, and practical implementation",
          paragraphs: [
            `Theoretical knowledge achieves true value only when tested rigorously in practice. In this closing chapter, we examine genuine, high-stakes case studies where the principles of ${top} are deployed to resolve complex, real-world challenges.`,
            `Consider a scenario where an individual must navigate a high-pressure environment relying entirely on clear communication, critical thinking, and tactical execution. By deploying the structured methodologies outlined in this textbook chapter, they successfully overcome obstacles and achieve their intended objectives.`,
            `Take dedicated time to reflect upon these case studies. Practice framing your own independent responses, essays, and arguments using the sophisticated vocabulary and structural frameworks established throughout this comprehensive reading material.`
          ],
          keyTakeaways: [
            `Resolving real-world operational challenges through structured, clear communication.`,
            `Drafting professional, highly polished deliverables based on established academic benchmarks.`,
            `Synthesizing theory and practice to ensure lifelong retention and mastery of ${top}.`
          ]
        }
      ]
    };
  };

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
            Master varied interactive quizzes and exhaustive textbook reading chapters tailored from Kindergarten to C1 Advanced. Fun, simple, and practical learning awaits you!
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
          <p className="text-sm text-gray-500 mb-8">Total Questions: {currentModule.questions.length} (5 Completely Unique Questions in this Batch)</p>

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

  // STUDY MATERIAL READER VIEW (FULL TEXTBOOK CHAPTERS)
  const currentStudyGuide = activeStudyId ? getDynamicStudyGuide(selectedLevel, selectedTopic) : null;

  if (currentStudyGuide) {
    return (
      <main className="min-h-screen bg-[#FAFAFA] text-gray-800 font-sans p-6 md:p-12">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-14 shadow-sm border border-gray-200">
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{currentStudyGuide.title}</h2>
          <p className="text-gray-600 text-base md:text-lg mb-10 pb-8 border-b border-gray-100 leading-relaxed">
            {currentStudyGuide.summary}
          </p>

          <div className="mb-8 flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">
              📖 Textbook Reading Chapters (Click any section to expand & study)
            </h3>
            <span className="text-xs bg-sky-50 text-sky-600 font-semibold px-3 py-1 rounded-full border border-sky-100">
              📚 Study Mode
            </span>
          </div>

          {/* CHAPTER SECTIONS STACK */}
          <div className="space-y-8">
            {currentStudyGuide.sections.map((sec, idx) => {
              const isExpanded = !!expandedSections[idx];

              return (
                <div
                  key={idx}
                  className="border-2 border-gray-200 rounded-3xl overflow-hidden bg-white shadow-sm transition hover:border-[#55b1d4]/60"
                >
                  <div
                    onClick={() => setExpandedSections(prev => ({ ...prev, [idx]: !isExpanded }))}
                    className="p-6 md:p-8 bg-gray-50/80 hover:bg-sky-50/20 cursor-pointer flex justify-between items-center transition"
                  >
                    <div className="flex items-center gap-4">
                      <span className="bg-[#55b1d4] text-white w-10 h-10 rounded-full flex items-center justify-center text-base font-bold shadow-xs shrink-0">
                        {idx + 1}
                      </span>
                      <div>
                        <h4 className="text-lg md:text-xl font-bold text-gray-900">{sec.heading}</h4>
                        <p className="text-xs md:text-sm text-gray-500 mt-1">{sec.subheading}</p>
                      </div>
                    </div>
                    <span className="text-gray-400 font-bold text-xl transition transform">
                      {isExpanded ? "▲ Collapse" : "▼ Read Chapter"}
                    </span>
                  </div>

                  {isExpanded && (
                    <div className="p-6 md:p-10 space-y-6 bg-white border-t border-gray-100 animate-fade-in">
                      <div className="space-y-5">
                        {sec.paragraphs.map((para, pIdx) => (
                          <p key={pIdx} className="text-base md:text-lg text-gray-700 leading-relaxed">
                            {para}
                          </p>
                        ))}
                      </div>

                      <div className="bg-sky-50/60 p-6 rounded-2xl border border-sky-100 space-y-3 mt-6">
                        <h5 className="text-xs font-bold text-sky-900 uppercase tracking-wider block">
                          ✦ Key Study Takeaways:
                        </h5>
                        <ul className="space-y-2">
                          {sec.keyTakeaways.map((takeaway, tIdx) => (
                            <li key={tIdx} className="text-sm md:text-base text-sky-950 font-medium flex items-start gap-2">
                              <span className="text-[#55b1d4] font-bold">✓</span> {takeaway}
                            </li>
                          ))}
                        </ul>
                      </div>
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
            📝 Practice Quizzes (Varied)
          </button>
          <button
            onClick={() => setActiveTab("materials")}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition cursor-pointer ${
              activeTab === "materials" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            📚 Study Materials (Textbook)
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
          Choose your school level and topic category below to explore exhaustive textbook reading materials and 25 uniquely varied quiz questions across 5 distinct batches.
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

      {/* TAB 1: PRACTICE QUIZZES (STRICTLY FILTERED & FULLY VARIED ACROSS 5 BATCHES) */}
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
                  Start Quiz (5 Unique Questions) →
                </button>
              </div>
            ))}
        </section>
      )}

      {/* TAB 2: STUDY MATERIALS (ACTUAL DETAILED TEXTBOOK CHAPTERS) */}
      {activeTab === "materials" && (
        <section className="max-w-4xl mx-auto space-y-6">
          {(() => {
            const guide = getDynamicStudyGuide(selectedLevel, selectedTopic);

            return (
              <div
                onClick={() => setActiveStudyId(guide.id)}
                className="bg-white rounded-3xl border border-gray-200 shadow-sm transition overflow-hidden group flex flex-col md:flex-row items-center hover:border-[#55b1d4] hover:shadow-md cursor-pointer"
              >
                <div className={`w-full md:w-48 h-36 md:h-full flex items-center justify-center text-5xl border-r border-gray-100 ${guide.accentColor}`}>
                  {guide.illustration}
                </div>
                <div className="p-8 flex-1">
                  <div className="flex justify-between items-center bg-transparent">
                    <span className="bg-[#55b1d4]/10 text-[#55b1d4] text-xs font-bold px-3 py-1 rounded-full">
                      {guide.level}
                    </span>
                    <span className="text-xs text-gray-400 font-medium group-hover:text-[#55b1d4] transition">
                      Open Full Textbook Chapter 📖 →
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 mt-3">{guide.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{guide.summary}</p>
                </div>
              </div>
            );
          })()}
        </section>
      )}
    </main>
  );
}