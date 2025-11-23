// pages/questions/[category]/[slug].js
import SEO from '../../../components/SEO'

export default function QuestionPage({ question }) {
  const structuredQuestions = [{
    question: question.title,
    answer: question.answer
  }]

  return (
    <>
      <SEO 
        title={`${question.title} - Frontend Interview Question`}
        description={`Learn about: ${question.title}. Detailed explanation with code examples for frontend developer interviews.`}
        questions={structuredQuestions}
        publishedTime={question.publishedAt}
        modifiedTime={question.updatedAt}
      />
      
      <article>
        <h1>{question.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: question.answer }} />
      </article>
    </>
  )
}

export async function getStaticPaths() {
  // Generate paths for all questions
  const questions = await getAllQuestions()
  const paths = questions.map(question => ({
    params: { 
      category: question.category.toLowerCase().replace(/\s+/g, '-'),
      slug: question.slug 
    }
  }))

  return { paths, fallback: 'blocking' }
}

export async function getStaticProps({ params }) {
  const question = await getQuestionBySlug(params.slug)
  
  if (!question) {
    return { notFound: true }
  }

  return {
    props: { question },
    revalidate: 86400 // 24 hours
  }
}