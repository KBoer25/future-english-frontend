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

  // Comprehensive Quizzes across all school tiers
  const materials: Record<string, ModuleData> = {
    // ================= KINDERGARTEN (Phonics Focus) =================
    "Kindergarten-Phonics": {
      title: "Kindergarten: Letter Sounds & Phonics",
      image: "🔤",
      category: "Daily Life",
      source: "Early Years Phonics Standard",
      questions: [
        {
          id: 1,
          prompt: "What sound does the letter 'S' make at the beginning of 'Snake'?",
          options: [
            { label: "Ssss...", isCorrect: true },
            { label: "Mmmm...", isCorrect: false },
            { label: "Buh-buh...", isCorrect: false },
          ],
          explanation: "The letter S makes a hissing 'Ssss' sound like a snake!",
        },
        {
          id: 2,
          prompt: "Which word starts with the short 'A' sound (/æ/), like in 'Apple'?",
          options: [
            { label: "Cat", isCorrect: true },
            { label: "Dog", isCorrect: false },
            { label: "Sun", isCorrect: false },
          ],
          explanation: "The word 'Cat' uses the short 'A' sound (/æ/).",
        },
      ],
    },
    "Kindergarten-Listening": {
      title: "Kindergarten: Auditory Rhymes & Sounds",
      image: "🎵",
      category: "Daily Life",
      source: "Early Years Phonological Awareness",
      questions: [
        {
          id: 1,
          prompt: "Which word rhymes with 'Cat'?",
          options: [
            { label: "Hat", isCorrect: true },
            { label: "Dog", isCorrect: false },
            { label: "Pen", isCorrect: false },
          ],
          explanation: "'Cat' and 'Hat' share the same ending '-at' sound rhyme.",
        },
      ],
    },

    // ================= PRIMARY SCHOOL (Elementary A1-A2) =================
    "Primary-Reading": {
      title: "Primary School: Short Stories & Sentences",
      image: "📚",
      category: "Daily Life",
      source: "Elementary ESL Standard",
      questions: [
        {
          id: 1,
          prompt: 'Story excerpt: "Leo loves to paint pictures of blue oceans and green trees." What does Leo like to do?',
          options: [
            { label: "Paint pictures", isCorrect: true },
            { label: "Play soccer", isCorrect: false },
            { label: "Read books", isCorrect: false },
          ],
          explanation: "The text states that Leo loves to paint pictures.",
        },
      ],
    },
    "Primary-Writing": {
      title: "Primary School: Basic Sentence Building",
      image: "✏️",
      category: "Daily Life",
      source: "Elementary ESL Standard",
      questions: [
        {
          id: 1,
          prompt: "Choose the correct pronoun: '____ is my best friend. Her name is Anna.'",
          options: [
            { label: "She", isCorrect: true },
            { label: "He", isCorrect: false },
            { label: "They", isCorrect: false },
          ],
          explanation: "We use 'She' for a female subject ('Her name is Anna').",
        },
      ],
    },

    // ================= JUNIOR HIGH SCHOOL (B1 Preliminary) =================
    "Junior High-Reading": {
      title: "Junior High: Cambridge B1 Reading",
      image: "📱",
      category: "Social Media",
      source: "Cambridge Assessment English (PET)",
      questions: [
        {
          id: 1,
          prompt: 'Message from Stefan: "We\'re outside the cinema. Text if you\'re going to be late..." What should Peter do?',
          options: [
            { label: "Let Stefan know if he is delayed", isCorrect: true },
            { label: "Wait for Stefan inside the cinema", isCorrect: false },
          ],
          explanation: "Stefan explicitly asks Peter to text if he will be late.",
        },
      ],
    },
    "Junior High-Writing": {
      title: "Junior High: Key Word Transformations",
      image: "✍️",
      category: "Daily Life",
      source: "Cambridge Assessment English (PET)",
      questions: [
        {
          id: 1,
          prompt: 'Original: "Niko really enjoys playing basketball."\nRewrite: "Niko is very keen _______ basketball."',
          options: [
            { label: "on", isCorrect: true },
            { label: "in", isCorrect: false },
          ],
          explanation: "The correct preposition pairing is 'keen on'.",
        },
      ],
    },

    // ================= SENIOR HIGH SCHOOL (B2 First / FCE) =================
    "Senior High-Reading": {
      title: "Senior High: B2 Discursive Reading",
      image: "📰",
      category: "Academic & Debate",
      source: "Cambridge B2 First (FCE)",
      questions: [
        {
          id: 1,
          prompt: 'Article excerpt: "Despite initial skepticism regarding remote learning, educators noted a rise in independent student research." What does this imply?',
          options: [
            { label: "People doubted remote learning at first, but students became more independent.", isCorrect: true },
            { label: "Remote learning failed completely across all schools.", isCorrect: false },
          ],
          explanation: "'Skepticism' means doubt, which was later proven wrong by increased independence.",
        },
      ],
    },
    "Senior High-Writing": {
      title: "Senior High: B2 Essay Cohesion",
      image: "📝",
      category: "Academic & Debate",
      source: "Cambridge B2 First (FCE)",
      questions: [
        {
          id: 1,
          prompt: "Which phrase is most appropriate to introduce an additional argument in a formal B2 essay?",
          options: [
            { label: "Furthermore, it is worth noting that...", isCorrect: true },
            { label: "Plus, also and stuff...", isCorrect: false },
          ],
          explanation: "'Furthermore' is a formal transitional device suited for B2 essay writing.",
        },
      ],
    },

    // ================= C1 ADVANCED (CAE) =================
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
            { label: "advice", isCorrect: true },
          ],
          explanation: "Official Cambridge Answer: 'advice' is the correct collocate used in this context[cite: 1].",
        },
      ],
    },
    "Advanced-Writing": {
      title: "C1 Advanced: Word Formation",
      image: "✒️",
      category: "Academic & Debate",
      source: "Cambridge Certificate in Advanced English (CAE)",
      questions: [
        {
          id: 1,
          prompt: 'Part 3 Word Formation (Freud and Dreams): "Sigmund Freud is regarded as the _____ (FOUND) of psychoanalysis."',
          options: [
            { label: "FOUNDER", isCorrect: true },
            { label: "FOUNDATION", isCorrect: false },
          ],
          explanation: "Official Cambridge Answer: Agent noun required for a creator is 'FOUNDER'[cite: 1].",
        },
      ],
    },
  };

  // Study Materials & Reference Guides Data
  const studyGuides: StudyMaterial[] = [
    {
      title: "Kindergarten: Phonics & Letter Sounds Guide",
      level: "Kindergarten",
      category: "Daily Life",
      summary: "Essential early childhood phonemic awareness and alphabet sound rules.",
      content: [
        "Focus on listening and producing letter sounds (phonemes) before letter names.",
        "Use auditory matching (e.g., matching words that start with the same sound like 'B-ball' or 'C-cat').",
        "Introduce simple consonant-vowel-consonant (CVC) blending slowly (e.g., /c/ - /a/ - /t/ = cat)."
      ]
    },
    {
      title: "Primary School: Building Simple Sentences",
      level: "Primary School (A1-A2)",
      category: "Daily Life",
      summary: "Core structural patterns for elementary learners.",
      content: [
        "Subject + Verb + Object structure (e.g., 'I play football').",
        "Using basic pronouns correctly (he, she, it, they).",
        "Expanding vocabulary through daily descriptive adjectives (big, small, happy, sad)."
      ]
    },
    {
      title: "C1 Advanced: Word Formation Patterns",
      level: "C1 Advanced",
      category: "Academic & Debate",
      summary: "Mastering prefixes, suffixes, and internal root changes for CAE Part 3[cite: 1].",
      content: [
        "Root -> Noun: FOUND ➔ FOUNDER / FOUNDATION[cite: 1]",
        "Root -> Adjective: INFLUENCE ➔ INFLUENTIAL",
        "Negative Prefixes: Use un-, dis-, ir-, or mis- (e.g., RELIABLE ➔ UNRELIABLE).",
        "Always check whether a plural noun is required at the end of the line[cite: 1]."
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

  // MAIN HOMEPAGE VIEW WITH TABS
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
          {activeTab === "quizzes"
            ? "Structured school tiers from Phonics foundations to C1 Advanced mastery."
            : "Explore core grammar rules, phonics guides, and exam strategy cheat sheets."}
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

      {/* TAB 1: PRACTICE QUIZZES GRID (All School Tiers) */}
      {activeTab === "quizzes" && (
        <section className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {/* Kindergarten */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
            <span className="inline-block bg-[#E95599]/10 text-[#E95599] text-xs font-semibold px-3 py-1 rounded-full mb-4">
              KINDERGARTEN
            </span>
            <h3 className="text-xl font-medium text-gray-800 mb-2">Phonics & Sounds</h3>
            <p className="text-sm text-gray-500 mb-6">Focus on phonics, letter sounds, and early phonological awareness.</p>
            <div className="grid grid-cols-2 gap-2 text-center text-xs text-gray-600">
              {["Phonics", "Listening"].map((skill) => {
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

          {/* Primary School */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
            <span className="inline-block bg-[#22c55e]/10 text-[#22c55e] text-xs font-semibold px-3 py-1 rounded-full mb-4">
              PRIMARY SCHOOL
            </span>
            <h3 className="text-xl font-medium text-gray-800 mb-2">Elementary Foundations</h3>
            <p className="text-sm text-gray-500 mb-6">Simple sentences, basic reading comprehension, and vocabulary.</p>
            <div className="grid grid-cols-2 gap-2 text-center text-xs text-gray-600">
              {["Reading", "Writing"].map((skill) => {
                const key = `Primary-${skill}`;
                const item = materials[key];
                return (
                  <button
                    key={skill}
                    onClick={() => item && setActiveModuleKey(key)}
                    className={`p-2 rounded-lg border transition font-medium ${
                      item ? "bg-gray-50 hover:bg-[#22c55e] hover:text-white border-gray-200 cursor-pointer" : "opacity-30 border-dashed border-gray-200 cursor-not-allowed"
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
            <h3 className="text-xl font-medium text-gray-800 mb-2">Cambridge B1 PET</h3>
            <p className="text-sm text-gray-500 mb-6">Intermediate grammar, messaging texts, and key-word transformations.</p>
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

          {/* Senior High */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
            <span className="inline-block bg-[#a855f7]/10 text-[#a855f7] text-xs font-semibold px-3 py-1 rounded-full mb-4">
              SENIOR HIGH (B2)
            </span>
            <h3 className="text-xl font-medium text-gray-800 mb-2">Cambridge B2 First</h3>
            <p className="text-sm text-gray-500 mb-6">Discursive reading articles, essay transitions, and formal cohesion.</p>
            <div className="grid grid-cols-2 gap-2 text-center text-xs text-gray-600">
              {["Reading", "Writing"].map((skill) => {
                const key = `Senior High-${skill}`;
                const item = materials[key];
                return (
                  <button
                    key={skill}
                    onClick={() => item && setActiveModuleKey(key)}
                    className={`p-2 rounded-lg border transition font-medium ${
                      item ? "bg-gray-50 hover:bg-[#a855f7] hover:text-white border-gray-200 cursor-pointer" : "opacity-30 border-dashed border-gray-200 cursor-not-allowed"
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
            <h3 className="text-xl font-medium text-gray-800 mb-2">Cambridge C1 CAE</h3>
            <p className="text-sm text-gray-500 mb-6">Advanced multiple choice cloze, word formation, and listening analysis[cite: 1].</p>
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

      {/* TAB 2: STUDY MATERIALS */}
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