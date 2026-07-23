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

    // ADVANCED (Official Cambridge C1 CAE Materials)
    "Advanced-Reading": {
      title: "C1 Advanced: Multiple-Choice Cloze",
      image: "📖",
      category: "Academic & Debate",
      source: "Cambridge Certificate in Advanced English (CAE Test 1)",
      prompt: 'Extract from "Girls and Technology":\n"If you want your daughter to succeed, buy her a toy construction set. That is the _____ from Britain\'s foremost female engineers and scientists."',
      options: [
        { label: "instruction", isCorrect: false },
        { label: "information", isCorrect: false },
        { label: "opinion", isCorrect: false },
        { label: "advice", isCorrect: true },
      ],
      explanation: "Official Cambridge Key: 'Advice' is the correct collocate and noun used here in the context of professional guidance.",
    },
    "Advanced-Writing": {
      title: "C1 Advanced: Word Formation",
      image: "✒️",
      category: "Academic & Debate",
      source: "Cambridge Certificate in Advanced English (CAE Test 1)",
      prompt: 'Text: "Freud and Dreams"\n"Sigmund Freud is regarded as the _____ (FOUND) of psychoanalysis. His work has been influential in many areas..."',
      options: [
        { label: "FOUNDER", isCorrect: true },
        { label: "FOUNDATION", isCorrect: false },
        { label: "FOUNDING", isCorrect: false },
      ],
      explanation: "Official Cambridge Key: The noun required for a person who creates or establishes something is 'FOUNDER'.",
    },
    "Advanced-Listening": {
      title: "C1 Advanced: Audio Comprehension",
      image: "💼",
      category: "Job Interviews",
      source: "Cambridge C1 Advanced Listening (Test 1 Extract 1)",
      prompt: 'Context: Two friends discuss college selection and marketing campaigns.\nQuestion: What point does the woman make regarding corporate charity sponsorships?',
      options: [
        { label: "They increase retail sales significantly.", isCorrect: false },
        { label: "Companies use them primarily to appear softer in the public eye.", isCorrect: true },
        { label: "Consumers prefer companies that ignore charities.", isCorrect: false },
      ],
      explanation: "Official Cambridge Key: The speaker notes that companies make noise about charity credentials mainly to look 'softer in the public eye'.",
    },
    "Advanced-Speaking": {
      title: "C1 Advanced: Collaborative Negotiation",
      image: "🎙️",
      category: "Academic & Debate",
      source: "Cambridge C1 Advanced Speaking (Paper 4)",
      prompt: 'Scenario: Discussing ways of communicating.\nHow should a candidate effectively initiate a collaborative negotiation on which communication method is least effective?',
      options: [
        { label: "Shall we start by evaluating face-to-face meetings versus video conferencing?", isCorrect: true },
        { label: "I think video conferencing is terrible.", isCorrect: false },
        { label: "You decide first.", isCorrect: false },
      ],
      explanation: "Official Cambridge Key: Initiating with structured, polite prompts like 'Shall we start by...?' demonstrates high interactive communication scores.",
    },
  };

  const handleOpenModule = (level: string, skill: string) => {
    setActiveModule({ level, skill });
    setSelectedOption(null);
  };

  const currentData = activeModule ? materials[`${activeModule.level}-${activeModule.skill}`] : null;

  // IF A MODULE IS SELECTED: Render Dedicated Focused Page View
  if (activeModule && currentData) {
    return (
      <main className="min-h-screen bg-[#FAFAFA] text-gray-800 font-sans p-6 md:p-12">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-200">
          
          {/* Top Navigation Bar */}
          <button
            onClick={() => setActiveModule(null)}
            className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition mb-8 cursor-pointer"
          >
            ← Back to Main Menu
          </button>

          {/* Module Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">
              {activeModule.level.toUpperCase()} • {activeModule.skill.toUpperCase()}
            </span>
            <span className="bg-[#55b1d4]/10 text-[#55b1d4] text-xs font-semibold px-3 py-1 rounded-full">
              {currentData.source}
            </span>
          </div>

          {/* Module Header */}
          <div className="text-6xl mb-4">{currentData.image}</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{currentData.title}</h2>

          {/* Exercise Prompt */}
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 text-gray-800 font-medium mb-8 whitespace-pre-line leading-relaxed">
            {currentData.prompt}
          </div>

          {/* Options List */}
          <div className="space-y-4 mb-8">
            {currentData.options.map((opt, idx) => {
              let btnStyle = "bg-white border-gray-200 text-gray-700 hover:border-[#55b1d4] hover:bg-[#55b1d4]/5";

              if (selectedOption !== null) {
                if (idx === selectedOption) {
                  btnStyle = opt.isCorrect
                    ? "bg-green-500 text-white border-green-500 shadow-md"
                    : "bg-red-500 text-white border-red-500 shadow-md";
                } else if (opt.isCorrect) {
                  btnStyle = "bg-green-100 border-green-400 text-green-800";
                }
              }

              return (
                <button
                  key={idx}
                  disabled={selectedOption !== null}
                  onClick={() => setSelectedOption(idx)}
                  className={`w-full py-4 px-6 rounded-2xl border-2 transition text-left text-base font-semibold cursor-pointer ${btnStyle}`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          {/* Answer Explanation & Source Notes */}
          {selectedOption !== null && (
            <div className="p-6 rounded-2xl bg-blue-50/60 border border-blue-100 text-sm text-blue-900 leading-relaxed">
              <span className="font-bold text-blue-950 block mb-1">Answer Analysis:</span>
              {currentData.explanation}
            </div>
          )}
        </div>
      </main>
    );
  }

  // DEFAULT VIEW: Main Homepage / Dashboard
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
          <h3 className="text-xl font-medium text-gray-800 mb-2">Cambridge B1 Materials</h3>
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
            C1 ADVANCED (CAE)
          </span>
          <h3 className="text-xl font-medium text-gray-800 mb-2">Cambridge C1 Materials</h3>
          <p className="text-sm text-gray-500 mb-6">Authentic Cambridge CAE multiple choice cloze, word formation, & listening.</p>
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
    </main>
  );
}