/** @type {import('next').NextConfig} */
const nextConfig = {
  // Basic optimizations
  reactStrictMode: true,
  swcMinify: true,
  
  // Compiler optimizations for production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    reactRemoveProperties: process.env.NODE_ENV === 'production',
  },
  
  // Image optimizations
  images: {
    domains: ['yourdomain.com'], // Add your domain and any CDN domains
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Experimental features for performance
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
    gzipSize: true,
  },

  // Environment variables for client-side (if needed for analytics)
  env: {
    SITE_URL: process.env.SITE_URL || 'https://yourdomain.com',
    GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
  },

  // Headers for security and SEO
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Security headers
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          // Performance headers
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          },
        ],
      },
      {
        // Specific caching for static assets
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        // Caching for images
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=31536000'
          }
        ]
      }
    ]
  },

  // Redirects for SEO and user experience
  async redirects() {
    return [
      // Common synonyms and misspellings
      {
        source: '/frontend-interview-questions',
        destination: '/categories/javascript',
        permanent: true,
      },
      {
        source: '/frontend-questions',
        destination: '/categories/javascript',
        permanent: true,
      },
      {
        source: '/javascript-questions',
        destination: '/categories/javascript',
        permanent: true,
      },
      {
        source: '/react-questions',
        destination: '/categories/react',
        permanent: true,
      },
      {
        source: '/css-questions',
        destination: '/categories/css',
        permanent: true,
      },
      {
        source: '/html-questions',
        destination: '/categories/html',
        permanent: true,
      },
      {
        source: '/system-design-questions',
        destination: '/categories/system-design',
        permanent: true,
      },
      // Old URLs to new structure
      {
        source: '/question/:slug',
        destination: '/questions/javascript/:slug',
        permanent: true,
      },
    ]
  },

  // Rewrites for clean URLs
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
      {
        source: '/robots.txt',
        destination: '/api/robots',
      },
    ]
  },

  // Build optimization
  poweredByHeader: false,
  generateEtags: false,
  
  // Compression
  compress: true,

  // Trailing slash for consistent URLs
  trailingSlash: true,

  // ISR configuration
  experimental: {
    isrMemoryCacheSize: 0, // Use filesystem cache for better performance
  }
}

export default nextConfig