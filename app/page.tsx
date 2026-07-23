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
    "DailyLife-1": {
      title: "Daily Life: Grocery Shopping & Supermarket Expressions",
      image: "🛒",
      category: "Daily Life",
      source: "Practical English Usage Standard",
      questions: [
        {
          id: 1,
          prompt: "Where can you find fresh apples and bananas in a supermarket?",
          options: [
            { label: "The produce section", isCorrect: true },
            { label: "The frozen aisle", isCorrect: false },
            { label: "The checkout counter", isCorrect: false },
          ],
          explanation: "Fresh fruits and vegetables are located in the produce section.",
        },
      ],
    },
    "DailyLife-2": {
      title: "Daily Life: Ordering Food at a Restaurant",
      image: "🍔",
      category: "Daily Life",
      source: "Cambridge English Standard",
      questions: [
        {
          id: 1,
          prompt: "Which phrase is polite when asking the waiter for the bill?",
          options: [
            { label: "Give me the check right now.", isCorrect: false },
            { label: "Could we have the bill, please?", isCorrect: true },
          ],
          explanation: "'Could we have the bill, please?' uses polite modal verbs appropriate for dining out.",
        },
      ],
    },
    "DailyLife-3": {
      title: "Daily Life: Asking for Directions in a City",
      image: "🗺️",
      category: "Daily Life",
      source: "ESL Daily Communication Guide",
      questions: [
        {
          id: 1,
          prompt: "Someone tells you: 'Turn right at the second traffic light.' What should you do?",
          options: [
            { label: "Turn right immediately at the first corner.", isCorrect: false },
            { label: "Continue past the first traffic light and make a right at the second one.", isCorrect: true },
          ],
          explanation: "'Second traffic light' requires passing one intersection and turning at the next designated signal.",
        },
      ],
    },
    "SocialMedia-1": {
      title: "Social Media: Netiquette & Comment Etiquette",
      image: "💬",
      category: "Social Media",
      source: "Digital Communication Standard",
      questions: [
        {
          id: 1,
          prompt: "What does typing an entire message in ALL CAPS usually convey online?",
          options: [
            { label: "Shouting or extreme excitement", isCorrect: true },
            { label: "A quiet, whispered comment", isCorrect: false },
          ],
          explanation: "In digital culture, writing in uppercase letters represents shouting.",
        },
      ],
    },
    "SocialMedia-2": {
      title: "Social Media: Slang, Hashtags & Trends",
      image: "📱",
      category: "Social Media",
      source: "Modern Internet Lexicon",
      questions: [
        {
          id: 1,
          prompt: "What does the acronym 'TBH' stand for in a text message?",
          options: [
            { label: "To Be Honest", isCorrect: true },
            { label: "Total Big House", isCorrect: false },
          ],
          explanation: "'TBH' is a widely used internet slang abbreviation for 'To Be Honest'.",
        },
      ],
    },
    "SocialMedia-3": {
      title: "Social Media: Spotting Misinformation Online",
      image: "🔍",
      category: "Social Media",
      source: "Media Literacy Curriculum",
      questions: [
        {
          id: 1,
          prompt: "Which step is most reliable when encountering a sensational news headline on social media?",
          options: [
            { label: "Share it instantly with all your friends", isCorrect: false },
            { label: "Cross-check facts with reputable news outlets", isCorrect: true },
          ],
          explanation: "Verification with trusted journalistic sources prevents the spread of fake news.",
        },
      ],
    },
    "JobInterviews-1": {
      title: "Job Interviews: Professional Self-Introduction",
      image: "💼",
      category: "Job Interviews",
      source: "Corporate Communication Handbook",
      questions: [
        {
          id: 1,
          prompt: "When asked 'Tell me about yourself,' what is the best strategy?",
          options: [
            { label: "Summarize your professional background, key achievements, and career goals.", isCorrect: true },
            { label: "List your favorite childhood memories and hobbies.", isCorrect: false },
          ],
          explanation: "Interviewers look for a concise professional elevator pitch, not a life story.",
        },
      ],
    },
    "JobInterviews-2": {
      title: "Job Interviews: Behavioral STAR Method Answers",
      image: "⭐",
      category: "Job Interviews",
      source: "Recruitment Best Practices",
      questions: [
        {
          id: 1,
          prompt: "What does the letter 'A' stand for in the STAR interview technique?",
          options: [
            { label: "Action", isCorrect: true },
            { label: "Ambition", isCorrect: false },
          ],
          explanation: "STAR stands for Situation, Task, Action, and Result.",
        },
      ],
    },
    "JobInterviews-3": {
      title: "Job Interviews: Asking Smart Questions to Employers",
      image: "🤝",
      category: "Job Interviews",
      source: "Professional Development Standard",
      questions: [
        {
          id: 1,
          prompt: "Which question shows strong engagement at the end of an interview?",
          options: [
            { label: "How soon can I take vacation days?", isCorrect: false },
            { label: "What does success look like in the first 90 days in this role?", isCorrect: true },
          ],
          explanation: "Inquiring about performance benchmarks demonstrates proactive dedication and alignment with team goals.",
        },
      ],
    },
    "Academic-1": {
      title: "Academic & Debate: Structuring a Counter-Argument",
      image: "⚖️",
      category: "Academic & Debate",
      source: "Cambridge Advanced English Standards",
      questions: [
        {
          id: 1,
          prompt: "Which transitional phrase effectively introduces a concession before a counter-argument?",
          options: [
            { label: "Admittedly, online databases are vast; nevertheless, physical archives remain irreplaceable.", isCorrect: true },
            { label: "And then everyone clapped.", isCorrect: false },
          ],
          explanation: "Concession markers like 'Admittedly... nevertheless' balance complex academic discussions.",
        },
      ],
    },
    "Academic-2": {
      title: "Academic & Debate: Advanced Vocabulary & Collocations",
      image: "📜",
      category: "Academic & Debate",
      source: "IELTS & CAE Academic Corpus",
      questions: [
        {
          id: 1,
          prompt: "Which verb collocates correctly with 'research' when conducting a study?",
          options: [
            { label: "To make research", isCorrect: false },
            { label: "To carry out research", isCorrect: true },
          ],
          explanation: "In academic English, researchers 'carry out' or 'conduct' research.",
        },
      ],
    },
    "Academic-3": {
      title: "Academic & Debate: Formal Essay Register & Tone",
      image: "🏛️",
      category: "Academic & Debate",
      source: "University Writing Center Guidelines",
      questions: [
        {
          id: 1,
          prompt: "Which sentence maintains the proper formal academic tone?",
          options: [
            { label: "Kids these days spend way too much time staring at glowing screens.", isCorrect: false },
            { label: "Contemporary adolescents exhibit a pronounced reliance on digital screens.", isCorrect: true },
          ],
          explanation: "Academic writing avoids colloquial expressions ('kids', 'way too much') in favor of precise vocabulary.",
        },
      ],
    },
  };

  const studyGuides: StudyMaterial[] = [
    {
      id: "dailylife-1",
      title: "Daily Life: Essential Grocery & Supermarket Vocabulary",
      level: "Beginner (A1)",
      category: "Daily Life",
      summary: "Master everyday vocabulary for navigating supermarkets, reading labels, and making purchases.",
      illustration: "🛒🍎🧀",
      accentColor: "bg-pink-50 border-pink-100 text-pink-600",
      subTopics: [
        {
          title: "1. Supermarket Aisles & Sections",
          subtitle: "Locating food groups quickly",
          explanation: [
            "Supermarkets are organized into distinct departments: produce, dairy, bakery, and frozen foods.",
            "Knowing these terms helps you find items without wandering."
          ],
          examples: ["'Produce' = fresh fruits and vegetables", "'Dairy' = milk, cheese, and yogurt"]
        },
        {
          title: "2. Payment & Checkout Phrases",
          subtitle: "Interacting with cashiers",
          explanation: [
            "Learn how to respond to common checkout inquiries regarding payment methods and bags.",
            "Always use polite expressions like 'Card, please' or 'Receipt, thank you'."
          ],
          examples: ["'Would you like paper or plastic?'", "'Do you accept contactless payment?'"]
        }
      ]
    },
    {
      id: "dailylife-2",
      title: "Daily Life: Dining Out & Restaurant Etiquette",
      level: "Elementary (A2)",
      category: "Daily Life",
      summary: "Phrases and cultural norms for booking tables, reading menus, and paying the check.",
      illustration: "🍽️🍷💬",
      accentColor: "bg-pink-50 border-pink-100 text-pink-600",
      subTopics: [
        {
          title: "1. Making Reservations",
          subtitle: "Booking a table over the phone or online",
          explanation: [
            "State your party size, preferred time, and any dietary restrictions clearly.",
            "Use modal verbs like 'I would like to book...' for politeness."
          ],
          examples: ["'I'd like a table for four at 7:30 PM, please.'"]
        },
        {
          title: "2. Asking for Recommendations",
          subtitle: "Consulting the server about house specialties",
          explanation: [
            "Ask the waiter for their personal favorite dish or the chef's specialty.",
            "Inquire about ingredients if you have allergies."
          ],
          examples: ["'What do you recommend on the menu today?'"]
        }
      ]
    },
    {
      id: "dailylife-3",
      title: "Daily Life: Navigating Public Transport & City Travel",
      level: "Elementary (A2)",
      category: "Daily Life",
      summary: "How to read transit maps, buy tickets, and ask for travel directions.",
      illustration: "🚇🚌🗺️",
      accentColor: "bg-pink-50 border-pink-100 text-pink-600",
      subTopics: [
        {
          title: "1. Buying Tickets & Passes",
          subtitle: "Interacting with station ticket booths",
          explanation: [
            "Specify whether you need a one-way (single) ticket or a round-trip (return) ticket.",
            "Check for day-pass discounts if you plan multiple journeys."
          ],
          examples: ["'A single ticket to downtown, please.'"]
        },
        {
          title: "2. Asking for Clarification",
          subtitle: "Making sure you are on the right route",
          explanation: [
            "Always double-check platform numbers and direction indicators with transit staff.",
            "Use polite phrasing when interrupting station agents."
          ],
          examples: ["'Does this platform go toward the central station?'"]
        }
      ]
    },
    {
      id: "socialmedia-1",
      title: "Social Media: Netiquette & Digital Communication",
      level: "Intermediate (B1)",
      category: "Social Media",
      summary: "Understand the unwritten rules of online discourse, constructive commenting, and tone.",
      illustration: "💬🌐✨",
      accentColor: "bg-sky-50 border-sky-100 text-sky-600",
      subTopics: [
        {
          title: "1. Tone and Textual Clarity",
          subtitle: "Avoiding misunderstandings without facial cues",
          explanation: [
            "Because text lacks vocal tone, punctuation and emojis help convey emotion accurately.",
            "Sarcasm can easily be misinterpreted online without clear context."
          ],
          examples: ["Using emojis to clarify playful intent.", "Avoiding ALL CAPS to prevent sounding angry."]
        },
        {
          title: "2. Constructive vs. Toxic Engagement",
          subtitle: "Handling disagreement respectfully",
          explanation: [
            "Engage with ideas rather than attacking individuals in comment sections.",
            "Use phrases like 'From my perspective...' instead of definitive dismissals."
          ],
          examples: ["'I see your point, though evidence suggests otherwise...'"]
        }
      ]
    },
    {
      id: "socialmedia-2",
      title: "Social Media: Internet Slang, Acronyms & Trends",
      level: "Intermediate (B1)",
      category: "Social Media",
      summary: "Decode modern internet terminology used across Twitter, Instagram, TikTok, and Reddit.",
      illustration: "📱🔥🚀",
      accentColor: "bg-sky-50 border-sky-100 text-sky-600",
      subTopics: [
        {
          title: "1. Common Digital Abbreviations",
          subtitle: "Understanding text-speak and chat slang",
          explanation: [
            "Fast-paced messaging relies on shorthand expressions like IMHO, TL;DR, and ICYMI.",
            "These streamline casual conversations among online communities."
          ],
          examples: ["'TL;DR' = Too Long; Didn't Read", "'IMHO' = In My Humble Opinion"]
        },
        {
          title: "2. Viral Content Vocabulary",
          subtitle: "Tracking online trends and algorithms",
          explanation: [
            "Learn terms like 'engagement', 'reach', 'algorithm', and 'going viral'.",
            "Useful for discussing digital marketing and modern media trends."
          ],
          examples: ["'The video gained massive traction overnight.'"]
        }
      ]
    },
    {
      id: "socialmedia-3",
      title: "Social Media: Media Literacy & Spotting Fake News",
      level: "Upper-Intermediate (B2)",
      category: "Social Media",
      summary: "Evaluate online claims, check sources, and develop critical thinking in digital feeds.",
      illustration: "🔍📰🛡️",
      accentColor: "bg-sky-50 border-sky-100 text-sky-600",
      subTopics: [
        {
          title: "1. Evaluating Source Credibility",
          subtitle: "Checking author authority and institutional backing",
          explanation: [
            "Verify whether a publishing domain is verified and whether articles cite empirical evidence.",
            "Beware of sensationalized headlines designed solely to provoke emotional clicks."
          ],
          examples: ["Cross-referencing claims with established journalistic archives."]
        },
        {
          title: "2. Understanding Confirmation Bias",
          subtitle: "Recognizing how algorithms shape your feed",
          explanation: [
            "Social algorithms feed users content that matches prior beliefs.",
            "Actively seeking diverse viewpoints prevents ideological echo chambers."
          ],
          examples: ["Deliberately reading opposing editorials to gain balanced insight."]
        }
      ]
    },
    {
      id: "jobinterviews-1",
      title: "Job Interviews: Professional Self-Introduction Masterclass",
      level: "Upper-Intermediate (B2)",
      category: "Job Interviews",
      summary: "Craft a compelling elevator pitch highlighting your professional history and career trajectory.",
      illustration: "💼👔📈",
      accentColor: "bg-emerald-50 border-emerald-100 text-emerald-600",
      subTopics: [
        {
          title: "1. The 60-Second Pitch Structure",
          subtitle: "Presenting past, present, and future in harmony",
          explanation: [
            "Begin with your current professional title and key years of experience.",
            "Highlight a standout achievement before pivoting to why you want this specific role."
          ],
          examples: ["'With over four years in project management, I specialize in...'"]
        },
        {
          title: "2. Aligning Skills with Company Needs",
          subtitle: "Tailoring your introduction to the job description",
          explanation: [
            "Focus on transferable skills and accomplishments relevant to the hiring manager.",
            "Avoid reciting your entire resume verbatim."
          ],
          examples: ["Connecting past optimization successes directly to the target company's goals."]
        }
      ]
    },
    {
      id: "jobinterviews-2",
      title: "Job Interviews: Behavioral Questions & The STAR Method",
      level: "Upper-Intermediate (B2)",
      category: "Job Interviews",
      summary: "Structure compelling stories about past challenges using Situation, Task, Action, and Result.",
      illustration: "⭐🏆🧠",
      accentColor: "bg-emerald-50 border-emerald-100 text-emerald-600",
      subTopics: [
        {
          title: "1. Structuring Your Narrative (STAR)",
          subtitle: "Keeping answers concise and impactful",
          explanation: [
            "Situation & Task: Set the context and explain the challenge you faced.",
            "Action & Result: Detail what specific steps you took and the measurable outcome."
          ],
          examples: ["'When our server crashed (Situation), I had to restore backups (Action), reducing downtime by 50% (Result).''"]
        },
        {
          title: "2. Quantifying Achievements",
          subtitle: "Using data points to prove effectiveness",
          explanation: [
            "Numbers provide concrete proof of your competence.",
            "Use percentages, dollar amounts, or time saved whenever possible."
          ],
          examples: ["'Spearheaded a marketing campaign that boosted user retention by 25%.'"]
        }
      ]
    },
    {
      id: "jobinterviews-3",
      title: "Job Interviews: Closing Strong & Asking Smart Questions",
      level: "Advanced (C1)",
      category: "Job Interviews",
      summary: "Turn the tables in an interview by asking insightful questions that demonstrate high-level business acumen.",
      illustration: "🤝💡🎯",
      accentColor: "bg-emerald-50 border-emerald-100 text-emerald-600",
      subTopics: [
        {
          title: "1. Asking Strategic Questions",
          subtitle: "Moving beyond basic salary and benefit inquiries",
          explanation: [
            "Ask about upcoming product launches, team bottlenecks, or company culture challenges.",
            "This shows you are already thinking like an integrated team member."
          ],
          examples: ["'What is the biggest operational hurdle the team expects to face this quarter?'"]
        },
        {
          title: "2. Professional Closing Statements",
          subtitle: "Reiterating enthusiasm and outlining next steps",
          explanation: [
            "Conclude by reaffirming your unique fit for the position and asking about hiring timelines.",
            "Send a thoughtful thank-you note within 24 hours."
          ],
          examples: ["'Thank you for your time today; I am very excited about contributing to this initiative.'"]
        }
      ]
    },
    {
      id: "academic-1",
      title: "Academic & Debate: Counter-Arguments & Concession Clauses",
      level: "Advanced (C1)",
      category: "Academic & Debate",
      summary: "Master sophisticated transitional structures to dismantle opposing views with rhetorical precision.",
      illustration: "⚖️🏛️📝",
      accentColor: "bg-purple-50 border-purple-100 text-purple-600",
      subTopics: [
        {
          title: "1. Concession and Refutation",
          subtitle: "Acknowledging validity while defending your thesis",
          explanation: [
            "Use advanced conjunctions like 'Notwithstanding', 'Albeit', and 'While it is tempting to argue...' to grant minor points to opponents before presenting your core argument.",
            "Demonstrates balanced intellectual rigor."
          ],
          examples: ["'Notwithstanding potential budgetary constraints, the long-term yield justifies the expenditure.'"]
        },
        {
          title: "2. Nuanced Phrasing in Formal Debate",
          subtitle: "Elevating rhetorical impact",
          explanation: [
            "Replace absolute words like 'always' or 'never' with academic qualifiers like 'predominantly', 'arguably', or 'to a large extent'.",
            "Maintains scientific and scholarly accuracy."
          ],
          examples: ["'The data arguably points toward a correlation rather than direct causation.'"]
        }
      ]
    },
    {
      id: "academic-2",
      title: "Academic & Debate: Advanced Collocations & Lexical Resource",
      level: "C1 Advanced",
      category: "Academic & Debate",
      summary: "Enhance your academic writing score by mastering high-level verb-noun and adjective-noun pairings.",
      illustration: "📜✍️🔬",
      accentColor: "bg-purple-50 border-purple-100 text-purple-600",
      subTopics: [
        {
          title: "1. Academic Verb Collocations",
          subtitle: "Choosing precise verbs for scholarly prose",
          explanation: [
            "Avoid generic verbs like 'show' or 'make' in favor of 'elucidate', 'substantiate', 'spearhead', or 'delineate'.",
            "Elevates your register to match international journal standards."
          ],
          examples: ["'Recent findings substantiate the hypothesis regarding...'"]
        },
        {
          title: "2. Complex Noun Phrases",
          subtitle: "Packing dense information into single subject clauses",
          explanation: [
            "Academic English favors noun-heavy structures over long verb chains.",
            "Transforms wordy sentences into crisp, professional summaries."
          ],
          examples: ["'The rapid acceleration of technological integration...' instead of 'Technology is integrating quickly and...'"]
        }
      ]
    },
    {
      id: "academic-3",
      title: "Academic & Debate: Formal Essay Register & Stylistic Control",
      level: "C1 Advanced",
      category: "Academic & Debate",
      summary: "Eliminate informal bias, colloquialisms, and emotional language to maintain immaculate academic tone.",
      illustration: "🎓📊📖",
      accentColor: "bg-purple-50 border-purple-100 text-purple-600",
      subTopics: [
        {
          title: "1. Impersonal Passive Voice",
          subtitle: "Removing subjective bias from research reporting",
          explanation: [
            "Shift focus from personal pronouns ('I discovered') to objective observations ('It was observed that...').",
            "Maintains scholarly distance and neutrality."
          ],
          examples: ["'Experiments were conducted under controlled thermal conditions.'"]
        },
        {
          title: "2. Avoiding Contractions and Clichés",
          subtitle: "Maintaining strict formal guidelines",
          explanation: [
            "Always write out words fully ('do not' instead of 'don't').",
            "Refrain from using conversational metaphors or slang idioms in research papers."
          ],
          examples: ["'The results are inconclusive' rather than 'We are back to square one.'"]
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
            ? "Over 12+ fully interactive modules covering Daily Life, Social Media, Job Interviews, and Academic & Debate."
            : "Comprehensive study guides with fully accessible deep-dive learning breakdowns for every category."}
        </p>

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

      {activeTab === "quizzes" && (
        <section className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {Object.entries(quizDataBank).map(([key, mod]) => {
            const isMatch = selectedTopic === "All" || mod.category === selectedTopic;

            return (
              <div
                key={key}
                className={`bg-white p-6 rounded-2xl border border-gray-100 shadow-sm transition flex flex-col justify-between ${
                  isMatch ? "opacity-100 hover:shadow-md" : "opacity-30 pointer-events-none"
                }`}
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="bg-[#55b1d4]/10 text-[#55b1d4] text-xs font-semibold px-3 py-1 rounded-full">
                      {mod.category}
                    </span>
                    <span className="text-2xl">{mod.image}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{mod.title}</h3>
                  <p className="text-xs text-gray-500 mb-6 font-medium">Source: {mod.source}</p>
                </div>
                <button
                  onClick={() => isMatch && setActiveModuleKey(key)}
                  className="w-full py-3 px-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-[#55b1d4] hover:text-white transition font-semibold text-xs cursor-pointer"
                >
                  Start Quiz →
                </button>
              </div>
            );
          })}
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