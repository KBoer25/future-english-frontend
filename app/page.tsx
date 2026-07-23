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
  const [activeTab, setActiveTab] = useState<"quizzes" | "materials">("quizzes");
  const [selectedLevel, setSelectedLevel] = useState<string>("All Levels");
  const [selectedTopic, setSelectedTopic] = useState<string>("All");
  
  const [activeModuleKey, setActiveModuleKey] = useState<string | null>(null);
  const [activeStudyId, setActiveStudyId] = useState<string | null>(null);
  const [activeSubTopic, setActiveSubTopic] = useState<SubTopic | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});

  const levels = ["All Levels", "Kindergarten", "Primary School", "Junior High", "Senior High", "C1 Advanced"];
  const topics = ["All", "Daily Life", "Social Media", "Job Interviews", "Academic & Debate"];

  // Massive 25+ Quiz Bank: 5 distinct quizzes for every single school level across all topics
  const quizDataBank: Record<string, ModuleData> = {
    // ================= KINDEGARTEN =================
    "K-Daily-1": {
      title: "Kindergarten: Quiz 1 - Grocery Shopping & Fruits",
      image: "🛒",
      level: "Kindergarten",
      category: "Daily Life",
      source: "Early Childhood Phonics & Vocab",
      questions: [
        {
          id: 1,
          prompt: "Which fruit is red and starts with the letter 'A'?",
          imageIllustration: "🍎🛒✨",
          options: [{ label: "Apple", isCorrect: true }, { label: "Banana", isCorrect: false }, { label: "Grape", isCorrect: false }],
          explanation: "Apples are red/green and begin with the short /æ/ sound."
        },
        {
          id: 2,
          prompt: "What sound does a cow make when you see it on a farm?",
          imageIllustration: "🐮🌾🐄",
          options: [{ label: "Moo", isCorrect: true }, { label: "Quack", isCorrect: false }, { label: "Woof", isCorrect: false }],
          explanation: "Cows produce a distinct 'moo' sound."
        },
        {
          id: 3,
          prompt: "What color is a fresh banana?",
          imageIllustration: "🍌💛🌞",
          options: [{ label: "Yellow", isCorrect: true }, { label: "Blue", isCorrect: false }, { label: "Black", isCorrect: false }],
          explanation: "Ripe bananas are bright yellow."
        },
        {
          id: 4,
          prompt: "Where do we buy milk and bread?",
          imageIllustration: "🏬🥖🥛",
          options: [{ label: "Supermarket", isCorrect: true }, { label: "Library", isCorrect: false }, { label: "Hospital", isCorrect: false }],
          explanation: "Supermarkets stock daily groceries like bread and milk."
        },
        {
          id: 5,
          prompt: "Which animal says 'Meow'?",
          imageIllustration: "🐱🧶🐾",
          options: [{ label: "Cat", isCorrect: true }, { label: "Dog", isCorrect: false }, { label: "Duck", isCorrect: false }],
          explanation: "Cats make a purring and meowing sound."
        }
      ]
    },
    "K-Social-2": {
      title: "Kindergarten: Quiz 2 - Friendly Words & Hello",
      image: "💬",
      level: "Kindergarten",
      category: "Social Media",
      source: "Early Social Etiquette",
      questions: [
        {
          id: 1,
          prompt: "What should you say when someone gives you a toy?",
          imageIllustration: "🎁😊🤝",
          options: [{ label: "Thank you!", isCorrect: true }, { label: "Go away", isCorrect: false }, { label: "No", isCorrect: false }],
          explanation: "Always say thank you when receiving gifts or help."
        },
        {
          id: 2,
          prompt: "How do you greet your friend in the morning?",
          imageIllustration: "🌅👋😄",
          options: [{ label: "Good morning!", isCorrect: true }, { label: "Goodnight", isCorrect: false }],
          explanation: "Use 'Good morning' when waking up or greeting early."
        },
        {
          id: 3,
          prompt: "What word do you use when asking for a crayon politely?",
          imageIllustration: "🖍️🙏✨",
          options: [{ label: "Please", isCorrect: true }, { label: "Give now", isCorrect: false }],
          explanation: "Polite requests always include 'Please'."
        },
        {
          id: 4,
          prompt: "What should you say if you accidentally bump into someone?",
          imageIllustration: "🚶‍♂️🙇‍♂️💫",
          options: [{ label: "Excuse me / Sorry", isCorrect: true }, { label: "Hooray", isCorrect: false }],
          explanation: "Say sorry or excuse me when making minor mistakes."
        },
        {
          id: 5,
          prompt: "Is smiling a friendly way to talk to others?",
          imageIllustration: "😊🌟💛",
          options: [{ label: "Yes, smiles show friendliness", isCorrect: true }, { label: "No", isCorrect: false }],
          explanation: "Smiles communicate warmth and kindness."
        }
      ]
    },
    "K-Jobs-3": {
      title: "Kindergarten: Quiz 3 - Helping Hands & Chores",
      image: "💼",
      level: "Kindergarten",
      category: "Job Interviews",
      source: "Early Responsibility Guide",
      questions: [
        {
          id: 1,
          prompt: "What should you do with your toys after playing?",
          imageIllustration: "🧸🧹📦",
          options: [{ label: "Put them away in the toy box", isCorrect: true }, { label: "Leave them on the floor", isCorrect: false }],
          explanation: "Cleaning up teaches early responsibility and teamwork."
        },
        {
          id: 2,
          prompt: "Who helps us learn and read books at school?",
          imageIllustration: "👩‍🏫📚🍎",
          options: [{ label: "Teacher", isCorrect: true }, { label: "Firefighter", isCorrect: false }],
          explanation: "Teachers guide classroom learning."
        },
        {
          id: 3,
          prompt: "What tool helps us brush our teeth clean?",
          imageIllustration: "🪥🦷✨",
          options: [{ label: "Toothbrush", isCorrect: true }, { label: "Spoon", isCorrect: false }],
          explanation: "Toothbrushes keep teeth sparkling clean."
        },
        {
          id: 4,
          prompt: "Why is it good to share toys with friends?",
          imageIllustration: "🤝🧩🌈",
          options: [{ label: "It makes playing fun for everyone", isCorrect: true }, { label: "It's not good", isCorrect: false }],
          explanation: "Sharing fosters strong friendship bonds."
        },
        {
          id: 5,
          prompt: "Who delivers letters and packages to our house?",
          imageIllustration: "📬✉️🚲",
          options: [{ label: "Mail carrier", isCorrect: true }, { label: "Baker", isCorrect: false }],
          explanation: "Mail carriers bring postal deliveries."
        }
      ]
    },
    "K-Academic-4": {
      title: "Kindergarten: Quiz 4 - Shapes, Colors & Counting",
      image: "⚖️",
      level: "Kindergarten",
      category: "Academic & Debate",
      source: "Early Logic & Numbers",
      questions: [
        {
          id: 1,
          prompt: "How many sides does a triangle have?",
          imageIllustration: "🔺3️⃣✨",
          options: [{ label: "3 sides", isCorrect: true }, { label: "4 sides", isCorrect: false }, { label: "1 side", isCorrect: false }],
          explanation: "Triangles have exactly three straight sides."
        },
        {
          id: 2,
          prompt: "What number comes right after number 4?",
          imageIllustration: "🔢5️⃣⭐",
          options: [{ label: "5", isCorrect: true }, { label: "2", isCorrect: false }, { label: "10", isCorrect: false }],
          explanation: "Counting sequence: 1, 2, 3, 4, 5."
        },
        {
          id: 3,
          prompt: "What shape is a round ball or circle?",
          imageIllustration: "⚽🔴🌀",
          options: [{ label: "Circle", isCorrect: true }, { label: "Square", isCorrect: false }],
          explanation: "Circles are perfectly round with zero corners."
        },
        {
          id: 4,
          prompt: "Which color is made by mixing blue and yellow?",
          imageIllustration: "🎨🟢🌿",
          options: [{ label: "Green", isCorrect: true }, { label: "Red", isCorrect: false }],
          explanation: "Blue and yellow blend to create green."
        },
        {
          id: 5,
          prompt: "What is the opposite of big?",
          imageIllustration: "🐘🐁📏",
          options: [{ label: "Small", isCorrect: true }, { label: "Huge", isCorrect: false }],
          explanation: "Small is the direct opposite of big."
        }
      ]
    },
    "K-Extra-5": {
      title: "Kindergarten: Quiz 5 - Weather & Outdoor Fun",
      image: "☀️",
      level: "Kindergarten",
      category: "Daily Life",
      source: "Nature & Environment Basics",
      questions: [
        {
          id: 1,
          prompt: "What do we wear when it starts raining outside?",
          imageIllustration: "🌧️🌂🧥",
          options: [{ label: "Raincoat and boots", isCorrect: true }, { label: "Swimsuit", isCorrect: false }],
          explanation: "Raincoats keep us dry during rain showers."
        },
        {
          id: 2,
          prompt: "What shines bright in the sky during a sunny day?",
          imageIllustration: "☀️🌞💛",
          options: [{ label: "The Sun", isCorrect: true }, { label: "The Moon", isCorrect: false }],
          explanation: "The sun provides daylight and warmth."
        },
        {
          id: 3,
          prompt: "What falls from clouds during cold winter days in some places?",
          imageIllustration: "❄️⛄🌨️",
          options: [{ label: "Snow", isCorrect: true }, { label: "Sand", isCorrect: false }],
          explanation: "Snowflakes fall when temperatures drop below freezing."
        },
        {
          id: 4,
          prompt: "What color is clear drinking water?",
          imageIllustration: "💧🥤✨",
          options: [{ label: "Clear / Transparent", isCorrect: true }, { label: "Purple", isCorrect: false }],
          explanation: "Pure drinking water has no color."
        },
        {
          id: 5,
          prompt: "Where do colorful flowers grow?",
          imageIllustration: "🌷🌻🌱",
          options: [{ label: "In soil / garden dirt", isCorrect: true }, { label: "On a concrete highway", isCorrect: false }],
          explanation: "Plants take root in nutritious soil."
        }
      ]
    },

    // ================= PRIMARY SCHOOL =================
    "P-Daily-1": {
      title: "Primary School: Quiz 1 - School Routines & Classes",
      image: "📚",
      level: "Primary School",
      category: "Daily Life",
      source: "Elementary School English",
      questions: [
        {
          id: 1,
          prompt: "Which subject do we learn about numbers, addition, and fractions?",
          imageIllustration: "🔢📐✏️",
          options: [{ label: "Mathematics", isCorrect: true }, { label: "Art", isCorrect: false }, { label: "Music", isCorrect: false }],
          explanation: "Math covers numerical calculations and problem-solving."
        },
        {
          id: 2,
          prompt: "What do you use to erase a pencil mistake in your notebook?",
          imageIllustration: "📝🧹🔍",
          options: [{ label: "An eraser", isCorrect: true }, { label: "A marker", isCorrect: false }],
          explanation: "Erasers lift graphite marks cleanly off paper."
        },
        {
          id: 3,
          prompt: "Where do students eat their packed lunches during break time?",
          imageIllustration: "🥪🍎🏫",
          options: [{ label: "The cafeteria / canteen", isCorrect: true }, { label: "The science lab", isCorrect: false }],
          explanation: "School cafeterias are designated dining areas."
        },
        {
          id: 4,
          prompt: "What tool helps us measure straight lines on paper?",
          imageIllustration: "📏📐✍️",
          options: [{ label: "A ruler", isCorrect: true }, { label: "A sponge", isCorrect: false }],
          explanation: "Rulers provide accurate geometric straight edges."
        },
        {
          id: 5,
          prompt: "When does the school day typically begin?",
          imageIllustration: "⏰🌅🎒",
          options: [{ label: "In the morning", isCorrect: true }, { label: "At midnight", isCorrect: false }],
          explanation: "Classes conventionally start in the morning hours."
        }
      ]
    },
    "P-Social-2": {
      title: "Primary School: Quiz 2 - Safe Digital Sharing",
      image: "📱",
      level: "Primary School",
      category: "Social Media",
      source: "Digital Citizenship 101",
      questions: [
        {
          id: 1,
          prompt: "Is it safe to share your home address with online strangers?",
          imageIllustration: "🛡️🔒🚫",
          options: [{ label: "No, never share personal information", isCorrect: true }, { label: "Yes, to make friends", isCorrect: false }],
          explanation: "Protecting personal privacy is essential online."
        },
        {
          id: 2,
          prompt: "What is a polite way to greet a teacher in an online chat?",
          imageIllustration: "💻📚👋",
          options: [{ label: "Hello Teacher, good morning!", isCorrect: true }, { label: "Yo what's up", isCorrect: false }],
          explanation: "Polite greetings show respect in academic settings."
        },
        {
          id: 3,
          prompt: "What should you do if someone is mean to you in a game chat?",
          imageIllustration: "👥⚠️🛑",
          options: [{ label: "Tell a parent or trusted adult", isCorrect: true }, { label: "Be mean back", isCorrect: false }],
          explanation: "Always report cyberbullying to adults."
        },
        {
          id: 4,
          prompt: "What does 'like' mean on a photo post?",
          imageIllustration: "❤️👍✨",
          options: [{ label: "Showing appreciation or approval", isCorrect: true }, { label: "Deleting the image", isCorrect: false }],
          explanation: "Likes express positive feedback on content."
        },
        {
          id: 5,
          prompt: "How long is a healthy amount of screen time for kids daily?",
          imageIllustration: "⏱️🌳⚽",
          options: [{ label: "A balanced, limited amount", isCorrect: true }, { label: "24 hours straight", isCorrect: false }],
          explanation: "Balance prevents digital eye strain and fatigue."
        }
      ]
    },
    "P-Jobs-3": {
      title: "Primary School: Quiz 3 - Community Helpers & Jobs",
      image: "💼",
      level: "Primary School",
      category: "Job Interviews",
      source: "Elementary Social Studies",
      questions: [
        {
          id: 1,
          prompt: "Who puts out fires and rescues people in emergencies?",
          imageIllustration: "🚒👨‍🚒🧯",
          options: [{ label: "Firefighter", isCorrect: true }, { label: "Chef", isCorrect: false }, { label: "Pilot", isCorrect: false }],
          explanation: "Firefighters operate fire engines and emergency gear."
        },
        {
          id: 2,
          prompt: "Who treats patients when they feel sick or get injured?",
          imageIllustration: "🩺🏥💉",
          options: [{ label: "Doctor or nurse", isCorrect: true }, { label: "Architect", isCorrect: false }],
          explanation: "Medical professionals diagnose and treat illnesses."
        },
        {
          id: 3,
          prompt: "Who grows vegetables and crops on a farm?",
          imageIllustration: "🚜🌾🌽",
          options: [{ label: "Farmer", isCorrect: true }, { label: "Librarian", isCorrect: false }],
          explanation: "Farmers cultivate agricultural land for food supply."
        },
        {
          id: 4,
          prompt: "Who flies airplanes across countries and oceans?",
          imageIllustration: "✈️ pilot 🌍",
          options: [{ label: "Pilot", isCorrect: true }, { label: "Painter", isCorrect: false }],
          explanation: "Pilots navigate commercial aircraft safely."
        },
        {
          id: 5,
          prompt: "Who cooks delicious meals in a restaurant kitchen?",
          imageIllustration: "🍳👨‍🍳🍲",
          options: [{ label: "Chef / Cook", isCorrect: true }, { label: "Astronaut", isCorrect: false }],
          explanation: "Chefs prepare gourmet recipes in kitchens."
        }
      ]
    },
    "P-Academic-4": {
      title: "Primary School: Quiz 4 - Reading Stories & Grammar",
      image: "📖",
      level: "Primary School",
      category: "Academic & Debate",
      source: "Elementary Language Arts",
      questions: [
        {
          id: 1,
          prompt: "What punctuation mark goes at the end of a asking sentence?",
          imageIllustration: "❓✍️🤔",
          options: [{ label: "Question mark (?)", isCorrect: true }, { label: "Period (.)", isCorrect: false }],
          explanation: "Direct questions end with question marks."
        },
        {
          id: 2,
          prompt: "Which word is a noun (a person, place, or thing)?",
          imageIllustration: "🏫🎒👦",
          options: [{ label: "School", isCorrect: true }, { label: "Run", isCorrect: false }, { label: "Quickly", isCorrect: false }],
          explanation: "'School' is a physical place noun."
        },
        {
          id: 3,
          prompt: "What is the past tense of the verb 'walk'?",
          imageIllustration: "🚶‍♂️👟⏱️",
          options: [{ label: "Walked", isCorrect: true }, { label: "Walking", isCorrect: false }],
          explanation: "Add '-ed' to form regular past tense verbs."
        },
        {
          id: 4,
          prompt: "What is an antonym (opposite) of the word 'cold'?",
          imageIllustration: "🔥☀️🌡️",
          options: [{ label: "Hot", isCorrect: true }, { label: "Freezing", isCorrect: false }],
          explanation: "Hot is the opposite of cold."
        },
        {
          id: 5,
          prompt: "What is the main character in a story called?",
          imageIllustration: "📖🦸‍♂️⭐",
          options: [{ label: "Protagonist / Hero", isCorrect: true }, { label: "The book cover", isCorrect: false }],
          explanation: "The central figure of a narrative is the protagonist."
        }
      ]
    },
    "P-Extra-5": {
      title: "Primary School: Quiz 5 - Animals & Habitats",
      image: "🌍",
      level: "Primary School",
      category: "Daily Life",
      source: "Elementary Science",
      questions: [
        {
          id: 1,
          prompt: "Where do fish live and breathe underwater?",
          imageIllustration: "🐠🌊💧",
          options: [{ label: "In oceans, rivers, and lakes", isCorrect: true }, { label: "In tree branches", isCorrect: false }],
          explanation: "Fish have gills adapted for aquatic environments."
        },
        {
          id: 2,
          prompt: "Which animal is known as the king of the jungle?",
          imageIllustration: "🦁👑🌿",
          options: [{ label: "Lion", isCorrect: true }, { label: "Rabbit", isCorrect: false }],
          explanation: "Lions command apex status in grassland habitats."
        },
        {
          id: 3,
          prompt: "What do caterpillars transform into?",
          imageIllustration: "🐛🦋✨",
          options: [{ label: "Butterflies or moths", isCorrect: true }, { label: "Frogs", isCorrect: false }],
          explanation: "Metamorphosis turns caterpillars into winged butterflies."
        },
        {
          id: 4,
          prompt: "Which bird cannot fly but swims swiftly in icy waters?",
          imageIllustration: "🐧❄️🏊‍♂️",
          options: [{ label: "Penguin", isCorrect: true }, { label: "Eagle", isCorrect: false }],
          explanation: "Penguins use flippers to swim in polar oceans."
        },
        {
          id: 5,
          prompt: "What do plants need from the sun to make food?",
          imageIllustration: "☀️🌱🍃",
          options: [{ label: "Sunlight (Photosynthesis)", isCorrect: true }, { label: "Soda water", isCorrect: false }],
          explanation: "Plants utilize sunlight for energy synthesis."
        }
      ]
    },

    // ================= JUNIOR HIGH =================
    "JH-Daily-1": {
      title: "Junior High: Quiz 1 - Travel & City Navigation",
      image: "🗺️",
      level: "Junior High",
      category: "Daily Life",
      source: "Cambridge PET Daily Contexts",
      questions: [
        {
          id: 1,
          prompt: "Someone asks: 'Could you tell me the way to the central station?' What is a polite response?",
          imageIllustration: "🧭🚶‍♂️🏙️",
          options: [
            { label: "Certainly, go straight down this street and turn left at the traffic light.", isCorrect: true },
            { label: "No idea, leave me alone.", isCorrect: false }
          ],
          explanation: "Polite directions give clear, step-by-step guidance."
        },
        {
          id: 2,
          prompt: "What does a 'roundabout' mean in city driving?",
          imageIllustration: "🔄🚗🚦",
          options: [{ label: "A circular junction where traffic flows in one direction around a central island", isCorrect: true }, { label: "A dead-end street", isCorrect: false }],
          explanation: "Roundabouts regulate multi-directional traffic flow."
        },
        {
          id: 3,
          prompt: "What is a 'platform' at a train station?",
          imageIllustration: "🚉🚆🛤️",
          options: [{ label: "The raised area beside the railway tracks where passengers board trains", isCorrect: true }, { label: "The ticket vending machine", isCorrect: false }],
          explanation: "Platforms provide safe boarding access to railcars."
        },
        {
          id: 4,
          prompt: "What document do you need to board an international flight?",
          imageIllustration: "🛂✈️🎫",
          options: [{ label: "A valid passport and boarding pass", isCorrect: true }, { label: "A library card", isCorrect: false }],
          explanation: "International travel requires official passport verification."
        },
        {
          id: 5,
          prompt: "What does 'luggage allowance' mean at airport check-in?",
          imageIllustration: "🧳⚖️✈️",
          options: [{ label: "The maximum weight and size of bags you can bring without extra fees", isCorrect: true }, { label: "Free airline snacks", isCorrect: false }],
          explanation: "Airlines enforce strict bag weight thresholds."
        }
      ]
    },
    "JH-Social-2": {
      title: "Junior High: Quiz 2 - Social Media Etiquette & Slang",
      image: "📱",
      level: "Junior High",
      category: "Social Media",
      source: "Intermediate Digital Literacy",
      questions: [
        {
          id: 1,
          prompt: "What does the abbreviation 'DIY' stand for?",
          imageIllustration: "🛠️💡🔨",
          options: [{ label: "Do It Yourself", isCorrect: true }, { label: "Dance In Yards", isCorrect: false }],
          explanation: "DIY refers to self-made crafts and home projects."
        },
        {
          id: 2,
          prompt: "Why is it important to check privacy settings on social media profiles?",
          imageIllustration: "🔒👀🛡️",
          options: [{ label: "To control who sees your personal photos and posts", isCorrect: true }, { label: "To make your phone run faster", isCorrect: false }],
          explanation: "Privacy controls safeguard personal data from strangers."
        },
        {
          id: 3,
          prompt: "What is a 'hashtag' (#) used for on social platforms?",
          imageIllustration: "#️⃣🏷️📈",
          options: [{ label: "To categorize content and make posts discoverable in searches", isCorrect: true }, { label: "To delete comments", isCorrect: false }],
          explanation: "Hashtags index topics across social feeds."
        },
        {
          id: 4,
          prompt: "What does 'netiquette' mean?",
          imageIllustration: "💻🤝✨",
          options: [{ label: "Good manners and polite behavior when communicating online", isCorrect: true }, { label: "Fast internet speed", isCorrect: false }],
          explanation: "Netiquette combines 'internet' and 'etiquette'."
        },
        {
          id: 5,
          prompt: "What is cyberbullying?",
          imageIllustration: "💻⚠️🛑",
          options: [{ label: "Using digital devices to bully, threaten, or harass someone", isCorrect: true }, { label: "Playing multiplayer video games", isCorrect: false }],
          explanation: "Harassment conducted via digital media constitutes cyberbullying."
        }
      ]
    },
    "JH-Jobs-3": {
      title: "Junior High: Quiz 3 - Part-Time Jobs & Polite Requests",
      image: "💼",
      level: "Junior High",
      category: "Job Interviews",
      source: "B1 Career Foundations",
      questions: [
        {
          id: 1,
          prompt: "Which phrase is best when introducing yourself to an employer?",
          imageIllustration: "🤝👔🌟",
          options: [
            { label: "Hello, my name is Alex and I am eager to learn.", isCorrect: true },
            { label: "Give me the job right now.", isCorrect: false }
          ],
          explanation: "Polite enthusiasm builds strong first impressions."
        },
        {
          id: 2,
          prompt: "What does 'punctual' mean?",
          imageIllustration: "⏰🏃‍♂️💨",
          options: [{ label: "Arriving on time", isCorrect: true }, { label: "Being late", isCorrect: false }],
          explanation: "Punctuality is a core professional requirement."
        },
        {
          id: 3,
          prompt: "Why do interviewers ask about your strengths?",
          imageIllustration: "💡🎯💪",
          options: [{ label: "To see what unique value you bring", isCorrect: true }, { label: "To waste time", isCorrect: false }],
          explanation: "Strengths highlight your qualifications."
        },
        {
          id: 4,
          prompt: "What is a resume used for?",
          imageIllustration: "📄✍️📋",
          options: [{ label: "Summarizing work history and skills", isCorrect: true }, { label: "Drawing pictures", isCorrect: false }],
          explanation: "Resumes present professional experience to recruiters."
        },
        {
          id: 5,
          prompt: "How should you dress for a formal interview?",
          imageIllustration: "👔👞✨",
          options: [{ label: "Neat, clean business casual or formal attire", isCorrect: true }, { label: "Pajamas", isCorrect: false }],
          explanation: "Professional dress code reflects respect for the company."
        }
      ]
    },
    "JH-Academic-4": {
      title: "Junior High: Quiz 4 - School Projects & Research",
      image: "🔬",
      level: "Junior High",
      category: "Academic & Debate",
      source: "Intermediate Academic Skills",
      questions: [
        {
          id: 1,
          prompt: "What is a bibliography in a research report?",
          imageIllustration: "📚✍️📑",
          options: [{ label: "A list of sources and books used to write the report", isCorrect: true }, { label: "The colorful title page drawing", isCorrect: false }],
          explanation: "Bibliographies give credit to reference sources."
        },
        {
          id: 2,
          prompt: "Which reference source provides definitions and pronunciations of words?",
          imageIllustration: "📖🔤🔍",
          options: [{ label: "A dictionary", isCorrect: true }, { label: "An atlas", isCorrect: false }],
          explanation: "Dictionaries define lexical terms."
        },
        {
          id: 3,
          prompt: "What does an atlas contain?",
          imageIllustration: "🗺️🌍🧭",
          options: [{ label: "Maps of countries, continents, and oceans", isCorrect: true }, { label: "Cooking recipes", isCorrect: false }],
          explanation: "Atlases are collections of geographical maps."
        },
        {
          id: 4,
          prompt: "What is the scientific method starting step?",
          imageIllustration: "🤔🧪💡",
          options: [{ label: "Asking a question / making an observation", isCorrect: true }, { label: "Throwing away equipment", isCorrect: false }],
          explanation: "Inquiry begins with observation and questions."
        },
        {
          id: 5,
          prompt: "Why should you paraphrase sources instead of copying word-for-word?",
          imageIllustration: "✍️🧠🛡️",
          options: [{ label: "To avoid plagiarism and show your own understanding", isCorrect: true }, { label: "To make the report shorter", isCorrect: false }],
          explanation: "Paraphrasing demonstrates authentic comprehension."
        }
      ]
    },
    "JH-Extra-5": {
      title: "Junior High: Quiz 5 - Hobbies, Sports & Leisure",
      image: "⚽",
      level: "Junior High",
      category: "Daily Life",
      source: "Intermediate Lifestyle English",
      questions: [
        {
          id: 1,
          prompt: "What equipment is required to play tennis?",
          imageIllustration: "🎾🏸net",
          options: [{ label: "A racket and tennis balls", isCorrect: true }, { label: "A skateboard and helmet", isCorrect: false }],
          explanation: "Tennis matches require rackets and balls."
        },
        {
          id: 2,
          prompt: "What do you call someone who enjoys hiking in mountains and nature?",
          imageIllustration: "🥾🏔️🌲",
          options: [{ label: "A hiker / trekker", isCorrect: true }, { label: "A scuba diver", isCorrect: false }],
          explanation: "Hikers explore mountainous trails on foot."
        },
        {
          id: 3,
          prompt: "Which leisure activity involves capturing photos with a camera?",
          imageIllustration: "📷🖼️✨",
          options: [{ label: "Photography", isCorrect: true }, { label: "Sculpting pottery", isCorrect: false }],
          explanation: "Photography captures optical images."
        },
        {
          id: 4,
          prompt: "What is the benefit of regular physical exercise?",
          imageIllustration: "💪🏃‍♀️❤️",
          options: [{ label: "Improves cardiovascular health and boosts mood", isCorrect: true }, { label: "Causes permanent fatigue", isCorrect: false }],
          explanation: "Exercise strengthens physical and mental wellbeing."
        },
        {
          id: 5,
          prompt: "What instrument has black and white keys played with fingers?",
          imageIllustration: "🎹🎵🎶",
          options: [{ label: "Piano", isCorrect: true }, { label: "Violin", isCorrect: false }],
          explanation: "Pianos feature 88 weighted keyboard notes."
        }
      ]
    },

    // ================= SENIOR HIGH =================
    "SH-Daily-1": {
      title: "Senior High: Quiz 1 - Independent Living & Finance",
      image: "💳",
      level: "Senior High",
      category: "Daily Life",
      source: "B2 Practical Independence",
      questions: [
        {
          id: 1,
          prompt: "What is a monthly budget used for?",
          imageIllustration: "📊💰📋",
          options: [{ label: "Tracking income and expenses to manage savings effectively", isCorrect: true }, { label: "Deciding what clothes to wear", isCorrect: false }],
          explanation: "Budgets ensure disciplined financial control."
        },
        {
          id: 2,
          prompt: "What does 'APR' stand for in banking and loans?",
          imageIllustration: "📈🏦💳",
          options: [{ label: "Annual Percentage Rate (interest on debt)", isCorrect: true }, { label: "Automatic Phone Recharge", isCorrect: false }],
          explanation: "APR calculates yearly borrowing costs."
        },
        {
          id: 3,
          prompt: "Why is building an emergency savings fund important?",
          imageIllustration: "🛡️💵📉",
          options: [{ label: "To cover unexpected financial shocks like medical bills or car repairs", isCorrect: true }, { label: "To buy luxury vacations immediately", isCorrect: false }],
          explanation: "Emergency funds provide financial safety nets."
        },
        {
          id: 4,
          prompt: "What is a security deposit when renting an apartment?",
          imageIllustration: "🏠🔑💵",
          options: [{ label: "Refundable money held by a landlord to cover potential damages", isCorrect: true }, { label: "Monthly electricity payment", isCorrect: false }],
          explanation: "Deposits protect landlords against property damage."
        },
        {
          id: 5,
          prompt: "What does 'fixed expense' mean in budgeting?",
          imageIllustration: "🏠📃📅",
          options: [{ label: "Recurring costs that stay the same every month (e.g. rent)", isCorrect: true }, { label: "Random grocery purchases", isCorrect: false }],
          explanation: "Fixed expenses are predictable recurring bills."
        }
      ]
    },
    "SH-Social-2": {
      title: "Senior High: Quiz 2 - Digital Footprint & Online Identity",
      image: "🌐",
      level: "Senior High",
      category: "Social Media",
      source: "B2 Digital Citizenship",
      questions: [
        {
          id: 1,
          prompt: "What is a 'digital footprint'?",
          imageIllustration: "👣💻🔍",
          options: [{ label: "The trail of data you leave behind through online activity", isCorrect: true }, { label: "Shoe prints on computer keyboards", isCorrect: false }],
          explanation: "Every online action contributes to your permanent digital footprint."
        },
        {
          id: 2,
          prompt: "Why do universities and employers review candidate social media?",
          imageIllustration: "🎓👔🧐",
          options: [{ label: "To evaluate professional character and digital behavior", isCorrect: true }, { label: "To check their music taste", isCorrect: false }],
          explanation: "Recruiters assess public online professionalism."
        },
        {
          id: 3,
          prompt: "What is 'phishing' in cybersecurity?",
          imageIllustration: "🎣💻⚠️",
          options: [{ label: "Fraudulent emails attempting to steal sensitive passwords", isCorrect: true }, { label: "Fishing in a lake with friends", isCorrect: false }],
          explanation: "Phishing scams use deceptive links to steal credentials."
        },
        {
          id: 4,
          prompt: "What is two-factor authentication (2FA)?",
          imageIllustration: "🔐📱🔑",
          options: [{ label: "A security process requiring two distinct forms of identification", isCorrect: true }, { label: "Logging in twice with the same password", isCorrect: false }],
          explanation: "2FA adds robust security beyond passwords."
        },
        {
          id: 5,
          prompt: "What does 'open source' software mean?",
          imageIllustration: "🔓📂💻",
          options: [{ label: "Software with source code anyone can inspect, modify, and enhance", isCorrect: true }, { label: "Software that costs $1000", isCorrect: false }],
          explanation: "Open-source promotes collaborative community development."
        }
      ]
    },
    "SH-Jobs-3": {
      title: "Senior High: Quiz 3 - Job Applications & Cover Letters",
      image: "📄",
      level: "Senior High",
      category: "Job Interviews",
      source: "B2 Career Readiness",
      questions: [
        {
          id: 1,
          prompt: "What is the primary purpose of a cover letter?",
          imageIllustration: "✉️✍️💼",
          options: [{ label: "To introduce yourself and explain why you fit a specific role", isCorrect: true }, { label: "To list your home address only", isCorrect: false }],
          explanation: "Cover letters provide a personalized professional pitch."
        },
        {
          id: 2,
          prompt: "What does 'transferable skills' mean?",
          imageIllustration: "🔄💡🤝",
          options: [{ label: "Skills like communication and problem-solving usable in any career", isCorrect: true }, { label: "Bus driving license", isCorrect: false }],
          explanation: "Transferable skills apply across diverse industries."
        },
        {
          id: 3,
          prompt: "How should you follow up after a job interview?",
          imageIllustration: "📧⏱️✨",
          options: [{ label: "Send a polite thank-you email within 24 hours", isCorrect: true }, { label: "Call every hour until hired", isCorrect: false }],
          explanation: "Timely thank-you notes reinforce professionalism."
        },
        {
          id: 4,
          prompt: "What is an elevator pitch?",
          imageIllustration: "🛗⏱️🗣️",
          options: [{ label: "A concise 30-second summary of your professional background", isCorrect: true }, { label: "A speech given inside an elevator", isCorrect: false }],
          explanation: "Elevator pitches summarize qualifications instantly."
        },
        {
          id: 5,
          prompt: "What is a key rule for resume formatting?",
          imageIllustration: "📄📏✨",
          options: [{ label: "Keep it clean, professional, and free of typos", isCorrect: true }, { label: "Use neon pink comic sans font", isCorrect: false }],
          explanation: "Immaculate formatting ensures high readability."
        }
      ]
    },
    "SH-Academic-4": {
      title: "Senior High: Quiz 4 - Structured Debates & Persuasion",
      image: "⚖️",
      level: "Senior High",
      category: "Academic & Debate",
      source: "B2 Discursive Speech Standard",
      questions: [
        {
          id: 1,
          prompt: "What is the purpose of a thesis statement in a debate?",
          imageIllustration: "📜🎯💡",
          options: [{ label: "To state your core argument clearly", isCorrect: true }, { label: "To tell a joke", isCorrect: false }],
          explanation: "A thesis anchors the entire argumentation line."
        },
        {
          id: 2,
          prompt: "Which connector signals a contrasting point?",
          imageIllustration: "🔄🔀📌",
          options: [{ label: "However", isCorrect: true }, { label: "Furthermore", isCorrect: false }],
          explanation: "'However' introduces contrasting evidence."
        },
        {
          id: 3,
          prompt: "Why use empirical evidence in a debate?",
          imageIllustration: "📊🔬📈",
          options: [{ label: "To support claims with verified facts", isCorrect: true }, { label: "To confuse the audience", isCorrect: false }],
          explanation: "Facts validate academic arguments."
        },
        {
          id: 4,
          prompt: "What is a rebuttal?",
          imageIllustration: "🛡️⚔️💬",
          options: [{ label: "Addressing and disproving opponent claims", isCorrect: true }, { label: "Agreeing with everything", isCorrect: false }],
          explanation: "Rebuttals counter opposition points."
        },
        {
          id: 5,
          prompt: "How should a formal debate speech conclude?",
          imageIllustration: "🎤🏆👏",
          options: [{ label: "With a strong summary of main points", isCorrect: true }, { label: "By walking away silently", isCorrect: false }],
          explanation: "Conclusions reinforce lasting impressions."
        }
      ]
    },
    "SH-Extra-5": {
      title: "Senior High: Quiz 5 - Critical Thinking & Analysis",
      image: "🧠",
      level: "Senior High",
      category: "Academic & Debate",
      source: "B2 Advanced Reading",
      questions: [
        {
          id: 1,
          prompt: "What does 'critical thinking' involve?",
          imageIllustration: "🤔🔍💡",
          options: [{ label: "Objectively analyzing information before accepting it as true", isCorrect: true }, { label: "Believing every headline you read", isCorrect: false }],
          explanation: "Critical thinking evaluates evidence rigorously."
        },
        {
          id: 2,
          prompt: "What is a logical fallacy?",
          imageIllustration: "❌🧩⚠️",
          options: [{ label: "A flaw in reasoning that weakens an argument", isCorrect: true }, { label: "A proven scientific law", isCorrect: false }],
          explanation: "Fallacies undermine argumentative validity."
        },
        {
          id: 3,
          prompt: "Why is peer review crucial in scientific research?",
          imageIllustration: "🔬👥📋",
          options: [{ label: "To validate findings and ensure methodological rigor", isCorrect: true }, { label: "To delay publication", isCorrect: false }],
          explanation: "Peer review maintains scientific integrity."
        },
        {
          id: 4,
          prompt: "What does 'objective' mean in reporting?",
          imageIllustration: "⚖️📊📌",
          options: [{ label: "Based on facts without personal bias or emotion", isCorrect: true }, { label: "Highly opinionated", isCorrect: false }],
          explanation: "Objective writing remains neutral and factual."
        },
        {
          id: 5,
          prompt: "What is a hypothesis?",
          imageIllustration: "🧪💡📝",
          options: [{ label: "A proposed explanation testable through investigation", isCorrect: true }, { label: "An absolute proven fact", isCorrect: false }],
          explanation: "Hypotheses guide experimental testing."
        }
      ]
    },

    // ================= C1 ADVANCED =================
    "C1-Daily-1": {
      title: "C1 Advanced: Quiz 1 - Nuanced Discourse & Idioms",
      image: "🏛️",
      level: "C1 Advanced",
      category: "Daily Life",
      source: "CAE Proficiency Corpus",
      questions: [
        {
          id: 1,
          prompt: "What does the idiom 'to beat around the bush' mean?",
          imageIllustration: "🌳🗣️🎯",
          options: [{ label: "To avoid speaking directly about a sensitive topic", isCorrect: true }, { label: "To trim garden hedges", isCorrect: false }],
          explanation: "Beating around the bush refers to evasive speech."
        },
        {
          id: 2,
          prompt: "Choose the correct phrase: 'Hardly had I arrived at the station _____ the train departed.'",
          imageIllustration: "🚆⏱️🏃‍♂️",
          options: [{ label: "when", isCorrect: true }, { label: "than", isCorrect: false }],
          explanation: "Inversion structure: 'Hardly had... when...' expresses immediate sequence."
        },
        {
          id: 3,
          prompt: "What does 'ubiquitous' mean?",
          imageIllustration: "🌍👁️📱",
          options: [{ label: "Present, appearing, or found everywhere", isCorrect: true }, { label: "Extremely rare", isCorrect: false }],
          explanation: "Ubiquitous describes omnipresent phenomena."
        },
        {
          id: 4,
          prompt: "What is the meaning of 'pragmatic'?",
          imageIllustration: "🧠⚙️🛠️",
          options: [{ label: "Dealing with things sensibly and realistically", isCorrect: true }, { label: "Purely idealistic and impractical", isCorrect: false }],
          explanation: "Pragmatism favors practical solutions."
        },
        {
          id: 5,
          prompt: "What does 'mitigate' mean?",
          imageIllustration: "🛡️📉🕊️",
          options: [{ label: "To make less severe, serious, or painful", isCorrect: true }, { label: "To worsen a crisis", isCorrect: false }],
          explanation: "Mitigation reduces negative impacts."
        }
      ]
    },
    "C1-Social-2": {
      title: "C1 Advanced: Quiz 2 - Global Media & Ethics",
      image: "📡",
      level: "C1 Advanced",
      category: "Social Media",
      source: "CAE Media Analysis",
      questions: [
        {
          id: 1,
          prompt: "What is an 'echo chamber' in modern social media?",
          imageIllustration: "🗣️🔁🌐",
          options: [{ label: "An environment where beliefs are reinforced and dissenting views excluded", isCorrect: true }, { label: "A recording studio", isCorrect: false }],
          explanation: "Echo chambers isolate users from counter-perspectives."
        },
        {
          id: 2,
          prompt: "What does 'sensationalism' in journalism refer to?",
          imageIllustration: "📰💥😲",
          options: [{ label: "Overhyping stories with shocking details to boost viewership", isCorrect: true }, { label: "Dry academic reporting", isCorrect: false }],
          explanation: "Sensationalism prioritizes shock value over depth."
        },
        {
          id: 3,
          prompt: "What is 'deepfake' technology?",
          imageIllustration: "🤖🎭📹",
          options: [{ label: "AI-generated synthetic media replacing faces or voices convincingly", isCorrect: true }, { label: "Deep sea diving footage", isCorrect: false }],
          explanation: "Deepfakes utilize artificial neural networks for impersonation."
        },
        {
          id: 4,
          prompt: "What does 'algorithmic bias' mean?",
          imageIllustration: "🤖⚖️⚠️",
          options: [{ label: "Systematic errors in computer systems creating unfair outcomes", isCorrect: true }, { label: "Fast computer processing", isCorrect: false }],
          explanation: "Algorithmic bias reflects prejudiced training data."
        },
        {
          id: 5,
          prompt: "What is 'information literacy'?",
          imageIllustration: "📚🔍💡",
          options: [{ label: "The ability to evaluate, verify, and parse digital information critically", isCorrect: true }, { label: "Typing fast on keyboards", isCorrect: false }],
          explanation: "Information literacy prevents misinformation spread."
        }
      ]
    },
    "C1-Jobs-3": {
      title: "C1 Advanced: Quiz 3 - Executive Interviews & Leadership",
      image: "🏛️",
      level: "C1 Advanced",
      category: "Job Interviews",
      source: "CAE Professional Corpus",
      questions: [
        {
          id: 1,
          prompt: "Which response demonstrates superior executive communication?",
          imageIllustration: "📈💼🚀",
          options: [
            { label: "By streamlining operational workflows, we reduced overhead by 30%.", isCorrect: true },
            { label: "We did some stuff and saved money.", isCorrect: false }
          ],
          explanation: "Executive communication requires precise, metrics-driven phrasing."
        },
        {
          id: 2,
          prompt: "What does 'stakeholder alignment' mean in corporate settings?",
          imageIllustration: "🌐🤝⚙️",
          options: [
            { label: "Ensuring all interested parties share mutual goals", isCorrect: true },
            { label: "Parking cars in a row", isCorrect: false }],
          explanation: "Stakeholder alignment synchronizes team objectives."
        },
        {
          id: 3,
          prompt: "How do you handle a critical stakeholder objection?",
          imageIllustration: "🧩💬💡",
          options: [
            { label: "Acknowledge concerns constructively with data-backed solutions", isCorrect: true },
            { label: "Ignore them completely", isCorrect: false }],
          explanation: "Diplomatic mitigation resolves high-stakes friction."
        },
        {
          id: 4,
          prompt: "What is strategic foresight?",
          imageIllustration: "🔭🔮📈",
          options: [
            { label: "Anticipating long-term industry shifts and adapting proactively", isCorrect: true },
            { label: "Guessing tomorrow's weather", isCorrect: false }],
          explanation: "Foresight drives visionary leadership."
        },
        {
          id: 5,
          prompt: "Which idiom describes taking charge during a crisis?",
          imageIllustration: "⛵⚓👑",
          options: [
            { label: "Stepping up to the plate / Taking the helm", isCorrect: true },
            { label: "Beating around the bush", isCorrect: false }],
          explanation: "Taking the helm signifies proactive crisis leadership."
        }
      ]
    },
    "C1-Academic-4": {
      title: "C1 Advanced: Quiz 4 - Advanced Rhetoric & Debate",
      image: "📜",
      level: "C1 Advanced",
      category: "Academic & Debate",
      source: "CAE Academic Mastery",
      questions: [
        {
          id: 1,
          prompt: "What is a 'concession' in academic discourse?",
          imageIllustration: "⚖️🤝📋",
          options: [{ label: "Granting a valid point to the opposition before refuting it", isCorrect: true }, { label: "Surrendering an argument entirely", isCorrect: false }],
          explanation: "Concessions demonstrate intellectual honesty."
        },
        {
          id: 2,
          prompt: "Choose the correct inversion: 'Not only _____ the experiment successful, but it was under budget.'",
          imageIllustration: "🧪📈✨",
          options: [{ label: "was", isCorrect: true }, { label: "the experiment was", isCorrect: false }],
          explanation: "Negative adverbial inversion requires auxiliary verb before subject."
        },
        {
          id: 3,
          prompt: "What does 'ameliorate' mean?",
          imageIllustration: "📈✨🌱",
          options: [{ label: "To make something bad or unsatisfactory better", isCorrect: true }, { label: "To destroy completely", isCorrect: false }],
          explanation: "Amelioration implies positive improvement."
        },
        {
          id: 4,
          prompt: "What is an 'epistemological' inquiry concerned with?",
          imageIllustration: "🧠🔍📚",
          options: [{ label: "The nature and scope of knowledge itself", isCorrect: true }, { label: "Building electrical circuits", isCorrect: false }],
          explanation: "Epistemology studies how we acquire knowledge."
        },
        {
          id: 5,
          prompt: "What does 'paradigm shift' signify?",
          imageIllustration: "🔄💡🌍",
          options: [{ label: "A fundamental change in approach or underlying assumptions", isCorrect: true }, { label: "A temporary minor update", isCorrect: false }],
          explanation: "Paradigm shifts revolutionize conceptual frameworks."
        }
      ]
    },
    "C1-Extra-5": {
      title: "C1 Advanced: Quiz 5 - Critical Analysis & Philosophy",
      image: "🎓",
      level: "C1 Advanced",
      category: "Academic & Debate",
      source: "CAE Higher Education",
      questions: [
        {
          id: 1,
          prompt: "What does 'empirical' evidence rely upon?",
          imageIllustration: "🔬📊🧪",
          options: [{ label: "Observation and sensory experience rather than pure theory", isCorrect: true }, { label: "Pure imagination and guesswork", isCorrect: false }],
          explanation: "Empiricism grounds science in observational data."
        },
        {
          id: 2,
          prompt: "What is the meaning of 'tautology' in language?",
          imageIllustration: "🔄✍️🔁",
          options: [{ label: "Redundant repetition of meaning using different words", isCorrect: true }, { label: "A complex mathematical equation", isCorrect: false }],
          explanation: "Tautologies restate points unnecessarily (e.g. 'free gift')."
        },
        {
          id: 3,
          prompt: "What does 'dichotomy' represent?",
          imageIllustration: "⚡⚖️🎭",
          options: [{ label: "A division between two contrasting things or categories", isCorrect: true }, { label: "A unanimous agreement", isCorrect: false }],
          explanation: "Dichotomies present binary oppositions."
        },
        {
          id: 4,
          prompt: "What is a 'straw man' fallacy?",
          imageIllustration: "🌾❌👤",
          options: [{ label: "Misrepresenting an opponent's argument to make it easier to attack", isCorrect: true }, { label: "Building a scarecrow in agriculture", isCorrect: false }],
          explanation: "Straw man fallacies distort original statements."
        },
        {
          id: 5,
          prompt: "What does 'zeitgeist' mean?",
          imageIllustration: "⏳🌍🎭",
          options: [{ label: "The defining spirit or mood of a particular period in history", isCorrect: true }, { label: "A ghostly apparition", isCorrect: false }],
          explanation: "Zeitgeist captures the cultural climate of an era."
        }
      ]
    }
  };

  // Expanded Study Materials matching all levels and categories
  const studyGuides: StudyMaterial[] = [
    {
      id: "guide-k-daily",
      title: "Kindergarten: Daily Life & Basic Vocabulary",
      level: "Kindergarten",
      category: "Daily Life",
      summary: "Foundational phonics, colors, fruits, and family greetings for young learners.",
      illustration: "🧸🍎✨",
      accentColor: "bg-pink-50 border-pink-100 text-pink-600",
      subTopics: [
        {
          title: "1. Phonemic Alphabet Recognition",
          subtitle: "Matching sounds to everyday objects",
          explanation: ["Children learn initial sounds using visual flashcards.", "Apples, balls, and cats form the baseline phonetic set."],
          examples: ["/æ/ for Apple", "/b/ for Ball"]
        }
      ]
    },
    {
      id: "guide-p-social",
      title: "Primary School: Safe Social Media & Etiquette",
      level: "Primary School",
      category: "Social Media",
      summary: "Understanding kind online communication and digital safety rules.",
      illustration: "📱💬🛡️",
      accentColor: "bg-green-50 border-green-100 text-green-600",
      subTopics: [
        {
          title: "1. Respectful Chatting Online",
          subtitle: "Using polite words in virtual spaces",
          explanation: ["Treating others online with the same kindness as in person.", "Reporting inappropriate content immediately."],
          examples: ["Saying 'Please' and 'Thank you' in game lobbies."]
        }
      ]
    },
    {
      id: "guide-jh-jobs",
      title: "Junior High: Introduction to Job Interviews",
      level: "Junior High",
      category: "Job Interviews",
      summary: "Basic preparation for part-time student roles and teamwork skills.",
      illustration: "💼🤝📈",
      accentColor: "bg-sky-50 border-sky-100 text-sky-600",
      subTopics: [
        {
          title: "1. First Impressions & Punctuality",
          subtitle: "Why arriving on time matters",
          explanation: ["Punctuality builds trust with employers.", "Dressing neatly reflects professional commitment."],
          examples: ["Arriving 10 minutes prior to scheduled meetings."]
        }
      ]
    },
    {
      id: "guide-sh-academic",
      title: "Senior High: Academic Debate & Argumentation",
      level: "Senior High",
      category: "Academic & Debate",
      summary: "Structuring persuasive speeches, counter-arguments, and formal essays.",
      illustration: "⚖️🏛️📝",
      accentColor: "bg-purple-50 border-purple-100 text-purple-600",
      subTopics: [
        {
          title: "1. Thesis Development",
          subtitle: "Drafting clear argumentative hooks",
          explanation: ["A thesis statement guides your entire essay structure.", "Clear supporting points make debates compelling."],
          examples: ["'While renewable energy is costly, its long-term environmental yield is vital.'"]
        }
      ]
    },
    {
      id: "guide-c1-jobs",
      title: "C1 Advanced: Executive Leadership & Corporate Interviews",
      level: "C1 Advanced",
      category: "Job Interviews",
      summary: "Advanced metrics-driven storytelling and high-level stakeholder management.",
      illustration: "🏛️📊🎯",
      accentColor: "bg-amber-50 border-amber-100 text-amber-600",
      subTopics: [
        {
          title: "1. Metrics-Driven Elevator Pitches",
          subtitle: "Demonstrating ROI and strategic impact",
          explanation: ["Using quantifiable achievements to prove leadership value.", "Addressing complex corporate objections with composure."],
          examples: ["'Spearheaded global restructuring, yielding a 35% margin increase.'"]
        }
      ]
    }
  ];

  const handleSelectOption = (qId: number, optIdx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const currentModule = activeModuleKey ? quizDataBank[activeModuleKey] : null;
  const currentStudyGuide = activeStudyId ? studyGuides.find(g => g.id === activeStudyId) : null;

  // Calculate score for celebration summary screen
  const totalQuestions = currentModule ? currentModule.questions.length : 0;
  const answeredCount = currentModule ? Object.keys(selectedAnswers).length : 0;
  const isComplete = totalQuestions > 0 && answeredCount === totalQuestions;
  const correctCount = currentModule
    ? currentModule.questions.reduce((acc, q) => {
        const selectedOpt = selectedAnswers[q.id];
        return selectedOpt !== undefined && q.options[selectedOpt].isCorrect ? acc + 1 : acc;
      }, 0)
    : 0;

  // QUIZ PAGE VIEW WITH SCORE SUMMARY CELEBRATION
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
              {currentModule.level}
            </span>
            <span className="bg-[#55b1d4]/10 text-[#55b1d4] text-xs font-semibold px-3 py-1 rounded-full">
              {currentModule.category}
            </span>
          </div>

          <div className="text-6xl mb-4">{currentModule.image}</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{currentModule.title}</h2>
          <p className="text-sm text-gray-500 mb-8">Total Questions: {currentModule.questions.length}</p>

          {/* CELEBRATORY SCORE SUMMARY BANNER WHEN ALL QUESTIONS ARE ANSWERED */}
          {isComplete && (
            <div className="mb-12 p-8 rounded-3xl bg-gradient-to-r from-pink-50 via-sky-50 to-amber-50 border-2 border-[#55b1d4]/30 text-center shadow-md animate-fade-in">
              <div className="text-5xl mb-3">🎉🏆✨</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Quiz Completed!</h3>
              <p className="text-lg text-gray-700 font-medium mb-4">
                You scored <span className="text-[#E95599] font-bold">{correctCount}</span> out of <span className="font-bold">{totalQuestions}</span> correct!
              </p>
              <button
                onClick={() => setSelectedAnswers({})}
                className="bg-gray-900 hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-2xl transition cursor-pointer text-sm shadow-sm"
              >
                🔄 Retry Quiz
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

  // STUDY GUIDE OVERVIEW VIEW
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
          Choose your school level first, then filter by category to explore interactive quizzes (Quiz 1 to 5 per topic) and comprehensive study materials.
        </p>

        {/* STEP 1: SELECT SCHOOL LEVEL */}
        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Select School Level</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {levels.map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
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
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Select Category</h3>
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

      {/* TAB 1: PRACTICE QUIZZES (25+ Modules across Quiz 1 to Quiz 5) */}
      {activeTab === "quizzes" && (
        <section className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {Object.entries(quizDataBank).map(([key, mod]) => {
            const matchesLevel = selectedLevel === "All Levels" || mod.level === selectedLevel;
            const matchesTopic = selectedTopic === "All" || mod.category === selectedTopic;
            const isMatch = matchesLevel && matchesTopic;

            return (
              <div
                key={key}
                className={`bg-white p-6 rounded-2xl border border-gray-100 shadow-sm transition flex flex-col justify-between ${
                  isMatch ? "opacity-100 hover:shadow-md" : "opacity-20 pointer-events-none"
                }`}
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
                  onClick={() => isMatch && setActiveModuleKey(key)}
                  className="w-full py-3 px-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-[#55b1d4] hover:text-white transition font-semibold text-xs cursor-pointer"
                >
                  Start Quiz ({mod.questions.length} Questions) →
                </button>
              </div>
            );
          })}
        </section>
      )}

      {/* TAB 2: STUDY MATERIALS */}
      {activeTab === "materials" && (
        <section className="max-w-4xl mx-auto space-y-6">
          {studyGuides.map((guide) => {
            const matchesLevel = selectedLevel === "All Levels" || guide.level === selectedLevel;
            const matchesTopic = selectedTopic === "All" || guide.category === selectedTopic;
            const isMatch = matchesLevel && matchesTopic;

            return (
              <div
                key={guide.id}
                onClick={() => isMatch && setActiveStudyId(guide.id)}
                className={`bg-white rounded-3xl border border-gray-200 shadow-sm transition overflow-hidden group flex flex-col md:flex-row items-center ${
                  isMatch ? "opacity-100 hover:border-[#55b1d4] hover:shadow-md cursor-pointer" : "opacity-20 pointer-events-none"
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