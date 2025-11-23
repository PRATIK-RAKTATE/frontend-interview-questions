// utils/seoHelpers.js
export const generateQuestionStructuredData = (questions) => {
  return questions.map(question => ({
    "@type": "Question",
    "name": question.title,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": question.answer
    },
    "upvoteCount": question.upvotes || 0,
    "dateCreated": question.createdAt,
    "author": {
      "@type": "Person",
      "name": question.author || "Frontend Expert"
    }
  }))
}

export const generateBreadcrumbSchema = (breadcrumbs) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": breadcrumbs.map((breadcrumb, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": breadcrumb.name,
    "item": breadcrumb.url
  }))
})

export const optimizeContentForSEO = (content) => {
  // Add target keywords naturally
  const keywords = [
    'frontend interview questions',
    'javascript interview',
    'react interview questions',
    'css interview questions',
    'web development interview',
    'coding interview preparation'
  ]
  
  return content
    .replace(/\b(question|answer)\b/gi, (match) => {
      // Occasionally use synonyms for variety
      const synonyms = {
        'question': ['interview question', 'problem', 'challenge'],
        'answer': ['solution', 'explanation', 'approach']
      }
      if (Math.random() < 0.2 && synonyms[match.toLowerCase()]) {
        const options = synonyms[match.toLowerCase()]
        return options[Math.floor(Math.random() * options.length)]
      }
      return match
    })
}