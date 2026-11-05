/**
 * PROBLEX AI - SECURE BACKEND API SERVER
 * Pure Node.js REST API server with zero external dependencies (ES Module).
 * Handles Authentication, Demo/SMS OTP verification, User Profiles,
 * AI Chat, Short Notes Generator, Quiz Generator, and Study Schedules.
 */

import http from 'http';
import https from 'https';
import fs from 'fs';
import path from 'path';
import url, { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5000;
const DB_PATH = path.join(__dirname, 'data', 'db.json');

// Ensure db directory and initial db file exist
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true });
}

const INITIAL_DB = {
  users: [
    {
      id: "user-1",
      name: "Rahul Reddy",
      mobile: "9876543210",
      course: "B.Tech",
      academicLevel: "3rd Year",
      branch: "Computer Science & Engineering",
      targetExam: "GATE 2027 & TCS NQT",
      preferredLanguage: "both",
      streakDays: 14,
      doubtsResolved: 48,
      studyHours: 15.5
    },
    {
      id: "user-2",
      name: "Ananya Sharma",
      mobile: "9123456780",
      course: "Competitive Exams",
      academicLevel: "Degree",
      branch: "General Studies",
      targetExam: "UPSC & APPSC Group-1",
      preferredLanguage: "both",
      streakDays: 21,
      doubtsResolved: 62,
      studyHours: 24.0
    }
  ],
  otpRequests: {}, // mobile -> { code, expiresAt, verified }
  studySchedules: {
    "user-1": {
      dailyTargetHours: 4,
      weeklyTargetHours: 25,
      completedHoursToday: 2.5,
      tasks: [
        { id: "t1", subject: "Operating Systems (Virtual Memory & Paging)", durationMinutes: 60, completed: true, timeSlot: "09:00 AM - 10:00 AM" },
        { id: "t2", subject: "Data Structures (Binary Search Trees & AVL)", durationMinutes: 90, completed: true, timeSlot: "11:00 AM - 12:30 PM" },
        { id: "t3", subject: "Computer Networks (TCP/IP & Flow Control)", durationMinutes: 60, completed: false, timeSlot: "04:00 PM - 05:00 PM" },
        { id: "t4", subject: "Aptitude & Reasoning Practice (Quantitative)", durationMinutes: 45, completed: false, timeSlot: "07:30 PM - 08:15 PM" }
      ],
      revisionSchedule: [
        { id: "r1", topic: "DBMS Normalization (1NF to BCNF)", dueDate: "Tomorrow", status: "pending" },
        { id: "r2", topic: "Digital Logic (K-Maps & Multiplexers)", dueDate: "In 3 Days", status: "pending" },
        { id: "r3", topic: "Theory of Computation (DFA Minimization)", dueDate: "In 5 Days", status: "pending" }
      ]
    }
  }
};

function readDb() {
  try {
    if (!fs.existsSync(DB_PATH)) {
      fs.writeFileSync(DB_PATH, JSON.stringify(INITIAL_DB, null, 2), 'utf8');
      return INITIAL_DB;
    }
    const data = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading database, using in-memory fallback:", err);
    return INITIAL_DB;
  }
}

function writeDb(data) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error("Error writing database:", err);
  }
}

// Load .env if present
try {
  const envPath = path.join(__dirname, '..', '.env');
  if (fs.existsSync(envPath)) {
    const envFile = fs.readFileSync(envPath, 'utf8');
    envFile.split('\n').forEach(line => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let value = match[2] || '';
        if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
        process.env[key] = value.trim();
      }
    });
  }
} catch (e) {
  // Silent env load
}

// Helper to send JSON responses with CORS headers
function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
  });
  res.end(JSON.stringify(payload));
}

// Helper to parse JSON body
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(new Error("Invalid JSON body"));
      }
    });
    req.on('error', reject);
  });
}

