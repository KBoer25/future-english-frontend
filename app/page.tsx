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
  const [activeModuleKey, setActiveModuleKey] = useState<string | null>(null);
  const [activeStudyId, setActiveStudyId] = useState<string | null>(null);
  const [activeSubTopic, setActiveSubTopic] = useState<SubTopic | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [selectedTopic, setSelectedTopic] = useState<string>("All");

  const topics = ["All", "Daily Life", "Social Media", "Job Interviews", "Academic & Debate"];

  const quizDataBank: Record<string, ModuleData> = {
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
          prompt: 'Story excerpt: "Leo loves to paint pictures of blue oceans and green trees."',
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
          prompt: 'Message from Stefan: "We\'re outside the cinema. Text if you\'re going to be late..."',
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
          prompt: 'Article excerpt: "Despite initial skepticism regarding remote learning..."',
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

  const studyGuides: StudyMaterial[] = [
    {
      id: "kindergarten-phonics",
      title: "Kindergarten: Complete Phonics & Letter Sounds Guide",
      level: "Kindergarten",
      category: "Daily Life",
      summary: "Comprehensive framework for early childhood phonemic awareness, alphabet sounds, and blending rules.",
      illustration: "🧸🧩✨",
      accentColor: "bg-pink-50 border-pink-100 text-pink-600",
      subTopics: [
        {
          title: "1. Phonemic Awareness",
          subtitle: "Isolating individual sounds in spoken words before seeing print",
          explanation: [
            "Phonemic awareness is purely auditory. Before children learn to read letters, they must learn to hear individual sound units (phonemes) inside words.",
            "For example, hearing that the word 'cat' starts with the /k/ sound, has a middle /æ/ sound, and ends with the /t/ sound."
          ],
          examples: ["Say 'sun' without the /s/ sound -> 'un'", "Identify the beginning sound of 'Ball' -> /b/"]
        },
        {
          title: "2. Synthetic Phonics Sequence",
          subtitle: "Learning letter sounds systematically rather than alphabetically",
          explanation: [
            "Instead of teaching A-B-C in order, synthetic phonics introduces high-frequency letters first so children can start building words immediately.",
            "The standard first group of sounds taught is usually S, A, T, P, I, N."
          ],
          examples: ["Using S, A, T children can instantly decode words like 'sat', 'at', 'tap', and 'pat'."]
        }
      ]
    },
    {
      id: "primary-grammar",
      title: "Primary School: Elementary Grammar & Vocabulary Foundations",
      level: "Primary School (A1-A2)",
      category: "Daily Life",
      summary: "Core structural rules, sentence patterns, and vocabulary sets for young elementary students.",
      illustration: "🎨✏️🎒",
      accentColor: "bg-green-50 border-green-100 text-green-600",
      subTopics: [
        {
          title: "1. Basic Sentence Architecture (SVO)",
          subtitle: "Mastering Subject-Verb-Object word order",
          explanation: [
            "In English, simple sentences follow a strict order: Subject + Verb + Object.",
            "This creates clear, direct communication for elementary writers."
          ],
          examples: ["'The cat (Subject) eats (Verb) fish (Object).'", "'Maria plays soccer.'"]
        },
        {
          title: "2. Pronoun Case Agreement",
          subtitle: "Subject vs. Object pronouns",
          explanation: [
            "Subject pronouns perform the action (I, you, he, she, it, we, they).",
            "Object pronouns receive the action (me, you, him, her, it, us, them)."
          ],
          examples: ["'She gave the book to him.'", "'They invited us to the party.'"]
        }
      ]
    },
    {
      id: "juniorhigh-pet",
      title: "Junior High: Cambridge B1 Preliminary (PET) Study Guide",
      level: "Junior High (B1)",
      category: "Social Media",
      summary: "In-depth breakdown of intermediate grammar structures, functional text messages, and exam strategies.",
      illustration: "🎧📱💡",
      accentColor: "bg-sky-50 border-sky-100 text-sky-600",
      subTopics: [
        {
          title: "1. Reading Part 1 (Signs & Notices)",
          subtitle: "Analyzing short functional messages and public warnings",
          explanation: [
            "Cambridge PET Reading Part 1 tests your ability to understand short notices, text messages, and signs.",
            "Always distinguish between what a sign says versus what it implies or warns against."
          ],
          examples: ["'Staff Only' -> Customers are not allowed to enter this area."]
        },
        {
          title: "2. Writing Part 1 (Key Word Transformations)",
          subtitle: "Rewriting sentences using a specific grammar target",
          explanation: [
            "You must rewrite a sentence so it means the exact same thing using a given keyword.",
            "This heavily tests adjectives followed by fixed prepositions and passive voices."
          ],
          examples: ["'Niko really enjoys basketball.' -> 'Niko is very keen ON basketball.'"]
        }
      ]
    },
    {
      id: "seniorhigh-fce",
      title: "Senior High: Cambridge B2 First (FCE) Essay & Cohesion Guide",
      level: "Senior High (B2)",
      category: "Academic & Debate",
      summary: "Advanced coherence strategies, discursive writing templates, and formal upper-intermediate structures.",
      illustration: "📊📝🎯",
      accentColor: "bg-purple-50 border-purple-100 text-purple-600",
      subTopics: [
        {
          title: "1. Discursive Essay Structure",
          subtitle: "Crafting balanced arguments and clear thesis statements",
          explanation: [
            "A B2 First essay requires an introduction stating your stance, two well-argued body paragraphs, and a conclusive summary.",
            "Avoid overly emotional language; maintain a neutral, formal academic tone."
          ],
          examples: ["Introduction thesis: 'While online learning offers flexibility, social interaction remains vital.'"]
        },
        {
          title: "2. Sophisticated Cohesive Devices",
          subtitle: "Moving beyond basic linkers like 'and' and 'but'",
          explanation: [
            "Upper-intermediate writing requires transition markers that signal contrast, concession, or addition smoothly.",
            "Using words like 'furthermore', 'nevertheless', and 'consequently' elevates your score."
          ],
          examples: ["'The project was costly; nevertheless, the benefits outweighed the expenses.'"]
        }
      ]
    },
    {
      id: "advanced-cae",
      title: "C1 Advanced: CAE Use of English & Discourse Masterclass",
      level: "C1 Advanced",
      category: "Academic & Debate",
      summary: "Rigorous academic frameworks, collocation rules, and advanced word-formation mastery for CAE success.",
      illustration: "🏛️📜🎓",
      accentColor: "bg-amber-50 border-amber-100 text-amber-600",
      subTopics: [
        {
          title: "1. Part 1 (Multiple-Choice Cloze)",
          subtitle: "Analyzing subtle semantic differences, fixed collocations, idiom constraints, and phrasal verb valency.",
          explanation: [
            "Words in options often look similar in meaning, but only one collocates naturally with the surrounding context.",
            "Mastering dependent prepositions and fixed phrasal verb patterns is essential here."
          ],
          examples: ["'That is the advice from Britain's foremost female engineers.'"]
        },
        {
          title: "2. Part 3 (Word Formation)",
          subtitle: "Mastering complex root transformations, prefix modifications (un-, dis-, mis-), and plural noun agreements.",
          explanation: [
            "CAE Part 3 requires you to take a root word and transform it into a noun, adjective, adverb, or verb depending on the sentence gap.",
            "You must also watch out for negative prefixes and plural noun endings."
          ],
          examples: ["Root: FOUND -> Noun person: FOUNDER | Noun abstract: FOUNDATION"]
        },
        {
          title: "3. Advanced Syntax & Inversion",
          subtitle: "Utilizing negative adverbial inversions for rhetorical impact (e.g., 'Not only was the experiment successful...')",
          explanation: [
            "For dramatic or formal emphasis, negative expressions can be placed at the start of a sentence, forcing the auxiliary verb before the subject.",
            "Formula: Negative Adverb + Auxiliary Verb + Subject + Main Verb."
          ],
          examples: ["'Not only was the experiment successful, but it was also completed under budget.'"]
        },
        {
          title: "4. Discourse Management",
          subtitle: "Structuring spoken and written arguments with absolute grammatical precision and nuanced stylistic control.",
          explanation: [
            "Discourse management evaluates how well your ideas hang together logically across sentences and paragraphs.",
            "It requires balancing complex grammatical structures with an appropriate formal tone."
          ],
          examples: ["Using advanced concession clauses like 'Notwithstanding the initial setbacks...'"]
        }
      ]
    }
  ];

  const handleSelectOption = (qId: number, optIdx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const currentModule = activeModuleKey ? quizDataBank[activeModuleKey] : null;
  const currentStudyGuide = activeStudyId ? studyGuides.find(g => g.id === activeStudyId) : null;

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
            : "Explore core grammar rules, complete phonics breakdowns, and verified exam study guides."}
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

      {activeTab === "quizzes" && (
        <section className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
            <span className="inline-block bg-[#E95599]/10 text-[#E95599] text-xs font-semibold px-3 py-1 rounded-full mb-4">
              KINDERGARTEN
            </span>
            <h3 className="text-xl font-medium text-gray-800 mb-2">Phonics & Sounds</h3>
            <p className="text-sm text-gray-500 mb-6">Focus on phonics, letter sounds, and early phonological awareness.</p>
            <button
              onClick={() => setActiveModuleKey("Kindergarten-Phonics")}
              className="w-full p-2 rounded-lg border border-gray-200 bg-gray-50 hover:bg-[#E95599] hover:text-white transition font-medium text-xs cursor-pointer"
            >
              Phonics ({quizDataBank["Kindergarten-Phonics"].questions.length})
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
            <span className="inline-block bg-[#22c55e]/10 text-[#22c55e] text-xs font-semibold px-3 py-1 rounded-full mb-4">
              PRIMARY SCHOOL
            </span>
            <h3 className="text-xl font-medium text-gray-800 mb-2">Elementary Foundations</h3>
            <p className="text-sm text-gray-500 mb-6">Simple sentences, basic reading comprehension, and vocabulary.</p>
            <button
              onClick={() => setActiveModuleKey("Primary-Reading")}
              className="w-full p-2 rounded-lg border border-gray-200 bg-gray-50 hover:bg-[#22c55e] hover:text-white transition font-medium text-xs cursor-pointer"
            >
              Reading ({quizDataBank["Primary-Reading"].questions.length})
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
            <span className="inline-block bg-[#55b1d4]/10 text-[#55b1d4] text-xs font-semibold px-3 py-1 rounded-full mb-4">
              JUNIOR HIGH (B1)
            </span>
            <h3 className="text-xl font-medium text-gray-800 mb-2">Cambridge B1 PET</h3>
            <p className="text-sm text-gray-500 mb-6">Intermediate grammar, messaging texts, and key-word transformations.</p>
            <button
              onClick={() => setActiveModuleKey("Junior High-Reading")}
              className="w-full p-2 rounded-lg border border-gray-200 bg-gray-50 hover:bg-[#55b1d4] hover:text-white transition font-medium text-xs cursor-pointer"
            >
              Reading ({quizDataBank["Junior High-Reading"].questions.length})
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
            <span className="inline-block bg-[#a855f7]/10 text-[#a855f7] text-xs font-semibold px-3 py-1 rounded-full mb-4">
              SENIOR HIGH (B2)
            </span>
            <h3 className="text-xl font-medium text-gray-800 mb-2">Cambridge B2 First</h3>
            <p className="text-sm text-gray-500 mb-6">Discursive reading articles, essay transitions, and formal cohesion.</p>
            <button
              onClick={() => setActiveModuleKey("Senior High-Reading")}
              className="w-full p-2 rounded-lg border border-gray-200 bg-gray-50 hover:bg-[#a855f7] hover:text-white transition font-medium text-xs cursor-pointer"
            >
              Reading ({quizDataBank["Senior High-Reading"].questions.length})
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
            <span className="inline-block bg-[#f2b705]/10 text-[#f2b705] text-xs font-semibold px-3 py-1 rounded-full mb-4">
              C1 ADVANCED (CAE)
            </span>
            <h3 className="text-xl font-medium text-gray-800 mb-2">Cambridge C1 CAE</h3>
            <p className="text-sm text-gray-500 mb-6">Advanced multiple choice cloze, word formation, and listening analysis.</p>
            <button
              onClick={() => setActiveModuleKey("Advanced-Reading")}
              className="w-full p-2 rounded-lg border border-gray-200 bg-gray-50 hover:bg-[#f2b705] hover:text-white transition font-medium text-xs cursor-pointer"
            >
              Reading ({quizDataBank["Advanced-Reading"].questions.length})
            </button>
          </div>
        </section>
      )}

      {activeTab === "materials" && (
        <section className="max-w-4xl mx-auto space-y-6">
          {studyGuides.map((guide) => {
            const isMatch = selectedTopic === "All" || guide.category === selectedTopic;

            return (
              <div
                key={guide.id}
                onClick={() => isMatch && setActiveStudyId(guide.id)}
                className={`bg-white rounded-3xl border border-gray-200 shadow-sm transition overflow-hidden group flex flex-col md:flex-row items-center ${
                  isMatch ? "opacity-100 hover:border-[#55b1d4] hover:shadow-md cursor-pointer" : "opacity-30 pointer-events-none"
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