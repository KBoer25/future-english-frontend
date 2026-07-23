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

type ReadingSection = {
  heading: string;
  subheading: string;
  paragraphs: string[];
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

  // FULLY UNIQUE, DIVERSE, AND DETAILED QUIZ POOLS FOR EVERY SINGLE LEVEL, TOPIC, AND BATCH (1 TO 5)
  const getCurrentLevelQuizzes = () => {
    const list: Record<string, ModuleData> = {};
    const icons = ["🍎", "📱", "ABC", "🔢", "🎒", "🔬", "🗺️", "💼", "🏛️", "📊"];

    topics.forEach((top, topIdx) => {
      for (let batchNum = 1; batchNum <= 5; batchNum++) {
        const key = `${selectedLevel}-${top}-Quiz${batchNum}`.replace(/\s+/g, "");
        let questions: Question[] = [];

        // 1. KINDERGARTEN
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
            questions = pools[batchNum - 1].map(q => ({
              id: q.id, prompt: q.prompt, imageIllustration: q.img,
              options: q.opts.map(o => ({ label: o.l, isCorrect: o.c })),
              explanation: q.exp
            }));
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
                { id: 1, prompt: "When playing a game, is it good to wait your turn?", img: "⏳", opts: [{ l: "Yes, taking turns is fair", c: true }, { l: "No, grab everything", c: false }], exp: "Turns ensure fairness." },
                { id: 2, prompt: "If you accidentally bump into someone, what should you say?", img: "🙇", opts: [{ l: "I am sorry / Excuse me", c: true }, { l: "Nothing", c: false }], exp: "Apologizing is courteous." },
                { id: 3, prompt: "How can you show a friend you are listening when they talk?", img: "👂", opts: [{ l: "Look at them and nod quietly", c: true }, { l: "Cover your ears", c: false }], exp: "Active listening builds trust." },
                { id: 4, prompt: "Is it kind to include new classmates in your games?", img: "🌟", opts: [{ l: "Yes, welcoming others is wonderful", c: true }, { l: "No, exclude them", c: false }], exp: "Inclusivity makes friends." },
                { id: 5, prompt: "What should you do with a broken classroom crayon?", img: "🖍️", opts: [{ l: "Tell the teacher calmly", c: true }, { l: "Hide it", c: false }], exp: "Communication solves mishaps." }
              ],
              [
                { id: 1, prompt: "How should you talk inside a quiet library?", img: "📚", opts: [{ l: "Use a soft quiet whisper", c: true }, { l: "Shout loudly", c: false }], exp: "Quiet voices respect spaces." },
                { id: 2, prompt: "What should you do when a teacher is speaking to the class?", img: "👩‍🏫", opts: [{ l: "Listen attentively and stay quiet", c: true }, { l: "Talk over them", c: false }], exp: "Listening shows respect." },
                { id: 3, prompt: "Is it good to smile and wave at neighbors?", img: "👋", opts: [{ l: "Yes, it spreads friendliness", c: true }, { l: "No", c: false }], exp: "Smiling creates warmth." },
                { id: 4, prompt: "What should you do if a friend shares their snack with you?", img: "🍎", opts: [{ l: "Say thank you gratefully", c: true }, { l: "Take it without words", c: false }], exp: "Gratitude is essential." },
                { id: 5, prompt: "How do you act when you win a friendly game?", img: "🏆", opts: [{ l: "Be humble and kind to others", c: true }, { l: "Brag loudly", c: false }], exp: "Humility makes a good winner." }
              ],
              [
                { id: 1, prompt: "What is a great way to make a new friend at school?", img: "🤝", opts: [{ l: "Introduce yourself with a friendly smile", c: true }, { l: "Frown and look away", c: false }], exp: "Introductions start friendships." },
                { id: 2, prompt: "If two friends are arguing over a toy, what can you suggest?", img: "🧩", opts: [{ l: "Take turns playing with it together", c: true }, { l: "Throw the toy away", c: false }], exp: "Compromise resolves fights." },
                { id: 3, prompt: "How do you show appreciation when someone helps you tie your shoes?", img: "👟", opts: [{ l: "Say thank you for your help", c: true }, { l: "Walk away", c: false }], exp: "Acknowledging help is polite." },
                { id: 4, prompt: "Is it polite to interrupt someone while they are speaking?", img: "🗣️", opts: [{ l: "No, wait until they finish", c: true }, { l: "Yes, speak over them", c: false }], exp: "Patience matters in dialogue." },
                { id: 5, prompt: "What emotion does a warm hug convey?", img: "🫂", opts: [{ l: "Love, care, and comfort", c: true }, { l: "Anger", c: false }], exp: "Hugs express affection." }
              ],
              [
                { id: 1, prompt: "What should you do after playing with your building blocks?", img: "📦", opts: [{ l: "Clean up and put them back in the box", c: true }, { l: "Leave them on the floor", c: false }], exp: "Cleaning up shows responsibility." },
                { id: 2, prompt: "How do you ask someone if you can join their game?", img: "🎮", opts: [{ l: "May I please play with you?", c: true }, { l: "Give me your game", c: false }], exp: "Polite asking builds rapport." },
                { id: 3, prompt: "What should you say when someone says 'Good morning' to you?", img: "☀️", opts: [{ l: "Good morning to you too!", c: true }, { l: "Silence", c: false }], exp: "Returning greetings is polite." },
                { id: 4, prompt: "Is it important to cheer for your classmates during sports day?", img: "🏅", opts: [{ l: "Yes, encouragement builds team spirit", c: true }, { l: "No", c: false }], exp: "Cheering supports peers." },
                { id: 5, prompt: "What does it mean to be a good helper at home?", img: "🧹", opts: [{ l: "Assisting family members with small tasks", c: true }, { l: "Making more messes", c: false }], explanation: "Helping builds teamwork." }
              ]
            ];
            questions = pools[batchNum - 1].map(q => ({
              id: q.id, prompt: q.prompt, imageIllustration: q.img,
              options: q.opts.map(o => ({ label: o.l, isCorrect: o.c })),
              explanation: "exp" in q ? (q.exp as string) : (q.explanation as string)
            }));
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
            questions = pools[batchNum - 1].map(q => ({
              id: q.id, prompt: q.prompt, imageIllustration: q.img,
              options: q.opts.map(o => ({ label: o.l, isCorrect: o.c })),
              explanation: "exp" in q ? (q.exp as string) : (q.explanation as string)
            }));
          }
        } 
        // 2. PRIMARY SCHOOL
        else if (selectedLevel === "Primary School") {
          if (top === "Daily Life") {
            const pools = [
              [
                { id: 1, prompt: "Which school subject involves addition and subtraction?", img: "📐", opts: [{ l: "Mathematics", c: true }, { l: "Art", c: false }], exp: "Math deals with numbers." },
                { id: 2, prompt: "What tool erases graphite pencil marks?", img: "📝", opts: [{ l: "An eraser", c: true }, { l: "A ruler", c: false }], exp: "Erasers clean pencil." },
                { id: 3, prompt: "Where do kids play outside during recess?", img: "⚽", opts: [{ l: "The school playground", c: true }, { l: "The principal's desk", c: false }], exp: "Playgrounds are outdoor." },
                { id: 4, prompt: "What instrument draws straight lines?", img: "📏", opts: [{ l: "A ruler", c: true }, { l: "A sponge", c: false }], exp: "Rulers give straight lines." },
                { id: 5, prompt: "Who helps students when they feel sick?", img: "🏥", opts: [{ l: "The school nurse", c: true }, { l: "The music teacher", c: false }], exp: "Nurses handle health." }
              ],
              [
                { id: 1, prompt: "What writing tool uses liquid blue or black ink inside a casing?", img: "✒️", opts: [{ l: "A ballpoint pen", c: true }, { l: "A wooden block", c: false }], exp: "Pens use liquid ink." },
                { id: 2, prompt: "What book gives definitions and meanings of English words?", img: "📖", opts: [{ l: "A dictionary", c: true }, { l: "A comic book", c: false }], exp: "Dictionaries define words." },
                { id: 3, prompt: "Where do you store your textbooks, pencils, and lunchbox at school?", img: "🎒", opts: [{ l: "In a school backpack", c: true }, { l: "In your pocket", c: false }], exp: "Backpacks carry supplies." },
                { id: 4, prompt: "What school room is filled with computers and keyboards?", img: "💻", opts: [{ l: "Computer lab", c: true }, { l: "Gymnasium", c: false }], exp: "Computer labs hold PCs." },
                { id: 5, prompt: "Who is the head leader of an entire elementary school?", img: "🏫", opts: [{ l: "The principal", c: true }, { l: "The bus driver", c: false }], exp: "Principals lead schools." }
              ],
              [
                { id: 1, prompt: "What container holds fresh water or juice in your backpack?", img: "🍼", opts: [{ l: "A water bottle", c: true }, { l: "A shoebox", c: false }], exp: "Water bottles hold drinks." },
                { id: 2, prompt: "What class lets children paint, draw, and sculpt with clay?", img: "🎨", opts: [{ l: "Art class", c: true }, { l: "Math class", c: false }], exp: "Art fosters creativity." },
                { id: 3, prompt: "What book lists all the dates, months, and school holidays?", img: "📅", opts: [{ l: "A school calendar", c: true }, { l: "A novel", c: false }], exp: "Calendars track dates." },
                { id: 4, prompt: "What do you wear during physical education (PE) class?", img: "👟", opts: [{ l: "Comfortable sportswear and sneakers", c: true }, { l: "Formal suit", c: false }], exp: "Sportswear aids movement." },
                { id: 5, prompt: "Where do students eat their packed lunches or cafeteria meals?", img: "🥪", opts: [{ l: "The school cafeteria", c: true }, { l: "The science lab", c: false }], exp: "Cafeterias are for dining." }
              ],
              [
                { id: 1, prompt: "What tool do you use to cut construction paper cleanly?", img: "✂️", opts: [{ l: "Safety scissors", c: true }, { l: "A fork", c: false }], exp: "Scissors cut paper." },
                { id: 2, prompt: "What class teaches running, jumping, and team sports?", img: "🏃", opts: [{ l: "Physical Education (PE)", c: true }, { l: "Spelling", c: false }], exp: "PE promotes fitness." },
                { id: 3, prompt: "What device rings loudly to signal the start and end of classes?", img: "🔔", opts: [{ l: "The school bell", c: true }, { l: "A doorbell", c: false }], exp: "Bells signal schedules." },
                { id: 4, prompt: "What sticky adhesive is used to attach paper cutouts together?", img: "🧴", opts: [{ l: "Glue stick", c: true }, { l: "Toothpaste", c: false }], exp: "Glue bonds paper." },
                { id: 5, prompt: "Who drives students safely to and from school each day?", img: "🚌", opts: [{ l: "The school bus driver", c: true }, { l: "The pilot", c: false }], exp: "Bus drivers transport kids." }
              ],
              [
                { id: 1, prompt: "What notebook contains lined paper for practicing handwriting?", img: "📓", opts: [{ l: "A lined exercise book", c: true }, { l: "A sketchbook", c: false }], exp: "Exercise books hold writing." },
                { id: 2, prompt: "What musical instrument with black and white keys is played in music class?", img: "🎹", opts: [{ l: "Piano or keyboard", c: true }, { l: "Drumsticks", c: false }], exp: "Pianos have keys." },
                { id: 3, prompt: "What desk accessory holds loose papers together securely without glue?", img: "📎", opts: [{ l: "A paperclip", c: true }, { l: "A rubber band", c: false }], exp: "Paperclips hold sheets." },
                { id: 4, prompt: "Where do students borrow storybooks to read at home?", img: "📚", opts: [{ l: "The school library", c: true }, { l: "The cafeteria", c: false }], exp: "Libraries lend books." },
                { id: 5, prompt: "What protective covering keeps school textbooks clean?", img: "📖", opts: [{ l: "A plastic book cover", c: true }, { l: "A paper towel", c: false }], exp: "Covers protect books." }
              ]
            ];
            questions = pools[batchNum - 1].map(q => ({
              id: q.id, prompt: q.prompt, imageIllustration: q.img,
              options: q.opts.map(o => ({ label: o.l, isCorrect: o.c })),
              explanation: "exp" in q ? (q.exp as string) : (q.explanation as string)
            }));
          } else if (top === "Social Media") {
            const pools = [
              [
                { id: 1, prompt: "Should you share your home address or password online?", img: "🔒", opts: [{ l: "Never share private info", c: true }, { l: "Share freely", c: false }], exp: "Protect info." },
                { id: 2, prompt: "What is cyberbullying?", img: "💻", opts: [{ l: "Being mean online", c: true }, { l: "Playing games", c: false }], exp: "Online harassment." },
                { id: 3, prompt: "Who should you tell if someone sends unkind messages?", img: "👨‍👩‍👧", opts: [{ l: "A trusted adult or teacher", c: true }, { l: "Keep it secret", c: false }], exp: "Adults help." },
                { id: 4, prompt: "Is it healthy to stare at screens all day?", img: "🌳", opts: [{ l: "No, balance with play", c: true }, { l: "Yes", c: false }], exp: "Balance is key." },
                { id: 5, prompt: "What does posting respectful comments show?", img: "⭐", opts: [{ l: "Good digital citizenship", c: true }, { l: "Bad manners", c: false }], exp: "Respect is good." }
              ],
              [
                { id: 1, prompt: "If an online popup game offers free prizes if you click a strange link, what should you do?", img: "⚠️", opts: [{ l: "Do not click; close the window", c: true }, { l: "Click immediately", c: false }], exp: "Scams use fake prizes." },
                { id: 2, prompt: "Is your online screen name or avatar considered private personal data?", img: "🛡️", opts: [{ l: "Yes, protect your online identity", c: true }, { l: "No", c: false }], exp: "Identity safety matters." },
                { id: 3, prompt: "What should you do if someone online makes you feel uncomfortable?", img: "🛑", opts: [{ l: "Block them and tell a parent", c: true }, { l: "Chat with them more", c: false }], exp: "Blocking stops creeps." },
                { id: 4, prompt: "Why is it important to use strong passwords with numbers and symbols?", img: "🔑", opts: [{ l: "To stop hackers from breaking in", c: true }, { l: "To forget them easily", c: false }], exp: "Security stops theft." },
                { id: 5, prompt: "Are everything you read online or see in videos 100% true?", img: "📰", opts: [{ l: "No, check facts with adults", c: true }, { l: "Yes, always", c: false }], exp: "Misinformation exists." }
              ],
              [
                { id: 1, prompt: "What is a digital footprint?", img: "👣", opts: [{ l: "The permanent record of your online activity", c: true }, { l: "Footprints in sand", c: false }], exp: "Data stays online." },
                { id: 2, prompt: "Should you post pictures of your school name badge or front door online?", img: "🏠", opts: [{ l: "No, keep locations private", c: true }, { l: "Yes", c: false }], exp: "Location safety." },
                { id: 3, prompt: "How can you be kind in online multiplayer video game chats?", img: "🎮", opts: [{ l: "Encourage teammates and use polite words", c: true }, { l: "Insult others", c: false }], exp: "Kindness in gaming." },
                { id: 4, prompt: "Who is responsible for keeping your tablet or computer secure?", img: "🧑‍💻", opts: [{ l: "You and your parents", c: true }, { l: "Nobody", c: false }], exp: "Shared responsibility." },
                { id: 5, prompt: "What should you do before downloading a new game app on a phone?", img: "📱", opts: [{ l: "Ask a parent or guardian for permission", c: true }, { l: "Download right away", c: false }], exp: "Parental consent." }
              ],
              [
                { id: 1, prompt: "What is netiquette?", img: "💻", opts: [{ l: "Polite and respectful manners when communicating online", c: true }, { l: "Internet cable wire", c: false }], exp: "Online manners." },
                { id: 2, prompt: "What should you do if you receive a mean text message from a schoolmate?", img: "📵", opts: [{ l: "Save the message and show a trusted adult", c: true }, { l: "Reply with meaner insults", c: false }], exp: "Evidence and adults." },
                { id: 3, prompt: "Why is it unsafe to meet someone in person whom you only met in an online game?", img: "⚠️", opts: [{ l: "Online strangers may not be who they pretend to be", c: true }, { l: "They might bring you a cake", c: false }], exp: "Stranger safety." },
                { id: 4, prompt: "What does it mean to respect someone's privacy online?", img: "🔒", opts: [{ l: "Not sharing their private photos or chats without permission", c: true }, { l: "Posting their secrets", c: false }], exp: "Privacy respect." },
                { id: 5, prompt: "How can screen time limits help your daily routine?", img: "⏰", opts: [{ l: "They leave time for homework, sleep, and outdoor play", c: true }, { l: "They make time pass slower", c: false }], exp: "Balanced routine." }
              ],
              [
                { id: 1, prompt: "What is spam in email or messaging inboxes?", img: "🗑️", opts: [{ l: "Unwanted junk messages sent to many people at once", c: true }, { l: "Important homework from teachers", c: false }], exp: "Junk messages." },
                { id: 2, prompt: "What should you do if your tablet password is guessed by a sibling?", img: "🔐", opts: [{ l: "Change your password immediately to a new secret one", c: true }, { l: "Leave it unlocked", c: false }], exp: "Password security." },
                { id: 3, prompt: "Why is cyber security awareness important for kids?", img: "🛡️", opts: [{ l: "It helps you navigate the digital world safely and securely", c: true }, { l: "It is just a school subject", c: false }], exp: "Safe navigation." },
                { id: 4, prompt: "What is an online profile picture safety rule?", img: "🖼️", opts: [{ l: "Use avatars or illustrations instead of private family photos", c: true }, { l: "Post pictures of your house key", c: false }], exp: "Avatar safety." },
                { id: 5, prompt: "What should you do if an ad on a website pops up asking you to download a mystery file?", img: "❌", opts: [{ l: "Close the browser tab without downloading anything", c: true }, { l: "Click download", c: false }], exp: "Avoid mystery files." }
              ]
            ];
            questions = pools[batchNum - 1].map(q => ({
              id: q.id, prompt: q.prompt, imageIllustration: q.img,
              options: q.opts.map(o => ({ label: o.l, isCorrect: o.c })),
              explanation: "exp" in q ? (q.exp as string) : (q.explanation as string)
            }));
          } else {
            const pools = [
              [
                { id: 1, prompt: "In a story, what do we call the main character?", img: "📖", opts: [{ l: "The protagonist", c: true }, { l: "The index", c: false }], exp: "Main hero." },
                { id: 2, prompt: "What do plants need from the sun?", img: "🌱", opts: [{ l: "Sunlight and water", c: true }, { l: "Soda", c: false }], exp: "Photosynthesis." },
                { id: 3, prompt: "What is a capital city?", img: "🗺️", opts: [{ l: "The governing hub", c: true }, { l: "A village", c: false }], exp: "Government center." },
                { id: 4, prompt: "Which state of matter is ice?", img: "🧊", opts: [{ l: "Solid", c: true }, { l: "Gas", c: false }], exp: "Solid water." },
                { id: 5, prompt: "What do animals that eat only plants called?", img: "🌿", opts: [{ l: "Herbivores", c: true }, { l: "Carnivores", c: false }], exp: "Plant eaters." }
              ],
              [
                { id: 1, prompt: "What part of a plant absorbs water underground?", img: "🌱", opts: [{ l: "The roots", c: true }, { l: "The petals", c: false }], exp: "Roots absorb water." },
                { id: 2, prompt: "What is the largest ocean on planet Earth?", img: "🌊", opts: [{ l: "The Pacific Ocean", c: true }, { l: "A swimming pool", c: false }], exp: "Pacific is largest." },
                { id: 3, prompt: "What gas do humans breathe out that plants absorb?", img: "💨", opts: [{ l: "Carbon dioxide", c: true }, { l: "Pure gold", c: false }], exp: "CO2 exchange." },
                { id: 4, prompt: "Which planet in our solar system is known as the Red Planet?", img: "🔴", opts: [{ l: "Mars", c: true }, { l: "Venus", c: false }], exp: "Mars is red iron oxide." },
                { id: 5, prompt: "What natural force pulls objects down toward the ground?", img: "🍏", opts: [{ l: "Gravity", c: true }, { l: "Magnetism", c: false }], exp: "Gravity pulls down." }
              ],
              [
                { id: 1, prompt: "What do we call a baby frog before it grows legs?", img: "🐸", opts: [{ l: "A tadpole", c: true }, { l: "A kitten", c: false }], exp: "Tadpoles become frogs." },
                { id: 2, prompt: "Which direction does the sun rise every morning?", img: "🌅", opts: [{ l: "In the East", c: true }, { l: "In the West", c: false }], exp: "East sunrise." },
                { id: 3, prompt: "What is the hardest natural substance found on Earth?", img: "💎", opts: [{ l: "Diamond", c: true }, { l: "Wood", c: false }], exp: "Diamonds are hardest." },
                { id: 4, prompt: "How many continents are there on Earth?", img: "🌍", opts: [{ l: "Seven continents", c: true }, { l: "Three continents", c: false }], exp: "7 global continents." },
                { id: 5, prompt: "What type of animal is a whale living in the ocean?", img: "🐋", opts: [{ l: "A marine mammal", c: true }, { l: "A fish", c: false }], exp: "Whales are mammals." }
              ],
              [
                { id: 1, prompt: "What process turns liquid water into invisible vapor gas?", img: "♨️", opts: [{ l: "Evaporation", c: true }, { l: "Freezing", c: false }], exp: "Water evaporates." },
                { id: 2, prompt: "Which bird is famous for being unable to fly but swimming well?", img: "🐧", opts: [{ l: "Penguin", c: true }, { l: "Eagle", c: false }], exp: "Penguins swim." },
                { id: 3, prompt: "What layer of gases surrounds planet Earth?", img: "☁️", opts: [{ l: "The atmosphere", c: true }, { l: "The crust", c: false }], exp: "Atmosphere protects Earth." },
                { id: 4, prompt: "What is the center of our solar system?", img: "☀️", opts: [{ l: "The Sun", c: true }, { l: "The Moon", c: false }], exp: "Sun is center." },
                { id: 5, prompt: "What instrument measures hot and cold temperatures?", img: "🌡️", opts: [{ l: "A thermometer", c: true }, { l: "A barometer", c: false }], exp: "Thermometers check heat." }
              ],
              [
                { id: 1, prompt: "What is the main source of energy for all life on Earth?", img: "☀️", opts: [{ l: "The Sun", c: true }, { l: "Electricity", c: false }], exp: "Sun powers Earth." },
                { id: 2, prompt: "Which insect makes sweet honey and lives in hives?", img: "🐝", opts: [{ l: "Honeybee", c: true }, { l: "Housefly", c: false }], exp: "Bees make honey." },
                { id: 3, prompt: "What is the process of a caterpillar transforming into a butterfly?", img: "🦋", opts: [{ l: "Metamorphosis", c: true }, { l: "Photosynthesis", c: false }], exp: "Metamorphosis stages." },
                { id: 4, prompt: "Which layer of the Earth do we walk and build houses on?", img: "🌍", opts: [{ l: "The Earth's crust", c: true }, { l: "The inner core", c: false }], exp: "Crust is surface." },
                { id: 5, prompt: "What do we call scientists who study space and stars?", img: "🔭", opts: [{ l: "Astronomers", c: true }, { l: "Geologists", c: false }], exp: "Astronomers study stars." }
              ]
            ];
            questions = pools[batchNum - 1].map(q => ({
              id: q.id, prompt: q.prompt, imageIllustration: q.img,
              options: q.opts.map(o => ({ label: o.l, isCorrect: o.c })),
              explanation: "exp" in q ? (q.exp as string) : (q.explanation as string)
            }));
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
                { id: 1, prompt: "When booking a hotel room, what does 'half-board' usually include?", img: "🏨", opts: [{ l: "Breakfast and dinner", c: true }, { l: "Only room key", c: false }], exp: "Half board meals." },
                { id: 2, prompt: "What document is legally required when traveling internationally across borders?", img: "🛂", opts: [{ l: "A valid passport", c: true }, { l: "A library card", c: false }], exp: "Passports verify citizenship." },
                { id: 3, prompt: "What currency is officially used across most countries in the European Union?", img: "💶", opts: [{ l: "The Euro (€)", c: true }, { l: "The Dollar ($)", c: false }], exp: "Euro is EU currency." },
                { id: 4, prompt: "What is jet lag experienced after long-haul flights?", img: "✈️", opts: [{ l: "Fatigue from crossing multiple time zones", c: true }, { l: "Fear of heights", c: false }], exp: "Time zone disruption." },
                { id: 5, prompt: "What term describes a vacation where all food and drinks are included?", img: "🍹", opts: [{ l: "All-inclusive resort package", c: true }, { l: "Backpacking hostel", c: false }], exp: "All-inclusive deals." }
              ],
              [
                { id: 1, prompt: "What public transit vehicle runs on metal tracks embedded in city streets?", img: "🚊", opts: [{ l: "A tram or streetcar", c: true }, { l: "A helicopter", c: false }], exp: "Trams run on streets." },
                { id: 2, prompt: "What should you check first when reading a city transit map?", img: "🗺️", opts: [{ l: "The legend and color-coded subway lines", c: true }, { l: "The publisher name", c: false }], exp: "Legends explain maps." },
                { id: 3, prompt: "What is currency exchange when traveling abroad?", img: "💱", opts: [{ l: "Trading your home money for local foreign cash", c: true }, { l: "Buying souvenirs", c: false }], exp: "Currency swapping." },
                { id: 4, prompt: "What traveler accommodation is typically budget-friendly with shared dorms?", img: "🛏️", opts: [{ l: "A youth hostel", c: true }, { l: "A luxury penthouse", c: false }], exp: "Hostels save money." },
                { id: 5, prompt: "What phrase means 'to check in' at an airline desk?", img: "🛄", opts: [{ l: "To register your flight and drop off luggage", c: true }, { l: "To board the plane", c: false }], exp: "Check-in procedure." }
              ],
              [
                { id: 1, prompt: "What is a window seat preference on an airplane?", img: "🪟", opts: [{ l: "Sitting next to the cabin window", c: true }, { l: "Sitting in the aisle", c: false }], exp: "Window view seat." },
                { id: 2, prompt: "What official card do you swipe to ride public city subways?", img: "💳", opts: [{ l: "A transit smart card / pass", c: true }, { l: "A credit card for groceries", c: false }], exp: "Transit passes." },
                { id: 3, prompt: "What is carry-on luggage?", img: "🧳", opts: [{ l: "Bags you bring inside the plane cabin with you", c: true }, { l: "Checked large suitcases", c: false }], exp: "Cabin luggage." },
                { id: 4, prompt: "What does 'boarding pass' mean?", img: "🎫", opts: [{ l: "The ticket allowing you to enter the aircraft", c: true }, { l: "Hotel key card", c: false }], exp: "Boarding ticket." },
                { id: 5, prompt: "What emergency equipment is reviewed before flight takeoff?", img: "🦺", opts: [{ l: "Life vests and oxygen masks", c: true }, { l: "Movie projector", c: false }], exp: "Safety briefing." }
              ],
              [
                { id: 1, prompt: "What is an itinerary when planning a vacation?", img: "🗓️", opts: [{ l: "A detailed schedule of planned travel activities", c: true }, { l: "A hotel bill", c: false }], exp: "Travel schedule." },
                { id: 2, prompt: "What does customs inspection at an airport check for?", img: "🛃", opts: [{ l: "Regulated goods, food, and declaration items", c: true }, { l: "Your clothing style", c: false }], exp: "Customs rules." },
                { id: 3, prompt: "What is a round-trip flight ticket?", img: "🔄", opts: [{ l: "A ticket for going to a destination and returning back", c: true }, { l: "One-way ticket", c: false }], exp: "Round trip return." },
                { id: 4, prompt: "What is tourism?", img: "📸", opts: [{ l: "Traveling for recreation, leisure, and sightseeing", c: true }, { l: "Moving house", c: false }], exp: "Leisure travel." },
                { id: 5, prompt: "What is a travel guidebook used for?", img: "📖", opts: [{ l: "Finding tourist attractions, restaurants, and tips", c: true }, { l: "Cooking dinner", c: false }], exp: "Guidebook tips." }
              ]
            ];
            questions = pools[batchNum - 1].map(q => ({
              id: q.id, prompt: q.prompt, imageIllustration: q.img,
              options: q.opts.map(o => ({ label: o.l, isCorrect: o.c })),
              explanation: "exp" in q ? (q.exp as string) : (q.explanation as string)
            }));
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
                { id: 1, prompt: "What is phishing?", img: "🎣", opts: [{ l: "Fraudulent emails stealing credentials", c: true }, { l: "Catching fish", c: false }], exp: "Scam tactic." },
                { id: 2, prompt: "What is an influencer on social media?", img: "⭐", opts: [{ l: "A user with a large following who promotes brands", c: true }, { l: "A computer virus", c: false }], exp: "Brand promoter." },
                { id: 3, prompt: "What does a hashtag (#) do on posts?", img: "#️⃣", opts: [{ l: "Categorizes content for discoverability", c: true }, { l: "Deletes the post", c: false }], exp: "Tagging system." },
                { id: 4, prompt: "What is viral content?", img: "📈", opts: [{ l: "Media that spreads rapidly across the internet", c: true }, { l: "Computer sickness", c: false }], exp: "Rapid sharing." },
                { id: 5, prompt: "Why should you check source credibility before sharing news?", img: "📰", opts: [{ l: "To prevent spreading fake misinformation", c: true }, { l: "To look cool", c: false }], exp: "Truth check." }
              ],
              [
                { id: 1, prompt: "What is a meme?", img: "🖼️", opts: [{ l: "Humorous image or video copied and spread online", c: true }, { l: "A legal document", c: false }], exp: "Viral humor." },
                { id: 2, prompt: "What does 'blocking' a user accomplish?", img: "🚫", opts: [{ l: "Prevents them from viewing your profile or contacting you", c: true }, { l: "Deletes their account", c: false }], exp: "User restriction." },
                { id: 3, prompt: "What is livestreaming?", img: "🔴", opts: [{ l: "Broadcasting video footage in real time", c: true }, { l: "Mailing letters", c: false }], exp: "Real-time broadcast." },
                { id: 4, prompt: "What are algorithmic feeds?", img: "🤖", opts: [{ l: "Content automatically curated based on user behavior", c: true }, { l: "Random text", c: false }], exp: "Curated feeds." },
                { id: 5, prompt: "What is catfishing?", img: "🎭", opts: [{ l: "Creating a fake online identity to deceive others", c: true }, { l: "Fishing in lakes", c: false }], exp: "Deceptive identity." }
              ],
              [
                { id: 1, prompt: "What is an algorithm in social media platforms?", img: "⚙️", opts: [{ l: "Code determining what posts appear on your feed", c: true }, { l: "A physical machine", c: false }], exp: "Ranking code." },
                { id: 2, prompt: "What does 'trending' mean?", img: "🔥", opts: [{ l: "Topics currently generating the highest engagement", c: true }, { l: "Weather forecasts", c: false }], exp: "High popularity." },
                { id: 3, prompt: "What is netiquette?", img: "💻", opts: [{ l: "Proper polite manners when communicating online", c: true }, { l: "Internet cables", c: false }], exp: "Online etiquette." },
                { id: 4, prompt: "What is clickbait?", img: "🎣", opts: [{ l: "Sensationalized headlines designed to entice clicks", c: true }, { l: "A fishing lure", c: false }], exp: "Deceptive titles." },
                { id: 5, prompt: "What is geotagging?", img: "📍", opts: [{ l: "Adding geographical metadata to media posts", c: true }, { l: "Mapping stars", c: false }], exp: "Location tags." }
              ],
              [
                { id: 1, prompt: "What is user-generated content (UGC)?", img: "🤳", opts: [{ l: "Content created and published by everyday users", c: true }, { l: "Hollywood movies", c: false }], exp: "User created." },
                { id: 2, prompt: "What is a troll in online comment sections?", img: "🧌", opts: [{ l: "Someone who intentionally provokes anger or disruption", c: true }, { l: "A fantasy character", c: false }], exp: "Provocateur." },
                { id: 3, prompt: "What is account verification (blue checkmark)?", img: "✔️", opts: [{ l: "Confirmation of a prominent user's authentic identity", c: true }, { l: "A paid coupon", c: false }], exp: "Identity badge." },
                { id: 4, prompt: "What is social media detox?", img: "🌿", opts: [{ l: "Temporarily abstaining from social platforms", c: true }, { l: "Cleaning a phone screen", c: false }], exp: "Digital break." },
                { id: 5, prompt: "What is a direct message (DM)?", img: "💬", opts: [{ l: "Private communication between two users", c: true }, { l: "A public billboard", c: false }], exp: "Private chat." }
              ]
            ];
            questions = pools[batchNum - 1].map(q => ({
              id: q.id, prompt: q.prompt, imageIllustration: q.img,
              options: q.opts.map(o => ({ label: o.l, isCorrect: o.c })),
              explanation: "exp" in q ? (q.exp as string) : (q.explanation as string)
            }));
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
                { id: 1, prompt: "What is a STAR method response in behavioral interviews?", img: "⭐", opts: [{ l: "Situation, Task, Action, Result framework", c: true }, { l: "Singing a song", c: false }], exp: "Behavioral framework." },
                { id: 2, prompt: "How should you research a company before an interview?", img: "🔍", opts: [{ l: "Review their website, mission, and recent news", c: true }, { l: "Guess what they do", c: false }], exp: "Company research." },
                { id: 3, prompt: "What is business professional dress code?", img: "👔", opts: [{ l: "Suits, tailored blazers, and formal wear", c: true }, { l: "Pajamas and slippers", c: false }], exp: "Formal attire." },
                { id: 4, prompt: "How should you answer 'What is your greatest weakness?'", img: "💡", opts: [{ l: "Mention a real flaw and how you actively improve it", c: true }, { l: "Claim you have zero flaws", c: false }], exp: "Self-improvement." },
                { id: 5, prompt: "What is the purpose of a follow-up email after an interview?", img: "📧", opts: [{ l: "Express gratitude and reiterate interest", c: true }, { l: "Demand an immediate hiring decision", c: false }], exp: "Polite follow-up." }
              ],
              [
                { id: 1, prompt: "What are soft skills?", img: "🤝", opts: [{ l: "Interpersonal communication and teamwork abilities", c: true }, { l: "Coding syntax knowledge", c: false }], exp: "Interpersonal skills." },
                { id: 2, prompt: "What are hard skills?", img: "💻", opts: [{ l: "Technical proficiencies and specialized training", c: true }, { l: "Being polite", c: false }], exp: "Technical skills." },
                { id: 3, prompt: "How early should you arrive for an in-person interview?", img: "⏰", opts: [{ l: "10 to 15 minutes early", c: true }, { l: "2 hours late", c: false }], exp: "Arrival timing." },
                { id: 4, prompt: "What should you bring to an interview?", img: "📁", opts: [{ l: "Multiple printed copies of your resume and a pen", c: true }, { l: "Nothing at all", c: false }], exp: "Preparedness." },
                { id: 5, prompt: "How should you handle an interview question you do not know?", img: "🤔", opts: [{ l: "Stay calm, admit it gracefully, and show willingness to learn", c: true }, { l: "Panic and walk out", c: false }], exp: "Graceful honesty." }
              ],
              [
                { id: 1, prompt: "What is a panel interview?", img: "👥", opts: [{ l: "An interview with multiple hiring managers simultaneously", c: true }, { l: "An online computer test", c: false }], exp: "Multiple interviewers." },
                { id: 2, prompt: "Why do interviewers ask 'Tell me about yourself'?", img: "🗣️", opts: [{ l: "To hear a professional summary of your career journey", c: true }, { l: "To hear your life story from birth", c: false }], exp: "Professional pitch." },
                { id: 3, prompt: "What is body language importance in interviews?", img: "🧍", opts: [{ l: "Posture, eye contact, and nodding convey confidence", c: true }, { l: "Slumping conveys energy", c: false }], exp: "Confident posture." },
                { id: 4, prompt: "What is a probation period in a new job?", img: "⏳", opts: [{ l: "An initial trial evaluation period", c: true }, { l: "Permanent paid vacation", c: false }], exp: "Trial period." },
                { id: 5, prompt: "How should you speak about past employers or managers?", img: "💬", opts: [{ l: "Professionally and respectfully, avoiding negativity", c: true }, { l: "Insulting them harshly", c: false }], exp: "Professional tact." }
              ],
              [
                { id: 1, prompt: "What is a salary negotiation?", img: "💰", opts: [{ l: "Discussing compensation and benefits professionally", c: true }, { l: "Demanding double money rudely", c: false }], exp: "Compensation talk." },
                { id: 2, prompt: "What does 'cultural fit' mean in hiring?", img: "🌐", opts: [{ l: "Alignment with company values and team ethos", c: true }, { l: "Wearing the same shoes", c: false }], exp: "Value alignment." },
                { id: 3, prompt: "What is a group interview used for?", img: "🧑‍🤝‍🧑", opts: [{ l: "To assess teamwork and collaboration under observation", c: true }, { l: "To throw a party", c: false }], exp: "Team assessment." },
                { id: 4, prompt: "What is an applicant tracking system (ATS)?", img: "💻", opts: [{ l: "Software used by companies to screen resumes automatically", c: true }, { l: "A GPS map for candidates", c: false }], exp: "Resume scanner." },
                { id: 5, prompt: "What is constructive feedback after a rejected interview?", img: "📈", opts: [{ l: "Valuable insights to improve future interview performance", c: true }, { l: "An insult to ignore", c: false }], exp: "Growth feedback." }
              ]
            ];
            questions = pools[batchNum - 1].map(q => ({
              id: q.id, prompt: q.prompt, imageIllustration: q.img,
              options: q.opts.map(o => ({ label: o.l, isCorrect: o.c })),
              explanation: "exp" in q ? (q.exp as string) : (q.explanation as string)
            }));
          } else {
            const pools = [
              [
                { id: 1, prompt: "Why include a bibliography?", img: "📑", opts: [{ l: "Avoid plagiarism and credit sources", c: true }, { l: "Make paper heavier", c: false }], exp: "Academic integrity." },
                { id: 2, prompt: "What does a dictionary provide?", img: "📖", opts: [{ l: "Pronunciations and definitions", c: true }, { l: "Weather", c: false }], exp: "Lexicon." },
                { id: 3, prompt: "First step of scientific method?", img: "🔬", opts: [{ l: "Observation and question", c: true }, { l: "Conclusion", c: false }], exp: "Inquiry." },
                { id: 4, prompt: "What is a hypothesis?", img: "💡", opts: [{ l: "Testable proposed explanation", c: true }, { l: "Proven law", c: false }], exp: "Testable idea." },
                { id: 5, prompt: "What does an atlas contain?", img: "🗺️", opts: [{ l: "Geopolitical and physical maps", c: true }, { l: "Recipes", c: false }], exp: "Geography maps." }
              ],
              [
                { id: 1, prompt: "What is peer review in academic publishing?", img: "👥", opts: [{ l: "Evaluation of research by independent expert scholars", c: true }, { l: "Checking grammar with spellcheck", c: false }], exp: "Expert vetting." },
                { id: 2, prompt: "What is a primary research source?", img: "📜", opts: [{ l: "Original firsthand data or historical documents", c: true }, { l: "A textbook summary", c: false }], exp: "Firsthand data." },
                { id: 3, prompt: "What is qualitative research?", img: "📊", opts: [{ l: "Focusing on descriptive data, interviews, and observations", c: true }, { l: "Counting numerical statistics only", c: false }], exp: "Descriptive study." },
                { id: 4, prompt: "What is quantitative research?", img: "📈", opts: [{ l: "Analyzing numerical data using statistical methods", c: true }, { l: "Writing poetry", c: false }], exp: "Numerical data." },
                { id: 5, prompt: "What is an abstract in a research paper?", img: "📄", opts: [{ l: "A concise summary of the entire study's findings", c: true }, { l: "The back cover", c: false }], exp: "Summary abstract." }
              ],
              [
                { id: 1, prompt: "What is plagiarism?", img: "⚠️", opts: [{ l: "Using someone else's work without proper citation", c: true }, { l: "Writing original essays", c: false }], exp: "Academic theft." },
                { id: 2, prompt: "What is a control group in scientific experiments?", img: "🧪", opts: [{ l: "The baseline group kept unchanged for comparison", c: true }, { l: "The group receiving experimental treatment", c: false }], exp: "Experimental baseline." },
                { id: 3, prompt: "What is an empirical study?", img: "🔬", opts: [{ l: "Research based on direct observation and experimentation", c: true }, { l: "Pure theoretical philosophy", c: false }], exp: "Observational science." },
                { id: 4, prompt: "What is a thesis statement in academic writing?", img: "🏛️", opts: [{ l: "The core central argument driving the entire paper", c: true }, { l: "A random concluding sentence", c: false }], exp: "Central argument." },
                { id: 5, prompt: "What is academic integrity?", img: "⭐", opts: [{ l: "Honesty and ethical standards in scholarship", c: true }, { l: "Getting 100% grades", c: false }], exp: "Ethical scholarship." }
              ],
              [
                { id: 1, prompt: "What is a literature review?", img: "📚", opts: [{ l: "A comprehensive survey of prior research on a topic", c: true }, { l: "A fictional novel", c: false }], exp: "Research survey." },
                { id: 2, prompt: "What is deductive reasoning?", img: "🧠", opts: [{ l: "Applying general principles to reach a specific conclusion", c: true }, { l: "Guessing randomly", c: false }], exp: "General to specific." },
                { id: 3, prompt: "What is inductive reasoning?", img: "💡", opts: [{ l: "Deriving general theories from specific observations", c: true }, { l: "Memorizing facts", c: false }], exp: "Specific to general." },
                { id: 4, prompt: "What is a methodological framework?", img: "⚙️", opts: [{ l: "The structured system of methods used in a study", c: true }, { l: "A computer hardware diagram", c: false }], exp: "Method system." },
                { id: 5, prompt: "What is citation formatting (APA / MLA)?", img: "📝", opts: [{ l: "Standardized rules for acknowledging reference sources", c: true }, { l: "Font styling choices", c: false }], exp: "Reference standards." }
              ],
              [
                { id: 1, prompt: "What is an independent variable in experiments?", img: "🔬", opts: [{ l: "The variable manipulated or changed by the researcher", c: true }, { l: "The measured outcome", c: false }], exp: "Manipulated variable." },
                { id: 2, prompt: "What is a dependent variable?", img: "📈", opts: [{ l: "The outcome measured and affected during the experiment", c: true }, { l: "The researcher", c: false }], exp: "Measured outcome." },
                { id: 3, prompt: "What is peer debriefing in qualitative research?", img: "👥", opts: [{ l: "Discussing findings with fellow researchers to ensure validity", c: true }, { l: "Arguing in class", c: false }], exp: "Validity check." },
                { id: 4, prompt: "What is scholarly citation?", img: "🔖", opts: [{ l: "Giving credit to authors within academic texts", c: true }, { l: "Writing footnotes for fun", c: false }], explanation: "Author credit." },
                { id: 5, prompt: "What is academic publishing?", img: "📰", opts: [{ l: "Releasing peer-reviewed research in professional journals", c: true }, { l: "Posting on TikTok", c: false }], explanation: "Journal release." }
              ]
            ];
            questions = pools[batchNum - 1].map(q => ({
              id: q.id, prompt: q.prompt, imageIllustration: q.img,
              options: q.opts.map(o => ({ label: o.l, isCorrect: o.c })),
              explanation: "exp" in q ? (q.exp as string) : (q.explanation as string)
            }));
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
            questions = pools[batchNum - 1].map(q => ({
              id: q.id, prompt: q.prompt, imageIllustration: q.img,
              options: q.opts.map(o => ({ label: o.l, isCorrect: o.c })),
              explanation: "exp" in q ? (q.exp as string) : (q.explanation as string)
            }));
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
            questions = pools[batchNum - 1].map(q => ({
              id: q.id, prompt: q.prompt, imageIllustration: q.img,
              options: q.opts.map(o => ({ label: o.l, isCorrect: o.c })),
              explanation: "exp" in q ? (q.exp as string) : (q.explanation as string)
            }));
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
            questions = pools[batchNum - 1].map(q => ({
              id: q.id, prompt: q.prompt, imageIllustration: q.img,
              options: q.opts.map(o => ({ label: o.l, isCorrect: o.c })),
              explanation: "exp" in q ? (q.exp as string) : (q.explanation as string)
            }));
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
            questions = pools[batchNum - 1].map(q => ({
              id: q.id, prompt: q.prompt, imageIllustration: q.img,
              options: q.opts.map(o => ({ label: o.l, isCorrect: o.c })),
              explanation: "exp" in q ? (q.exp as string) : (q.explanation as string)
            }));
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
            questions = pools[batchNum - 1].map(q => ({
              id: q.id, prompt: q.prompt, imageIllustration: q.img,
              options: q.opts.map(o => ({ label: o.l, isCorrect: o.c })),
              explanation: "exp" in q ? (q.exp as string) : (q.explanation as string)
            }));
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
            questions = pools[batchNum - 1].map(q => ({
              id: q.id, prompt: q.prompt, imageIllustration: q.img,
              options: q.opts.map(o => ({ label: o.l, isCorrect: o.c })),
              explanation: "exp" in q ? (q.exp as string) : (q.explanation as string)
            }));
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
            questions = pools[batchNum - 1].map(q => ({
              id: q.id, prompt: q.prompt, imageIllustration: q.img,
              options: q.opts.map(o => ({ label: o.l, isCorrect: o.c })),
              explanation: "exp" in q ? (q.exp as string) : (q.explanation as string)
            }));
          } else {
            const pools = [
              [
                { id: 1, prompt: "Epistemological philosophy primary focus?", img: "🎓", opts: [{ l: "Nature, origin, and limits of human knowledge", c: true }, { l: "Stars", c: false }], exp: "Knowledge." },
                { id: 2, prompt: "A priori vs a posteriori knowledge?", img: "🧠", opts: [{ l: "Independent of experience vs empirical observation", c: true }, { l: "Identical", c: false }], exp: "Deduction vs observation." },
                { id: 3, prompt: "What is a logical tautology?", img: "📜", opts: [{ l: "Necessarily true by logical form", c: true }, { l: "Experiment", c: false }], exp: "Tautology." },
                { id: 4, prompt: "Advanced concession marker: '___ empirical data is complex...'", img: "⚖️", opts: [{ l: "Albeit", c: true }, { l: "Because", c: false }], exp: "Concession." },
                { id: 5, prompt: "German concept 'Zeitgeist' signify?", img: "🏛️", opts: [{ l: "Defining spirit or mood of a historical period", c: true }, { l: "Building", c: false }], exp: "Zeitgeist." }
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
            questions = pools[batchNum - 1].map(q => ({
              id: q.id, prompt: q.prompt, imageIllustration: q.img,
              options: q.opts.map(o => ({ label: o.l, isCorrect: o.c })),
              explanation: "exp" in q ? (q.exp as string) : (q.explanation as string)
            }));
          }
        }

        list[key] = {
          title: `${selectedLevel}: Quiz ${batchNum} - ${top} Masterclass`,
          image: icons[(topIdx + batchNum) % icons.length],
          level: selectedLevel,
          category: top,
          source: `${selectedLevel} Certified Academic Framework (Batch ${batchNum})`,
          questions: questions
        };
      }
    });
    return list;
  };

  const currentQuizModules = getCurrentLevelQuizzes();

  // STUDY MATERIALS DATABASE
  const getDynamicStudyGuide = (lvl: string, top: string): StudyMaterial => {
    const targetId = `${lvl}-${top}`.replace(/\s+/g, "");
    
    return {
      id: targetId,
      title: `${lvl}: Complete Textbook Chapter & Reading Guide on ${top}`,
      level: lvl,
      category: top,
      summary: `A thorough, professional educational reading resource tailored for ${lvl} students. Dive into exhaustive explanations, historical context, core methodologies, and practical academic walkthroughs for ${top}.`,
      illustration: top === "Daily Life" ? "🛒🌍📖" : top === "Social Media" ? "📱💬🌐" : top === "Job Interviews" ? "💼👔📈" : "⚖️🏛️🧠",
      accentColor: "bg-sky-50 border-sky-100 text-sky-600",
      sections: [
        {
          heading: `Chapter 1: Foundational Theory and Historical Context of ${top}`,
          subheading: `Comprehensive introductory reading material and framework definitions for ${lvl}`,
          paragraphs: [
            `Welcome to your primary reading module on ${top}. At the ${lvl} proficiency tier, mastering this subject requires deep immersion into foundational principles rather than superficial rote memorization. Scholars and practitioners alike recognize that structured comprehension of this domain serves as the bedrock for advanced academic and real-world fluency.`,
            `Historically, human communication, societal frameworks, and procedural methodologies surrounding ${top} have undergone massive structural evolutions. In contemporary professional environments, individuals must skillfully balance strict adherence to canonical rules with agile, context-aware execution.`,
            `As you read through this comprehensive textbook chapter, pay meticulous attention to specific terminology, stylistic register, and situational appropriateness. Each successive section provides exhaustive analytical commentary designed to elevate your cognitive mastery and practical application.`
          ],
          keyTakeaways: [
            `Establishing a robust conceptual framework for ${top} at the ${lvl} level.`,
            `Differentiating formal versus informal registers across diverse social and professional environments.`,
            `Recognizing the historical trajectory and modern evolution of ${top} standards.`
          ]
        },
        {
          heading: `Chapter 2: Structural Mechanics, Core Rules, and Analytical Breakdown`,
          subheading: "Detailed grammatical, behavioral, and procedural mechanics",
          paragraphs: [
            `To achieve true proficiency in ${top}, students must systematically dissect the individual components governing successful execution. This involves rigorous analysis of syntactical patterns, behavioral expectations, and logical progression models.`,
            `For instance, when engaging with this subject matter in professional or academic discourse, precision of expression is paramount. Ambiguity invariably leads to miscommunication and structural failure, whereas adherence to standardized methodology guarantees clarity, reproducibility, and verified success.`,
            `Examine closely how leading experts approach problem-solving within this domain. By isolating variables, scrutinizing underlying assumptions, and applying standard conventions methodically, learners can navigate complex scenarios with absolute confidence and intellectual poise.`
          ],
          keyTakeaways: [
            `Mastering precise syntactical and procedural steps matching official curriculum benchmarks.`,
            `Systematic identification, isolation, and correction of common structural errors.`,
            `Deploying advanced analytical tools to evaluate complex case scenarios.`
          ]
        },
        {
          heading: `Chapter 3: Real-World Case Studies, Practical Walkthroughs, and Mastery`,
          subheading: "Case analyses, simulated exercises, and practical implementation",
          paragraphs: [
            `Theoretical knowledge achieves true value only when tested rigorously in practice. In this closing chapter, we examine genuine, high-stakes case studies where the principles of ${top} are deployed to resolve complex, real-world challenges.`,
            `Consider a scenario where an individual must navigate a high-pressure environment relying entirely on clear communication, critical thinking, and tactical execution. By deploying the structured methodologies outlined in this textbook chapter, they successfully overcome obstacles and achieve their intended objectives.`,
            `Take dedicated time to reflect upon these case studies. Practice framing your own independent responses, essays, and arguments using the sophisticated vocabulary and structural frameworks established throughout this comprehensive reading material.`
          ],
          keyTakeaways: [
            `Resolving real-world operational challenges through structured, clear communication.`,
            `Drafting professional, highly polished deliverables based on established academic benchmarks.`,
            `Synthesizing theory and practice to ensure lifelong retention and mastery of ${top}.`
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

  // STUDY MATERIAL READER VIEW (FULL TEXTBOOK CHAPTERS)
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
                    <div className="p-6 md:p-10 space-y-6 bg-white border-t border-gray-100 animate-fade-in">
                      <div className="space-y-5">
                        {sec.paragraphs.map((para, pIdx) => (
                          <p key={pIdx} className="text-base md:text-lg text-gray-700 leading-relaxed">
                            {para}
                          </p>
                        ))}
                      </div>

                      <div className="bg-sky-50/60 p-6 rounded-2xl border border-sky-100 space-y-3 mt-6">
                        <h5 className="text-xs font-bold text-sky-900 uppercase tracking-wider block">
                          ✦ Key Study Takeaways:
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

      {/* TAB 2: STUDY MATERIALS (ACTUAL DETAILED TEXTBOOK CHAPTERS) */}
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
                      Open Full Textbook Chapter 📖 →
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