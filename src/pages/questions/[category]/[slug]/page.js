// pages/questions/[category]/[slug]/page.js
import SEO from "@/components/SEO"
import { getAllQuestions, getQuestionBySlug } from "@/lib/questions"

export async function getStaticPaths() {
  const questions = await getAllQuestions()

  const paths = questions.map(q => ({
    params: {
      category: q.category.toLowerCase().replace(/\s+/g, '-'),
      slug: q.slug,
    }
  }))

  return {
    paths,
    fallback: 'blocking' // or 'false' if you want 404 for non-existent pages
  }
}