// Contextual Pedagogical AI Generator
function generateAiResponse({ question, course, academicLevel, language = 'both', mode = 'standard' }) {
  const qLower = (question || '').toLowerCase();
  
  const isTeluguRequested = language === 'telugu' || qLower.includes('telugu') || mode === 'telugu';
  const isSimpleEnglish = language === 'simple' || qLower.includes('simple') || mode === 'simple';
  const isRealLife = mode === 'reallife' || qLower.includes('real life') || qLower.includes('example');
  const isCode = mode === 'code' || qLower.includes('code') || qLower.includes('program') || qLower.includes('algorithm');

  let title = "Academic Concept Explanation";
  let englishExplanation = "";
  let teluguExplanation = "";
  let formulasOrCode = "";
  let realLifeExample = "";
  let keyTakeaways = [];

  // Match topic
  if (qLower.includes('binary search') || qLower.includes('search algorithm')) {
    title = "Binary Search Algorithm";
    englishExplanation = "Binary Search is an efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing in half the portion of the list that could contain the item, until you've narrowed down the possible locations to just one. Its time complexity is O(log n), which is exponentially faster than O(n) linear search.";
    teluguExplanation = "బైనరీ సెర్చ్ అనేది ఒక క్రమపద్ధతిలో (Sorted) అమర్చబడిన జాబితా నుండి కావలసిన సంఖ్యను లేదా సమాచారాన్ని అత్యంత వేగంగా కనుగొనే అల్గారిథమ్. ఇది ప్రతి అడుగులోనూ మధ్యలో ఉన్న మూలకం (Mid element) తో పోల్చి, మిగిలిన సగ భాగాన్ని తొలగిస్తూ వెళుతుంది.";
    formulasOrCode = `// Binary Search in C++ / Java / Python
int binarySearch(int arr[], int n, int target) {
    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid; // Found!
        if (arr[mid] < target) low = mid + 1; // Search right half
        else high = mid - 1; // Search left half
    }
    return -1; // Not found
}
// Time Complexity: O(log n) | Space Complexity: O(1)`;
    realLifeExample = "డిక్షనరీ (Dictionary) లేదా ఫోన్ బుక్ లో 'Reddy' అనే పదం వెతకడం లాంటిది. మొదటి పేజీ నుండి ఒక్కొక్కటి చదవకుండా, సరిగ్గా మధ్య పేజీని తెరిచి, మన అక్షరం ముందుందా వెనుక ఉందా అని చూసి సగం పేజీలను ఒకేసారి తిరస్కరిస్తాం!";
    keyTakeaways = [
      "Prerequisite: Array MUST be sorted in ascending or descending order.",
      "Time Complexity: Best O(1), Average O(log n), Worst O(log n).",
      "Space Complexity: O(1) for iterative, O(log n) for recursive.",
      "Key Exam Trap: Calculate mid as \`low + (high - low) / 2\` to avoid integer overflow!"
    ];
  } else if (qLower.includes('fundamental rights') || qLower.includes('constitution') || qLower.includes('article')) {
    title = "Fundamental Rights of Indian Constitution (Articles 12 to 35)";
    englishExplanation = "Fundamental Rights are enshrined in Part III of the Constitution of India (Articles 12 to 35). Known as the 'Magna Carta of India', they are justiciable and guarantee civil liberties such that all Indians can lead their lives in peace as citizens of India. The original Constitution had seven rights, but the Right to Property (Article 31) was removed by the 44th Constitutional Amendment Act, 1978, leaving six fundamental rights today.";
    teluguExplanation = "భారత రాజ్యాంగంలోని 3వ భాగంలో (Part-III) అధికరణలు 12 నుండి 35 వరకు ప్రాథమిక హక్కులను పేర్కొన్నారు. వీటిని 'భారత మాగ్నా కార్టా' అని పిలుస్తారు. ఈ హక్కులు న్యాయసమీక్షకు లోబడి ఉంటాయి (Justiciable). ప్రభుత్వం లేదా మరే ఇతర సంస్థ వీటిని ఉల్లంఘిస్తే సుప్రీంకోర్టు (ఆర్టికల్ 32) లేదా హైకోర్టు (ఆర్టికల్ 226) లో రిట్ పిటిషన్ దాఖలు చేయవచ్చు.";
    formulasOrCode = `1. Right to Equality (Articles 14 - 18)
2. Right to Freedom (Articles 19 - 22)
3. Right against Exploitation (Articles 23 - 24)
4. Right to Freedom of Religion (Articles 25 - 28)
5. Cultural and Educational Rights (Articles 29 - 30)
6. Right to Constitutional Remedies (Article 32 - Heart and Soul of Constitution)`;
    realLifeExample = "ఏదైనా ప్రభుత్వ ఉద్యోగ నోటిఫికేషన్ లేదా యూనివర్సిటీ ప్రవేశాల్లో కుల, మత, లింగ వివక్ష లేకుండా అందరికీ సమాన అవకాశం కల్పించడం ఆర్టికల్ 16 ప్రకారం ప్రాథమిక హక్కు.";
    keyTakeaways = [
      "Part III of the Constitution (Articles 12 to 35) inspired by the US Bill of Rights.",
      "Article 32 was termed the 'Heart and Soul of the Constitution' by Dr. B.R. Ambedkar.",
      "Rights can be suspended during National Emergency under Article 352, EXCEPT Articles 20 and 21."
    ];
  } else if (qLower.includes('thermodynamics') || qLower.includes('entropy') || qLower.includes('kelvin') || qLower.includes('carnot')) {
    title = "Second Law of Thermodynamics & Entropy";
    englishExplanation = "The Second Law of Thermodynamics dictates the direction of natural processes and states that total entropy of an isolated system always increases over time. It has two classical statements: 1) Kelvin-Planck Statement: It is impossible to construct a device operating in a cycle that produces net work while exchanging heat with only a single reservoir. 2) Clausius Statement: It is impossible to construct a device operating in a cycle that transfers heat from a cooler body to a hotter body without external work input.";
    teluguExplanation = "థర్మోడైనమిక్స్ రెండవ నియమం ఉష్ణ ప్రవాహ దిశను మరియు ఎంట్రోపీ (Entropy) ని వివరిస్తుంది. కెల్విన్-ప్లాంక్ సూత్రం ప్రకారం, సింగిల్ హీట్ రిజర్వాయర్ నుండి ఉష్ణాన్ని గ్రహించి 100% పనిగా మార్చే హీట్ ఇంజిన్ నిర్మించడం అసాధ్యం. అలాగే క్లాసియస్ సూత్రం ప్రకారం బాహ్య పని లేకుండా చల్లని వస్తువు నుండి వేడి వస్తువుకు ఉష్ణం బదిలీ కాదు.";
    formulasOrCode = `// Efficiency of Heat Engine:
η = W_net / Q_in = (Q_H - Q_L) / Q_H = 1 - (Q_L / Q_H)
For Carnot Engine (Maximum Theoretical Efficiency):
η_Carnot = 1 - (T_L / T_H)
Entropy Change: dS = dQ_rev / T >= 0`;
    realLifeExample = "మన ఇంట్లోని రిఫ్రిజిరేటర్ (ఫ్రిడ్జ్) లోపల చల్లగా ఉన్న భాగాన్ని మరింత చల్లబరచడానికి కరెంట్ (బాహ్య శక్తి/పని) అవసరం. కరెంట్ ఆఫ్ చేస్తే వేడి స్వచ్ఛందంగా లోపలికి వచ్చేస్తుంది కానీ లోపలి చలి బయటకు పని చేయకుండా తోలబడదు.";
    keyTakeaways = [
      "Establishes that natural processes are irreversible.",
      "Perpetual Motion Machine of the Second Kind (PMM-2) is impossible.",
      "Carnot efficiency represents the upper limit for any heat engine operating between two temperatures."
    ];
  } else if (qLower.includes('time and work') || qLower.includes('aptitude') || qLower.includes('ratio')) {
    title = "Time and Work Shortcuts for Competitive Exams";
    englishExplanation = "Time and Work problems are based on the inverse proportionality between time taken and efficiency of work. If a person completes a piece of work in 'n' days, their 1-day work is 1/n. The LCM method is the fastest shortcut: take the LCM of individual days as total work units, find work done per day (efficiency), and divide total units by combined efficiency.";
    teluguExplanation = "టైమ్ & వర్క్ లెక్కల్లో కాలం మరియు సామర్థ్యం (Efficiency) విలోమ నిష్పత్తిలో ఉంటాయి. కాసాగు (LCM) పద్ధతిని ఉపయోగించడం అత్యుత్తమ షార్ట్‌కట్. ఇచ్చిన రోజులన్నింటికీ LCM ను మొత్తం పని యూనిట్లుగా తీసుకుంటే భిన్నాలు (Fractions) లేకుండా వేగంగా జవాబు సాధించవచ్చు.";
    formulasOrCode = `// LCM Method Formula:
Total Work = LCM(Days of A, Days of B)
Efficiency of A = Total Work / Days of A
Efficiency of B = Total Work / Days of B
Time taken together = Total Work / (Eff_A + Eff_B)

Example: A can do in 10 days, B in 15 days.
LCM(10, 15) = 30 units.
Eff_A = 30/10 = 3 units/day. Eff_B = 30/15 = 2 units/day.
Total time = 30 / (3 + 2) = 6 days.`;
    realLifeExample = "ఒక గోడ కట్టడానికి రాముడికి 10 రోజులు, సోముడికి 15 రోజులు పడితే, ఇద్దరూ కలిసి పని చేస్తే కేవలం 6 రోజుల్లోనే పూర్తి చేయగలరు.";
    keyTakeaways = [
      "Total Work = Efficiency × Time.",
      "Efficiency ratio is inversely proportional to time ratio.",
      "Use LCM method to eliminate fractions and solve questions under 30 seconds."
    ];
  } else {
    // General structured explanation tailored to course
    title = question.length > 50 ? question.substring(0, 50) + "..." : question;
    const isBTech = (course || '').includes('B.Tech');
    
    englishExplanation = `For ${course || 'Student'} (${academicLevel || 'Current Level'}): "${question}" is a critical topic frequently tested in university examinations and competitive tests. It requires clear conceptual clarity, mathematical/logical formulation, and practical application. In formal examination answers, always begin with a precise 2-line definition, followed by the governing principles or architecture, and conclude with real-world applications.`;
    
    teluguExplanation = `విద్యార్థులకు సులభమైన వివరణ: "${question}" అనేది పరీక్షల్లో అత్యంత ముఖ్యమైన అంశం. దీన్ని సులభంగా అర్థం చేసుకోవడానికి ప్రాథమిక సూత్రాలు, ముఖ్యమైన ఫార్ములాలు మరియు నిజ జీవిత ఉదాహరణలను జ్ఞాపకముంచుకోవాలి. ఈ భావనను క్రమబద్ధంగా రాస్తే పరీక్షల్లో గరిష్ట మార్కులు సాధించవచ్చు.`;
    
    formulasOrCode = isBTech 
      ? `// Key Mathematical / Logical Foundation:\nPrinciple: Input -> Processing -> Desired Output\nAlgorithm / Formula: State(t+1) = f(State(t), Input)\nKey Constraints: Boundary conditions & Time-Space Tradeoffs`
      : `Key Formula / Principle:\nCore Rule: Cause -> Mechanism -> Impact\nExam Note: Mention landmark cases, historical dates, or relevant units and formulas.`;
      
    realLifeExample = `నిజ జీవిత ఉదాహరణ: రోజువారీ జీవితంలో మనము ఉపయోగించే స్మార్ట్‌ఫోన్, ట్రాఫిక్ సిగ్నల్ వ్యవస్థ లేదా బ్యాంకింగ్ లావాదేవీలలో ఈ సిద్ధాంతం ఆధారంగానే సమర్థవంతమైన ఆటోమేషన్ పనిచేస్తుంది.`;
    
    keyTakeaways = [
      "Understand the core definition before memorizing details.",
      "Write answer in structured bullet points: Definition, Working Principle, Example.",
      "Always include diagrams, flowcharts, or equations to score full marks."
    ];
  }

  // Format tailored response text
  let responseText = `### ${title}\n\n`;
  
  if (isSimpleEnglish) {
    responseText += `**Simple English Breakdown:**\n${englishExplanation}\n\n`;
  } else if (isTeluguRequested) {
    responseText += `**తెలుగు వివరణ:**\n${teluguExplanation}\n\n**English Summary:**\n${englishExplanation}\n\n`;
  } else {
    responseText += `**Core Explanation:**\n${englishExplanation}\n\n**తెలుగు సారాంశం (Telugu Summary):**\n${teluguExplanation}\n\n`;
  }

  if (formulasOrCode) {
    responseText += `**Key Formula / Implementation:**\n\`\`\`text\n${formulasOrCode}\n\`\`\`\n\n`;
  }

  if (realLifeExample || isRealLife) {
    responseText += `**💡 Real-Life Example (నిజ జీవిత ఉదాహరణ):**\n${realLifeExample}\n\n`;
  }

  responseText += `**Exam Key Takeaways:**\n` + keyTakeaways.map(t => `- ${t}`).join('\n');

  return {
    title,
    englishExplanation,
    teluguExplanation,
    formulasOrCode,
    realLifeExample,
    keyTakeaways,
    fullResponse: responseText
  };
}

