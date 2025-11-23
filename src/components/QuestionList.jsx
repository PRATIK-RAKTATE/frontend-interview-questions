// components/QuestionList.jsx
import Image from 'next/image'
import Link from 'next/link'

export default function QuestionList({ questions }) {
  return (
    <div className="questions-list">
      {questions.map((question, index) => (
        <article key={question.id} className="question-card">
          <Link 
            href={`/questions/${question.category}/${question.slug}`}
            prefetch={index < 5} // Prefetch first 5 questions
          >
            <h2>{question.title}</h2>
            <p>{question.excerpt}</p>
            <div className="meta">
              <span className="category">{question.category}</span>
              <span className="difficulty">{question.difficulty}</span>
            </div>
          </Link>
        </article>
      ))}
    </div>
  )
}