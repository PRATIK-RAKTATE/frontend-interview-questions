// lib/questions.js
// Mock data - replace with actual data source (API, database, etc.)

const mockQuestions = [
  {
    id: '1',
    title: 'What is JavaScript?',
    slug: 'what-is-javascript',
    category: 'javascript',
    answer: '<p>JavaScript is a high-level, interpreted programming language that is one of the core technologies of the World Wide Web.</p>',
    excerpt: 'Learn about JavaScript fundamentals',
    difficulty: 'beginner',
    publishedAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  }
  // Add more questions as needed
]

export async function getAllQuestions() {
  // In a real app, this would fetch from an API or database
  return mockQuestions
}

export async function getQuestionBySlug(slug) {
  const questions = await getAllQuestions()
  return questions.find(q => q.slug === slug) || null
}

export async function getQuestionsByCategory(category) {
  const questions = await getAllQuestions()
  return questions.filter(q => q.category === category)
}

export async function getAllCategories() {
  const questions = await getAllQuestions()
  const categories = [...new Set(questions.map(q => q.category))]
  return categories.map(cat => ({
    slug: cat,
    name: cat.charAt(0).toUpperCase() + cat.slice(1)
  }))
}

