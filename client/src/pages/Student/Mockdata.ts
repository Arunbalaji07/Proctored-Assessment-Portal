export const mockTestData = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris",
    type: "MCQ",
  },
  {
    id: 2,
    question: "Explain the concept of closures in JavaScript.",
    options: [],
    answer: "",
    type: "Short Answer",
  },
  {
    id: 3,
    question: "Write a function to check if a number is prime.",
    options: [],
    answer: "",
    type: "Coding",
    testCases: [
      { input: "5", expectedOutput: "true" },
      { input: "4", expectedOutput: "false" },
    ],
  },
  // Add more questions as needed
];
