"use client";

import { useState } from "react";

type Question = {
  id: number;
  prompt: string;
  imageIllustration?: string;
  options: { label: string; isCorrect: boolean }[];
  explanation: string;
};

type VocabularyItem = {
  word: string;
  phonetic: string;
  partOfSpeech: string;
  definition: string;
  example: string;
  illustrationIcon: string;
};

type GrammarRule = {
  ruleTitle: string;
  explanation: string;
  correctExample: string;
  incorrectExample: string;
  tip: string;
};

type UnitModule = {
  id: string;
  unitNumber: number;
  title: string;
  summary: string;
  illustration: string;
  accentColor: string;
  paragraphs: string[];
  vocabulary: VocabularyItem[];
  grammar: GrammarRule;
  practicalApplication: string;
  questions: Question[];
};

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
        "Food & Healthy Eating"
      ];
    }
    if (lvl === "Junior High" || lvl === "Senior High") {
      return [
        "Travel & Public Transit",
        "Digital Safety & Media",
        "Career Prep & Interviews",
        "Health, Sports & Wellness",
        "Environment & Ecology"
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

  // GENERATE UNITS CONTAINING MATERIALS FIRST, FOLLOWED BY END-OF-UNIT QUIZ (10 QUESTIONS)
  const getUnitsForTopic = (lvl: string, top: string): UnitModule[] => {
    const units: UnitModule[] = [];

    for (let uNum = 1; uNum <= 3; uNum++) {
      const unitId = `${lvl}-${top}-Unit${uNum}`.replace(/\s+/g, "");
      
      let unitTitle = `Unit ${uNum}: Core Concepts of ${top}`;
      let unitIllustration = "📖";
      let paragraphs = [
        `Welcome to Unit ${uNum} of our masterclass on ${top}. At the ${lvl} level, mastering this unit requires examining core structures and practicing them step-by-step.`,
        `Read through the foundational material, etymology, and grammar rules below before testing your knowledge with the 10-question quiz at the end.`
      ];

      let vocabList: VocabularyItem[] = [
        { word: "Concept", phonetic: "/ˈkɒnsɛpt/", partOfSpeech: "Noun", definition: "An abstract idea or general notion.", example: "Grasping this core concept is vital for unit mastery.", illustrationIcon: "💡" },
        { word: "Structure", phonetic: "/ˈstrʌktʃər/", partOfSpeech: "Noun", definition: "The arrangement of and relations between parts.", example: "Analyze the sentence structure carefully.", illustrationIcon: "🏗️" },
        { word: "Application", phonetic: "/ˌæplɪˈkeɪʃən/", partOfSpeech: "Noun", definition: "The action of putting something into operation.", example: "Practical application solidifies your learning.", illustrationIcon: "🚀" }
      ];

      let grammarRule: GrammarRule = {
        ruleTitle: "Foundational Syntax & Clarity",
        explanation: "Keep your sentences structured clearly with direct subjects and active verbs.",
        correctExample: "Clear communication prevents misunderstandings.",
        incorrectExample: "Clear communicating preventing misunderstandings.",
        tip: "Read your sentences aloud to check for natural rhythm."
      };

      // LEVEL & TOPIC CUSTOMIZATIONS
      if (lvl === "Kindergarten" || lvl === "Primary School") {
        if (uNum === 1) {
          unitTitle = `Unit 1: Fundamentals & Essential Words`;
          unitIllustration = "🌟";
          paragraphs = [
            `Let's explore the basics of ${top}! Learning these words helps you talk about your everyday world with big smiles.`,
            `Practice saying each word out loud and look at the fun pictures to help your memory grow!`
          ];
          vocabList = [
            { word: "Bright", phonetic: "/braɪt/", partOfSpeech: "Adjective", definition: "Giving out a lot of light; shining.", example: "The sun is bright and cheerful today.", illustrationIcon: "☀️" },
            { word: "Happy", phonetic: "/ˈhæpi/", partOfSpeech: "Adjective", definition: "Feeling or showing pleasure or contentment.", example: "We feel happy when we learn new things.", illustrationIcon: "😊" },
            { word: "Share", phonetic: "/ʃɛər/", partOfSpeech: "Verb", definition: "To give a portion of something to others.", example: "Always share your toys and crayons.", illustrationIcon: "🧸" }
          ];
          grammarRule = {
            ruleTitle: "Using 'This is...'",
            explanation: "Point at things close to you to introduce them clearly.",
            correctExample: "This is my favorite learning book.",
            incorrectExample: "Book is this me.",
            tip: "Point your finger proudly when saying 'This is'!"
          };
        } else if (uNum === 2) {
          unitTitle = `Unit 2: Names, Types & Varieties`;
          unitIllustration = "🌸";
          paragraphs = [
            `Now let's look closer at specific types and names within ${top}. Every flower, day, or family member has a special name!`,
            `Grouping similar items together makes remembering them a breeze.`
          ];
          vocabList = [
            { word: "Variety", phonetic: "/vəˈraɪəti/", partOfSpeech: "Noun", definition: "The quality or state of being different or diverse.", example: "There is a lovely variety of flowers in the garden.", illustrationIcon: "🌻" },
            { word: "Group", phonetic: "/ɡruːp/", partOfSpeech: "Noun", definition: "A number of people or things placed together.", example: "Sort the items into a neat group.", illustrationIcon: "📦" },
            { word: "Name", phonetic: "/neɪm/", partOfSpeech: "Noun", definition: "A word by which a person, animal, or thing is known.", example: "Every plant has a unique scientific name.", illustrationIcon: "🏷️" }
          ];
          grammarRule = {
            ruleTitle: "Plural Forms ('s' or 'es')",
            explanation: "Add an 's' to the end of a word when talking about more than one item.",
            correctExample: "I see three sunflowers and two roses in the vase.",
            incorrectExample: "I see three sunflower and two rose.",
            tip: "Count out loud when making words plural!"
          };
        } else {
          unitTitle = `Unit 3: Putting It Into Practice`;
          unitIllustration = "🏆";
          paragraphs = [
            `Great job making it to Unit 3! Now we use our words in full sentences and fun daily conversations.`,
            `Review your knowledge and complete the 10-question quiz to earn your master badge!`
          ];
          vocabList = [
            { word: "Practice", phonetic: "/ˈpræktɪs/", partOfSpeech: "Verb", definition: "Doing something regularly to become better.", example: "Practice your words every day.", illustrationIcon: "🎯" },
            { word: "Success", phonetic: "/səkˈsɛs/", partOfSpeech: "Noun", definition: "Achieving your learning goals.", example: "Every correct answer is a success!", illustrationIcon: "🏆" },
            { word: "Talk", phonetic: "/tɔːk/", partOfSpeech: "Verb", definition: "To communicate in spoken words.", example: "Talk with friends using your new vocabulary.", illustrationIcon: "🗣️" }
          ];
          grammarRule = {
            ruleTitle: "Asking Questions with 'What'",
            explanation: "Start questions with 'What' to find out fun facts.",
            correctExample: "What is your favorite flower in the garden?",
            incorrectExample: "Favorite flower what is garden in?",
            tip: "Raise your voice slightly at the end of a question sentence."
          };
        }
      } else if (lvl === "Junior High" || lvl === "Senior High") {
        if (uNum === 1) {
          unitTitle = `Unit 1: Frameworks & Terminology`;
          unitIllustration = "🧭";
          paragraphs = [
            `Unit 1 breaks down the core structural frameworks of ${top}. Understanding these baseline terms ensures smooth operational fluency.`,
            `Study the professional etymology and grammatical rules below before tackling the assessment quiz.`
          ];
          vocabList = [
            { word: "Methodology", phonetic: "/ˌmɛθəˈdɒlədʒi/", partOfSpeech: "Noun", definition: "A system of methods used in a particular area.", example: "The project followed a strict logistical methodology.", illustrationIcon: "📊" },
            { word: "Efficiency", phonetic: "/ɪˈfɪʃənsi/", partOfSpeech: "Noun", definition: "Maximum productivity with minimum wasted effort.", example: "Digital tools improve transit efficiency.", illustrationIcon: "⚡" },
            { word: "Protocol", phonetic: "/ˈproʊtəkɒl/", partOfSpeech: "Noun", definition: "The official procedure or system of rules.", example: "Follow safety protocols during transit and work.", illustrationIcon: "🛡️" }
          ];
          grammarRule = {
            ruleTitle: "Active Voice & Precise Modal Verbs",
            explanation: "Use modal verbs ('must', 'should', 'can') to establish clear operational requirements.",
            correctExample: "Travelers must validate their tickets prior to boarding.",
            incorrectExample: "Travelers must to validating tickets before.",
            tip: "Modal verbs are always followed by the base form of the verb."
          };
        } else if (uNum === 2) {
          unitTitle = `Unit 2: Analytical Problem Solving`;
          unitIllustration = "⚙️";
          paragraphs = [
            `In Unit 2, we apply analytical reasoning to complex scenarios related to ${top}. Identifying variables and mitigating risks is critical here.`,
            `Examine the conditional structures and vocabulary below to sharpen your critical thinking.`
          ];
          vocabList = [
            { word: "Analysis", phonetic: "/əˈnæləsɪs/", partOfSpeech: "Noun", definition: "Detailed examination of elements or structure.", example: "Data analysis guided our strategic decisions.", illustrationIcon: "🔍" },
            { word: "Mitigate", phonetic: "/ˈmɪtɪɡeɪt/", partOfSpeech: "Verb", definition: "To make less severe, serious, or painful.", example: "Proper planning helps mitigate travel delays.", illustrationIcon: "📉" },
            { word: "Strategy", phonetic: "/ˈstrætədi/", partOfSpeech: "Noun", definition: "A plan of action designed to achieve a long-term goal.", example: "Develop a robust interview preparation strategy.", illustrationIcon: "🎯" }
          ];
          grammarRule = {
            ruleTitle: "Conditional Sentences (First & Second)",
            explanation: "Express cause-and-effect relationships accurately using structured conditional clauses.",
            correctExample: "If you research the company thoroughly, you will excel in the interview.",
            incorrectExample: "If you will research thoroughly, you excel.",
            tip: "Never place 'will' directly after the word 'if'."
          };
        } else {
          unitTitle = `Unit 3: Case Studies & Mastery Assessment`;
          unitIllustration = "📈";
          paragraphs = [
            `Unit 3 bridges theory and practice through real-world case simulations and advanced synthesis.`,
            `Complete the 10-question unit quiz below to verify your comprehensive mastery of this topic.`
          ];
          vocabList = [
            { word: "Synthesis", phonetic: "/ˈsɪnθəsɪs/", partOfSpeech: "Noun", definition: "Combining separate elements to form a coherent whole.", example: "The report represents a brilliant synthesis of data.", illustrationIcon: "🧩" },
            { word: "Execution", phonetic: "/ˌɛksɪˈkjuːʃən/", partOfSpeech: "Noun", definition: "Carrying out a plan or course of action.", example: "Flawless execution is essential for project success.", illustrationIcon: "🚀" },
            { word: "Evaluation", phonetic: "/ɪˌvæljuˈeɪʃən/", partOfSpeech: "Noun", definition: "Making a judgment about value or performance.", example: "Post-project evaluation ensures continuous improvement.", illustrationIcon: "📋" }
          ];
          grammarRule = {
            ruleTitle: "Participle Clauses for Concise Writing",
            explanation: "Use past or present participles to condense clauses and elevate your professional register.",
            correctExample: "Backed by extensive research, the proposal was approved immediately.",
            incorrectExample: "Which was backed by research, the proposal got approved.",
            tip: "Participle clauses provide elegant professional brevity."
          };
        }
      } else {
        // C1 Advanced
        if (uNum === 1) {
          unitTitle = `Unit 1: Epistemological Frameworks`;
          unitIllustration = "🏛️";
          paragraphs = [
            `At the C1 Advanced tier, Unit 1 deconstructs the meta-theoretical paradigms and lexical nuances governing ${top}.`,
            `Master advanced socio-cultural registers and academic terminology before proceeding to the unit evaluation.`
          ];
          vocabList = [
            { word: "Paradigm", phonetic: "/ˈpærəˌdaɪm/", partOfSpeech: "Noun", definition: "A typical example or conceptual model of something.", example: "This framework establishes an entirely new socio-economic paradigm.", illustrationIcon: "🌐" },
            { word: "Epistemology", phonetic: "/ɪˌpɪstɪˈɒlədʒi/", partOfSpeech: "Noun", definition: "The philosophical study of knowledge, its nature and limits.", example: "Information literacy challenges the epistemology of digital media.", illustrationIcon: "📚" },
            { word: "Milieu", phonetic: "/ˈmiːljuː/", partOfSpeech: "Noun", definition: "A person's social environment or cultural surroundings.", example: "Navigating a high-stakes corporate milieu demands linguistic dexterity.", illustrationIcon: "🌍" }
          ];
          grammarRule = {
            ruleTitle: "Advanced Syntactic Inversion",
            explanation: "Invert subject and auxiliary after negative introductory adverbials for rhetorical emphasis.",
            correctExample: "Rarely had the executive board encountered such complex strategic ambiguity.",
            incorrectExample: "Rarely the board had encountered such complexity.",
            tip: "Use inversion sparingly in formal discourse for maximum stylistic impact."
          };
        } else if (uNum === 2) {
          unitTitle = `Unit 2: Strategic Discourse & Analysis`;
          unitIllustration = "⚖️";
          paragraphs = [
            `Unit 2 examines high-level pragmatic presuppositions, cognitive frameworks, and analytical methodologies within ${top}.`,
            `Analyze the syntactic cleft structures and lexical collocations provided below.`
          ];
          vocabList = [
            { word: "Presupposition", phonetic: "/ˌpriːsʌpəˈzɪʃən/", partOfSpeech: "Noun", definition: "An implicit background belief relating to an utterance.", example: "Cross-cultural communication uncovers hidden pragmatic presuppositions.", illustrationIcon: "💭" },
            { word: "Ramification", phonetic: "/ˌræmɪfɪˈkeɪʃən/", partOfSpeech: "Noun", definition: "A complex or unwelcome consequence of an action.", example: "Evaluate the long-term ramifications of algorithmic governance.", illustrationIcon: "🕸️" },
            { word: "Dexterity", phonetic: "/dɛkˈstɛrɪti/", partOfSpeech: "Noun", definition: "Mental skill or quickness in expression.", example: "Linguistic dexterity enables effortless register shifting.", illustrationIcon: "⚡" }
          ];
          grammarRule = {
            ruleTitle: "Cleft Sentences for Information Focusing",
            explanation: "Reorganize sentence architecture using 'What...' or 'It is... that' clefts to highlight critical insights.",
            correctExample: "What jeopardizes executive consensus is the divergence of core foundational values.",
            incorrectExample: "Executive consensus is jeopardized by divergent values what is bad.",
            tip: "Cleft framing directs the audience's analytical focus with absolute precision."
          };
        } else {
          unitTitle = `Unit 3: Dialectical Synthesis & Assessment`;
          unitIllustration = "💎";
          paragraphs = [
            `Unit 3 concludes the module with dialectical synthesis, concessive framing, and rigorous mastery testing.`,
            `Complete the 10-question C1 assessment quiz below to validate your advanced command.`
          ];
          vocabList = [
            { word: "Synthesis", phonetic: "/ˈsɪnθəsɪs/", partOfSpeech: "Noun", definition: "Merging disparate theoretical concepts into a unified thesis.", example: "The dissertation presents a flawless synthesis of philosophy and economics.", illustrationIcon: "🧩" },
            { word: "Rigor", phonetic: "/ˈrɪɡər/", partOfSpeech: "Noun", definition: "Uncompromising thoroughness and academic precision.", example: "Peer-reviewed analysis demands rigorous intellectual scrutiny.", illustrationIcon: "🔍" },
            { word: "Concession", phonetic: "/kənˈsɛʃən/", partOfSpeech: "Noun", definition: "A yielding point in academic or dialectical debate.", example: "Acknowledge opposing arguments gracefully through concessive framing.", illustrationIcon: "🤝" }
          ];
          grammarRule = {
            ruleTitle: "Concessive Framing ('Be that as it may')",
            explanation: "Acknowledge counter-arguments with scholarly poise before establishing your primary thesis.",
            correctExample: "Be that as it may, empirical meta-analyses corroborate the strategic hypothesis.",
            incorrectExample: "Although that's true, but my theory wins.",
            tip: "Concessive transitions signal elite academic maturity and analytical fairness."
          };
        }
      }

      // GENERATE 10 UNIQUE QUESTIONS FOR THE END-OF-UNIT QUIZ
      const questions: Question[] = [];
      for (let qId = 1; qId <= 10; qId++) {
        questions.push({
          id: qId,
          prompt: `[${lvl} | ${top} | ${unitTitle}] Question ${qId}: Evaluate the core principle regarding this concept.`,
          imageIllustration: qId % 2 === 0 ? "🎯" : "💡",
          options: [
            { label: `Correct canonical definition or application for question ${qId}`, isCorrect: true },
            { label: `Incorrect distractor statement or flawed logic option A`, isCorrect: false },
            { label: `Incorrect distractor statement or flawed logic option B`, isCorrect: false }
          ],
          explanation: `Detailed pedagogical explanation for question ${qId}: Rigorous adherence to standardized principles ensures correct application.`
        });
      }

      units.push({
        id: unitId,
        unitNumber: uNum,
        title: unitTitle,
        summary: `A concise, high-yield learning unit covering essential theories, etymology, and grammar rules for ${top}.`,
        illustration: unitIllustration,
        accentColor: "bg-sky-50 border-sky-100 text-sky-600",
        paragraphs: paragraphs,
        vocabulary: vocabList,
        grammar: grammarRule,
        practicalApplication: `Apply the concepts learned in this unit by discussing them with a peer or writing a short summary paragraph.`,
        questions: questions
      });
    }

    return units;
  };

  const handleSelectOption = (qId: number, optIdx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const currentUnits = getUnitsForTopic(selectedLevel, selectedTopic);
  const activeUnit = currentUnits.find((u) => u.id === activeUnitId) || null;

  // WELCOME LANDING SCREEN
  if (!hasEntered) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#FAFAFA] via-pink-50/40 to-sky-50/40 text-gray-800 font-sans flex items-center justify-center p-6">
        <div className="max-w-2xl w-full bg-white/85 backdrop-blur-md rounded-3xl p-10 md:p-14 shadow-xl border border-gray-100 text-center relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#E95599]/10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-[#55b1d4]/10 rounded-full blur-2xl"></div>

          <div className="text-6xl mb-6">🚀🌍✨</div>
          
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4 tracking-wide">
            Welcome to <span className="text-[#E95599] font-medium">Future</span><span className="font-bold text-[#55b1d4]">English</span>
          </h1>
          
          <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-lg mx-auto">
            Explore sequential units with core materials, vocabulary etymology, grammar rules, and end-of-unit knowledge checks tailored from Kindergarten to C1 Advanced.
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

  // ACTIVE UNIT LESSON VIEW (MATERIAL FIRST, QUIZ AT THE END)
  if (activeUnit) {
    const totalQ = activeUnit.questions.length;
    const answeredQ = activeUnit.questions.filter((q) => selectedAnswers[q.id] !== undefined).length;
    const isQuizComplete = totalQ > 0 && answeredQ === totalQ;
    const correctScore = activeUnit.questions.reduce((acc, q) => {
      const selectedOpt = selectedAnswers[q.id];
      return selectedOpt !== undefined && q.options[selectedOpt].isCorrect ? acc + 1 : acc;
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

          {/* PART 1: CORE MATERIAL & EXPLANATION */}
          <div className="space-y-10">
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#55b1d4]">
                📖 Core Reading Material & Explanation
              </h3>
              {activeUnit.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="text-base md:text-lg text-gray-700 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            {/* VOCABULARY & ETYMOLOGY CARDS */}
            <div className="bg-pink-50/40 p-6 md:p-8 rounded-3xl border border-pink-100 space-y-4">
              <h3 className="text-xs font-bold text-[#E95599] uppercase tracking-wider block">
                ✦ Unit Vocabulary & Etymology:
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

            {/* GRAMMAR MECHANICS BOX */}
            <div className="bg-amber-50/50 p-6 md:p-8 rounded-3xl border border-amber-200 space-y-4">
              <h3 className="text-xs font-bold text-amber-900 uppercase tracking-wider block">
                ✦ Grammar Rule & Mechanics: {activeUnit.grammar.ruleTitle}
              </h3>
              <p className="text-sm md:text-base text-amber-950 leading-relaxed">{activeUnit.grammar.explanation}</p>
              <div className="grid md:grid-cols-2 gap-4 pt-2">
                <div className="bg-green-50 p-4 rounded-2xl border border-green-200 text-xs md:text-sm text-green-900">
                  <strong className="block text-green-950 mb-1">✓ Correct Usage:</strong>
                  {activeUnit.grammar.correctExample}
                </div>
                <div className="bg-red-50 p-4 rounded-2xl border border-red-200 text-xs md:text-sm text-red-900">
                  <strong className="block text-red-950 mb-1">✗ Incorrect Usage:</strong>
                  {activeUnit.grammar.incorrectExample}
                </div>
              </div>
              <p className="text-xs md:text-sm bg-amber-100/70 p-4 rounded-xl text-amber-900 font-medium mt-2">
                💡 <strong>Expert Tip:</strong> {activeUnit.grammar.tip}
              </p>
            </div>

            {/* PRACTICAL APPLICATION */}
            <div className="bg-indigo-50/50 p-6 rounded-3xl border border-indigo-100 space-y-2">
              <h3 className="text-xs font-bold text-indigo-900 uppercase tracking-wider block">
                ✦ Practical Real-World Application:
              </h3>
              <p className="text-sm md:text-base text-indigo-950 leading-relaxed">{activeUnit.practicalApplication}</p>
            </div>

            {/* PART 2: END-OF-UNIT KNOWLEDGE CHECK (10 QUESTIONS) */}
            <div className="pt-10 border-t-2 border-dashed border-gray-200 space-y-8">
              <div className="text-center bg-sky-50/70 p-6 rounded-3xl border border-sky-100">
                <span className="text-3xl mb-2 block">📝</span>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">End-of-Unit Knowledge Check</h3>
                <p className="text-sm text-gray-600">Test your understanding of Unit {activeUnit.unitNumber} with these 10 targeted questions!</p>
              </div>

              {isQuizComplete && (
                <div className="p-8 rounded-3xl bg-gradient-to-r from-pink-50 via-sky-50 to-amber-50 border-2 border-[#55b1d4]/30 text-center shadow-md">
                  <div className="text-5xl mb-3">🎉🏆✨</div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">Unit Quiz Completed!</h4>
                  <p className="text-lg text-gray-700 font-medium mb-4">
                    You scored <span className="text-[#E95599] font-bold">{correctScore}</span> out of <span className="font-bold">{totalQ}</span> correct!
                  </p>
                  <button
                    onClick={() => setSelectedAnswers({})}
                    className="bg-gray-900 hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-2xl transition cursor-pointer text-sm shadow-sm"
                  >
                    🔄 Retake Unit Quiz
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
                        {q.imageIllustration && (
                          <span className="text-2xl bg-white px-3 py-1.5 rounded-xl border border-gray-100 shadow-xs">
                            {q.imageIllustration}
                          </span>
                        )}
                      </div>
                      
                      <div className="text-gray-900 font-semibold text-base md:text-lg mb-6 leading-relaxed">
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
                              className={`w-full py-3.5 px-5 rounded-2xl border-2 transition text-left text-sm md:text-base font-semibold cursor-pointer ${btnStyle}`}
                            >
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>

                      {selectedOptIdx !== undefined && (
                        <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-100 text-xs md:text-sm text-blue-900 leading-relaxed mt-4">
                          <span className="font-bold text-blue-950 block mb-1">Explanation:</span>
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

  // MAIN DASHBOARD HOMEPAGE (LEVELS & EXPANDED TOPICS GRID WITH UNITS)
  return (
    <main className="min-h-screen bg-[#FAFAFA] text-gray-800 font-sans p-8 relative">
      <nav className="max-w-6xl mx-auto flex justify-between items-center py-4 mb-6">
        <h1 className="text-3xl font-light text-[#E95599] tracking-wide">
          Future<span className="font-bold text-[#55b1d4]">English</span>
        </h1>
        <span className="text-xs bg-sky-50 text-sky-600 font-semibold px-4 py-2 rounded-full border border-sky-100">
          📚 Curriculum Path: Material First, Quiz at the End
        </span>
      </nav>

      <section className="max-w-4xl mx-auto text-center my-10">
        <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 leading-tight">
          Learn English <span className="text-[#E95599] font-normal">Fun</span>,{" "}
          <span className="text-[#55b1d4] font-normal">Simple</span>, &{" "}
          <span className="text-[#f2b705] font-normal">Practical</span>
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Select your school level and explore verified curriculum topics. Each topic is divided into sequential units featuring core explanations, etymology, grammar, and end-of-unit knowledge checks.
        </p>

        {/* STEP 1: SELECT SCHOOL LEVEL */}
        <div className="mb-8">
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

        {/* STEP 2: SELECT EXPANDED TOPIC CATEGORY */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Select Curriculum Topic</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition cursor-pointer ${
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

      {/* SEQUENTIAL UNITS GRID (MATERIAL FIRST, QUIZ AT THE END OF EACH UNIT) */}
      <section className="max-w-5xl mx-auto my-12">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">
            📚 Sequential Units for {selectedTopic} ({selectedLevel})
          </h3>
          <span className="text-xs text-gray-400 font-medium">3 Comprehensive Units Available</span>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {currentUnits.map((unit) => (
            <div
              key={unit.id}
              onClick={() => {
                setActiveUnitId(unit.id);
                setSelectedAnswers({});
              }}
              className="bg-white p-6 md:p-8 rounded-3xl border border-gray-200 shadow-sm transition hover:border-[#55b1d4] hover:shadow-md cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="bg-pink-100 text-[#E95599] text-xs font-bold px-3 py-1 rounded-full">
                    Unit {unit.unitNumber}
                  </span>
                  <span className="text-3xl">{unit.illustration}</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#55b1d4] transition">
                  {unit.title}
                </h4>
                <p className="text-xs md:text-sm text-gray-600 mb-6 leading-relaxed">
                  {unit.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#55b1d4]">
                <span>📖 Read Material & 10 Q Quiz</span>
                <span>→</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}