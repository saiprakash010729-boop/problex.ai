// Problex AI Knowledge Base & Mock Data

export const AI_PRESET_PROMPTS = [
  {
    category: "B.Tech Engineering",
    title: "Binary Search Algorithm",
    question: "Explain Binary Search with time complexity and an example in Telugu and English.",
    keywords: ["binary search", "search", "algorithm", "time complexity"],
    response: {
      title: "Binary Search Algorithm (ద్వైపక్ష శోధన)",
      telugu: `
**సులభమైన వివరణ (Telugu):**
బైనరీ సెర్చ్ అనేది ఒక క్రమబద్ధీకరించబడిన (Sorted) జాబితాలో ఒక నిర్దిష్ట మూలకాన్ని (Element) కనుగొనడానికి ఉపయోగించే ఒక అత్యంత వేగవంతమైన అల్గారిథమ్. 

**ఉదాహరణ:**
మీరు ఒక డిక్షనరీలో "Machine" అనే పదం వెతకాలనుకుంటే, మొదటి పేజీ నుండి ఒక్కొక్కటిగా చూడరు కదా? మధ్య పేజీ తెరిచి చూస్తారు. అక్కడ "L" ఉంటే కుడివైపు చూస్తారు, "P" ఉంటే ఎడమవైపు చూస్తారు. బైనరీ సెర్చ్ కూడా సరిగ్గా ఇదే సూత్రం పై పనిచేస్తుంది (Divide and Conquer).

**ముఖ్యమైన పాయింట్లు:**
1. శ్రేణి (Array) తప్పనిసరిగా క్రమబద్ధీకరించబడి ఉండాలి (Must be Sorted).
2. మధ్య సూచికను (Mid index) లెక్కిస్తాం: \`mid = low + (high - low) / 2\`.
3. శోధించే అంశం (Target) మధ్య సంఖ్య కంటే తక్కువైతే ఎడమవైపు, ఎక్కువైతే కుడివైపు వెతుకుతాం.
4. కాల సంక్లిష్టత (Time Complexity): **O(log n)**, సాధారణ శోధన కంటే ఎన్నో రెట్లు వేగవంతమైనది.
`,
      english: `
**Comprehensive English Explanation:**
Binary Search is an efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing in half the portion of the list that could contain the item, until you've narrowed down the possible locations to just one.

**Key Technical Details:**
- **Paradigm:** Divide and Conquer
- **Pre-requisite:** The array must be sorted in ascending/descending order.
- **Worst & Average Case Time Complexity:** O(log n)
- **Best Case Time Complexity:** O(1) (when element is at the exact center)
- **Auxiliary Space:** O(1) for iterative, O(log n) for recursive call stack.
`,
      code: `// C++ Implementation of Binary Search
#include <iostream>
#include <vector>

int binarySearch(const std::vector<int>& arr, int target) {
    int low = 0;
    int high = arr.size() - 1;

    while (low <= high) {
        int mid = low + (high - low) / 2; // Prevents integer overflow

        if (arr[mid] == target) {
            return mid; // Element found at index mid
        } else if (arr[mid] < target) {
            low = mid + 1; // Search in right half
        } else {
            high = mid - 1; // Search in left half
        }
    }
    return -1; // Element not found
}`,
      examAnswers: {
        mark2: "Binary Search is a divide-and-conquer search algorithm for sorted arrays with O(log n) time complexity. Formula for mid: mid = low + (high - low) / 2.",
        mark4: `1. Definition: Algorithm that locates a target value within a sorted array by halving the search space repeatedly.
2. Condition: Array must be sorted.
3. Steps: Calculate mid, compare with target, discard irrelevant half.
4. Complexity: Time = O(log n), Space = O(1).`,
        mark8: `**Q: Explain Binary Search algorithm with flowchart, algorithm steps, and complexity analysis (8 Marks)**

1. **Introduction:**
Binary search is an optimal search method on monotonic sorted collections. It drastically outperforms Linear Search (O(n)).

2. **Algorithm Logic:**
- Step 1: Initialize low = 0, high = n - 1.
- Step 2: While low <= high, compute mid = low + (high - low) / 2.
- Step 3: If arr[mid] == key, return index mid.
- Step 4: If key > arr[mid], update low = mid + 1.
- Step 5: If key < arr[mid], update high = mid - 1.
- Step 6: If loop terminates without returning, return -1 (Not Found).

3. **Recurrence Relation & Time Complexity:**
- T(n) = T(n/2) + c
- By Master's Theorem: a = 1, b = 2, f(n) = O(1) => T(n) = O(log n).

4. **Advantages:**
- Scales efficiently for massive datasets (e.g., searching 1,000,000 items takes at most 20 comparisons).`
      }
    }
  },
  {
    category: "Government Exams",
    title: "Indian Constitution: Fundamental Rights",
    question: "Explain the Fundamental Rights of Indian Constitution for competitive exams in Telugu and English.",
    keywords: ["fundamental rights", "constitution", "polity", "upsc", "ssc", "appsc", "tspsc"],
    response: {
      title: "Fundamental Rights - Part III (ప్రాథమిక హక్కులు)",
      telugu: `
**ప్రాథమిక హక్కుల సమగ్ర వివరణ (Telugu):**
భారత రాజ్యాంగంలో **పార్ట్ III లోని ఆర్టికల్స్ 12 నుండి 35 వరకు** ప్రాథమిక హక్కులను పొందుపరిచారు. వీటిని అమెరికా రాజ్యాంగంలోని "Bill of Rights" నుండి స్వీకరించారు. భారత రాజ్యాంగ నిర్మాత డా. బి.ఆర్. అంబేద్కర్ దీనిని 'అత్యంత విమర్శించబడిన భాగం' మరియు రాజ్యాంగానికి ఆత్మ వంటిదని పేర్కొన్నారు.

**ప్రస్తుతం ఉన్న 6 ప్రాథమిక హక్కులు:**
1. **సమానత్వపు హక్కు (Right to Equality) - Articles 14 to 18:** చట్టం ముందు అందరూ సమానులే, వివక్ష చూపరాదు.
2. **స్వాతంత్ర్యపు హక్కు (Right to Freedom) - Articles 19 to 22:** భావ ప్రకటన స్వేచ్ఛ, శాంతియుతంగా సమావేశమయ్యే హక్కు.
3. **పీడనాన్ని నిరోధించే హక్కు (Right against Exploitation) - Articles 23 & 24:** వెట్టిచాకిరీ, బాలకార్మిక వ్యవస్థ నిషేధం.
4. **మత స్వాతంత్ర్యపు హక్కు (Right to Freedom of Religion) - Articles 25 to 28:** ఏ మతాన్నైనా స్వీకరించే మరియు ప్రచారం చేసుకునే స్వేచ్ఛ.
5. **విద్యా, సాంస్కృతిక హక్కు (Cultural & Educational Rights) - Articles 29 & 30:** మైనారిటీల భాష, సంస్కృతి రక్షణ.
6. **రాజ్యాంగ పరిహారపు హక్కు (Right to Constitutional Remedies) - Article 32:** హక్కులకు భంగం వాటిల్లినప్పుడు సుప్రీంకోర్టును ఆశ్రయించే హక్కు (హేబియస్ కార్పస్, మాండమస్ వంటి రిట్లు).
`,
      english: `
**English Breakdown for UPSC/SSC/State PSC:**
Part III of the Constitution (Articles 12 to 35) is rightfully described as the **Magna Carta of India**. Originally 7 rights existed, but the Right to Property (Article 31) was deleted by the 44th Constitutional Amendment Act, 1978 and made a legal right under Article 300-A in Part XII.

**Key Exam Takeaways:**
- **Article 21:** Protection of life and personal liberty (widest interpretation, includes Right to Privacy - *Puttaswamy Judgement*).
- **Article 32:** Referred by Dr. B.R. Ambedkar as the "Heart and Soul of the Constitution". Empowers Supreme Court to issue Writs:
  1. Habeas Corpus (to have the body)
  2. Mandamus (we command)
  3. Prohibition (to forbid lower court)
  4. Certiorari (to be certified)
  5. Quo-Warranto (by what authority)
- **Suspension:** Articles 20 and 21 cannot be suspended even during a National Emergency under Article 352.
`,
      examAnswers: {
        mark2: "Fundamental Rights are contained in Part III (Articles 12-35) of Indian Constitution, inspired by USA. Currently there are 6 Fundamental Rights protecting individual liberties.",
        mark4: `1. Right to Equality (Art 14-18)
2. Right to Freedom (Art 19-22)
3. Right against Exploitation (Art 23-24)
4. Right to Freedom of Religion (Art 25-28)
5. Cultural and Educational Rights (Art 29-30)
6. Right to Constitutional Remedies (Art 32)
*Note: Property Right was removed by 44th Amendment 1978.*`,
        mark8: `**Q: Analyze the significance of Fundamental Rights with special focus on Article 32 and Judicial Remedies (8 Marks)**

1. **Constitutional Framework:**
Part III guarantees civil rights against arbitrary state actions. Unlike Directive Principles, Fundamental Rights are justiciable (enforceable by courts).

2. **Six Pillars:**
Covers Equality, Personal Liberty, Protection against Child Labour, Secularism, Minority Safeguards, and Judicial Remedies.

3. **Article 32 - Heart and Soul:**
Empowers individuals to approach the Supreme Court directly if Fundamental Rights are violated. The court issues 5 writs: Habeas Corpus, Mandamus, Prohibition, Certiorari, Quo-Warranto.

4. **Limitations & Reasonable Restrictions:**
Rights are not absolute; subject to public order, morality, sovereignty, and state security under Art 19(2). Articles 20 & 21 remain inviolable during emergencies.`
      }
    }
  },
  {
    category: "Coding & Tech",
    title: "Python: Lists vs Tuples",
    question: "What is the difference between Lists and Tuples in Python? Explain with Telugu & English examples.",
    keywords: ["python", "list", "tuple", "programming", "differences"],
    response: {
      title: "Python Lists vs Tuples (లిస్టులు మరియు టపుల్స్ తేడాలు)",
      telugu: `
**సరళమైన తెలుగు వివరణ (Telugu):**
పైథాన్‌లో డేటాను స్టోర్ చేయడానికి List మరియు Tuple రెండూ ఉపయోగిస్తారు, కానీ వాటి మధ్య ఒక ముఖ్యమైన తేడా ఉంది.

**లిస్ట్ (List):**
- మార్చగలము (Mutable) – ఒకసారి సృష్టించిన తర్వాత కొత్త అంశాలను చేర్చవచ్చు లేదా తీసివేయవచ్చు.
- స్క్వేర్ బ్రాకెట్లలో రాస్తాము: \`[1, 2, 3]\`
- ఉదాహరణ: రోజువారీ కొనుగోలు సరుకుల జాబితా (Shopping list - మార్చుకోవచ్చు).

**టపుల్ (Tuple):**
- మార్చలేము (Immutable) – ఒకసారి సృష్టించిన తర్వాత దానిలోని అంశాలను మార్చలేము.
- గుండ్రని బ్రాకెట్లలో రాస్తాము: \`(1, 2, 3)\`
- మెమరీ తక్కువ తీసుకుంటుంది మరియు ప్రాసెసింగ్ వేగం ఎక్కువ.
- ఉదాహరణ: మీ పుట్టిన తేదీ లేదా ఆధార్ నంబర్ (ఎప్పటికీ మారదు).
`,
      english: `
**Technical Analysis (Python Programming):**
Lists and Tuples are sequence data types in Python capable of holding heterogeneous items, but differ fundamentally in mutability, memory allocation, and performance.

| Parameter | List | Tuple |
|---|---|---|
| **Syntax** | Square brackets \`[]\` | Parentheses \`()\` |
| **Mutability** | Mutable (Can modify, append, delete) | Immutable (Cannot be modified after creation) |
| **Memory** | Consumes more memory due to over-allocation | Memory efficient (Fixed size allocated) |
| **Performance** | Slightly slower iteration | Faster execution & iteration |
| **Use Case** | Dynamic datasets that change | Fixed constants, dictionary keys, GPS coordinates |
`,
      code: `# Demonstration in Python

# 1. Lists - Mutable
student_scores = [85, 92, 78]
student_scores.append(95)     # Works! [85, 92, 78, 95]
student_scores[0] = 90         # Works!

# 2. Tuples - Immutable
coordinates = (17.3850, 78.4867) # Hyderabad Lat/Long
# coordinates[0] = 18.0000     # Raises: TypeError: 'tuple' object does not support item assignment

print(f"List: {student_scores}")
print(f"Tuple: {coordinates}")`,
      examAnswers: {
        mark2: "Lists are mutable and use square brackets `[]`. Tuples are immutable and use parentheses `()`. Tuples are faster and consume less memory.",
        mark4: `1. Mutability: Lists can be altered after declaration; Tuples cannot.
2. Syntax: List = [1, 2, 3], Tuple = (1, 2, 3).
3. Memory: Lists allocate extra buffer for expansion; Tuples allocate fixed memory.
4. Hashability: Tuples can be dictionary keys; Lists cannot.`,
        mark8: `**Q: Differentiate between Python List and Tuple with internal memory layout and appropriate code examples (8 Marks)**

1. **Overview & Mutability:**
List is dynamic array; Tuple is fixed-length immutable sequence.

2. **Memory Overhead:**
Python's List over-allocates memory to achieve amortized O(1) appends. A tuple with 5 elements takes less bytes than a list with 5 elements.

3. **Built-in Methods:**
List has .append(), .extend(), .insert(), .pop(), .remove(). Tuple only supports .count() and .index().

4. **Summary Decision Rule:**
Use Tuples when data should be read-only constants. Use Lists when data will grow, shrink, or require sorting in place.`
      }
    }
  },
  {
    category: "Intermediate College",
    title: "Thermodynamics: Second Law",
    question: "Explain the Second Law of Thermodynamics with Kelvin-Planck and Clausius statements in Telugu and English.",
    keywords: ["thermodynamics", "second law", "kelvin planck", "clausius", "physics"],
    response: {
      title: "Second Law of Thermodynamics (థర్మోడైనమిక్స్ రెండవ నియమం)",
      telugu: `
**తెలుగు వివరణ (Telugu):**
మొదటి నియమం శక్తి పరిరక్షణ గురించి చెబుతుంది కానీ ఉష్ణం ఏ దిశలో ప్రవహిస్తుందో చెప్పదు. రెండవ నియమం ఉష్ణ ప్రవాహ దిశను మరియు సామర్థ్యాన్ని నిర్దేశిస్తుంది.

**1. కెల్విన్-ప్లాంక్ ప్రకటన (Kelvin-Planck Statement):**
ఒకే ఒక ఉష్ణ భాండాగారం (Single Heat Reservoir) నుండి ఉష్ణాన్ని పూర్తిగా గ్రహించి, అంతే మొత్తంలో పనిగా మార్చే యంత్రాన్ని (100% సమర్థవంతమైన హీట్ ఇంజిన్) నిర్మించడం అసాధ్యం. కొంత ఉష్ణం ఖచ్చితంగా వృధాగా పరిసరాల్లోకి వదలవలసిందే.

**2. క్లాసియస్ ప్రకటన (Clausius Statement):**
బాహ్య పని (External Work) ఏదీ చేయకుండా, శీతల వస్తువు (Cold Body) నుండి వేడి వస్తువుకు (Hot Body) ఉష్ణాన్ని బదిలీ చేసే యంత్రాన్ని (రిఫ్రిజిరేటర్) తయారు చేయడం అసాధ్యం.
`,
      english: `
**Physics Examination Breakdown:**
The Second Law of Thermodynamics introduces the concept of directionality in natural thermodynamic processes and establishes the physical basis of **Entropy**.

**1. Kelvin-Planck Statement (Governs Heat Engines):**
"It is impossible for any device that operates on a thermodynamic cycle to receive heat from a single reservoir and produce a net amount of work."
*Implication:* Thermal Efficiency (\(\\eta\)) of any cyclical heat engine is always strictly less than 100% (\(\\eta < 1\)).

**2. Clausius Statement (Governs Heat Pumps / Refrigerators):**
"It is impossible to construct a device that operates in a cycle and produces no effect other than the transfer of heat from a lower-temperature body to a higher-temperature body."
*Implication:* Refrigerators require external electrical or mechanical work input to pump heat out against the natural thermal gradient.
`,
      examAnswers: {
        mark2: "Second Law states that natural processes are irreversible. Kelvin-Planck statement asserts that no heat engine has 100% efficiency. Clausius statement asserts heat cannot spontaneously flow from cold to hot body.",
        mark4: `1. Directionality: Energy flows naturally from high to low potential.
2. Kelvin-Planck: Impossible to convert all absorbed heat into work in a cyclic engine (Efficiency < 100%).
3. Clausius: Heat transfer from cold to hot body necessitates external work.
4. Equivalence: Violation of Kelvin-Planck leads to violation of Clausius.`,
        mark8: `**Q: State and prove the equivalence of Kelvin-Planck and Clausius statements of Second Law of Thermodynamics (8 Marks)**

1. **Introduction & Motivation:**
First law permits complete conversion of heat to work, but physical reality prohibits it. Second law governs entropy increase (dS >= 0).

2. **Kelvin-Planck Statement:**
Cyclic device cannot absorb Q1 from T1 and produce W = Q1 without rejecting Q2 to T2.

3. **Clausius Statement:**
Heat flow from T2 to T1 (where T1 > T2) without external work input W is impossible.

4. **Equivalence Proof:**
- **Case A:** Assume a machine violates Clausius statement (transfers Q without work). Combine it with standard heat engine. The net effect is complete conversion of heat to work from a single reservoir, which violates Kelvin-Planck.
- **Case B:** Assume violation of Kelvin-Planck statement. Combine with standard refrigerator. The net effect is spontaneous heat transfer without work, violating Clausius.
- Therefore, both statements are logically equivalent.`
      }
    }
  }
];

