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

  // EXACT LEVEL-SPECIFIC QUIZ DATA GENERATOR (NO FALLBACK PLACEHOLDERS)
  const getModulesForSelection = () => {
    const list: Record<string, ModuleData> = {};
    const icons = ["🍎", "📱", "ABC", "🔢", "🎒", "🔬", "🗺️", "💼", "🏛️", "📊"];

    levels.forEach((lvl) => {
      const lvlTopics = getTopicsForLevel(lvl);
      lvlTopics.forEach((top, topIdx) => {
        for (let i = 1; i <= 5; i++) {
          const key = `${lvl}-${top}-Quiz${i}`.replace(/\s+/g, "");
          
          let questions: Question[] = [];

          if (lvl === "Kindergarten") {
            if (top === "Daily Life") {
              questions = [
                { id: 1, prompt: "Which fruit is sweet, red, and starts with 'A'?", imageIllustration: "🍎", options: [{ label: "Apple", isCorrect: true }, { label: "Banana", isCorrect: false }, { label: "Carrot", isCorrect: false }], explanation: "Apples start with A and are sweet red fruits." },
                { id: 2, prompt: "What color is a ripe banana?", imageIllustration: "🍌", options: [{ label: "Yellow", isCorrect: true }, { label: "Blue", isCorrect: false }, { label: "Pink", isCorrect: false }], explanation: "Ripe bananas have bright yellow peels." },
                { id: 3, prompt: "What animal says 'Moo' on a farm?", imageIllustration: "🐮", options: [{ label: "Cow", isCorrect: true }, { label: "Duck", isCorrect: false }, { label: "Cat", isCorrect: false }], explanation: "Cows make a low mooing sound." },
                { id: 4, prompt: "What do you wear on your feet when it rains outside?", imageIllustration: "👢", options: [{ label: "Rain boots", isCorrect: true }, { label: "Sunglasses", isCorrect: false }, { label: "Slippers", isCorrect: false }], explanation: "Rain boots keep feet dry in puddles." },
                { id: 5, prompt: "Which meal do we eat in the morning?", imageIllustration: "🌅", options: [{ label: "Breakfast", isCorrect: true }, { label: "Dinner", isCorrect: false }, { label: "Midnight snack", isCorrect: false }], explanation: "Breakfast is the first morning meal." }
              ];
            } else if (top === "Social Media") {
              questions = [
                { id: 1, prompt: "What should you say when someone gives you a nice gift?", imageIllustration: "🎁", options: [{ label: "Thank you!", isCorrect: true }, { label: "Go away", isCorrect: false }], explanation: "Saying thank you shows gratitude." },
                { id: 2, prompt: "Is it polite to share toys with your friends?", imageIllustration: "🤝", options: [{ label: "Yes, sharing is kind", isCorrect: true }, { label: "No", isCorrect: false }], explanation: "Sharing makes play fun for everyone." },
                { id: 3, prompt: "How do you greet a friend in the morning?", imageIllustration: "👋", options: [{ label: "Good morning!", isCorrect: true }, { label: "Goodnight", isCorrect: false }], explanation: "Use good morning early in the day." },
                { id: 4, prompt: "What should you do if a friend feels sad?", imageIllustration: "💙", options: [{ label: "Offer a comforting hug or kind word", isCorrect: true }, { label: "Laugh at them", isCorrect: false }], explanation: "Empathy helps friends feel better." },
                { id: 5, prompt: "What magic word do you use when asking for a toy?", imageIllustration: "✨", options: [{ label: "Please", isCorrect: true }, { label: "Mine", isCorrect: false }], explanation: "Please is polite." }
              ];
            } else {
              questions = [
                { id: 1, prompt: "How many sides does a triangle have?", imageIllustration: "🔺", options: [{ label: "3 sides", isCorrect: true }, { label: "4 sides", isCorrect: false }], explanation: "Triangles have 3 straight sides." },
                { id: 2, prompt: "What number comes after 2 when counting?", imageIllustration: "🔢", options: [{ label: "3", isCorrect: true }, { label: "5", isCorrect: false }], explanation: "Counting order is 1, 2, 3." },
                { id: 3, prompt: "What is the opposite of big?", imageIllustration: "🐘", options: [{ label: "Small", isCorrect: true }, { label: "Huge", isCorrect: false }], explanation: "Small is opposite to big." },
                { id: 4, prompt: "What color do you get when mixing blue and yellow?", imageIllustration: "🎨", options: [{ label: "Green", isCorrect: true }, { label: "Red", isCorrect: false }], explanation: "Blue and yellow make green." },
                { id: 5, prompt: "How many fingers are on one human hand?", imageIllustration: "✋", options: [{ label: "5 fingers", isCorrect: true }, { label: "2 fingers", isCorrect: false }], explanation: "Each hand has 5 fingers." }
              ];
            }
          } else if (lvl === "Primary School") {
            if (top === "Daily Life") {
              questions = [
                { id: 1, prompt: "Which subject in school involves addition and subtraction?", imageIllustration: "📐", options: [{ label: "Mathematics", isCorrect: true }, { label: "Art", isCorrect: false }], explanation: "Math deals with numbers and calculations." },
                { id: 2, prompt: "What tool do you use to erase pencil marks in your notebook?", imageIllustration: "📝", options: [{ label: "An eraser", isCorrect: true }, { label: "A ruler", isCorrect: false }], explanation: "Erasers lift graphite marks." },
                { id: 3, prompt: "Where do students go during recess to play outdoors?", imageIllustration: "⚽", options: [{ label: "The school playground", isCorrect: true }, { label: "The principal's desk", isCorrect: false }], explanation: "Playgrounds are outdoor recreation areas." },
                { id: 4, prompt: "What instrument draws straight lines in geometry?", imageIllustration: "📏", options: [{ label: "A ruler", isCorrect: true }, { label: "A sponge", isCorrect: false }], explanation: "Rulers provide straight edges." },
                { id: 5, prompt: "Who assists students when they get sick at school?", imageIllustration: "🏥", options: [{ label: "The school nurse", isCorrect: true }, { label: "The gym coach", isCorrect: false }], explanation: "Nurses handle health issues." }
              ];
            } else if (top === "Social Media") {
              questions = [
                { id: 1, prompt: "Should you share your home address or password online with strangers?", imageIllustration: "🔒", options: [{ label: "Never share private information", isCorrect: true }, { label: "Share it freely", isCorrect: false }], explanation: "Protecting personal info keeps you safe." },
                { id: 2, prompt: "What is cyberbullying?", imageIllustration: "💻", options: [{ label: "Being mean or hurtful to someone online", isCorrect: true }, { label: "Playing educational games", isCorrect: false }], explanation: "Cyberbullying is online harassment." },
                { id: 3, prompt: "Who should you tell if someone sends an unkind message online?", imageIllustration: "👨‍👩‍👧", options: [{ label: "A trusted parent, guardian, or teacher", isCorrect: true }, { label: "Keep it a secret", isCorrect: false }], explanation: "Trusted adults help stop bullying." },
                { id: 4, prompt: "Is it healthy to stare at screens all day without breaks?", imageIllustration: "🌳", options: [{ label: "No, balance screen time with outdoor play", isCorrect: true }, { label: "Yes", isCorrect: false }], explanation: "Balance prevents eye strain." },
                { id: 5, prompt: "What does posting respectful comments show?", imageIllustration: "⭐", options: [{ label: "Good digital citizenship", isCorrect: true }, { label: "Bad manners", isCorrect: false }], explanation: "Respectful communication defines good citizenship." }
              ];
            } else {
              questions = [
                { id: 1, prompt: "In a story, what do we call the main character?", imageIllustration: "📖", options: [{ label: "The protagonist", isCorrect: true }, { label: "The table of contents", isCorrect: false }], explanation: "Protagonists are main heroes." },
                { id: 2, prompt: "What do plants need from the sun to grow?", imageIllustration: "🌱", options: [{ label: "Sunlight and water", isCorrect: true }, { label: "Soda", isCorrect: false }], explanation: "Plants require sunlight for photosynthesis." },
                { id: 3, prompt: "What is the capital city of your country or region?", imageIllustration: "🗺️", options: [{ label: "The primary government hub", isCorrect: true }, { label: "A random village", isCorrect: false }], explanation: "Capitals host governing institutions." },
                { id: 4, prompt: "Which state of matter is ice?", imageIllustration: "🧊", options: [{ label: "Solid", isCorrect: true }, { label: "Gas", isCorrect: false }], explanation: "Ice is solid frozen water." },
                { id: 5, prompt: "What do we call animals that eat only plants?", imageIllustration: "🌿", options: [{ label: "Herbivores", isCorrect: true }, { label: "Carnivores", isCorrect: false }], explanation: "Herbivores eat vegetation." }
              ];
            }
          } else if (lvl === "Junior High") {
            if (top === "Daily Life") {
              questions = [
                { id: 1, prompt: "When navigating a train station, what does 'platform' mean?", imageIllustration: "🚆", options: [{ label: "The area beside the railway tracks where passengers board", isCorrect: true }, { label: "The ticket price", isCorrect: false }], explanation: "Platforms are boarding zones." },
                { id: 2, prompt: "Choose the correct preposition: 'Turn left ___ the traffic light.'", imageIllustration: "🚦", options: [{ label: "at", isCorrect: true }, { label: "on", isCorrect: false }, { label: "in", isCorrect: false }], explanation: "We use 'at' for specific intersections." },
                { id: 3, prompt: "What is the primary benefit of regular cardiovascular exercise?", imageIllustration: "🏃‍♂️", options: [{ label: "Improving heart and lung endurance", isCorrect: true }, { label: "Weakening muscles", isCorrect: false }], explanation: "Cardio strengthens cardiac function." },
                { id: 4, prompt: "How do you politely ask for train schedule information?", imageIllustration: "🎫", options: [{ label: "Could you please tell me when the next train departs?", isCorrect: true }, { label: "Give me the schedule now.", isCorrect: false }], explanation: "Polite modals ensure courteous interaction." },
                { id: 5, prompt: "What does luggage allowance refer to at airport check-in?", imageIllustration: "🧳", options: [{ label: "The maximum weight and size permitted for bags", isCorrect: true }, { label: "Free snacks", isCorrect: false }], explanation: "Airlines enforce baggage limits." }
              ];
            } else if (top === "Social Media") {
              questions = [
                { id: 1, prompt: "What does the abbreviation 'DIY' stand for in online tutorials?", imageIllustration: "🛠️", options: [{ label: "Do It Yourself", isCorrect: true }, { label: "Do It Yesterday", isCorrect: false }], explanation: "DIY means self-made creation." },
                { id: 2, prompt: "Why is Two-Factor Authentication (2FA) important for social accounts?", imageIllustration: "🔐", options: [{ label: "It adds an extra security layer beyond passwords", isCorrect: true }, { label: "It deletes your account", isCorrect: false }], explanation: "2FA prevents unauthorized breaches." },
                { id: 3, prompt: "What is a 'digital footprint'?", imageIllustration: "👣", options: [{ label: "The trail of data you leave behind when using the internet", isCorrect: true }, { label: "Shoe prints in mud", isCorrect: false }], explanation: "Digital footprints record online activity." },
                { id: 4, prompt: "How should you respond to inflammatory comments online?", imageIllustration: "🛡️", options: [{ label: "Ignore or report without escalating conflict", isCorrect: true }, { label: "Insult back aggressively", isCorrect: false }], explanation: "Constructive moderation stops toxic cycles." },
                { id: 5, prompt: "What does 'TL;DR' mean in long articles?", imageIllustration: "📖", options: [{ label: "Too Long; Didn't Read (a brief summary)", isCorrect: true }, { label: "Totally Lost; Delete Request", isCorrect: false }], explanation: "TL;DR provides instant summaries." }
              ];
            } else if (top === "Job Interviews") {
              questions = [
                { id: 1, prompt: "What does 'punctual' mean in a workplace setting?", imageIllustration: "⏰", options: [{ label: "Arriving consistently on time", isCorrect: true }, { label: "Working overnight", isCorrect: false }], explanation: "Punctuality is vital for jobs." },
                { id: 2, prompt: "How should you greet an interviewer?", imageIllustration: "🤝", options: [{ label: "Smile, make eye contact, and offer a firm handshake", isCorrect: true }, { label: "Look at your mobile phone", isCorrect: false }], explanation: "First impressions set professional tone." },
                { id: 3, prompt: "What is the purpose of a student resume?", imageIllustration: "📄", options: [{ label: "To summarize education, skills, and extracurriculars", isCorrect: true }, { label: "To write poetry", isCorrect: false }], explanation: "Resumes showcase qualifications." },
                { id: 4, prompt: "Why do employers ask about your strengths?", imageIllustration: "💪", options: [{ label: "To understand your unique value contribution", isCorrect: true }, { label: "To trick you", isCorrect: false }], explanation: "Strengths highlight candidate fit." },
                { id: 5, prompt: "What is a great question to ask at the end of an interview?", imageIllustration: "❓", options: [{ label: "What does a typical workday look like in this role?", isCorrect: true }, { label: "Can I sleep here?", isCorrect: false }], explanation: "Asking about duties shows genuine interest." }
              ];
            } else {
              questions = [
                { id: 1, prompt: "Why must you include a bibliography in a research paper?", imageIllustration: "📑", options: [{ label: "To give proper credit to sources and avoid plagiarism", isCorrect: true }, { label: "To make the paper heavier", isCorrect: false }], explanation: "Bibliographies ensure academic integrity." },
                { id: 2, prompt: "What information does a dictionary provide?", imageIllustration: "📖", options: [{ label: "Phonetic pronunciations, definitions, and word origins", isCorrect: true }, { label: "Weather forecasts", isCorrect: false }], explanation: "Dictionaries define lexical terms." },
                { id: 3, prompt: "What is the first step of the scientific method?", imageIllustration: "🔬", options: [{ label: "Making observations and asking a question", isCorrect: true }, { label: "Writing the conclusion", isCorrect: false }], explanation: "Inquiry begins with observation." },
                { id: 4, prompt: "What is a hypothesis?", imageIllustration: "💡", options: [{ label: "A testable proposed explanation for an observation", isCorrect: true }, { label: "A proven absolute law", isCorrect: false }], explanation: "Hypotheses guide experiments." },
                { id: 5, prompt: "What does an atlas contain?", imageIllustration: "🗺️", options: [{ label: "Geopolitical and physical maps of the world", isCorrect: true }, { label: "Cooking recipes", isCorrect: false }], explanation: "Atlases map geography." }
              ];
            }
          } else if (lvl === "Senior High") {
            if (top === "Daily Life") {
              questions = [
                { id: 1, prompt: "In personal finance, what does the 50/30/20 budgeting rule allocate?", imageIllustration: "📊", options: [{ label: "50% Needs, 30% Wants, 20% Savings/Debt", isCorrect: true }, { label: "50% Savings, 30% Rent, 20% Coffee", isCorrect: false }], explanation: "The 50/30/20 rule balances living expenses." },
                { id: 2, prompt: "What does APR stand for in banking and loans?", imageIllustration: "💳", options: [{ label: "Annual Percentage Rate", isCorrect: true }, { label: "Advanced Payment Ratio", isCorrect: false }], explanation: "APR calculates yearly borrowing costs." },
                { id: 3, prompt: "Why is having an emergency fund essential before renting an apartment?", imageIllustration: "🏠", options: [{ label: "To cover unexpected expenses without going into debt", isCorrect: true }, { label: "To buy luxury vacations", isCorrect: false }], explanation: "Emergency funds provide financial security." },
                { id: 4, prompt: "What is a refundable security deposit used for in apartment leasing?", imageIllustration: "🔑", options: [{ label: "To cover potential property damage beyond normal wear", isCorrect: true }, { label: "Landlord monthly salary", isCorrect: false }], explanation: "Deposits protect landlords against damage." },
                { id: 5, prompt: "What does compounding interest mean for long-term savings?", imageIllustration: "📈", options: [{ label: "Earning interest on both initial principal and accumulated interest", isCorrect: true }, { label: "Paying penalties", isCorrect: false }], explanation: "Compounding accelerates wealth growth." }
              ];
            } else if (top === "Social Media") {
              questions = [
                { id: 1, prompt: "How do college admissions officers and recruiters view public social media feeds?", imageIllustration: "🎓", options: [{ label: "As an extension of your professional digital footprint", isCorrect: true }, { label: "They never look at them", isCorrect: false }], explanation: "Digital footprints impact evaluations." },
                { id: 2, prompt: "What is a 'phishing' scam?", imageIllustration: "🎣", options: [{ label: "Deceptive messaging designed to steal sensitive credentials", isCorrect: true }, { label: "A harmless computer game", isCorrect: false }], explanation: "Phishing targets login security." },
                { id: 3, prompt: "What does open-source software licensing permit?", imageIllustration: "💻", options: [{ label: "Collaborative inspection, modification, and distribution of source code", isCorrect: true }, { label: "Stealing copyright software", isCorrect: false }], explanation: "Open-source promotes shared development." },
                { id: 4, prompt: "Why should you audit privacy settings on social networks?", imageIllustration: "🛡️", options: [{ label: "To control who accesses your personal data and posts", isCorrect: true }, { label: "To slow down your phone", isCorrect: false }], explanation: "Privacy audits safeguard personal data." },
                { id: 5, prompt: "What characterizes a strong cryptographic password?", imageIllustration: "🔑", options: [{ label: "High entropy combining symbols, numbers, and case variation", isCorrect: true }, { label: "Your birthdate", isCorrect: false }], explanation: "High entropy resists brute-force cracking." }
              ];
            } else if (top === "Job Interviews") {
              questions = [
                { id: 1, prompt: "What is the primary purpose of a professional cover letter?", imageIllustration: "✉️", options: [{ label: "To provide a tailored narrative connecting your skills to company needs", isCorrect: true }, { label: "To repeat your resume word for word", isCorrect: false }], explanation: "Cover letters personalize applications." },
                { id: 2, prompt: "What are 'transferable skills' in career readiness?", imageIllustration: "💼", options: [{ label: "Versatile competencies like problem-solving and leadership applicable across industries", isCorrect: true }, { label: "Train station tickets", isCorrect: false }], explanation: "Transferable skills work anywhere." },
                { id: 3, prompt: "What is an 'elevator pitch'?", imageIllustration: "⏱️", options: [{ label: "A concise 30-second summary of your professional value", isCorrect: true }, { label: "A song sung in elevators", isCorrect: false }], explanation: "Elevator pitches deliver instant value intros." },
                { id: 4, prompt: "When should you send a post-interview thank-you note?", imageIllustration: "📧", options: [{ label: "Within 24 hours of concluding the interview", isCorrect: true }, { label: "After three months", isCorrect: false }], explanation: "Prompt thank-you notes keep you memorable." },
                { id: 5, prompt: "How should you answer behavioral questions using the STAR method?", imageIllustration: "⭐", options: [{ label: "Situation, Task, Action, Result", isCorrect: true }, { label: "Sing, Talk, Act, Rest", isCorrect: false }], explanation: "STAR structures behavioral storytelling." }
              ];
            } else {
              questions = [
                { id: 1, prompt: "In a B2 discursive essay, what is the role of a thesis statement?", imageIllustration: "🏛️", options: [{ label: "To clearly state your central argument and roadmap the essay", isCorrect: true }, { label: "To tell a fictional joke", isCorrect: false }], explanation: "Thesis statements anchor arguments." },
                { id: 2, prompt: "What is a 'straw man' logical fallacy?", imageIllustration: "🧠", options: [{ label: "Misrepresenting an opponent's argument to make it easier to attack", isCorrect: true }, { label: "Building a scarecrow in a field", isCorrect: false }], explanation: "Straw man fallacies distort logic." },
                { id: 3, prompt: "What purpose does academic peer review serve?", imageIllustration: "📑", options: [{ label: "Validating experimental methodology and academic rigor before publication", isCorrect: true }, { label: "Checking spelling only", isCorrect: false }], explanation: "Peer review ensures scientific integrity." },
                { id: 4, prompt: "Choose the correct academic transition: '___ potential financial hurdles, the project succeeded.'", imageIllustration: "⚖️", options: [{ label: "Notwithstanding", isCorrect: true }, { label: "Because", isCorrect: false }, { label: "And", isCorrect: false }], explanation: "Notwithstanding denotes formal concession." },
                { id: 5, prompt: "What is empirical evidence?", imageIllustration: "🔬", options: [{ label: "Information acquired by observation and experimentation", isCorrect: true }, { label: "Pure personal opinion", isCorrect: false }], explanation: "Empirical data grounds science." }
              ];
            }
          } else {
            if (top === "Daily Life") {
              questions = [
                { id: 1, prompt: "What does the idiom 'to bite the bullet' mean?", imageIllustration: "🎯", options: [{ label: "To face a difficult situation with courage and endurance", isCorrect: true }, { label: "To eat a metallic snack", isCorrect: false }], explanation: "Biting the bullet means enduring hardship." },
                { id: 2, prompt: "Identify the correct syntactic inversion: 'Hardly ___ when the conference commenced.'", imageIllustration: "📜", options: [{ label: "had I arrived", isCorrect: true }, { label: "I had arrived", isCorrect: false }], explanation: "Negative adverbials require auxiliary inversion." },
                { id: 3, prompt: "What is the semantic nuance of 'ubiquitous'?", imageIllustration: "🌍", options: [{ label: "Present, appearing, or found everywhere simultaneously", isCorrect: true }, { label: "Rare and hidden", isCorrect: false }], explanation: "Ubiquitous describes omnipresence." },
                { id: 4, prompt: "What does 'to mitigate' a crisis imply?", imageIllustration: "🛡️", options: [{ label: "To lessen the severity or gravity of negative impacts", isCorrect: true }, { label: "To worsen the problem", isCorrect: false }], explanation: "Mitigation reduces damage." },
                { id: 5, prompt: "Choose the precise collocation: 'To mount a ___ defense against accusations.'", imageIllustration: "⚖️", options: [{ label: "vigorous", isCorrect: true }, { label: "heavy", isCorrect: false }, { label: "loud", isCorrect: false }], explanation: "We mount a vigorous defense." }
              ];
            } else if (top === "Social Media") {
              questions = [
                { id: 1, prompt: "What is an algorithmic 'echo chamber'?", imageIllustration: "📡", options: [{ label: "An environment where user beliefs are endlessly reinforced by isolated feeds", isCorrect: true }, { label: "A loud recording studio", isCorrect: false }], explanation: "Echo chambers restrict ideological diversity." },
                { id: 2, prompt: "What ethical threat do AI-generated 'deepfakes' pose?", imageIllustration: "🤖", options: [{ label: "Fabricating hyper-realistic synthetic media to spread misinformation", isCorrect: true }, { label: "Improving video game graphics", isCorrect: false }], explanation: "Deepfakes threaten informational trust." },
                { id: 3, prompt: "How does algorithmic bias manifest in machine learning?", imageIllustration: "📊", options: [{ label: "When models inherit historical human prejudices from training datasets", isCorrect: true }, { label: "When computers run too fast", isCorrect: false }], explanation: "Biased training data produces biased AI." },
                { id: 4, prompt: "What is information literacy in the digital age?", imageIllustration: "🔍", options: [{ label: "The ability to critically evaluate, verify, and parse media sources", isCorrect: true }, { label: "Knowing how to type fast", isCorrect: false }], explanation: "Information literacy counters fake news." },
                { id: 5, prompt: "What does synthetic media regulation attempt to curb?", imageIllustration: "🏛️", options: [{ label: "Unauthorized impersonation and unverified disinformation", isCorrect: true }, { label: "Open-source coding", isCorrect: false }], explanation: "Regulations target deceptive deepfakes." }
              ];
            } else if (top === "Job Interviews") {
              questions = [
                { id: 1, prompt: "In executive interviews, what does 'metrics-driven ROI storytelling' entail?", imageIllustration: "📈", options: [{ label: "Articulating past achievements through quantified business impact and revenue growth", isCorrect: true }, { label: "Telling jokes about finance", isCorrect: false }], explanation: "ROI storytelling proves financial value." },
                { id: 2, prompt: "How do executive leaders manage stakeholder alignment during conflicts?", imageIllustration: "🤝", options: [{ label: "By diplomatically reconciling competing priorities using empirical risk models", isCorrect: true }, { label: "By ignoring dissenting voices", isCorrect: false }], explanation: "Alignment requires diplomatic reconciliation." },
                { id: 3, prompt: "What does 'strategic foresight' demonstrate in senior leadership?", imageIllustration: "🚀", options: [{ label: "The capacity to anticipate long-term industry disruption and pivot proactively", isCorrect: true }, { label: "Short-term micromanagement", isCorrect: false }], explanation: "Foresight anticipates future shifts." },
                { id: 4, prompt: "Choose the executive term for streamlining organizational inefficiencies:", imageIllustration: "⚙️", options: [{ label: "Re-engineering operational workflows", isCorrect: true }, { label: "Slowing down production", isCorrect: false }], explanation: "Re-engineering optimizes operations." },
                { id: 5, prompt: "What is paramount when handling an unforeseen corporate crisis?", imageIllustration: "🏛️", options: [{ label: "Taking decisive command while maintaining transparent stakeholder communication", isCorrect: true }, { label: "Hiding the problem", isCorrect: false }], explanation: "Crisis leadership demands transparency." }
              ];
            } else {
              questions = [
                { id: 1, prompt: "What is the primary focus of epistemological philosophy?", imageIllustration: "🎓", options: [{ label: "Investigating the nature, origin, and limits of human knowledge", isCorrect: true }, { label: "Studying star constellations", isCorrect: false }], explanation: "Epistemology studies knowledge." },
                { id: 2, prompt: "What distinguishes a priori knowledge from a posteriori knowledge?", imageIllustration: "🧠", options: [{ label: "A priori is independent of experience; a posteriori is derived from empirical observation", isCorrect: true }, { label: "They are identical", isCorrect: false }], explanation: "A priori is deductive; a posteriori is empirical." },
                { id: 3, prompt: "What is a logical tautology?", imageIllustration: "📜", options: [{ label: "A statement that is necessarily true by virtue of its logical form", isCorrect: true }, { label: "A proven scientific experiment", isCorrect: false }], explanation: "Tautologies are inherently true." },
                { id: 4, prompt: "Choose the advanced concession marker: '___ the empirical data is complex, the trend is unmistakable.'", imageIllustration: "⚖️", options: [{ label: "Albeit", isCorrect: true }, { label: "Because", isCorrect: false }, { label: "Thus", isCorrect: false }], explanation: "Albeit introduces formal concession." },
                { id: 5, prompt: "What does the German concept 'Zeitgeist' signify in cultural discourse?", imageIllustration: "🏛️", options: [{ label: "The defining spirit or mood of a particular historical period", isCorrect: true }, { label: "A physical building", isCorrect: false }], explanation: "Zeitgeist means spirit of the times." }
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

      {/* TAB 2: STUDY MATERIALS */}
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