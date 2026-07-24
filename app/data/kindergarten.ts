export type Question = {
  id: number;
  prompt: string;
  imageIllustration?: string;
  options: { label: string; isCorrect: boolean }[];
  explanation: string;
};

export type VocabularyItem = {
  word: string;
  phonetic: string;
  partOfSpeech: string;
  definition: string;
  example: string;
  illustrationIcon: string;
};

export type GrammarRule = {
  ruleTitle: string;
  explanation: string;
  correctExample: string;
  incorrectExample: string;
  tip: string;
};

export type UnitModule = {
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

export const kindergartenData: Record<string, UnitModule[]> = {
  "Days, Months & Seasons": [
    {
      id: "K_Days_1",
      unitNumber: 1,
      title: "Unit 1: Days of the Week",
      summary: "Learn the 7 days we use every week from Monday to Sunday!",
      illustration: "📅",
      accentColor: "bg-sky-50 border-sky-100 text-sky-600",
      paragraphs: [
        "There are 7 days in every week! We go to school from Monday to Friday, and play on Saturday and Sunday."
      ],
      vocabulary: [
        { word: "Monday", phonetic: "/ˈmʌndeɪ/", partOfSpeech: "Noun", definition: "The start of the school week.", example: "We start school on Monday.", illustrationIcon: "🎒" },
        { word: "Saturday", phonetic: "/ˈsætərdeɪ/", partOfSpeech: "Noun", definition: "The first weekend day for fun.", example: "I play in the park on Saturday.", illustrationIcon: "⚽" },
        { word: "Week", phonetic: "/wiːk/", partOfSpeech: "Noun", definition: "A group of 7 days.", example: "A week has 7 days.", illustrationIcon: "📆" }
      ],
      grammar: {
        ruleTitle: "Big Capital Letters for Days",
        explanation: "Days of the week always start with a capital letter!",
        correctExample: "Today is Monday.",
        incorrectExample: "Today is monday.",
        tip: "Capitalize every day name!"
      },
      practicalApplication: "Say out loud: 'My favorite day is Saturday!'",
      questions: [
        { id: 1, prompt: "How many days are in one week?", options: [{ label: "7 days", isCorrect: true }, { label: "3 days", isCorrect: false }, { label: "10 days", isCorrect: false }], explanation: "Every week has 7 days in order!" },
        { id: 2, prompt: "Which day comes right after Monday?", options: [{ label: "Tuesday", isCorrect: true }, { label: "Sunday", isCorrect: false }, { label: "Friday", isCorrect: false }], explanation: "Tuesday comes right after Monday." },
        { id: 3, prompt: "Which day starts the school week?", options: [{ label: "Monday", isCorrect: true }, { label: "Saturday", isCorrect: false }, { label: "Sunday", isCorrect: false }], explanation: "Monday is the first school day." },
        { id: 4, prompt: "Which two days make up the weekend?", options: [{ label: "Saturday and Sunday", isCorrect: true }, { label: "Monday and Tuesday", isCorrect: false }, { label: "Thursday and Friday", isCorrect: false }], explanation: "Saturday and Sunday are weekend days." },
        { id: 5, prompt: "How should you write the word 'friday'?", options: [{ label: "Friday", isCorrect: true }, { label: "friday", isCorrect: false }, { label: "fRiday", isCorrect: false }], explanation: "Always capitalize day names!" },
        { id: 6, prompt: "What day comes before Wednesday?", options: [{ label: "Tuesday", isCorrect: true }, { label: "Thursday", isCorrect: false }, { label: "Saturday", isCorrect: false }], explanation: "Tuesday is right before Wednesday." },
        { id: 7, prompt: "If today is Friday, what day is tomorrow?", options: [{ label: "Saturday", isCorrect: true }, { label: "Monday", isCorrect: false }, { label: "Wednesday", isCorrect: false }], explanation: "Saturday follows Friday." },
        { id: 8, prompt: "When do most kids relax and play at home?", options: [{ label: "On the weekend", isCorrect: true }, { label: "Only on Monday morning", isCorrect: false }, { label: "Never", isCorrect: false }], explanation: "Weekends are for rest and fun." },
        { id: 9, prompt: "What day ends the weekend before school starts again?", options: [{ label: "Sunday", isCorrect: true }, { label: "Tuesday", isCorrect: false }, { label: "Thursday", isCorrect: false }], explanation: "Sunday is the last day of the weekend." },
        { id: 10, prompt: "Pick the correct sentence:", options: [{ label: "We play on Saturday.", isCorrect: true }, { label: "We play on saturday.", isCorrect: false }, { label: "Saturday play we on.", isCorrect: false }], explanation: "Saturday is capitalized and in order." }
      ]
    }
  ],
  "Weather & Climate": [
    {
      id: "K_Weath_1",
      unitNumber: 1,
      title: "Unit 1: Sunny and Rainy Days",
      summary: "Learn what to wear when it rains or shines!",
      illustration: "🌧️",
      accentColor: "bg-sky-50 border-sky-100 text-sky-600",
      paragraphs: [
        "On rainy days, grey clouds drop water from the sky. We open colorful umbrellas and wear boots to stay dry!"
      ],
      vocabulary: [
        { word: "Rain", phonetic: "/reɪn/", partOfSpeech: "Noun", definition: "Water drops falling from clouds.", example: "Rain falls from grey clouds.", illustrationIcon: "🌧️" },
        { word: "Umbrella", phonetic: "/ʌmˈbrɛlə/", partOfSpeech: "Noun", definition: "A tool that keeps rain off you.", example: "Open your umbrella in the rain.", illustrationIcon: "☂️" },
        { word: "Sun", phonetic: "/sʌn/", partOfSpeech: "Noun", definition: "The big bright star warming our sky.", example: "The sun shines bright and warm.", illustrationIcon: "☀️" }
      ],
      grammar: {
        ruleTitle: "Using 'It is...'",
        explanation: "Start weather descriptions with 'It is'!",
        correctExample: "It is rainy today.",
        incorrectExample: "Rainy today it is.",
        tip: "Start with 'It is'!"
      },
      practicalApplication: "Point out your window and say: 'It is sunny!'",
      questions: [
        { id: 1, prompt: "What drops from grey clouds when it rains?", options: [{ label: "Water drops", isCorrect: true }, { label: "Juice boxes", isCorrect: false }, { label: "Toy blocks", isCorrect: false }], explanation: "Rain is water falling from clouds." },
        { id: 2, prompt: "What tool keeps rain off your head?", options: [{ label: "An umbrella", isCorrect: true }, { label: "A spoon", isCorrect: false }, { label: "A book", isCorrect: false }], explanation: "Umbrellas shield you from rain." },
        { id: 3, prompt: "What shines high in the sky on sunny days?", options: [{ label: "The sun", isCorrect: true }, { label: "The moon at noon", isCorrect: false }, { label: "A streetlight", isCorrect: false }], explanation: "The sun gives bright light." },
        { id: 4, prompt: "What shoes keep your feet dry in rain puddles?", options: [{ label: "Rubber rain boots", isCorrect: true }, { label: "Slippers", isCorrect: false }, { label: "Paper shoes", isCorrect: false }], explanation: "Rubber boots repel water." },
        { id: 5, prompt: "Choose the correct sentence:", options: [{ label: "It is rainy today.", isCorrect: true }, { label: "Rainy it is today.", isCorrect: false }, { label: "Today rainy is it.", isCorrect: false }], explanation: "Starts cleanly with 'It is'." },
        { id: 6, prompt: "What color are heavy rain clouds?", options: [{ label: "Grey", isCorrect: true }, { label: "Pink", isCorrect: false }, { label: "Bright green", isCorrect: false }], explanation: "Rain clouds look dark grey." },
        { id: 7, prompt: "What might appear in the sky after rain and sun mix?", options: [{ label: "A rainbow", isCorrect: true }, { label: "A rocket", isCorrect: false }, { label: "A birthday cake", isCorrect: false }], explanation: "Rainbows form from sun and rain." },
        { id: 8, prompt: "Why do flowers like rain showers?", options: [{ label: "Rain gives them water to drink", isCorrect: true }, { label: "Rain turns them blue", isCorrect: false }, { label: "Rain makes them run", isCorrect: false }], explanation: "Plants need water to grow." },
        { id: 9, prompt: "What should you put on your eyes on bright sunny days?", options: [{ label: "Sunglasses", isCorrect: true }, { label: "Sleep masks", isCorrect: false }, { label: "Swimming goggles", isCorrect: false }], explanation: "Sunglasses block bright glare." },
        { id: 10, prompt: "Pick the correct sentence:", options: [{ label: "The sun is bright.", isCorrect: true }, { label: "Bright is sun the.", isCorrect: false }, { label: "Sun bright the is.", isCorrect: false }], explanation: "Clear subject-verb structure." }
      ]
    }
  ]
};