export const STUDY_TOOLS_LIST = [
  {
    id: "doubt-solver",
    name: "AI Doubt Solver",
    tagline: "Instant step-by-step doubt clearing in Telugu & English",
    description: "Upload a photo or type any complex academic question. Get instant explanations, formulas, and visual breakdowns tailored to your syllabus.",
    icon: "HelpCircle",
    category: "Academic Support",
    badge: "Most Popular",
    color: "from-blue-600 to-indigo-600",
    features: ["Step-by-step reasoning", "Bilingual explanations", "Formula breakdown"]
  },
  {
    id: "notes-generator",
    name: "AI Notes Generator",
    tagline: "Convert any topic or syllabus into exam-ready Cornell notes",
    description: "Generates high-retention revision notes with key points, summaries, mnemonics, and important questions for quick pre-exam preparation.",
    icon: "FileText",
    category: "Study Efficiency",
    badge: "High Retention",
    color: "from-purple-600 to-pink-600",
    features: ["Key definitions", "Bullet point summaries", "Exam tips"]
  },
  {
    id: "pdf-summarizer",
    name: "AI PDF Summarizer",
    tagline: "Extract core concepts and summaries from textbooks & research",
    description: "Upload lengthy textbook chapters, college lab manuals, or government gazettes. Receive chapter summaries and key definitions in seconds.",
    icon: "FileCode2",
    category: "Productivity",
    badge: "Smart Extract",
    color: "from-cyan-600 to-blue-600",
    features: ["Chapter TL;DR", "Key takeaways list", "Telugu translation"]
  },
  {
    id: "exam-preparation",
    name: "AI Exam Preparation",
    tagline: "2-Mark, 4-Mark & 8-Mark structured answers for university exams",
    description: "Tailors answers precisely to JNTU, OU, AU, SVU, and CBSE marking schemes so you know exactly what points fetch full marks.",
    icon: "GraduationCap",
    category: "Exam Success",
    badge: "University Aligned",
    color: "from-amber-500 to-orange-600",
    features: ["Mark scheme formatting", "Diagram descriptions", "Previous paper trends"]
  },
  {
    id: "quiz-generator",
    name: "AI Quiz Generator",
    tagline: "Generate adaptive MCQs with score tracking & explanations",
    description: "Test your knowledge on any chapter with customized multiple choice quizzes, instant evaluation, and Telugu/English conceptual feedback.",
    icon: "CheckSquare",
    category: "Assessment",
    badge: "Interactive",
    color: "from-emerald-500 to-teal-600",
    features: ["Custom difficulty", "Instant explanations", "Score analysis"]
  },
  {
    id: "flashcards",
    name: "AI Flashcards",
    tagline: "Spaced-repetition flashcards for quick revision on the go",
    description: "Master formulas, constitutional articles, history dates, and programming syntax with smart interactive flip cards.",
    icon: "Layers",
    category: "Memory",
    badge: "Spaced Repetition",
    color: "from-violet-600 to-purple-700",
    features: ["Flip interactive cards", "Mastery tracking", "Mobile-friendly"]
  },
  {
    id: "programming-tutor",
    name: "AI Programming Tutor",
    tagline: "Learn Python, Java, C++, and Web Dev in simple Telugu & English",
    description: "Interactive coding guidance from Hello World to Data Structures. Understand logic, edge cases, and best practices with bilingual comments.",
    icon: "Terminal",
    category: "Coding & Tech",
    badge: "Hands-on",
    color: "from-sky-500 to-blue-700",
    features: ["Code examples", "Dry run tracing", "Telugu code comments"]
  },
  {
    id: "code-explainer",
    name: "AI Code Explainer",
    tagline: "Line-by-line explanation of any code snippet or error",
    description: "Paste confusing code or cryptic compiler errors. Get line-by-line breakdowns, logic explanation, and suggested bug fixes.",
    icon: "Code",
    category: "Coding & Tech",
    badge: "Bug Fixer",
    color: "from-rose-500 to-red-600",
    features: ["Line-by-line breakdown", "Time complexity", "Fix suggestions"]
  },
  {
    id: "assignment-helper",
    name: "AI Assignment Helper",
    tagline: "Structured outlines, brainstormed solutions & research guidance",
    description: "Get structured outlines, brainstorming prompts, mathematical proofs, and referencing guidance for engineering and degree assignments.",
    icon: "BookOpen",
    category: "Academic Support",
    badge: "Structure & Flow",
    color: "from-indigo-500 to-blue-800",
    features: ["Project outlines", "Problem approach", "Bibliography tips"]
  },
  {
    id: "study-planner",
    name: "AI Study Planner",
    tagline: "Personalized timetable customized for your exam date & syllabus",
    description: "Enter your exam date, subjects, and daily available study hours. AI builds a realistic, stress-free daily study routine with revision slots.",
    icon: "Calendar",
    category: "Productivity",
    badge: "Custom Schedule",
    color: "from-teal-600 to-emerald-700",
    features: ["Daily timetable", "Revision milestones", "Exam countdown"]
  }
];

