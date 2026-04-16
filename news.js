document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mock Data (Simulating database response) ---
    const allNews = [
        { id: 1, title: "The Future of Quantum Computing", content: "Researchers achieved a new stability milestone for q-bits, promising faster development timelines...", author: "Admin", date: "Dec 21, 2025" },
        { id: 2, title: "AI Ethics: The Next Frontier in Software", content: "A deep dive into how large tech firms are tackling bias and fairness in machine learning algorithms...", author: "Recruiter (Innovate Labs)", date: "Dec 15, 2025" },
        { id: 3, title: "WebAssembly: Faster Than Native?", content: "New benchmarks show impressive performance gains for C++ code compiled to WebAssembly...", author: "User (Job Seeker)", date: "Dec 18, 24 2025" },
        { id: 4, title: "The Role of Microservices in Modern Apps", content: "A look at how microservices architecture improves deployment speed and scalability...", author: "Admin", date: "Dec 10, 2025" },
    ];

    const articlesContainer = document.getElementById('articles-container');
    const submitNewsForm = document.getElementById('submit-news-form');

    // --- Function to Display News ---
    function displayNews() {
        articlesContainer.innerHTML = ''; 

        allNews.forEach(article => {
            const card = document.createElement('article');
            card.className = 'news-card card';
            card.innerHTML = `
                <h3>${article.title}</h3>
                <p>${article.content.substring(0, 150)}...</p>
                <span class="date">Source: ${article.author} | ${article.date}</span>
                <a href="#" style="margin-top: 10px; display: block;">Read Full Article &rarr;</a>
            `;
            articlesContainer.appendChild(card);
        });
    }

    // --- Handle News Submission (Front-end only simulation) ---
    submitNewsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const title = document.getElementById('articleTitle').value;
        const content = document.getElementById('articleContent').value;
        
        // In a real application: API Call to POST the data.
        
        // Front-end Simulation: Add new article to mock data and refresh
        const newArticle = {
            id: allNews.length + 1,
            title: title,
            content: content,
            author: "Simulated User", // In a real app, this comes from the logged-in user
            date: new Date().toLocaleDateString('en-US')
        };
        
        allNews.unshift(newArticle); // Add to the beginning
        displayNews();
        
        alert('News article submitted successfully (Front-end simulation).');
        submitNewsForm.reset();
    });

    displayNews();
});