import { UnitModule } from "./kindergarten";

export const c1AdvancedData: Record<string, UnitModule[]> = {
  "Executive Corporate Strategy": [
    {
      id: "C1_Strat_1",
      unitNumber: 1,
      title: "Unit 1: Business Leadership & Governance",
      summary: "Understand how company leaders balance profit with community responsibility.",
      illustration: "🌐",
      accentColor: "bg-sky-50 border-sky-100 text-sky-600",
      paragraphs: [
        "Modern corporate strategy focuses on stakeholder value rather than just quick shareholder profit. Good leaders ensure ethical governance and long-term sustainability across all operations."
      ],
      vocabulary: [
        { word: "Governance", phonetic: "/ˈɡʌvərnəns/", partOfSpeech: "Noun", definition: "The system by which an organization is directed and controlled.", example: "Good corporate governance builds long-term trust.", illustrationIcon: "⚖️" },
        { word: "Stewardship", phonetic: "/ˈstjuːərdʃɪp/", partOfSpeech: "Noun", definition: "Responsible management and protection of resources.", example: "Environmental stewardship safeguards the planet.", illustrationIcon: "🛡️" },
        { word: "Strategy", phonetic: "/ˈstrætədʒi/", partOfSpeech: "Noun", definition: "A high-level plan to achieve long-term success.", example: "The board approved the expansion strategy.", illustrationIcon: "🎯" }
      ],
      grammar: {
        ruleTitle: "The Subjunctive Mood in Formal Mandates",
        explanation: "Use the base form of the verb after formal recommendation verbs like 'insist', 'mandate', or 'require'!",
        correctExample: "The board insists that the CEO review the proposal.",
        incorrectExample: "The board insists that the CEO reviews the proposal.",
        tip: "Drop the '-s' on verbs in formal subjunctive clauses!"
      },
      practicalApplication: "Draft a 1-sentence policy requiring annual sustainability audits.",
      questions: [
        { id: 1, prompt: "What does stakeholder strategy prioritize alongside profit?", options: [{ label: "Long-term value for employees, communities, and customers", isCorrect: true }, { label: "Ignoring all safety regulations", isCorrect: false }, { label: "Closing down operations completely", isCorrect: false }], explanation: "Stakeholder strategy balances all connected groups." },
        { id: 2, prompt: "Which word means responsible management of company resources?", options: [{ label: "Stewardship", isCorrect: true }, { label: "Carelessness", isCorrect: false }, { label: "Gamble", isCorrect: false }], explanation: "Stewardship means responsible oversight." },
        { id: 3, prompt: "Choose the correct subjunctive sentence:", options: [{ label: "It is crucial that management submit the report.", isCorrect: true }, { label: "It is crucial that management submits the report.", isCorrect: false }, { label: "Crucial management report submit.", isCorrect: false }], explanation: "Subjunctive mood uses the bare verb 'submit'." },
        { id: 4, prompt: "What does ESG stand for in corporate strategy?", options: [{ label: "Environmental, Social, and Governance", isCorrect: true }, { label: "Energy, Speed, and Growth", isCorrect: false }, { label: "Economy, Stocks, and Gold", isCorrect: false }], explanation: "ESG evaluates ethical and sustainable impact." },
        { id: 5, prompt: "What is the primary role of corporate governance?", options: [{ label: "Ensuring ethical leadership and regulatory compliance", isCorrect: true }, { label: "Designing office furniture", isCorrect: false }, { label: "Planning holiday parties only", isCorrect: false }], explanation: "Governance enforces ethical standards and compliance." },
        { id: 6, prompt: "Complete: 'The chairperson recommended that she ___ the board meeting.'", options: [{ label: "attend", isCorrect: true }, { label: "attends", isCorrect: false }, { label: "attended", isCorrect: false }], explanation: "Subjunctive uses bare form 'attend'." },
        { id: 7, prompt: "Why do companies adopt sustainable practices?", options: [{ label: "To reduce long-term operational and environmental risks", isCorrect: true }, { label: "To increase paper waste", isCorrect: false }, { label: "To confuse investors", isCorrect: false }], explanation: "Sustainability mitigates future operational risks." },
        { id: 8, prompt: "What type of vision defines executive leadership?", options: [{ label: "Long-term strategic vision", isCorrect: true }, { label: "Short-term impulse decisions", isCorrect: false }, { label: "Random guessing", isCorrect: false }], explanation: "Executives focus on sustainable long-term goals." },
        { id: 9, prompt: "Pick the correct sentence:", options: [{ label: "Ethical decisions build brand reputation.", isCorrect: true }, { label: "Decisions ethical build reputation brand.", isCorrect: false }, { label: "Build brand ethical decisions reputation.", isCorrect: false }], explanation: "Standard subject + verb + object order." },
        { id: 10, prompt: "What builds lasting trust with institutional investors?", options: [{ label: "Transparency and clear accountability", isCorrect: true }, { label: "Hiding financial records", isCorrect: false }, { label: "Breaking regulatory laws", isCorrect: false }], explanation: "Transparency fosters investor confidence." }
      ]
    }
  ]
};