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

type ReadingSection = {
  heading: string;
  subheading: string;
  paragraphs: string[];
  vocabulary: VocabularyItem[];
  grammar: GrammarRule;
  practicalApplication: string;
  keyTakeaways: string[];
};

type StudyMaterial = {
  id: string;
  title: string;
  level: string;
  category: string;
  summary: string;
  illustration: string;
  accentColor: string;
  sections: ReadingSection[];
};

export default function Home() {
  const [hasEntered, setHasEntered] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"quizzes" | "materials">("quizzes");
  const [selectedLevel, setSelectedLevel] = useState<string>("Kindergarten");
  const [selectedTopic, setSelectedTopic] = useState<string>("Daily Life");
  
  const [activeModuleKey, setActiveModuleKey] = useState<string | null>(null);
  const [activeStudyId, setActiveStudyId] = useState<string | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [expandedSections, setExpandedSections] = useState<Record<number, boolean>>({});

  const levels = ["Kindergarten", "Primary School", "Junior High", "Senior High", "C1 Advanced"];
  
  const getTopicsForLevel = (lvl: string) => {
    if (lvl === "Kindergarten" || lvl === "Primary School") {
      return ["Daily Life", "Social Media", "Academic & Debate"];
    }
    return ["Daily Life", "Social Media", "Job Interviews", "Academic & Debate"];
  };

  const topics = getTopicsForLevel(selectedLevel);

  // COMPLETELY CLEAN, VERCEL-COMPLIANT QUIZ GENERATOR
  const getCurrentLevelQuizzes = () => {
    const list: Record<string, ModuleData> = {};
    const icons = ["🍎", "📱", "ABC", "🔢", "🎒", "🔬", "🗺️", "💼", "🏛️", "📊"];

    topics.forEach((top, topIdx) => {
      for (let batchNum = 1; batchNum <= 5; batchNum++) {
        const key = `${selectedLevel}-${top}-Quiz${batchNum}`.replace(/\s+/g, "");
        
        let poolData: any[] = [];

        if (selectedLevel === "Kindergarten") {
          if (top === "Daily Life") {
            const pools = [
              [
                { id: 1, prompt: "Which fruit is sweet, red, and starts with 'A'?", img: "🍎", opts: [{ l: "Apple", c: true }, { l: "Banana", c: false }, { l: "Carrot", c: false }], exp: "Apples start with A and are red." },
                { id: 2, prompt: "What color is a ripe banana peel?", img: "🍌", opts: [{ l: "Yellow", c: true }, { l: "Blue", c: false }, { l: "Pink", c: false }], exp: "Ripe bananas are yellow." },
                { id: 3, prompt: "What farm animal says 'Moo'?", img: "🐮", opts: [{ l: "Cow", c: true }, { l: "Duck", c: false }, { l: "Cat", c: false }], exp: "Cows make a mooing sound." },
                { id: 4, prompt: "What do you wear on your feet in rain?", img: "👢", opts: [{ l: "Rain boots", c: true }, { l: "Sunglasses", c: false }, { l: "Slippers", c: false }], exp: "Boots keep feet dry." },
                { id: 5, prompt: "Which meal is eaten in the morning?", img: "🌅", opts: [{ l: "Breakfast", c: true }, { l: "Dinner", c: false }, { l: "Supper", c: false }], exp: "Breakfast is morning food." }
              ],
              [
                { id: 1, prompt: "Which animal has a very long neck and eats tree leaves?", img: "🦒", opts: [{ l: "Giraffe", c: true }, { l: "Mouse", c: false }, { l: "Fish", c: false }], exp: "Giraffes have long necks." },
                { id: 2, prompt: "What shape is a standard soccer ball?", img: "⚽", opts: [{ l: "Round (Sphere)", c: true }, { l: "Square", c: false }, { l: "Triangle", c: false }], exp: "Balls are spherical." },
                { id: 3, prompt: "Which vehicle flies in the sky with wings?", img: "✈️", opts: [{ l: "Airplane", c: true }, { l: "Submarine", c: false }, { l: "Bicycle", c: false }], exp: "Airplanes fly through clouds." },
                { id: 4, prompt: "What season brings cold snow and winter coats?", img: "❄️", opts: [{ l: "Winter", c: true }, { l: "Summer", c: false }, { l: "Spring", c: false }], exp: "Winter brings snow." },
                { id: 5, prompt: "What color is clear drinking water?", img: "💧", opts: [{ l: "Colorless/Transparent", c: true }, { l: "Purple", c: false }, { l: "Green", c: false }], exp: "Pure water has no color." }
              ],
              [
                { id: 1, prompt: "What tool do we use to brush our teeth?", img: "🦷", opts: [{ l: "Toothbrush", c: true }, { l: "Hairbrush", c: false }, { l: "Broom", c: false }], exp: "Toothbrushes clean teeth." },
                { id: 2, prompt: "How many legs does a happy dog have?", img: "🐕", opts: [{ l: "Four", c: true }, { l: "Two", c: false }, { l: "Six", c: false }], exp: "Dogs walk on four legs." },
                { id: 3, prompt: "What celestial body lights up the sky during the dark night?", img: "🌙", opts: [{ l: "The Moon and Stars", c: true }, { l: "The daytime Sun", c: false }, { l: "A flashlight", c: false }], exp: "Moons shine at night." },
                { id: 4, prompt: "What sound does a cute little kitten make?", img: "🐱", opts: [{ l: "Meow", c: true }, { l: "Woof", c: false }, { l: "Roar", c: false }], exp: "Kittens meow." },
                { id: 5, prompt: "Which clothing item keeps your head warm in winter?", img: "🧢", opts: [{ l: "Winter beanie or hat", c: true }, { l: "Socks", c: false }, { l: "Gloves", c: false }], exp: "Hats keep heads warm." }
              ],
              [
                { id: 1, prompt: "What yellow citrus fruit is famously very sour?", img: "🍋", opts: [{ l: "Lemon", c: true }, { l: "Strawberry", c: false }, { l: "Watermelon", c: false }], exp: "Lemons are sour." },
                { id: 2, prompt: "What do birds use to fly across the sky?", img: "🐦", opts: [{ l: "Feathered wings", c: true }, { l: "Wheels", c: false }, { l: "Fins", c: false }], exp: "Wings allow flight." },
                { id: 3, prompt: "Where do flowers grow planted in rich dirt?", img: "🌷", opts: [{ l: "In a garden bed or pot", c: true }, { l: "On a concrete highway", c: false }, { l: "In the kitchen sink", c: false }], exp: "Flowers need soil." },
                { id: 4, prompt: "What tool cuts paper in art class safely?", img: "✂️", opts: [{ l: "Safety scissors", c: true }, { l: "A hammer", c: false }, { l: "A saw", c: false }], exp: "Scissors cut paper." },
                { id: 5, prompt: "What bright yellow shape shines in the daytime sky?", img: "☀️", opts: [{ l: "The Sun", c: true }, { l: "A cloud", c: false }, { l: "A star", c: false }], exp: "The sun shines by day." }
              ],
              [
                { id: 1, prompt: "What sweet treat is made from frozen cream or milk?", img: "🍦", opts: [{ l: "Ice cream", c: true }, { l: "Soup", c: false }, { l: "Salad", c: false }], exp: "Ice cream is frozen sweet food." },
                { id: 2, prompt: "How many eyes do humans have on their face?", img: "👀", opts: [{ l: "Two", c: true }, { l: "One", c: false }, { l: "Four", c: false }], exp: "We have two eyes." },
                { id: 3, prompt: "What color are most healthy tree leaves in summer?", img: "🍃", opts: [{ l: "Green", c: true }, { l: "Pink", c: false }, { l: "Black", c: false }], exp: "Summer leaves are green." },
                { id: 4, prompt: "What toy blocks are stacked to build towers?", img: "🧱", opts: [{ l: "Building blocks", c: true }, { l: "Pillows", c: false }, { l: "Paper plates", c: false }], exp: "Blocks build towers." },
                { id: 5, prompt: "What drink comes from cows and helps build strong bones?", img: "🥛", opts: [{ l: "Milk", c: true }, { l: "Soda", c: false }, { l: "Paint", c: false }], exp: "Milk provides calcium." }
              ]
            ];
            poolData = pools[batchNum - 1];
          } else if (top === "Social Media") {
            const pools = [
              [
                { id: 1, prompt: "What should you say when someone gives you a gift?", img: "🎁", opts: [{ l: "Thank you!", c: true }, { l: "Go away", c: false }], exp: "Saying thank you shows gratitude." },
                { id: 2, prompt: "Is it polite to share toys with your friends?", img: "🤝", opts: [{ l: "Yes, sharing is kind", c: true }, { l: "No", c: false }], exp: "Sharing makes play fun." },
                { id: 3, prompt: "How do you greet a friend in the morning?", img: "👋", opts: [{ l: "Good morning!", c: true }, { l: "Goodnight", c: false }], exp: "Use good morning early." },
                { id: 4, prompt: "What should you do if a friend feels sad?", img: "💙", opts: [{ l: "Offer comfort or kind words", c: true }, { l: "Laugh at them", c: false }], exp: "Empathy helps." },
                { id: 5, prompt: "What magic word do you use when asking for a toy?", img: "✨", opts: [{ l: "Please", c: true }, { l: "Mine", c: false }], exp: "Please is polite." }
              ],
              [
                { id: 1, prompt: "When playing a game, is it good to wait your turn?", img: "⏳", opts: [{ l: "Yes, taking turns is fair", c: true }, { l: "No, grab everything", c: false }], explanation: "Turns ensure fairness." },
                { id: 2, prompt: "If you accidentally bump into someone, what should you say?", img: "🙇", opts: [{ l: "I am sorry / Excuse me", c: true }, { l: "Nothing", c: false }], explanation: "Apologizing is courteous." },
                { id: 3, prompt: "How can you show a friend you are listening when they talk?", img: "👂", opts: [{ l: "Look at them and nod quietly", c: true }, { l: "Cover your ears", c: false }], explanation: "Active listening builds trust." },
                { id: 4, prompt: "Is it kind to include new classmates in your games?", img: "🌟", opts: [{ l: "Yes, welcoming others is wonderful", c: true }, { l: "No, exclude them", c: false }], explanation: "Inclusivity makes friends." },
                { id: 5, prompt: "What should you do with a broken classroom crayon?", img: "🖍️", opts: [{ l: "Tell the teacher calmly", c: true }, { l: "Hide it", c: false }], explanation: "Communication solves mishaps." }
              ],
              [
                { id: 1, prompt: "How should you talk inside a quiet library?", img: "📚", opts: [{ l: "Use a soft quiet whisper", c: true }, { l: "Shout loudly", c: false }], explanation: "Quiet voices respect spaces." },
                { id: 2, prompt: "What should you do when a teacher is speaking to the class?", img: "👩‍🏫", opts: [{ l: "Listen attentively and stay quiet", c: true }, { l: "Talk over them", c: false }], explanation: "Listening shows respect." },
                { id: 3, prompt: "Is it good to smile and wave at neighbors?", img: "👋", opts: [{ l: "Yes, it spreads friendliness", c: true }, { l: "No", c: false }], explanation: "Smiling creates warmth." },
                { id: 4, prompt: "What should you do if a friend shares their snack with you?", img: "🍎", opts: [{ l: "Say thank you gratefully", c: true }, { l: "Take it without words", c: false }], explanation: "Gratitude is essential." },
                { id: 5, prompt: "How do you act when you win a friendly game?", img: "🏆", opts: [{ l: "Be humble and kind to others", c: true }, { l: "Brag loudly", c: false }], explanation: "Humility makes a good winner." }
              ],
              [
                { id: 1, prompt: "What is a great way to make a new friend at school?", img: "🤝", opts: [{ l: "Introduce yourself with a friendly smile", c: true }, { l: "Frown and look away", c: false }], explanation: "Introductions start friendships." },
                { id: 2, prompt: "If two friends are arguing over a toy, what can you suggest?", img: "🧩", opts: [{ l: "Take turns playing with it together", c: true }, { l: "Throw the toy away", c: false }], explanation: "Compromise resolves fights." },
                { id: 3, prompt: "How do you show appreciation when someone helps you tie your shoes?", img: "👟", opts: [{ l: "Say thank you for your help", c: true }, { l: "Walk away", c: false }], explanation: "Acknowledging help is polite." },
                { id: 4, prompt: "Is it polite to interrupt someone while they are speaking?", img: "🗣️", opts: [{ l: "No, wait until they finish", c: true }, { l: "Yes, speak over them", c: false }], explanation: "Patience matters in dialogue." },
                { id: 5, prompt: "What emotion does a warm hug convey?", img: "🫂", opts: [{ l: "Love, care, and comfort", c: true }, { l: "Anger", c: false }], explanation: "Hugs express affection." }
              ],
              [
                { id: 1, prompt: "What should you do after playing with your building blocks?", img: "📦", opts: [{ l: "Clean up and put them back in the box", c: true }, { l: "Leave them on the floor", c: false }], explanation: "Cleaning up shows responsibility." },
                { id: 2, prompt: "How do you ask someone if you can join their game?", img: "🎮", opts: [{ l: "May I please play with you?", c: true }, { l: "Give me your game", c: false }], explanation: "Polite asking builds rapport." },
                { id: 3, prompt: "What should you say when someone says 'Good morning' to you?", img: "☀️", opts: [{ l: "Good morning to you too!", c: true }, { l: "Silence", c: false }], explanation: "Returning greetings is polite." },
                { id: 4, prompt: "Is it important to cheer for your classmates during sports day?", img: "🏅", opts: [{ l: "Yes, encouragement builds team spirit", c: true }, { l: "No", c: false }], explanation: "Cheering supports peers." },
                { id: 5, prompt: "What does it mean to be a good helper at home?", img: "🧹", opts: [{ l: "Assisting family members with small tasks", c: true }, { l: "Making more messes", c: false }], explanation: "Helping builds teamwork." }
              ]
            ];
            poolData = pools[batchNum - 1];
          } else {
            const pools = [
              [
                { id: 1, prompt: "How many sides does a triangle have?", img: "🔺", opts: [{ l: "3 sides", c: true }, { l: "4 sides", c: false }], exp: "Triangles have 3 sides." },
                { id: 2, prompt: "What number comes after 2 when counting?", img: "🔢", opts: [{ l: "3", c: true }, { l: "5", c: false }], exp: "Counting order is 1, 2, 3." },
                { id: 3, prompt: "What is the opposite of big?", img: "🐘", opts: [{ l: "Small", c: true }, { l: "Huge", c: false }], exp: "Small is opposite." },
                { id: 4, prompt: "What color do you get when mixing blue and yellow?", img: "🎨", opts: [{ l: "Green", c: true }, { l: "Red", c: false }], exp: "Blue + yellow = green." },
                { id: 5, prompt: "How many fingers are on one human hand?", img: "✋", opts: [{ l: "5 fingers", c: true }, { l: "2 fingers", c: false }], exp: "Each hand has 5." }
              ],
              [
                { id: 1, prompt: "What shape has four equal straight sides and square corners?", img: "⬛", opts: [{ l: "Square", c: true }, { l: "Circle", c: false }], exp: "Squares have 4 equal sides." },
                { id: 2, prompt: "What number comes right before the number 10?", img: "🔢", opts: [{ l: "9", c: true }, { l: "8", c: false }], exp: "Counting: 8, 9, 10." },
                { id: 3, prompt: "What is the opposite of hot soup?", img: "🧊", opts: [{ l: "Cold / Freezing", c: true }, { l: "Boiling", c: false }], exp: "Cold is opposite to hot." },
                { id: 4, prompt: "How many days are in a single full week?", img: "📅", opts: [{ l: "7 days", c: true }, { l: "5 days", c: false }], exp: "There are 7 days in a week." },
                { id: 5, prompt: "What shape looks like a curved ring with no corners?", img: "⭕", opts: [{ l: "Circle", c: true }, { l: "Triangle", c: false }], exp: "Circles are round." }
              ],
              [
                { id: 1, prompt: "If you have 2 apples and get 1 more, how many do you have?", img: "🍎", opts: [{ l: "3 apples", c: true }, { l: "1 apple", c: false }], exp: "2 plus 1 equals 3." },
                { id: 2, prompt: "What geometric shape has 4 sides where opposite sides are equal?", img: "▭", opts: [{ l: "Rectangle", c: true }, { l: "Circle", c: false }], exp: "Rectangles have paired sides." },
                { id: 3, prompt: "What is the opposite of fast running?", img: "🐢", opts: [{ l: "Slow", c: true }, { l: "Quick", c: false }], exp: "Slow is opposite to fast." },
                { id: 4, prompt: "Which number is larger: 8 or 3?", img: "🔢", opts: [{ l: "8", c: true }, { l: "3", c: false }], exp: "8 is greater than 3." },
                { id: 5, prompt: "What color do you get when mixing red and white?", img: "🎨", opts: [{ l: "Pink", c: true }, { l: "Black", c: false }], exp: "Red and white make pink." }
              ],
              [
                { id: 1, prompt: "How many months are in a standard calendar year?", img: "📅", opts: [{ l: "12 months", c: true }, { l: "10 months", c: false }], exp: "A year has 12 months." },
                { id: 2, prompt: "What shape has five pointy star-like corners?", img: "⭐", opts: [{ l: "Star", c: true }, { l: "Square", c: false }], exp: "Stars have points." },
                { id: 3, prompt: "What is the opposite of heavy rocks?", img: "🪶", opts: [{ l: "Light (like a feather)", c: true }, { l: "Massive", c: false }], exp: "Light is opposite to heavy." },
                { id: 4, prompt: "If you count backwards from 3, what comes after 3 and 2?", img: "🔢", opts: [{ l: "1", c: true }, { l: "5", c: false }], exp: "Countdown: 3, 2, 1." },
                { id: 5, prompt: "What shape resembles a stretched circle like an egg?", img: "🥚", opts: [{ l: "Oval", c: true }, { l: "Square", c: false }], exp: "Eggs are oval-shaped." }
              ],
              [
                { id: 1, prompt: "If you have 5 balloons and 2 fly away, how many are left?", img: "🎈", opts: [{ l: "3 balloons", c: true }, { l: "5 balloons", c: false }], exp: "5 minus 2 equals 3." },
                { id: 2, prompt: "What do we call a 3D shape like a basketball or globe?", img: "🌍", opts: [{ l: "Sphere", c: true }, { l: "Square", c: false }], exp: "Globes are spheres." },
                { id: 3, prompt: "What is the opposite of day time?", img: "🌙", opts: [{ l: "Night time", c: true }, { l: "Afternoon", c: false }], exp: "Night is opposite to day." },
                { id: 4, prompt: "Which number is smaller: 2 or 9?", img: "🔢", opts: [{ l: "2", c: true }, { l: "9", c: false }], exp: "2 is smaller than 9." },
                { id: 5, prompt: "What color results from mixing blue and red?", img: "🎨", opts: [{ l: "Purple", c: true }, { l: "Orange", c: false }], exp: "Blue and red make purple." }
              ]
            ];
            poolData = pools[batchNum - 1];
          }
        } 
        // 3. JUNIOR HIGH
        else if (selectedLevel === "Junior High") {
          if (top === "Daily Life") {
            const pools = [
              [
                { id: 1, prompt: "What does 'platform' mean at a train station?", img: "🚆", opts: [{ l: "The boarding area beside tracks", c: true }, { l: "Ticket price", c: false }], exp: "Platform area." },
                { id: 2, prompt: "Choose correct preposition: 'Turn left ___ the traffic light.'", img: "🚦", opts: [{ l: "at", c: true }, { l: "on", c: false }], exp: "Use 'at'." },
                { id: 3, prompt: "Benefit of regular cardio exercise?", img: "🏃‍♂️", opts: [{ l: "Improving heart endurance", c: true }, { l: "Weakening", c: false }], exp: "Cardio heart." },
                { id: 4, prompt: "How to politely ask for train departure time?", img: "🎫", opts: [{ l: "Could you please tell me when it departs?", c: true }, { l: "Give me time.", c: false }], exp: "Polite modals." },
                { id: 5, prompt: "What is luggage allowance?", img: "🧳", opts: [{ l: "Max weight/size for bags", c: true }, { l: "Free snacks", c: false }], exp: "Baggage limits." }
              ],
              [
                { id: 1, prompt: "When booking a hotel room, what does 'half-board' usually include?", img: "🏨", opts: [{ l: "Breakfast and dinner", c: true }, { l: "Only room key", c: false }], explanation: "Half board meals." },
                { id: 2, prompt: "What document is legally required when traveling internationally across borders?", img: "🛂", opts: [{ l: "A valid passport", c: true }, { l: "A library card", c: false }], explanation: "Passports verify citizenship." },
                { id: 3, prompt: "What currency is officially used across most countries in the European Union?", img: "💶", opts: [{ l: "The Euro (€)", c: true }, { l: "The Dollar ($)", c: false }], explanation: "Euro is EU currency." },
                { id: 4, prompt: "What is jet lag experienced after long-haul flights?", img: "✈️", opts: [{ l: "Fatigue from crossing multiple time zones", c: true }, { l: "Fear of heights", c: false }], explanation: "Time zone disruption." },
                { id: 5, prompt: "What term describes a vacation where all food and drinks are included?", img: "🍹", opts: [{ l: "All-inclusive resort package", c: true }, { l: "Backpacking hostel", c: false }], explanation: "All-inclusive deals." }
              ],
              [
                { id: 1, prompt: "What public transit vehicle runs on metal tracks embedded in city streets?", img: "🚊", opts: [{ l: "A tram or streetcar", c: true }, { l: "A helicopter", c: false }], explanation: "Trams run on streets." },
                { id: 2, prompt: "What should you check first when reading a city transit map?", img: "🗺️", opts: [{ l: "The legend and color-coded subway lines", c: true }, { l: "The publisher name", c: false }], explanation: "Legends explain maps." },
                { id: 3, prompt: "What is currency exchange when traveling abroad?", img: "💱", opts: [{ l: "Trading your home money for local foreign cash", c: true }, { l: "Buying souvenirs", c: false }], explanation: "Currency swapping." },
                { id: 4, prompt: "What traveler accommodation is typically budget-friendly with shared dorms?", img: "🛏️", opts: [{ l: "A youth hostel", c: true }, { l: "A luxury penthouse", c: false }], explanation: "Hostels save money." },
                { id: 5, prompt: "What phrase means 'to check in' at an airline desk?", img: "🛄", opts: [{ l: "To register your flight and drop off luggage", c: true }, { l: "To board the plane", c: false }], explanation: "Check-in procedure." }
              ],
              [
                { id: 1, prompt: "What is a window seat preference on an airplane?", img: "🪟", opts: [{ l: "Sitting next to the cabin window", c: true }, { l: "Sitting in the aisle", c: false }], explanation: "Window view seat." },
                { id: 2, prompt: "What official card do you swipe to ride public city subways?", img: "💳", opts: [{ l: "A transit smart card / pass", c: true }, { l: "A credit card for groceries", c: false }], explanation: "Transit passes." },
                { id: 3, prompt: "What is carry-on luggage?", img: "🧳", opts: [{ l: "Bags you bring inside the plane cabin with you", c: true }, { l: "Checked large suitcases", c: false }], explanation: "Cabin luggage." },
                { id: 4, prompt: "What does 'boarding pass' mean?", img: "🎫", opts: [{ l: "The ticket allowing you to enter the aircraft", c: true }, { l: "Hotel key card", c: false }], explanation: "Boarding ticket." },
                { id: 5, prompt: "What emergency equipment is reviewed before flight takeoff?", img: "🦺", opts: [{ l: "Life vests and oxygen masks", c: true }, { l: "Movie projector", c: false }], explanation: "Safety briefing." }
              ],
              [
                { id: 1, prompt: "What is an itinerary when planning a vacation?", img: "🗓️", opts: [{ l: "A detailed schedule of planned travel activities", c: true }, { l: "A hotel bill", c: false }], explanation: "Travel schedule." },
                { id: 2, prompt: "What does customs inspection at an airport check for?", img: "🛃", opts: [{ l: "Regulated goods, food, and declaration items", c: true }, { l: "Your clothing style", c: false }], explanation: "Customs rules." },
                { id: 3, prompt: "What is a round-trip flight ticket?", img: "🔄", opts: [{ l: "A ticket for going to a destination and returning back", c: true }, { l: "One-way ticket", c: false }], explanation: "Round trip return." },
                { id: 4, prompt: "What is tourism?", img: "📸", opts: [{ l: "Traveling for recreation, leisure, and sightseeing", c: true }, { l: "Moving house", c: false }], explanation: "Leisure travel." },
                { id: 5, prompt: "What is a travel guidebook used for?", img: "📖", opts: [{ l: "Finding tourist attractions, restaurants, and tips", c: true }, { l: "Cooking dinner", c: false }], explanation: "Guidebook tips." }
              ]
            ];
            poolData = pools[batchNum - 1];
          } else if (top === "Social Media") {
            const pools = [
              [
                { id: 1, prompt: "What does 'DIY' stand for?", img: "🛠️", opts: [{ l: "Do It Yourself", c: true }, { l: "Do It Yesterday", c: false }], exp: "DIY means self-made." },
                { id: 2, prompt: "Why is 2FA important?", img: "🔐", opts: [{ l: "Extra security layer", c: true }, { l: "Deletes account", c: false }], exp: "Security." },
                { id: 3, prompt: "What is a digital footprint?", img: "👣", opts: [{ l: "Data trail left online", c: true }, { l: "Mud prints", c: false }], exp: "Data record." },
                { id: 4, prompt: "How to respond to inflammatory comments?", img: "🛡️", opts: [{ l: "Ignore or report", c: true }, { l: "Insult back", c: false }], exp: "Moderation." },
                { id: 5, prompt: "What does 'TL;DR' mean?", img: "📖", opts: [{ l: "Too Long; Didn't Read", c: true }, { l: "Delete", c: false }], exp: "Summary." }
              ],
              [
                { id: 1, prompt: "What is phishing?", img: "🎣", opts: [{ l: "Fraudulent emails stealing credentials", c: true }, { l: "Catching fish", c: false }], explanation: "Scam tactic." },
                { id: 2, prompt: "What is an influencer on social media?", img: "⭐", opts: [{ l: "A user with a large following who promotes brands", c: true }, { l: "A computer virus", c: false }], explanation: "Brand promoter." },
                { id: 3, prompt: "What does a hashtag (#) do on posts?", img: "#️⃣", opts: [{ l: "Categorizes content for discoverability", c: true }, { l: "Deletes the post", c: false }], explanation: "Tagging system." },
                { id: 4, prompt: "What is viral content?", img: "📈", opts: [{ l: "Media that spreads rapidly across the internet", c: true }, { l: "Computer sickness", c: false }], explanation: "Rapid sharing." },
                { id: 5, prompt: "Why should you check source credibility before sharing news?", img: "📰", opts: [{ l: "To prevent spreading fake misinformation", c: true }, { l: "To look cool", c: false }], explanation: "Truth check." }
              ],
              [
                { id: 1, prompt: "What is a meme?", img: "🖼️", opts: [{ l: "Humorous image or video copied and spread online", c: true }, { l: "A legal document", c: false }], explanation: "Viral humor." },
                { id: 2, prompt: "What does 'blocking' a user accomplish?", img: "🚫", opts: [{ l: "Prevents them from viewing your profile or contacting you", c: true }, { l: "Deletes their account", c: false }], explanation: "User restriction." },
                { id: 3, prompt: "What is livestreaming?", img: "🔴", opts: [{ l: "Broadcasting video footage in real time", c: true }, { l: "Mailing letters", c: false }], explanation: "Real-time broadcast." },
                { id: 4, prompt: "What are algorithmic feeds?", img: "🤖", opts: [{ l: "Content automatically curated based on user behavior", c: true }, { l: "Random text", c: false }], explanation: "Curated feeds." },
                { id: 5, prompt: "What is catfishing?", img: "🎭", opts: [{ l: "Creating a fake online identity to deceive others", c: true }, { l: "Fishing in lakes", c: false }], explanation: "Deceptive identity." }
              ],
              [
                { id: 1, prompt: "What is an algorithm in social media platforms?", img: "⚙️", opts: [{ l: "Code determining what posts appear on your feed", c: true }, { l: "A physical machine", c: false }], explanation: "Ranking code." },
                { id: 2, prompt: "What does 'trending' mean?", img: "🔥", opts: [{ l: "Topics currently generating the highest engagement", c: true }, { l: "Weather forecasts", c: false }], explanation: "High popularity." },
                { id: 3, prompt: "What is netiquette?", img: "💻", opts: [{ l: "Proper polite manners when communicating online", c: true }, { l: "Internet cables", c: false }], explanation: "Online etiquette." },
                { id: 4, prompt: "What is clickbait?", img: "🎣", opts: [{ l: "Sensationalized headlines designed to entice clicks", c: true }, { l: "A fishing lure", c: false }], explanation: "Deceptive titles." },
                { id: 5, prompt: "What is geotagging?", img: "📍", opts: [{ l: "Adding geographical metadata to media posts", c: true }, { l: "Mapping stars", c: false }], explanation: "Location tags." }
              ],
              [
                { id: 1, prompt: "What is user-generated content (UGC)?", img: "🤳", opts: [{ l: "Content created and published by everyday users", c: true }, { l: "Hollywood movies", c: false }], explanation: "User created." },
                { id: 2, prompt: "What is a troll in online comment sections?", img: "🧌", opts: [{ l: "Someone who intentionally provokes anger or disruption", c: true }, { l: "A fantasy character", c: false }], explanation: "Provocateur." },
                { id: 3, prompt: "What is account verification (blue checkmark)?", img: "✔️", opts: [{ l: "Confirmation of a prominent user's authentic identity", c: true }, { l: "A paid coupon", c: false }], explanation: "Identity badge." },
                { id: 4, prompt: "What is social media detox?", img: "🌿", opts: [{ l: "Temporarily abstaining from social platforms", c: true }, { l: "Cleaning a phone screen", c: false }], explanation: "Digital break." },
                { id: 5, prompt: "What is a direct message (DM)?", img: "💬", opts: [{ l: "Private communication between two users", c: true }, { l: "A public billboard", c: false }], explanation: "Private chat." }
              ]
            ];
            poolData = pools[batchNum - 1];
          } else if (top === "Job Interviews") {
            const pools = [
              [
                { id: 1, prompt: "What does 'punctual' mean?", img: "⏰", opts: [{ l: "Arriving on time", c: true }, { l: "Late", c: false }], exp: "On time." },
                { id: 2, prompt: "How should you greet an interviewer?", img: "🤝", opts: [{ l: "Eye contact and firm handshake", c: true }, { l: "Ignore", c: false }], exp: "First impression." },
                { id: 3, prompt: "Purpose of student resume?", img: "📄", opts: [{ l: "Summarize skills and education", c: true }, { l: "Poetry", c: false }], exp: "Qualifications." },
                { id: 4, prompt: "Why ask about strengths?", img: "💪", opts: [{ l: "Understand value contribution", c: true }, { l: "Trick", c: false }], exp: "Candidate fit." },
                { id: 5, prompt: "Great question to ask at the end?", img: "❓", opts: [{ l: "What does a typical workday look like?", c: true }, { l: "Can I sleep here?", c: false }], exp: "Curiosity." }
              ],
              [
                { id: 1, prompt: "What is a STAR method response in behavioral interviews?", img: "⭐", opts: [{ l: "Situation, Task, Action, Result framework", c: true }, { l: "Singing a song", c: false }], explanation: "Behavioral framework." },
                { id: 2, prompt: "How should you research a company before an interview?", img: "🔍", opts: [{ l: "Review their website, mission, and recent news", c: true }, { l: "Guess what they do", c: false }], explanation: "Company research." },
                { id: 3, prompt: "What is business professional dress code?", img: "👔", opts: [{ l: "Suits, tailored blazers, and formal wear", c: true }, { l: "Pajamas and slippers", c: false }], explanation: "Formal attire." },
                { id: 4, prompt: "How should you answer 'What is your greatest weakness?'", img: "💡", opts: [{ l: "Mention a real flaw and how you actively improve it", c: true }, { l: "Claim you have zero flaws", c: false }], explanation: "Self-improvement." },
                { id: 5, prompt: "What is the purpose of a follow-up email after an interview?", img: "📧", opts: [{ l: "Express gratitude and reiterate interest", c: true }, { l: "Demand an immediate hiring decision", c: false }], explanation: "Polite follow-up." }
              ],
              [
                { id: 1, prompt: "What are soft skills?", img: "🤝", opts: [{ l: "Interpersonal communication and teamwork abilities", c: true }, { l: "Coding syntax knowledge", c: false }], explanation: "Interpersonal skills." },
                { id: 2, prompt: "What are hard skills?", img: "💻", opts: [{ l: "Technical proficiencies and specialized training", c: true }, { l: "Being polite", c: false }], explanation: "Technical skills." },
                { id: 3, prompt: "How early should you arrive for an in-person interview?", img: "⏰", opts: [{ l: "10 to 15 minutes early", c: true }, { l: "2 hours late", c: false }], explanation: "Arrival timing." },
                { id: 4, prompt: "What should you bring to an interview?", img: "📁", opts: [{ l: "Multiple printed copies of your resume and a pen", c: true }, { l: "Nothing at all", c: false }], explanation: "Preparedness." },
                { id: 5, prompt: "How should you handle an interview question you do not know?", img: "🤔", opts: [{ l: "Stay calm, admit it gracefully, and show willingness to learn", c: true }, { l: "Panic and walk out", c: false }], explanation: "Graceful honesty." }
              ],
              [
                { id: 1, prompt: "What is a panel interview?", img: "👥", opts: [{ l: "An interview with multiple hiring managers simultaneously", c: true }, { l: "An online computer test", c: false }], explanation: "Multiple interviewers." },
                { id: 2, prompt: "Why do interviewers ask 'Tell me about yourself'?", img: "🗣️", opts: [{ l: "To hear a professional summary of your career journey", c: true }, { l: "To hear your life story from birth", c: false }], explanation: "Professional pitch." },
                { id: 3, prompt: "What is body language importance in interviews?", img: "🧍", opts: [{ l: "Posture, eye contact, and nodding convey confidence", c: true }, { l: "Slumping conveys energy", c: false }], explanation: "Confident posture." },
                { id: 4, prompt: "What is a probation period in a new job?", img: "⏳", opts: [{ l: "An initial trial evaluation period", c: true }, { l: "Permanent paid vacation", c: false }], explanation: "Trial period." },
                { id: 5, prompt: "How should you speak about past employers or managers?", img: "💬", opts: [{ l: "Professionally and respectfully, avoiding negativity", c: true }, { l: "Insulting them harshly", c: false }], explanation: "Professional tact." }
              ],
              [
                { id: 1, prompt: "What is a salary negotiation?", img: "💰", opts: [{ l: "Discussing compensation and benefits professionally", c: true }, { l: "Demanding double money rudely", c: false }], explanation: "Compensation talk." },
                { id: 2, prompt: "What does 'cultural fit' mean in hiring?", img: "🌐", opts: [{ l: "Alignment with company values and team ethos", c: true }, { l: "Wearing the same shoes", c: false }], explanation: "Value alignment." },
                { id: 3, prompt: "What is a group interview used for?", img: "🧑‍🤝‍🧑", opts: [{ l: "To assess teamwork and collaboration under observation", c: true }, { l: "To throw a party", c: false }], explanation: "Team assessment." },
                { id: 4, prompt: "What is an applicant tracking system (ATS)?", img: "💻", opts: [{ l: "Software used by companies to screen resumes automatically", c: true }, { l: "A GPS map for candidates", c: false }], explanation: "Resume scanner." },
                { id: 5, prompt: "What is constructive feedback after a rejected interview?", img: "📈", opts: [{ l: "Valuable insights to improve future interview performance", c: true }, { l: "An insult to ignore", c: false }], explanation: "Growth feedback." }
              ]
            ];
            poolData = pools[batchNum - 1];
          } else {
            const pools = [
              [
                { id: 1, prompt: "Why include a bibliography?", img: "📑", opts: [{ l: "Avoid plagiarism and credit sources", c: true }, { l: "Make paper heavier", c: false }], exp: "Academic integrity." },
                { id: 2, prompt: "What does a dictionary provide?", img: "📖", opts: [{ l: "Pronunciations and definitions", c: true }, { l: "Weather", c: false }], exp: "Lexicon." },
                { id: 3, prompt: "First step of scientific method?", img: "🔬", opts: [{ l: "Observation and question", c: true }, { l: "Conclusion", c: false }], exp: "Inquiry." },
                { id: 4, prompt: "What is a hypothesis?", img: "💡", opts: [{ l: "Testable proposed explanation", c: true }, { l: "Proven law", c: false }], exp: "Testable idea." },
                { id: 5, prompt: "What does an atlas contain?", img: "🗺️", opts: [{ l: "Geopolitical and physical maps", c: true }, { l: "Recipes", c: false }], explanation: "Geography maps." }
              ],
              [
                { id: 1, prompt: "What is peer review in academic publishing?", img: "👥", opts: [{ l: "Evaluation of research by independent expert scholars", c: true }, { l: "Checking grammar with spellcheck", c: false }], explanation: "Expert vetting." },
                { id: 2, prompt: "What is a primary research source?", img: "📜", opts: [{ l: "Original firsthand data or historical documents", c: true }, { l: "A textbook summary", c: false }], explanation: "Firsthand data." },
                { id: 3, prompt: "What is qualitative research?", img: "📊", opts: [{ l: "Focusing on descriptive data, interviews, and observations", c: true }, { l: "Counting numerical statistics only", c: false }], explanation: "Descriptive study." },
                { id: 4, prompt: "What is quantitative research?", img: "📈", opts: [{ l: "Analyzing numerical data using statistical methods", c: true }, { l: "Writing poetry", c: false }], explanation: "Numerical data." },
                { id: 5, prompt: "What is an abstract in a research paper?", img: "📄", opts: [{ l: "A concise summary of the entire study's findings", c: true }, { l: "The back cover", c: false }], explanation: "Summary abstract." }
              ],
              [
                { id: 1, prompt: "What is plagiarism?", img: "⚠️", opts: [{ l: "Using someone else's work without proper citation", c: true }, { l: "Writing original essays", c: false }], explanation: "Academic theft." },
                { id: 2, prompt: "What is a control group in scientific experiments?", img: "🧪", opts: [{ l: "The baseline group kept unchanged for comparison", c: true }, { l: "The group receiving experimental treatment", c: false }], explanation: "Experimental baseline." },
                { id: 3, prompt: "What is an empirical study?", img: "🔬", opts: [{ l: "Research based on direct observation and experimentation", c: true }, { l: "Pure theoretical philosophy", c: false }], explanation: "Observational science." },
                { id: 4, prompt: "What is a thesis statement in academic writing?", img: "🏛️", opts: [{ l: "The core central argument driving the entire paper", c: true }, { l: "A random concluding sentence", c: false }], explanation: "Central argument." },
                { id: 5, prompt: "What is academic integrity?", img: "⭐", opts: [{ l: "Honesty and ethical standards in scholarship", c: true }, { l: "Getting 100% grades", c: false }], explanation: "Ethical scholarship." }
              ],
              [
                { id: 1, prompt: "What is a literature review?", img: "📚", opts: [{ l: "A comprehensive survey of prior research on a topic", c: true }, { l: "A fictional novel", c: false }], explanation: "Research survey." },
                { id: 2, prompt: "What is deductive reasoning?", img: "🧠", opts: [{ l: "Applying general principles to reach a specific conclusion", c: true }, { l: "Guessing randomly", c: false }], explanation: "General to specific." },
                { id: 3, prompt: "What is inductive reasoning?", img: "💡", opts: [{ l: "Deriving general theories from specific observations", c: true }, { l: "Memorizing facts", c: false }], explanation: "Specific to general." },
                { id: 4, prompt: "What is a methodological framework?", img: "⚙️", opts: [{ l: "The structured system of methods used in a study", c: true }, { l: "A computer hardware diagram", c: false }], explanation: "Method system." },
                { id: 5, prompt: "What is citation formatting (APA / MLA)?", img: "📝", opts: [{ l: "Standardized rules for acknowledging reference sources", c: true }, { l: "Font styling choices", c: false }], explanation: "Reference standards." }
              ],
              [
                { id: 1, prompt: "What is an independent variable in experiments?", img: "🔬", opts: [{ l: "The variable manipulated or changed by the researcher", c: true }, { l: "The measured outcome", c: false }], explanation: "Manipulated variable." },
                { id: 2, prompt: "What is a dependent variable?", img: "📈", opts: [{ l: "The outcome measured and affected during the experiment", c: true }, { l: "The researcher", c: false }], explanation: "Measured outcome." },
                { id: 3, prompt: "What is peer debriefing in qualitative research?", img: "👥", opts: [{ l: "Discussing findings with fellow researchers to ensure validity", c: true }, { l: "Arguing in class", c: false }], explanation: "Validity check." },
                { id: 4, prompt: "What is scholarly citation?", img: "🔖", opts: [{ l: "Giving credit to authors within academic texts", c: true }, { l: "Writing footnotes for fun", c: false }], explanation: "Author credit." },
                { id: 5, prompt: "What is academic publishing?", img: "📰", opts: [{ l: "Releasing peer-reviewed research in professional journals", c: true }, { l: "Posting on TikTok", c: false }], explanation: "Journal release." }
              ]
            ];
            poolData = pools[batchNum - 1];
          }
        } 
        // 4. SENIOR HIGH
        else if (selectedLevel === "Senior High") {
          if (top === "Daily Life") {
            const pools = [
              [
                { id: 1, prompt: "What does the 50/30/20 budget rule allocate?", img: "📊", opts: [{ l: "50% Needs, 30% Wants, 20% Savings", c: true }, { l: "50% Savings, 50% Rent", c: false }], exp: "Budgeting rule." },
                { id: 2, prompt: "What does APR stand for?", img: "💳", opts: [{ l: "Annual Percentage Rate", c: true }, { l: "Advanced Payment Ratio", c: false }], exp: "Loan cost." },
                { id: 3, prompt: "Why have an emergency fund?", img: "🏠", opts: [{ l: "Cover unexpected expenses", c: true }, { l: "Vacations", c: false }], exp: "Safety net." },
                { id: 4, prompt: "What is a refundable security deposit?", img: "🔑", opts: [{ l: "Cover property damage", c: true }, { l: "Landlord salary", c: false }], exp: "Lease protection." },
                { id: 5, prompt: "What does compounding interest mean?", img: "📈", opts: [{ l: "Interest on principal and accumulated interest", c: true }, { l: "Fees", c: false }], exp: "Growth." }
              ],
              [
                { id: 1, prompt: "What is credit score health determined by?", img: "💳", opts: [{ l: "Payment history, credit utilization, and history length", c: true }, { l: "Your shoe size", c: false }], explanation: "Credit factors." },
                { id: 2, prompt: "What is inflation in economics?", img: "📉", opts: [{ l: "The general increase in prices over time", c: true }, { l: "Money freezing in value", c: false }], explanation: "Price rise." },
                { id: 3, prompt: "What is renter's insurance designed to protect?", img: "🛡️", opts: [{ l: "Personal belongings and liability inside a rented apartment", c: true }, { l: "The landlord's roof", c: false }], explanation: "Tenant protection." },
                { id: 4, prompt: "What is a fixed-rate loan versus a variable-rate loan?", img: "💰", opts: [{ l: "Fixed interest remains constant; variable can fluctuate", c: true }, { l: "Both never change", c: false }], explanation: "Interest structures." },
                { id: 5, prompt: "What is diversification in personal investing?", img: "📊", opts: [{ l: "Spreading investments across assets to reduce risk", c: true }, { l: "Putting all money in one stock", c: false }], explanation: "Risk reduction." }
              ],
              [
                { id: 1, prompt: "What is gross income versus net income?", img: "💵", opts: [{ l: "Gross is total earnings; net is take-home pay after taxes", c: true }, { l: "Net is higher than gross", c: false }], explanation: "Income types." },
                { id: 2, prompt: "What is a student loan grace period?", img: "⏳", opts: [{ l: "Time after graduation before loan repayment begins", c: true }, { l: "Free money granted forever", c: false }], explanation: "Repayment delay." },
                { id: 3, prompt: "What is net worth?", img: "💎", opts: [{ l: "Total assets minus total liabilities/debt", c: true }, { l: "Total debt alone", c: false }], explanation: "Financial worth." },
                { id: 4, prompt: "What is an index fund in investing?", img: "📈", opts: [{ l: "A mutual fund tracking a broad market index", c: true }, { l: "A lottery ticket", c: false }], explanation: "Market tracking." },
                { id: 5, prompt: "What is a debit card directly linked to?", img: "💳", opts: [{ l: "Your checking account funds", c: true }, { l: "Infinite bank credit", c: false }], explanation: "Checking funds." }
              ],
              [
                { id: 1, prompt: "What is consumer credit utilization ratio?", img: "📊", opts: [{ l: "Amount of credit used compared to total credit limit", c: true }, { l: "Your weekly grocery bill", c: false }], explanation: "Credit usage." },
                { id: 2, prompt: "What is a lease agreement for an apartment?", img: "📜", opts: [{ l: "A legally binding rental contract", c: true }, { l: "A casual friendly promise", c: false }], explanation: "Rental contract." },
                { id: 3, prompt: "What is term life insurance?", img: "🛡️", opts: [{ l: "Coverage providing a death benefit for a specific time period", c: true }, { l: "Savings account", c: false }], explanation: "Timed insurance." },
                { id: 4, prompt: "What is a W-2 tax form in employment?", img: "🧾", opts: [{ l: "Form reporting annual employee wages and taxes withheld", c: true }, { l: "A grocery receipt", c: false }], explanation: "Tax reporting." },
                { id: 5, prompt: "What is asset depreciation?", img: "🚗", opts: [{ l: "The reduction in value of an asset over time", c: true }, { l: "Asset value doubling", c: false }], explanation: "Value loss." }
              ],
              [
                { id: 1, prompt: "What is bankruptcy in legal finance?", img: "⚖️", opts: [{ l: "A legal proceeding for individuals unable to pay debts", c: true }, { l: "Winning the lottery", c: false }], explanation: "Debt relief." },
                { id: 2, prompt: "What is a fiduciary financial advisor?", img: "🤝", opts: [{ l: "An advisor legally bound to act in your best financial interest", c: true }, { l: "A stock salesperson", c: false }], explanation: "Fiduciary duty." },
                { id: 3, prompt: "What is equity in homeownership?", img: "🏡", opts: [{ l: "The market value of a home minus remaining mortgage debt", c: true }, { l: "Monthly electric bills", c: false }], explanation: "Home equity." },
                { id: 4, prompt: "What is liquidity in finance?", img: "💧", opts: [{ l: "How quickly an asset can be converted into cash", c: true }, { l: "Water bill payments", c: false }], explanation: "Cash conversion." },
                { id: 5, prompt: "What is a municipal bond?", img: "🏛️", opts: [{ l: "Debt security issued by local governments", c: true }, { l: "Private company stock", c: false }], explanation: "Government bond." }
              ]
            ];
            poolData = pools[batchNum - 1];
          } else if (top === "Social Media") {
            const pools = [
              [
                { id: 1, prompt: "How do recruiters view public social feeds?", img: "🎓", opts: [{ l: "As professional digital footprint", c: true }, { l: "Ignore", c: false }], exp: "Footprint." },
                { id: 2, prompt: "What is phishing?", img: "🎣", opts: [{ l: "Deceptive credential theft", c: true }, { l: "Game", c: false }], exp: "Scam." },
                { id: 3, prompt: "What does open-source permit?", img: "💻", opts: [{ l: "Collaborative code modification", c: true }, { l: "Stealing", c: false }], exp: "Open code." },
                { id: 4, prompt: "Why audit privacy settings?", img: "🛡️", opts: [{ l: "Control data access", c: true }, { l: "Slow phone", c: false }], exp: "Privacy." },
                { id: 5, prompt: "Strong cryptographic password?", img: "🔑", opts: [{ l: "High entropy symbols and numbers", c: true }, { l: "Birthday", c: false }], exp: "Entropy." }
              ],
              [
                { id: 1, prompt: "What is a deepfake video?", img: "🤖", opts: [{ l: "AI-generated synthetic media impersonating people", c: true }, { l: "An underwater documentary", c: false }], explanation: "AI synthetic media." },
                { id: 2, prompt: "What is malware?", img: "🦠", opts: [{ l: "Malicious software designed to damage computer systems", c: true }, { l: "Helpful antivirus", c: false }], explanation: "Harmful software." },
                { id: 3, prompt: "What is ransomware?", img: "🔒", opts: [{ l: "Malware encrypting files demanding payment for release", c: true }, { l: "Free backup software", c: false }], explanation: "Extortion software." },
                { id: 4, prompt: "What is a cookie in web browsing?", img: "🍪", opts: [{ l: "Data files stored by browsers tracking user preferences", c: true }, { l: "Baked snacks", c: false }], explanation: "Browser tracking." },
                { id: 5, prompt: "What is end-to-end encryption?", img: "🔐", opts: [{ l: "Secure communication where only communicating users read messages", c: true }, { l: "Public broadcasting", c: false }], explanation: "Secure messaging." }
              ],
              [
                { id: 1, prompt: "What is intellectual property (IP)?", img: "💡", opts: [{ l: "Creations of the mind protected by copyright or patents", c: true }, { l: "Physical real estate", c: false }], explanation: "Legal creations." },
                { id: 2, prompt: "What is copyright infringement?", img: "⚖️", opts: [{ l: "Unauthorized use of copyrighted material", c: true }, { l: "Buying official books", c: false }], explanation: "Unauthorized use." },
                { id: 3, prompt: "What is a virtual private network (VPN)?", img: "🌐", opts: [{ l: "A service encrypting internet traffic and masking IP addresses", c: true }, { l: "A computer monitor", c: false }], explanation: "Encrypted tunnel." },
                { id: 4, prompt: "What is cyber espionage?", img: "🕵️‍♂️", opts: [{ l: "Using cyberattacks to gain secret state or corporate intelligence", c: true }, { l: "Online gaming tournaments", c: false }], explanation: "Digital spying." },
                { id: 5, prompt: "What is social engineering in cybersecurity?", img: "🎭", opts: [{ l: "Manipulating people into divulging confidential information", c: true }, { l: "Building social apps", c: false }], explanation: "Human manipulation." }
              ],
              [
                { id: 1, prompt: "What is a zero-day vulnerability?", img: "🚨", opts: [{ l: "An unknown software flaw exploited before developers patch it", c: true }, { l: "A brand new computer", c: false }], explanation: "Unpatched flaw." },
                { id: 2, prompt: "What is identity theft online?", img: "👤", opts: [{ l: "Stealing personal information to impersonate someone fraudulently", c: true }, { l: "Forgetting your password", c: false }], explanation: "Fraudulent impersonation." },
                { id: 3, prompt: "What is a firewall in network security?", img: "🧱", opts: [{ l: "A security system monitoring incoming and outgoing network traffic", c: true }, { l: "A heating radiator", c: false }], explanation: "Network barrier." },
                { id: 4, prompt: "What is botnet activity?", img: "🤖", opts: [{ l: "A network of infected computers controlled remotely by hackers", c: true }, { l: "Automated customer service", c: false }], explanation: "Hacker robot network." },
                { id: 5, prompt: "What is digital permanence?", img: "⏳", opts: [{ l: "The reality that internet posts and data are nearly impossible to erase completely", c: true }, { l: "Temporary Snapchat stories", c: false }], explanation: "Permanent data." }
              ],
              [
                { id: 1, prompt: "What is a denial-of-service (DoS) attack?", img: "🛑", opts: [{ l: "Overwhelming a server with traffic to render it offline", c: true }, { l: "Shutting down your computer at night", c: false }], explanation: "Traffic overload." },
                { id: 2, prompt: "What is source code ownership?", img: "📝", opts: [{ l: "Copyright protection governing who can alter software code", c: true }, { l: "Public open parking", c: false }], explanation: "Code rights." },
                { id: 3, prompt: "What is biometrics in device security?", img: "👁️", opts: [{ l: "Authentication using fingerprints or facial recognition", c: true }, { l: "Typing passwords with a keyboard", c: false }], explanation: "Biological ID." },
                { id: 4, prompt: "What is a hardware security key?", img: "🔑", opts: [{ l: "A physical USB token required for multi-factor authentication", c: true }, { l: "A door key", c: false }], explanation: "Physical security token." },
                { id: 5, prompt: "What is cloud storage data redundancy?", img: "☁️", opts: [{ l: "Storing data across multiple servers to prevent loss", c: true }, { l: "Deleting duplicate files", c: false }], explanation: "Backup redundancy." }
              ]
            ];
            poolData = pools[batchNum - 1];
          } else if (top === "Job Interviews") {
            const pools = [
              [
                { id: 1, prompt: "Purpose of cover letter?", img: "✉️", opts: [{ l: "Tailored narrative connecting skills", c: true }, { l: "Repeat resume", c: false }], exp: "Cover letter." },
                { id: 2, prompt: "Transferable skills?", img: "💼", opts: [{ l: "Versatile competencies like leadership", c: true }, { l: "Tickets", c: false }], exp: "Skills." },
                { id: 3, prompt: "Elevator pitch?", img: "⏱️", opts: [{ l: "30-sec summary of value", c: true }, { l: "Song", c: false }], exp: "Pitch." },
                { id: 4, prompt: "When to send thank-you note?", img: "📧", opts: [{ l: "Within 24 hours", c: true }, { l: "Months later", c: false }], exp: "Timing." },
                { id: 5, prompt: "STAR method?", img: "⭐", opts: [{ l: "Situation, Task, Action, Result", c: true }, { l: "Sing, Talk, Act", c: false }], exp: "STAR." }
              ],
              [
                { id: 1, prompt: "What is an executive summary in professional portfolios?", img: "📑", opts: [{ l: "A brief overview highlighting key qualifications and career goals", c: true }, { l: "A long autobiography", c: false }], explanation: "Professional summary." },
                { id: 2, prompt: "How should you negotiate a job offer respectfully?", img: "🤝", opts: [{ l: "Express gratitude, state counter-arguments with market data", c: true }, { l: "Threaten to quit immediately", c: false }], explanation: "Respectful negotiation." },
                { id: 3, prompt: "What is professional networking?", img: "🌐", opts: [{ l: "Building mutually beneficial relationships across industries", c: true }, { l: "Asking strangers for money", c: false }], explanation: "Professional connections." },
                { id: 4, prompt: "What is a portfolio in creative and technical fields?", img: "📁", opts: [{ l: "A curated collection showcasing past work projects", c: true }, { l: "A wallet for cash", c: false }], explanation: "Work showcase." },
                { id: 5, prompt: "Why do companies ask behavioral interview questions?", img: "🧠", opts: [{ l: "Past behavior predicts future performance in similar situations", c: true }, { l: "To waste time", c: false }], explanation: "Predictive behavior." }
              ],
              [
                { id: 1, prompt: "What is a competency-based interview?", img: "🎯", opts: [{ l: "An interview structured around specific required skill sets", c: true }, { l: "A physical sports test", c: false }], explanation: "Skill assessment." },
                { id: 2, prompt: "How should you handle multiple job offers?", img: "⚖️", opts: [{ l: "Evaluate compensation, culture, growth; communicate transparently", c: true }, { l: "Hide offers from everyone", c: false }], explanation: "Offer evaluation." },
                { id: 3, prompt: "What is a career trajectory?", img: "📈", opts: [{ l: "The projected path of professional advancement over time", c: true }, { l: "Daily commute route", c: false }], explanation: "Career path." },
                { id: 4, prompt: "What is mentorship in professional development?", img: "🌱", opts: [{ l: "Guidance provided by an experienced senior professional", c: true }, { l: "Competing against peers", c: false }], explanation: "Senior guidance." },
                { id: 5, prompt: "What is a professional reference check?", img: "📞", opts: [{ l: "Contacting past supervisors to verify work ethic and character", c: true }, { l: "Calling random friends", c: false }], explanation: "Reference verification." }
              ],
              [
                { id: 1, prompt: "What is continuous professional development (CPD)?", img: "📚", opts: [{ l: "Ongoing acquisition of new skills and knowledge throughout a career", c: true }, { l: "Stopping learning after college", c: false }], explanation: "Lifelong learning." },
                { id: 2, prompt: "What is an informational interview?", img: "☕", opts: [{ l: "Interviewing an industry expert to learn about their career field", c: true }, { l: "A formal job hiring test", c: false }], explanation: "Career exploration." },
                { id: 3, prompt: "What is imposter syndrome in career progression?", img: "🎭", opts: [{ l: "Persistent self-doubt regarding one's achievements and competence", c: true }, { l: "True professional incompetence", c: false }], explanation: "Self-doubt phenomenon." },
                { id: 4, prompt: "How do you maintain work-life balance in demanding careers?", img: "⚖️", opts: [{ l: "Setting healthy boundaries, prioritizing rest, and managing time", c: true }, { l: "Working 24 hours a day", c: false }], explanation: "Healthy boundaries." },
                { id: 5, prompt: "What is a personal brand in the job market?", img: "🌟", opts: [{ l: "How you uniquely present your professional identity and reputation", c: true }, { l: "A clothing brand logo", c: false }], explanation: "Professional identity." }
              ],
              [
                { id: 1, prompt: "What is cross-functional collaboration?", img: "🤝", opts: [{ l: "Working alongside team members from different departments", c: true }, { l: "Working completely alone", c: false }], explanation: "Departmental teamwork." },
                { id: 2, prompt: "What is leadership presence (executive presence)?", img: "👑", opts: [{ l: "The ability to project confidence, poise, and decisiveness", c: true }, { l: "Shouting loudly in meetings", c: false }], explanation: "Confident poise." },
                { id: 3, prompt: "What is a milestone in project management?", img: "🚩", opts: [{ l: "A significant checkpoint or goal marker in a project timeline", c: true }, { l: "A traffic sign", c: false }], explanation: "Goal checkpoint." },
                { id: 4, prompt: "What is constructive critique during performance reviews?", img: "💬", opts: [{ l: "Actionable feedback aimed at professional growth", c: true }, { l: "Personal insult", c: false }], explanation: "Growth feedback." },
                { id: 5, prompt: "What is adaptability in modern workplaces?", img: "🔄", opts: [{ l: "The capacity to adjust smoothly to changing priorities and tools", c: true }, { l: "Refusing to change methods", c: false }], explanation: "Flexibility." }
              ]
            ];
            poolData = pools[batchNum - 1];
          } else {
            const pools = [
              [
                { id: 1, prompt: "Why include a bibliography?", img: "📑", opts: [{ l: "Avoid plagiarism and credit sources", c: true }, { l: "Make paper heavier", c: false }], exp: "Academic integrity." },
                { id: 2, prompt: "What does a dictionary provide?", img: "📖", opts: [{ l: "Pronunciations and definitions", c: true }, { l: "Weather", c: false }], exp: "Lexicon." },
                { id: 3, prompt: "First step of scientific method?", img: "🔬", opts: [{ l: "Observation and question", c: true }, { l: "Conclusion", c: false }], exp: "Inquiry." },
                { id: 4, prompt: "What is a hypothesis?", img: "💡", opts: [{ l: "Testable proposed explanation", c: true }, { l: "Proven law", c: false }], exp: "Testable idea." },
                { id: 5, prompt: "What does an atlas contain?", img: "🗺️", opts: [{ l: "Geopolitical and physical maps", c: true }, { l: "Recipes", c: false }], explanation: "Geography maps." }
              ],
              [
                { id: 1, prompt: "What is peer review in academic publishing?", img: "👥", opts: [{ l: "Evaluation of research by independent expert scholars", c: true }, { l: "Checking grammar with spellcheck", c: false }], explanation: "Expert vetting." },
                { id: 2, prompt: "What is a primary research source?", img: "📜", opts: [{ l: "Original firsthand data or historical documents", c: true }, { l: "A textbook summary", c: false }], explanation: "Firsthand data." },
                { id: 3, prompt: "What is qualitative research?", img: "📊", opts: [{ l: "Focusing on descriptive data, interviews, and observations", c: true }, { l: "Counting numerical statistics only", c: false }], explanation: "Descriptive study." },
                { id: 4, prompt: "What is quantitative research?", img: "📈", opts: [{ l: "Analyzing numerical data using statistical methods", c: true }, { l: "Writing poetry", c: false }], explanation: "Numerical data." },
                { id: 5, prompt: "What is an abstract in a research paper?", img: "📄", opts: [{ l: "A concise summary of the entire study's findings", c: true }, { l: "The back cover", c: false }], explanation: "Summary abstract." }
              ],
              [
                { id: 1, prompt: "What is plagiarism?", img: "⚠️", opts: [{ l: "Using someone else's work without proper citation", c: true }, { l: "Writing original essays", c: false }], explanation: "Academic theft." },
                { id: 2, prompt: "What is a control group in scientific experiments?", img: "🧪", opts: [{ l: "The baseline group kept unchanged for comparison", c: true }, { l: "The group receiving experimental treatment", c: false }], explanation: "Experimental baseline." },
                { id: 3, prompt: "What is an empirical study?", img: "🔬", opts: [{ l: "Research based on direct observation and experimentation", c: true }, { l: "Pure theoretical philosophy", c: false }], explanation: "Observational science." },
                { id: 4, prompt: "What is a thesis statement in academic writing?", img: "🏛️", opts: [{ l: "The core central argument driving the entire paper", c: true }, { l: "A random concluding sentence", c: false }], explanation: "Central argument." },
                { id: 5, prompt: "What is academic integrity?", img: "⭐", opts: [{ l: "Honesty and ethical standards in scholarship", c: true }, { l: "Getting 100% grades", c: false }], explanation: "Ethical scholarship." }
              ],
              [
                { id: 1, prompt: "What is a literature review?", img: "📚", opts: [{ l: "A comprehensive survey of prior research on a topic", c: true }, { l: "A fictional novel", c: false }], explanation: "Research survey." },
                { id: 2, prompt: "What is deductive reasoning?", img: "🧠", opts: [{ l: "Applying general principles to reach a specific conclusion", c: true }, { l: "Guessing randomly", c: false }], explanation: "General to specific." },
                { id: 3, prompt: "What is inductive reasoning?", img: "💡", opts: [{ l: "Deriving general theories from specific observations", c: true }, { l: "Memorizing facts", c: false }], explanation: "Specific to general." },
                { id: 4, prompt: "What is a methodological framework?", img: "⚙️", opts: [{ l: "The structured system of methods used in a study", c: true }, { l: "A computer hardware diagram", c: false }], explanation: "Method system." },
                { id: 5, prompt: "What is citation formatting (APA / MLA)?", img: "📝", opts: [{ l: "Standardized rules for acknowledging reference sources", c: true }, { l: "Font styling choices", c: false }], explanation: "Reference standards." }
              ],
              [
                { id: 1, prompt: "What is an independent variable in experiments?", img: "🔬", opts: [{ l: "The variable manipulated or changed by the researcher", c: true }, { l: "The measured outcome", c: false }], explanation: "Manipulated variable." },
                { id: 2, prompt: "What is a dependent variable?", img: "📈", opts: [{ l: "The outcome measured and affected during the experiment", c: true }, { l: "The researcher", c: false }], explanation: "Measured outcome." },
                { id: 3, prompt: "What is peer debriefing in qualitative research?", img: "👥", opts: [{ l: "Discussing findings with fellow researchers to ensure validity", c: true }, { l: "Arguing in class", c: false }], explanation: "Validity check." },
                { id: 4, prompt: "What is scholarly citation?", img: "🔖", opts: [{ l: "Giving credit to authors within academic texts", c: true }, { l: "Writing footnotes for fun", c: false }], explanation: "Author credit." },
                { id: 5, prompt: "What is academic publishing?", img: "📰", opts: [{ l: "Releasing peer-reviewed research in professional journals", c: true }, { l: "Posting on TikTok", c: false }], explanation: "Journal release." }
              ]
            ];
            poolData = pools[batchNum - 1];
          }
        } 
        // 5. C1 ADVANCED
        else {
          if (top === "Daily Life") {
            const pools = [
              [
                { id: 1, prompt: "Idiom 'to bite the bullet' means?", img: "🎯", opts: [{ l: "Face difficult situation with courage", c: true }, { l: "Eat metal", c: false }], exp: "Enduring hardship." },
                { id: 2, prompt: "Syntactic inversion: 'Hardly ___ when conference commenced.'", img: "📜", opts: [{ l: "had I arrived", c: true }, { l: "I had arrived", c: false }], exp: "Auxiliary inversion." },
                { id: 3, prompt: "Semantic nuance of 'ubiquitous'?", img: "🌍", opts: [{ l: "Found everywhere simultaneously", c: true }, { l: "Rare", c: false }], exp: "Omnipresent." },
                { id: 4, prompt: "To 'mitigate' a crisis implies?", img: "🛡️", opts: [{ l: "Lessen severity or negative impacts", c: true }, { l: "Worsen", c: false }], exp: "Reduce damage." },
                { id: 5, prompt: "Precise collocation: 'To mount a ___ defense.'", img: "⚖️", opts: [{ l: "vigorous", c: true }, { l: "heavy", c: false }], exp: "Vigorous defense." }
              ],
              [
                { id: 1, prompt: "What does the idiom 'to burn the midnight oil' signify?", img: "🕯️", opts: [{ l: "Working or studying late into the night", c: true }, { l: "Starting a campfire", c: false }], explanation: "Late night study." },
                { id: 2, prompt: "Choose the correct advanced phrasal verb: 'To ___ an ambitious project from scratch.'", img: "🚀", opts: [{ l: "embark upon / kick off", c: true }, { l: "throw away", c: false }], explanation: "Embark upon." },
                { id: 3, prompt: "What is the lexical nuance of 'ameliorate'?", img: "📈", opts: [{ l: "To make something bad or unsatisfactory better", c: true }, { l: "To destroy completely", c: false }], explanation: "Improve condition." },
                { id: 4, prompt: "Identify the correct cleft sentence for emphasis: 'It was the meticulous planning ___ ensured our triumph.'", img: "✨", opts: [{ l: "that", c: true }, { l: "what", c: false }], explanation: "Cleft emphasis 'It was... that'." },
                { id: 5, prompt: "What does 'to beat around the bush' denote in discourse?", img: "🌳", opts: [{ l: "Avoiding speaking directly about the main topic", c: true }, { l: "Trimming garden hedges", c: false }], explanation: "Evasion of topic." }
              ],
              [
                { id: 1, prompt: "What does the idiom 'a blessing in disguise' mean?", img: "🎭", opts: [{ l: "A seeming misfortune that turns out to have good results", c: true }, { l: "A Halloween costume", c: false }], explanation: "Hidden benefit." },
                { id: 2, prompt: "What is the precise definition of 'superfluous'?", img: "🗑️", opts: [{ l: "Unnecessary, exceeding what is sufficient or required", c: true }, { l: "Extremely essential", c: false }], explanation: "Excessive/unnecessary." },
                { id: 3, prompt: "Identify the correct conditional inversion: '___ you require assistance, do not hesitate to contact us.'", img: "📞", opts: [{ l: "Should", c: true }, { l: "Had", c: false }], explanation: "Inversion 'Should you'." },
                { id: 4, prompt: "What does 'to hit the nail on the head' mean?", img: "🔨", opts: [{ l: "To describe exactly what is causing a situation or problem", c: true }, { l: "Accidentally hammering wood", c: false }], explanation: "Exact accuracy." },
                { id: 5, prompt: "What is the semantic meaning of 'ephemeral'?", img: "⏳", opts: [{ l: "Lasting for a very short time; transient", c: true }, { l: "Eternal and immortal", c: false }], explanation: "Short-lived." }
              ],
              [
                { id: 1, prompt: "What does 'to spill the beans' mean in colloquial idiom?", img: "🫘", opts: [{ l: "To disclose confidential secret information prematurely", c: true }, { l: "Dropping groceries", c: false }], explanation: "Revealing secrets." },
                { id: 2, prompt: "What is the lexical nuance of 'pragmatic'?", img: "💡", opts: [{ l: "Dealing with things sensibly and realistically based on practicality", c: true }, { l: "Dreaming idealistically", c: false }], explanation: "Practical approach." },
                { id: 3, prompt: "Choose the correct prepositional collocation: 'Complacent ___ one's past achievements.'", img: "🏆", opts: [{ l: "with", c: true }, { l: "about", c: false }], explanation: "Complacent with." },
                { id: 4, prompt: "What does 'to throw in the towel' signify?", img: "🥊", opts: [{ l: "To surrender or admit defeat in a contest or endeavor", c: true }, { l: "Cleaning up a bathroom", c: false }], explanation: "Giving up." },
                { id: 5, prompt: "What is the meaning of 'scrupulous'?", img: "🔍", opts: [{ l: "Diligent, thorough, and extremely attentive to details or morals", c: true }, { l: "Careless and sloppy", c: false }], explanation: "Meticulous care." }
              ],
              [
                { id: 1, prompt: "What does 'to pull someone's leg' mean?", img: "🦵", opts: [{ l: "To tease or playfully trick someone with a joke", c: true }, { l: "To trip someone physically", c: false }], explanation: "Playful teasing." },
                { id: 2, prompt: "What is the precise meaning of 'cacophony'?", img: "🔊", opts: [{ l: "A harsh, discordant mixture of unpleasant sounds", c: true }, { l: "Harmonious symphony orchestra", c: false }], explanation: "Harsh noise." },
                { id: 3, prompt: "Identify the correct advanced subjunctive structure: 'It is imperative that every candidate ___ punctual.'", img: "⏰", opts: [{ l: "be", c: true }, { l: "is", c: false }], explanation: "Subjunctive bare infinitive 'be'." },
                { id: 4, prompt: "What does 'to burn bridges' mean?", img: "🌉", opts: [{ l: "To damage relationships or ruin future opportunities irretrievably", c: true }, { l: "Building construction engineering", c: false }], explanation: "Destroying relations." },
                { id: 5, prompt: "What is the semantic nuance of 'pusillanimous'?", img: "🦁", opts: [{ l: "Showing a lack of courage or determination; timid", c: true }, { l: "Brave and heroic", c: false }], explanation: "Cowardly/timid." }
              ]
            ];
            poolData = pools[batchNum - 1];
          } else if (top === "Social Media") {
            const pools = [
              [
                { id: 1, prompt: "Algorithmic echo chamber?", img: "📡", opts: [{ l: "Environment reinforcing beliefs via feeds", c: true }, { l: "Studio", c: false }], exp: "Filter bubble." },
                { id: 2, prompt: "AI deepfakes ethical threat?", img: "🤖", opts: [{ l: "Synthetic media spreading misinformation", c: true }, { l: "Graphics", c: false }], exp: "Fake media." },
                { id: 3, prompt: "Algorithmic bias in machine learning?", img: "📊", opts: [{ l: "Inheriting historical human prejudices", c: true }, { l: "Speed", c: false }], exp: "Data bias." },
                { id: 4, prompt: "Information literacy in digital age?", img: "🔍", opts: [{ l: "Evaluating and verifying media sources critically", c: true }, { l: "Typing fast", c: false }], exp: "Media critique." },
                { id: 5, prompt: "Synthetic media regulation curb?", img: "🏛️", opts: [{ l: "Unauthorized impersonation and disinformation", c: true }, { l: "Coding", c: false }], exp: "Regulation." }
              ],
              [
                { id: 1, prompt: "What is astroturfing in online digital campaigns?", img: "🌿", opts: [{ l: "Disguising corporate sponsored messaging as grassroots movements", c: true }, { l: "Lawn care gardening tutorials", c: false }], explanation: "Fake grassroots." },
                { id: 2, prompt: "What is cognitive load in digital media consumption?", img: "🧠", opts: [{ l: "The total amount of mental effort being used in working memory", c: true }, { l: "Internet download speeds", c: false }], explanation: "Mental effort." },
                { id: 3, prompt: "What is a surveillance capitalism business model?", img: "👁️", opts: [{ l: "Monetizing personal user behavioral data for targeted advertising", c: true }, { l: "Traditional bookstore sales", c: false }], explanation: "Data monetization." },
                { id: 4, prompt: "What is confirmation bias in social feeds?", img: "🔄", opts: [{ l: "Favoring information confirming preexisting beliefs and ignoring contradictions", c: true }, { l: "Mathematical calculations", c: false }], explanation: "Belief confirmation." },
                { id: 5, prompt: "What is participatory culture in modern media?", img: "🌐", opts: [{ l: "A culture where consumers act as contributors and producers", c: true }, { l: "Passive television watching", c: false }], explanation: "Active contribution." }
              ],
              [
                { id: 1, prompt: "What is data scraping on social media platforms?", img: "🕷️", opts: [{ l: "Automated extraction of large quantities of data from websites", c: true }, { l: "Deleting browser history", c: false }], explanation: "Automated extraction." },
                { id: 2, prompt: "What is algorithmic transparency?", img: "🔍", opts: [{ l: "Openness regarding how algorithms rank and moderate content", c: true }, { l: "Invisible code", c: false }], explanation: "Code openness." },
                { id: 3, prompt: "What is digital fatigue or screen burnout?", img: "🔋", opts: [{ l: "Mental exhaustion resulting from excessive digital connectivity", c: true }, { l: "Laptop battery failure", c: false }], explanation: "Exhaustion." },
                { id: 4, prompt: "What is gamification in app design?", img: "🎮", opts: [{ l: "Integrating game mechanics into non-gaming apps to drive engagement", c: true }, { l: "Playing video games all day", c: false }], explanation: "Game mechanics." },
                { id: 5, prompt: "What is cyberbalkanization?", img: "🗺️", opts: [{ l: "The polarization of online communities into hostile isolated factions", c: true }, { l: "International travel vlogs", c: false }], explanation: "Community polarization." }
              ],
              [
                { id: 1, prompt: "What is attention economy in digital media?", img: "⏱️", opts: [{ l: "Treating human attention as a scarce commodity to be monetized", c: true }, { l: "Paying workers hourly wages", c: false }], explanation: "Attention commodification." },
                { id: 2, prompt: "What is shadowbanning on social networks?", img: "👻", opts: [{ l: "Quietly blocking a user's content from visibility without notifying them", c: true }, { l: "Permanent account deletion", c: false }], explanation: "Stealth suppression." },
                { id: 3, prompt: "What is synthetic sociology via social media analytics?", img: "📊", opts: [{ l: "Studying human social behavior through digital footprints and big data", c: true }, { l: "Laboratory chemistry experiments", c: false }], explanation: "Digital social analysis." },
                { id: 4, prompt: "What is the paradox of choice in digital platforms?", img: "🔀", opts: [{ l: "Having excessive options leading to decision paralysis and anxiety", c: true }, { l: "Having only one choice", c: false }], explanation: "Decision paralysis." },
                { id: 5, prompt: "What is mediated reality in modern online spaces?", img: "👓", opts: [{ l: "Experiencing events through technological filters and screens", c: true }, { l: "Direct physical nature", c: false }], explanation: "Tech-filtered reality." }
              ],
              [
                { id: 1, prompt: "What is algorithmic determinism?", img: "🤖", opts: [{ l: "The belief that algorithms dictate cultural trends and human choices", c: true }, { l: "Free will philosophy", c: false }], explanation: "Algorithmic control." },
                { id: 2, prompt: "What is context collapse on social platforms?", img: "💥", opts: [{ l: "The merging of distinct social audiences into a single blurred group", c: true }, { l: "Server crashes", c: false }], explanation: "Audience merging." },
                { id: 3, prompt: "What is meme warfare in digital political discourse?", img: "⚔️", opts: [{ l: "Using viral cultural memes as rhetorical weapons in influence operations", c: true }, { l: "Playing multiplayer video games", c: false }], explanation: "Meme rhetoric." },
                { id: 4, prompt: "What is digital sovereignty?", img: "🛡️", opts: [{ l: "A nation's control over its digital infrastructure and citizen data", c: true }, { l: "Personal computer privacy", c: false }], explanation: "National data control." },
                { id: 5, prompt: "What is data provenance?", img: "🏷️", opts: [{ l: "The verifiable chronological origin and history of digital data", c: true }, { l: "Deleting old files", c: false }], explanation: "Data history." }
              ]
            ];
            poolData = pools[batchNum - 1];
          } else if (top === "Job Interviews") {
            const pools = [
              [
                { id: 1, prompt: "Metrics-driven ROI storytelling entail?", img: "📈", opts: [{ l: "Quantified business impact and revenue growth", c: true }, { l: "Jokes", c: false }], exp: "ROI value." },
                { id: 2, prompt: "Executive stakeholder alignment during conflicts?", img: "🤝", opts: [{ l: "Reconciling priorities using empirical risk models", c: true }, { l: "Ignore", c: false }], exp: "Alignment." },
                { id: 3, prompt: "Strategic foresight demonstrate in leadership?", img: "🚀", opts: [{ l: "Anticipating industry disruption and pivoting proactively", c: true }, { l: "Micro", c: false }], exp: "Foresight." },
                { id: 4, prompt: "Streamlining organizational inefficiencies term:", img: "⚙️", opts: [{ l: "Re-engineering operational workflows", c: true }, { l: "Slowing", c: false }], exp: "Workflows." },
                { id: 5, prompt: "Paramount when handling unforeseen corporate crisis?", img: "🏛️", opts: [{ l: "Decisive command with transparent communication", c: true }, { l: "Hide", c: false }], exp: "Transparency." }
              ],
              [
                { id: 1, prompt: "What is organizational change management in executive strategy?", img: "🔄", opts: [{ l: "Structuring transition methods to guide staff through corporate transformations", c: true }, { l: "Firing all employees randomly", c: false }], explanation: "Transition guidance." },
                { id: 2, prompt: "What is PESTLE analysis in strategic executive interviews?", img: "📊", opts: [{ l: "Evaluating Political, Economic, Social, Technological, Legal, Environmental factors", c: true }, { l: "A physical fitness test", c: false }], explanation: "Macro environment framework." },
                { id: 3, prompt: "What is a SWOT matrix used for in corporate planning?", img: "🔲", opts: [{ l: "Analyzing Strengths, Weaknesses, Opportunities, and Threats", c: true }, { l: "Scheduling employee lunch breaks", c: false }], explanation: "Strategic audit matrix." },
                { id: 4, prompt: "What does KPI stand for in performance management?", img: "🎯", opts: [{ l: "Key Performance Indicator", c: true }, { l: "Key Personal Income", c: false }], explanation: "Performance metric." },
                { id: 5, prompt: "What is corporate governance?", img: "⚖️", opts: [{ l: "The system of rules, practices, and processes directing a corporation", c: true }, { l: "Daily office interior decorating", c: false }], explanation: "Company oversight." }
              ],
              [
                { id: 1, prompt: "What is executive succession planning?", img: "👥", opts: [{ l: "Identifying and developing internal talent to fill key leadership roles", c: true }, { l: "Firing senior executives abruptly", c: false }], explanation: "Leadership pipeline." },
                { id: 2, prompt: "What is agile leadership methodology?", img: "⚡", opts: [{ l: "Iterative management emphasizing adaptability and rapid response", c: true }, { l: "Strict bureaucratic hierarchy", c: false }], explanation: "Adaptive management." },
                { id: 3, prompt: "What is root cause analysis in executive problem-solving?", img: "🔍", opts: [{ l: "Identifying the fundamental source of a defect rather than symptoms", c: true }, { l: "Blaming junior staff immediately", c: false }], explanation: "Core problem-solving." },
                { id: 4, prompt: "What is synergy in corporate mergers?", img: "➕", opts: [{ l: "The combined value and performance greater than the sum of separate parts", c: true }, { l: "Doubling office rent costs", c: false }], explanation: "Combined value." },
                { id: 5, prompt: "What is enterprise risk management (ERM)?", img: "🛡️", opts: [{ l: "Methods used to identify and manage risks threatening enterprise objectives", c: true }, { l: "Buying lottery tickets", c: false }], explanation: "Risk management." }
              ],
              [
                { id: 1, prompt: "What is disruptive innovation theory?", img: "💡", opts: [{ l: "Creating a new market that eventually disrupts established industry leaders", c: true }, { l: "Breaking office furniture", c: false }], explanation: "Market disruption." },
                { id: 2, prompt: "What is intellectual capital in modern corporations?", img: "🧠", opts: [{ l: "The collective knowledge, skills, and expertise of an organization", c: true }, { l: "Office building real estate", c: false }], explanation: "Organizational knowledge." },
                { id: 3, prompt: "What is a balanced scorecard in strategic management?", img: "📋", opts: [{ l: "A performance metric tool looking at financial, customer, and internal processes", c: true }, { l: "A restaurant menu", c: false }], explanation: "Strategic scorecard." },
                { id: 4, prompt: "What is blue ocean strategy?", img: "🌊", opts: [{ l: "Creating uncontested market space rather than competing in saturated industries", c: true }, { l: "Deep sea fishing business", c: false }], explanation: "Uncontested markets." },
                { id: 5, prompt: "What is core competency in business strategy?", img: "⭐", opts: [{ l: "A company's unique defining capability providing competitive advantage", c: true }, { l: "General office administration", c: false }], explanation: "Defining capability." }
              ],
              [
                { id: 1, prompt: "What is stakeholder capitalism?", img: "🌐", opts: [{ l: "A model where corporations serve all stakeholders including society and environment", c: true }, { l: "Focusing solely on immediate shareholder profits", c: false }], explanation: "Broad stakeholder value." },
                { id: 2, prompt: "What is corporate social responsibility (CSR)?", img: "🌱", opts: [{ l: "Self-regulating business models contributing to social and environmental goals", c: true }, { l: "Paying government taxes", c: false }], explanation: "Social responsibility." },
                { id: 3, prompt: "What is scenario planning in strategic foresight?", img: "🔮", opts: [{ l: "Developing flexible strategic plans based on multiple possible futures", c: true }, { l: "Predicting exact stock market numbers", c: false }], explanation: "Future scenarios." },
                { id: 4, prompt: "What is operational excellence?", img: "⚡", opts: [{ l: "Execution of business strategy better, faster, and cheaper than competitors", c: true }, { l: "Slow bureaucratic sluggishness", c: false }], explanation: "Superior execution." },
                { id: 5, prompt: "What is psychological safety in high-performing teams?", img: "🛡️", opts: [{ l: "A shared belief that the team is safe for interpersonal risk-taking", c: true }, { l: "Never challenging ideas", c: false }], explanation: "Safe risk-taking." }
              ]
            ];
            poolData = pools[batchNum - 1];
          } else {
            const pools = [
              [
                { id: 1, prompt: "Epistemological philosophy primary focus?", img: "🎓", opts: [{ l: "Nature, origin, and limits of human knowledge", c: true }, { l: "Stars", c: false }], exp: "Knowledge." },
                { id: 2, prompt: "A priori vs a posteriori knowledge?", img: "🧠", opts: [{ l: "Independent of experience vs empirical observation", c: true }, { l: "Identical", c: false }], exp: "Deduction vs observation." },
                { id: 3, prompt: "What is a logical tautology?", img: "📜", opts: [{ l: "Necessarily true by logical form", c: true }, { l: "Experiment", c: false }], exp: "Tautology." },
                { id: 4, prompt: "Advanced concession marker: '___ empirical data is complex...'", img: "⚖️", opts: [{ l: "Albeit", c: true }, { l: "Because", c: false }], exp: "Concession." },
                { id: 5, prompt: "German concept 'Zeitgeist' signify?", img: "🏛️", opts: [{ l: "Defining spirit or mood of a particular historical period", c: true }, { l: "Building", c: false }], exp: "Zeitgeist." }
              ],
              [
                { id: 1, prompt: "What is ontological philosophy concerned with?", img: "🌌", opts: [{ l: "The nature of being, existence, and reality", c: true }, { l: "Rules of grammar", c: false }], explanation: "Nature of being." },
                { id: 2, prompt: "What is the philosophical concept of solipsism?", img: "👤", opts: [{ l: "The epistemological idea that only one's own mind is sure to exist", c: true }, { l: "Universal human empathy", c: false }], explanation: "Self-only existence." },
                { id: 3, prompt: "What is a paradox in formal logic?", img: "🔄", opts: [{ l: "A statement that contradicts itself yet reveals a deeper truth", c: true }, { l: "A simple addition equation", c: false }], explanation: "Self-contradiction." },
                { id: 4, prompt: "What is teleology in philosophy?", img: "🎯", opts: [{ l: "The explanation of phenomena by purpose rather than causes", c: true }, { l: "Random cosmic chance", c: false }], explanation: "Purpose-driven." },
                { id: 5, prompt: "What is philosophical skepticism?", img: "❓", opts: [{ l: "An attitude of questioning knowledge claims and certainty", c: true }, { l: "Blind dogmatic faith", c: false }], explanation: "Doubt certainty." }
              ],
              [
                { id: 1, prompt: "What is moral relativism?", img: "⚖️", opts: [{ l: "The view that moral judgments are true relative to cultural contexts", c: true }, { l: "Absolute universal moral laws", c: false }], explanation: "Contextual morality." },
                { id: 2, prompt: "What is the ship of Theseus philosophical paradox?", img: "⛵", opts: [{ l: "Whether an object with all parts replaced remains fundamentally the same", c: true }, { l: "How boats float on water", c: false }], explanation: "Identity paradox." },
                { id: 3, prompt: "What is rationalism in epistemology?", img: "🧠", opts: [{ l: "Belief that reason is the chief source of knowledge", c: true }, { l: "Sensory experience only", c: false }], explanation: "Reason-based knowledge." },
                { id: 4, prompt: "What is empiricism in philosophy?", img: "🔬", opts: [{ l: "Belief that all knowledge originates from sensory experience", c: true }, { l: "Pure innate ideas", c: false }], explanation: "Sensory observation." },
                { id: 5, prompt: "What is determinism versus libertarian free will?", img: "⛓️", opts: [{ l: "All events determined by prior causes vs conscious free choice", c: true }, { l: "Identical concepts", c: false }], explanation: "Free will debate." }
              ],
              [
                { id: 1, prompt: "What is the mind-body problem in philosophy?", img: "🧠", opts: [{ l: "How mental states relate to physical brain states", c: true }, { l: "Physical exercise routines", c: false }], explanation: "Consciousness and body." },
                { id: 2, prompt: "What is existential nihilism?", img: "🕳️", opts: [{ l: "The belief that life is objectively without intrinsic meaning or value", c: true }, { l: "Extreme optimism", c: false }], explanation: "Lack of intrinsic meaning." },
                { id: 3, prompt: "What is dualism in metaphysics?", img: "☯️", opts: [{ l: "The belief that mind and matter are fundamentally distinct substances", c: true }, { l: "Materialism only", c: false }], explanation: "Mind and matter distinct." },
                { id: 4, prompt: "What is the trolley problem in moral philosophy?", img: "🚊", opts: [{ l: "A thought experiment regarding ethics and utilitarian sacrifice", c: true }, { l: "Public transportation schedules", c: false }], explanation: "Ethics thought experiment." },
                { id: 5, prompt: "What is Occam's razor principle?", img: "🪒", opts: [{ l: "The philosophical principle that simpler explanations are preferable", c: true }, { l: "Making complex theories", c: false }], explanation: "Simplicity principle." }
              ],
              [
                { id: 1, prompt: "What is the categorical imperative in Kantian ethics?", img: "📜", opts: [{ l: "Act only according to maxims you would wish to become universal laws", c: true }, { l: "Do whatever feels convenient", c: false }], explanation: "Universal moral law." },
                { id: 2, prompt: "What is consequentialism in normative ethics?", img: "⚖️", opts: [{ l: "Judging the morality of an action solely by its outcomes", c: true }, { l: "Judging actions by internal intent alone", c: false }], explanation: "Outcome-based ethics." },
                { id: 3, prompt: "What is the concept of a 'tabla rasa' (blank slate)?", img: "📝", opts: [{ l: "The theory that individuals are born without built-in mental content", c: true }, { l: "Innate universal knowledge", c: false }], explanation: "Blank slate mind." },
                { id: 4, prompt: "What is the philosophical concept of absurdism?", img: "🎭", opts: [{ l: "The conflict between human search for meaning and the cold meaningless universe", c: true }, { l: "Comedy sitcoms", c: false }], explanation: "Camus absurdity." },
                { id: 5, prompt: "What is logical positivism?", img: "🔬", opts: [{ l: "The philosophical doctrine that only statements verifiable through experience are cognitively meaningful", c: true }, { l: "Metaphysical speculation", c: false }], explanation: "Verifiable meaningfulness." }
              ]
            ];
            poolData = pools[batchNum - 1];
          }
        }

        list[key] = {
          title: `${selectedLevel}: Quiz ${batchNum} - ${top} Masterclass`,
          image: icons[(topIdx + batchNum) % icons.length],
          level: selectedLevel,
          category: top,
          source: `${selectedLevel} Certified Academic Framework (Batch ${batchNum})`,
          questions: poolData.map((q: any) => ({
            id: q.id,
            prompt: q.prompt,
            imageIllustration: q.img,
            options: q.opts.map((o: any) => ({ label: o.l, isCorrect: o.c })),
            explanation: "exp" in q ? (q.exp as string) : (q.explanation as string)
          }))
        };
      }
    });
    return list;
  };

  const currentQuizModules = getCurrentLevelQuizzes();

  // DYNAMIC STUDY MATERIALS WITH SHORT, FUN, LEVEL-SPECIFIC READING, VOCAB, AND GRAMMAR
  const getDynamicStudyGuide = (lvl: string, top: string): StudyMaterial => {
    const targetId = `${lvl}-${top}`.replace(/\s+/g, "");

    let sampleParagraphs = [
      `Welcome to ${top}! Learning about this is super fun and helps you speak English with confidence every single day.`,
      `Whether you are chatting with friends or writing a story, knowing how to use the right words makes all your ideas shine bright!`
    ];

    let vocabList: VocabularyItem[] = [
      { word: "Fun", phonetic: "/fʌn/", partOfSpeech: "Noun / Adj", definition: "Enjoyment, amusement, or lighthearted pleasure.", example: "Learning new words together is so much fun!", illustrationIcon: "🎉" },
      { word: "Smart", phonetic: "/smɑːrt/", partOfSpeech: "Adjective", definition: "Clever, bright, or quick-witted.", example: "You make smart choices when you practice English.", illustrationIcon: "💡" },
      { word: "Friend", phonetic: "/frɛnd/", partOfSpeech: "Noun", definition: "A person whom one knows and with whom one has a bond of mutual affection.", example: "Practice your new words with a friendly study partner.", illustrationIcon: "🤝" }
    ];

    let grammarItem: GrammarRule = {
      ruleTitle: "Making Clear and Happy Sentences",
      explanation: "Every great sentence needs a clear subject and a lively action word to tell a wonderful story.",
      correctExample: "We practice speaking English every afternoon.",
      incorrectExample: "We practicing English afternoon.",
      tip: "Keep your sentences short, sweet, and punchy for easy reading!"
    };

    let practicalText = `Try using today's new vocabulary words in a fun sentence with someone next to you right now!`;

    // LEVEL & TOPIC SPECIFIC SHORT, FUN CONTENT
    if (lvl === "Kindergarten") {
      if (top === "Daily Life") {
        sampleParagraphs = [
          `Every day is a joyful adventure! From brushing our teeth in the morning to hugging our teddy bears at night, our daily routine is full of happy moments.`,
          `We use polite words like 'please' and 'thank you' when sharing toys with our best friends. Let's explore our favorite daily habits together!`
        ];
        vocabList = [
          { word: "Morning", phonetic: "/ˈmɔːrnɪŋ/", partOfSpeech: "Noun", definition: "The sunny start of a brand new day.", example: "We eat a yummy breakfast every morning.", illustrationIcon: "🌅" },
          { word: "Smile", phonetic: "/smaɪl/", partOfSpeech: "Verb", definition: "To turn your mouth up when you feel happy.", example: "Show a big happy smile to your teacher!", illustrationIcon: "😊" },
          { word: "Play", phonetic: "/pleɪ/", partOfSpeech: "Verb", definition: "To engage in games and fun activities.", example: "Let's play blocks together after lunch.", illustrationIcon: "🧸" }
        ];
        grammarItem = {
          ruleTitle: "Using 'This is...'",
          explanation: "Point at things close to you to show them off!",
          correctExample: "This is my favorite red ball.",
          incorrectExample: "Ball is this me.",
          tip: "Point your finger proudly when saying 'This is'!"
        };
        practicalText = `Point at your shoe right now and say: 'This is my shoe!'`;
      } else if (top === "Social Media") {
        sampleParagraphs = [
          `Even when looking at fun pictures on a tablet, being kind to others is super important! Online friends like reading nice messages.`,
          `Always play digital games with a grown-up nearby to keep everything safe, happy, and cheerful.`
        ];
        vocabList = [
          { word: "Kind", phonetic: "/kaɪnd/", partOfSpeech: "Adjective", definition: "Being nice and caring toward others.", example: "Send kind emojis to cheer up friends.", illustrationIcon: "💖" },
          { word: "Screen", phonetic: "/skriːn/", partOfSpeech: "Noun", definition: "The glass window on a phone or tablet.", example: "Look at the bright screen for our learning game.", illustrationIcon: "📱" },
          { word: "Safe", phonetic: "/seɪf/", partOfSpeech: "Adjective", definition: "Protected and feeling cozy.", example: "Playing games with parents keeps us safe.", illustrationIcon: "🛡️" }
        ];
        grammarItem = {
          ruleTitle: "Polite Asking ('May I')",
          explanation: "Always use polite helper words when asking to use a device.",
          correctExample: "May I please play the animal sound game?",
          incorrectExample: "Give me phone right now!",
          tip: "Saying 'May I please' makes grown-ups smile!"
        };
        practicalText = `Ask a parent politely: 'May I please see the picture book?'`;
      } else {
        sampleParagraphs = [
          `Little thinkers love asking 'Why?' and 'What?' about the wonderful world around us!`,
          `Sorting shapes, counting colorful blocks, and listening to stories helps our curious brains grow big and strong.`
        ];
        vocabList = [
          { word: "Ask", phonetic: "/æsk/", partOfSpeech: "Verb", definition: "To put a question to someone.", example: "Raise your hand to ask a smart question.", illustrationIcon: "❓" },
          { word: "Listen", phonetic: "/ˈlɪsən/", partOfSpeech: "Verb", definition: "To pay attention with your ears.", example: "Listen closely to the fun story.", illustrationIcon: "👂" },
          { word: "Think", phonetic: "/θɪŋk/", partOfSpeech: "Verb", definition: "To make pictures or ideas in your head.", example: "Think hard to solve the puzzle.", illustrationIcon: "🤔" }
        ];
        grammarItem = {
          ruleTitle: "Starting Questions with 'What'",
          explanation: "Use 'What' when you want to discover the name of something fun.",
          correctExample: "What is this cute little animal?",
          incorrectExample: "Animal is what this?",
          tip: "Let your voice go up at the end of a question!"
        };
        practicalText = `Ask a friend: 'What is your favorite color?'`;
      }
    } else if (lvl === "Primary School") {
      if (top === "Daily Life") {
        sampleParagraphs = [
          `School days are packed with exciting science experiments, playground games, and reading adventures with classmates!`,
          `Organizing your backpack and finishing homework on time gives you extra time to play outside.`
        ];
        vocabList = [
          { word: "Schedule", phonetic: "/ˈʃɛdjuːl/", partOfSpeech: "Noun", definition: "A fun plan for your daily classes.", example: "Check your school schedule for art class today.", illustrationIcon: "📅" },
          { word: "Experiment", phonetic: "/ɪkˈspɛrɪmənt/", partOfSpeech: "Noun", definition: "A cool test to discover how things work.", example: "We made a fizzy volcano experiment in science.", illustrationIcon: "🔬" },
          { word: "Team", phonetic: "/tiːm/", partOfSpeech: "Noun", definition: "A group playing or working together.", example: "Our soccer team won the recess match!", illustrationIcon: "⚽" }
        ];
        grammarItem = {
          ruleTitle: "Present Simple for Daily Habits",
          explanation: "Use simple action verbs to talk about things you do every school day.",
          correctExample: "I pack my lunchbox every morning before school.",
          incorrectExample: "I packing lunchbox yesterday morning.",
          tip: "Add an 's' for he/she/it (e.g., 'She loves art class')."
        };
        practicalText = `Tell a partner two things you do every morning before school.`;
      } else if (top === "Social Media") {
        sampleParagraphs = [
          `Using computers and learning apps is a fantastic way to explore geography, art, and science from home.`,
          `Being a smart digital citizen means keeping passwords secret and treating every online classmate with respect.`
        ];
        vocabList = [
          { word: "Password", phonetic: "/ˈpæswɜːrd/", partOfSpeech: "Noun", definition: "A secret key to protect your account.", example: "Keep your gaming password safe and secret.", illustrationIcon: "🔑" },
          { word: "Respect", phonetic: "/rɪˈspɛkt/", partOfSpeech: "Noun", definition: "Showing polite regard for others.", example: "Show respect in all online chat rooms.", illustrationIcon: "⭐" },
          { word: "Browse", phonetic: "/braʊz/", partOfSpeech: "Verb", definition: "To look through web pages casually.", example: "Browse safe kids' encyclopedia sites for homework.", illustrationIcon: "🌐" }
        ];
        grammarItem = {
          ruleTitle: "Direct Safety Commands",
          explanation: "Use imperative verbs starting sentences to give clear safety rules.",
          correctExample: "Never share your home address online.",
          incorrectExample: "You shouldn't ever sharing addresses.",
          tip: "Start right with an action verb like 'Stop', 'Ask', or 'Protect'!"
        };
        practicalText = `Make up one golden rule for internet safety using an action verb.`;
      } else {
        sampleParagraphs = [
          `Debate club is where fun meets big ideas! Students learn to research cool facts and present winning arguments.`,
          `Great speakers use polite words and solid facts to prove their point during school debates.`
        ];
        vocabList = [
          { word: "Evidence", phonetic: "/ˈɛvɪdəns/", partOfSpeech: "Noun", definition: "Facts that prove something is true.", example: "Bring good evidence to win the debate.", illustrationIcon: "🔍" },
          { word: "Opinion", phonetic: "/əˈpɪnjən/", partOfSpeech: "Noun", definition: "What you think or feel about something.", example: "Everyone can share their opinion politely.", illustrationIcon: "💭" },
          { word: "Clap", phonetic: "/klæp/", partOfSpeech: "Verb", definition: "To strike hands together in applause.", example: "Clap loudly for both debate teams!", illustrationIcon: "👏" }
        ];
        grammarItem = {
          ruleTitle: "Using 'Because' for Reasons",
          explanation: "Always back up your fun ideas by explaining 'because'!",
          correctExample: "Reading books is fun because you discover new worlds.",
          incorrectExample: "Books are fun so new worlds.",
          tip: "'Because' is your best friend when explaining why you think something!"
        };
        practicalText = `Complete this sentence aloud: 'Recess is the best part of the day because...'`;
      }
    } else if (lvl === "Junior High") {
      if (top === "Daily Life") {
        sampleParagraphs = [
          `Junior high brings new freedom: catching city transit, managing club schedules, and organizing independent study timetables.`,
          `Balancing academic responsibilities with hobbies builds essential life habits that set you up for future success.`
        ];
        vocabList = [
          { word: "Independent", phonetic: "/ˌɪndɪˈpɛndənt/", partOfSpeech: "Adjective", definition: "Doing things on your own without constant help.", example: "Managing my own study schedule makes me feel independent.", illustrationIcon: "🚀" },
          { word: "Budget", phonetic: "/ˈbʌdʒɪt/", partOfSpeech: "Noun", definition: "A smart plan for spending and saving allowance money.", example: "He set a weekly budget for snacks and stationery.", illustrationIcon: "💳" },
          { word: "Timetable", phonetic: "/ˈtaɪmˌteɪbəl/", partOfSpeech: "Noun", definition: "A schedule showing times for classes or transit.", example: "Check the bus timetable before heading out.", illustrationIcon: "🚌" }
        ];
        grammarItem = {
          ruleTitle: "Modal Verbs ('Must' vs 'Should')",
          explanation: "Use 'must' for strict rules and 'should' for great recommendations.",
          correctExample: "Students must arrive on time; they should review notes nightly.",
          incorrectExample: "Students must to arriving early.",
          tip: "Modals never take an 's' in the third person!"
        };
        practicalText = `Write two daily rules for your study routine using 'must' and 'should'.`;
      } else if (top === "Social Media") {
        sampleParagraphs = [
          `Navigating chat groups, video feeds, and digital footprints requires smart awareness of algorithms and online privacy.`,
          `Protecting your personal data ensures a positive and secure digital reputation.`
        ];
        vocabList = [
          { word: "Algorithm", phonetic: "/ˈælɡərɪðəm/", partOfSpeech: "Noun", definition: "Code that decides what posts appear in your feed.", example: "The video algorithm recommended a cool science clip.", illustrationIcon: "🤖" },
          { word: "Reputation", phonetic: "/ˌrɛpjuˈteɪʃən/", partOfSpeech: "Noun", definition: "How others view your character online and offline.", example: "Maintain a positive digital reputation.", illustrationIcon: "⭐" },
          { word: "Filter", phonetic: "/ˈfɪltər/", partOfSpeech: "Verb / Noun", definition: "To sort or screen out unwanted content.", example: "Filter out negative comments to protect your peace.", illustrationIcon: "🛡️" }
        ];
        grammarItem = {
          ruleTitle: "First Conditional for Digital Choices",
          explanation: "Talk about real future consequences using 'If + present, will + verb'.",
          correctExample: "If you adjust your privacy settings, your personal data will stay secure.",
          incorrectExample: "If you will adjust settings, data stays safe.",
          tip: "Never put 'will' directly after the word 'if'!"
        };
        practicalText = `Complete: 'If I see spam online, I will...'`;
      } else if (top === "Job Interviews") {
        sampleParagraphs = [
          `Stepping into part-time job applications or student council elections requires professional etiquette, punctuality, and a polished resume.`,
          `Making a stellar first impression starts with firm handshakes and clear, confident communication.`
        ];
        vocabList = [
          { word: "Punctual", phonetic: "/ˈpʌŋktʃuəl/", partOfSpeech: "Adjective", definition: "Arriving exactly on time.", example: "Being punctual shows great respect for interviewers.", illustrationIcon: "⏰" },
          { word: "Resume", phonetic: "/ˈrɛzʊmeɪ/", partOfSpeech: "Noun", definition: "A summary of your skills, awards, and school achievements.", example: "List your volunteer work on your student resume.", illustrationIcon: "📄" },
          { word: "Candidate", phonetic: "/ˈkændɪdɪt/", partOfSpeech: "Noun", definition: "A person applying for a role.", example: "The hiring manager interviewed three eager candidates.", illustrationIcon: "👔" }
        ];
        grammarItem = {
          ruleTitle: "Polite Indirect Questions",
          explanation: "Sound ultra-professional in interviews by softening direct questions.",
          correctExample: "Could you please tell me what the main duties of this role are?",
          incorrectExample: "What do you want me to do?",
          tip: "Start with 'Could you tell me...' for instant professional charm."
        };
        practicalText = `Practice asking about working hours politely using an indirect question format.`;
      } else {
        sampleParagraphs = [
          `Academic debate builds sharp critical thinking by challenging students to argue both sides of current global topics.`,
          `Structuring clear rebuttals and citing solid factual evidence wins debates with elegance and logic.`
        ];
        vocabList = [
          { word: "Rebuttal", phonetic: "/rɪˈbʌtəl/", partOfSpeech: "Noun", definition: "A smart reply dismantling an opponent's point.", example: "Her sharp rebuttal won over the judges instantly.", illustrationIcon: "⚔️" },
          { word: "Evidence", phonetic: "/ˈɛvɪdəns/", partOfSpeech: "Noun", definition: "Data and facts supporting your claim.", example: "Always cite verified evidence in debates.", illustrationIcon: "📊" },
          { word: "Persuade", phonetic: "/pərˈsweɪd/", partOfSpeech: "Verb", definition: "To convince someone through logic.", example: "Strong speeches persuade audiences effectively.", illustrationIcon: "🎤" }
        ];
        grammarItem = {
          ruleTitle: "Expressing Contrast ('Whereas' vs 'Although')",
          explanation: "Contrast two distinct ideas gracefully to show deep analytical balance.",
          correctExample: "Although online learning offers flexibility, classroom discussion fosters live debate.",
          incorrectExample: "Although online learning is flexible, but classroom is better.",
          tip: "Do not use 'although' and 'but' in the same sentence!"
        };
        practicalText = `Compare two study methods using 'whereas'.`;
      }
    } else if (lvl === "Senior High") {
      if (top === "Daily Life") {
        sampleParagraphs = [
          `Senior high bridges youth and independence, focusing on college entrance exams, financial literacy, and career planning.`,
          `Managing personal budgets and organizing rigorous study calendars develops the resilience needed for higher education.`
        ];
        vocabList = [
          { word: "Budgeting", phonetic: "/ˈbʌdʒɪtɪŋ/", partOfSpeech: "Noun", definition: "Planning income and expenses wisely.", example: "Smart budgeting helps students save for college tuition.", illustrationIcon: "💳" },
          { word: "Resilience", phonetic: "/rɪˈzɪliəns/", partOfSpeech: "Noun", definition: "Bouncing back quickly from setbacks.", example: "Academic resilience helps students conquer tough exams.", illustrationIcon: "🌱" },
          { word: "Autonomy", phonetic: "/ɔːˈtɒnəmi/", partOfSpeech: "Noun", definition: "Self-governance and personal independence.", example: "University bound seniors embrace newfound personal autonomy.", illustrationIcon: "🦅" }
        ];
        grammarItem = {
          ruleTitle: "Gerunds vs Infinitives in Goals",
          explanation: "Use gerunds (-ing) after preference verbs and infinitives (to + verb) after intent verbs.",
          correctExample: "She plans to study finance while avoiding unnecessary spending.",
          incorrectExample: "She plans studying finance and avoids to spend.",
          tip: "Remember: 'enjoy doing' vs 'want to do'."
        };
        practicalText = `Write a sentence about your career goals using 'plan to' and 'enjoy'.`;
      } else if (top === "Social Media") {
        sampleParagraphs = [
          `Seniors navigate sophisticated digital landscapes involving AI algorithms, cybersecurity threats, and professional branding on LinkedIn.`,
          `Media literacy ensures objective evaluation of online news, protecting users from echo chambers and misinformation.`
        ];
        vocabList = [
          { word: "Phishing", phonetic: "/ˈfɪʃɪŋ/", partOfSpeech: "Noun", definition: "Fraudulent scams stealing personal credentials.", example: "Recognize phishing links to safeguard your accounts.", illustrationIcon: "🎣" },
          { word: "Literacy", phonetic: "/ˈlɪtərəsi/", partOfSpeech: "Noun", definition: "Critical competence in interpreting media.", example: "Digital literacy stops the spread of fake news.", illustrationIcon: "📰" },
          { word: "Branding", phonetic: "/ˈbrændɪŋ/", partOfSpeech: "Noun", definition: "Managing your professional online identity.", example: "Build a positive professional branding portfolio.", illustrationIcon: "💼" }
        ];
        grammarItem = {
          ruleTitle: "Third Conditional for Past Regrets",
          explanation: "Discuss hypothetical past scenarios using 'If + past perfect, would have + participle'.",
          correctExample: "If she had enabled two-factor authentication, her account wouldn't have been compromised.",
          incorrectExample: "If she enabled 2FA, her account didn't get hacked.",
          tip: "Perfect for analyzing past case studies and security blunders!"
        };
        practicalText = `State a past tech decision using a third conditional sentence.`;
      } else if (top === "Job Interviews") {
        sampleParagraphs = [
          `Mastering interviews requires the STAR method, metric-driven storytelling, and confident executive presence.`,
          `Transforming standard answers into quantified achievement stories sets top candidates apart.`
        ];
        vocabList = [
          { word: "Quantify", phonetic: "/ˈkwɒntɪfaɪ/", partOfSpeech: "Verb", definition: "Express achievements with numbers and metrics.", example: "Quantify your club presidency by citing member growth.", illustrationIcon: "📈" },
          { word: "Competency", phonetic: "/ˈkɒmpɪtənsi/", partOfSpeech: "Noun", definition: "A proven skill set required for success.", example: "Demonstrate leadership competency during panel interviews.", illustrationIcon: "🏅" },
          { word: "Rapport", phonetic: "/ræˈpɔːr/", partOfSpeech: "Noun", definition: "A harmonious connection with interviewers.", example: "Build quick rapport through a warm smile and active listening.", illustrationIcon: "🤝" }
        ];
        grammarItem = {
          ruleTitle: "Participle Clauses for Concise Resume Summaries",
          explanation: "Start bullet points with past participle verbs for punchy professional impact.",
          correctExample: "Spearheaded by student leaders, the fundraiser generated $2,000.",
          incorrectExample: "Which was spearheaded by students, the fundraiser made money.",
          tip: "Cut unnecessary words to make your professional profile pop!"
        };
        practicalText = `Write a one-sentence achievement bullet starting with a past participle verb.`;
      } else {
        sampleParagraphs = [
          `Advanced academic writing demands precise thesis generation, empirical data backing, and airtight logical frameworks.`,
          `Scholars synthesize diverse sources to construct compelling, university-ready research essays.`
        ];
        vocabList = [
          { word: "Empirical", phonetic: "/ɪmˈpɪrɪkəl/", partOfSpeech: "Adjective", definition: "Verifiable by observation and concrete data.", example: "Back your arguments with empirical research evidence.", illustrationIcon: "🔬" },
          { word: "Paradigm", phonetic: "/ˈpærəˌdaɪm/", partOfSpeech: "Noun", definition: "A standard model or conceptual framework.", example: "The study shifted our educational paradigm entirely.", illustrationIcon: "🌐" },
          { word: "Synthesize", phonetic: "/ˈsɪnθəˌsaɪz/", partOfSpeech: "Verb", definition: "Blending multiple sources into one coherent thesis.", example: "Synthesize three authors' views into your conclusion.", illustrationIcon: "🧩" }
        ];
        grammarItem = {
          ruleTitle: "Formal Subjunctive Mood",
          explanation: "Use the clean base verb form after demand or recommendation verbs.",
          correctExample: "The committee recommended that every applicant submit original research.",
          incorrectExample: "The committee recommended that every applicant submits research.",
          tip: "Notice there is no 's' on the subjunctive verb!"
        };
        practicalText = `Draft a formal proposal sentence using the subjunctive mood.`;
      }
    } else {
      // C1 Advanced
      if (top === "Daily Life") {
        sampleParagraphs = [
          `C1 proficiency involves effortless navigation of cosmopolitan milieus through cultural fluency, stylistic dexterity, and pragmatic nuance.`,
          `Advanced speakers seamlessly adapt registers between casual idioms and sophisticated professional discourse.`
        ];
        vocabList = [
          { word: "Milieu", phonetic: "/ˈmiːljuː/", partOfSpeech: "Noun", definition: "A cultural and social environment.", example: "Thriving in a multilingual milieu requires immense linguistic dexterity.", illustrationIcon: "🌍" },
          { word: "Dexterity", phonetic: "/dɛkˈstɛrɪti/", partOfSpeech: "Noun", definition: "Mental agility and fluency in expression.", example: "Linguistic dexterity enables C1 learners to master complex registers.", illustrationIcon: "⚡" },
          { word: "Nuance", phonetic: "/ˈnuɑːns/", partOfSpeech: "Noun", definition: "Subtle shades of meaning and connotation.", example: "Appreciate the stylistic nuances of advanced literature.", illustrationIcon: "🎨" }
        ];
        grammarItem = {
          ruleTitle: "Inversion for Rhetorical Impact",
          explanation: "Invert subject and auxiliary after negative introductory adverbials.",
          correctExample: "Scarcely had she articulated her thesis when the panel engaged in debate.",
          incorrectExample: "Scarcely she had articulated her thesis.",
          tip: "Use inversion to give your writing an eloquent academic flair!"
        };
        practicalText = `Write an inverted sentence starting with 'Rarely'.`;
      } else if (top === "Social Media") {
        sampleParagraphs = [
          `Deconstruct algorithmic governance, information epistemology, and the socio-political ramifications of synthetic media.`,
          `Critical media literacy empowers scholars to interrogate digital echo chambers and data proliferation models.`
        ];
        vocabList = [
          { word: "Epistemology", phonetic: "/ɪˌpɪstɪˈɒlədʒi/", partOfSpeech: "Noun", definition: "The philosophical study of knowledge and truth.", example: "Misinformation challenges the epistemology of digital news.", illustrationIcon: "🏛️" },
          { word: "Proliferation", phonetic: "/prəˌlɪfəˈreɪʃən/", partOfSpeech: "Noun", definition: "Rapid spread or multiplication of content.", example: "The proliferation of deepfakes requires robust regulatory countermeasures.", illustrationIcon: "📈" },
          { word: "Ramification", phonetic: "/ˌræmɪfɪˈkeɪʃən/", partOfSpeech: "Noun", definition: "Complex consequences of digital trends.", example: "Examine the socio-political ramifications of targeted algorithms.", illustrationIcon: "🕸️" }
        ];
        grammarItem = {
          ruleTitle: "Cleft Sentences for Focus",
          explanation: "Use 'What...' clefts to spotlight critical arguments instantly.",
          correctExample: "What jeopardizes public discourse is the unmitigated spread of disinformation.",
          incorrectExample: "Public discourse is jeopardized by disinformation what is bad.",
          tip: "Cleft structures direct reader attention with laser focus."
        };
        practicalText = `Create a cleft sentence highlighting a key digital media challenge.`;
      } else if (top === "Job Interviews") {
        sampleParagraphs = [
          `Executive interviews require masterclass strategic framing, metrics-driven storytelling, and high-stakes diplomatic composure.`,
          `Top candidates align multi-stakeholder priorities and project visionary leadership presence.`
        ];
        vocabList = [
          { word: "Stakeholder", phonetic: "/ˈsteɪkˌhoʊldər/", partOfSpeech: "Noun", definition: "An invested party in an enterprise.", example: "Balance competing priorities across diverse corporate stakeholders.", illustrationIcon: "🤝" },
          { word: "Foresight", phonetic: "/ˈfɔːrˌsaɪt/", partOfSpeech: "Noun", definition: "Strategic prediction and proactive planning.", example: "Executive foresight prevents industry disruption blind spots.", illustrationIcon: "🔭" },
          { word: "Diplomacy", phonetic: "/dɪˈploʊməsi/", partOfSpeech: "Noun", definition: "Tactful handling of high-stakes negotiations.", example: "High-level leadership demands seasoned corporate diplomacy.", illustrationIcon: "🕊️" }
        ];
        grammarItem = {
          ruleTitle: "Attenuated Modals & Subjunctive Diplomacy",
          explanation: "Project authority with grace using softened modal verbs ('might', 'would').",
          correctExample: "It would behoove the executive board to evaluate these ROI metrics prior to capital allocation.",
          incorrectExample: "The board must look at these numbers now.",
          tip: "Attenuated phrasing conveys elite executive polish."
        };
        practicalText = `Pitch a strategic initiative using an attenuated modal phrase.`;
      } else {
        sampleParagraphs = [
          `Advanced academic discourse explores ontological philosophy, phenomenological perception, and rigorous meta-ethical paradigms.`,
          `Scholars dismantle prevailing dogmas through airtight logic and peerless rhetorical precision.`
        ];
        vocabList = [
          { word: "Ontological", phonetic: "/ˌɒntəˈlɒdʒɪkəl/", partOfSpeech: "Adjective", definition: "Relating to the fundamental nature of being.", example: "Debating the ontological status of machine consciousness.", illustrationIcon: "🌌" },
          { word: "Phenomenological", phonetic: "/fɪˌnɒmɪnəˈlɒdʒɪkəl/", partOfSpeech: "Adjective", definition: "Examining subjective structures of human experience.", example: "A phenomenological analysis of virtual reality immersion.", illustrationIcon: "👁️" },
          { word: "Rigor", phonetic: "/ˈrɪɡər/", partOfSpeech: "Noun", definition: "Exhaustive thoroughness and academic accuracy.", example: "Doctoral dissertations demand uncompromising intellectual rigor.", illustrationIcon: "💎" }
        ];
        grammarItem = {
          ruleTitle: "Concessive Framing ('Be that as it may')",
          explanation: "Acknowledge opposing scholarly viewpoints gracefully before refuting them.",
          correctExample: "Be that as it may, empirical meta-analyses corroborate the primary hypothesis.",
          incorrectExample: "Although that's true, but my theory wins.",
          tip: "Concessive transitions signal elite academic maturity."
        };
        practicalText = `Open a counter-argument response with a concessive transition phrase.`;
      }
    }

    return {
      id: targetId,
      title: `${lvl}: Complete Textbook Chapter & Masterclass on ${top}`,
      level: lvl,
      category: top,
      summary: `An engaging, concise textbook module designed for ${lvl} students. Explore targeted reading passages, bite-sized vocabulary cards with icons, clear grammar rules, and quick practical tips.`,
      illustration: top === "Daily Life" ? "🛒🌍📖" : top === "Social Media" ? "📱💬🌐" : top === "Job Interviews" ? "💼👔📈" : "⚖️🏛️🧠",
      accentColor: "bg-sky-50 border-sky-100 text-sky-600",
      sections: [
        {
          heading: `Chapter 1: Core Reading & Context`,
          subheading: `Quick and fun introduction to ${top} for ${lvl}`,
          paragraphs: sampleParagraphs,
          vocabulary: vocabList,
          grammar: grammarItem,
          practicalApplication: practicalText,
          keyTakeaways: [
            `Understanding the main concepts of ${top} easily.`,
            `Mastering essential vocabulary words with clear examples.`,
            `Applying simple grammar rules to your daily English practice.`
          ]
        },
        {
          heading: `Chapter 2: Grammar & Word Mastery`,
          subheading: "Essential rules and pattern building",
          paragraphs: [
            `Building strong sentences is like building with blocks—every piece has a special job.`,
            `By keeping our language clear, correct, and structured, anyone can understand our message instantly.`
          ],
          vocabulary: [
            { word: "Structure", phonetic: "/ˈstrʌktʃər/", partOfSpeech: "Noun", definition: "The arrangement of parts in a sentence.", example: "Good sentence structure makes reading effortless.", illustrationIcon: "🏗️" },
            { word: "Clarity", phonetic: "/ˈklærɪti/", partOfSpeech: "Noun", definition: "Being easy to understand and clear.", example: "Always speak with complete clarity.", illustrationIcon: "✨" }
          ],
          grammar: {
            ruleTitle: "Building Clear Sentences",
            explanation: "Focus on subject-verb agreement and punctuation to keep your ideas organized.",
            correctExample: "Clear sentences help readers understand your thoughts instantly.",
            incorrectExample: "Clear sentence helping reader understood thoughts.",
            tip: "Read your sentences out loud to catch missing words!"
          },
          practicalApplication: `Take one sentence you wrote today and check if it has a clear subject and action verb.`,
          keyTakeaways: [
            `Keeping grammar simple and accurate.`,
            `Using punctuation effectively.`,
            `Checking work aloud for natural flow.`
          ]
        },
        {
          heading: `Chapter 3: Quick Practice & Real-World Use`,
          subheading: "Putting knowledge into action",
          paragraphs: [
            `The best way to learn English is to use it right away in real life!`,
            `Try out your new words and grammar patterns with friends, family, or study partners today.`
          ],
          vocabulary: [
            { word: "Practice", phonetic: "/ˈpræktɪs/", partOfSpeech: "Verb", definition: "Doing something regularly to improve.", example: "Daily practice leads to English fluency.", illustrationIcon: "🎯" },
            { word: "Success", phonetic: "/səkˈsɛs/", partOfSpeech: "Noun", definition: "Achieving your learning goals.", example: "Every new word you learn is a step toward success.", illustrationIcon: "🏆" }
          ],
          grammar: {
            ruleTitle: "Tone and Confidence",
            explanation: "Speak and write with an encouraging, confident tone.",
            correctExample: "I am excited to practice my English skills every day.",
            incorrectExample: "Me no like talking English much.",
            tip: "Confidence is your superpower when learning languages!"
          },
          practicalApplication: `Share one cool thing you learned in this chapter with someone nearby!`,
          keyTakeaways: [
            `Using new words in everyday conversations.`,
            `Building lasting language habits.`,
            `Celebrating small learning victories.`
          ]
        }
      ]
    };
  };

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
            Master varied interactive quizzes and exhaustive textbook reading chapters tailored from Kindergarten to C1 Advanced. Fun, simple, and practical learning awaits you!
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
          <p className="text-sm text-gray-500 mb-8">Total Questions: {currentModule.questions.length} (5 Completely Unique Questions in this Batch)</p>

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

  // STUDY MATERIAL READER VIEW (FULL TEXTBOOK CHAPTERS WITH DETAILED VOCABULARY & GRAMMAR)
  const currentStudyGuide = activeStudyId ? getDynamicStudyGuide(selectedLevel, selectedTopic) : null;

  if (currentStudyGuide) {
    return (
      <main className="min-h-screen bg-[#FAFAFA] text-gray-800 font-sans p-6 md:p-12">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-14 shadow-sm border border-gray-200">
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{currentStudyGuide.title}</h2>
          <p className="text-gray-600 text-base md:text-lg mb-10 pb-8 border-b border-gray-100 leading-relaxed">
            {currentStudyGuide.summary}
          </p>

          <div className="mb-8 flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">
              📖 Textbook Reading Chapters (Click any section to expand & study)
            </h3>
            <span className="text-xs bg-sky-50 text-sky-600 font-semibold px-3 py-1 rounded-full border border-sky-100">
              📚 Study Mode
            </span>
          </div>

          {/* CHAPTER SECTIONS STACK */}
          <div className="space-y-8">
            {currentStudyGuide.sections.map((sec, idx) => {
              const isExpanded = !!expandedSections[idx];

              return (
                <div
                  key={idx}
                  className="border-2 border-gray-200 rounded-3xl overflow-hidden bg-white shadow-sm transition hover:border-[#55b1d4]/60"
                >
                  <div
                    onClick={() => setExpandedSections(prev => ({ ...prev, [idx]: !isExpanded }))}
                    className="p-6 md:p-8 bg-gray-50/80 hover:bg-sky-50/20 cursor-pointer flex justify-between items-center transition"
                  >
                    <div className="flex items-center gap-4">
                      <span className="bg-[#55b1d4] text-white w-10 h-10 rounded-full flex items-center justify-center text-base font-bold shadow-xs shrink-0">
                        {idx + 1}
                      </span>
                      <div>
                        <h4 className="text-lg md:text-xl font-bold text-gray-900">{sec.heading}</h4>
                        <p className="text-xs md:text-sm text-gray-500 mt-1">{sec.subheading}</p>
                      </div>
                    </div>
                    <span className="text-gray-400 font-bold text-xl transition transform">
                      {isExpanded ? "▲ Collapse" : "▼ Read Chapter"}
                    </span>
                  </div>

                  {isExpanded && (
                    <div className="p-6 md:p-10 space-y-8 bg-white border-t border-gray-100 animate-fade-in">
                      {/* Reading Passages */}
                      <div className="space-y-5">
                        <h5 className="text-xs font-bold uppercase tracking-wider text-[#55b1d4]">
                          📖 Reading Passage & Context
                        </h5>
                        {sec.paragraphs.map((para, pIdx) => (
                          <p key={pIdx} className="text-base md:text-lg text-gray-700 leading-relaxed">
                            {para}
                          </p>
                        ))}
                      </div>

                      {/* Vocabulary Breakdown Section with Pictures/Icons */}
                      <div className="bg-pink-50/40 p-6 rounded-2xl border border-pink-100 space-y-4">
                        <h5 className="text-xs font-bold text-[#E95599] uppercase tracking-wider block">
                          ✦ Vocabulary & Word Etymology:
                        </h5>
                        <div className="grid md:grid-cols-2 gap-4">
                          {sec.vocabulary.map((vocab, vIdx) => (
                            <div key={vIdx} className="bg-white p-4 rounded-xl border border-pink-100 shadow-xs space-y-1.5">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-gray-900 flex items-center gap-2">
                                  <span className="text-2xl">{vocab.illustrationIcon}</span> {vocab.word}
                                </span>
                                <span className="text-xs bg-pink-100 text-[#E95599] font-semibold px-2 py-0.5 rounded">
                                  {vocab.partOfSpeech}
                                </span>
                              </div>
                              <p className="text-xs text-gray-400 font-mono">{vocab.phonetic}</p>
                              <p className="text-xs text-gray-700 mt-1"><strong>Definition:</strong> {vocab.definition}</p>
                              <p className="text-xs text-gray-600 italic mt-1 bg-gray-50 p-2 rounded">"{vocab.example}"</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Grammar Mechanics Section */}
                      <div className="bg-amber-50/50 p-6 rounded-2xl border border-amber-200 space-y-3">
                        <h5 className="text-xs font-bold text-amber-900 uppercase tracking-wider block">
                          ✦ Grammar Mechanics & Rules: {sec.grammar.ruleTitle}
                        </h5>
                        <p className="text-sm text-amber-950 leading-relaxed">{sec.grammar.explanation}</p>
                        <div className="grid md:grid-cols-2 gap-3 pt-2">
                          <div className="bg-green-50 p-3 rounded-xl border border-green-200 text-xs text-green-900">
                            <strong className="block text-green-950 mb-1">✓ Correct Usage:</strong>
                            {sec.grammar.correctExample}
                          </div>
                          <div className="bg-red-50 p-3 rounded-xl border border-red-200 text-xs text-red-900">
                            <strong className="block text-red-950 mb-1">✗ Incorrect Usage:</strong>
                            {sec.grammar.incorrectExample}
                          </div>
                        </div>
                        <p className="text-xs bg-amber-100/70 p-3 rounded-lg text-amber-900 font-medium mt-2">
                          💡 <strong>Rule Tip:</strong> {sec.grammar.tip}
                        </p>
                      </div>

                      {/* Practical Application Walkthrough */}
                      <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100 space-y-2">
                        <h5 className="text-xs font-bold text-indigo-900 uppercase tracking-wider block">
                          ✦ Practical Real-World Application:
                        </h5>
                        <p className="text-sm text-indigo-950 leading-relaxed">{sec.practicalApplication}</p>
                      </div>

                      {/* Key Takeaways */}
                      <div className="bg-sky-50/60 p-6 rounded-2xl border border-sky-100 space-y-3">
                        <h5 className="text-xs font-bold text-sky-900 uppercase tracking-wider block">
                          ✦ Chapter Key Takeaways:
                        </h5>
                        <ul className="space-y-2">
                          {sec.keyTakeaways.map((takeaway, tIdx) => (
                            <li key={tIdx} className="text-sm md:text-base text-sky-950 font-medium flex items-start gap-2">
                              <span className="text-[#55b1d4] font-bold">✓</span> {takeaway}
                            </li>
                          ))}
                        </ul>
                      </div>
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
            📝 Practice Quizzes (Varied)
          </button>
          <button
            onClick={() => setActiveTab("materials")}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition cursor-pointer ${
              activeTab === "materials" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            📚 Study Materials (Textbook)
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
          Choose your school level and topic category below to explore exhaustive textbook reading materials and 25 uniquely varied quiz questions across 5 distinct batches.
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

      {/* TAB 1: PRACTICE QUIZZES (STRICTLY FILTERED & FULLY VARIED ACROSS 5 BATCHES) */}
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
                  Start Quiz (5 Unique Questions) →
                </button>
              </div>
            ))}
        </section>
      )}

      {/* TAB 2: STUDY MATERIALS (DETAILED TEXTBOOK CHAPTERS WITH VOCABULARY & GRAMMAR) */}
      {activeTab === "materials" && (
        <section className="max-w-4xl mx-auto space-y-6">
          {(() => {
            const guide = getDynamicStudyGuide(selectedLevel, selectedTopic);

            return (
              <div
                onClick={() => setActiveStudyId(guide.id)}
                className="bg-white rounded-3xl border border-gray-200 shadow-sm transition overflow-hidden group flex flex-col md:flex-row items-center hover:border-[#55b1d4] hover:shadow-md cursor-pointer"
              >
                <div className={`w-full md:w-48 h-36 md:h-full flex items-center justify-center text-5xl border-r border-gray-100 ${guide.accentColor}`}>
                  {guide.illustration}
                </div>
                <div className="p-8 flex-1">
                  <div className="flex justify-between items-center bg-transparent">
                    <span className="bg-[#55b1d4]/10 text-[#55b1d4] text-xs font-bold px-3 py-1 rounded-full">
                      {guide.level}
                    </span>
                    <span className="text-xs text-gray-400 font-medium group-hover:text-[#55b1d4] transition">
                      Open Detailed Textbook Chapter 📖 →
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 mt-3">{guide.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{guide.summary}</p>
                </div>
              </div>
            );
          })()}
        </section>
      )}
    </main>
  );
}