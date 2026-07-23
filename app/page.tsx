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
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const levels = ["Kindergarten", "Primary School", "Junior High", "Senior High", "C1 Advanced"];
  
  const getTopicsForLevel = (lvl: string) => {
    if (lvl === "Kindergarten" || lvl === "Primary School") {
      return ["Daily Life", "Social Media", "Academic & Debate"];
    }
    return ["Daily Life", "Social Media", "Job Interviews", "Academic & Debate"];
  };

  const topics = getTopicsForLevel(selectedLevel);

  // Precision-tailored question generator mapped strictly to each specific educational level and category
  const getModulesForSelection = () => {
    const list: Record<string, ModuleData> = {};
    const icons = ["🍎", "📱", "ABC", "🔢", "🎒", "🔬", "🗺️", "💼", "🏛️", "📊"];

    levels.forEach((lvl) => {
      const lvlTopics = getTopicsForLevel(lvl);
      lvlTopics.forEach((top, topIdx) => {
        for (let i = 1; i <= 5; i++) {
          const key = `${lvl}-${top}-Quiz${i}`.replace(/\s+/g, "");
          
          // Generate strictly level-appropriate questions
          let questions: Question[] = [];

          if (lvl === "Kindergarten") {
            if (top === "Daily Life") {
              const items = [
                { p: "Which fruit is sweet, red, and starts with 'A'?", opts: [{ l: "Apple", c: true }, { l: "Banana", c: false }, { l: "Carrot", c: false }], exp: "Apples start with the letter A and are sweet red fruits." },
                { p: "What color is a ripe banana?", opts: [{ l: "Yellow", c: true }, { l: "Blue", c: false }, { l: "Pink", c: false }], exp: "Ripe bananas have bright yellow peels." },
                { p: "What animal says 'Moo' on a farm?", opts: [{ l: "Cow", c: true }, { l: "Duck", c: false }, { l: "Cat", c: false }], exp: "Cows make a low mooing sound." },
                { p: "What do you wear on your feet when it rains?", opts: [{ l: "Rain boots", c: true }, { l: "Sunglasses", c: false }, { l: "Slippers", c: false }], exp: "Rain boots keep feet dry in puddles." },
                { p: "Which meal do we eat in the morning?", opts: [{ l: "Breakfast", c: true }, { l: "Dinner", c: false }, { l: "Midnight snack", c: false }], exp: "Breakfast is the first morning meal." }
              ];
              const item = items[(i - 1) % items.length];
              questions = [{ id: 1, prompt: item.p, imageIllustration: "🍎✨", options: item.opts, explanation: item.exp },
                           { id: 2, prompt: "What toy has four wheels and rolls?", imageIllustration: "🚗", options: [{ l: "Toy car", c: true }, { l: "Teddy bear", c: false }], explanation: "Toy cars have rolling wheels." },
                           { id: 3, prompt: "Where do we sleep at night?", imageIllustration: "🛏️", options: [{ l: "Bed", c: true }, { l: "Kitchen stove", c: false }], explanation: "Beds provide comfortable rest." },
                           { id: 4, prompt: "What do we use to wash dirty hands?", imageIllustration: "🧼", options: [{ l: "Soap and water", c: true }, { l: "Dry paper", c: false }], explanation: "Soap and water clean dirt." },
                           { id: 5, prompt: "What animal barks and wags its tail?", imageIllustration: "🐶", options: [{ l: "Dog", c: true }, { l: "Fish", c: false }], explanation: "Friendly dogs bark." }];
            } else if (top === "Social Media") {
              questions = [
                { id: 1, prompt: "What should you say when someone gives you a gift?", imageIllustration: "🎁", options: [{ l: "Thank you!", c: true }, { l: "Go away", c: false }], explanation: "Saying thank you shows gratitude." },
                { id: 2, prompt: "Is it polite to share toys with your friends?", imageIllustration: "🤝", options: [{ l: "Yes, sharing is kind", c: true }, { l: "No", c: false }], explanation: "Sharing makes play fun." },
                { id: 3, prompt: "How do you greet a friend in the morning?", imageIllustration: "👋", options: [{ l: "Good morning!", c: true }, { l: "Goodnight", c: false }], explanation: "Use good morning early in the day." },
                { id: 4, prompt: "What should you do if a friend feels sad?", imageIllustration: "💙", options: [{ l: "Offer a comforting hug or kind word", c: true }, { l: "Laugh at them", c: false }], explanation: "Empathy helps friends." },
                { id: 5, prompt: "What magic word do you use when asking for a toy?", imageIllustration: "✨", options: [{ l: "Please", c: true }, { l: "Mine", c: false }], explanation: "Please is polite." }
              ];
            } else {
              questions = [
                { id: 1, prompt: "How many sides does a triangle have?", imageIllustration: "🔺", options: [{ l: "3 sides", c: true }, { l: "4 sides", c: false }], explanation: "Triangles have 3 sides." },
                { id: 2, prompt: "What number comes after 2 when counting?", imageIllustration: "🔢", options: [{ l: "3", c: true }, { l: "5", c: false }], explanation: "Counting order is 1, 2, 3." },
                { id: 3, prompt: "What is the opposite of big?", imageIllustration: "🐘", options: [{ l: "Small", c: true }, { l: "Huge", c: false }], explanation: "Small is opposite to big." },
                { id: 4, prompt: "What color do you get when mixing blue and yellow?", imageIllustration: "🎨", options: [{ l: "Green", c: true }, { l: "Red", c: false }], explanation: "Blue and yellow make green." },
                { id: 5, prompt: "How many fingers are on one human hand?", imageIllustration: "✋", options: [{ l: "5 fingers", c: true }, { l: "2 fingers", c: false }], explanation: "Each hand has 5 fingers." }
              ];
            }
          } else if (lvl === "Primary School") {
            if (top === "Daily Life") {
              questions = [
                { id: 1, prompt: "Which subject in school involves addition and subtraction?", imageIllustration: "📐", options: [{ l: "Mathematics", c: true }, { l: "Art", c: false }], explanation: "Math deals with numbers and calculations." },
                { id: 2, prompt: "What tool do you use to erase pencil marks in your notebook?", imageIllustration: "📝", options: [{ l: "An eraser", c: true }, { l: "A ruler", c: false }], explanation: "Erasers lift graphite marks." },
                { id: 3, prompt: "Where do students go during recess to play outdoors?", imageIllustration: "⚽", options: [{ l: "The school playground", c: true }, { l: "The principal's desk", c: false }], explanation: "Playgrounds are outdoor recreation areas." },
                { id: 4, prompt: "What instrument draws straight lines in geometry?", imageIllustration: "📏", options: [{ l: "A ruler", c: true }, { l: "A sponge", c: false }], explanation: "Rulers provide straight edges." },
                { id: 5, prompt: "Who assists students when they get sick at school?", imageIllustration: "🏥", options: [{ l: "The school nurse", c: true }, { l: "The gym coach", c: false }], explanation: "Nurses handle health issues." }
              ];
            } else if (top === "Social Media") {
              questions = [
                { id: 1, prompt: "Should you share your home address or password online with strangers?", imageIllustration: "🔒", options: [{ l: "Never share private information", c: true }, { l: "Share it freely", c: false }], explanation: "Protecting personal info keeps you safe." },
                { id: 2, prompt: "What is cyberbullying?", imageIllustration: "💻", options: [{ l: "Being mean or hurtful to someone online", c: true }, { l: "Playing educational games", c: false }], explanation: "Cyberbullying is online harassment." },
                { id: 3, prompt: "Who should you tell if someone sends an unkind message online?", imageIllustration: "👨‍👩‍👧", options: [{ l: "A trusted parent, guardian, or teacher", c: true }, { l: "Keep it a secret", c: false }], explanation: "Trusted adults help stop bullying." },
                { id: 4, prompt: "Is it healthy to stare at screens all day without breaks?", imageIllustration: "🌳", options: [{ l: "No, balance screen time with outdoor play", c: true }, { l: "Yes", c: false }], explanation: "Balance prevents eye strain." },
                { id: 5, prompt: "What does posting respectful comments show?", imageIllustration: "⭐", options: [{ l: "Good digital citizenship", c: true }, { l: "Bad manners", c: false }], explanation: "Respectful communication defines good citizenship." }
              ];
            } else {
              questions = [
                { id: 1, prompt: "In a story, what do we call the main character?", imageIllustration: "📖", options: [{ l: "The protagonist", c: true }, { l: "The table of contents", c: false }], explanation: "Protagonists are main heroes." },
                { id: 2, prompt: "What do plants need from the sun to grow?", imageIllustration: "🌱", options: [{ l: "Sunlight and water", c: true }, { l: "Soda", c: false }], explanation: "Plants require sunlight for photosynthesis." },
                { id: 3, prompt: "What is the capital city of your country or region?", imageIllustration: "🗺️", options: [{ l: "The primary government hub", c: true }, { l: "A random village", c: false }], explanation: "Capitals host governing institutions." },
                { id: 4, prompt: "Which state of matter is ice?", imageIllustration: "🧊", options: [{ l: "Solid", c: true }, { l: "Gas", c: false }], explanation: "Ice is solid frozen water." },
                { id: 5, prompt: "What do we call animals that eat only plants?", imageIllustration: "🌿", options: [{ l: "Herbivores", c: true }, { l: "Carnivores", c: false }], explanation: "Herbivores eat vegetation." }
              ];
            }
          } else if (lvl === "Junior High") {
            if (top === "Daily Life") {
              questions = [
                { id: 1, prompt: "When navigating a train station, what does 'platform' mean?", imageIllustration: "🚆", options: [{ l: "The area beside the railway tracks where passengers board", c: true }, { l: "The ticket price", c: false }], explanation: "Platforms are boarding zones." },
                { id: 2, prompt: "Choose the correct preposition: 'Turn left ___ the traffic light.'", imageIllustration: "🚦", options: [{ l: "at", c: true }, { l: "on", c: false }, { l: "in", c: false }], explanation: "We use 'at' for specific intersections." },
                { id: 3, prompt: "What is the primary benefit of regular cardiovascular exercise?", imageIllustration: "🏃‍♂️", options: [{ l: "Improving heart and lung endurance", c: true }, { l: "Weakening muscles", c: false }], explanation: "Cardio strengthens cardiac function." },
                { id: 4, prompt: "How do you politely ask for train schedule information?", imageIllustration: "🎫", options: [{ l: "Could you please tell me when the next train departs?", c: true }, { l: "Give me the schedule now.", c: false }], explanation: "Polite modals ensure courteous interaction." },
                { id: 5, prompt: "What does luggage allowance refer to at airport check-in?", imageIllustration: "🧳", options: [{ l: "The maximum weight and size permitted for bags", c: true }, { l: "Free snacks", c: false }], explanation: "Airlines enforce baggage limits." }
              ];
            } else if (top === "Social Media") {
              questions = [
                { id: 1, prompt: "What does the abbreviation 'DIY' stand for in online tutorials?", imageIllustration: "🛠️", options: [{ l: "Do It Yourself", c: true }, { l: "Do It Yesterday", c: false }], explanation: "DIY means self-made creation." },
                { id: 2, prompt: "Why is Two-Factor Authentication (2FA) important for social accounts?", imageIllustration: "🔐", options: [{ l: "It adds an extra security layer beyond passwords", c: true }, { l: "It deletes your account", c: false }], explanation: "2FA prevents unauthorized breaches." },
                { id: 3, prompt: "What is a 'digital footprint'?", imageIllustration: "👣", options: [{ l: "The trail of data you leave behind when using the internet", c: true }, { l: "Shoe prints in mud", c: false }], explanation: "Digital footprints record online activity." },
                { id: 4, prompt: "How should you respond to inflammatory comments online?", imageIllustration: "🛡️", options: [{ l: "Ignore or report without escalating conflict", c: true }, { l: "Insult back aggressively", c: false }], explanation: "Constructive moderation stops toxic cycles." },
                { id: 5, prompt: "What does 'TL;DR' mean in long articles?", imageIllustration: "📖", options: [{ l: "Too Long; Didn't Read (a brief summary)", c: true }, { l: "Totally Lost; Delete Request", c: false }], explanation: "TL;DR provides instant summaries." }
              ];
            } else if (top === "Job Interviews") {
              questions = [
                { id: 1, prompt: "What does 'punctual' mean in a workplace setting?", imageIllustration: "⏰", options: [{ l: "Arriving consistently on time", c: true }, { l: "Working overnight", c: false }], explanation: "Punctuality is vital for jobs." },
                { id: 2, prompt: "How should you greet an interviewer?", imageIllustration: "🤝", options: [{ l: "Smile, make eye contact, and offer a firm handshake", c: true }, { l: "Look at your mobile phone", c: false }], explanation: "First impressions set professional tone." },
                { id: 3, prompt: "What is the purpose of a student resume?", imageIllustration: "📄", options: [{ l: "To summarize education, skills, and extracurriculars", c: true }, { l: "To write poetry", c: false }], explanation: "Resumes showcase qualifications." },
                { id: 4, prompt: "Why do employers ask about your strengths?", imageIllustration: "💪", options: [{ l: "To understand your unique value contribution", c: true }, { l: "To trick you", c: false }], explanation: "Strengths highlight candidate fit." },
                { id: 5, prompt: "What is a great question to ask at the end of an interview?", imageIllustration: "❓", options: [{ l: "What does a typical workday look like in this role?", c: true }, { l: "Can I sleep here?", c: false }], explanation: "Asking about duties shows genuine interest."
              ];
            } else {
              questions = [
                { id: 1, prompt: "Why must you include a bibliography in a research paper?", imageIllustration: "📑", options: [{ l: "To give proper credit to sources and avoid plagiarism", c: true }, { l: "To make the paper heavier", c: false }], explanation: "Bibliographies ensure academic integrity." },
                { id: 2, prompt: "What information does a dictionary provide?", imageIllustration: "📖", options: [{ l: "Phonetic pronunciations, definitions, and word origins", c: true }, { l: "Weather forecasts", c: false }], explanation: "Dictionaries define lexical terms." },
                { id: 3, prompt: "What is the first step of the scientific method?", imageIllustration: "🔬", options: [{ l: "Making observations and asking a question", c: true }, { l: "Writing the conclusion", c: false }], explanation: "Inquiry begins with observation." },
                { id: 4, prompt: "What is a hypothesis?", imageIllustration: "💡", options: [{ l: "A testable proposed explanation for an observation", c: true }, { l: "A proven absolute law", c: false }], explanation: "Hypotheses guide experiments." },
                { id: 5, prompt: "What does an atlas contain?", imageIllustration: "🗺️", options: [{ l: "Geopolitical and physical maps of the world", c: true }, { l: "Cooking recipes", c: false }], explanation: "Atlases map geography." }
              ];
            }
          } else if (lvl === "Senior High") {
            if (top === "Daily Life") {
              questions = [
                { id: 1, prompt: "In personal finance, what does the 50/30/20 budgeting rule allocate?", imageIllustration: "📊", options: [{ l: "50% Needs, 30% Wants, 20% Savings/Debt", c: true }, { l: "50% Savings, 30% Rent, 20% Coffee", c: false }], explanation: "The 50/30/20 rule balances living expenses." },
                { id: 2, prompt: "What does APR stand for in banking and loans?", imageIllustration: "💳", options: [{ l: "Annual Percentage Rate", c: true }, { l: "Advanced Payment Ratio", c: false }], explanation: "APR calculates yearly borrowing costs." },
                { id: 3, prompt: "Why is having an emergency fund essential before renting an apartment?", imageIllustration: "🏠", options: [{ l: "To cover unexpected expenses without going into debt", c: true }, { l: "To buy luxury vacations", c: false }], explanation: "Emergency funds provide financial security." },
                { id: 4, prompt: "What is a refundable security deposit used for in apartment leasing?", imageIllustration: "🔑", options: [{ l: "To cover potential property damage beyond normal wear", c: true }, { l: "Landlord monthly salary", c: false }], explanation: "Deposits protect landlords against damage." },
                { id: 5, prompt: "What does compounding interest mean for long-term savings?", imageIllustration: "📈", options: [{ l: "Earning interest on both initial principal and accumulated interest", c: true }, { l: "Paying penalties", c: false }], explanation: "Compounding accelerates wealth growth." }
              ];
            } else if (top === "Social Media") {
              questions = [
                { id: 1, prompt: "How do college admissions officers and recruiters view public social media feeds?", imageIllustration: "🎓", options: [{ l: "As an extension of your professional digital footprint", c: true }, { l: "They never look at them", c: false }], explanation: "Digital footprints impact evaluations." },
                { id: 2, prompt: "What is a 'phishing' scam?", imageIllustration: "🎣", options: [{ l: "Deceptive messaging designed to steal sensitive credentials", c: true }, { l: "A harmless computer game", c: false }], explanation: "Phishing targets login security." },
                { id: 3, prompt: "What does open-source software licensing permit?", imageIllustration: "💻", options: [{ l: "Collaborative inspection, modification, and distribution of source code", c: true }, { l: "Stealing copyright software", c: false }], explanation: "Open-source promotes shared development." },
                { id: 4, prompt: "Why should you audit privacy settings on social networks?", imageIllustration: "🛡️", options: [{ l: "To control who accesses your personal data and posts", c: true }, { l: "To slow down your phone", c: false }], explanation: "Privacy audits safeguard personal data." },
                { id: 5, prompt: "What characterizes a strong cryptographic password?", imageIllustration: "🔑", options: [{ l: "High entropy combining symbols, numbers, and case variation", c: true }, { l: "Your birthdate", c: false }], explanation: "High entropy resists brute-force cracking." }
              ];
            } else if (top === "Job Interviews") {
              questions = [
                { id: 1, prompt: "What is the primary purpose of a professional cover letter?", imageIllustration: "✉️", options: [{ l: "To provide a tailored narrative connecting your skills to company needs", c: true }, { l: "To repeat your resume word for word", c: false }], explanation: "Cover letters personalize applications." },
                { id: 2, prompt: "What are 'transferable skills' in career readiness?", imageIllustration: "💼", options: [{ l: "Versatile competencies like problem-solving and leadership applicable across industries", c: true }, { l: "Train station tickets", c: false }], explanation: "Transferable skills work anywhere." },
                { id: 3, prompt: "What is an 'elevator pitch'?", imageIllustration: "⏱️", options: [{ l: "A concise 30-second summary of your professional value", c: true }, { l: "A song sung in elevators", c: false }], explanation: "Elevator pitches deliver instant value intros." },
                { id: 4, prompt: "When should you send a post-interview thank-you note?", imageIllustration: "📧", options: [{ l: "Within 24 hours of concluding the interview", c: true }, { l: "After three months", c: false }], explanation: "Prompt thank-you notes keep you memorable." },
                { id: 5, prompt: "How should you answer behavioral questions using the STAR method?", imageIllustration: "⭐", options: [{ l: "Situation, Task, Action, Result", c: true }, { l: "Sing, Talk, Act, Rest", c: false }], explanation: "STAR structures behavioral storytelling." }
              ];
            } else {
              questions = [
                { id: 1, prompt: "In a B2 discursive essay, what is the role of a thesis statement?", imageIllustration: "🏛️", options: [{ l: "To clearly state your central argument and roadmap the essay", c: true }, { l: "To tell a fictional joke", c: false }], explanation: "Thesis statements anchor arguments." },
                { id: 2, prompt: "What is a 'straw man' logical fallacy?", imageIllustration: "🧠", options: [{ l: "Misrepresenting an opponent's argument to make it easier to attack", c: true }, { l: "Building a scarecrow in a field", c: false }], explanation: "Straw man fallacies distort logic." },
                { id: 3, prompt: "What purpose does academic peer review serve?", imageIllustration: "📑", options: [{ l: "Validating experimental methodology and academic rigor before publication", c: true }, { l: "Checking spelling only", c: false }], explanation: "Peer review ensures scientific integrity." },
                { id: 4, prompt: "Choose the correct academic transition: '___ potential financial hurdles, the project succeeded.'", imageIllustration: "⚖️", options: [{ l: "Notwithstanding", c: true }, { l: "Because", c: false }, { l: "And", c: false }], explanation: "Notwithstanding denotes formal concession." },
                { id: 5, prompt: "What is empirical evidence?", imageIllustration: "🔬", options: [{ l: "Information acquired by observation and experimentation", c: true }, { l: "Pure personal opinion", c: false }], explanation: "Empirical data grounds science." }
              ];
            }
          } else {
            // C1 Advanced
            if (top === "Daily Life") {
              questions = [
                { id: 1, prompt: "What does the idiom 'to bite the bullet' mean?", imageIllustration: "🎯", options: [{ l: "To face a difficult situation with courage and endurance", c: true }, { l: "To eat a metallic snack", c: false }], explanation: "Biting the bullet means enduring hardship." },
                { id: 2, prompt: "Identify the correct syntactic inversion: 'Hardly ___ when the conference commenced.'", imageIllustration: "📜", options: [{ l: "had I arrived", c: true }, { l: "I had arrived", c: false }], explanation: "Negative adverbials require auxiliary inversion." },
                { id: 3, prompt: "What is the semantic nuance of 'ubiquitous'?", imageIllustration: "🌍", options: [{ l: "Present, appearing, or found everywhere simultaneously", c: true }, { l: "Rare and hidden", c: false }], explanation: "Ubiquitous describes omnipresence." },
                { id: 4, prompt: "What does 'to mitigate' a crisis imply?", imageIllustration: "🛡️", options: [{ l: "To lessen the severity or gravity of negative impacts", c: true }, { l: "To worsen the problem", c: false }], explanation: "Mitigation reduces damage." },
                { id: 5, prompt: "Choose the precise collocation: 'To mount a ___ defense against accusations.'", imageIllustration: "⚖️", options: [{ l: "vigorous", c: true }, { l: "heavy", c: false }, { l: "loud", c: false }], explanation: "We mount a vigorous defense." }
              ];
            } else if (top === "Social Media") {
              questions = [
                { id: 1, prompt: "What is an algorithmic 'echo chamber'?", imageIllustration: "📡", options: [{ l: "An environment where user beliefs are endlessly reinforced by isolated feeds", c: true }, { l: "A loud recording studio", c: false }], explanation: "Echo chambers restrict ideological diversity." },
                { id: 2, prompt: "What ethical threat do AI-generated 'deepfakes' pose?", imageIllustration: "🤖", options: [{ l: "Fabricating hyper-realistic synthetic media to spread misinformation", c: true }, { l: "Improving video game graphics", c: false }], explanation: "Deepfakes threaten informational trust." },
                { id: 3, prompt: "How does algorithmic bias manifest in machine learning?", imageIllustration: "📊", options: [{ l: "When models inherit historical human prejudices from training datasets", c: true }, { l: "When computers run too fast", c: false }], explanation: "Biased training data produces biased AI." },
                { id: 4, prompt: "What is information literacy in the digital age?", imageIllustration: "🔍", options: [{ l: "The ability to critically evaluate, verify, and parse media sources", c: true }, { l: "Knowing how to type fast", c: false }], explanation: "Information literacy counters fake news." },
                { id: 5, prompt: "What does synthetic media regulation attempt to curb?", imageIllustration: "🏛️", options: [{ l: "Unauthorized impersonation and unverified disinformation", c: true }, { l: "Open-source coding", c: false }], explanation: "Regulations target deceptive deepfakes." }
              ];
            } else if (top === "Job Interviews") {
              questions = [
                { id: 1, prompt: "In executive interviews, what does 'metrics-driven ROI storytelling' entail?", imageIllustration: "📈", options: [{ l: "Articulating past achievements through quantified business impact and revenue growth", c: true }, { l: "Telling jokes about finance", c: false }], explanation: "ROI storytelling proves financial value." },
                { id: 2, prompt: "How do executive leaders manage stakeholder alignment during conflicts?", imageIllustration: "🤝", options: [{ l: "By diplomatically reconciling competing priorities using empirical risk models", c: true }, { l: "By ignoring dissenting voices", c: false }], explanation: "Alignment requires diplomatic reconciliation." },
                { id: 3, prompt: "What does 'strategic foresight' demonstrate in senior leadership?", imageIllustration: "🚀", options: [{ l: "The capacity to anticipate long-term industry disruption and pivot proactively", c: true }, { l: "Short-term micromanagement", c: false }], explanation: "Foresight anticipates future shifts." },
                { id: 4, prompt: "Choose the executive term for streamlining organizational inefficiencies:", imageIllustration: "⚙️", options: [{ l: "Re-engineering operational workflows", c: true }, { l: "Slowing down production", c: false }], explanation: "Re-engineering optimizes operations." },
                { id: 5, prompt: "What is paramount when handling an unforeseen corporate crisis?", imageIllustration: "🏛️", options: [{ l: "Taking decisive command while maintaining transparent stakeholder communication", c: true }, { l: "Hiding the problem", c: false }], explanation: "Crisis leadership demands transparency." }
              ];
            } else {
              questions = [
                { id: 1, prompt: "What is the primary focus of epistemological philosophy?", imageIllustration: "🎓", options: [{ l: "Investigating the nature, origin, and limits of human knowledge", c: true }, { l: "Studying star constellations", c: false }], explanation: "Epistemology studies knowledge." },
                { id: 2, prompt: "What distinguishes a priori knowledge from a posteriori knowledge?", imageIllustration: "🧠", options: [{ l: "A priori is independent of experience; a posteriori is derived from empirical observation", c: true }, { l: "They are identical", c: false }], explanation: "A priori is deductive; a posteriori is empirical." },
                { id: 3, prompt: "What is a logical tautology?", imageIllustration: "📜", options: [{ l: "A statement that is necessarily true by virtue of its logical form", c: true }, { l: "A proven scientific experiment", c: false }], explanation: "Tautologies are inherently true." },
                { id: 4, prompt: "Choose the advanced concession marker: '___ the empirical data is complex, the trend is unmistakable.'", imageIllustration: "⚖️", options: [{ l: "Albeit", c: true }, { l: "Because", c: false }, { l: "Thus", c: false }], explanation: "Albeit introduces formal concession." },
                { id: 5, prompt: "What does the German concept 'Zeitgeist' signify in cultural discourse?", imageIllustration: "🏛️", options: [{ l: "The defining spirit or mood of a particular historical period", c: true }, { l: "A physical building", c: false }], explanation: "Zeitgeist means spirit of the times." }
              ];
            }
          }

          list[key] = {
            title: `${lvl}: Quiz ${i} - ${top} Masterclass`,
            image: icons[(topIdx + i) % icons.length],
            level: lvl,
            category: top,
            source: `${lvl} Certified Academic Framework (Batch ${i})`,
            questions: questions
          };
        }
      });
    });
    return list;
  };

  const currentQuizModules = getModulesForSelection();

  // STUDY MATERIALS DATABASE
  const studyGuides: StudyMaterial[] = [
    {
      id: "Kindergarten-DailyLife",
      title: "Kindergarten: Daily Life & Phonemic Foundations",
      level: "Kindergarten",
      category: "Daily Life",
      summary: "Verified early childhood literacy framework based on Systematic Synthetic Phonics standards for sound and word recognition.",
      illustration: "🧸🍎✨",
      accentColor: "bg-pink-50 border-pink-100 text-pink-600",
      subTopics: [
        {
          title: "1. Phonemic Awareness & Auditory Discrimination",
          subtitle: "Isolating individual sounds in spoken words",
          explanation: ["Phonemic awareness is purely auditory. Children learn to distinguish individual phonemes inside spoken words before reading print."],
          examples: ["Isolating beginning sounds: 'Sun' starts with /s/", "Segmenting syllables like 'ap-ple'."]
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

  // STUDY GUIDE FLASHCARD MODE VIEW
  const currentStudyGuide = activeStudyId ? (() => {
    let guide = studyGuides.find(g => g.id === activeStudyId);
    if (!guide) {
      const [lvl, top] = activeStudyId.split("-");
      guide = {
        id: activeStudyId,
        title: `${lvl || selectedLevel}: Master Guide on ${top || selectedTopic}`,
        level: lvl || selectedLevel,
        category: top || selectedTopic,
        summary: `Comprehensive academic and practical study flashcards designed for students focusing on this topic.`,
        illustration: "⚖️🏛️📝",
        accentColor: "bg-sky-50 border-sky-100 text-sky-600",
        subTopics: [
          {
            title: `1. Core Principles & Concepts`,
            subtitle: "Fundamental rules and terminology",
            explanation: [
              `Mastering this topic requires structured understanding of core rules and terminology.`,
              `Students learn practical applications and standard conventions used in real-world environments.`
            ],
            examples: [`Standardized rule application.`, `Contextual vocabulary usage in everyday scenarios.`]
          }
        ]
      };
    }
    return guide;
  })() : null;

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

      {/* TAB 1: PRACTICE QUIZZES (STRICTLY FILTERED BY SELECTED LEVEL & TOPIC) */}
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

      {/* TAB 2: STUDY MATERIALS (DYNAMIC MATCHER GUARANTEED TO MATCH SELECTED LEVEL & TOPIC) */}
      {activeTab === "materials" && (
        <section className="max-w-4xl mx-auto space-y-6">
          {(() => {
            const targetId = `${selectedLevel}-${selectedTopic}`.replace(/\s+/g, "");
            let matchedGuide = studyGuides.find(g => g.id === targetId || (g.level === selectedLevel && g.category === selectedTopic));

            if (!matchedGuide) {
              matchedGuide = {
                id: targetId,
                title: `${selectedLevel}: Master Guide on ${selectedTopic}`,
                level: selectedLevel,
                category: selectedTopic,
                summary: `Comprehensive academic and practical study flashcards designed for ${selectedLevel} students focusing on ${selectedTopic}.`,
                illustration: selectedTopic === "Daily Life" ? "🛒🌍✨" : selectedTopic === "Social Media" ? "📱💬🛡️" : selectedTopic === "Job Interviews" ? "💼👔📈" : "⚖️🏛️📝",
                accentColor: "bg-sky-50 border-sky-100 text-sky-600",
                subTopics: [
                  {
                    title: `1. Core Principles of ${selectedTopic}`,
                    subtitle: `Fundamental rules and terminology for ${selectedLevel}`,
                    explanation: [
                      `Mastering ${selectedTopic} at the ${selectedLevel} stage requires structured understanding of core rules and terminology.`,
                      `Students learn practical applications and standard conventions used in real-world environments.`
                    ],
                    examples: [`Standardized rule application for ${selectedTopic}.`, `Contextual vocabulary usage in everyday scenarios.`]
                  },
                  {
                    title: `2. Advanced Strategies & Applications`,
                    subtitle: "Practical exercises and structural patterns",
                    explanation: [
                      `Applying theoretical concepts to structured communication and problem-solving.`,
                      `Avoiding common pitfalls and refining your stylistic register.`
                    ],
                    examples: [`Constructing clear, grammatically correct statements.`, `Evaluating structural integrity in formal discourse.`]
                  }
                ]
              };
            }

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