// components/SEO.jsx
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function SEO({
  title = "Frontend Interview Questions & Answers 2025 | Comprehensive Guide",
  description = "Master frontend development interviews with 500+ real interview questions on React, JavaScript, CSS, HTML, and system design. Practice with detailed solutions and expert tips.",
  canonicalUrl,
  featuredImage = "/images/frontend-interview-questions-og.jpg",
  publishedTime,
  modifiedTime,
  questions = [],
  noIndex = false
}) {
  const router = useRouter()
  const currentUrl = canonicalUrl || `https://frontend-interview-questions.netlify.app${router.asPath}`
  
  // Default structured data for FAQ page
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": questions.map(q => ({
      "@type": "Question",
      "name": q.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.answer
      }
    }))
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Frontend Interview Prep",
    "url": "https://devexam.netlify.app",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://yourdomain.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Frontend Interview Prep",
    "url": "https://yourdomain.com",
    "logo": "https://yourdomain.com/logo.png",
    "description": "Comprehensive frontend development interview preparation platform",
    "sameAs": [
      "https://github.com/yourprofile",
      "https://linkedin.com/company/yourcompany"
    ]
  }

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      
      {/* No-index for development */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      {!noIndex && <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={featuredImage} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Frontend Interview Prep" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={featuredImage} />
      <meta name="twitter:site" content="@yourhandle" />
      <meta name="twitter:creator" content="@yourhandle" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="keywords" content="frontend interview questions, react interview questions, javascript interview questions, css interview questions, html interview questions, web development interview, coding interview preparation" />
      <meta name="author" content="Your Name" />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      {questions.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(defaultStructuredData) }}
        />
      )}
    </Head>
  )
}