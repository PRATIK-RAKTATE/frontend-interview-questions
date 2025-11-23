// pages/index.js - Homepage
import SEO from '../components/SEO'

export default function HomePage({ questions }) {
  const homepageQuestions = [
    {
      question: "What are the most common frontend interview questions?",
      answer: "The most common frontend interview questions cover JavaScript fundamentals, React concepts, CSS layout techniques, HTML semantics, and system design principles."
    },
    {
      question: "How to prepare for frontend developer interviews?",
      answer: "Prepare by mastering JavaScript fundamentals, practicing React concepts, understanding CSS layouts, learning browser APIs, and doing mock interviews."
    }
  ]

  return (
    <>
      <SEO 
        title="Frontend Interview Questions 2025 | React, JavaScript, CSS, HTML Practice"
        description="Comprehensive collection of 500+ frontend interview questions with detailed answers. Practice React, JavaScript, CSS, HTML, and system design questions for 2025 interviews."
        questions={homepageQuestions}
      />
      
      <main>
        <h1>Frontend Interview Questions & Answers 2025</h1>
        {/* Your content */}
      </main>
    </>
  )
}