export const GOVT_EXAMS_DATA = [
  {
    id: "upsc",
    name: "UPSC Civil Services (IAS / IPS)",
    badge: "National",
    color: "bg-amber-50 text-amber-700 border-amber-200",
    description: "Comprehensive preparation modules for Prelims GS-I, CSAT, and Mains answer writing with bilingual current affairs.",
    vacancies: "Annual Cycle",
    subjects: ["Indian Polity & Governance", "Modern Indian History", "Economy & Budget", "Environment & Ecology", "Ethics (GS-IV)"],
    keyStats: "Top Level Strategy & Prelims MCQs"
  },
  {
    id: "ssc",
    name: "SSC CGL & CHSL",
    badge: "Central Staff",
    color: "bg-blue-50 text-blue-700 border-blue-200",
    description: "Targeted practice for Quantitative Aptitude shortcuts, English Comprehension, Reasoning, and General Awareness in Telugu & English.",
    vacancies: "15,000+ Posts",
    subjects: ["Quantitative Aptitude (Tricks)", "General Intelligence & Reasoning", "English Comprehension", "Static GK & Current Affairs"],
    keyStats: "Tier 1 & Tier 2 Practice Sets"
  },
  {
    id: "banking",
    name: "Banking (IBPS PO, SBI Clerk, RRB)",
    badge: "Banking & Financial",
    color: "bg-purple-50 text-purple-700 border-purple-200",
    description: "Speed calculation methods, Data Interpretation sets, Puzzles, Banking Awareness, and Financial Economy capsules.",
    vacancies: "25,000+ Annual",
    subjects: ["Data Interpretation (D.I.)", "Seating Arrangement & Puzzles", "Banking & Financial Awareness", "Computer Aptitude"],
    keyStats: "Speed Math & Sectional Tests"
  },
  {
    id: "railways",
    name: "Railway Recruitment (RRB NTPC & Group D)",
    badge: "Railways",
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    description: "General Science (Physics, Chemistry, Biology), Basic Math, Reasoning, and Railway General Knowledge with bilingual mock papers.",
    vacancies: "Large-Scale",
    subjects: ["General Science (NCERT base)", "Mathematics & Arithmetic", "General Intelligence", "Current Events"],
    keyStats: "Previous Year Paper Solutions"
  },
  {
    id: "state-psc",
    name: "State Government (APPSC & TSPSC Groups 1, 2, 4 & Police)",
    badge: "State Specific",
    color: "bg-rose-50 text-rose-700 border-rose-200",
    description: "Specialized focus on Andhra Pradesh & Telangana History, Movement, Geography, Economy, and State Welfare Schemes in pure Telugu & English.",
    vacancies: "State Notifications",
    subjects: ["Telangana Movement & State Formation", "AP Reorganisation Act & Economy", "Telugu Language Proficiency", "State Welfare Schemes"],
    keyStats: "State Syllabus Aligned"
  }
];

