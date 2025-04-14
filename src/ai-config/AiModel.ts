import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey!);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseModalities: [],
  responseMimeType: "application/json",
};


export const courseOutlineAiModel = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate a study material for\nPython for Exam and level of difficulty\nwill be easy with summary of course\nList of chapters along with summary\nfor each chapter, topic list in each chapter , all result in\nJSON format\n",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "courseTitle": "Python Fundamentals for Beginners Exam Prep",\n  "difficultyLevel": "Easy",\n  "courseSummary": "This course provides a foundational understanding of Python programming, covering essential concepts for a beginner-level exam.  It emphasizes practical application and clear explanations, focusing on core syntax, data types, control flow, and basic data structures.",\n  "chapters": [\n    {\n      "chapterNumber": 1,\n      "chapterTitle": "Introduction to Python",\n      "chapterSummary": "This chapter introduces the Python programming language, its applications, and the basic steps for setting up your programming environment.  You\'ll write your first Python program and understand fundamental syntax rules.",\n      "topics": [\n        "What is Python?",\n        "Why learn Python?",\n        "Installing Python",\n        "Choosing a code editor or IDE",\n        "Running Python code (interactive mode and script files)",\n        "Your first Python program",\n        "Basic syntax: indentation, comments"\n      ]\n    },\n    {\n      "chapterNumber": 2,\n      "chapterTitle": "Variables and Data Types",\n      "chapterSummary": "This chapter covers the essential data types in Python and how to work with variables to store and manipulate data.",\n      "topics": [\n        "Variables: declaration, assignment, naming conventions",\n        "Integers (`int`)",\n        "Floating-point numbers (`float`)",\n        "Strings (`str`): creation, manipulation (concatenation, slicing)",\n        "Booleans (`bool`)",\n        "Type conversion",\n        "Input and output: `print()` and `input()` functions"\n      ]\n    },\n    {\n      "chapterNumber": 3,\n      "chapterTitle": "Operators",\n      "chapterSummary": "This chapter explains the different types of operators used in Python for arithmetic, comparison, and logical operations.",\n      "topics": [\n        "Arithmetic operators: `+`, `-`, `*`, `/`, `//`, `%`, `**`",\n        "Comparison operators: `==`, `!=`, `>`, `<`, `>=`, `<=`",\n        "Logical operators: `and`, `or`, `not`",\n        "Assignment operators: `=`, `+=`, `-=`, `*=` etc.",\n        "Operator precedence"\n      ]\n    },\n    {\n      "chapterNumber": 4,\n      "chapterTitle": "Control Flow: Conditional Statements",\n      "chapterSummary": "This chapter introduces conditional statements (`if`, `elif`, `else`) to control the flow of execution in your programs based on conditions.",\n      "topics": [\n        "The `if` statement",\n        "The `elif` statement",\n        "The `else` statement",\n        "Nested `if` statements",\n        "Simple examples and exercises"\n      ]\n    },\n    {\n      "chapterNumber": 5,\n      "chapterTitle": "Control Flow: Loops",\n      "chapterSummary": "This chapter covers loops (`for` and `while`) to repeat a block of code multiple times.",\n      "topics": [\n        "The `for` loop: iterating over sequences",\n        "The `range()` function",\n        "The `while` loop",\n        "Loop control statements: `break` and `continue`"\n      ]\n    },\n    {\n      "chapterNumber": 6,\n      "chapterTitle": "Lists and Tuples",\n      "chapterSummary": "This chapter introduces two fundamental data structures: lists (mutable) and tuples (immutable).",\n      "topics": [\n        "Lists: creation, accessing elements, slicing, methods (`append`, `insert`, `remove`, `pop`, `len`) ",\n        "Tuples: creation, accessing elements, immutability",\n        "Comparing lists and tuples"\n      ]\n    },\n    {\n      "chapterNumber": 7,\n      "chapterTitle": "Dictionaries",\n      "chapterSummary": "This chapter explains dictionaries, which store data in key-value pairs.",\n      "topics": [\n        "Dictionaries: creation, accessing values, adding and removing entries",\n        "Common dictionary methods: `keys()`, `values()`, `items()`"\n      ]\n    },\n    {\n      "chapterNumber": 8,\n      "chapterTitle": "Functions",\n      "chapterSummary": "This chapter introduces functions, reusable blocks of code that improve code organization and readability.",\n      "topics": [\n        "Defining functions: `def` keyword",\n        "Calling functions",\n        "Parameters and arguments",\n        "Return values",\n        "Basic scope of variables"\n      ]\n    },\n    {\n      "chapterNumber": 9,\n      "chapterTitle": "Introduction to Modules",\n      "chapterSummary": "This chapter provides a brief introduction to modules and how to use them.",\n      "topics": [\n        "What are modules?",\n        "Importing modules: `import` statement",\n        "Using functions from modules"\n      ]\n    },\n      {\n      "chapterNumber": 10,\n      "chapterTitle": "Basic File I/O",\n      "chapterSummary": "This chapter introduces basic file input and output operations.",\n      "topics": [\n        "Opening files",\n        "Reading from files",\n        "Writing to files",\n        "Closing files"\n      ]\n    }\n  ]\n}\n```\n',
        },
      ],
    },
  ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// // TODO: Following code needs to be updated for client-side apps.
