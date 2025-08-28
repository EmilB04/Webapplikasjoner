import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`
console.log("Hei!");

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

type Category = 'Math' | 'Science' | 'History' | 'Literature';

interface Quiz {
  id: number;
  question: string;
  answers: Answer[];
  category: Category;
}

interface Answer {
  id: number;
  text: string;
  isCorrect: boolean;
}

const quizzes: Quiz[] = [];

// functions / Arrow Functions

const addQuiz = (quiz: Quiz) => {
  quizzes.push(quiz);
}

const getQuizById = (id: number): Quiz | undefined => {
  return quizzes.find(quiz => quiz.id === id);
}

const filterByCategory = (category: Category): Quiz[] => {
  return quizzes.filter(quiz => quiz.category === category);
}

const getQuizAnswers = (quiz: Quiz): Answer[] => {
  const quizData = getQuizById(quiz.id);
  return quizData ? quizData.answers : [];
}

const printQuizAnswersCount = (): string[] => {
  return quizzes.map(quiz => {
     const answers = getQuizAnswers(quiz);
     return `Quiz ID: ${quiz.id}, Number of Answers: ${answers.length}`;
  });
}


addQuiz({
  id: 1,
  question: "What is 2 + 2?",
  answers: [
    { id: 1, text: "3", isCorrect: false },
    { id: 2, text: "4", isCorrect: true },
    { id: 3, text: "5", isCorrect: false },
  ],
  category: "Math",
});


// Testing
console.log(getQuizById(1))
console.log(filterByCategory("Math"));
console.log(getQuizAnswers(getQuizById(1)!));
console.log(printQuizAnswersCount());
