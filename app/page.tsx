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
  category: string;
  source: string;
  questions: Question[];
};

type StudyMaterial = {
  title: string;
  level: string;
  category: string;
  summary: string;
  content: string[];
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<"quizzes" | "materials">("quizzes");
  const [activeModuleKey, setActiveModuleKey] = useState<string | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [selectedTopic, setSelectedTopic] = useState<string>("All");

  const topics = ["All", "Daily Life", "Social Media", "Job Interviews", "Academic & Debate"];

  // Quiz Materials
  const materials: Record<string, ModuleData> = {
    "Kindergarten-Reading": {
      title: "Kindergarten: Weather & Basic Words",
      image: "☀️",
      category: "Daily Life",
      source: "Basic EFL Standard",
      questions: [
        {
          id: 1,
          prompt: "Look at the picture ☀️. What is the weather like today?",
          options: [
            { label: "It is Sunny", isCorrect: true },
            { label: "It is Rainy", isCorrect: false },
            { label: "It is Cold", isCorrect: false },
          ],
          explanation: "The sun icon ☀️ means it is Sunny!",
        },
      ],
    },
    "Junior High-Reading": {
      title: "Junior High: Cambridge B1 Reading Comprehension",
      image: "📱",
      category: "Social Media",
      source: "Cambridge Assessment English (PET)",
      questions: [
        {
          id: 1,
          prompt: 'Message from Stefan: "We\'re outside the cinema. Text if you\'re going to be late..." What should Peter do?',
          options: [
            { label: "Let Stefan know if he is delayed", isCorrect: true },
            { label: "Tell Stefan which film he wants to watch", isCorrect: false },
            { label: "Wait for Stefan inside the cinema", isCorrect: false },
          ],
          explanation: "Stefan explicitly asks Peter to text if he will be late so they can adjust plans.",
        },
      ],
    },
    "Advanced-Reading": {
      title: "C1 Advanced: Reading & Use of English",
      image: "📖",
      category: "Academic & Debate",
      source: "Cambridge Certificate in Advanced English (CAE)",
      questions: [
        {
          id: 1,
          prompt: 'Part 1 Multiple Choice Cloze (Girls & Technology): "That is the _____ from Britain\'s foremost female engineers."',
          options: [
            { label: "instruction", isCorrect: false },
            { label: "information", isCorrect: false },
            { label: "opinion", isCorrect: false },
            { label: "advice", isCorrect: true },
          ],
          explanation: "Official Cambridge Answer: 'advice' is the correct collocate used in this context.",
        },
      ],
    },
  };

  // Study Materials / Reference Guide Data
  const studyGuides: StudyMaterial[] = [
    {
      title: "C1 Advanced: Word Formation Patterns",
      level: "C1 Advanced",
      category: "Academic & Debate",
      summary: "Mastering prefixes, suffixes, and internal root changes for CAE Part 3.",
      content: [
        "Root -> Noun: FOUND ➔ FOUNDER / FOUNDATION",
        "Root -> Adjective: INFLUENCE ➔ INFLUENTIAL",
        "Negative Prefixes: Use un-, dis-, ir-, or mis- (e.g., RELIABLE ➔ UNRELIABLE).",
        "Always check whether a plural noun is required at the end of the line."
      ]
    },
    {
      title: "B1 Preliminary: Key Prepositions of Time & Place",
      level: "Junior High (B1)",
      category: "Daily Life",
      summary: "Quick rules for using IN, ON, and AT correctly.",
      content: [
        "AT: Specific times (at 5 PM) and exact locations (at the door).",
        "ON: Days of the week (on Monday) and surfaces (on the table).",
        "IN: Months, years, centuries, and larger spaces (in London, in July)."
      ]
    },
    {
      title: "Kindergarten: Daily Sight Words",
      level: "Kindergarten",
      category: "Daily Life",
      summary: "Foundational vocabulary for early learners.",
      content: [
        "Greetings: Good morning, hello, goodbye, good night.",
        "Weather: Sunny, rainy, cloudy, windy, cold, hot.",
        "Colors & Objects: Apple (A-P-P-L-E), Pencil (P-E-N-C-I-L)."
      ]
    }
  ];

  const handleSelectOption = (qId: number, optIdx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const currentModule = activeModuleKey ? materials[activeModuleKey] : null;

  // FOCUSED MODULE VIEW
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
              {currentModule.category}
            </span>
            <span className="bg-[#55b1d4]/10 text-[#55b1d4] text-xs font-semibold px-3 py-1 rounded-full">
              {currentModule.source}
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
                      <span className="font-bold text-blue-950 block mb-1">Source Explanation:</span>
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

  // MAIN HOMEPAGE VIEW WITH TABS (Quizzes vs Study Materials)
  return (
    <main className="min-h-screen bg-[#FAFAFA] text-gray-800 font-sans p-8 relative">
      {/* Navigation Header */}
      <nav className="max-w-6xl mx-auto flex justify-between items-center py-4 mb-6">
        <h1 className="text-3xl font-light text-[#E95599] tracking-wide">
          Future<span className="font-bold text-[#55b1d4]">English</span>
        </h1>
        
        {/* Top Tab Switcher */}
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

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto text-center my-10">
        <h2 className="text-5xl font-light text-gray-900 mb-6 leading-tight">
          Learn English <span className="text-[#E95599] font-normal">Fun</span>,{" "}
          <span className="text-[#55b1d4] font-normal">Simple</span>, &{" "}
          <span className="text-[#f2b705] font-normal">Practical</span>
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          {activeTab === "quizzes"
            ? "Test your skills with authentic Cambridge practice materials and interactive modules."
            : "Explore core grammar rules, vocabulary lists, and exam strategy cheat sheets."}
        </p>

        {activeTab === "quizzes" && (
          <div className="flex flex-wrap justify-center gap-2 mb-12">
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
        )}
      </section>

      {/* TAB 1: PRACTICE QUIZZES GRID */}
      {activeTab === "quizzes" && (
        <section className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {/* Kindergarten */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
            <span className="inline-block bg-[#E95599]/10 text-[#E95599] text-xs font-semibold px-3 py-1 rounded-full mb-4">
              KINDERGARTEN
            </span>
            <h3 className="text-xl font-medium text-gray-800 mb-2">Vocabulary Basics</h3>
            <p className="text-sm text-gray-500 mb-6">Food, weather, animals, and daily greetings with fun visuals.</p>
            <div className="grid grid-cols-2 gap-2 text-center text-xs text-gray-600">
              {["Reading", "Writing", "Listening", "Speaking"].map((skill) => {
                const key = `Kindergarten-${skill}`;
                const item = materials[key];
                return (
                  <button
                    key={skill}
                    onClick={() => item && setActiveModuleKey(key)}
                    className={`p-2 rounded-lg border transition font-medium ${
                      item ? "bg-gray-50 hover:bg-[#E95599] hover:text-white border-gray-200 cursor-pointer" : "opacity-30 border-dashed border-gray-200 cursor-not-allowed"
                    }`}
                  >
                    {skill} {item ? `(${item.questions.length})` : ""}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Junior High */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
            <span className="inline-block bg-[#55b1d4]/10 text-[#55b1d4] text-xs font-semibold px-3 py-1 rounded-full mb-4">
              JUNIOR HIGH (B1)
            </span>
            <h3 className="text-xl font-medium text-gray-800 mb-2">Cambridge B1 Materials</h3>
            <p className="text-sm text-gray-500 mb-6">Verified Cambridge English PET reading, writing, and interview dialogs.</p>
            <div className="grid grid-cols-2 gap-2 text-center text-xs text-gray-600">
              {["Reading", "Writing", "Listening", "Speaking"].map((skill) => {
                const key = `Junior High-${skill}`;
                const item = materials[key];
                return (
                  <button
                    key={skill}
                    onClick={() => item && setActiveModuleKey(key)}
                    className={`p-2 rounded-lg border transition font-medium ${
                      item ? "bg-gray-50 hover:bg-[#55b1d4] hover:text-white border-gray-200 cursor-pointer" : "opacity-30 border-dashed border-gray-200 cursor-not-allowed"
                    }`}
                  >
                    {skill} {item ? `(${item.questions.length})` : ""}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Advanced */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
            <span className="inline-block bg-[#f2b705]/10 text-[#f2b705] text-xs font-semibold px-3 py-1 rounded-full mb-4">
              C1 ADVANCED (CAE)
            </span>
            <h3 className="text-xl font-medium text-gray-800 mb-2">Cambridge C1 Materials</h3>
            <p className="text-sm text-gray-500 mb-6">Authentic Cambridge CAE multiple choice cloze, word formation, & listening.</p>
            <div className="grid grid-cols-2 gap-2 text-center text-xs text-gray-600">
              {["Reading", "Writing", "Listening", "Speaking"].map((skill) => {
                const key = `Advanced-${skill}`;
                const item = materials[key];
                return (
                  <button
                    key={skill}
                    onClick={() => item && setActiveModuleKey(key)}
                    className={`p-2 rounded-lg border transition font-medium ${
                      item ? "bg-gray-50 hover:bg-[#f2b705] hover:text-white border-gray-200 cursor-pointer" : "opacity-30 border-dashed border-gray-200 cursor-not-allowed"
                    }`}
                  >
                    {skill} {item ? `(${item.questions.length})` : ""}
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* TAB 2: STUDY MATERIALS & REFERENCE GUIDES */}
      {activeTab === "materials" && (
        <section className="max-w-4xl mx-auto space-y-6">
          {studyGuides.map((guide, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <span className="bg-[#55b1d4]/10 text-[#55b1d4] text-xs font-bold px-3 py-1 rounded-full">
                  {guide.level}
                </span>
                <span className="text-xs text-gray-400 font-medium">{guide.category}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{guide.title}</h3>
              <p className="text-gray-600 text-sm mb-6">{guide.summary}</p>
              
              <ul className="space-y-3 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                {guide.content.map((point, pIdx) => (
                  <li key={pIdx} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-[#55b1d4] font-bold">•</span> {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}