// const candidates = result.response.candidates;
// for(let candidate_index = 0; candidate_index < candidates.length; candidate_index++) {
//   for(let part_index = 0; part_index < candidates[candidate_index].content.parts.length; part_index++) {
//     const part = candidates[candidate_index].content.parts[part_index];
//     if(part.inlineData) {
//       try {
//         const filename = `output_${candidate_index}_${part_index}.${mime.extension(part.inlineData.mimeType)}`;
//         fs.writeFileSync(filename, Buffer.from(part.inlineData.data, 'base64'));
//         console.log(`Output written to: ${filename}`);
//       } catch (err) {
//         console.error(err);
//       }
//     }
//   }
// }
// console.log(result.response.text());

export const generateNotesAiModel = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: 'Generate exam material detail content for each chapter, Make sure to include all topic point in the content, make sure to give content in HTML format(Do not Add HTMLKL, Head,Body,title tag), \nTHe chapters :\n{\n      "chapterNumber": 1,\n      "chapterTitle": "Introduction to Javascript",\n      "chapterSummary": "This chapter introduces Javascript, its uses, and how to embed it in HTML.  You\'ll learn basic syntax and write your first Javascript program. 🧑‍💻",\n      "topics": [\n        "What is Javascript?",\n        "Where is Javascript used?",\n        "Embedding Javascript in HTML",\n        "Basic syntax: variables, comments",\n        "Your first Javascript program",\n        "Outputting to the console (`console.log`)"\n      ]\n    }',
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "```html\n<h3>Chapter 1: Introduction to Javascript</h3>\n<p>This chapter introduces Javascript, its uses, and how to embed it in HTML. You'll learn basic syntax and write your first Javascript program.</p>\n\n<h4>1.1 What is Javascript?</h4>\n<p>Explain what Javascript is: a scripting language, its dynamic nature, its client-side capabilities, and its role in web development.  Include a brief history if appropriate.</p>\n\n<h4>1.2 Where is Javascript Used?</h4>\n<p>Discuss various applications of Javascript: web development (front-end and back-end with Node.js), mobile app development (React Native, Ionic), game development, and more. Provide examples for each application.</p>\n\n<h4>1.3 Embedding Javascript in HTML</h4>\n<p>Describe the different ways to embed Javascript code within an HTML document: using `<script>` tags in the `<head>` or `<body>`, external Javascript files, and inline Javascript within HTML elements.  Explain the advantages and disadvantages of each method.</p>\n\n<h4>1.4 Basic Syntax: Variables and Comments</h4>\n<p>Introduce Javascript variable declaration using `var`, `let`, and `const`. Explain the differences between them regarding scope and mutability.  Explain how to write single-line and multi-line comments in Javascript using `//` and `/* */` respectively. Include examples of variable assignments and data types (numbers, strings, booleans).</p>\n\n\n<h4>1.5 Your First Javascript Program</h4>\n<p>Provide a simple Javascript program that performs a basic task, such as displaying a message to the user using an alert box or modifying the content of an HTML element.  Step-by-step instructions and code examples are essential.</p>\n\n<h4>1.6 Outputting to the Console (`console.log`)</h4>\n<p>Explain how to use the `console.log()` method to display output in the browser's developer console. This is crucial for debugging and understanding program flow.  Include examples demonstrating how to log different data types to the console.</p>\n```\n",
        },
      ],
    },
  ],
});

