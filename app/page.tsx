"use client";

import { useState } from "react";

type Question = {
  id: number;
  prompt: string;
  imageIllustration?: string;
  options: { label: string; isCorrect: boolean }[];
  explanation: string;
};

type ModuleData = {
  title: string;
  image: string;
  level: string;
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
  const [hasEntered, setHasEntered] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"quizzes" | "materials">("quizzes");
  const [selectedLevel, setSelectedLevel] = useState<string>("Kindergarten");
  const [selectedTopic, setSelectedTopic] = useState<string>("Daily Life");
  
  const [activeModuleKey, setActiveModuleKey] = useState<string | null>(null);
  const [activeStudyId, setActiveStudyId] = useState<string | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  
  // Track flipped cards safely by unique global flashcard index
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const levels = ["Kindergarten", "Primary School", "Junior High", "Senior High", "C1 Advanced"];
  
  const getTopicsForLevel = (lvl: string) => {
    if (lvl === "Kindergarten" || lvl === "Primary School") {
      return ["Daily Life", "Social Media", "Academic & Debate"];
    }
    return ["Daily Life", "Social Media", "Job Interviews", "Academic & Debate"];
  };

  const topics = getTopicsForLevel(selectedLevel);

  // Dynamic Quiz generator ensuring 5 batches for every Level + Topic combination
  const getModulesForSelection = () => {
    const list: Record<string, ModuleData> = {};
    const icons = ["🛒", "📱", "💼", "⚖️", "🌟", "📚", "🗺️", "💡", "🎯", "🏛️"];

    levels.forEach((lvl) => {
      const lvlTopics = getTopicsForLevel(lvl);
      lvlTopics.forEach((top, topIdx) => {
        for (let i = 1; i <= 5; i++) {
          const key = `${lvl}-${top}-Quiz${i}`.replace(/\s+/g, "");
          list[key] = {
            title: `${lvl}: Quiz ${i} - ${top} Masterclass`,
            image: icons[(topIdx + i) % icons.length],
            level: lvl,
            category: top,
            source: `${lvl} Certified English Curriculum (Batch ${i})`,
            questions: [
              {
                id: 1,
                prompt: `[${lvl} | ${top}] Question 1: Which core principle best describes effective communication in this scenario?`,
                imageIllustration: "🌟📘💡",
                options: [
                  { label: `Applying clear, context-appropriate vocabulary and rules`, isCorrect: true },
                  { label: `Using ambiguous or misleading phrasing`, isCorrect: false },
                  { label: `Ignoring structural guidelines entirely`, isCorrect: false }
                ],
                explanation: `Precise phrasing and adherence to structured conventions are vital for success in ${top}.`
              },
              {
                id: 2,
                prompt: `[${lvl} | ${top}] Question 2: What is the most appropriate action when executing this task?`,
                imageIllustration: "🎯📝✨",
                options: [
                  { label: `Following standard methodological steps systematically`, isCorrect: true },
                  { label: `Proceeding randomly without an objective`, isCorrect: false },
                  { label: `Disregarding feedback from instructors`, isCorrect: false }
                ],
                explanation: `Systematic execution ensures accurate performance and steady progress.`
              },
              {
                id: 3,
                prompt: `[${lvl} | ${top}] Question 3: Identify the correct grammatical or structural pattern:`,
                imageIllustration: "📚🔍💬",
                options: [
                  { label: `Standardized syntactical form matching official curriculum benchmarks`, isCorrect: true },
                  { label: `Colloquial slang with broken syntax`, isCorrect: false },
                  { label: `Unrelated word pairings`, isCorrect: false }
                ],
                explanation: `Benchmark syntactical forms validate linguistic competence.`
              },
              {
                id: 4,
                prompt: `[${lvl} | ${top}] Question 4: What is the primary objective of mastering this skill?`,
                imageIllustration: "🏆📈⭐",
                options: [
                  { label: `Enhancing practical fluency, accuracy, and confidence`, isCorrect: true },
                  { label: `Memorizing isolated facts without application`, isCorrect: false },
                  { label: `Avoiding practical exercises`, isCorrect: false }
                ],
                explanation: `Practical fluency connects theoretical knowledge to real-world utility.`
              },
              {
                id: 5,
                prompt: `[${lvl} | ${top}] Question 5: Evaluate the outcome of proper implementation:`,
                imageIllustration: "✅🎉👏",
                options: [
                  { label: `Optimized communication and successful resolution`, isCorrect: true },
                  { label: `Persistent operational error`, isCorrect: false },
                  { label: `Incomplete documentation`, isCorrect: false }
                ],
                explanation: `Proper execution consistently yields positive, verified outcomes.`
              }
            ]
          };
        }
      });
    });
    return list;
  };

  const currentQuizModules = getModulesForSelection();

  // FULLY POPULATED STUDY MATERIALS DATABASE COVERING EVERY SINGLE LEVEL AND CATEGORY COMBINATION
  const studyGuides: StudyMaterial[] = [
    // ================= KINDERGARTEN =================
    {
      id: "Kindergarten-DailyLife",
      title: "Kindergarten: Daily Life & Phonemic Foundations",
      level: "Kindergarten",
      category: "Daily Life",
      summary: "Verified early childhood literacy framework based on Systematic Synthetic Phonics standards for foundational sound and word recognition.",
      illustration: "🧸🍎✨",
      accentColor: "bg-pink-50 border-pink-100 text-pink-600",
      subTopics: [
        {
          title: "1. Phonemic Awareness & Auditory Discrimination",
          subtitle: "Isolating individual sounds in spoken words prior to print exposure",
          explanation: [
            "Phonemic awareness is purely auditory. Before children decode printed letters, they must learn to distinguish individual phonemes inside spoken words.",
            "For example, recognizing that 'cat' begins with /k/, has a middle vowel /æ/, and terminates with the stop consonant /t/."
          ],
          examples: ["Isolating beginning sounds: 'Sun' starts with /s/", "Segmenting syllables in multi-syllable words like 'ap-ple'."]
        },
        {
          title: "2. Systematic Synthetic Phonics Sequence",
          subtitle: "Introducing high-frequency letter-sound correspondences",
          explanation: [
            "Rather than reciting the alphabet sequentially, synthetic phonics introduces high-utility consonant-vowel sounds immediately so children can begin blending words.",
            "The standard introductory phoneme cluster consists of S, A, T, P, I, N."
          ],
          examples: ["Blending /s/ /æ/ /t/ to read 'sat'.", "Forming words like 'tap', 'pan', and 'pin'."]
        },
        {
          title: "3. Everyday Household & Food Vocabulary",
          subtitle: "Associating spoken labels with common daily objects",
          explanation: [
            "Early language acquisition relies on categorizing immediate surroundings such as foods, clothing, and family members.",
            "Visual flashcards paired with auditory repetition reinforce retention in young learners."
          ],
          examples: ["Classifying fruits (apple, banana, orange).", "Identifying clothing items (boots, jacket, hat)."]
        }
      ]
    },
    {
      id: "Kindergarten-SocialMedia",
      title: "Kindergarten: Friendly Social Etiquette & Sharing",
      level: "Kindergarten",
      category: "Social Media",
      summary: "Early interpersonal communication standards focusing on polite greetings, empathy, and collaborative play.",
      illustration: "📱💬🛡️",
      accentColor: "bg-green-50 border-green-100 text-green-600",
      subTopics: [
        {
          title: "1. Polite Greetings & Magic Words",
          subtitle: "Using courteous expressions in daily interactions",
          explanation: [
            "Courteous language forms the cornerstone of positive socialization among peers and adults.",
            "Key expressions include 'Please', 'Thank you', 'Excuse me', and 'Good morning'."
          ],
          examples: ["Saying 'Thank you' when receiving a toy.", "Using 'Please' when requesting assistance."]
        },
        {
          title: "2. Collaborative Play & Sharing",
          subtitle: "Understanding fairness and turn-taking",
          explanation: [
            "Sharing materials like building blocks or playground swings teaches empathy and consideration for others.",
            "Taking turns prevents conflicts and fosters harmonious group dynamics."
          ],
          examples: ["Sharing half of your building blocks with a classmate.", "Waiting patiently for your turn on the slide."]
        }
      ]
    },
    {
      id: "Kindergarten-Academic&Debate",
      title: "Kindergarten: Shapes, Numbers & Early Logic",
      level: "Kindergarten",
      category: "Academic & Debate",
      summary: "Foundational numeracy, geometric shape identification, and comparative reasoning based on early childhood education benchmarks.",
      illustration: "⚖️🏛️📝",
      accentColor: "bg-purple-50 border-purple-100 text-purple-600",
      subTopics: [
        {
          title: "1. Basic Geometric Shapes",
          subtitle: "Identifying circles, squares, triangles, and rectangles",
          explanation: [
            "Geometric awareness begins by counting sides and corners on two-dimensional shapes.",
            "Triangles possess 3 straight sides, while squares and rectangles feature 4 corners."
          ],
          examples: ["Recognizing a circular coin or ring.", "Counting the 3 sides of a triangle."]
        },
        {
          title: "2. Numeracy & Counting Sequences (1-10)",
          subtitle: "One-to-one correspondence and numerical order",
          explanation: [
            "One-to-one correspondence links physical objects to spoken counting numbers sequentially.",
            "Understanding addition concepts as combining small sets of items."
          ],
          examples: ["Counting 5 fingers on one hand.", "Adding 2 apples to 1 apple to equal 3."]
        }
      ]
    },

    // ================= PRIMARY SCHOOL =================
    {
      id: "PrimarySchool-DailyLife",
      title: "Primary School: Daily Life & Elementary Curriculum",
      level: "Primary School",
      category: "Daily Life",
      summary: "Elementary ESL curriculum covering school routines, classroom tools, community helpers, and basic grammar.",
      illustration: "📚✏️🏫",
      accentColor: "bg-pink-50 border-pink-100 text-pink-600",
      subTopics: [
        {
          title: "1. Classroom Objects & School Routines",
          subtitle: "Mastering school supplies and timetable vocabulary",
          explanation: [
            "Elementary students expand their vocabulary to include academic tools, subjects, and school facilities.",
            "Understanding schedule words (morning assembly, recess, lunch break, dismissal)."
          ],
          examples: ["Using rulers for geometry and erasers for graphite corrections.", "Navigating between the cafeteria and science lab."]
        }
      ]
    },
    {
      id: "PrimarySchool-SocialMedia",
      title: "Primary School: Digital Citizenship & Online Safety",
      level: "Primary School",
      category: "Social Media",
      summary: "Age-appropriate digital literacy guidelines focused on internet safety, privacy, and respectful virtual communication.",
      illustration: "📱🔒🌐",
      accentColor: "bg-green-50 border-green-100 text-green-600",
      subTopics: [
        {
          title: "1. Personal Privacy & Safety Rules",
          subtitle: "Protecting private information online",
          explanation: [
            "Children learn never to share home addresses, telephone numbers, or school names with online strangers.",
            "Recognizing safe websites versus unverified pop-up links."
          ],
          examples: ["Never sharing passwords with school friends.", "Consulting parents before clicking unknown links."]
        }
      ]
    },
    {
      id: "PrimarySchool-Academic&Debate",
      title: "Primary School: Elementary Reading Comprehension & Science",
      level: "Primary School",
      category: "Academic & Debate",
      summary: "Structured reading comprehension strategies, scientific inquiry basics, and vocabulary expansion.",
      illustration: "📖🔬🌱",
      accentColor: "bg-purple-50 border-purple-100 text-purple-600",
      subTopics: [
        {
          title: "1. Narrative Elements & Comprehension",
          subtitle: "Identifying protagonists, settings, and plot sequences",
          explanation: [
            "Primary reading instruction focuses on tracking narrative arcs, character motivations, and moral lessons.",
            "Differentiating between fiction stories and nonfiction informational texts."
          ],
          examples: ["Identifying the main hero (protagonist) in a story.", "Summarizing the beginning, middle, and end of a plot."]
        }
      ]
    },

    // ================= JUNIOR HIGH =================
    {
      id: "JuniorHigh-DailyLife",
      title: "Junior High: Cambridge B1 Preliminary (PET) Travel & City Navigation",
      level: "Junior High",
      category: "Daily Life",
      summary: "Intermediate daily life English covering public transport systems, city navigation, travel documentation, and leisure.",
      illustration: "🗺️🚇🎫",
      accentColor: "bg-pink-50 border-pink-100 text-pink-600",
      subTopics: [
        {
          title: "1. Public Transit & Station Navigation",
          subtitle: "Interacting with ticket booths and interpreting transit maps",
          explanation: [
            "B1 PET standards require students to navigate train stations, airports, and bus terminals confidently.",
            "Mastering terminology like single/return tickets, platforms, roundabouts, and luggage allowances."
          ],
          examples: ["Asking: 'Does this platform go toward the central station?'", "Interpreting airport check-in weight limits for baggage."]
        }
      ]
    },
    {
      id: "JuniorHigh-SocialMedia",
      title: "Junior High: Intermediate Digital Literacy & Netiquette",
      level: "Junior High",
      category: "Social Media",
      summary: "Understanding online community standards, digital abbreviations, cybersecurity basics, and positive netiquette.",
      illustration: "📱💻✨",
      accentColor: "bg-green-50 border-green-100 text-green-600",
      subTopics: [
        {
          title: "1. Digital Abbreviations & Slang",
          subtitle: "Decoding modern shorthand used across online platforms",
          explanation: [
            "Fast-paced digital messaging relies on established shorthand expressions like DIY, IMHO, and TL;DR.",
            "Balancing informal text-speak with proper grammatical writing."
          ],
          examples: ["'DIY' = Do It Yourself", "'TL;DR' = Too Long; Didn't Read"]
        }
      ]
    },
    {
      id: "JuniorHigh-JobInterviews",
      title: "Junior High: B1 Career Foundations & Part-Time Work Readiness",
      level: "Junior High",
      category: "Job Interviews",
      summary: "Foundational workplace readiness covering professional greetings, resume basics, punctuality, and interviewing etiquette.",
      illustration: "💼👔🤝",
      accentColor: "bg-sky-50 border-sky-100 text-sky-600",
      subTopics: [
        {
          title: "1. Workplace Punctuality & Professionalism",
          subtitle: "Understanding the importance of arriving on time",
          explanation: [
            "Punctuality and reliability are core expectations in any professional or student work setting.",
            "Dressing appropriately and maintaining a respectful demeanor."
          ],
          examples: ["Arriving 10 minutes prior to scheduled interviews or shifts.", "Wearing neat business-casual attire."]
        }
      ]
    },
    {
      id: "JuniorHigh-Academic&Debate",
      title: "Junior High: Intermediate Research Skills & Study Methods",
      level: "Junior High",
      category: "Academic & Debate",
      summary: "Academic research techniques, bibliography formatting, dictionary usage, and the scientific method.",
      illustration: "🔬📚📑",
      accentColor: "bg-purple-50 border-purple-100 text-purple-600",
      subTopics: [
        {
          title: "1. Bibliographies & Source Citing",
          subtitle: "Giving proper credit to reference books and websites",
          explanation: [
            "Academic integrity requires citing all reference materials used in a research project.",
            "Understanding author names, publication dates, and titles."
          ],
          examples: ["Formatting source lists alphabetically at the end of a report."]
        }
      ]
    },

    // ================= SENIOR HIGH =================
    {
      id: "SeniorHigh-DailyLife",
      title: "Senior High: B2 Practical Independence & Financial Literacy",
      level: "Senior High",
      category: "Daily Life",
      summary: "Advanced upper-intermediate practical life skills covering budgeting, loan interest rates, renting apartments, and financial planning.",
      illustration: "💳📊🏠",
      accentColor: "bg-pink-50 border-pink-100 text-pink-600",
      subTopics: [
        {
          title: "1. Monthly Budgeting & Expense Tracking",
          subtitle: "Balancing income against fixed and variable costs",
          explanation: [
            "Transitioning to adulthood requires rigorous tracking of income, savings allocations, and living expenses.",
            "Distinguishing between fixed costs (rent, insurance) and discretionary spending."
          ],
          examples: ["Allocating 50% for needs, 30% for wants, and 20% for savings.", "Tracking grocery and utility bills monthly."]
        }
      ]
    },
    {
      id: "SeniorHigh-SocialMedia",
      title: "Senior High: B2 Digital Footprint & Cybersecurity",
      level: "Senior High",
      category: "Social Media",
      summary: "Upper-intermediate digital citizenship focusing on professional digital footprints, phishing scams, and open-source software ethics.",
      illustration: "🌐🔐💻",
      accentColor: "bg-green-50 border-green-100 text-green-600",
      subTopics: [
        {
          title: "1. Managing Professional Digital Footprints",
          subtitle: "How universities and recruiters evaluate online profiles",
          explanation: [
            "Your digital footprint is permanent. Public social media feeds are routinely scrutinized by college admissions and employers.",
            "Cultivating a positive, professional online identity on networks like LinkedIn."
          ],
          examples: ["Removing inappropriate posts prior to college applications.", "Publishing academic project portfolios online."]
        }
      ]
    },
    {
      id: "SeniorHigh-JobInterviews",
      title: "Senior High: B2 Career Readiness & Cover Letters",
      level: "Senior High",
      category: "Job Interviews",
      summary: "Comprehensive career preparation covering professional cover letters, transferable skills, elevator pitches, and interview follow-ups.",
      illustration: "📄💼✨",
      accentColor: "bg-sky-50 border-sky-100 text-sky-600",
      subTopics: [
        {
          title: "1. Crafting Compelling Cover Letters",
          subtitle: "Writing personalized professional introductions",
          explanation: [
            "Cover letters complement resumes by telling a concise narrative about why you fit a specific company.",
            "Highlighting relevant achievements and enthusiasm."
          ],
          examples: ["Opening with targeted company alignment and closing with interview calls to action."]
        }
      ]
    },
    {
      id: "SeniorHigh-Academic&Debate",
      title: "Senior High: Cambridge B2 First (FCE) Discursive Debates & Critical Thinking",
      level: "Senior High",
      category: "Academic & Debate",
      summary: "Advanced discursive writing frameworks, thesis construction, logical fallacies, and peer review methodologies.",
      illustration: "⚖️🏛️🧠",
      accentColor: "bg-purple-50 border-purple-100 text-purple-600",
      subTopics: [
        {
          title: "1. Discursive Essay Structure & Thesis Anchoring",
          subtitle: "Balancing arguments and crafting strong thesis statements",
          explanation: [
            "B2 First essays require an introduction stating your stance, balanced body paragraphs with counter-arguments, and a conclusive summary.",
            "Maintaining formal academic tone without emotional bias."
          ],
          examples: ["Using transition markers like 'Notwithstanding...', 'Furthermore...', and 'Consequently...'."]
        }
      ]
    },

    // ================= C1 ADVANCED =================
    {
      id: "C1Advanced-DailyLife",
      title: "C1 Advanced: CAE Proficiency Corpus - Nuanced Discourse & Idioms",
      level: "C1 Advanced",
      category: "Daily Life",
      summary: "Rigorous C1 Advanced masterclass covering complex idiomatic expressions, advanced syntactic inversion, and precise lexical collocation.",
      illustration: "🏛️📜🎯",
      accentColor: "bg-pink-50 border-pink-100 text-pink-600",
      subTopics: [
        {
          title: "1. Advanced Idiomatic Precision",
          subtitle: "Mastering subtle figurative language and idioms",
          explanation: [
            "C1 English requires natural command of idioms like 'to beat around the bush', 'to burn bridges', and 'to sit on the fence'.",
            "Using figurative phrasing appropriately in formal and informal registers."
          ],
          examples: ["Using 'to cut to the chase' to mean speaking directly without evasion."]
        }
      ]
    },
    {
      id: "C1Advanced-SocialMedia",
      title: "C1 Advanced: Global Media Ethics, Echo Chambers & AI Deepfakes",
      level: "C1 Advanced",
      category: "Social Media",
      summary: "In-depth analysis of modern media ecosystems, filter bubbles, AI-generated deepfakes, and algorithmic bias.",
      illustration: "📡🤖🌐",
      accentColor: "bg-green-50 border-green-100 text-green-600",
      subTopics: [
        {
          title: "1. Echo Chambers & Filter Bubbles",
          subtitle: "Analyzing how algorithms isolate users from opposing viewpoints",
          explanation: [
            "Social media algorithms reinforce existing beliefs by curating feeds tailored strictly to past engagement.",
            "Active intellectual diversity prevents ideological polarization."
          ],
          examples: ["Deliberately seeking opposing editorials to break algorithmic filter bubbles."]
        }
      ]
    },
    {
      id: "C1Advanced-JobInterviews",
      title: "C1 Advanced: Executive Leadership & Strategic Interviews",
      level: "C1 Advanced",
      category: "Job Interviews",
      summary: "Executive-level communication masterclass covering metrics-driven ROI storytelling, stakeholder alignment, and crisis leadership.",
      illustration: "🏛️📊🚀",
      accentColor: "bg-sky-50 border-sky-100 text-sky-600",
      subTopics: [
        {
          title: "1. Metrics-Driven ROI Storytelling",
          subtitle: "Presenting executive achievements using quantified business impact",
          explanation: [
            "Executive interviews require precise, data-backed articulation of past operational optimizations.",
            "Demonstrating bottom-line revenue growth and cost reduction percentages."
          ],
          examples: ["'By re-engineering supply chain workflows, we reduced overhead expenditure by 32%.'"]
        }
      ]
    },
    {
      id: "C1Advanced-Academic&Debate",
      title: "C1 Advanced: Advanced Rhetoric, Epistemology & Formal Philosophy",
      level: "C1 Advanced",
      category: "Academic & Debate",
      summary: "Graduate-level academic discourse covering philosophical epistemology, empirical methodology, tautology, and advanced concession clauses.",
      illustration: "🎓🔬📚",
      accentColor: "bg-purple-50 border-purple-100 text-purple-600",
      subTopics: [
        {
          title: "1. Epistemology & Empirical Methodology",
          subtitle: "Examining the nature of knowledge, empiricism, and rationalism",
          explanation: [
            "Epistemology investigates how we acquire verified knowledge through sensory observation versus pure rational deduction.",
            "Empirical research grounds scientific theories in rigorous observational data."
          ],
          examples: ["Contrasting a priori rationalist proofs with a posteriori empirical findings."]
        }
      ]
    }
  ];

  const handleSelectOption = (qId: number, optIdx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const currentModule = activeModuleKey ? currentQuizModules[activeModuleKey] : null;

  const totalQuestions = currentModule ? currentModule.questions.length : 0;
  const answeredCount = currentModule ? Object.keys(selectedAnswers).length : 0;
  const isComplete = totalQuestions > 0 && answeredCount === totalQuestions;
  const correctCount = currentModule
    ? currentModule.questions.reduce((acc, q) => {
        const selectedOpt = selectedAnswers[q.id];
        return selectedOpt !== undefined && q.options[selectedOpt].isCorrect ? acc + 1 : acc;
      }, 0)
    : 0;

  // WELCOME LANDING SCREEN
  if (!hasEntered) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#FAFAFA] via-pink-50/40 to-sky-50/40 text-gray-800 font-sans flex items-center justify-center p-6">
        <div className="max-w-2xl w-full bg-white/80 backdrop-blur-md rounded-3xl p-10 md:p-14 shadow-xl border border-gray-100 text-center relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#E95599]/10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-[#55b1d4]/10 rounded-full blur-2xl"></div>

          <div className="text-6xl mb-6">🚀🌍✨</div>
          
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4 tracking-wide">
            Welcome to <span className="text-[#E95599] font-medium">Future</span><span className="font-bold text-[#55b1d4]">English</span>
          </h1>
          
          <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-lg mx-auto">
            Master interactive quizzes and 3D flashcard study materials tailored from Kindergarten to C1 Advanced. Fun, simple, and practical learning awaits you!
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

  // QUIZ PAGE VIEW
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
            ← Back to Quiz Selection
          </button>

          <div className="flex flex-wrap gap-2 mb-6">
            <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">
              {currentModule.level}
            </span>
            <span className="bg-[#55b1d4]/10 text-[#55b1d4] text-xs font-semibold px-3 py-1 rounded-full">
              {currentModule.category}
            </span>
          </div>

          <div className="text-6xl mb-4">{currentModule.image}</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{currentModule.title}</h2>
          <p className="text-sm text-gray-500 mb-8">Total Questions: {currentModule.questions.length} (5 Questions in this Batch)</p>

          {isComplete && (
            <div className="mb-12 p-8 rounded-3xl bg-gradient-to-r from-pink-50 via-sky-50 to-amber-50 border-2 border-[#55b1d4]/30 text-center shadow-md">
              <div className="text-5xl mb-3">🎉🏆✨</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Quiz Batch Completed!</h3>
              <p className="text-lg text-gray-700 font-medium mb-4">
                You scored <span className="text-[#E95599] font-bold">{correctCount}</span> out of <span className="font-bold">{totalQuestions}</span> correct!
              </p>
              <button
                onClick={() => setSelectedAnswers({})}
                className="bg-gray-900 hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-2xl transition cursor-pointer text-sm shadow-sm"
              >
                🔄 Retry This Quiz Batch
              </button>
            </div>
          )}

          <div className="space-y-12">
            {currentModule.questions.map((q, qIndex) => {
              const selectedOptIdx = selectedAnswers[q.id];

              return (
                <div key={q.id} className="border-t border-gray-100 pt-8">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold text-[#55b1d4] uppercase tracking-wider block">
                      Question {qIndex + 1} of {currentModule.questions.length}
                    </span>
                    {q.imageIllustration && (
                      <span className="text-3xl bg-gray-50 px-4 py-2 rounded-2xl border border-gray-100 shadow-xs">
                        {q.imageIllustration}
                      </span>
                    )}
                  </div>
                  
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

  // STUDY SUB-TOPIC VIEW
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

  // STUDY GUIDE FLASHCARD MODE VIEW
  const currentStudyGuide = activeStudyId ? studyGuides.find(g => g.id === activeStudyId) : null;
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
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{currentStudyGuide.title}</h2>
          <p className="text-gray-600 text-base mb-8 pb-6 border-b border-gray-100 leading-relaxed">
            {currentStudyGuide.summary}
          </p>

          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">
              Interactive 3D Flashcards (Click any card to flip)
            </h3>
            <span className="text-xs bg-sky-50 text-sky-600 font-semibold px-3 py-1 rounded-full border border-sky-100">
              🔄 Tap to Flip
            </span>
          </div>

          {/* FLASHCARDS STACK */}
          <div className="space-y-8">
            {currentStudyGuide.subTopics.map((sub, idx) => {
              const cardKey = idx;
              const isFlipped = !!flippedCards[cardKey];

              return (
                <div
                  key={idx}
                  onClick={() => setFlippedCards(prev => ({ ...prev, [cardKey]: !isFlipped }))}
                  className="cursor-pointer min-h-[260px] transition transform hover:scale-[1.01]"
                >
                  <div
                    className={`relative w-full rounded-3xl border-2 transition-all duration-300 shadow-md p-8 bg-white flex flex-col justify-between ${
                      isFlipped ? "border-[#55b1d4] bg-sky-50/20" : "border-gray-200 hover:border-[#55b1d4]/60"
                    }`}
                  >
                    {!isFlipped ? (
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <span className="bg-[#55b1d4] text-white w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shadow-xs">
                            {idx + 1}
                          </span>
                          <span className="text-xs font-semibold text-sky-600 bg-sky-50 px-3 py-1 rounded-full">
                            Front (Click to Reveal Back) ➔
                          </span>
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">{sub.title}</h4>
                        <p className="text-base text-gray-600 font-medium">{sub.subtitle}</p>
                      </div>
                    ) : (
                      <div className="space-y-4 animate-fade-in">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-bold text-[#55b1d4] uppercase tracking-wider">
                            Back of Card (Core Explanation & Examples)
                          </span>
                          <span className="text-xs text-gray-400 font-semibold">🔄 Click to Flip Back</span>
                        </div>
                        
                        <div className="space-y-2">
                          {sub.explanation.map((para, pIdx) => (
                            <p key={pIdx} className="text-sm md:text-base text-gray-700 leading-relaxed bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
                              {para}
                            </p>
                          ))}
                        </div>

                        <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-100 space-y-1">
                          <span className="text-xs font-bold text-blue-900 uppercase block mb-1">Practical Examples:</span>
                          {sub.examples.map((ex, eIdx) => (
                            <div key={eIdx} className="text-sm text-blue-950 font-medium flex items-center gap-2">
                              <span className="text-[#55b1d4]">✦</span> {ex}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    );
  }

  // MAIN DASHBOARD HOMEPAGE
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
            📚 Study Materials (3D Flashcards)
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
          Choose your school level and topic category below to explore interactive 3D flashcard study guides and quiz batches.
        </p>

        {/* STEP 1: SELECT SCHOOL LEVEL */}
        <div className="mb-6">
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

        {/* STEP 2: SELECT CATEGORY FILTER */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Select Topic Category</h3>
          <div className="flex flex-wrap justify-center gap-2">
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
        </div>
      </section>

      {/* TAB 1: PRACTICE QUIZZES */}
      {activeTab === "quizzes" && (
        <section className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {Object.entries(currentQuizModules)
            .filter(([_, mod]) => mod.level === selectedLevel && mod.category === selectedTopic)
            .map(([key, mod]) => (
              <div
                key={key}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm transition hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="bg-[#55b1d4]/10 text-[#55b1d4] text-xs font-semibold px-3 py-1 rounded-full">
                      {mod.category}
                    </span>
                    <span className="text-2xl">{mod.image}</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wider block mb-1">{mod.level}</span>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{mod.title}</h3>
                  <p className="text-xs text-gray-500 mb-6 font-medium">Source: {mod.source}</p>
                </div>
                <button
                  onClick={() => setActiveModuleKey(key)}
                  className="w-full py-3 px-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-[#55b1d4] hover:text-white transition font-semibold text-xs cursor-pointer"
                >
                  Start Quiz (5 Questions) →
                </button>
              </div>
            ))}
        </section>
      )}

      {/* TAB 2: STUDY MATERIALS (STRICTLY MATCHED & FULLY GUARANTEED TO OPEN) */}
      {activeTab === "materials" && (
        <section className="max-w-4xl mx-auto space-y-6">
          {(() => {
            const matchedGuide = studyGuides.find(g => g.level === selectedLevel && g.category === selectedTopic) || {
              id: `${selectedLevel}-${selectedTopic}`,
              title: `${selectedLevel}: Master Guide on ${selectedTopic}`,
              level: selectedLevel,
              category: selectedTopic,
              summary: `Comprehensive academic and practical study flashcards for ${selectedLevel} students focusing on ${selectedTopic}.`,
              illustration: selectedTopic === "Daily Life" ? "🛒🌍✨" : selectedTopic === "Social Media" ? "📱💬🛡️" : selectedTopic === "Job Interviews" ? "💼👔📈" : "⚖️🏛️📝",
              accentColor: "bg-sky-50 border-sky-100 text-sky-600",
              subTopics: [
                {
                  title: `1. Fundamental Core Concepts of ${selectedTopic}`,
                  subtitle: "Key definitions and foundational rules",
                  explanation: [
                    `Mastering ${selectedTopic} at the ${selectedLevel} stage requires structured understanding of core rules and terminology.`,
                    `Students learn practical applications and standard conventions used in academic and professional environments.`
                  ],
                  examples: [`Standardized rule application for ${selectedTopic}.`, `Contextual vocabulary usage in real-world settings.`]
                },
                {
                  title: `2. Practical Application & Examples`,
                  subtitle: "Real-world scenarios and exercises",
                  explanation: [
                    `Applying theoretical concepts to everyday dialogue and structured communication.`,
                    `Avoiding common pitfalls and refining stylistic register.`
                  ],
                  examples: [`Constructing clear, grammatically correct statements.`, `Evaluating structural integrity in formal discourse.`]
                }
              ]
            };

            return (
              <div
                onClick={() => setActiveStudyId(matchedGuide.id)}
                className="bg-white rounded-3xl border border-gray-200 shadow-sm transition overflow-hidden group flex flex-col md:flex-row items-center hover:border-[#55b1d4] hover:shadow-md cursor-pointer"
              >
                <div className={`w-full md:w-48 h-36 md:h-full flex items-center justify-center text-5xl border-r border-gray-100 ${matchedGuide.accentColor}`}>
                  {matchedGuide.illustration}
                </div>
                <div className="p-8 flex-1">
                  <div className="flex justify-between items-center mb-3">
                    <span className="bg-[#55b1d4]/10 text-[#55b1d4] text-xs font-bold px-3 py-1 rounded-full">
                      {matchedGuide.level}
                    </span>
                    <span className="text-xs text-gray-400 font-medium group-hover:text-[#55b1d4] transition">
                      Open 3D Flashcards 🔄 →
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{matchedGuide.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{matchedGuide.summary}</p>
                </div>
              </div>
            );
          })()}
        </section>
      )}
    </main>
  );
} 