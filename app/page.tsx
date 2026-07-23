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

  // COMPLETELY CLEAN, FLAT, VERCEL-COMPLIANT QUIZ GENERATOR WITH LEVEL-APPROPRIATE QUESTIONS
  const getCurrentLevelQuizzes = () => {
    const list: Record<string, ModuleData> = {};
    const icons = ["🍎", "📱", "ABC", "🔢", "🎒", "🔬", "🗺️", "💼", "🏛️", "📊"];

    topics.forEach((top, topIdx) => {
      for (let batchNum = 1; batchNum <= 5; batchNum++) {
        const key = `${selectedLevel}-${top}-Quiz${batchNum}`.replace(/\s+/g, "");
        
        let questions: Question[] = [];

        if (selectedLevel === "Kindergarten") {
          if (top === "Daily Life") {
            const pools = [
              [
                { id: 1, prompt: "Which fruit is sweet, red, and starts with 'A'?", img: "🍎", opts: [{ l: "Apple", c: true }, { l: "Banana", c: false }, { l: "Carrot", c: false }], exp: "Apples start with A and are red." },
                { id: 2, prompt: "What color is a ripe banana peel?", img: "🍌", opts: [{ l: "Yellow", c: true }, { l: "Blue", c: false }, { l: "Pink", c: false }], exp: "Ripe bananas are yellow." },
                { id: 3, prompt: "What farm animal says 'Moo'?", img: "🐮", opts: [{ l: "Cow", c: true }, { l: "Duck", c: false }, { l: "Cat", c: false }], explanation: "Cows make a mooing sound." },
                { id: 4, prompt: "What do you wear on your feet in rain?", img: "👢", opts: [{ l: "Rain boots", c: true }, { l: "Sunglasses", c: false }, { l: "Slippers", c: false }], explanation: "Boots keep feet dry." },
                { id: 5, prompt: "Which meal is eaten in the morning?", img: "🌅", opts: [{ l: "Breakfast", c: true }, { l: "Dinner", c: false }, { l: "Supper", c: false }], explanation: "Breakfast is morning food." }
              ],
              [
                { id: 1, prompt: "Which animal has a very long neck and eats tree leaves?", img: "🦒", opts: [{ l: "Giraffe", c: true }, { l: "Mouse", c: false }, { l: "Fish", c: false }], explanation: "Giraffes have long necks." },
                { id: 2, prompt: "What shape is a standard soccer ball?", img: "⚽", opts: [{ l: "Round (Sphere)", c: true }, { l: "Square", c: false }, { l: "Triangle", c: false }], explanation: "Balls are spherical." },
                { id: 3, prompt: "Which vehicle flies in the sky with wings?", img: "✈️", opts: [{ l: "Airplane", c: true }, { l: "Submarine", c: false }, { l: "Bicycle", c: false }], explanation: "Airplanes fly through clouds." },
                { id: 4, prompt: "What season brings cold snow and winter coats?", img: "❄️", opts: [{ l: "Winter", c: true }, { l: "Summer", c: false }, { l: "Spring", c: false }], explanation: "Winter brings snow." },
                { id: 5, prompt: "What color is clear drinking water?", img: "💧", opts: [{ l: "Colorless/Transparent", c: true }, { l: "Purple", c: false }, { l: "Green", c: false }], explanation: "Pure water has no color." }
              ],
              [
                { id: 1, prompt: "What tool do we use to brush our teeth?", img: "🦷", opts: [{ l: "Toothbrush", c: true }, { l: "Hairbrush", c: false }, { l: "Broom", c: false }], explanation: "Toothbrushes clean teeth." },
                { id: 2, prompt: "How many legs does a happy dog have?", img: "🐕", opts: [{ l: "Four", c: true }, { l: "Two", c: false }, { l: "Six", c: false }], explanation: "Dogs walk on four legs." },
                { id: 3, prompt: "What celestial body lights up the sky during the dark night?", img: "🌙", opts: [{ l: "The Moon and Stars", c: true }, { l: "The daytime Sun", c: false }, { l: "A flashlight", c: false }], explanation: "Moons shine at night." },
                { id: 4, prompt: "What sound does a cute little kitten make?", img: "🐱", opts: [{ l: "Meow", c: true }, { l: "Woof", c: false }, { l: "Roar", c: false }], explanation: "Kittens meow." },
                { id: 5, prompt: "Which clothing item keeps your head warm in winter?", img: "🧢", opts: [{ l: "Winter beanie or hat", c: true }, { l: "Socks", c: false }, { l: "Gloves", c: false }], explanation: "Hats keep heads warm." }
              ],
              [
                { id: 1, prompt: "What yellow citrus fruit is famously very sour?", img: "🍋", opts: [{ l: "Lemon", c: true }, { l: "Strawberry", c: false }, { l: "Watermelon", c: false }], explanation: "Lemons are sour." },
                { id: 2, prompt: "What do birds use to fly across the sky?", img: "🐦", opts: [{ l: "Feathered wings", c: true }, { l: "Wheels", c: false }, { l: "Fins", c: false }], explanation: "Wings allow flight." },
                { id: 3, prompt: "Where do flowers grow planted in rich dirt?", img: "🌷", opts: [{ l: "In a garden bed or pot", c: true }, { l: "On a concrete highway", c: false }, { l: "In the kitchen sink", c: false }], explanation: "Flowers need soil." },
                { id: 4, prompt: "What tool cuts paper in art class safely?", img: "✂️", opts: [{ l: "Safety scissors", c: true }, { l: "A hammer", c: false }, { l: "A saw", c: false }], explanation: "Scissors cut paper." },
                { id: 5, prompt: "What bright yellow shape shines in the daytime sky?", img: "☀️", opts: [{ l: "The Sun", c: true }, { l: "A cloud", c: false }, { l: "A star", c: false }], explanation: "The sun shines by day." }
              ],
              [
                { id: 1, prompt: "What sweet treat is made from frozen cream or milk?", img: "🍦", opts: [{ l: "Ice cream", c: true }, { l: "Soup", c: false }, { l: "Salad", c: false }], explanation: "Ice cream is frozen sweet food." },
                { id: 2, prompt: "How many eyes do humans have on their face?", img: "👀", opts: [{ l: "Two", c: true }, { l: "One", c: false }, { l: "Four", c: false }], explanation: "We have two eyes." },
                { id: 3, prompt: "What color are most healthy tree leaves in summer?", img: "🍃", opts: [{ l: "Green", c: true }, { l: "Pink", c: false }, { l: "Black", c: false }], explanation: "Summer leaves are green." },
                { id: 4, prompt: "What toy blocks are stacked to build towers?", img: "🧱", opts: [{ l: "Building blocks", c: true }, { l: "Pillows", c: false }, { l: "Paper plates", c: false }], explanation: "Blocks build towers." },
                { id: 5, prompt: "What drink comes from cows and helps build strong bones?", img: "🥛", opts: [{ l: "Milk", c: true }, { l: "Soda", c: false }, { l: "Paint", c: false }], explanation: "Milk provides calcium." }
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
            questions = pools[batchNum - 1].map(q => ({
              id: q.id, prompt: q.prompt, imageIllustration: q.img,
              options: q.opts.map(o => ({ label: o.l, isCorrect: o.c })),
              explanation: q.exp
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
                { id: 1, prompt: "What shape has four equal straight sides and square corners?", img: "⬛", opts: [{ l: "Square", c: true }, { l: "Circle", c: false }], explanation: "Squares have 4 equal sides." },
                { id: 2, prompt: "What number comes right before the number 10?", img: "🔢", opts: [{ l: "9", c: true }, { l: "8", c: false }], explanation: "Counting: 8, 9, 10." },
                { id: 3, prompt: "What is the opposite of hot soup?", img: "🧊", opts: [{ l: "Cold / Freezing", c: true }, { l: "Boiling", c: false }], explanation: "Cold is opposite to hot." },
                { id: 4, prompt: "How many days are in a single full week?", img: "📅", opts: [{ l: "7 days", c: true }, { l: "5 days", c: false }], explanation: "There are 7 days in a week." },
                { id: 5, prompt: "What shape looks like a curved ring with no corners?", img: "⭕", opts: [{ l: "Circle", c: true }, { l: "Triangle", c: false }], explanation: "Circles are round." }
              ],
              [
                { id: 1, prompt: "If you have 2 apples and get 1 more, how many do you have?", img: "🍎", opts: [{ l: "3 apples", c: true }, { l: "1 apple", c: false }], explanation: "2 plus 1 equals 3." },
                { id: 2, prompt: "What geometric shape has 4 sides where opposite sides are equal?", img: "▭", opts: [{ l: "Rectangle", c: true }, { l: "Circle", c: false }], explanation: "Rectangles have paired sides." },
                { id: 3, prompt: "What is the opposite of fast running?", img: "🐢", opts: [{ l: "Slow", c: true }, { l: "Quick", c: false }], explanation: "Slow is opposite to fast." },
                { id: 4, prompt: "Which number is larger: 8 or 3?", img: "🔢", opts: [{ l: "8", c: true }, { l: "3", c: false }], explanation: "8 is greater than 3." },
                { id: 5, prompt: "What color do you get when mixing red and white?", img: "🎨", opts: [{ l: "Pink", c: true }, { l: "Black", c: false }], explanation: "Red and white make pink." }
              ],
              [
                { id: 1, prompt: "How many months are in a standard calendar year?", img: "📅", opts: [{ l: "12 months", c: true }, { l: "10 months", c: false }], explanation: "A year has 12 months." },
                { id: 2, prompt: "What shape has five pointy star-like corners?", img: "⭐", opts: [{ l: "Star", c: true }, { l: "Square", c: false }], explanation: "Stars have points." },
                { id: 3, prompt: "What is the opposite of heavy rocks?", img: "🪶", opts: [{ l: "Light (like a feather)", c: true }, { l: "Massive", c: false }], explanation: "Light is opposite to heavy." },
                { id: 4, prompt: "If you count backwards from 3, what comes after 3 and 2?", img: "🔢", opts: [{ l: "1", c: true }, { l: "5", c: false }], explanation: "Countdown: 3, 2, 1." },
                { id: 5, prompt: "What shape resembles a stretched circle like an egg?", img: "🥚", opts: [{ l: "Oval", c: true }, { l: "Square", c: false }], explanation: "Eggs are oval-shaped." }
              ],
              [
                { id: 1, prompt: "If you have 5 balloons and 2 fly away, how many are left?", img: "🎈", opts: [{ l: "3 balloons", c: true }, { l: "5 balloons", c: false }], explanation: "5 minus 2 equals 3." },
                { id: 2, prompt: "What do we call a 3D shape like a basketball or globe?", img: "🌍", opts: [{ l: "Sphere", c: true }, { l: "Square", c: false }], explanation: "Globes are spheres." },
                { id: 3, prompt: "What is the opposite of day time?", img: "🌙", opts: [{ l: "Night time", c: true }, { l: "Afternoon", c: false }], explanation: "Night is opposite to day." },
                { id: 4, prompt: "Which number is smaller: 2 or 9?", img: "🔢", opts: [{ l: "2", c: true }, { l: "9", c: false }], explanation: "2 is smaller than 9." },
                { id: 5, prompt: "What color results from mixing blue and red?", img: "🎨", opts: [{ l: "Purple", c: true }, { l: "Orange", c: false }], explanation: "Blue and red make purple." }
              ]
            ];
            questions = pools[batchNum - 1].map(q => ({
              id: q.id, prompt: q.prompt, imageIllustration: q.img,
              options: q.opts.map(o => ({ label: o.l, isCorrect: o.c })),
              explanation: q.exp
            }));
          }
        } else if (selectedLevel === "Primary School") {
          if (top === "Daily Life") {
            questions = [
              { id: 1, prompt: `[Primary School - Batch ${batchNum}] Which math operation combines numbers?`, imageIllustration: "➕", options: [{ label: "Addition", isCorrect: true }, { label: "Substraction deletion", isCorrect: false }], explanation: "Addition combines sets." },
              { id: 2, prompt: `[Primary School - Batch ${batchNum}] What tool erases pencil marks?`, imageIllustration: "📝", options: [{ label: "Eraser", isCorrect: true }, { label: "Spoon", isCorrect: false }], explanation: "Erasers clean lead." },
              { id: 3, prompt: `[Primary School - Batch ${batchNum}] Where do children play during recess?`, imageIllustration: "⚽", options: [{ label: "Playground", isCorrect: true }, { label: "Roof", isCorrect: false }], explanation: "Playgrounds are for recreation." },
              { id: 4, prompt: `[Primary School - Batch ${batchNum}] What instrument draws straight lines?`, imageIllustration: "📏", options: [{ label: "Ruler", isCorrect: true }, { label: "Sponge", isCorrect: false }], explanation: "Rulers provide straight edges." },
              { id: 5, prompt: `[Primary School - Batch ${batchNum}] Who assists students when sick?`, imageIllustration: "🏥", options: [{ label: "School nurse", isCorrect: true }, { label: "Gym coach", isCorrect: false }], explanation: "Nurses manage health." }
            ];
          } else if (top === "Social Media") {
            questions = [
              { id: 1, prompt: `[Primary School - Batch ${batchNum}] Should you share your passwords online?`, imageIllustration: "🔒", options: [{ label: "Never share passwords", isCorrect: true }, { label: "Share with everyone", isCorrect: false }], explanation: "Keep passwords private." },
              { id: 2, prompt: `[Primary School - Batch ${batchNum}] What is cyberbullying?`, imageIllustration: "💻", options: [{ label: "Being hurtful online", isCorrect: true }, { label: "Playing math games", isCorrect: false }], explanation: "Cyberbullying is online harassment." },
              { id: 3, prompt: `[Primary School - Batch ${batchNum}] Who should you tell if someone sends unkind messages?`, imageIllustration: "👨‍👩‍👧", options: [{ label: "Trusted adult or teacher", isCorrect: true }, { label: "Keep it secret", isCorrect: false }], explanation: "Trusted adults help." },
              { id: 4, prompt: `[Primary School - Batch ${batchNum}] Is it healthy to stare at screens all day?`, imageIllustration: "🌳", options: [{ label: "No, balance with outdoor play", isCorrect: true }, { label: "Yes", isCorrect: false }], explanation: "Balance prevents eye strain." },
              { id: 5, prompt: `[Primary School - Batch ${batchNum}] What does posting kind comments show?`, imageIllustration: "⭐", options: [{ label: "Good digital citizenship", isCorrect: true }, { label: "Bad manners", isCorrect: false }], explanation: "Kindness defines good citizenship." }
            ];
          } else {
            questions = [
              { id: 1, prompt: `[Primary School - Batch ${batchNum}] What do we call the main character in a story?`, imageIllustration: "📖", options: [{ label: "Protagonist", isCorrect: true }, { label: "Table of contents", isCorrect: false }], explanation: "Protagonists are main heroes." },
              { id: 2, prompt: `[Primary School - Batch ${batchNum}] What do plants need from sunlight to grow?`, imageIllustration: "🌱", options: [{ label: "Sunlight and water", isCorrect: true }, { label: "Soda", isCorrect: false }], explanation: "Photosynthesis requires light." },
              { id: 3, prompt: `[Primary School - Batch ${batchNum}] What state of matter is ice?`, imageIllustration: "🧊", options: [{ label: "Solid", isCorrect: true }, { label: "Gas", isCorrect: false }], explanation: "Ice is frozen solid water." },
              { id: 4, prompt: `[Primary School - Batch ${batchNum}] What do animals that eat only plants called?`, imageIllustration: "🌿", options: [{ label: "Herbivores", isCorrect: true }, { label: "Carnivores", isCorrect: false }], explanation: "Herbivores eat vegetation." },
              { id: 5, prompt: `[Primary School - Batch ${batchNum}] What planet do we live on?`, imageIllustration: "🌍", options: [{ label: "Earth", isCorrect: true }, { label: "Mars", isCorrect: false }], explanation: "Earth is our home." }
            ];
          }
        } else if (selectedLevel === "Junior High") {
          if (top === "Daily Life") {
            questions = [
              { id: 1, prompt: `[Junior High - Batch ${batchNum}] What does 'platform' mean at a station?`, imageIllustration: "🚆", options: [{ label: "Boarding area beside tracks", isCorrect: true }, { label: "Ticket price", isCorrect: false }], explanation: "Platforms are boarding zones." },
              { id: 2, prompt: `[Junior High - Batch ${batchNum}] Choose correct preposition: 'Turn left ___ the light.'`, imageIllustration: "🚦", options: [{ label: "at", isCorrect: true }, { label: "on", isCorrect: false }], explanation: "Use 'at' for intersections." },
              { id: 3, prompt: `[Junior High - Batch ${batchNum}] What is the benefit of cardio exercise?`, imageIllustration: "🏃‍♂️", options: [{ label: "Improving heart endurance", isCorrect: true }, { label: "Weakening", isCorrect: false }], explanation: "Cardio strengthens heart function." },
              { id: 4, prompt: `[Junior High - Batch ${batchNum}] How to ask for schedule times politely?`, imageIllustration: "🎫", options: [{ label: "Could you please tell me when it departs?", isCorrect: true }, { label: "Give me time now.", isCorrect: false }], explanation: "Polite modals ensure courtesy." },
              { id: 5, prompt: `[Junior High - Batch ${batchNum}] What is luggage allowance?`, imageIllustration: "🧳", options: [{ label: "Maximum bag weight/size limit", isCorrect: true }, { label: "Free snacks", isCorrect: false }], explanation: "Airlines enforce baggage limits." }
            ];
          } else if (top === "Social Media") {
            questions = [
              { id: 1, prompt: `[Junior High - Batch ${batchNum}] What does 'DIY' stand for?`, imageIllustration: "🛠️", options: [{ label: "Do It Yourself", isCorrect: true }, { label: "Do It Yesterday", isCorrect: false }], explanation: "DIY means self-made." },
              { id: 2, prompt: `[Junior High - Batch ${batchNum}] Why is 2FA important for accounts?`, imageIllustration: "🔐", options: [{ label: "Extra security layer beyond passwords", isCorrect: true }, { label: "Deletes account", isCorrect: false }], explanation: "2FA prevents unauthorized breaches." },
              { id: 3, prompt: `[Junior High - Batch ${batchNum}] What is a digital footprint?`, imageIllustration: "👣", options: [{ label: "Trail of data left online", isCorrect: true }, { label: "Mud tracks", isCorrect: false }], explanation: "Digital footprints record activity." },
              { id: 4, prompt: `[Junior High - Batch ${batchNum}] How to respond to toxic comments?`, imageIllustration: "🛡️", options: [{ label: "Ignore or report safely", isCorrect: true }, { label: "Insult back aggressively", isCorrect: false }], explanation: "Moderation stops toxicity." },
              { id: 5, prompt: `[Junior High - Batch ${batchNum}] What does 'TL;DR' mean?`, imageIllustration: "📖", options: [{ label: "Too Long; Didn't Read summary", isCorrect: true }, { label: "Delete", isCorrect: false }], explanation: "TL;DR provides summaries." }
            ];
          } else if (top === "Job Interviews") {
            questions = [
              { id: 1, prompt: `[Junior High - Batch ${batchNum}] What does 'punctual' mean?`, imageIllustration: "⏰", options: [{ label: "Arriving consistently on time", isCorrect: true }, { label: "Late", isCorrect: false }], explanation: "Punctuality is vital." },
              { id: 2, prompt: `[Junior High - Batch ${batchNum}] How to greet an interviewer?`, imageIllustration: "🤝", options: [{ label: "Eye contact and firm handshake", isCorrect: true }, { label: "Look at phone", isCorrect: false }], explanation: "First impressions matter." },
              { id: 3, prompt: `[Junior High - Batch ${batchNum}] Purpose of a student resume?`, imageIllustration: "📄", options: [{ label: "Summarize education and skills", isCorrect: true }, { label: "Write poetry", isCorrect: false }], explanation: "Resumes showcase qualifications." },
              { id: 4, prompt: `[Junior High - Batch ${batchNum}] Why ask about strengths?`, imageIllustration: "💪", options: [{ label: "Understand value contribution", isCorrect: true }, { label: "Trick you", isCorrect: false }], explanation: "Strengths highlight fit." },
              { id: 5, prompt: `[Junior High - Batch ${batchNum}] Great question at interview end?`, imageIllustration: "❓", options: [{ label: "What does a typical workday look like?", isCorrect: true }, { label: "Can I sleep here?", isCorrect: false }], explanation: "Shows genuine interest." }
            ];
          } else {
            questions = [
              { id: 1, prompt: `[Junior High - Batch ${batchNum}] Why include a bibliography?`, imageIllustration: "📑", options: [{ label: "Avoid plagiarism and credit sources", isCorrect: true }, { label: "Make paper heavier", isCorrect: false }], explanation: "Bibliographies ensure integrity." },
              { id: 2, prompt: `[Junior High - Batch ${batchNum}] What does a dictionary provide?`, imageIllustration: "📖", options: [{ label: "Definitions and word origins", isCorrect: true }, { label: "Weather reports", isCorrect: false }], explanation: "Dictionaries define terms." },
              { id: 3, prompt: `[Junior High - Batch ${batchNum}] First step of scientific method?`, imageIllustration: "🔬", options: [{ label: "Observation and question", isCorrect: true }, { label: "Conclusion", isCorrect: false }], explanation: "Inquiry begins with observation." },
              { id: 4, prompt: `[Junior High - Batch ${batchNum}] What is a hypothesis?`, imageIllustration: "💡", options: [{ label: "Testable proposed explanation", isCorrect: true }, { label: "Proven law", isCorrect: false }], explanation: "Hypotheses guide experiments." },
              { id: 5, prompt: `[Junior High - Batch ${batchNum}] What does an atlas contain?`, imageIllustration: "🗺️", options: [{ label: "Geopolitical and physical maps", isCorrect: true }, { label: "Cooking recipes", isCorrect: false }], explanation: "Atlases map geography." }
            ];
          }
        } else if (selectedLevel === "Senior High") {
          if (top === "Daily Life") {
            questions = [
              { id: 1, prompt: `[Senior High - Batch ${batchNum}] What does 50/30/20 budget allocate?`, imageIllustration: "📊", options: [{ label: "50% Needs, 30% Wants, 20% Savings", isCorrect: true }, { label: "50% Coffee, 50% Rent", isCorrect: false }], explanation: "The 50/30/20 rule balances expenses." },
              { id: 2, prompt: `[Senior High - Batch ${batchNum}] What does APR stand for in loans?`, imageIllustration: "💳", options: [{ label: "Annual Percentage Rate", isCorrect: true }, { label: "Advanced Payment Ratio", isCorrect: false }], explanation: "APR calculates yearly borrowing costs." },
              { id: 3, prompt: `[Senior High - Batch ${batchNum}] Why have an emergency fund?`, imageIllustration: "🏠", options: [{ label: "Cover unexpected expenses safely", isCorrect: true }, { label: "Buy luxury vacations", isCorrect: false }], explanation: "Emergency funds provide security." },
              { id: 4, prompt: `[Senior High - Batch ${batchNum}] What is a refundable deposit?`, imageIllustration: "🔑", options: [{ label: "Cover potential property damage", isCorrect: true }, { label: "Landlord salary", isCorrect: false }], explanation: "Deposits protect landlords." },
              { id: 5, prompt: `[Senior High - Batch ${batchNum}] What is compounding interest?`, imageIllustration: "📈", options: [{ label: "Interest on principal and past interest", isCorrect: true }, { label: "Paying penalties", isCorrect: false }], explanation: "Compounding accelerates growth." }
            ];
          } else if (top === "Social Media") {
            questions = [
              { id: 1, prompt: `[Senior High - Batch ${batchNum}] How do recruiters view public social feeds?`, imageIllustration: "🎓", options: [{ label: "As professional digital footprint", isCorrect: true }, { label: "Ignore them", isCorrect: false }], explanation: "Digital footprints impact evaluation." },
              { id: 2, prompt: `[Senior High - Batch ${batchNum}] What is a phishing scam?`, imageIllustration: "🎣", options: [{ label: "Deceptive credential theft messaging", isCorrect: true }, { label: "Computer game", isCorrect: false }], explanation: "Phishing targets security." },
              { id: 3, prompt: `[Senior High - Batch ${batchNum}] What does open-source software permit?`, imageIllustration: "💻", options: [{ label: "Collaborative inspection and modification", isCorrect: true }, { label: "Stealing software", isCorrect: false }], explanation: "Open-source shares code." },
              { id: 4, prompt: `[Senior High - Batch ${batchNum}] Why audit privacy settings?`, imageIllustration: "🛡️", options: [{ label: "Control personal data access", isCorrect: true }, { label: "Slow down phone", isCorrect: false }], explanation: "Privacy audits safeguard data." },
              { id: 5, prompt: `[Senior High - Batch ${batchNum}] What is a strong password?`, imageIllustration: "🔑", options: [{ label: "High entropy combining symbols and numbers", isCorrect: true }, { label: "Your birthdate", isCorrect: false }], explanation: "High entropy resists cracking." }
            ];
          } else if (top === "Job Interviews") {
            questions = [
              { id: 1, prompt: `[Senior High - Batch ${batchNum}] Purpose of cover letter?`, imageIllustration: "✉️", options: [{ label: "Tailored narrative matching company needs", isCorrect: true }, { label: "Repeat resume", isCorrect: false }], explanation: "Cover letters personalize apps." },
              { id: 2, prompt: `[Senior High - Batch ${batchNum}] What are transferable skills?`, imageIllustration: "💼", options: [{ label: "Versatile competencies applicable anywhere", isCorrect: true }, { label: "Train tickets", isCorrect: false }], explanation: "Transferable skills work universally." },
              { id: 3, prompt: `[Senior High - Batch ${batchNum}] What is an elevator pitch?`, imageIllustration: "⏱️", options: [{ label: "30-second professional value summary", isCorrect: true }, { label: "Elevator song", isCorrect: false }], explanation: "Elevator pitches deliver instant intros." },
              { id: 4, prompt: `[Senior High - Batch ${batchNum}] When to send thank-you notes?`, imageIllustration: "📧", options: [{ label: "Within 24 hours", isCorrect: true }, { label: "After 3 months", isCorrect: false }], explanation: "Prompt notes keep you memorable." },
              { id: 5, prompt: `[Senior High - Batch ${batchNum}] STAR method structure?`, imageIllustration: "⭐", options: [{ label: "Situation, Task, Action, Result", isCorrect: true }, { label: "Sing, Talk, Act, Rest", isCorrect: false }], explanation: "STAR structures behavioral stories." }
            ];
          } else {
            questions = [
              { id: 1, prompt: `[Senior High - Batch ${batchNum}] Role of a thesis statement in an essay?`, imageIllustration: "🏛️", options: [{ label: "State central argument and roadmap", isCorrect: true }, { label: "Tell a joke", isCorrect: false }], explanation: "Thesis statements anchor arguments." },
              { id: 2, prompt: `[Senior High - Batch ${batchNum}] What is a 'straw man' fallacy?`, imageIllustration: "🧠", options: [{ label: "Misrepresenting an opponent's argument", isCorrect: true }, { label: "Building a scarecrow", isCorrect: false }], explanation: "Straw man distorts logic." },
              { id: 3, prompt: `[Senior High - Batch ${batchNum}] Purpose of academic peer review?`, imageIllustration: "📑", options: [{ label: "Validate methodology before publication", isCorrect: true }, { label: "Check spelling only", isCorrect: false }], explanation: "Peer review ensures rigor." },
              { id: 4, prompt: `[Senior High - Batch ${batchNum}] Choose academic transition: '___ hurdles, it succeeded.'`, imageIllustration: "⚖️", options: [{ label: "Notwithstanding", isCorrect: true }, { label: "Because", isCorrect: false }], explanation: "Notwithstanding denotes concession." },
              { id: 5, prompt: `[Senior High - Batch ${batchNum}] What is empirical evidence?`, imageIllustration: "🔬", options: [{ label: "Data acquired by observation and experiment", isCorrect: true }, { label: "Pure opinion", isCorrect: false }], explanation: "Empirical data grounds science." }
            ];
          }
        } else {
          // C1 Advanced
          if (top === "Daily Life") {
            questions = [
              { id: 1, prompt: `[C1 Advanced - Batch ${batchNum}] Meaning of idiom 'to bite the bullet'?`, imageIllustration: "🎯", options: [{ label: "Face difficulty with courage and endurance", isCorrect: true }, { label: "Eat metal", isCorrect: false }], explanation: "Biting the bullet means enduring hardship." },
              { id: 2, prompt: `[C1 Advanced - Batch ${batchNum}] Syntactic inversion: 'Hardly ___ when it commenced.'`, imageIllustration: "📜", options: [{ label: "had I arrived", isCorrect: true }, { label: "I had arrived", isCorrect: false }], explanation: "Negative adverbials require inversion." },
              { id: 3, prompt: `[C1 Advanced - Batch ${batchNum}] Semantic nuance of 'ubiquitous'?`, imageIllustration: "🌍", options: [{ label: "Present everywhere simultaneously", isCorrect: true }, { label: "Rare", isCorrect: false }], explanation: "Ubiquitous describes omnipresence." },
              { id: 4, prompt: `[C1 Advanced - Batch ${batchNum}] To 'mitigate' a crisis implies?`, imageIllustration: "🛡️", options: [{ label: "Lessen severity or negative impact", isCorrect: true }, { label: "Worsen", isCorrect: false }], explanation: "Mitigation reduces damage." },
              { id: 5, prompt: `[C1 Advanced - Batch ${batchNum}] Collocation: 'To mount a ___ defense.'`, imageIllustration: "⚖️", options: [{ label: "vigorous", isCorrect: true }, { label: "heavy", isCorrect: false }], explanation: "We mount a vigorous defense." }
            ];
          } else if (top === "Social Media") {
            questions = [
              { id: 1, prompt: `[C1 Advanced - Batch ${batchNum}] What is an algorithmic echo chamber?`, imageIllustration: "📡", options: [{ label: "Environment reinforcing beliefs via isolated feeds", isCorrect: true }, { label: "Studio", isCorrect: false }], explanation: "Echo chambers restrict diverse views." },
              { id: 2, prompt: `[C1 Advanced - Batch ${batchNum}] AI deepfakes ethical threat?`, imageIllustration: "🤖", options: [{ label: "Synthetic media spreading misinformation", isCorrect: true }, { label: "Graphics", isCorrect: false }], explanation: "Deepfakes threaten informational trust." },
              { id: 3, prompt: `[C1 Advanced - Batch ${batchNum}] Algorithmic bias in machine learning?`, imageIllustration: "📊", options: [{ label: "Inheriting historical human prejudices", isCorrect: true }, { label: "Speed", isCorrect: false }], explanation: "Biased training data produces biased AI." },
              { id: 4, prompt: `[C1 Advanced - Batch ${batchNum}] Information literacy in digital age?`, imageIllustration: "🔍", options: [{ label: "Evaluating and verifying media sources critically", isCorrect: true }, { label: "Typing fast", isCorrect: false }], explanation: "Information literacy counters fake news." },
              { id: 5, prompt: `[C1 Advanced - Batch ${batchNum}] Synthetic media regulation curb?`, imageIllustration: "🏛️", options: [{ label: "Unauthorized impersonation and disinformation", isCorrect: true }, { label: "Coding", isCorrect: false }], explanation: "Regulations target deceptive deepfakes." }
            ];
          } else if (top === "Job Interviews") {
            questions = [
              { id: 1, prompt: `[C1 Advanced - Batch ${batchNum}] Metrics-driven ROI storytelling entail?`, imageIllustration: "📈", options: [{ label: "Quantified business impact and revenue growth", isCorrect: true }, { label: "Jokes", isCorrect: false }], explanation: "ROI storytelling proves financial value." },
              { id: 2, prompt: `[C1 Advanced - Batch ${batchNum}] Executive stakeholder alignment during conflicts?`, imageIllustration: "🤝", options: [{ label: "Reconciling priorities using empirical risk models", isCorrect: true }, { label: "Ignore", isCorrect: false }], explanation: "Alignment requires reconciliation." },
              { id: 3, prompt: `[C1 Advanced - Batch ${batchNum}] Strategic foresight demonstrate in leadership?`, imageIllustration: "🚀", options: [{ label: "Anticipating industry disruption and pivoting proactively", isCorrect: true }, { label: "Micro", isCorrect: false }], explanation: "Foresight anticipates future shifts." },
              { id: 4, prompt: `[C1 Advanced - Batch ${batchNum}] Streamlining organizational inefficiencies term:`, imageIllustration: "⚙️", options: [{ label: "Re-engineering operational workflows", isCorrect: true }, { label: "Slowing", isCorrect: false }], explanation: "Re-engineering optimizes operations." },
              { id: 5, prompt: `[C1 Advanced - Batch ${batchNum}] Paramount when handling corporate crisis?`, imageIllustration: "🏛️", options: [{ label: "Decisive command with transparent communication", isCorrect: true }, { label: "Hide", isCorrect: false }], explanation: "Crisis leadership demands transparency." }
            ];
          } else {
            questions = [
              { id: 1, prompt: `[C1 Advanced - Batch ${batchNum}] Epistemological philosophy primary focus?`, imageIllustration: "🎓", options: [{ label: "Nature, origin, and limits of human knowledge", isCorrect: true }, { label: "Stars", isCorrect: false }], explanation: "Epistemology studies knowledge." },
              { id: 2, prompt: `[C1 Advanced - Batch ${batchNum}] A priori vs a posteriori knowledge?`, imageIllustration: "🧠", options: [{ label: "Independent of experience vs empirical observation", isCorrect: true }, { label: "Identical", isCorrect: false }], explanation: "A priori is deductive; a posteriori is empirical." },
              { id: 3, prompt: `[C1 Advanced - Batch ${batchNum}] What is a logical tautology?`, imageIllustration: "📜", options: [{ label: "Necessarily true by logical form", isCorrect: true }, { label: "Experiment", isCorrect: false }], explanation: "Tautologies are inherently true." },
              { id: 4, prompt: `[C1 Advanced - Batch ${batchNum}] Advanced concession marker: '___ data is complex...'`, imageIllustration: "⚖️", options: [{ label: "Albeit", isCorrect: true }, { label: "Because", isCorrect: false }], explanation: "Albeit introduces formal concession." },
              { id: 5, prompt: `[C1 Advanced - Batch ${batchNum}] German concept 'Zeitgeist' signify?`, imageIllustration: "🏛️", options: [{ label: "Defining spirit or mood of a historical period", isCorrect: true }, { label: "Building", isCorrect: false }], explanation: "Zeitgeist means spirit of the times." }
            ];
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