export const GenerateStudyTypeContentAiModel = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: 'Generate exam material detail content for each chapter, make sure to include all topic points in the content. Give content in HTML format (no HTML, head, body, or title tags). The chapter:\n {\n      "chapterNumber": 1,\n      "chapterTitle": "Introduction to Java",\n      "chapterSummary": "Overview of Java, setting up your environment, and writing your first Java program.",\n      "emojiIcon": "☕",\n      "topics": [\n        "What is Java?",\n        "Setting up a Java Development Kit (JDK)",\n        "Compiling and running Java code",\n        "Basic syntax and structure of a Java program",\n        "Understanding the main method"\n      ]\n    }\n',
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```html\n<section>\n  <h2>Chapter 1: Introduction to Java ☕</h2>\n  <p>This chapter provides an overview of Java, guides you through setting up your development environment, and helps you write your first Java program.</p>\n\n  <h3>What is Java?</h3>\n  <p>Discuss the history and evolution of Java.  Explain its platform independence ("Write Once, Run Anywhere"). Detail its key features: object-oriented programming (OOP), robustness, security, and multithreading. Provide examples of where Java is used (Android app development, enterprise applications, web applications, etc.).</p>\n\n  <h3>Setting up a Java Development Kit (JDK)</h3>\n  <p>Explain the components of the JDK (Java Compiler, Java Runtime Environment - JRE, etc.). Provide step-by-step instructions on downloading and installing a JDK (for example, from Oracle or OpenJDK) for different operating systems (Windows, macOS, Linux).  Show how to set the JAVA_HOME environment variable.</p>\n\n  <h3>Compiling and Running Java Code</h3>\n  <p>Explain the compilation process, where the Java source code (.java files) is translated into bytecode (.class files). Describe the role of the Java Virtual Machine (JVM) in running bytecode. Provide instructions on how to compile and run Java programs using the command-line interface (CLI). Include common compiler errors and how to troubleshoot them.</p>\n\n\n  <h3>Basic Syntax and Structure of a Java Program</h3>\n  <p>Explain the basic structure of a Java program including:\n    <ul>\n      <li>The `public class` declaration.</li>\n      <li>The `main` method signature: `public static void main(String[] args)`. </li>\n      <li>Use of curly braces `{}` to define code blocks.</li>\n      <li>Semicolon `;` usage as statement terminators.</li>\n      <li>Comments (single-line and multi-line).</li>\n      <li>Keywords vs Identifiers.</li>\n      <li>Data types (primitives).</li>\n    </ul>\n    Include a simple "Hello, World!" program example.</p>\n\n\n  <h3>Understanding the `main` Method</h3>\n  <p>Explain in detail the significance of the `main` method. Discuss the purpose of `public`, `static`, `void`, and `String[] args`. Show examples of how the `args` array is used to receive command-line arguments.  Explain the program execution flow starting from the `main` method.</p>\n</section>\n```\n',
        },
      ],
    },
  ],
});



export const GenerateQuizAiModel = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {text: "Generate exam material detail content for each chapter, make sure to include all topic points in the content. Give content in HTML format (no HTML, head, body, or title tags). The chapter:\n {\n      \"chapterNumber\": 1,\n      \"chapterTitle\": \"Introduction to Java\",\n      \"chapterSummary\": \"Overview of Java, setting up your environment, and writing your first Java program.\",\n      \"emojiIcon\": \"☕\",\n      \"topics\": [\n        \"What is Java?\",\n        \"Setting up a Java Development Kit (JDK)\",\n        \"Compiling and running Java code\",\n        \"Basic syntax and structure of a Java program\",\n        \"Understanding the main method\"\n      ]\n    }\n"},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "```html\n<section>\n  <h2>Chapter 1: Introduction to Java ☕</h2>\n  <p>This chapter provides an overview of Java, guides you through setting up your development environment, and helps you write your first Java program.</p>\n\n  <h3>What is Java?</h3>\n  <p>Discuss the history and evolution of Java.  Explain its platform independence (\"Write Once, Run Anywhere\"). Detail its key features: object-oriented programming (OOP), robustness, security, and multithreading. Provide examples of where Java is used (Android app development, enterprise applications, web applications, etc.).</p>\n\n  <h3>Setting up a Java Development Kit (JDK)</h3>\n  <p>Explain the components of the JDK (Java Compiler, Java Runtime Environment - JRE, etc.). Provide step-by-step instructions on downloading and installing a JDK (for example, from Oracle or OpenJDK) for different operating systems (Windows, macOS, Linux).  Show how to set the JAVA_HOME environment variable.</p>\n\n  <h3>Compiling and Running Java Code</h3>\n  <p>Explain the compilation process, where the Java source code (.java files) is translated into bytecode (.class files). Describe the role of the Java Virtual Machine (JVM) in running bytecode. Provide instructions on how to compile and run Java programs using the command-line interface (CLI). Include common compiler errors and how to troubleshoot them.</p>\n\n\n  <h3>Basic Syntax and Structure of a Java Program</h3>\n  <p>Explain the basic structure of a Java program including:\n    <ul>\n      <li>The `public class` declaration.</li>\n      <li>The `main` method signature: `public static void main(String[] args)`. </li>\n      <li>Use of curly braces `{}` to define code blocks.</li>\n      <li>Semicolon `;` usage as statement terminators.</li>\n      <li>Comments (single-line and multi-line).</li>\n      <li>Keywords vs Identifiers.</li>\n      <li>Data types (primitives).</li>\n    </ul>\n    Include a simple \"Hello, World!\" program example.</p>\n\n\n  <h3>Understanding the `main` Method</h3>\n  <p>Explain in detail the significance of the `main` method. Discuss the purpose of `public`, `static`, `void`, and `String[] args`. Show examples of how the `args` array is used to receive command-line arguments.  Explain the program execution flow starting from the `main` method.</p>\n</section>\n```\n"},
      ],
    },
  ],
});