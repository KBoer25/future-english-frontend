"use client";

import { useState } from "react";
import { kindergartenData, UnitModule } from "../data/kindergarten";
import { primarySchoolData } from "../data/primarySchool";
import { juniorHighData } from "../data/juniorHigh";
import { seniorHighData } from "../data/seniorHigh";
import { c1AdvancedData } from "../data/c1Advanced";

export default function Home() {
  const [hasEntered, setHasEntered] = useState<boolean>(false);
  const [selectedLevel, setSelectedLevel] = useState<string>("Kindergarten");
  const [selectedTopic, setSelectedTopic] = useState<string>("Days, Months & Seasons");
  const [activeUnitId, setActiveUnitId] = useState<string | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});

  const levels = ["Kindergarten", "Primary School", "Junior High", "Senior High", "C1 Advanced"];

  const getTopicsForLevel = (lvl: string) => {
    if (lvl === "Kindergarten" || lvl === "Primary School") {
      return [
        "Days, Months & Seasons",
        "Nature & Flowers",
        "Family & Relationships",
        "Animals & Habitats",
        "Food & Healthy Eating",
        "Weather & Climate"
      ];
    }
    if (lvl === "Junior High" || lvl === "Senior High") {
      return [
        "Travel & Public Transit",
        "Digital Safety & Media",
        "Career Prep & Interviews",
        "Health, Sports & Wellness",
        "Environment & Ecology",
        "Science & Technology"
      ];
    }
    return [
      "Executive Corporate Strategy",
      "Epistemology & Philosophy",
      "Digital Infosphere & Ethics",
      "Global Economics & Markets",
      "Advanced Rhetoric & Nuance"
    ];
  };

  const topics = getTopicsForLevel(selectedLevel);

  // FETCH DATA FROM YOUR CLEAN DATA FILES
  const getUnitsForTopic = (lvl: string, top: string): UnitModule[] => {
    if (lvl === "Kindergarten" && kindergartenData[top]) {
      return kindergartenData[top];
    }
    if (lvl === "Primary School" && primarySchoolData[top]) {
      return primarySchoolData[top];
    }
    if (lvl === "Junior High" && juniorHighData[top]) {
      return juniorHighData[top];
    }
    if (lvl === "Senior High" && seniorHighData[top]) {
      return seniorHighData[top];
    }
    if (lvl === "C1 Advanced" && c1AdvancedData[top]) {
      return c1AdvancedData[top];
    }

    // SHORT & FUN CLEAN FALLBACK FOR UNFILLED TOPICS
    const fallbackUnits: UnitModule[] = [];
    for (let uNum = 1; uNum <= 3; uNum++) {
      fallbackUnits.push({
        id: `${lvl}_${top}_U${uNum}`.replace(/\s+/g, ""),
        unitNumber: uNum,
        title: `Unit ${uNum}: Fun Practice in ${top}`,
        summary: `Short lesson and 10 simple questions on ${top}.`,
        illustration: "⭐",
        accentColor: "bg-sky-50 border-sky-100 text-sky-600",
        paragraphs: [
          `Welcome to Unit ${uNum} of ${top}! Read the vocabulary and try the 10 quick questions below.`
        ],
        vocabulary: [
          { word: "Learn", phonetic: "/lɜːrn/", partOfSpeech: "Verb", definition: "Gain new skill or knowledge.", example: "We learn new words easily.", illustrationIcon: "💡" },
          { word: "Practice", phonetic: "/ˈpræktɪs/", partOfSpeech: "Verb", definition: "Do an activity regularly.", example: "Daily practice brings success!", illustrationIcon: "🎯" },
          { word: "Success", phonetic: "/səkˈsɛs/", partOfSpeech: "Noun", definition: "Achieving your learning goal.", example: "Great work completing this unit!", illustrationIcon: "🏆" }
        ],
        grammar: {
          ruleTitle: "Simple Clear Sentences",
          explanation: "Put your subject (who/what) first in sentences!",
          correctExample: "I study English every day.",
          incorrectExample: "Study English I every day.",
          tip: "Keep sentences direct and light!"
        },
        practicalApplication: `Tell a classmate one thing you learned about ${top}!`,
        questions: Array.from({ length: 10 }, (_, i) => ({
          id: i + 1,
          prompt: `Question ${i + 1}: What helps you learn ${top} quickly?`,
          options: [
            { label: `Reading short, simple lessons daily`, isCorrect: true },
            { label: `Skipping all study completely`, isCorrect: false },
            { label: `Guessing without reading`, isCorrect: false }
          ],
          explanation: "Short daily reading builds fast fluency!"
        }))
      });
    }
    return fallbackUnits;
  };

  const handleSelectOption = (qId: number, optIdx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const currentUnits = getUnitsForTopic(selectedLevel, selectedTopic);
  const activeUnit = currentUnits.find((u) => u.id === activeUnitId) || null;

  // LANDING PAGE VIEW
  if (!hasEntered) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#FAFAFA] via-pink-50/40 to-sky-50/40 text-gray-800 font-sans flex items-center justify-center p-6">
        <div className="max-w-2xl w-full bg-white/85 backdrop-blur-md rounded-3xl p-10 md:p-14 shadow-xl border border-gray-100 text-center relative overflow-hidden">
          <div className="text-6xl mb-6">🚀🌍✨</div>
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4 tracking-wide">
            Welcome to <span className="text-[#E95599] font-medium">Future</span><span className="font-bold text-[#55b1d4]">English</span>
          </h1>
          <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-lg mx-auto">
            Fun, simple English lessons with bite-sized readings, clear vocabulary, and short unit quizzes!
          </p>
          <button
            onClick={() => setHasEntered(true)}
            className="w-full md:w-auto px-10 py-4 bg-gradient-to-r from-[#E95599] to-[#55b1d4] hover:opacity-95 text-white font-bold text-lg rounded-2xl shadow-lg transition cursor-pointer"
          >
            Start Learning Now →
          </button>
        </div>
      </main>
    );
  }

  // ACTIVE UNIT LESSON VIEW
  if (activeUnit) {
    const totalQ = activeUnit.questions.length;
    const answeredQ = activeUnit.questions.filter((q) => selectedAnswers[q.id] !== undefined).length;
    const isQuizComplete = totalQ > 0 && answeredQ === totalQ;
    const correctScore = activeUnit.questions.reduce((acc, q) => {
      const selectedOpt = selectedAnswers[q.id];
      return selectedOpt !== undefined && q.options[selectedOpt]?.isCorrect ? acc + 1 : acc;
    }, 0);

    return (
      <main className="min-h-screen bg-[#FAFAFA] text-gray-800 font-sans p-6 md:p-12">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-14 shadow-sm border border-gray-200">
          <button
            onClick={() => {
              setActiveUnitId(null);
              setSelectedAnswers({});
            }}
            className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition mb-8 cursor-pointer"
          >
            ← Back to Units List
          </button>

          <div className="flex flex-wrap gap-2 mb-6">
            <span className="bg-[#55b1d4]/10 text-[#55b1d4] text-xs font-bold px-3 py-1 rounded-full">
              {selectedLevel}
            </span>
            <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">
              {selectedTopic}
            </span>
            <span className="bg-pink-100 text-[#E95599] text-xs font-bold px-3 py-1 rounded-full">
              Unit {activeUnit.unitNumber}
            </span>
          </div>

          <div className="text-5xl mb-4">{activeUnit.illustration}</div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{activeUnit.title}</h2>
          <p className="text-gray-600 text-base md:text-lg mb-10 pb-8 border-b border-gray-100 leading-relaxed">
            {activeUnit.summary}
          </p>

          <div className="space-y-10">
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#55b1d4]">
                📖 Short Reading & Explanation
              </h3>
              {activeUnit.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="text-base md:text-lg text-gray-700 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            <div className="bg-pink-50/40 p-6 md:p-8 rounded-3xl border border-pink-100 space-y-4">
              <h3 className="text-xs font-bold text-[#E95599] uppercase tracking-wider block">
                ✦ Key Vocabulary:
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {activeUnit.vocabulary.map((vocab, vIdx) => (
                  <div key={vIdx} className="bg-white p-5 rounded-2xl border border-pink-100 shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-900 flex items-center gap-2 text-base">
                        <span className="text-2xl">{vocab.illustrationIcon}</span> {vocab.word}
                      </span>
                      <span className="text-xs bg-pink-100 text-[#E95599] font-semibold px-2 py-0.5 rounded">
                        {vocab.partOfSpeech}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 font-mono">{vocab.phonetic}</p>
                    <p className="text-xs text-gray-700 mt-1"><strong>Definition:</strong> {vocab.definition}</p>
                    <p className="text-xs text-gray-600 italic mt-1 bg-gray-50 p-2.5 rounded">"{vocab.example}"</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-amber-50/50 p-6 md:p-8 rounded-3xl border border-amber-200 space-y-4">
              <h3 className="text-xs font-bold text-amber-900 uppercase tracking-wider block">
                ✦ Quick Grammar Rule: {activeUnit.grammar.ruleTitle}
              </h3>
              <p className="text-sm md:text-base text-amber-950 leading-relaxed">{activeUnit.grammar.explanation}</p>
              <div className="grid md:grid-cols-2 gap-4 pt-2">
                <div className="bg-green-50 p-4 rounded-2xl border border-green-200 text-xs md:text-sm text-green-900">
                  <strong className="block text-green-950 mb-1">✓ Correct:</strong>
                  {activeUnit.grammar.correctExample}
                </div>
                <div className="bg-red-50 p-4 rounded-2xl border border-red-200 text-xs md:text-sm text-red-900">
                  <strong className="block text-red-950 mb-1">✗ Avoid:</strong>
                  {activeUnit.grammar.incorrectExample}
                </div>
              </div>
              <p className="text-xs md:text-sm bg-amber-100/70 p-4 rounded-xl text-amber-900 font-medium mt-2">
                💡 <strong>Tip:</strong> {activeUnit.grammar.tip}
              </p>
            </div>

            <div className="pt-10 border-t-2 border-dashed border-gray-200 space-y-8">
              <div className="text-center bg-sky-50/70 p-6 rounded-3xl border border-sky-100">
                <span className="text-3xl mb-2 block">📝</span>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">End-of-Unit Quiz</h3>
                <p className="text-sm text-gray-600">Test what you learned in Unit {activeUnit.unitNumber}!</p>
              </div>

              {isQuizComplete && (
                <div className="p-8 rounded-3xl bg-gradient-to-r from-pink-50 via-sky-50 to-amber-50 border-2 border-[#55b1d4]/30 text-center shadow-md">
                  <div className="text-5xl mb-3">🎉🏆✨</div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">Quiz Completed!</h4>
                  <p className="text-lg text-gray-700 font-medium mb-4">
                    You scored <span className="text-[#E95599] font-bold">{correctScore}</span> out of <span className="font-bold">{totalQ}</span>!
                  </p>
                  <button
                    onClick={() => setSelectedAnswers({})}
                    className="bg-gray-900 hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-2xl transition cursor-pointer text-sm shadow-sm"
                  >
                    🔄 Retake Quiz
                  </button>
                </div>
              )}

              <div className="space-y-10">
                {activeUnit.questions.map((q, qIndex) => {
                  const selectedOptIdx = selectedAnswers[q.id];

                  return (
                    <div key={q.id} className="border border-gray-100 bg-gray-50/50 p-6 md:p-8 rounded-3xl shadow-xs">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-bold text-[#55b1d4] uppercase tracking-wider block">
                          Question {qIndex + 1} of {totalQ}
                        </span>
                      </div>
                      
                      <div className="text-gray-900 font-semibold text-base md:text-lg mb-6 leading-relaxed">
                        {q.prompt}
                      </div>

                      <div className="space-y-3 mb-4">
                        {q.options.map((opt, optIdx) => {
                          let btnStyle = "bg-white border-gray-200 text-gray-700 hover:border-[#55b1d4]";

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
                              className={`w-full py-3.5 px-5 rounded-2xl border-2 transition text-left text-sm md:text-base font-semibold cursor-pointer ${btnStyle}`}
                            >
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>

                      {selectedOptIdx !== undefined && (
                        <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-100 text-xs md:text-sm text-blue-900 leading-relaxed mt-4">
                          <span className="font-bold block mb-1">Explanation:</span>
                          {q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // TWO-COLUMN SIDEBAR DASHBOARD
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-gray-800 font-sans flex flex-col md:flex-row">
      <aside className="w-full md:w-80 bg-white border-r border-gray-200 p-6 flex flex-col shrink-0 md:sticky md:top-0 md:h-screen overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-light text-[#E95599] tracking-wide">
            Future<span className="font-bold text-[#55b1d4]">English</span>
          </h1>
          <p className="text-xs text-gray-400 mt-1">Interactive Learning Portal</p>
        </div>

        <div className="mb-8">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">1. School Level</h3>
          <div className="flex flex-col gap-1.5">
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
                className={`w-full text-left px-4 py-2.5 rounded-2xl text-xs font-semibold transition cursor-pointer flex justify-between items-center ${
                  selectedLevel === lvl
                    ? "bg-[#55b1d4] text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span>{lvl}</span>
                {selectedLevel === lvl && <span>✓</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">2. Curriculum Topic</h3>
          <div className="flex flex-col gap-1.5">
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                className={`w-full text-left px-4 py-2.5 rounded-2xl text-xs font-medium transition cursor-pointer flex justify-between items-center ${
                  selectedTopic === topic
                    ? "bg-gray-900 text-white shadow-sm font-semibold"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span>{topic}</span>
                {selectedTopic === topic && <span className="text-xs">→</span>}
              </button>
            ))}
          </div>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-10 max-w-5xl overflow-y-auto">
        <header className="bg-gradient-to-r from-pink-50/60 via-sky-50/60 to-amber-50/60 p-8 rounded-3xl border border-gray-200/80 mb-8">
          <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-2">
            Learn English <span className="text-[#E95599] font-normal">Fun</span> & <span className="text-[#55b1d4] font-normal">Simple</span>
          </h2>
          <p className="text-xs md:text-sm text-gray-600 leading-relaxed max-w-xl">
            Select a unit for <strong>{selectedTopic}</strong> ({selectedLevel}). Read the short passage, review vocabulary, and complete the 10-question check.
          </p>
        </header>

        <section>
          <div className="grid md:grid-cols-3 gap-5">
            {currentUnits.map((unit) => (
              <div
                key={unit.id}
                onClick={() => {
                  setActiveUnitId(unit.id);
                  setSelectedAnswers({});
                }}
                className="bg-white p-6 rounded-3xl border border-gray-200 hover:border-[#55b1d4] hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="bg-pink-100 text-[#E95599] text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                      Unit {unit.unitNumber}
                    </span>
                    <span className="text-2xl">{unit.illustration}</span>
                  </div>
                  <h4 className="text-base font-bold text-gray-900 mb-2 group-hover:text-[#55b1d4] transition">
                    {unit.title}
                  </h4>
                  <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                    {unit.summary}
                  </p>
                </div>
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#55b1d4]">
                  <span>Start Lesson</span>
                  <span>→</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}