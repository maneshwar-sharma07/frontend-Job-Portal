document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mock Data (Simulating jobs posted by this recruiter) ---
    const recruiterJobs = [
        { id: 101, title: "Senior Data Engineer", location: "Seattle, USA", applicants: 15, pending: 5, date: "2 days ago" },
        { id: 102, title: "Software Development Manager", location: "Remote", applicants: 8, pending: 2, date: "5 days ago" },
        { id: 103, title: "HR Specialist", location: "Boston, USA", applicants: 22, pending: 10, date: "1 week ago" },
    ];

    const postedJobsContainer = document.getElementById('posted-jobs-container');
    const addJobForm = document.getElementById('add-job-form');

    // --- Function to Display Posted Jobs ---
    function displayPostedJobs() {
        postedJobsContainer.innerHTML = ''; 

        recruiterJobs.forEach(job => {
            const card = document.createElement('div');
            card.className = 'job-management-card card';
            card.style.marginBottom = '15px'; // Separate style for these specific cards
            card.innerHTML = `
                <h3>${job.title}</h3>
                <p style="color: var(--light-text);">Location: ${job.location} | Posted: ${job.date}</p>
                <div class="applicants-summary" style="margin: 10px 0;">
                    <span style="font-weight: bold; margin-right: 15px;"><i class="fas fa-users"></i> ${job.applicants} Applicants</span>
                    <span style="color: var(--primary-color);"><i class="fas fa-clock"></i> ${job.pending} Pending Review</span>
                </div>
                <button class="btn btn-outline" data-job-id="${job.id}">View Applicants</button>
            `;
            postedJobsContainer.appendChild(card);
        });
    }

    // --- Handle Job Posting (Front-end only simulation) ---
    addJobForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // In a real application: API Call to POST the new job data.
        
        // Front-end Simulation:
        const title = addJobForm.children[0].children[0].value;
        alert(`Job "${title}" posted successfully (Front-end simulation).`);
        addJobForm.reset();
        
        // Simulate adding the new job to the list
        const newJob = {
            id: recruiterJobs.length + 1, 
            title: title, 
            location: 'New Post', 
            applicants: 0, 
            pending: 0, 
            date: "Just Now"
        };
        recruiterJobs.unshift(newJob);
        displayPostedJobs();
    });

    displayPostedJobs();
});