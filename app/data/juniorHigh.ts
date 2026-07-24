import { UnitModule } from "./kindergarten";

export const juniorHighData: Record<string, UnitModule[]> = {
  "Travel & Public Transit": [
    {
      id: "JH_Trav_1",
      unitNumber: 1,
      title: "Unit 1: Catching the Train",
      summary: "Learn how to find your platform and read departure boards!",
      illustration: "🚆",
      accentColor: "bg-sky-50 border-sky-100 text-sky-600",
      paragraphs: [
        "Train stations have large departure screens listing train times and platform numbers. Make sure to buy your ticket at the machine before stepping onto the platform!"
      ],
      vocabulary: [
        { word: "Platform", phonetic: "/ˈplætfɔːrm/", partOfSpeech: "Noun", definition: "The area where you wait to board a train.", example: "Our train departs from platform 3.", illustrationIcon: "🚉" },
        { word: "Departure", phonetic: "/dɪˈpɑːrtʃər/", partOfSpeech: "Noun", definition: "Leaving a station or airport.", example: "Check the departure screen for updates.", illustrationIcon: "🕒" },
        { word: "Ticket", phonetic: "/ˈtɪkɪt/", partOfSpeech: "Noun", definition: "A pass showing you paid for your ride.", example: "Scan your ticket at the gate.", illustrationIcon: "🎟️" }
      ],
      grammar: {
        ruleTitle: "Using 'Must' for Rules",
        explanation: "Use 'must' when giving a mandatory safety rule or instruction!",
        correctExample: "You must hold a valid ticket before boarding.",
        incorrectExample: "You must to holding a valid ticket.",
        tip: "'Must' is followed directly by the action verb!"
      },
      practicalApplication: "Ask a station worker: 'Excuse me, which platform for the city train?'",
      questions: [
        { id: 1, prompt: "Where do you stand to wait for your train?", options: [{ label: "On the platform", isCorrect: true }, { label: "In the driver's cabin", isCorrect: false }, { label: "On the tracks", isCorrect: false }], explanation: "Platforms provide safe waiting areas beside train tracks." },
        { id: 2, prompt: "What screen shows when trains are leaving?", options: [{ label: "The departure board", isCorrect: true }, { label: "A movie theater screen", isCorrect: false }, { label: "A weather map", isCorrect: false }], explanation: "Departure boards list train leaving times." },
        { id: 3, prompt: "Choose the correct sentence with 'must':", options: [{ label: "Passengers must buy a ticket.", isCorrect: true }, { label: "Passengers must to buy a ticket.", isCorrect: false }, { label: "Must passengers buying ticket.", isCorrect: false }], explanation: "'Must' is followed by bare verb 'buy'." },
        { id: 4, prompt: "What document proves you paid for your train ride?", options: [{ label: "A valid ticket", isCorrect: true }, { label: "A receipt from a grocery store", isCorrect: false }, { label: "A library card", isCorrect: false }], explanation: "Tickets grant travel access." },
        { id: 5, prompt: "What should you do if a train announcement says 'Final Call'?", options: [{ label: "Hurry safely to the boarding gate", isCorrect: true }, { label: "Go take a nap", isCorrect: false }, { label: "Leave the station", isCorrect: false }], explanation: "Final call means the train is departing very soon." },
        { id: 6, prompt: "Which word means leaving a place on a journey?", options: [{ label: "Departure", isCorrect: true }, { label: "Arrival", isCorrect: false }, { label: "Sleeping", isCorrect: false }], explanation: "Departure means leaving." },
        { id: 7, prompt: "Where do you tap your transit card before entering?", options: [{ label: "At the ticket gate", isCorrect: true }, { label: "On the train wheel", isCorrect: false }, { label: "On your shoe", isCorrect: false }], explanation: "Ticket gates scan passes." },
        { id: 8, prompt: "Why is it important to arrive 10 minutes early at stations?", options: [{ label: "Trains follow strict schedules and won't wait", isCorrect: true }, { label: "The station closes forever at noon", isCorrect: false }, { label: "To clean the train seats yourself", isCorrect: false }], explanation: "Public transit runs on strict timetables." },
        { id: 9, prompt: "Pick the correct sentence:", options: [{ label: "The train arrives on time.", isCorrect: true }, { label: "Arrives train the time on.", isCorrect: false }, { label: "On time train arrives the.", isCorrect: false }], explanation: "Subject + verb + prepositional phrase." },
        { id: 10, prompt: "What should you keep with you during your trip?", options: [{ label: "Your ticket or transit card", isCorrect: true }, { label: "Heavy rocks", isCorrect: false }, { label: "Someone else's backpack", isCorrect: false }], explanation: "Ticket inspectors check passes during trips." }
      ]
    }
  ]
};