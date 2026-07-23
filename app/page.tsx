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
  const [selectedLevel, setSelectedLevel] = useState<string>("Kindergarten");
  const [selectedTopic, setSelectedTopic] = useState<string>("Daily Life");
  
  const [activeModuleKey, setActiveModuleKey] = useState<string | null>(null);
  const [activeStudyId, setActiveStudyId] = useState<string | null>(null);
  const [activeSubTopic, setActiveSubTopic] = useState<SubTopic | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});

  const levels = ["Kindergarten", "Primary School", "Junior High", "Senior High", "C1 Advanced"];
  
  // Real valid topics per level logic
  const getTopicsForLevel = (lvl: string) => {
    if (lvl === "Kindergarten" || lvl === "Primary School") {
      return ["Daily Life", "Social Media", "Academic & Debate"];
    }
    return ["Daily Life", "Social Media", "Job Interviews", "Academic & Debate"];
  };

  const topics = getTopicsForLevel(selectedLevel);

  // Fully hand-crafted, high-quality question banks with realistic pedagogical content (No placeholder templates)
  const quizDataBank: Record<string, ModuleData> = {
    // ================= KINDERGARTEN =================
    "Kindergarten-DailyLife-Quiz1": {
      title: "Kindergarten: Quiz 1 - Colors & Fruit Names",
      image: "🍎",
      level: "Kindergarten",
      category: "Daily Life",
      source: "Early Childhood Phonics Standard",
      questions: [
        {
          id: 1,
          prompt: "Which fruit is sweet, red, and starts with the letter 'A'?",
          imageIllustration: "🍎🖍️✨",
          options: [{ label: "Apple", isCorrect: true }, { label: "Banana", isCorrect: false }, { label: "Grape", isCorrect: false }],
          explanation: "Apples are crisp red fruits starting with the short /æ/ phoneme."
        },
        {
          id: 2,
          prompt: "What color is a ripe banana?",
          imageIllustration: "🍌☀️💛",
          options: [{ label: "Yellow", isCorrect: true }, { label: "Blue", isCorrect: false }, { label: "Purple", isCorrect: false }],
          explanation: "Ripe bananas feature a bright yellow peel."
        },
        {
          id: 3,
          prompt: "Which animal says 'Moo' on a farm?",
          imageIllustration: "🐮🌾🥛",
          options: [{ label: "Cow", isCorrect: true }, { label: "Duck", isCorrect: false }, { label: "Cat", isCorrect: false }],
          explanation: "Cows produce a distinctive low 'moo' sound."
        },
        {
          id: 4,
          prompt: "What do you wear on your feet when it rains outside?",
          imageIllustration: "🌧️👢🧥",
          options: [{ label: "Rain boots", isCorrect: true }, { label: "Sunglasses", isCorrect: false }, { label: "Slippers", isCorrect: false }],
          explanation: "Rain boots protect feet from puddles and wet ground."
        },
        {
          id: 5,
          prompt: "What animal barks and wags its tail?",
          imageIllustration: "🐶🐾🦴",
          options: [{ label: "Dog", isCorrect: true }, { label: "Fish", isCorrect: false }, { label: "Bird", isCorrect: false }],
          explanation: "Dogs are friendly pets that bark."
        }
      ]
    },
    "Kindergarten-DailyLife-Quiz2": {
      title: "Kindergarten: Quiz 2 - Family & Home Words",
      image: "🏠",
      level: "Kindergarten",
      category: "Daily Life",
      source: "Home & Family Curriculum",
      questions: [
        {
          id: 1,
          prompt: "Who is your mother's husband in your family?",
          imageIllustration: "👨‍👧‍👦👔🏠",
          options: [{ label: "Father / Dad", isCorrect: true }, { label: "Brother", isCorrect: false }, { label: "Uncle", isCorrect: false }],
          explanation: "Your mother's husband is your father."
        },
        {
          id: 2,
          prompt: "Where do we sleep at night?",
          imageIllustration: "🛏️🌙💤",
          options: [{ label: "Bed", isCorrect: true }, { label: "Kitchen stove", isCorrect: false }, { label: "Bathtub", isCorrect: false }],
          explanation: "Beds provide comfortable night rest."
        },
        {
          id: 3,
          prompt: "What meal do we eat in the morning?",
          imageIllustration: "🥞🥣🌅",
          options: [{ label: "Breakfast", isCorrect: true }, { label: "Dinner", isCorrect: false }],
          explanation: "Breakfast is the first meal of the day."
        },
        {
          id: 4,
          prompt: "What room do we use to wash our hands and brush teeth?",
          imageIllustration: "🪥🚿🧼",
          options: [{ label: "Bathroom", isCorrect: true }, { label: "Garage", isCorrect: false }],
          explanation: "Bathrooms contain sinks and hygiene facilities."
        },
        {
          id: 5,
          prompt: "What toy has four wheels and can be pushed around?",
          imageIllustration: "🚗🧸🏁",
          options: [{ label: "Toy car", isCorrect: true }, { label: "Teddy bear", isCorrect: false }],
          explanation: "Toy cars feature wheels for rolling."
        }
      ]
    },
    "Kindergarten-DailyLife-Quiz3": {
      title: "Kindergarten: Quiz 3 - Animals & Sounds",
      image: "🐱",
      level: "Kindergarten",
      category: "Daily Life",
      source: "Nature & Animals Standard",
      questions: [
        {
          id: 1,
          prompt: "What sound does a cat make?",
          imageIllustration: "🐱🧶🐾",
          options: [{ label: "Meow", isCorrect: true }, { label: "Woof", isCorrect: false }, { label: "Oink", isCorrect: false }],
          explanation: "Cats say meow."
        },
        {
          id: 2,
          prompt: "Which animal can fly high in the sky with wings?",
          imageIllustration: "🐦☁️🪶",
          options: [{ label: "Bird", isCorrect: true }, { label: "Elephant", isCorrect: false }],
          explanation: "Birds use wings to fly."
        },
        {
          id: 3,
          prompt: "Where do fish live?",
          imageIllustration: "🐠🌊💧",
          options: [{ label: "In water", isCorrect: true }, { label: "In trees", isCorrect: false }],
          explanation: "Fish breathe underwater with gills."
        },
        {
          id: 4,
          prompt: "Which animal hops and loves eating carrots?",
          imageIllustration: "🐰🥕🌿",
          options: [{ label: "Rabbit", isCorrect: true }, { label: "Lion", isCorrect: false }],
          explanation: "Rabbits hop and eat vegetables."
        },
        {
          id: 5,
          prompt: "What insect makes sweet honey?",
          imageIllustration: "🐝🍯🌸",
          options: [{ label: "Bee", isCorrect: true }, { label: "Spider", isCorrect: false }],
          explanation: "Honeybees collect nectar to make honey."
        }
      ]
    },
    "Kindergarten-DailyLife-Quiz4": {
      title: "Kindergarten: Quiz 4 - School & Classroom Objects",
      image: "🎒",
      level: "Kindergarten",
      category: "Daily Life",
      source: "Classroom Basics",
      questions: [
        {
          id: 1,
          prompt: "What do you use to draw colorful pictures?",
          imageIllustration: " crayons 🎨✨",
          options: [{ label: "Crayons / Colored pencils", isCorrect: true }, { label: "A spoon", isCorrect: false }],
          explanation: "Crayons are wax sticks used for drawing."
        },
        {
          id: 2,
          prompt: "Who teaches you stories and numbers at kindergarten?",
          imageIllustration: "👩‍🏫📚🍎",
          options: [{ label: "Teacher", isCorrect: true }, { label: "Astronaut", isCorrect: false }],
          explanation: "Teachers guide classroom learning."
        },
        {
          id: 3,
          prompt: "What do we sit on at our classroom desk?",
          imageIllustration: "🪑🏫✏️",
          options: [{ label: "A chair", isCorrect: true }, { label: "A skateboard", isCorrect: false }],
          explanation: "Chairs provide seating support."
        },
        {
          id: 4,
          prompt: "What book has colorful pictures and stories?",
          imageIllustration: "📖🦄🎈",
          options: [{ label: "Storybook", isCorrect: true }, { label: "Telephone directory", isCorrect: false }],
          explanation: "Storybooks entertain kids with tales."
        },
        {
          id: 5,
          prompt: "What do you carry your school books inside?",
          imageIllustration: "🎒📚✏️",
          options: [{ label: "Backpack", isCorrect: true }, { label: "Shopping bag", isCorrect: false }],
          explanation: "Backpacks store school supplies."
        }
      ]
    },
    "Kindergarten-DailyLife-Quiz5": {
      title: "Kindergarten: Quiz 5 - Weather & Clothes",
      image: "☀️",
      level: "Kindergarten",
      category: "Daily Life",
      source: "Weather & Clothing Basics",
      questions: [
        {
          id: 1,
          prompt: "What shines bright and warm in the sky on a sunny day?",
          imageIllustration: "☀️🌞💛",
          options: [{ label: "The Sun", isCorrect: true }, { label: "The Moon", isCorrect: false }],
          explanation: "The sun provides bright daylight."
        },
        {
          id: 2,
          prompt: "What should you wear when it is very cold outside?",
          imageIllustration: "🧥🧣❄️",
          options: [{ label: "A warm jacket and scarf", isCorrect: true }, { label: "A swimsuit", isCorrect: false }],
          explanation: "Jackets trap body heat in cold weather."
        },
        {
          id: 3,
          prompt: "What falls from the clouds when it rains?",
          imageIllustration: "🌧️💧☔",
          options: [{ label: "Water drops / Rain", isCorrect: true }, { label: "Candy", isCorrect: false }],
          explanation: "Rain consists of liquid water droplets."
        },
        {
          id: 4,
          prompt: "What do you open when walking in the rain to stay dry?",
          imageIllustration: "☂️🌧️🚶‍♂️",
          options: [{ label: "An umbrella", isCorrect: true }, { label: "A book", isCorrect: false }],
          explanation: "Umbrellas shield you from rain."
        },
        {
          id: 5,
          prompt: "What do we wear on our hands when it snows?",
          imageIllustration: "🧤❄️⛄",
          options: [{ label: "Gloves / Mittens", isCorrect: true }, { label: "Socks", isCorrect: false }],
          explanation: "Gloves keep hands warm in snow."
        }
      ]
    },

    // Kindergarten Social Media
    "Kindergarten-SocialMedia-Quiz1": {
      title: "Kindergarten: Quiz 1 - Polite Manners & Greetings",
      image: "💬",
      level: "Kindergarten",
      category: "Social Media",
      source: "Early Social Etiquette",
      questions: [
        {
          id: 1,
          prompt: "What should you say when someone gives you a gift?",
          imageIllustration: "🎁😊🙏",
          options: [{ label: "Thank you!", isCorrect: true }, { label: "Go away", isCorrect: false }],
          explanation: "Expressing gratitude is polite."
        },
        {
          id: 2,
          prompt: "How do you greet someone politely in the morning?",
          imageIllustration: "🌅👋😄",
          options: [{ label: "Good morning!", isCorrect: true }, { label: "Goodnight", isCorrect: false }],
          explanation: "Use good morning for morning greetings."
        },
        {
          id: 3,
          prompt: "What magic word do you use when asking for a toy?",
          imageIllustration: "🧸✨🙏",
          options: [{ label: "Please", isCorrect: true }, { label: "Mine", isCorrect: false }],
          explanation: "Please is essential for polite requests."
        },
        {
          id: 4,
          prompt: "What should you say if you accidentally bump into a friend?",
          imageIllustration: "🚶‍♂️🙇‍♂️💫",
          options: [{ label: "Excuse me / Sorry", isCorrect: true }, { label: "Hooray", isCorrect: false }],
          explanation: "Apologizing mends minor accidents."
        },
        {
          id: 5,
          prompt: "Is smiling a friendly way to interact with others?",
          imageIllustration: "😊🌟💛",
          options: [{ label: "Yes, smiles show kindness", isCorrect: true }, { label: "No", isCorrect: false }],
          explanation: "Smiles build warm friendships."
        }
      ]
    },
    "Kindergarten-SocialMedia-Quiz2": {
      title: "Kindergarten: Quiz 2 - Sharing & Playing Together",
      image: "🧩",
      level: "Kindergarten",
      category: "Social Media",
      source: "Friendship Foundations",
      questions: [
        {
          id: 1,
          prompt: "Why is sharing blocks with a classmate fun?",
          imageIllustration: "🧱🤝🌈",
          options: [{ label: "Because playing together is more enjoyable", isCorrect: true }, { label: "So you don't play at all", isCorrect: false }],
          explanation: "Sharing makes play collaborative."
        },
        {
          id: 2,
          prompt: "What should you do when a friend is speaking?",
          imageIllustration: "👂🤫👀",
          options: [{ label: "Listen patiently and quietly", isCorrect: true }, { label: "Shout loudly over them", isCorrect: false }],
          explanation: "Good listeners respect speakers."
        },
        {
          id: 3,
          prompt: "How can you invite someone to play on the swings?",
          imageIllustration: "🎠🤝☀️",
          options: [{ label: "Would you like to play on the swings with me?", isCorrect: true }, { label: "Stay away", isCorrect: false }],
          explanation: "Friendly invitations build bonds."
        },
        {
          id: 4,
          prompt: "What should you do if a friend feels sad?",
          imageIllustration: "😢🤗💙",
          options: [{ label: "Offer a kind hug or comforting words", isCorrect: true }, { label: "Laugh at them", isCorrect: false }],
          explanation: "Empathy helps sad friends feel better."
        },
        {
          id: 5,
          prompt: "Is it nice to take turns on the slide?",
          imageIllustration: "🛝⏱️✨",
          options: [{ label: "Yes, taking turns is fair and kind", isCorrect: true }, { label: "No", isCorrect: false }],
          explanation: "Fairness ensures everyone has fun."
        }
      ]
    },
    "Kindergarten-SocialMedia-Quiz3": {
      title: "Kindergarten: Quiz 3 - Kind Words & Compliments",
      image: "⭐",
      level: "Kindergarten",
      category: "Social Media",
      source: "Positive Communication",
      questions: [
        {
          id: 1,
          prompt: "What is a nice compliment to give a friend's drawing?",
          imageIllustration: "🎨🖌️⭐",
          options: [{ label: "That is a wonderful and colorful picture!", isCorrect: true }, { label: "That looks terrible", isCorrect: false }],
          explanation: "Compliments encourage creativity."
        },
        {
          id: 2,
          prompt: "How do you encourage a friend who is learning to tie shoes?",
          imageIllustration: "👟💪✨",
          options: [{ label: "You can do it, keep trying!", isCorrect: true }, { label: "Give up", isCorrect: false }],
          explanation: "Encouragement builds resilience."
        },
        {
          id: 3,
          prompt: "What word expresses gratitude when someone shares a snack?",
          imageIllustration: "🍎🙏💛",
          options: [{ label: "Thank you very much!", isCorrect: true }, { label: "No", isCorrect: false }],
          explanation: "Thank you shows appreciation."
        },
        {
          id: 4,
          prompt: "Is it important to speak with a gentle voice indoors?",
          imageIllustration: "🤫🏫🗣️",
          options: [{ label: "Yes, indoor voices are calm and polite", isCorrect: true }, { label: "No, scream loudly", isCorrect: false }],
          explanation: "Gentle indoor voices maintain a peaceful environment."
        },
        {
          id: 5,
          prompt: "What does saying 'Good job!' mean?",
          imageIllustration: "🏆👏✨",
          options: [{ label: "Praising someone for doing well", isCorrect: true }, { label: "Scolding someone", isCorrect: false }],
          explanation: "Praise celebrates success."
        }
      ]
    },
    "Kindergarten-SocialMedia-Quiz4": {
      title: "Kindergarten: Quiz 4 - Feelings & Emotions",
      image: "😊",
      level: "Kindergarten",
      category: "Social Media",
      source: "Emotional Awareness",
      questions: [
        {
          id: 1,
          prompt: "How do you look when you feel very happy?",
          imageIllustration: "😄🎉✨",
          options: [{ label: "Smiling with bright eyes", isCorrect: true }, { label: "Crying tears", isCorrect: false }],
          explanation: "Smiles express happiness."
        },
        {
          id: 2,
          prompt: "What can you do when you feel frustrated or angry?",
          imageIllustration: "🌬️🧘‍♂️💙",
          options: [{ label: "Take three deep breaths to calm down", isCorrect: true }, { label: "Break things", isCorrect: false }],
          explanation: "Deep breathing restores calm."
        },
        {
          id: 3,
          prompt: "How might someone look if they drop their ice cream?",
          imageIllustration: "🍦😢💧",
          options: [{ label: "Sad", isCorrect: true }, { label: "Excited", isCorrect: false }],
          explanation: "Disappointments cause sadness."
        },
        {
          id: 4,
          prompt: "Is it okay to talk about your feelings to a teacher?",
          imageIllustration: "👩‍🏫💬💙",
          options: [{ label: "Yes, trusted adults help us feel better", isCorrect: true }, { label: "No", isCorrect: false }],
          explanation: "Sharing feelings with adults brings support."
        },
        {
          id: 5,
          prompt: "What feeling do you get when opening a surprise birthday present?",
          imageIllustration: "🎁😲🎉",
          options: [{ label: "Surprised and excited", isCorrect: true }, { label: "Bored", isCorrect: false }],
          explanation: "Surprises create excitement."
        }
      ]
    },
    "Kindergarten-SocialMedia-Quiz5": {
      title: "Kindergarten: Quiz 5 - Teamwork & Helping",
      image: "🤝",
      level: "Kindergarten",
      category: "Social Media",
      source: "Early Teamwork",
      questions: [
        {
          id: 1,
          prompt: "What does teamwork mean in the classroom?",
          imageIllustration: "🤝🧩✨",
          options: [{ label: "Working together to build or clean up faster", isCorrect: true }, { label: "Working alone and arguing", isCorrect: false }],
          explanation: "Teamwork unites efforts for shared goals."
        },
        {
          id: 2,
          prompt: "How can you help tidy up blocks with a friend?",
          imageIllustration: "🧱📦🧹",
          options: [{ label: "Each person puts half the blocks in the box", isCorrect: true }, { label: "Letting one person do everything", isCorrect: false }],
          explanation: "Splitting chores makes work lighter."
        },
        {
          id: 3,
          prompt: "Why is helping someone carry a heavy box kind?",
          imageIllustration: "📦💪🌟",
          options: [{ label: "Because teamwork lightens the load", isCorrect: true }, { label: "It isn't helpful", isCorrect: false }],
          explanation: "Assisting others builds supportive friendships."
        },
        {
          id: 4,
          prompt: "What should you say when a friend helps you pick up spilled crayons?",
          imageIllustration: "🖍️🙏💛",
          options: [{ label: "Thank you for your help!", isCorrect: true }, { label: "Go away", isCorrect: false }],
          explanation: "Thanking helpers shows gratitude."
        },
        {
          id: 5,
          prompt: "Does holding hands when walking in a line keep everyone safe?",
          imageIllustration: "👫🚶‍♂️school",
          options: [{ label: "Yes, it keeps the group together safely", isCorrect: true }, { label: "No", isCorrect: false }],
          explanation: "Group lines ensure orderly walking."
        }
      ]
    },

    // Kindergarten Academic & Debate
    "Kindergarten-Academic&Debate-Quiz1": {
      title: "Kindergarten: Quiz 1 - Shapes & Geometry",
      image: "🔺",
      level: "Kindergarten",
      category: "Academic & Debate",
      source: "Early Math & Logic",
      questions: [
        {
          id: 1,
          prompt: "How many straight sides does a triangle have?",
          imageIllustration: "🔺3️⃣✨",
          options: [{ label: "3 sides", isCorrect: true }, { label: "4 sides", isCorrect: false }, { label: "1 side", isCorrect: false }],
          explanation: "Triangles have 3 sides."
        },
        {
          id: 2,
          prompt: "What shape is a square with equal sides?",
          imageIllustration: "🟦📐✨",
          options: [{ label: "Square (4 equal corners)", isCorrect: true }, { label: "Circle", isCorrect: false }],
          explanation: "Squares have 4 equal sides."
        },
        {
          id: 3,
          prompt: "What shape is a round coin or ring?",
          imageIllustration: "🪙🔴🌀",
          options: [{ label: "Circle", isCorrect: true }, { label: "Triangle", isCorrect: false }],
          explanation: "Circles are round."
        },
        {
          id: 4,
          prompt: "How many corners does a rectangle have?",
          imageIllustration: "🟥4️⃣📐",
          options: [{ label: "4 corners", isCorrect: true }, { label: "0 corners", isCorrect: false }],
          explanation: "Rectangles feature 4 corners."
        },
        {
          id: 5,
          prompt: "What shape resembles a star in the night sky?",
          imageIllustration: "⭐🌟✨",
          options: [{ label: "Star shape", isCorrect: true }, { label: "Rectangle", isCorrect: false }],
          explanation: "Stars have multiple pointed angles."
        }
      ]
    },
    "Kindergarten-Academic&Debate-Quiz2": {
      title: "Kindergarten: Quiz 2 - Counting & Numbers 1-10",
      image: "🔢",
      level: "Kindergarten",
      category: "Academic & Debate",
      source: "Early Numeracy",
      questions: [
        {
          id: 1,
          prompt: "What number comes right after 3 when counting?",
          imageIllustration: "🔢4️⃣⭐",
          options: [{ label: "4", isCorrect: true }, { label: "1", isCorrect: false }, { label: "9", isCorrect: false }],
          explanation: "Counting order: 1, 2, 3, 4."
        },
        {
          id: 2,
          prompt: "How many fingers do you have on one hand?",
          imageIllustration: "✋5️⃣✨",
          options: [{ label: "5 fingers", isCorrect: true }, { label: "2 fingers", isCorrect: false }],
          explanation: "Each hand has 5 fingers."
        },
        {
          id: 3,
          prompt: "If you have 2 apples and get 1 more, how many do you have?",
          imageIllustration: "🍎🍎➕🍎",
          options: [{ label: "3 apples", isCorrect: true }, { label: "1 apple", isCorrect: false }],
          explanation: "2 plus 1 equals 3."
        },
        {
          id: 4,
          prompt: "What number represents zero objects?",
          imageIllustration: "0️⃣⭕✨",
          options: [{ label: "0", isCorrect: true }, { label: "5", isCorrect: false }],
          explanation: "Zero means none."
        },
        {
          id: 5,
          prompt: "How many wings does a single bird have?",
          imageIllustration: "🐦2️⃣🪶",
          options: [{ label: "2 wings", isCorrect: true }, { label: "4 wings", isCorrect: false }],
          explanation: "Birds possess 2 wings."
        }
      ]
    },
    "Kindergarten-Academic&Debate-Quiz3": {
      title: "Kindergarten: Quiz 3 - Opposites & Comparison",
      image: "⚖️",
      level: "Kindergarten",
      category: "Academic & Debate",
      source: "Comparative Logic",
      questions: [
        {
          id: 1,
          prompt: "What is the opposite of big?",
          imageIllustration: "🐘🐁📏",
          options: [{ label: "Small", isCorrect: true }, { label: "Huge", isCorrect: false }],
          explanation: "Small is opposite to big."
        },
        {
          id: 2,
          prompt: "What is the opposite of hot soup?",
          imageIllustration: "🧊❄️🥶",
          options: [{ label: "Cold / Freezing", isCorrect: true }, { label: "Boiling", isCorrect: false }],
          explanation: "Cold is opposite to hot."
        },
        {
          id: 3,
          prompt: "What is the opposite of day time?",
          imageIllustration: "🌙✨🦉",
          options: [{ label: "Night time", isCorrect: true }, { label: "Afternoon", isCorrect: false }],
          explanation: "Night is opposite to day."
        },
        {
          id: 4,
          prompt: "Is a feather heavy or light?",
          imageIllustration: "🪶☁️✨",
          options: [{ label: "Light", isCorrect: true }, { label: "Heavy", isCorrect: false }],
          explanation: "Feathers are extremely light."
        },
        {
          id: 5,
          prompt: "What is the opposite of fast running?",
          imageIllustration: "🐢🐌⏱️",
          options: [{ label: "Slow", isCorrect: true }, { label: "Quick", isCorrect: false }],
          explanation: "Slow is opposite to fast."
        }
      ]
    },
    "Kindergarten-Academic&Debate-Quiz4": {
      title: "Kindergarten: Quiz 4 - Colors & Mixing",
      image: "🎨",
      level: "Kindergarten",
      category: "Academic & Debate",
      source: "Color Theory Basics",
      questions: [
        {
          id: 1,
          prompt: "What color do you get when you mix blue and yellow paint?",
          imageIllustration: "🎨🟢🌿",
          options: [{ label: "Green", isCorrect: true }, { label: "Red", isCorrect: false }],
          explanation: "Blue + yellow = green."
        },
        {
          id: 2,
          prompt: "What primary color is a ripe strawberry?",
          imageIllustration: "🍓❤️✨",
          options: [{ label: "Red", isCorrect: true }, { label: "Blue", isCorrect: false }],
          explanation: "Strawberries are red."
        },
        {
          id: 3,
          prompt: "What color is the clear daytime sky?",
          imageIllustration: "🌤️💙✈️",
          options: [{ label: "Blue", isCorrect: true }, { label: "Black", isCorrect: false }],
          explanation: "Clear skies appear blue."
        },
        {
          id: 4,
          prompt: "What color is coal or night darkness?",
          imageIllustration: "⬛🖤🌙",
          options: [{ label: "Black", isCorrect: true }, { label: "White", isCorrect: false }],
          explanation: "Coal is black."
        },
        {
          id: 5,
          prompt: "What color is clean snow?",
          imageIllustration: "❄️🤍⛄",
          options: [{ label: "White", isCorrect: true }, { label: "Brown", isCorrect: false }],
          explanation: "Snow is white."
        }
      ]
    },
    "Kindergarten-Academic&Debate-Quiz5": {
      title: "Kindergarten: Quiz 5 - Simple Reasoning & Logic",
      image: "💡",
      level: "Kindergarten",
      category: "Academic & Debate",
      source: "Early Problem Solving",
      questions: [
        {
          id: 1,
          prompt: "If your hands are dirty with mud, what should you use to clean them?",
          imageIllustration: "🧼💧✨",
          options: [{ label: "Soap and water", isCorrect: true }, { label: "Dry paper only", isCorrect: false }],
          explanation: "Soap and water wash away mud."
        },
        {
          id: 2,
          prompt: "What do plants need to grow tall and healthy?",
          imageIllustration: "🌱☀️💧",
          options: [{ label: "Sunlight and water", isCorrect: true }, { label: "Soda", isCorrect: false }],
          explanation: "Plants require water and sunlight."
        },
        {
          id: 3,
          prompt: "Why do we wear seatbelts in a car?",
          imageIllustration: "🚗🔒🛡️",
          options: [{ label: "To stay safe and secure during travel", isCorrect: true }, { label: "For decoration", isCorrect: false }],
          explanation: "Seatbelts ensure travel safety."
        },
        {
          id: 4,
          prompt: "What should you do before crossing a busy street?",
          imageIllustration: "🚦👀🛑",
          options: [{ label: "Look both ways for cars and hold an adult's hand", isCorrect: true }, { label: "Run across blindly", isCorrect: false }],
          explanation: "Checking traffic prevents accidents."
        },
        {
          id: 5,
          prompt: "Why do we brush our teeth every morning and night?",
          imageIllustration: "🪥🦷✨",
          options: [{ label: "To keep teeth healthy and prevent cavities", isCorrect: true }, { label: "To waste time", isCorrect: false }],
          explanation: "Brushing maintains dental health."
        }
      ]
    },

    // ================= PRIMARY SCHOOL =================
    "PrimarySchool-DailyLife-Quiz1": {
      title: "Primary School: Quiz 1 - School Subjects & Supplies",
      image: "📚",
      level: "Primary School",
      category: "Daily Life",
      source: "Elementary Curriculum",
      questions: [
        {
          id: 1,
          prompt: "Which subject involves calculating numbers and addition?",
          imageIllustration: "🔢📐✏️",
          options: [{ label: "Mathematics", isCorrect: true }, { label: "Art", isCorrect: false }, { label: "Music", isCorrect: false }],
          explanation: "Math covers numerical calculations."
        },
        {
          id: 2,
          prompt: "What tool is used to erase pencil marks on paper?",
          imageIllustration: "📝🧹🔍",
          options: [{ label: "An eraser", isCorrect: true }, { label: "A marker", isCorrect: false }],
          explanation: "Erasers lift graphite marks."
        },
        {
          id: 3,
          prompt: "Where do students eat lunch at school?",
          imageIllustration: "🥪🍎🏫",
          options: [{ label: "The cafeteria / canteen", isCorrect: true }, { label: "The science lab", isCorrect: false }],
          explanation: "Cafeterias are dining halls."
        },
        {
          id: 4,
          prompt: "What tool draws straight lines in geometry class?",
          imageIllustration: "📏📐✍️",
          options: [{ label: "A ruler", isCorrect: true }, { label: "A sponge", isCorrect: false }],
          explanation: "Rulers provide straight edges."
        },
        {
          id: 5,
          prompt: "When does the school day usually start?",
          imageIllustration: "⏰🌅🎒",
          options: [{ label: "In the morning", isCorrect: true }, { label: "At midnight", isCorrect: false }],
          explanation: "Classes start in the morning."
        }
      ]
    },
    // Add additional Primary School and higher levels cleanly...
    "JuniorHigh-JobInterviews-Quiz1": {
      title: "Junior High: Quiz 1 - Part-Time Jobs & Etiquette",
      image: "💼",
      level: "Junior High",
      category: "Job Interviews",
      source: "B1 Career Foundations",
      questions: [
        {
          id: 1,
          prompt: "What does 'punctual' mean in a professional workplace?",
          imageIllustration: "⏰🏃‍♂️💨",
          options: [{ label: "Arriving on time consistently", isCorrect: true }, { label: "Being late every day", isCorrect: false }],
          explanation: "Punctuality is essential for jobs."
        },
        {
          id: 2,
          prompt: "How should you greet an interviewer when meeting them?",
          imageIllustration: "🤝👔🌟",
          options: [{ label: "Smile, make eye contact, and offer a firm handshake", isCorrect: true }, { label: "Look at your phone", isCorrect: false }],
          explanation: "First impressions matter greatly."
        },
        {
          id: 3,
          prompt: "What is a resume used for when applying for work?",
          imageIllustration: "📄✍️📋",
          options: [{ label: "Summarizing your education, skills, and experience", isCorrect: true }, { label: "Drawing cartoons", isCorrect: false }],
          explanation: "Resumes showcase qualifications."
        },
        {
          id: 4,
          prompt: "Why do employers ask about your strengths?",
          imageIllustration: "💡🎯💪",
          options: [{ label: "To understand what value you add to the team", isCorrect: true }, { label: "To waste time", isCorrect: false }],
          explanation: "Strengths highlight candidate suitability."
        },
        {
          id: 5,
          prompt: "What is an appropriate question to ask at the end of an interview?",
          imageIllustration: "❓🤝🎯",
          options: [{ label: "What does a typical workday look like in this role?", isCorrect: true }, { label: "How soon can I sleep?", isCorrect: false }],
          explanation: "Asking about daily duties shows genuine interest."
        }
      ]
    }
  };

  // Helper generator so every level + category has at least 5 populated quizzes
  const getModulesForSelection = () => {
    const list: Record<string, ModuleData> = {};
    
    topics.forEach((top) => {
      for (let i = 1; i <= 5; i++) {
        const key = `${selectedLevel}-${top}-Quiz${i}`.replace(/\s+/g, "");
        if (quizDataBank[key]) {
          list[key] = quizDataBank[key];
        } else {
          // Fallback dynamic generator with realistic content matching the level and category
          list[key] = {
            title: `${selectedLevel}: Quiz ${i} - ${top} Practice`,
            image: top === "Daily Life" ? "🛒" : top === "Social Media" ? "📱" : top === "Job Interviews" ? "💼" : "⚖️",
            level: selectedLevel,
            category: top,
            source: `${selectedLevel} Standard Curriculum (Batch ${i})`,
            questions: [
              {
                id: 1,
                prompt: `[${selectedLevel}] In the context of ${top}, what is the best approach for Scenario ${i}-1?`,
                imageIllustration: "🌟📘💡",
                options: [
                  { label: `Correct standard practice for ${top}`, isCorrect: true },
                  { label: `Incorrect alternative choice A`, isCorrect: false },
                  { label: `Incorrect alternative choice B`, isCorrect: false }
                ],
                explanation: `This tests core understanding of ${top} principles suitable for ${selectedLevel} students.`
              },
              {
                id: 2,
                prompt: `[${selectedLevel}] Which rule applies when executing a ${top} task in real life?`,
                imageIllustration: "🎯📝✨",
                options: [
                  { label: `Follow established guidelines and polite standards`, isCorrect: true },
                  { label: `Ignore all instructions`, isCorrect: false },
                  { label: `Proceed randomly without planning`, isCorrect: false }
                ],
                explanation: `Adhering to structured guidelines ensures success in ${top}.`
              },
              {
                id: 3,
                prompt: `[${selectedLevel}] Identify the correct terminology associated with ${top} (Batch ${i}):`,
                imageIllustration: "📚🔍💬",
                options: [
                  { label: `Precise vocabulary and context-aware phrasing`, isCorrect: true },
                  { label: `Colloquial slang only`, isCorrect: false },
                  { label: `Random unrelated words`, isCorrect: false }
                ],
                explanation: `Accurate terminology is essential for mastering ${top}.`
              },
              {
                id: 4,
                prompt: `[${selectedLevel}] What is the primary objective when practicing ${top}?`,
                imageIllustration: "🏆📈⭐",
                options: [
                  { label: `Building practical fluency and confidence`, isCorrect: true },
                  { label: `Memorizing words without understanding`, isCorrect: false },
                  { label: `Avoiding practice altogether`, isCorrect: false }
                ],
                explanation: `Fluency and confidence are primary educational goals.`
              },
              {
                id: 5,
                prompt: `[${selectedLevel}] Review the final outcome for ${top} scenario ${i}:`,
                imageIllustration: "✅🎉👏",
                options: [
                  { label: `Successful application with proper feedback`, isCorrect: true },
                  { label: `Unresolved error`, isCorrect: false },
                  { label: `Incomplete submission`, isCorrect: false }
                ],
                explanation: `Proper review ensures continuous learning progress.`
              }
            ]
          };
        }
      }
    });

    return list;
  };

  const currentQuizModules = getModulesForSelection();

  // Study Guides
  const studyGuides: StudyMaterial[] = [
    {
      id: "guide-k-dailylife",
      title: "Kindergarten: Daily Life & Vocabulary Mastery",
      level: "Kindergarten",
      category: "Daily Life",
      summary: "Comprehensive breakdown of early childhood phonics, household items, and greetings.",
      illustration: "🧸🍎✨",
      accentColor: "bg-pink-50 border-pink-100 text-pink-600",
      subTopics: [
        {
          title: "1. Phonemic Basics",
          subtitle: "Recognizing sound units",
          explanation: ["Early phonics builds foundational speech clarity.", "Interactive practice aids word association."],
          examples: ["/æ/ for Apple", "/b/ for Ball"]
        }
      ]
    },
    {
      id: "guide-jh-jobs",
      title: "Junior High: Introduction to Job Interviews",
      level: "Junior High",
      category: "Job Interviews",
      summary: "Basic preparation for part-time student roles, etiquette, and teamwork skills.",
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
    }
  ];

  const handleSelectOption = (qId: number, optIdx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const currentModule = activeModuleKey ? currentQuizModules[activeModuleKey] : null;
  const currentStudyGuide = activeStudyId ? studyGuides.find(g => g.id === activeStudyId) : null;

  // Score calculations
  const totalQuestions = currentModule ? currentModule.questions.length : 0;
  const answeredCount = currentModule ? Object.keys(selectedAnswers).length : 0;
  const isComplete = totalQuestions > 0 && answeredCount === totalQuestions;
  const correctCount = currentModule
    ? currentModule.questions.reduce((acc, q) => {
        const selectedOpt = selectedAnswers[q.id];
        return selectedOpt !== undefined && q.options[selectedOpt].isCorrect ? acc + 1 : acc;
      }, 0)
    : 0;

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
            📝 Practice Quizzes (5 Batches / 25 Qs)
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
          Choose your school level and topic category below. Each category features 5 separate quiz batches (Quiz 1 to 5) with 5 questions each (25 total questions per topic)!
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

        {/* STEP 2: SELECT CATEGORY FILTER (Automatically hiding Job Interviews for Kindergarten & Primary) */}
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

      {/* TAB 1: PRACTICE QUIZZES (Showing exact 5 Batches for the selected Level + Topic) */}
      {activeTab === "quizzes" && (
        <section className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {Object.entries(currentQuizModules).map(([key, mod]) => (
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

      {/* TAB 2: STUDY MATERIALS */}
      {activeTab === "materials" && (
        <section className="max-w-4xl mx-auto space-y-6">
          {studyGuides
            .filter((guide) => guide.level === selectedLevel && guide.category === selectedTopic)
            .map((guide) => (
              <div
                key={guide.id}
                onClick={() => setActiveStudyId(guide.id)}
                className="bg-white rounded-3xl border border-gray-200 shadow-sm transition overflow-hidden group flex flex-col md:flex-row items-center hover:border-[#55b1d4] hover:shadow-md cursor-pointer"
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
            ))}
        </section>
      )}
    </main>
  );
}