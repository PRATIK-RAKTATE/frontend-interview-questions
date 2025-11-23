// pages/categories/[category].js
import SEO from '../../components/SEO'

export default function CategoryPage({ category, questions }) {
  const categoryTitles = {
    'javascript': 'JavaScript Interview Questions',
    'react': 'React.js Interview Questions',
    'css': 'CSS Interview Questions',
    'html': 'HTML Interview Questions',
    'system-design': 'Frontend System Design Questions'
  }

  const title = `${categoryTitles[category]} | 2025 Preparation Guide`
  const description = `Comprehensive ${categoryTitles[category].toLowerCase()} with detailed answers and code examples. Prepare for your next frontend developer interview.`

  const faqQuestions = [
    {
      question: `What are the most important ${categoryTitles[category].toLowerCase()}?`,
      answer: `The most important ${categoryTitles[category].toLowerCase()} cover fundamental concepts, advanced topics, and practical implementation scenarios relevant to modern web development.`
    }
  ]

  return (
    <>
      <SEO 
        title={title}
        description={description}
        questions={faqQuestions}
      />
      
      <main>
        <h1>{categoryTitles[category]}</h1>
        {/* Render questions list */}
      </main>
    </>
  )
}