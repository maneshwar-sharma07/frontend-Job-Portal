// Import mock data from the separate file
import { mockAllJobs } from './mockJobDatabase.js';

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Data: Take the first 10 jobs for the Home Page's featured section ---
    const featuredJobs = mockAllJobs.slice(0, 10);

    const latestNews = [
        // (Existing Mock News Data remains here for brevity)
        { id: 201, title: "AI Ethics: The Next Frontier in Software", snippet: "A deep dive into how large tech firms are tackling bias...", date: "Dec 15, 2025" },
        { id: 202, title: "WebAssembly: Faster Than Native?", snippet: "New benchmarks show impressive performance gains...", date: "Dec 18, 2025" },
        { id: 203, title: "The Rise of Low-Code/No-Code Platforms", snippet: "How citizen developers are changing the landscape...", date: "Dec 20, 2025" },
    ];


    // --- Function to Load Featured Jobs (Now uses the first 10 jobs from 150) ---
    function loadFeaturedJobs() {
        const jobContainer = document.getElementById('job-list-container');
        jobContainer.innerHTML = ''; 

        featuredJobs.forEach(job => {
            const card = document.createElement('div');
            card.className = 'job-card card';
            card.innerHTML = `
                <h3>${job.title}</h3>
                <p class="company">${job.company}</p>
                <p class="location"><i class="fas fa-map-marker-alt"></i> ${job.location}</p>
                <p class="salary"><i class="fas fa-money-bill-wave"></i> $${job.salary.toLocaleString()}+</p>
                <a href="jobs.html?job_id=${job.id}" class="btn btn-outline">View Details</a>
            `;
            jobContainer.appendChild(card);
        });
    }

    // --- Function to Load Latest News (Unchanged) ---
    function loadLatestNews() {
        const newsContainer = document.getElementById('news-container');
        newsContainer.innerHTML = ''; 

        latestNews.forEach(article => {
            const card = document.createElement('article');
            card.className = 'news-card card';
            card.innerHTML = `
                <h3>${article.title}</h3>
                <p>${article.snippet}...</p>
                <span class="date">${article.date}</span>
                <a href="news.html?news_id=${article.id}">Read More &rarr;</a>
            `;
            newsContainer.appendChild(card);
        });
    }

    // --- Home Search Form Handler (Unchanged) ---
    const searchForm = document.getElementById('home-search-form');
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const jobTitle = document.getElementById('job-title-search').value;
        const location = document.getElementById('location-search').value;

        // Redirect to the jobs page with query parameters for filtering
        window.location.href = `jobs.html?title=${encodeURIComponent(jobTitle)}&location=${encodeURIComponent(location)}`;
    });

    // Run the functions
    loadFeaturedJobs();
    loadLatestNews();
});