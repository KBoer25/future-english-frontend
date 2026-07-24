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
      "Advanced Rhetoric & Nuance",
      "Geopolitics & International Law"
    ];
  };

  const topics = getTopicsForLevel(selectedLevel);

  // TOPIC & LEVEL SPECIFIC UNIT ENGINE
  const getUnitsForTopic = (lvl: string, top: string): UnitModule[] => {
    const key = `${lvl}_${top}`;

    const staticDatabase: Record<string, UnitModule[]> = {
      // ----------------------------------------------------
      // KINDERGARTEN / PRIMARY SCHOOL TIER
      // ----------------------------------------------------
      "Kindergarten_Days, Months & Seasons": [
        {
          id: "K_Days_U1", unitNumber: 1, title: "Unit 1: Days of the Week",
          summary: "Learn the seven days of the week from Monday to Sunday.",
          illustration: "📅", accentColor: "bg-sky-50 border-sky-100 text-sky-600",
          paragraphs: [
            "There are seven special days in every single week. We go to school from Monday through Friday, and we relax or play on Saturday and Sunday.",
            "Saying them in order helps us know what comes next: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, and Sunday."
          ],
          vocabulary: [
            { word: "Monday", phonetic: "/ˈmʌndeɪ/", partOfSpeech: "Noun", definition: "The first day of the working week.", example: "We start school fresh on Monday morning.", illustrationIcon: "🎒" },
            { word: "Saturday", phonetic: "/ˈsætərdeɪ/", partOfSpeech: "Noun", definition: "The first day of the weekend.", example: "I love playing soccer outside on Saturday.", illustrationIcon: "⚽" },
            { word: "Week", phonetic: "/wiːk/", partOfSpeech: "Noun", definition: "A period of seven days.", example: "There are seven days in a full week.", illustrationIcon: "📆" }
          ],
          grammar: {
            ruleTitle: "Capitalizing Days of the Week",
            explanation: "Always use a capital letter at the beginning of any day of the week because they are proper nouns.",
            correctExample: "Today is Monday.", incorrectExample: "today is monday.", tip: "Days always wear capital letter hats!"
          },
          practicalApplication: "Tell your partner what your absolute favorite day of the week is.",
          questions: [
            { id: 1, prompt: "Which day comes right after Monday?", options: [{ label: "Tuesday", isCorrect: true }, { label: "Sunday", isCorrect: false }, { label: "Friday", isCorrect: false }], explanation: "Tuesday follows Monday in the weekly cycle." },
            { id: 2, prompt: "What is the very first day of the working week?", options: [{ label: "Monday", isCorrect: true }, { label: "Saturday", isCorrect: false }, { label: "Sunday", isCorrect: false }], explanation: "Monday is the start of the school/work week." },
            { id: 3, prompt: "How many total days are in one week?", options: [{ label: "Seven days", isCorrect: true }, { label: "Five days", isCorrect: false }, { label: "Ten days", isCorrect: false }], explanation: "A standard week consists of seven days." },
            { id: 4, prompt: "Which of these is a weekend day?", options: [{ label: "Sunday", isCorrect: true }, { label: "Wednesday", isCorrect: false }, { label: "Thursday", isCorrect: false }], explanation: "Sunday is part of the weekend." },
            { id: 5, prompt: "How should the word 'friday' be written correctly?", options: [{ label: "Friday", isCorrect: true }, { label: "friday", isCorrect: false }, { label: "FRIDAYs", isCorrect: false }], explanation: "Days of the week require capitalization." },
            { id: 6, prompt: "What comes right before Wednesday?", options: [{ label: "Tuesday", isCorrect: true }, { label: "Thursday", isCorrect: false }, { label: "Monday", isCorrect: false }], explanation: "Tuesday comes before Wednesday." },
            { id: 7, prompt: "Which day is the middle of the standard school week?", options: [{ label: "Wednesday", isCorrect: true }, { label: "Sunday", isCorrect: false }, { label: "Saturday", isCorrect: false }], explanation: "Wednesday is midweek." },
            { id: 8, prompt: "If today is Saturday, what day is tomorrow?", options: [{ label: "Sunday", isCorrect: true }, { label: "Friday", isCorrect: false }, { label: "Monday", isCorrect: false }], explanation: "Sunday follows Saturday." },
            { id: 9, prompt: "Which day ends the weekend?", options: [{ label: "Sunday", isCorrect: true }, { label: "Monday", isCorrect: false }, { label: "Friday", isCorrect: false }], explanation: "Sunday is the final weekend day before Monday." },
            { id: 10, prompt: "Identify the correct sentence structure.", options: [{ label: "We have art class on Thursday.", isCorrect: true }, { label: "We have art class on thursday.", isCorrect: false }, { label: "Thursday on class art have we.", isCorrect: false }], explanation: "Capitalized day name with proper word order." }
          ]
        },
        {
          id: "K_Days_U2", unitNumber: 2, title: "Unit 2: Months of the Year",
          summary: "Explore the twelve months from January to December.",
          illustration: "🗓️", accentColor: "bg-sky-50 border-sky-100 text-sky-600",
          paragraphs: [
            "A full year has twelve separate months. Each month brings different holidays, weather changes, and fun celebrations.",
            "January starts the year off, and December brings us cozy winter holidays at the very end."
          ],
          vocabulary: [
            { word: "January", phonetic: "/ˈdʒænjuɛri/", partOfSpeech: "Noun", definition: "The first month of the year.", example: "January is often very cold and snowy.", illustrationIcon: "❄️" },
            { word: "December", phonetic: "/dɪˈsɛmbər/", partOfSpeech: "Noun", definition: "The twelfth and final month of the year.", example: "December brings holiday celebrations.", illustrationIcon: "🎄" },
            { word: "Year", phonetic: "/jɪər/", partOfSpeech: "Noun", definition: "The time it takes the earth to orbit the sun, equal to 12 months.", example: "There are twelve months in every year.", illustrationIcon: "🌍" }
          ],
          grammar: {
            ruleTitle: "Capitalizing Months",
            explanation: "Like days, all twelve months must always begin with a capital letter.",
            correctExample: "My birthday is in July.", incorrectExample: "My birthday is in july.", tip: "Months are proper names too!"
          },
          practicalApplication: "Name the month in which your birthday happens.",
          questions: [
            { id: 1, prompt: "What is the first month of the year?", options: [{ label: "January", isCorrect: true }, { label: "December", isCorrect: false }, { label: "June", isCorrect: false }], explanation: "January opens the calendar year." },
            { id: 2, prompt: "How many months are in a single year?", options: [{ label: "Twelve months", isCorrect: true }, { label: "Ten months", isCorrect: false }, { label: "Seven months", isCorrect: false }], explanation: "There are 12 months in a year." },
            { id: 3, prompt: "Which month comes right after January?", options: [{ label: "February", isCorrect: true }, { label: "March", isCorrect: false }, { label: "December", isCorrect: false }], explanation: "February follows January." },
            { id: 4, prompt: "What is the final month of the year?", options: [{ label: "December", isCorrect: true }, { label: "January", isCorrect: false }, { label: "November", isCorrect: false }], explanation: "December closes out the year." },
            { id: 5, prompt: "How should 'march' be written in a sentence?", options: [{ label: "March", isCorrect: true }, { label: "march", isCorrect: false }, { label: "MARCHs", isCorrect: false }], explanation: "Months must always be capitalized." },
            { id: 6, prompt: "Which month usually brings summer vacation in many regions?", options: [{ label: "July", isCorrect: true }, { label: "January", isCorrect: false }, { label: "November", isCorrect: false }], explanation: "July falls mid-year during summer." },
            { id: 7, prompt: "What month comes right before October?", options: [{ label: "September", isCorrect: true }, { label: "August", isCorrect: false }, { label: "November", isCorrect: false }], explanation: "September precedes October." },
            { id: 8, prompt: "Which month is known for blooming spring flowers in the north?", options: [{ label: "April", isCorrect: true }, { label: "January", isCorrect: false }, { label: "October", isCorrect: false }], explanation: "April is famous for spring showers and flowers." },
            { id: 9, prompt: "How many months are there before July if you start at January?", options: [{ label: "Six months", isCorrect: true }, { label: "Four months", isCorrect: false }, { label: "Eight months", isCorrect: false }], explanation: "Jan, Feb, Mar, Apr, May, Jun are 6 months before July." },
            { id: 10, prompt: "Choose the correctly capitalized sentence.", options: [{ label: "School starts again in September.", isCorrect: true }, { label: "School starts again in september.", isCorrect: false }, { label: "september in starts school again.", isCorrect: false }], explanation: "Proper capitalization and grammar." }
          ]
        },
        {
          id: "K_Days_U3", unitNumber: 3, title: "Unit 3: Seasons and Weather",
          summary: "Discover spring, summer, autumn, and winter weather changes.",
          illustration: "🌤️", accentColor: "bg-sky-50 border-sky-100 text-sky-600",
          paragraphs: [
            "The earth goes through four main seasons: Spring, Summer, Autumn, and Winter. Each season brings unique weather and clothing choices.",
            "In winter we wear warm coats and boots, while summer brings bright sunshine and cool swimming pools!"
          ],
          vocabulary: [
            { word: "Summer", phonetic: "/ˈsʌmər/", partOfSpeech: "Noun", definition: "The warmest season of the year.", example: "We eat refreshing ice cream in summer.", illustrationIcon: "☀️" },
            { word: "Winter", phonetic: "/ˈwɪntər/", partOfSpeech: "Noun", definition: "The coldest season of the year.", example: "Snow falls from the sky during winter.", illustrationIcon: "❄️" },
            { word: "Spring", phonetic: "/sprɪŋ/", partOfSpeech: "Noun", definition: "The season when plants sprout and flowers bloom.", example: "Baby animals are born in spring.", illustrationIcon: "🌷" }
          ],
          grammar: {
            ruleTitle: "Descriptive Adjectives for Weather",
            explanation: "Use describing words before nouns to explain what the weather or season feels like.",
            correctExample: "It is a sunny summer day.", incorrectExample: "It is summer sunny day a.", tip: "Adjectives give extra colorful detail to nouns!"
          },
          practicalApplication: "Look outside the window and describe today's weather in one sentence.",
          questions: [
            { id: 1, prompt: "Which season is known for being very cold and snowy?", options: [{ label: "Winter", isCorrect: true }, { label: "Summer", isCorrect: false }, { label: "Spring", isCorrect: false }], explanation: "Winter brings freezing temperatures and snow." },
            { id: 2, prompt: "What is the warmest season of the year?", options: [{ label: "Summer", isCorrect: true }, { label: "Winter", isCorrect: false }, { label: "Autumn", isCorrect: false }], explanation: "Summer is characterized by heat and sunshine." },
            { id: 3, prompt: "When do flowers bloom and new plants sprout?", options: [{ label: "Spring", isCorrect: true }, { label: "Winter", isCorrect: false }, { label: "Autumn", isCorrect: false }], explanation: "Spring is the season of new plant growth." },
            { id: 4, prompt: "How many total seasons are in a year?", options: [{ label: "Four seasons", isCorrect: true }, { label: "Two seasons", isCorrect: false }, { label: "Twelve seasons", isCorrect: false }], explanation: "There are four distinct seasons." },
            { id: 5, prompt: "What clothing item do we wear outside in heavy winter snow?", options: [{ label: "A warm winter coat", isCorrect: true }, { label: "A swimming swimsuit", isCorrect: false }, { label: "Shorts and sandals", isCorrect: false }], explanation: "Coats keep us warm in winter." },
            { id: 6, prompt: "Which season comes right after summer in many places?", options: [{ label: "Autumn", isCorrect: true }, { label: "Spring", isCorrect: false }, { label: "Winter directly", isCorrect: false }], explanation: "Autumn follows summer." },
            { id: 7, prompt: "Choose the correct descriptive phrase for a bright day.", options: [{ label: "A sunny day", isCorrect: true }, { label: "A day sunny", isCorrect: false }, { label: "Sunny a day", isCorrect: false }], explanation: "Adjective precedes the noun." },
            { id: 8, prompt: "What falls from the clouds when it is freezing outside?", options: [{ label: "Snow", isCorrect: true }, { label: "Warm rain", isCorrect: false }, { label: "Sand", isCorrect: false }], explanation: "Freezing precipitation forms snow." },
            { id: 9, prompt: "Which season is associated with falling orange and red leaves?", options: [{ label: "Autumn", isCorrect: true }, { label: "Summer", isCorrect: false }, { label: "Spring", isCorrect: false }], explanation: "Autumn leaves change color and drop." },
            { id: 10, prompt: "Identify the correct weather sentence.", options: [{ label: "The weather is warm today.", isCorrect: true }, { label: "Warm is weather today the.", isCorrect: false }, { label: "Today warm weather is.", isCorrect: false }], explanation: "Natural English word order." }
          ]
        }
      ],

      // ----------------------------------------------------
      // C1 ADVANCED TIER (EXECUTIVE STRATEGY WITH TYPO FIX)
      // ----------------------------------------------------
      "C1 Advanced_Executive Corporate Strategy": [
        {
          id: "C1_Strat_U1", unitNumber: 1, title: "Unit 1: Stakeholder Capitalism and ESG Frameworks",
          summary: "Master corporate governance, environmental accountability, and ethics.",
          illustration: "🌐", accentColor: "bg-sky-50 border-sky-100 text-sky-600",
          paragraphs: [
            "Modern executive strategy has evolved from Milton Friedman's shareholder primacy model to stakeholder capitalism, prioritizing long-term value creation across employees, communities, and environments.",
            "Integrating Environmental, Social, and Governance (ESG) metrics ensures institutional resilience, regulatory compliance, and ethical stewardship."
          ],
          vocabulary: [
            { word: "Governance", phonetic: "/ˈɡʌvərnəns/", partOfSpeech: "Noun", definition: "The action or manner of governing an organization or corporation.", example: "Robust corporate governance ensures ethical leadership and transparency.", illustrationIcon: "⚖️" },
            { word: "Stewardship", phonetic: "/ˈstjuːərdʃɪp/", partOfSpeech: "Noun", definition: "The responsible overseeing and protection of something considered worth caring for.", example: "Environmental stewardship safeguards natural resources for future markets.", illustrationIcon: "🛡️" },
            { word: "Primacy", phonetic: "/ˈpraɪməsi/", partOfSpeech: "Noun", definition: "The fact of being preeminent, important, or first.", example: "The shift away from pure shareholder primacy redefines corporate purpose.", illustrationIcon: "👑" }
          ],
          grammar: {
            ruleTitle: "Advanced Subjunctive in Executive Mandates",
            explanation: "Use the formal subjunctive mood after executive demand or recommendation verbs in board resolutions.",
            correctExample: "It is imperative that the executive board prioritize ESG transparency prior to Q4.",
            incorrectExample: "It is imperative that the board prioritizes ESG transparency.",
            tip: "The subjunctive mood uses the clean base verb form without an 's'!"
          },
          practicalApplication: "Draft a board resolution statement using the formal subjunctive mood.",
          questions: [
            { id: 1, prompt: "What distinguishes 'stakeholder capitalism' from pure shareholder primacy?", options: [{ label: "Balancing interests across employees, communities, and environment alongside investors", isCorrect: true }, { label: "Focusing exclusively on quarterly stock price maximization", isCorrect: false }, { label: "Eliminating all corporate profit entirely", isCorrect: false }], explanation: "Stakeholder capitalism broadens corporate accountability." },
            { id: 2, prompt: "What do the letters ESG stand for in modern corporate governance?", options: [{ label: "Environmental, Social, and Governance", isCorrect: true }, { label: "Economic, Strategic, and Global", isCorrect: false }, { label: "Equity, Stocks, and Growth", isCorrect: false }], explanation: "ESG evaluates non-financial corporate impacts." },
            { id: 3, prompt: "Choose the correct formal subjunctive sentence.", options: [{ label: "It is vital that management adhere to stringent governance standards.", isCorrect: true }, { label: "It is vital that management adheres to governance standards.", isCorrect: false }, { label: "Management that adhere to governance vital is.", isCorrect: false }], explanation: "Subjunctive base verb 'adhere'." },
            { id: 4, prompt: "What is the primary objective of corporate 'stewardship'?", options: [{ label: "Responsible long-term protection of assets and environment", isCorrect: true }, { label: "Liquidating company property for immediate cash", isCorrect: false }, { label: "Ignoring regulatory compliance guidelines", isCorrect: false }], explanation: "Stewardship emphasizes responsible oversight." },
            { id: 5, prompt: "Complete: 'The board mandated that the CEO ___ quarterly sustainability audits.'", options: [{ label: "conduct", isCorrect: true }, { label: "conducts", isCorrect: false }, { label: "conducted", isCorrect: false }], explanation: "Subjunctive base form 'conduct'." },
            { id: 6, prompt: "Why do institutional investors increasingly incorporate ESG metrics?", options: [{ label: "To mitigate long-term regulatory and environmental risks", isCorrect: true }, { label: "To increase annual carbon emissions", isCorrect: false }, { label: "To avoid paying any corporate taxes ever", isCorrect: false }], explanation: "ESG mitigates long-term operational risks." },
            { id: 7, prompt: "Choose the proper English sentence.", options: [{ label: "Transparent corporate governance fosters enduring investor trust.", isCorrect: true }, { label: "Fosters transparent governance trust investor enduring.", isCorrect: false }, { label: "Investor trust enduring transparent governance fosters.", isCorrect: false }], explanation: "Subject + verb + object order." },
            { id: 8, prompt: "What does shareholder primacy prioritize above all else?", options: [{ label: "Maximizing financial returns for stock investors", isCorrect: true }, { label: "Community volunteer gardening hours", isCorrect: false }, { label: "Eliminating all commercial revenue", isCorrect: false }], explanation: "Shareholder primacy focuses on investor returns." },
            { id: 9, prompt: "How does effective governance prevent corporate fraud?", options: [{ label: "By enforcing robust internal controls, audits, and ethical oversight", isCorrect: true }, { label: "By hiding financial records in secret desk drawers", isCorrect: false }, { label: "By firing all accountants immediately", isCorrect: false }], explanation: "Governance controls deter fraudulent activity." },
            { id: 10, prompt: "What is the ultimate hallmark of a resilient modern enterprise?", options: [{ label: "Balancing profitable innovation with ethical social responsibility", isCorrect: true }, { label: "Pillaging natural resources without regulatory oversight", isCorrect: false }, { label: "Ignoring consumer protection laws completely", isCorrect: false }], explanation: "Resilient enterprises balance profit with ethics." }
          ]
        },
        {
          id: "C1_Strat_U2", unitNumber: 2, title: "Unit 2: Blue Ocean Strategy and Market Disruption",
          summary: "Master uncontested market space, value innovation, and disruption.",
          illustration: "🌊", accentColor: "bg-sky-50 border-sky-100 text-sky-600",
          paragraphs: [
            "W. Chan Kim and Renée Mauborgne's Blue Ocean Strategy proposes that enduring corporate growth stems from creating uncontested market space ('blue oceans') rather than competing in saturated industries ('red oceans').",
            "Value innovation—simultaneously pursuing differentiation and low cost—creates revolutionary leaps in buyer value while rendering existing competition irrelevant."
          ],
          vocabulary: [
            { word: "Uncontested", phonetic: "/ˌʌnkənˈtɛstɪd/", partOfSpeech: "Adjective", definition: "Not disputed or competed against by others.", example: "Create uncontested market space to achieve exponential growth.", illustrationIcon: "🌌" },
            { word: "Differentiation", phonetic: "/ˌdɪfərənʃiˈeɪʃən/", partOfSpeech: "Noun", definition: "The action of distinguishing something from others to create unique value.", example: "Product differentiation separates market leaders from commodity rivals.", illustrationIcon: "🎨" },
            { word: "Disruption", phonetic: "/dɪsˈrʌpʃən/", partOfSpeech: "Noun", definition: "Radical innovation that creates a new market and value network.", example: "Digital streaming caused massive disruption across traditional media.", illustrationIcon: "🚀" }
          ],
          grammar: {
            ruleTitle: "Syntactic Inversion for Strategic Emphasis",
            explanation: "Invert subject and auxiliary after negative introductory adverbials in executive memos.",
            correctExample: "Rarely had an incumbent firm witnessed such rapid market disruption.",
            incorrectExample: "Rarely an incumbent firm had witnessed such disruption.",
            tip: "Inversion adds authoritative rhetorical weight to strategic analyses!"
          },
          practicalApplication: "Formulate an inverted sentence describing a groundbreaking market innovation.",
          questions: [
            { id: 1, prompt: "What distinguishes a 'blue ocean' strategy from a 'red ocean' strategy?", options: [{ label: "Creating uncontested new market space vs competing in saturated industries", isCorrect: true }, { label: "Operating underwater marine shipping fleets vs land trucking", isCorrect: false }, { label: "Printing financial reports on blue paper vs red paper", isCorrect: false }], explanation: "Blue oceans represent uncontested market spaces." },
            { id: 2, prompt: "What is the core definition of 'value innovation'?", options: [{ label: "Simultaneously pursuing buyer value differentiation and lower cost", isCorrect: true }, { label: "Raising prices while reducing product quality drastically", isCorrect: false }, { label: "Copying competitor products with zero modifications", isCorrect: false }], explanation: "Value innovation merges differentiation and low cost." },
            { id: 3, prompt: "Choose the correct inverted strategic sentence.", options: [{ label: "Seldom does a disrupter follow traditional industry playbooks.", isCorrect: true }, { label: "Seldom a disrupter does follow traditional playbooks.", isCorrect: false }, { label: "Traditional playbooks seldom disrupter does follow.", isCorrect: false }], explanation: "Inversion structure: Seldom does + subject + verb." },
            { id: 4, prompt: "Why do existing incumbent firms often fall victim to market disruption?", options: [{ label: "They remain tethered to existing customer bases and legacy models", isCorrect: true }, { label: "They possess infinite amounts of agile cash reserves", isCorrect: false }, { label: "They predict future technology decades in advance", isCorrect: false }], explanation: "Incumbents suffer from innovator's dilemmas." },
            { id: 5, prompt: "Complete: 'Not only ___ the startup create a new category, but it rendered rivals obsolete.'", options: [{ label: "did", isCorrect: true }, { label: "does", isCorrect: false }, { label: "had", isCorrect: false }], explanation: "Inversion with past tense auxiliary 'did'." },
            { id: 6, prompt: "What does rendering existing competition 'irrelevant' mean?", options: [{ label: "Establishing such unique value that rivals cannot easily imitate you", isCorrect: true }, { label: "Bribing rival executives to close their offices permanently", isCorrect: false }, { label: "Ignoring customer preferences entirely", isCorrect: false }], explanation: "Blue oceans make rivalry irrelevant." },
            { id: 7, prompt: "Choose the proper English sentence.", options: [{ label: "Strategic innovation unlocks exponential revenue growth.", isCorrect: true }, { label: "Unlocks strategic innovation revenue exponential growth.", isCorrect: false }, { label: "Growth exponential strategic innovation unlocks revenue.", isCorrect: false }], explanation: "Subject + verb + object order." },
            { id: 8, prompt: "What is a red ocean market characterized by?", options: [{ label: "Bloody cutthroat competition in saturated existing spaces", isCorrect: true }, { label: "Peaceful cooperative sharing of monopoly profits", isCorrect: false }, { label: "Complete absence of any rival businesses", isCorrect: false }], explanation: "Red oceans feature fierce rivalry." },
            { id: 9, prompt: "How does product differentiation protect profit margins?", options: [{ label: "By offering unique features customers are willing to pay a premium for", isCorrect: true }, { label: "By selling products below manufacturing costs always", isCorrect: false }, { label: "By hiding products in secret warehouses", isCorrect: false }], explanation: "Differentiation commands pricing power." },
            { id: 10, prompt: "What is the ultimate strategic triumph of value innovation?", options: [{ label: "Simultaneously breaking cost-value trade-offs for customers", isCorrect: true }, { label: "Filing endless patent lawsuits against startups", isCorrect: false }, { label: "Maintaining stagnant monopoly pricing", isCorrect: false }], explanation: "Value innovation shatters trade-offs." }
          ]
        },
        {
          id: "C1_Strat_U3", unitNumber: 3, title: "Unit 3: Executive Succession Planning and Agile Leadership",
          summary: "Master talent pipelines, organizational agility, and change management.",
          illustration: "👥", accentColor: "bg-sky-50 border-sky-100 text-sky-600",
          paragraphs: [
            "Executive succession planning is a vital governance discipline ensuring seamless leadership continuity and mitigating operational vulnerability during executive transitions.",
            "Coupled with agile leadership methodologies, modern enterprises foster cross-functional adaptability, rapid iterative execution, and psychological safety across teams."
          ],
          vocabulary: [
            { word: "Succession", phonetic: "/səkˈsɛʃən/", partOfSpeech: "Noun", definition: "The action or process of inheriting a title, office, or management role.", example: "Robust succession planning secures executive leadership continuity.", illustrationIcon: "🔗" },
            { word: "Agility", phonetic: "/əˈdʒɪlɪti/", partOfSpeech: "Noun", definition: "The power of moving quickly and easily; adaptive responsiveness.", example: "Organizational agility allows firms to pivot amidst market volatility.", illustrationIcon: "⚡" },
            { word: "Pipeline", phonetic: "/ˈpaɪpˌlaɪn/", partOfSpeech: "Noun", definition: "A channel supplying prospective talent or projects for future execution.", example: "Develop a deep talent pipeline of future senior executives.", illustrationIcon: "📊" }
          ],
          grammar: {
            ruleTitle: "Cleft Sentences for Executive Emphasis",
            explanation: "Use 'What...' cleft sentences to spotlight critical leadership imperatives in corporate memos.",
            correctExample: "What underpins organizational agility is a culture of psychological safety.",
            incorrectExample: "Organizational agility is underpinned by psychological safety what is crucial.",
            tip: "Cleft structures direct board-level attention precisely to core imperatives."
          },
          practicalApplication: "Write a cleft sentence highlighting the importance of leadership talent pipelines.",
          questions: [
            { id: 1, prompt: "What is the primary objective of 'executive succession planning'?", options: [{ label: "Ensuring seamless leadership continuity and talent pipeline readiness", isCorrect: true }, { label: "Firing all senior managers unexpectedly without warning", isCorrect: false }, { label: "Outsourcing CEO responsibilities to automated software bots", isCorrect: false }], explanation: "Succession planning secures leadership continuity." },
            { id: 2, prompt: "What defines 'organizational agility' in modern enterprise strategy?", options: [{ label: "Rapid adaptive responsiveness to market volatility and disruption", isCorrect: true }, { label: "Rigid bureaucratic slow-moving hierarchy structures", isCorrect: false }, { label: "Refusing to change business models across decades", isCorrect: false }], explanation: "Agility enables rapid pivoting." },
            { id: 3, prompt: "Choose the correct cleft sentence for leadership emphasis.", options: [{ label: "What sustains competitive advantage is agile leadership execution.", isCorrect: true }, { label: "What sustains competitive advantage agile leadership is.", isCorrect: false }, { label: "Competitive advantage is what agile leadership sustains.", isCorrect: false }], explanation: "Cleft structure: What + verb + is + focus." },
            { id: 4, prompt: "Why is a robust 'talent pipeline' critical for boards of directors?", options: [{ label: "It prevents leadership vacuums if executives depart abruptly", isCorrect: true }, { label: "It ensures office water coolers stay fully stocked", isCorrect: false }, { label: "It lowers employee office rental costs", isCorrect: false }], explanation: "Pipelines prevent leadership vacuums." },
            { id: 5, prompt: "Complete: 'It is essential that boards ___ leadership continuity rigorously.'", options: [{ label: "monitor", isCorrect: true }, { label: "monitors", isCorrect: false }, { label: "monitored", isCorrect: false }], explanation: "Subjunctive base form 'monitor'." },
            { id: 6, prompt: "What role does 'psychological safety' play in high-performing teams?", options: [{ label: "Encouraging open risk-taking and candid error reporting without fear", isCorrect: true }, { label: "Enforcing total silence and blind obedience to superiors", isCorrect: false }, { label: "Punishing employees for asking creative questions", isCorrect: false }], explanation: "Psychological safety fosters innovation." },
            { id: 7, prompt: "Choose the proper English sentence.", options: [{ label: "Visionary leaders navigate complex corporate transformations successfully.", isCorrect: true }, { label: "Navigate leaders visionary transformations corporate successfully.", isCorrect: false }, { label: "Transformations corporate successfully navigate leaders visionary.", isCorrect: false }], explanation: "Subject + verb + object order." },
            { id: 8, prompt: "What is an agile management methodology characterized by?", options: [{ label: "Iterative sprints, cross-functional collaboration, and rapid feedback", isCorrect: true }, { label: "Waiting ten years to release a single product update", isCorrect: false }, { label: "Isolating departments in strict silos", isCorrect: false }], explanation: "Agile emphasizes iterative sprints." },
            { id: 9, prompt: "How do change management frameworks assist corporate transformations?", options: [{ label: "By guiding employees smoothly through structural transitions and adoption", isCorrect: true }, { label: "By confusing staff with contradictory secret memos", isCorrect: false }, { label: "By canceling all payroll operations", isCorrect: false }], explanation: "Change management guides transitions." },
            { id: 10, prompt: "What is the ultimate mark of an exceptional corporate executive?", options: [{ label: "Empowering others, executing strategy, and leaving enduring institutional strength", isCorrect: true }, { label: "Hoarding all decision-making power in solitary isolation", isCorrect: false }, { label: "Destroying corporate culture for short-term gain", isCorrect: false }], explanation: "Great executives empower sustainable strength." }
          ]
        }
      ]
    };

    if (staticDatabase[key]) {
      return staticDatabase[key];
    }

    // HIGH-YIELD DYNAMIC FALLBACK GENERATOR FOR UNMAPPED TOPICS
    const dynamicUnits: UnitModule[] = [];
    const isElem = lvl === "Kindergarten" || lvl === "Primary School";
    const isAdv = lvl === "C1 Advanced";

    for (let uNum = 1; uNum <= 3; uNum++) {
      const uId = `${lvl}_${top}_U${uNum}`.replace(/\s+/g, "");
      const title = `Unit ${uNum}: ${uNum === 1 ? "Foundations of" : uNum === 2 ? "Applied Analysis of" : "Mastery & Case Studies in"} ${top}`;

      const vocabulary: VocabularyItem[] = [
        {
          word: isElem ? "Explore" : isAdv ? "Paradigm" : "Framework",
          phonetic: isElem ? "/ɪkˈsplɔːr/" : isAdv ? "/ˈpærədaɪm/" : "/ˈfreɪmwɜːrk/",
          partOfSpeech: isElem ? "Verb" : "Noun",
          definition: `Core operational term for understanding ${top}.`,
          example: `We use this concept to study ${top} effectively.`,
          illustrationIcon: "💡"
        },
        {
          word: isElem ? "Discover" : isAdv ? "Synthesis" : "Analysis",
          phonetic: isElem ? "/dɪˈskʌvər/" : isAdv ? "/ˈsɪnθəsɪs/" : "/əˈnæləsɪs/",
          partOfSpeech: isElem ? "Verb" : "Noun",
          definition: `Analytical methodology applied within ${top}.`,
          example: `Detailed analysis of ${top} reveals clear structural patterns.`,
          illustrationIcon: "🔍"
        },
        {
          word: isElem ? "Practice" : isAdv ? "Efficacy" : "Implementation",
          phonetic: isElem ? "/ˈpræktɪs/" : isAdv ? "/ˈɛfɪkəsi/" : "/ˌɪmplɪmɛnˈteɪʃən/",
          partOfSpeech: isElem ? "Verb" : "Noun",
          definition: `Practical application of ${top} principles.`,
          example: `Proper implementation enhances long-term success in ${top}.`,
          illustrationIcon: "🚀"
        }
      ];

      const grammar: GrammarRule = {
        ruleTitle: isElem ? "Simple Sentence Building" : isAdv ? "Advanced Subjunctive & Inversion" : "Conditional & Modal Structures",
        explanation: `Structure your sentences clearly when discussing ${top} to convey precise meaning.`,
        correctExample: `When studying ${top}, clarity of expression is essential.`,
        incorrectExample: `Studying ${top} clarity expression is essential not.`,
        tip: "Ensure your subjects match your verbs in tense and number!"
      };

      const questions: Question[] = [];
      for (let qId = 1; qId <= 10; qId++) {
        questions.push({
          id: qId,
          prompt: `[${top} - Unit ${uNum}] Question ${qId}: What is a primary consideration when evaluating ${top.toLowerCase()} principles?`,
          imageIllustration: qId % 2 === 0 ? "🎯" : "📘",
          options: [
            { label: `Adhering strictly to established, evidence-based rules of ${top}`, isCorrect: true },
            { label: `Ignoring all fundamental guidelines and guessing randomly`, isCorrect: false },
            { label: `Replacing facts with unrelated, irrelevant statements`, isCorrect: false }
          ],
          explanation: `Question ${qId} Explanation: Success in ${top} relies on understanding core verified concepts rather than guessing.`
        });
      }

      dynamicUnits.push({
        id: uId,
        unitNumber: uNum,
        title: title,
        summary: `Explore Unit ${uNum} of ${top} with tailored reading passages, vocabulary, and an end-of-unit 10-question check.`,
        illustration: uNum === 1 ? "📚" : uNum === 2 ? "🔬" : "🏆",
        accentColor: "bg-sky-50 border-sky-100 text-sky-600",
        paragraphs: [
          `Welcome to Unit ${uNum} of our study module on ${top}. Master key terminology and structures to build fluency at the ${lvl} level.`,
          `Read the vocabulary definitions and grammar tips below before attempting the 10-question unit quiz.`
        ],
        vocabulary,
        grammar,
        practicalApplication: `Write down one key concept you learned about ${top} today.`,
        questions
      });
    }

    return dynamicUnits;
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

            {/* VOCABULARY CARDS */}
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

            {/* PART 2: END-OF-UNIT KNOWLEDGE CHECK */}
            <div className="pt-10 border-t-2 border-dashed border-gray-200 space-y-8">
              <div className="text-center bg-sky-50/70 p-6 rounded-3xl border border-sky-100">
                <span className="text-3xl mb-2 block">📝</span>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">End-of-Unit Knowledge Check</h3>
                <p className="text-sm text-gray-600">Test your understanding of Unit {activeUnit.unitNumber} with these targeted questions!</p>
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

  // MAIN DASHBOARD HOMEPAGE
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

        {/* STEP 2: SELECT TOPIC CATEGORY */}
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

      {/* SEQUENTIAL UNITS GRID */}
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
                <span>📖 Read Material & Take Quiz</span>
                <span>→</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}