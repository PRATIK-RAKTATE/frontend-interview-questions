// pages/sitemap.xml.js
const WEBSITE_URL = 'https://yourdomain.com'

function generateSiteMap(questions, categories) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${WEBSITE_URL}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      ${categories.map(category => `
        <url>
          <loc>${WEBSITE_URL}/categories/${category.slug}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>
      `).join('')}
      ${questions.map(question => `
        <url>
          <loc>${WEBSITE_URL}/questions/${question.category}/${question.slug}</loc>
          <lastmod>${question.updatedAt}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.6</priority>
        </url>
      `).join('')}
    </urlset>
  `
}

export async function getServerSideProps({ res }) {
  const questions = await getAllQuestions()
  const categories = await getAllCategories()

  const sitemap = generateSiteMap(questions, categories)

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return { props: {} }
}

export default function SiteMap() {}