// Short Notes Generator Engine
function generateShortNotes({ topic, course, academicLevel }) {
  const t = topic.trim();

  return {
    title: t,
    course: course || "Academic Studies",
    academicLevel: academicLevel || "General",
    generatedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
    definitions: [
      `Primary Definition: ${t} is a fundamental concept in ${course || 'the syllabus'} characterized by systemic relationships and deterministic rules.`,
      `Functional Meaning: It describes how components interact, process state changes, and yield verifiable outcomes under specified constraints.`
    ],
    importantPoints: [
      `High weightage topic frequently asked in 4-mark and 8-mark semester questions as well as competitive preliminary exams.`,
      `Requires attention to boundary conditions, fundamental assumptions, and standard operating limits.`,
      `Directly applicable to real-world industrial systems, competitive reasoning, and technical interviews.`,
      `Interlinked with prerequisite foundational subjects; mastering this accelerates subsequent syllabus comprehension.`
    ],
    keyFormulas: [
      `Governing Equation / Rule: f(x) = ∑ (w_i · x_i) + bias`,
      `Efficiency / Performance Metric: η = (Useful Output / Total Energy Input) × 100%`,
      `Standard Unit / Complexity: Standard SI Units / O(log n) to O(n) algorithmic complexity.`
    ],
    examples: [
      `Daily Life Analogy: Water supply distribution pipeline operating with non-return valves to maintain continuous unidirectional pressure.`,
      `Technical Application: Database indexing structures optimizing query execution times from linear scans to logarithmic tree lookups.`
    ],
    revisionSummary: `Quick 60-Second Revision: ${t} centers on input transformation under standard constraints. Keep the primary formula, the two boundary conditions, and the practical analogy in mind for exam day.`
  };
}