export const DAILY_CURRENT_AFFAIRS = [
  {
    id: "ca-1",
    date: "November 05, 2026",
    category: "Science & Technology",
    headlineEnglish: "ISRO announces collaborative mission for next-gen climate satellite",
    headlineTelugu: "తదుపరి తరం క్లైమేట్ ఉపగ్రహం కోసం ఇస్రో భాగస్వామ్య మిషన్ ప్రకటన",
    summaryEnglish: "The Indian Space Research Organisation announced the payload configurations for high-resolution environmental monitoring, tracking seasonal monsoon patterns and ocean surface temperatures.",
    summaryTelugu: "భారత అంతరిక్ష పరిశోధనా సంస్థ పర్యావరణ పర్యవేక్షణ, ఋతుపవనాల తీరు మరియు సముద్ర ఉష్ణోగ్రతలను గుర్తించే అత్యాధునిక ఉపగ్రహ ప్రయోగాన్ని ధ్రువీకరించింది.",
    examSignificance: "UPSC Prelims GS-III, State PSC Science & Tech, SSC General Awareness"
  },
  {
    id: "ca-2",
    date: "November 04, 2026",
    category: "Economy & Banking",
    headlineEnglish: "RBI announces enhanced digital payments framework for rural cooperatives",
    headlineTelugu: "గ్రామీణ సహకార బ్యాంకులకు మెరుగైన డిజిటల్ చెల్లింపుల విధానాన్ని ప్రవేశపెట్టిన ఆర్బీఐ",
    summaryEnglish: "Reserve Bank of India issued operational guidelines to integrate Primary Agricultural Credit Societies (PACS) into the unified payment interface ecosystem.",
    summaryTelugu: "గ్రామీణ రైతులకు డిజిటల్ సేవలు వేగవంతంగా చేరేందుకు ప్రాథమిక వ్యవసాయ పరపతి సంఘాలను (PACS) యూపీఐ నెట్‌వర్క్‌తో అనుసంధానించే మార్గదర్శకాలను ఆర్బీఐ జారీ చేసింది.",
    examSignificance: "IBPS PO / Clerk, SBI, UPSC Economy, SSC CGL Tier 2"
  },
  {
    id: "ca-3",
    date: "November 03, 2026",
    category: "Polity & Governance",
    headlineEnglish: "Supreme Court reinforces speedy trial rights under Article 21",
    headlineTelugu: "ఆర్టికల్ 21 కింద సత్వర విచారణ హక్కు ప్రాథమికమైనదని సుప్రీంకోర్టు పునరుద్ఘాటన",
    summaryEnglish: "A constitutional bench held that prolonged delays without trial infringe upon the personal liberty of undertrial prisoners, ordering time-bound judicial procedures.",
    summaryTelugu: "విచారణ లేకుండా ఏళ్ల తరబడి జైళ్లలో ఉంచడం ప్రాథమిక హక్కుల ఉల్లంఘన అని, కాలపరిమితితో కూడిన న్యాయ ప్రక్రియ తప్పనిసరి అని సర్వోన్నత న్యాయస్థానం స్పష్టం చేసింది.",
    examSignificance: "UPSC GS-II Polity, APPSC/TSPSC Group-1, Judiciary Exams"
  }
];

