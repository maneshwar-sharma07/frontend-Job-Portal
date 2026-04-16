// ===================================
// FILE: jobs.js (FINAL VERSION with CORRECT PORT 5000 API CALL)
// ===================================
import { mockAllJobs } from './mockJobDatabase.js';

document.addEventListener('DOMContentLoaded', () => {
    
    const allJobs = mockAllJobs;
    const jobResultsList = document.getElementById('job-results-list');
    const jobCountSpan = document.getElementById('job-count');
    const noJobsMessage = document.getElementById('no-jobs-message');

    // Modal Elements
    const modal = document.getElementById('application-modal');
    const closeBtn = document.querySelector('.close-button');
    const modalJobTitle = document.getElementById('modal-job-title');
    const modalCompanyName = document.getElementById('modal-company-name');
    const appliedJobIdInput = document.getElementById('applied-job-id');
    const applyForm = document.getElementById('apply-form');


    // --- Helper function to convert salary range string to numeric limits ---
    function getSalaryLimits(rangeStr) {
        if (!rangeStr) return { min: 0, max: Infinity };
        if (rangeStr === '150k+') return { min: 150000, max: Infinity };
        
        const [minStr, maxStr] = rangeStr.replace(/[$,k]/g, '').split('-');
        return {
            min: parseInt(minStr) * 1000,
            max: parseInt(maxStr) * 1000
        };
    }

    // --- Function to Filter and Display Jobs ---
    function filterAndDisplayJobs(filters) {
        filters = filters || {}; 
        
        // Filtering Logic
        let filteredJobs = allJobs.filter(job => {
            const keyword = (filters.title || '').toLowerCase();
            const locationFilter = (filters.location || '').toLowerCase();
            const typeFilter = filters.type || '';
            const salaryFilter = filters.salary || '';

            const titleMatch = !keyword || 
                                job.title.toLowerCase().includes(keyword) ||
                                job.company.toLowerCase().includes(keyword) ||
                                job.description.toLowerCase().includes(keyword) ||
                                (job.category && job.category.toLowerCase().includes(keyword)); 

            const locationMatch = !locationFilter || job.location.toLowerCase().includes(locationFilter);
            const typeMatch = !typeFilter || job.type === typeFilter;
            const salaryLimits = getSalaryLimits(salaryFilter);
            const salaryMatch = job.salary >= salaryLimits.min && job.salary <= salaryLimits.max;

            return titleMatch && locationMatch && salaryMatch && typeMatch;
        });
        
        // Rendering the filtered jobs
        jobResultsList.innerHTML = '';
        jobCountSpan.textContent = filteredJobs.length;
        noJobsMessage.style.display = filteredJobs.length === 0 ? 'block' : 'none';

        filteredJobs.forEach(job => {
            const card = document.createElement('div');
            card.className = 'job-card card';
            card.innerHTML = `
                <h3>${job.title}</h3>
                <p class="company">${job.company} | ${job.type}</p>
                <p class="location"><i class="fas fa-map-marker-alt"></i> ${job.location}</p>
                <p class="salary"><i class="fas fa-money-bill-wave"></i> $${job.salary.toLocaleString()}+</p>
                <p class="description">${job.description.substring(0, 80)}...</p>
                <button class="btn btn-outline apply-btn" data-job-id="${job.id}" data-job-title="${job.title}" data-company-name="${job.company}" style="margin-top: 10px;">View & Apply</button>
            `;
            jobResultsList.appendChild(card);
        });
        
        // Attach listener to the newly created Apply buttons
        document.querySelectorAll('.apply-btn').forEach(button => {
            button.addEventListener('click', openApplicationModal);
        });
    }

    // --- Modal Functions ---
    function openApplicationModal(event) {
        const jobId = event.currentTarget.dataset.jobId;
        const jobTitle = event.currentTarget.dataset.jobTitle;
        const companyName = event.currentTarget.dataset.companyName;

        modalJobTitle.textContent = jobTitle;
        modalCompanyName.textContent = companyName;
        appliedJobIdInput.value = jobId;
        modal.style.display = 'block';
    }

    function closeApplicationModal() {
        modal.style.display = 'none';
        applyForm.reset(); // Clear the form after closing/submitting
    }

    // Attach listeners for closing the modal
    closeBtn.onclick = closeApplicationModal;
    window.onclick = function(event) {
        if (event.target == modal) {
            closeApplicationModal();
        }
    }

    // --- Handle Application Form Submission (REAL API CALL) ---
    applyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const jobId = appliedJobIdInput.value;
        const jobTitle = modalJobTitle.textContent;
        const name = document.getElementById('applicantName').value;
        const email = document.getElementById('applicantEmail').value;
        const resume = document.getElementById('applicantResume').value;
        const coverLetter = document.getElementById('applicantCoverLetter').value;

        // Data ready to be sent to the Python Backend
        const applicationData = {
            jobId: parseInt(jobId), // Ensure jobId is a number for the database
            name: name,
            email: email,
            resume: resume,
            coverLetter: coverLetter 
        };
        
        // 🔥 CORRECTION: Using the full URL 'http://127.0.0.1:5000' to target the Flask server
        fetch('http://127.0.0.1:5000/api/applications', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(applicationData) // Convert JavaScript object to JSON string
        })
        .then(response => {
            if (!response.ok) {
                // If the server failed (e.g., 400 or 500 status code), throw an error
                throw new Error(`Server responded with status: ${response.status}`);
            }
            return response.json(); // Parse the JSON response from Python
        })
        .then(data => {
            // Success response (database has saved the data)
            alert(`🥳 Success! Your application for "${jobTitle}" has been submitted and saved! (Application ID: ${data.application_id})`);
            closeApplicationModal();
        })
        .catch(error => {
            // Error handling (Network issue or Python error)
            console.error('Submission Error:', error);
            alert(`❌ Submission Failed: Could not connect to the server or data error.`); 
        });
    });


    // --- Initial Load & Filter Handlers ---
    const urlParams = new URLSearchParams(window.location.search);
    
    const initialFilters = {
        title: urlParams.get('title') || '',
        location: urlParams.get('location') || '',
        salary: document.getElementById('salaryRange').value || '',
        type: document.getElementById('jobType').value || ''
    };

    document.getElementById('jobTitle').value = initialFilters.title;
    document.getElementById('jobLocation').value = initialFilters.location;

    filterAndDisplayJobs(initialFilters); 

    document.getElementById('job-filters-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const newFilters = {
            title: document.getElementById('jobTitle').value,
            location: document.getElementById('jobLocation').value,
            salary: document.getElementById('salaryRange').value,
            type: document.getElementById('jobType').value
        };
        filterAndDisplayJobs(newFilters);
    });
});