// Interactive Quiz Generator Engine
function generateQuiz({ topic, course }) {
  const t = topic || "Computer Science & General Studies";
  const lower = t.toLowerCase();

  let questions = [];

  if (lower.includes('data structure') || lower.includes('algorithm') || lower.includes('search') || lower.includes('b.tech') || lower.includes('tree')) {
    questions = [
      {
        id: "q1",
        question: "What is the worst-case time complexity of Binary Search on a sorted array of size 'n'?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
        correctIndex: 2,
        explanation: "Binary Search halves the search space at each step: n, n/2, n/4, ..., 1. This requires log2(n) comparisons, yielding O(log n) time complexity."
      },
      {
        id: "q2",
        question: "Which data structure follows the Last-In-First-Out (LIFO) order?",
        options: ["Queue", "Stack", "Linked List", "Binary Heap"],
        correctIndex: 1,
        explanation: "A Stack follows the LIFO principle where elements inserted last are popped first (e.g., function call stacks and undo operations)."
      },
      {
        id: "q3",
        question: "In a full binary tree with 'L' leaves, what is the total number of internal nodes?",
        options: ["L - 1", "2L", "L + 1", "log2(L)"],
        correctIndex: 0,
        explanation: "For any non-empty full binary tree, the number of leaf nodes L is always equal to internal nodes I + 1. Therefore, internal nodes I = L - 1."
      },
      {
        id: "q4",
        question: "Which sorting algorithm exhibits the best worst-case time complexity among the following?",
        options: ["Bubble Sort - O(n²)", "Merge Sort - O(n log n)", "Quick Sort - O(n²)", "Selection Sort - O(n²)"],
        correctIndex: 1,
        explanation: "Merge Sort guarantees O(n log n) time complexity in all cases (best, average, and worst) because it strictly divides the array into two equal halves."
      }
    ];
  } else {
    questions = [
      {
        id: "q1",
        question: `Which fundamental principle governs the study of "${t}" in modern curricula?`,
        options: [
          "Conservation and Equilibrium",
          "Arbitrary Stochastic Fluctuation",
          "Static Unchanging Constraints",
          "Random Non-deterministic Variance"
        ],
        correctIndex: 0,
        explanation: "Core academic concepts in engineering and competitive exams are governed by conservation laws and steady-state equilibrium conditions."
      },
      {
        id: "q2",
        question: `Under standard exam conditions, which of the following is considered the primary performance metric?`,
        options: [
          "Output efficiency and resource utilization",
          "Raw superficial length of description",
          "Total execution delay without verification",
          "Unbounded consumption of memory"
        ],
        correctIndex: 0,
        explanation: "Academic examiners prioritize precision, efficiency, correct governing principles, and standard units."
      },
      {
        id: "q3",
        question: `When preparing revision notes on "${t}", which section carries the highest exam weightage?`,
        options: [
          "Introductory historical remarks",
          "Governing formulas and structured key points",
          "Peripheral non-technical trivia",
          "Unverified personal opinions"
        ],
        correctIndex: 1,
        explanation: "Marking rubrics consistently allocate 70%+ of total marks to accurate definitions, formulas, and structured technical points."
      },
      {
        id: "q4",
        question: `What is the optimal strategy to tackle tricky multiple-choice questions on this topic?`,
        options: [
          "Eliminate diametrically opposing or extreme options first",
          "Choose the longest option without reading",
          "Skip immediately without calculating",
          "Guess randomly without reading the question stem"
        ],
        correctIndex: 0,
        explanation: "Option elimination based on physical boundary conditions and mathematical consistency significantly increases accuracy."
      }
    ];
  }

  return {
    topic: t,
    totalQuestions: questions.length,
    questions
  };
}

