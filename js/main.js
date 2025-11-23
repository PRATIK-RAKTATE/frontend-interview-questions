// Performance monitoring
if ('performance' in window) {
    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
            console.log(`${entry.name}: ${entry.value}`);
        });
    });
    
    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
}

// Lazy loading images
document.addEventListener('DOMContentLoaded', function() {
    // Lazy load images
    const lazyImages = [].slice.call(document.querySelectorAll('img[data-src]'));
    
    if ('IntersectionObserver' in window) {
        const lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove('lazy');
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    }

    // Add structured data for breadcrumbs
    addBreadcrumbStructuredData();
    
    // Initialize search functionality
    initSearch();
});

// Breadcrumb structured data
function addBreadcrumbStructuredData() {
    const breadcrumbData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://devexam.netlify.app"
            }
        ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(breadcrumbData);
    document.head.appendChild(script);
}

// Search functionality
function initSearch() {
    const searchInput = document.querySelector('input[type="search"]');
    const searchButton = document.querySelector('.search-box button');
    
    if (searchInput && searchButton) {
        searchButton.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

function performSearch() {
    const searchInput = document.querySelector('input[type="search"]');
    const query = searchInput.value.trim();
    
    if (query) {
        // Track search event
        if (typeof gtag !== 'undefined') {
            gtag('event', 'search', {
                'search_term': query
            });
        }
        
        // Redirect to search results
        window.location.href = `/search?q=${encodeURIComponent(query)}`;
    }
}

// Service Worker Registration for Caching
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(error) {
                console.log('ServiceWorker registration failed: ', error);
            });
    });
}

// Prefetch pages on hover
document.addEventListener('mouseover', function(e) {
    const link = e.target.closest('a');
    if (link && link.href && isSameOrigin(link.href)) {
        const prefetchLink = document.createElement('link');
        prefetchLink.rel = 'prefetch';
        prefetchLink.href = link.href;
        document.head.appendChild(prefetchLink);
    }
});

function isSameOrigin(url) {
    return new URL(url, window.location).origin === window.location.origin;
}