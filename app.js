document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Management ---
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    themeToggle.addEventListener('click', () => {
        let newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // --- Dynamic Footer Injection ---
    // (To avoid repeating HTML across all pages)
    const footerHTML = `
        <div class="footer-container">
            <div class="footer-column">
                <a href="index.html" class="logo">ToolVerse</a>
                <p>Your one-stop shop for online tools.</p>
                <!-- Add social media links here -->
            </div>
            <div class="footer-column">
                <h4>Popular Tools</h4>
                <ul>
                    <li><a href="#">Image Compressor</a></li>
                    <li><a href="#">PDF to Word</a></li>
                    <li><a href="#">QR Code Generator</a></li>
                </ul>
            </div>
            <div class="footer-column">
                <h4>Quick Links</h4>
                <ul>
                    <li><a href="about.html">About</a></li>
                    <li><a href="contact.html">Contact</a></li>
                    <li><a href="terms.html">Terms of Use</a></li>
                    <li><a href="privacy.html">Privacy Policy</a></li>
                </ul>
            </div>
            <div class="footer-column">
                <h4>Newsletter</h4>
                <form class="newsletter-form">
                    <input type="email" placeholder="Your email address">
                    <button type="submit">Subscribe</button>
                </form>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; ${new Date().getFullYear()} ToolVerse. All rights reserved.</p>
        </div>
    `;
    const footers = document.querySelectorAll('.site-footer');
    footers.forEach(footer => footer.innerHTML = footerHTML);

    // --- Hamburger Menu ---
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // --- Ad Lazy Loader ---
    const adPlaceholders = document.querySelectorAll('.ad-container');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // In a real scenario, you would load the ad script here.
                // For this demo, we just make it visible.
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    adPlaceholders.forEach(ad => observer.observe(ad));

    // --- Tool Data and Dynamic Loading ---
    // (This would contain all 130+ tools)
    const toolData = {
        'Social Media': [
            { name: 'YouTube Video Downloader', url: '#' },
            { name: 'Instagram Reel Downloader', url: '#' },
            // ... more tools
        ],
        'Image Tools': [
            { name: 'Image Compressor', url: 'tool-page-template.html' },
            { name: 'Image Resizer', url: '#' },
            // ... more tools
        ]
    };

    // Load tools on the tools.html page
    if (document.getElementById('tools-container')) {
        const container = document.getElementById('tools-container');
        for (const category in toolData) {
            let categoryHtml = `<section class="tool-category"><h2>${category}</h2><div class="tool-grid">`;
            toolData[category].forEach(tool => {
                categoryHtml += `<a href="${tool.url}" class="tool-card"><h3>${tool.name}</h3></a>`;
            });
            categoryHtml += `</div></section>`;
            // Inject an ad between categories
            if (Object.keys(toolData).indexOf(category) > 0) {
                 container.innerHTML += `<div class="ad-container ad-category-banner"><div class="ad-placeholder" style="width: 300px; height: 250px;"></div></div>`;
            }
            container.innerHTML += categoryHtml;
        }
    }
    
    // Search functionality for tools.html
    const toolsSearch = document.getElementById('tools-search');
    if(toolsSearch) {
        toolsSearch.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            document.querySelectorAll('.tool-card').forEach(card => {
                const toolName = card.querySelector('h3').textContent.toLowerCase();
                if (toolName.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
});
