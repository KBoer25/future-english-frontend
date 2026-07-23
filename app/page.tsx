"use client";

import { useState } from "react";

type Material = {
  title: string;
  image: string;
  category: string;
  source: string;
  prompt: string;
  options: { label: string; isCorrect: boolean }[];
  explanation: string;
};

export default function Home() {
  const [activeModule, setActiveModule] = useState<{ level: string; skill: string } | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string>("All");

  const topics = ["All", "Daily Life", "Social Media", "Job Interviews", "Academic & Debate"];

  const materials: Record<string, Material> = {
    // KINDERGARTEN (Basic Foundations)
    "Kindergarten-Reading": {
      title: "Kindergarten: Weather & Words",
      image: "☀️",
      category: "Daily Life",
      source: "Basic EFL Standard",
      prompt: "Look at the picture. What is the weather like today?",
      options: [
        { label: "It is Sunny", isCorrect: true },
        { label: "It is Rainy", isCorrect: false },
        { label: "It is Cold", isCorrect: false },
      ],
      explanation: "Great job! The sun icon ☀️ means it is Sunny!",
    },
    "Kindergarten-Writing": {
      title: "Kindergarten: Fruit Spelling",
      image: "🍎",
      category: "Daily Life",
      source: "Basic EFL Standard",
      prompt: "Complete the word for this fruit: A _ P L E",
      options: [
        { label: "P (APPLE)", isCorrect: true },
        { label: "B (ABLE)", isCorrect: false },
        { label: "T (ATPLE)", isCorrect: false },
      ],
      explanation: "Awesome! Apple starts with A-P-P-L-E.",
    },
    "Kindergarten-Listening": {
      title: "Kindergarten: Animal Sounds",
      image: "🐱",
      category: "Daily Life",
      source: "Basic EFL Standard",
      prompt: 'Listen to the sound context: "Meow! Meow!" Which animal makes this sound?',
      options: [
        { label: "A Dog", isCorrect: false },
        { label: "A Cat", isCorrect: true },
        { label: "A Duck", isCorrect: false },
      ],
      explanation: "Spot on! Cats say 'Meow!'",
    },
    "Kindergarten-Speaking": {
      title: "Kindergarten: Morning Greetings",
      image: "👋",
      category: "Daily Life",
      source: "Basic EFL Standard",
      prompt: "When you meet a friend in the morning, what do you say?",
      options: [
        { label: "Good Morning!", isCorrect: true },
        { label: "Good Night!", isCorrect: false },
        { label: "Goodbye!", isCorrect: false },
      ],
      explanation: "Perfect! We say 'Good Morning' when the sun comes up.",
    },

    // JUNIOR HIGH (Official Cambridge B1 Preliminary Materials)
    "Junior High-Reading": {
      title: "Junior High: Cinema Text Message",
      image: "📱",
      category: "Social Media",
      source: "Cambridge Assessment English (PET Reading Part 1)",
      prompt: 'Message from Stefan to Peter: "We\'re outside the cinema. Text if you\'re going to be late and we\'ll wait and watch the next film. If you\'re not coming, we\'ll go in now." What should Peter do?',
      options: [
        { label: "Let Stefan know if he is delayed", isCorrect: true },
        { label: "Tell Stefan which film he wants to watch", isCorrect: false },
        { label: "Wait for Stefan inside the cinema", isCorrect: false },
      ],
      explanation: "Official Cambridge Key: Stefan asks Peter to text if he is 'going to be late' so they know whether to wait for the next film.",
    },
    "Junior High-Writing": {
      title: "Junior High: Sentence Transformations",
      image: "✍️",
      category: "Daily Life",
      source: "Cambridge Assessment English (PET Writing Part 1)",
      prompt: 'Original: "Niko really enjoys playing basketball."\nRewrite: "Niko is very keen _______ basketball."',
      options: [
        { label: "on", isCorrect: true },
        { label: "in", isCorrect: false },
        { label: "about", isCorrect: false },
      ],
      explanation: "Official Cambridge Key: The adjective phrase 'keen on' means to enjoy or be enthusiastic about something.",
    },
    "Junior High-Listening": {
      title: "Junior High: Author Interview",
      image: "🎙️",
      category: "Daily Life",
      source: "Cambridge Assessment English (PET Listening Part 2)",
      prompt: 'Interview with 13-year-old Sally: "My penfriend was moving to a new city... so I wrote down some advice for her. She said I should write a little book for other kids." Why did Sally write her first book?',
      options: [
        { label: "Her family bought her a diary", isCorrect: false },
        { label: "People said her stories were good", isCorrect: false },
        { label: "Her penfriend suggested it", isCorrect: true },
      ],
      explanation: "Official Cambridge Key: Sally explicitly mentions that her penfriend suggested turning her advice notes into a book.",
    },
    "Junior High-Speaking": {
      title: "Junior High: Collaborative Discussion",
      image: "🗣️",
      category: "Academic & Debate",
      source: "Cambridge Assessment English (PET Speaking Part 2)",
      prompt: 'Scenario: A classmate is moving abroad, and your class wants to buy a farewell gift. How do you suggest an idea collaboratively?',
      options: [
        { label: "What about giving him a photo album of our class?", isCorrect: true },
        { label: "Buy him a computer game now.", isCorrect: false },
        { label: "I don't know what to buy.", isCorrect: false },
      ],
      explanation: "Official Cambridge Key: Using collaborative openers like 'What about...?' invites turn-taking and discussion with your partner.",
    },

    // ADVANCED (Career, STAR Interviews & Debates)
    "Advanced-Reading": {
      title: "Advanced: Rhetorical Tone Analysis",
      image: "🏛️",
      category: "Academic & Debate",
      source: "Academic Literary Standard",
      prompt: 'Analyze the tone: "The relentless clock ticked away, counting down the fleeting hours of opportunity."',
      options: [
        { label: "Joyful and relaxed", isCorrect: false },
        { label: "Urgent and apprehensive", isCorrect: true },
        { label: "Indifferent and bored", isCorrect: false },
      ],
      explanation: "Words like 'relentless' and 'fleeting' evoke time pressure and tension.",
    },
    "Advanced-Writing": {
      title: "Advanced: Essay Transitions",
      image: "✒️",
      category: "Academic & Debate",
      source: "Academic Writing Standard",
      prompt: "Which transition best introduces a counter-argument in formal academic writing?",
      options: [
        { label: "Conversely, recent studies suggest...", isCorrect: true },
        { label: "Also another thing is...", isCorrect: false },
        { label: "By the way...", isCorrect: false },
      ],
      explanation: "'Conversely' explicitly signals a formal structural pivot in academic arguments.",
    },
    "Advanced-Listening": {
      title: "Advanced: Executive STAR Method",
      image: "💼",
      category: "Job Interviews",
      source: "Professional Career Standard",
      prompt: "Answering: 'Tell me about a high-pressure situation.' Which answer effectively utilizes the STAR method?",
      options: [
        { label: "I usually avoid high-pressure situations.", isCorrect: false },
        { label: "When our system crashed, I re-routed the data pipeline, restoring access in 30 mins.", isCorrect: true },
        { label: "My team was stressed, but we eventually finished.", isCorrect: false },
      ],
      explanation: "Effective STAR answers provide Situation, Task, Action, and quantifiable Results.",
    },
    "Advanced-Speaking": {
      title: "Advanced: Rebutting Assumptions",
      image: "🎙️",
      category: "Academic & Debate",
      source: "Parliamentary Debate Standard",
      prompt: "How do you professionally address a logical flaw in an opponent's argument?",
      options: [
        { label: "While that premise holds in isolation, empirical data demonstrates...", isCorrect: true },
        { label: "That argument makes zero sense.", isCorrect: false },
        { label: "Let's change the topic completely.", isCorrect: false },
      ],
      explanation: "Highlighting conditions under which a premise fails shows advanced analytical capability.",
    },
  };

  const handleOpenModule = (level: string, skill: string) => {
    setActiveModule({ level, skill });
    setSelectedOption(null);
  };

  const currentData = activeModule ? materials[`${activeModule.level}-${activeModule.skill}`] : null;

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

        {/* Goal / Topic Switcher Pills */}
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

      {/* Level Selection Cards */}
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
              const item = materials[`Kindergarten-${skill}`];
              const isMatch = selectedTopic === "All" || item?.category === selectedTopic;
              return (
                <button
                  key={skill}
                  onClick={() => handleOpenModule("Kindergarten", skill)}
                  className={`p-2 rounded-lg border transition cursor-pointer font-medium ${
                    isMatch
                      ? "bg-gray-50 hover:bg-[#E95599] hover:text-white border-gray-200"
                      : "opacity-30 border-dashed border-gray-200 cursor-not-allowed"
                  }`}
                >
                  {skill}
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
          <h3 className="text-xl font-medium text-gray-800 mb-2">Cambridge Materials</h3>
          <p className="text-sm text-gray-500 mb-6">Verified Cambridge English PET reading, writing, and interview dialogs.</p>
          <div className="grid grid-cols-2 gap-2 text-center text-xs text-gray-600">
            {["Reading", "Writing", "Listening", "Speaking"].map((skill) => {
              const item = materials[`Junior High-${skill}`];
              const isMatch = selectedTopic === "All" || item?.category === selectedTopic;
              return (
                <button
                  key={skill}
                  onClick={() => handleOpenModule("Junior High", skill)}
                  className={`p-2 rounded-lg border transition cursor-pointer font-medium ${
                    isMatch
                      ? "bg-gray-50 hover:bg-[#55b1d4] hover:text-white border-gray-200"
                      : "opacity-30 border-dashed border-gray-200 cursor-not-allowed"
                  }`}
                >
                  {skill}
                </button>
              );
            })}
          </div>
        </div>

        {/* Advanced Card */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
          <span className="inline-block bg-[#f2b705]/10 text-[#f2b705] text-xs font-semibold px-3 py-1 rounded-full mb-4">
            ADVANCED
          </span>
          <h3 className="text-xl font-medium text-gray-800 mb-2">Academic & Career</h3>
          <p className="text-sm text-gray-500 mb-6">STAR Method interviews, academic essay transitions, and debate logic.</p>
          <div className="grid grid-cols-2 gap-2 text-center text-xs text-gray-600">
            {["Reading", "Writing", "Listening", "Speaking"].map((skill) => {
              const item = materials[`Advanced-${skill}`];
              const isMatch = selectedTopic === "All" || item?.category === selectedTopic;
              return (
                <button
                  key={skill}
                  onClick={() => handleOpenModule("Advanced", skill)}
                  className={`p-2 rounded-lg border transition cursor-pointer font-medium ${
                    isMatch
                      ? "bg-gray-50 hover:bg-[#f2b705] hover:text-white border-gray-200"
                      : "opacity-30 border-dashed border-gray-200 cursor-not-allowed"
                  }`}
                >
                  {skill}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Modal Pop-up */}
      {activeModule && currentData && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl border border-gray-100 relative text-center">
            <button
              onClick={() => setActiveModule(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer"
            >
              ✕
            </button>

            <div className="flex justify-center gap-2 mb-3">
              <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full">
                {currentData.category}
              </span>
              <span className="bg-[#55b1d4]/10 text-[#55b1d4] text-xs font-semibold px-3 py-1 rounded-full">
                {currentData.source}
              </span>
            </div>

            <div className="text-5xl mb-3">{currentData.image}</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{currentData.title}</h3>
            <p className="text-gray-600 mb-6 text-sm whitespace-pre-line text-left bg-gray-50 p-4 rounded-xl border border-gray-100">
              {currentData.prompt}
            </p>

            <div className="space-y-3 mb-6">
              {currentData.options.map((opt, idx) => {
                let btnStyle = "border-gray-200 text-gray-700 hover:border-[#55b1d4] hover:bg-[#55b1d4]/5";

                if (selectedOption !== null) {
                  if (idx === selectedOption) {
                    btnStyle = opt.isCorrect
                      ? "bg-green-500 text-white border-green-500"
                      : "bg-red-500 text-white border-red-500";
                  } else if (opt.isCorrect) {
                    btnStyle = "bg-green-100 border-green-400 text-green-800";
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={selectedOption !== null}
                    onClick={() => setSelectedOption(idx)}
                    className={`w-full py-3 px-4 rounded-xl border transition text-left text-sm font-medium cursor-pointer ${btnStyle}`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>

            {selectedOption !== null && (
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 text-xs text-gray-700 text-left">
                <strong>Source Notes:</strong> {currentData.explanation}
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}