export const MOCK_QUIZ_QUESTIONS = [
  {
    id: 1,
    subject: "Computer Science",
    question: "What is the worst-case time complexity of QuickSort algorithm?",
    options: ["O(n log n)", "O(n²)", "O(log n)", "O(n)"],
    correctAnswer: 1,
    explanationTelugu: "క్విక్‌సార్ట్‌లో పివోట్ (Pivot) ఎలిమెంట్ సరిగ్గా ఎంచుకోకపోతే (ఉదాహరణకు ఇప్పటికే క్రమబద్ధీకరించిన ఎరేలో చిన్న లేదా పెద్ద ఎలిమెంట్ ఎంచుకుంటే) వర్స్ట్-కేస్ కాంప్లెక్సిటీ O(n²) అవుతుంది.",
    explanationEnglish: "The worst-case occurs when the pivot partition produces unbalanced subproblems (e.g. sorted arrays with extreme pivot), resulting in O(n²) time complexity."
  },
  {
    id: 2,
    subject: "Indian Polity",
    question: "Which Constitutional Amendment deleted the Right to Property from Fundamental Rights?",
    options: ["42nd Amendment, 1976", "44th Amendment, 1978", "86th Amendment, 2002", "73rd Amendment, 1992"],
    correctAnswer: 1,
    explanationTelugu: "1978లో మొరార్జీ దేశాయ్ ప్రభుత్వం 44వ రాజ్యాంగ సవరణ ద్వారా ఆస్తి హక్కును ప్రాథమిక హక్కుల నుండి తొలగించి, ఆర్టికల్ 300-A కింద సాధారణ చట్టబద్ధమైన హక్కుగా మార్చింది.",
    explanationEnglish: "The 44th Constitutional Amendment Act, 1978 abolished the Right to Property as a Fundamental Right and inserted it as a legal right under Article 300-A."
  },
  {
    id: 3,
    subject: "Quantitative Aptitude",
    question: "If A can finish a work in 10 days and B in 15 days, in how many days can they finish together?",
    options: ["5 days", "6 days", "8 days", "7.5 days"],
    correctAnswer: 1,
    explanationTelugu: "షార్ట్‌కట్ సూత్రం: (A × B) / (A + B) = (10 × 15) / (10 + 15) = 150 / 25 = 6 రోజులు.",
    explanationEnglish: "Formula for combined work: (A * B) / (A + B). Here (10 * 15) / (10 + 15) = 150 / 25 = 6 days."
  },
  {
    id: 4,
    subject: "Python Programming",
    question: "Which of the following data structures in Python is immutable?",
    options: ["List", "Dictionary", "Set", "Tuple"],
    correctAnswer: 3,
    explanationTelugu: "టపుల్ (Tuple) మాత్రమే మార్చలేనిది (Immutable). లిస్ట్, డిక్షనరీ, సెట్ అన్నీ మ్యూటబుల్ (Mutable).",
    explanationEnglish: "Tuples in Python are immutable sequences. Once initialized, their elements cannot be reassigned or modified."
  }
];

