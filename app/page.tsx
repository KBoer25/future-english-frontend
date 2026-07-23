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
  id: string;
  title: string;
  level: string;
  category: string;
  summary: string;
  illustration: string;
  accentColor: string;
  content: string[];
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<"quizzes" | "materials">("quizzes");
  const [activeModuleKey, setActiveModuleKey] = useState<string | null>(null);
  const [activeStudyId, setActiveStudyId] = useState<string | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [selectedTopic, setSelectedTopic] = useState<string>("All");

  const topics = ["All", "Daily Life", "Social Media", "Job Interviews", "Academic & Debate"];

  // Comprehensive Quizzes across all school tiers
  const materials: Record<string, ModuleData> = {
    "Kindergarten-Phonics": {
      title: "Kindergarten: Letter Sounds & Phonics",
      image: "🔤",
      category: "Daily Life",
      source: "Systematic Synthetic Phonics Standard",
      questions: [
        {
          id: 1,
          prompt: "What sound does the letter 'S' make at the beginning of 'Snake'?",
          options: [
            { label: "Ssss...", isCorrect: true },
            { label: "Mmmm...", isCorrect: false },
            { label: "Buh-buh...", isCorrect: false },
          ],
          explanation: "In early phonics, consonants like 'S' represent continuous phonemes making a hissing sound.",
        },
      ],
    },
    "Primary-Reading": {
      title: "Primary School: Short Stories & Sentences",
      image: "📚",
      category: "Daily Life",
      source: "Elementary ESL Curriculum",
      questions: [
        {
          id: 1,
          prompt: 'Story excerpt: "Leo loves to paint pictures of blue oceans and green trees." What does Leo like to do?',
          options: [
            { label: "Paint pictures", isCorrect: true },
            { label: "Play soccer", isCorrect: false },
          ],
          explanation: "Reading comprehension at this stage tracks direct statements in simple texts.",
        },
      ],
    },
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
          explanation: "PET Reading Part 1 tests functional messages and short notices.",
        },
      ],
    },
    "Senior High-Reading": {
      title: "Senior High: B2 Discursive Reading",
      image: "📰",
      category: "Academic & Debate",
      source: "Cambridge B2 First (FCE)",
      questions: [
        {
          id: 1,
          prompt: 'Article excerpt: "Despite initial skepticism regarding remote learning, educators noted a rise in independent student research."',
          options: [
            { label: "People doubted remote learning at first, but student independence grew.", isCorrect: true },
            { label: "Remote learning failed completely.", isCorrect: false },
          ],
          explanation: "FCE texts test advanced vocabulary like 'skepticism' (doubt) and paragraph-level implications.",
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
            { label: "advice", isCorrect: true },
          ],
          explanation: "Official Cambridge Assessment answer: 'advice' matches semantic precision requirements.",
        },
      ],
    },
  };

  // Visual Study Guides with Graphic Emojis & Custom Color Accents
  const studyGuides: StudyMaterial[] = [
    {
      id: "kindergarten-phonics",
      title: "Kindergarten: Phonics & Letter Sounds Curriculum",
      level: "Kindergarten",
      category: "Daily Life",
      summary: "Systematic synthetic phonics framework for early childhood literacy development.",
      illustration: "🧸🧩✨",
      accentColor: "bg-pink-50 border-pink-100 text-pink-600",
      content: [
        "Phonemic Awareness: The ability to hear, isolate, and manipulate individual sounds (phonemes) in spoken words before seeing print.",
        "Synthetic Phonics Sequence: Introducing single letter sounds systematically rather than alphabetically so children can blend simple words immediately.",
        "CVC Blending: Connecting consonant-vowel-consonant sounds smoothly together (e.g., /c/ - /a/ - /t/ = cat).",
        "Multisensory Practice: Tracing letter shapes in sand or air while producing the precise phonetic sound."
      ]
    },
    {
      id: "primary-grammar",
      title: "Primary School: Elementary Grammar & Sentence Structures",
      level: "Primary School (A1-A2)",
      category: "Daily Life",
      summary: "Core structural rules for young elementary learners transitioning into independent writing.",
      illustration: "🎨✏️🎒",
      accentColor: "bg-green-50 border-green-100 text-green-600",
      content: [
        "Basic Sentence Architecture: Standard Subject-Verb-Object (SVO) word order in declarative sentences.",
        "Pronoun Case Agreement: Correct usage of subject pronouns (I, you, he, she, it, we, they) vs. object pronouns (me, him, her, us, them).",
        "Simple Tense Consistency: Practicing simple present routines and simple past actions with regular/irregular verbs."
      ]
    },
    {
      id: "juniorhigh-pet",
      title: "Junior High: Cambridge B1 PET Exam Strategies",
      level: "Junior High (B1)",
      category: "Social Media",
      summary: "Official guidance for tackling B1 Preliminary reading, writing transformations, and listening tasks.",
      illustration: "🎧📱💡",
      accentColor: "bg-sky-50 border-sky-100 text-sky-600",
      content: [
        "Reading Part 1: Always analyze short notices, text messages, and signs for safety warnings or explicit instructions.",
        "Writing Part 1 (Transformations): Focus closely on grammatical compatibility (e.g., adjectives followed by specific prepositions like 'keen on').",
        "Listening Part 2: Read questions ahead of time to anticipate specific constraints like names, places, or numbers."
      ]
    },
    {
      id: "seniorhigh-fce",
      title: "Senior High: Cambridge B2 First Cohesion & Essay Writing",
      level: "Senior High (B2)",
      category: "Academic & Debate",
      summary: "Advanced coherence strategies and discursive writing techniques for upper-intermediate students.",
      illustration: "📊📝🎯",
      accentColor: "bg-purple-50 border-purple-100 text-purple-600",
      content: [
        "Discursive Paragraphing: Organizing essays with a clear thesis statement, balanced opposing arguments, and a definitive conclusion.",
        "Cohesive Devices: Moving beyond basic linkers (and, but) to sophisticated transitions (furthermore, consequently, nevertheless).",
        "Lexical Precision: Avoiding repetitive vocabulary by utilizing precise synonyms and thematic word sets."
      ]
    },
    {
      id: "advanced-cae",
      title: "C1 Advanced: CAE Use of English & Discourse Mastery",
      level: "C1 Advanced",
      category: "Academic & Debate",
      summary: "Rigorous academic and professional frameworks aligned with Cambridge C1 standards.",
      illustration: "🏛️📜🎓",
      accentColor: "bg-amber-50 border-amber-100 text-amber-600",
      content: [
        "Part 1 (Multiple-Choice Cloze): Tests subtle shades of meaning, fixed collocations, complementation, and phrasal verbs.",
        "Part 3 (Word Formation): Demands mastery over prefixes (un-, dis-, mis-), internal vowel changes, and compound word structures.",
        "Discourse Management: Producing extended, coherent stretches of language with sophisticated control of grammatical structures."
      ]
    }
  ];

  const handleSelectOption = (qId: number, optIdx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const currentModule = activeModuleKey ? materials[activeModuleKey] : null;
  const currentStudyGuide = activeStudyId ? studyGuides.find(g => g.id === activeStudyId) : null;

  // ================= 1. FOCUSED QUIZ MODULE PAGE =================
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

  // ================= 2. FOCUSED STUDY MATERIAL READING PAGE =================
  if (currentStudyGuide) {
    return (
      <main className="min-h-screen bg-[#FAFAFA] text-gray-800 font-sans p-6 md:p-12">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-200">
          <button
            onClick={() => setActiveStudyId(null)}
            className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition mb-8 cursor-pointer"
          >
            ← Back to Materials
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
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-2">Curriculum Breakdown</h3>
            {currentStudyGuide.content.map((section, idx) => (
              <div key={idx} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex items-start gap-4">
                <span className="bg-[#55b1d4] text-white w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">{section}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  // ================= 3. MAIN DASHBOARD HOMEPAGE =================
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
            : "Explore core grammar rules, synthetic phonics guides, and verified exam cheat sheets."}
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
        <section className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {/* Kindergarten */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
            <span className="inline-block bg-[#E95599]/10 text-[#E95599] text-xs font-semibold px-3 py-1 rounded-full mb-4">
              KINDERGARTEN
            </span>
            <h3 className="text-xl font-medium text-gray-800 mb-2">Phonics & Sounds</h3>
            <p className="text-sm text-gray-500 mb-6">Focus on phonics, letter sounds, and early phonological awareness.</p>
            <div className="grid grid-cols-2 gap-2 text-center text-xs text-gray-600">
              {["Phonics"].map((skill) => {
                const key = `Kindergarten-${skill}`;
                const item = materials[key];
                return (
                  <button
                    key={skill}
                    onClick={() => item && setActiveModuleKey(key)}
                    className={`p-2 rounded-lg border transition font-medium w-full col-span-2 ${
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
              {["Reading"].map((skill) => {
                const key = `Primary-${skill}`;
                const item = materials[key];
                return (
                  <button
                    key={skill}
                    onClick={() => item && setActiveModuleKey(key)}
                    className={`p-2 rounded-lg border transition font-medium w-full col-span-2 ${
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
              {["Reading"].map((skill) => {
                const key = `Junior High-${skill}`;
                const item = materials[key];
                return (
                  <button
                    key={skill}
                    onClick={() => item && setActiveModuleKey(key)}
                    className={`p-2 rounded-lg border transition font-medium w-full col-span-2 ${
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
              {["Reading"].map((skill) => {
                const key = `Senior High-${skill}`;
                const item = materials[key];
                return (
                  <button
                    key={skill}
                    onClick={() => item && setActiveModuleKey(key)}
                    className={`p-2 rounded-lg border transition font-medium w-full col-span-2 ${
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
            <p className="text-sm text-gray-500 mb-6">Advanced multiple choice cloze, word formation, and listening analysis.</p>
            <div className="grid grid-cols-2 gap-2 text-center text-xs text-gray-600">
              {["Reading"].map((skill) => {
                const key = `Advanced-${skill}`;
                const item = materials[key];
                return (
                  <button
                    key={skill}
                    onClick={() => item && setActiveModuleKey(key)}
                    className={`p-2 rounded-lg border transition font-medium w-full col-span-2 ${
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

      {/* TAB 2: VISUAL STUDY MATERIALS CARDS WITH ILLUSTRATIONS */}
      {activeTab === "materials" && (
        <section className="max-w-4xl mx-auto space-y-6">
          {studyGuides.map((guide) => (
            <div
              key={guide.id}
              onClick={() => setActiveStudyId(guide.id)}
              className="bg-white rounded-3xl border border-gray-200 shadow-sm hover:border-[#55b1d4] hover:shadow-md transition cursor-pointer overflow-hidden group flex flex-col md:flex-row items-center"
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
                    Read Guide →
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{guide.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{guide.summary}</p>
              </div>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}