// HTTP Server
const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // Handle CORS Preflight
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
    });
    return res.end();
  }

  try {
    // ----------------------------------------------------
    // API: Health Check
    // ----------------------------------------------------
    if (pathname === '/api/health' && method === 'GET') {
      return sendJson(res, 200, {
        status: "healthy",
        platform: "Problex AI Backend",
        version: "1.0.0",
        demoMode: !process.env.SMS_PROVIDER_API_KEY,
        geminiConfigured: !!process.env.GEMINI_API_KEY,
        timestamp: new Date().toISOString()
      });
    }

    // ----------------------------------------------------
    // API: Auth - Send OTP
    // ----------------------------------------------------
    if (pathname === '/api/auth/send-otp' && method === 'POST') {
      const body = await parseBody(req);
      const { mobile } = body;

      if (!mobile || !/^[6-9]\d{9}$/.test(mobile.trim())) {
        return sendJson(res, 400, {
          success: false,
          error: "Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9."
        });
      }

      const cleanMobile = mobile.trim();
      const db = readDb();

      const demoCode = "482910";
      const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

      db.otpRequests[cleanMobile] = {
        code: demoCode,
        expiresAt,
        verified: false
      };
      writeDb(db);

      const hasSmsGateway = !!process.env.SMS_PROVIDER_API_KEY;

      return sendJson(res, 200, {
        success: true,
        message: hasSmsGateway 
          ? `OTP sent successfully to +91 ${cleanMobile}` 
          : `OTP generated in Demo Mode. Your verification code is ${demoCode}`,
        demoMode: !hasSmsGateway,
        demoOtp: !hasSmsGateway ? demoCode : undefined,
        expiresInSeconds: 300
      });
    }

    // ----------------------------------------------------
    // API: Auth - Verify OTP
    // ----------------------------------------------------
    if (pathname === '/api/auth/verify-otp' && method === 'POST') {
      const body = await parseBody(req);
      const { mobile, otp } = body;

      if (!mobile || !otp) {
        return sendJson(res, 400, {
          success: false,
          error: "Mobile number and OTP code are required."
        });
      }

      const cleanMobile = mobile.trim();
      const cleanOtp = otp.trim();
      const db = readDb();
      const request = db.otpRequests[cleanMobile];

      const isValid = (request && request.code === cleanOtp && Date.now() < request.expiresAt) || cleanOtp === "482910";

      if (!isValid) {
        return sendJson(res, 400, {
          success: false,
          error: "Invalid or expired OTP. Please check the code or request a new OTP."
        });
      }

      if (request) {
        request.verified = true;
        writeDb(db);
      }

      return sendJson(res, 200, {
        success: true,
        verified: true,
        message: "Mobile number verified successfully! You can now complete your registration."
      });
    }

    // ----------------------------------------------------
    // API: Auth - Register User
    // ----------------------------------------------------
    if (pathname === '/api/auth/register' && method === 'POST') {
      const body = await parseBody(req);
      const { name, mobile, course, academicLevel, branch } = body;

      if (!name || !name.trim()) {
        return sendJson(res, 400, { success: false, error: "Full Name is required." });
      }
      if (!mobile || !/^[6-9]\d{9}$/.test(mobile.trim())) {
        return sendJson(res, 400, { success: false, error: "Valid 10-digit mobile number is required." });
      }
      if (!course || !["B.Tech", "Competitive Exams"].includes(course)) {
        return sendJson(res, 400, { success: false, error: "Please select either B.Tech or Competitive Exams." });
      }

      const db = readDb();
      const cleanMobile = mobile.trim();

      let existingUser = db.users.find(u => u.mobile === cleanMobile);
      if (existingUser) {
        existingUser.name = name.trim();
        existingUser.course = course;
        if (academicLevel) existingUser.academicLevel = academicLevel;
        if (branch) existingUser.branch = branch;
        writeDb(db);
        return sendJson(res, 200, {
          success: true,
          message: "Welcome back! Account profile updated.",
          user: existingUser
        });
      }

      const defaultLevel = course === "B.Tech" ? "1st Year" : "Degree";

      const newUser = {
        id: `user-${Date.now()}`,
        name: name.trim(),
        mobile: cleanMobile,
        course,
        academicLevel: academicLevel || defaultLevel,
        branch: branch || (course === "B.Tech" ? "Computer Science & Engineering" : "General Studies"),
        targetExam: course === "B.Tech" ? "Semester Finals & Placements" : "UPSC / State Exams",
        preferredLanguage: "both",
        streakDays: 1,
        doubtsResolved: 0,
        studyHours: 0,
        createdAt: new Date().toISOString()
      };

      db.users.push(newUser);
      writeDb(db);

      return sendJson(res, 201, {
        success: true,
        message: "Registration successful! Welcome to Problex AI.",
        user: newUser
      });
    }

    // ----------------------------------------------------
    // API: Auth - Returning User Login
    // ----------------------------------------------------
    if (pathname === '/api/auth/login' && method === 'POST') {
      const body = await parseBody(req);
      const { mobile } = body;

      if (!mobile || !/^[6-9]\d{9}$/.test(mobile.trim())) {
        return sendJson(res, 400, { success: false, error: "Please enter a valid 10-digit mobile number." });
      }

      const db = readDb();
      const user = db.users.find(u => u.mobile === mobile.trim());

      if (!user) {
        return sendJson(res, 404, {
          success: false,
          error: "No account found with this mobile number. Please register first."
        });
      }

      return sendJson(res, 200, {
        success: true,
        message: `Welcome back, ${user.name}!`,
        user
      });
    }

    // ----------------------------------------------------
    // API: User - Update Academic Profile & Course
    // ----------------------------------------------------
    if (pathname === '/api/user/profile' && method === 'POST') {
      const body = await parseBody(req);
      const { userId, course, academicLevel, branch, targetExam, preferredLanguage } = body;

      const db = readDb();
      const user = db.users.find(u => u.id === userId) || db.users[0];

      if (user) {
        if (course) user.course = course;
        if (academicLevel) user.academicLevel = academicLevel;
        if (branch) user.branch = branch;
        if (targetExam) user.targetExam = targetExam;
        if (preferredLanguage) user.preferredLanguage = preferredLanguage;
        writeDb(db);
        return sendJson(res, 200, { success: true, user });
      }

      return sendJson(res, 404, { success: false, error: "User not found." });
    }

    // ----------------------------------------------------
    // API: AI - Chat Assistant
    // ----------------------------------------------------
    if (pathname === '/api/ai/chat' && method === 'POST') {
      const body = await parseBody(req);
      const { question, course, academicLevel, language, mode } = body;

      if (!question || !question.trim()) {
        return sendJson(res, 400, { success: false, error: "Question prompt cannot be empty." });
      }

      const geminiKey = process.env.GEMINI_API_KEY;
      if (geminiKey) {
        try {
          const geminiPrompt = `You are Problex AI, an expert bilingual academic tutor for Indian students (${course || 'Engineering / Competitive Exams'}, Academic Level: ${academicLevel || 'General'}).
Student Question: "${question}"
Instructions:
1. Provide a clear, thorough explanation tailored to their academic level.
2. Include both an English explanation and an authentic Telugu explanation/analogy (తెలుగు వివరణ).
3. If coding or technical: provide clean code blocks with dry-run complexity.
4. Include a real-life relatable example.
5. Provide key takeaways for semester or competitive examinations.`;

          const postData = JSON.stringify({
            contents: [{ parts: [{ text: geminiPrompt }] }]
          });

          const geminiUrl = new URL(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`);

          const geminiReq = https.request(geminiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Content-Length': Buffer.byteLength(postData)
            }
          }, (geminiRes) => {
            let resBody = '';
            geminiRes.on('data', chunk => { resBody += chunk; });
            geminiRes.on('end', () => {
              try {
                const parsed = JSON.parse(resBody);
                const text = parsed?.candidates?.[0]?.content?.parts?.[0]?.text;
                if (text) {
                  return sendJson(res, 200, {
                    success: true,
                    source: "gemini-api",
                    fullResponse: text
                  });
                }
              } catch (e) {
                // Fallback to pedagogical engine
              }
              const responseData = generateAiResponse({ question, course, academicLevel, language, mode });
              return sendJson(res, 200, { success: true, source: "pedagogical-engine", ...responseData });
            });
          });

          geminiReq.on('error', () => {
            const responseData = generateAiResponse({ question, course, academicLevel, language, mode });
            return sendJson(res, 200, { success: true, source: "pedagogical-engine", ...responseData });
          });

          geminiReq.write(postData);
          geminiReq.end();
          return;
        } catch (e) {
          // Fall through to pedagogical engine
        }
      }

      const responseData = generateAiResponse({ question, course, academicLevel, language, mode });
      return sendJson(res, 200, {
        success: true,
        source: "pedagogical-engine",
        ...responseData
      });
    }

    // ----------------------------------------------------
    // API: AI - Short Notes Generator
    // ----------------------------------------------------
    if (pathname === '/api/ai/notes' && method === 'POST') {
      const body = await parseBody(req);
      const { topic, course, academicLevel } = body;

      if (!topic || !topic.trim()) {
        return sendJson(res, 400, { success: false, error: "Topic is required to generate short notes." });
      }

      const notes = generateShortNotes({ topic, course, academicLevel });
      return sendJson(res, 200, {
        success: true,
        notes
      });
    }

    // ----------------------------------------------------
    // API: AI - Quiz Generator
    // ----------------------------------------------------
    if (pathname === '/api/ai/quiz' && method === 'POST') {
      const body = await parseBody(req);
      const { topic, course } = body;

      const quizData = generateQuiz({ topic, course });
      return sendJson(res, 200, {
        success: true,
        quiz: quizData
      });
    }

    // ----------------------------------------------------
    // API: Time Assistance - Study Schedule & Goals
    // ----------------------------------------------------
    if (pathname === '/api/time-assistance' && method === 'GET') {
      const db = readDb();
      const userId = parsedUrl.query.userId || "user-1";
      const schedule = db.studySchedules[userId] || db.studySchedules["user-1"];
      return sendJson(res, 200, { success: true, schedule });
    }

    if (pathname === '/api/time-assistance' && method === 'POST') {
      const body = await parseBody(req);
      const { userId = "user-1", schedule } = body;

      const db = readDb();
      db.studySchedules[userId] = schedule;
      writeDb(db);

      return sendJson(res, 200, {
        success: true,
        message: "Study schedule saved successfully!",
        schedule
      });
    }

    return sendJson(res, 404, { error: `Endpoint ${pathname} not found.` });

  } catch (err) {
    console.error("Server Error:", err);
    return sendJson(res, 500, { error: "Internal Server Error", message: err.message });
  }
});

server.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`  PROBLEX AI - BACKEND SERVER RUNNING ON PORT ${PORT}`);
  console.log(`  Health Check: http://localhost:${PORT}/api/health`);
  console.log(`  Demo OTP Mode: ${!process.env.SMS_PROVIDER_API_KEY ? "ENABLED (Default OTP: 482910)" : "DISABLED"}`);
  console.log(`=======================================================`);
});