export const MOCK_FLASHCARDS = [
  {
    id: "fc-1",
    category: "Engineering",
    front: "What is Ahmdal's Law?",
    back: "Predicts the maximum theoretical speedup in latency of an execution task when parallel processors are increased.",
    backTelugu: "ప్యారలల్ ప్రాసెసర్లు పెంచినప్పుడు ఒక ప్రోగ్రామ్ వేగం గరిష్టంగా ఎంత పెరుగుతుందో లెక్కించే సూత్రం."
  },
  {
    id: "fc-2",
    category: "Polity",
    front: "Article 32 of Indian Constitution",
    back: "Right to Constitutional Remedies. Empowers Supreme Court to issue 5 types of Writs to protect Fundamental Rights.",
    backTelugu: "రాజ్యాంగ పరిహారపు హక్కు. ప్రాథమిక హక్కుల రక్షణకు సుప్రీంకోర్టు 5 రకాల రిట్లను జారీ చేస్తుంది."
  },
  {
    id: "fc-3",
    category: "Coding",
    front: "What is Polymorphism in OOP?",
    back: "The ability of a message or function to be displayed or executed in more than one form (Compile-time & Run-time).",
    backTelugu: "ఒకే ఫంక్షన్ లేదా మెథడ్ విభిన్న పరిస్థితులలో వేర్వేరు రూపాల్లో పనిచేయడాన్ని పాలిమార్ఫిజం అంటారు."
  },
  {
    id: "fc-4",
    category: "Aptitude",
    front: "Speed, Distance & Time Formula",
    back: "Speed = Distance / Time. To convert km/h to m/s, multiply by 5/18.",
    backTelugu: "వేగం = దూరం / కాలం. km/h నుండి m/s లోకి మార్చడానికి 5/18 తో గుణించాలి."
  }
];

