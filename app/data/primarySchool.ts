import { UnitModule } from "./kindergarten";

export const primarySchoolData: Record<string, UnitModule[]> = {
  "Days, Months & Seasons": [
    {
      id: "P_Days_1",
      unitNumber: 1,
      title: "Unit 1: School Schedules and Timetables",
      summary: "Talk about your weekly school subjects and activities!",
      illustration: "📚",
      accentColor: "bg-sky-50 border-sky-100 text-sky-600",
      paragraphs: [
        "Every school week has a routine! We study Math and English from Monday to Friday, and do sports on weekends."
      ],
      vocabulary: [
        { word: "Timetable", phonetic: "/ˈtaɪmˌteɪbəl/", partOfSpeech: "Noun", definition: "A plan showing when classes happen.", example: "Check your school timetable.", illustrationIcon: "📋" },
        { word: "Subject", phonetic: "/ˈsʌbdʒɪkt/", partOfSpeech: "Noun", definition: "A school course like Science or Art.", example: "English is my favorite subject.", illustrationIcon: "📖" },
        { word: "Routine", phonetic: "/ruːˈtiːn/", partOfSpeech: "Noun", definition: "Things you do regularly every day.", example: "Morning study is my daily routine.", illustrationIcon: "⏰" }
      ],
      grammar: {
        ruleTitle: "Using 'On' with Days",
        explanation: "Use the word 'on' before any specific day of the week!",
        correctExample: "We have Art class on Tuesday.",
        incorrectExample: "We have Art class at Tuesday.",
        tip: "Always use 'on' + Day!"
      },
      practicalApplication: "Tell a friend: 'I have English class on Monday!'",
      questions: [
        { id: 1, prompt: "Which word means a schedule of school classes?", options: [{ label: "Timetable", isCorrect: true }, { label: "Lunchbox", isCorrect: false }, { label: "Playground", isCorrect: false }], explanation: "Timetables list scheduled classes." },
        { id: 2, prompt: "Which preposition goes before a day of the week?", options: [{ label: "on", isCorrect: true }, { label: "in", isCorrect: false }, { label: "at", isCorrect: false }], explanation: "We say 'on Monday' or 'on Friday'." },
        { id: 3, prompt: "Choose the correct sentence:", options: [{ label: "We have PE on Friday.", isCorrect: true }, { label: "We have PE at Friday.", isCorrect: false }, { label: "We have PE in Friday.", isCorrect: false }], explanation: "Days take the preposition 'on'." },
        { id: 4, prompt: "What is English or Science called in school?", options: [{ label: "A subject", isCorrect: true }, { label: "A backpack", isCorrect: false }, { label: "A weekend", isCorrect: false }], explanation: "Courses are called school subjects." },
        { id: 5, prompt: "What do we call activities done every single day?", options: [{ label: "A routine", isCorrect: true }, { label: "A holiday", isCorrect: false }, { label: "A party", isCorrect: false }], explanation: "Routines are regular daily habits." },
        { id: 6, prompt: "When do students usually do homework?", options: [{ label: "After school hours", isCorrect: true }, { label: "During midnight", isCorrect: false }, { label: "Never", isCorrect: false }], explanation: "Homework fits after school." },
        { id: 7, prompt: "Which day comes right after Thursday?", options: [{ label: "Friday", isCorrect: true }, { label: "Tuesday", isCorrect: false }, { label: "Sunday", isCorrect: false }], explanation: "Friday follows Thursday." },
        { id: 8, prompt: "How many working days are in a standard school week?", options: [{ label: "5 days", isCorrect: true }, { label: "2 days", isCorrect: false }, { label: "10 days", isCorrect: false }], explanation: "Monday to Friday = 5 days." },
        { id: 9, prompt: "Pick the sentence with proper capitalization:", options: [{ label: "I study Science on Wednesday.", isCorrect: true }, { label: "I study science on wednesday.", isCorrect: false }, { label: "Wednesday study I science on.", isCorrect: false }], explanation: "Wednesday must be capitalized." },
        { id: 10, prompt: "What helps you stay organized for school tests?", options: [{ label: "Checking your daily schedule", isCorrect: true }, { label: "Guessing randomly", isCorrect: false }, { label: "Leaving books at home", isCorrect: false }], explanation: "Checking schedules prevents missing tests." }
      ]
    }
  ]
};