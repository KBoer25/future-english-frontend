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

export default function Home() {
  const [activeModuleKey, setActiveModuleKey] = useState<string | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [selectedTopic, setSelectedTopic] = useState<string>("All");

  const topics = ["All", "Daily Life", "Social Media", "Job Interviews", "Academic & Debate"];

  const materials: Record<string, ModuleData> = {
    // ================= KINDERGARTEN =================
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
        {
          id: 2,
          prompt: "Look at the sky 🌧️. What do you need?",
          options: [
            { label: "Sunglasses", isCorrect: false },
            { label: "An Umbrella", isCorrect: true },
            { label: "A Swimsuit", isCorrect: false },
          ],
          explanation: "When it rains 🌧️, you use an umbrella!",
        },
      ],
    },

    "Kindergarten-Writing": {
      title: "Kindergarten: Fruit & Object Spelling",
      image: "🍎",
      category: "Daily Life",
      source: "Basic EFL Standard",
      questions: [
        {
          id: 1,
          prompt: "Complete the word for this fruit 🍎: A _ P L E",
          options: [
            { label: "P (APPLE)", isCorrect: true },
            { label: "B (ABLE)", isCorrect: false },
            { label: "T (ATPLE)", isCorrect: false },
          ],
          explanation: "Apple is spelled A-P-P-L-E.",
        },
        {
          id: 2,
          prompt: "Complete the word for this object ✏️: P E N C I _",
          options: [
            { label: "L (PENCIL)", isCorrect: true },
            { label: "R (PENCIR)", isCorrect: false },
            { label: "N (PENCIN)", isCorrect: false },
          ],
          explanation: "Pencil is spelled P-E-N-C-I-L.",
        },
      ],
    },

    "Kindergarten-Listening": {
      title: "Kindergarten: Animal Sounds",
      image: "🐱",
      category: "Daily Life",
      source: "Basic EFL Standard",
      questions: [
        {
          id: 1,
          prompt: 'Listen: "Meow! Meow!" Which animal makes this sound?',
          options: [
            { label: "A Dog", isCorrect: false },
            { label: "A Cat", isCorrect: true },
            { label: "A Duck", isCorrect: false },
          ],
          explanation: "Cats say 'Meow!'",
        },
        {
          id: 2,
          prompt: 'Listen: "Woof! Woof!" Which animal makes this sound?',
          options: [
            { label: "A Dog", isCorrect: true },
            { label: "A Cow", isCorrect: false },
            { label: "A Bird", isCorrect: false },
          ],
          explanation: "Dogs say 'Woof!'",
        },
      ],
    },

    "Kindergarten-Speaking": {
      title: "Kindergarten: Daily Greetings",
      image: "👋",
      category: "Daily Life",
      source: "Basic EFL Standard",
      questions: [
        {
          id: 1,
          prompt: "When you meet a friend in the morning, what do you say?",
          options: [
            { label: "Good Morning!", isCorrect: true },
            { label: "Good Night!", isCorrect: false },
            { label: "Goodbye!", isCorrect: false },
          ],
          explanation: "We say 'Good Morning' when starting the day.",
        },
        {
          id: 2,
          prompt: "When someone gives you a gift, what should you say?",
          options: [
            { label: "Thank you!", isCorrect: true },
            { label: "Sorry!", isCorrect: false },
            { label: "No way!", isCorrect: false },
          ],
          explanation: "Always say 'Thank you' to show appreciation.",
        },
      ],
    },

    // ================= JUNIOR HIGH (B1) =================
    "Junior High-Reading": {
      title: "Junior High: Cambridge B1 Reading Comprehension",
      image: "📱",
      category: "Social Media",
      source: "Cambridge Assessment English (PET)",
      questions: [
        {
          id: 1,
          prompt: 'Message from Stefan: "We\'re outside the cinema. Text if you\'re going to be late and we\'ll wait for the next film. If you\'re not coming, we\'ll go in now." What should Peter do?',
          options: [
            { label: "Let Stefan know if he is delayed", isCorrect: true },
            { label: "Tell Stefan which film he wants to watch", isCorrect: false },
            { label: "Wait for Stefan inside the cinema", isCorrect: false },
          ],
          explanation: "Stefan explicitly asks Peter to text if he will be late so they can adjust plans.",
        },
        {
          id: 2,
          prompt: 'Library Notice: "Books must be returned to the desk before 5 PM on Fridays, or an automatic overdue fine will apply." What is the main rule?',
          options: [
            { label: "The library closes at 5 PM every day", isCorrect: false },
            { label: "You must pay if you return books late on Friday", isCorrect: true },
            { label: "No books can be borrowed on Friday afternoons", isCorrect: false },
          ],
          explanation: "An overdue fine applies if books are not returned by the 5 PM Friday deadline.",
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
            { label: "about", isCorrect: false },
          ],
          explanation: "The prepositional adjective expression is 'keen on'.",
        },
        {
          id: 2,
          prompt: 'Original: "There aren\'t many computers in our room."\nRewrite: "There are only _______ computers in our room."',
          options: [
            { label: "a few", isCorrect: true },
            { label: "a little", isCorrect: false },
            { label: "much", isCorrect: false },
          ],
          explanation: "'A few' is used with countable nouns like computers.",
        },
      ],
    },

    "Junior High-Listening": {
      title: "Junior High: Listening Comprehension",
      image: "🎙️",
      category: "Daily Life",
      source: "Cambridge Assessment English (PET)",
      questions: [
        {
          id: 1,
          prompt: 'Interview with 13-year-old Sally: "My penfriend was moving to a new city... so I wrote down some advice for her. She said I should write a book for other kids." Why did Sally write her first book?',
          options: [
            { label: "Her family bought her a diary", isCorrect: false },
            { label: "Her penfriend suggested it", isCorrect: true },
            { label: "She wanted to win a competition", isCorrect: false },
          ],
          explanation: "Sally states her penfriend suggested converting her notes into a book.",
        },
      ],
    },

    "Junior High-Speaking": {
      title: "Junior High: Collaborative Conversation",
      image: "🗣️",
      category: "Academic & Debate",
      source: "Cambridge Assessment English (PET)",
      questions: [
        {
          id: 1,
          prompt: "Scenario: Planning a gift for a friend moving abroad. Which phrase is best for starting a collaborative discussion?",
          options: [
            { label: "What about giving him a photo album of our class?", isCorrect: true },
            { label: "Buy him a video game now.", isCorrect: false },
            { label: "I don't care.", isCorrect: false },
          ],
          explanation: "'What about...' invites your partner to share their opinion.",
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
          prompt: 'Part 1 Multiple Choice Cloze (Girls & Technology):\n"If you want your daughter to succeed, buy her a toy construction set. That is the _____ from Britain\'s foremost female engineers."',
          options: [
            { label: "A) instruction", isCorrect: false },
            { label: "B) information", isCorrect: false },
            { label: "C) opinion", isCorrect: false },
            { label: "D) advice", isCorrect: true },
          ],
          explanation: "Official Cambridge Answer: 'advice' is the correct collocate used in this context.",
        },
        {
          id: 2,
          prompt: 'Part 1 Multiple Choice Cloze (Cleaner Wrasses):\n"Cleaner wrasses feed on parasites of larger fish... Roamers have several cleaning stations to choose from. Which statement is true?"',
          options: [
            { label: "A) They regard roamer fish as important clients", isCorrect: true },
            { label: "B) They take great care not to hurt any clients", isCorrect: false },
            { label: "C) They never feed on healthy mucus", isCorrect: false },
          ],
          explanation: "Official Cambridge Answer: Cleaners prioritize 'roamers' because roamers will leave if kept waiting.",
        },
        {
          id: 3,
          prompt: 'Part 1 Text (The Invention of Banking):\n"In Mesopotamia and Ancient Egypt, early banking developed out of state warehouses storing grain. What originated these systems?"',
          options: [
            { label: "A) The creation of military coinage", isCorrect: false },
            { label: "B) The provision of secure storage facilities for food", isCorrect: true },
            { label: "C) Royal decrees forcing citizens into debt", isCorrect: false },
          ],
          explanation: "Official Cambridge Answer: Banking grew out of centralized storage facilities for crops and grain.",
        },
      ],
    },

    "Advanced-Writing": {
      title: "C1 Advanced: Word Formation & Grammar",
      image: "✒️",
      category: "Academic & Debate",
      source: "Cambridge Certificate in Advanced English (CAE)",
      questions: [
        {
          id: 1,
          prompt: 'Part 3 Word Formation (Freud and Dreams):\n"Sigmund Freud is regarded as the _____ (FOUND) of psychoanalysis."',
          options: [
            { label: "FOUNDER", isCorrect: true },
            { label: "FOUNDATION", isCorrect: false },
            { label: "FOUNDING", isCorrect: false },
          ],
          explanation: "Official Cambridge Answer: Agent noun required for a creator is 'FOUNDER'.",
        },
        {
          id: 2,
          prompt: 'Part 3 Word Formation (Freud and Dreams):\n"His work has been highly _____ (INFLUENCE) in many psychological areas."',
          options: [
            { label: "INFLUENTIAL", isCorrect: true },
            { label: "INFLUENCING", isCorrect: false },
            { label: "UNINFLUENCED", isCorrect: false },
          ],
          explanation: "Official Cambridge Answer: Adjective form of influence is 'INFLUENTIAL'.",
        },
        {
          id: 3,
          prompt: 'Part 3 Word Formation (Freud and Dreams):\n"Freud drawn our _____ (ATTEND) to dreams as clues to inner conflict."',
          options: [
            { label: "ATTENTION", isCorrect: true },
            { label: "ATTENDANCE", isCorrect: false },
            { label: "ATTENDANT", isCorrect: false },
          ],
          explanation: "Official Cambridge Answer: Collocation 'draw attention to'.",
        },
      ],
    },

    "Advanced-Listening": {
      title: "C1 Advanced: Audio Analysis",
      image: "💼",
      category: "Job Interviews",
      source: "Cambridge Certificate in Advanced English (CAE)",
      questions: [
        {
          id: 1,
          prompt: 'Extract 1 (Marketing & Sponsorship):\nWhat point does the speaker make regarding corporate charity sponsorships?',
          options: [
            { label: "They dramatically boost overall sales.", isCorrect: false },
            { label: "Companies use them primarily to appear softer in the public eye.", isCorrect: true },
            { label: "Consumers prefer companies that ignore social issues.", isCorrect: false },
          ],
          explanation: "Official Cambridge Transcript: '...many companies just want to appear softer in the public eye.'",
        },
        {
          id: 2,
          prompt: 'Extract 2 (Fitness Routines):\nWhat does the female speaker suggest is key to long-term fitness?',
          options: [
            { label: "Spending 60 minutes in a luxury gym daily", isCorrect: false },
            { label: "Building small amounts of exercise into daily routine", isCorrect: true },
            { label: "Hiring a private fitness coach", isCorrect: false },
          ],
          explanation: "Official Cambridge Transcript: 'The real key is to build exercise into your daily routine... exercise little and often.'",
        },
      ],
    },

    "Advanced-Speaking": {
      title: "C1 Advanced: Collaborative Discussion & Negotiation",
      image: "🎙️",
      category: "Academic & Debate",
      source: "Cambridge Certificate in Advanced English (CAE)",
      questions: [
        {
          id: 1,
          prompt: "Part 3 Speaking Task: How should candidates negotiate which communication method is least effective?",
          options: [
            { label: "Shall we start by comparing face-to-face meetings with video calls?", isCorrect: true },
            { label: "I will make the final decision alone.", isCorrect: false },
            { label: "Let's stop talking.", isCorrect: false },
          ],
          explanation: "In C1 Speaking Part 3, initiating structured evaluation demonstrates high interactive communication scores.",
        },
      ],
    },
  };

  const handleSelectOption = (qId: number, optIdx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const currentModule = activeModuleKey ? materials[activeModuleKey] : null;

  // FOCUSED MODULE PAGE VIEW (When a user clicks on any module)
  if (currentModule) {
    return (
      <main className="min-h-screen bg-[#FAFAFA] text-gray-800 font-sans p-6 md:p-12">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-200">
          {/* Top Navigation */}
          <button
            onClick={() => {
              setActiveModuleKey(null);
              setSelectedAnswers({});
            }}
            className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition mb-8 cursor-pointer"
          >
            ← Back to Main Menu
          </button>

          {/* Module Badges */}
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
          <p className="text-sm text-gray-500 mb-8">
            Total Questions: {currentModule.questions.length}
          </p>

          {/* List of Questions */}
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

                  {/* Options */}
                  <div className="space-y-3 mb-4">
                    {q.options.map((opt, optIdx) => {
                      let btnStyle =
                        "bg-white border-gray-200 text-gray-700 hover:border-[#55b1d4] hover:bg-[#55b1d4]/5";

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

                  {/* Explanation */}
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

  // MAIN HOMEPAGE / DASHBOARD VIEW
  return (
    <main className="min-h-screen bg-[#FAFAFA] text-gray-800 font-sans p-8 relative">
      {/* Navigation Header */}
      <nav className="max-w-6xl mx-auto flex justify-between items-center py-4 mb-10">
        <h1 className="text-3xl font-light text-[#E95599] tracking-wide">
          Future<span className="font-bold text-[#55b1d4]">English</span>
        </h1>
        <button className="bg-[#f2b705] text-white px-6 py-2 rounded-full font-medium shadow-sm hover:opacity-90 transition cursor-pointer">
          Get Started
        </button>
      </nav>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto text-center my-10">
        <h2 className="text-5xl font-light text-gray-900 mb-6 leading-tight">
          Learn English <span className="text-[#E95599] font-normal">Fun</span>,{" "}
          <span className="text-[#55b1d4] font-normal">Simple</span>, &{" "}
          <span className="text-[#f2b705] font-normal">Practical</span>
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Accessible, real-world English material sourced from Cambridge Assessment & verified professional standards.
        </p>

        {/* Topic Filters */}
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
      </section>

      {/* Level Selection Cards Grid */}
      <section className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
        {/* Kindergarten Card */}
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
              const isMatch = selectedTopic === "All" || item?.category === selectedTopic;
              return (
                <button
                  key={skill}
                  onClick={() => setActiveModuleKey(key)}
                  className={`p-2 rounded-lg border transition cursor-pointer font-medium ${
                    isMatch
                      ? "bg-gray-50 hover:bg-[#E95599] hover:text-white border-gray-200"
                      : "opacity-30 border-dashed border-gray-200 cursor-not-allowed"
                  }`}
                >
                  {skill} ({item?.questions.length || 0})
                </button>
              );
            })}
          </div>
        </div>

        {/* Junior High Card */}
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
              const isMatch = selectedTopic === "All" || item?.category === selectedTopic;
              return (
                <button
                  key={skill}
                  onClick={() => setActiveModuleKey(key)}
                  className={`p-2 rounded-lg border transition cursor-pointer font-medium ${
                    isMatch
                      ? "bg-gray-50 hover:bg-[#55b1d4] hover:text-white border-gray-200"
                      : "opacity-30 border-dashed border-gray-200 cursor-not-allowed"
                  }`}
                >
                  {skill} ({item?.questions.length || 0})
                </button>
              );
            })}
          </div>
        </div>

        {/* Advanced Card */}
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
              const isMatch = selectedTopic === "All" || item?.category === selectedTopic;
              return (
                <button
                  key={skill}
                  onClick={() => setActiveModuleKey(key)}
                  className={`p-2 rounded-lg border transition cursor-pointer font-medium ${
                    isMatch
                      ? "bg-gray-50 hover:bg-[#f2b705] hover:text-white border-gray-200"
                      : "opacity-30 border-dashed border-gray-200 cursor-not-allowed"
                  }`}
                >
                  {skill} ({item?.questions.length || 0})
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}