export const FAQS_LIST = [
  {
    question: "How does Problex AI teach in both Telugu and English?",
    answer: "Our AI model is specifically tuned for Indian bilingual education. You can choose Telugu explanations with native analogies and clear script, English academic answers for writing university exams, or Both simultaneously to understand the concept deeply while scoring top marks."
  },
  {
    question: "Is Problex AI suitable for B.Tech semester exams?",
    answer: "Yes! Problex AI features a dedicated 2-Mark, 4-Mark, and 8-Mark answer formatting engine built specifically for university marking schemes (JNTU, OU, AU, SVU, VTU, Anna University, etc.)."
  },
  {
    question: "Can government job aspirants use Problex AI for competitive exams?",
    answer: "Absolutely. We have specialized modules for UPSC, SSC CGL/CHSL, IBPS Banking, RRB Railways, and APPSC/TSPSC Groups with daily bilingual current affairs capsules, quantitative aptitude shortcuts, and interactive mock tests."
  },
  {
    question: "I am a complete beginner in programming. Can I learn coding here?",
    answer: "Yes. Our AI Programming Tutor explains programming logic in conversational Telugu and English, line-by-line, without assuming any prior computer science knowledge."
  },
  {
    question: "Do I need to pay to use Problex AI?",
    answer: "Problex AI offers generous free access for all students, including our core AI Tutor, Daily Current Affairs, and standard study tools. Premium power-tools and full mock test suites have affordable student-friendly pricing."
  }
];
