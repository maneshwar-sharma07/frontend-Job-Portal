// Import mock data (no need for a separate file, we create it here)

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mock Data: Simulating database of Queries and Replies ---
    let queryDatabase = [
        { 
            id: 1, 
            title: "Salary expectation for Senior Data Scientist in Bangalore?", 
            details: "I have 5 years experience, looking for a figure range for a large MNC.", 
            senderId: "Anon-1234", 
            time: "Dec 21, 2025", 
            replies: [
                { id: 101, senderId: "Anon-7890", text: "Around ₹25LPA to ₹35LPA is competitive in the current market.", time: "1 hour ago" },
                { id: 102, senderId: "Anon-4321", text: "Depends heavily on the company. For product-based, expect higher.", time: "30 min ago" }
            ] 
        },
        { 
            id: 2, 
            title: "Culture at Innovate Labs?", 
            details: "Thinking of applying for a Frontend role. Is the work-life balance good?", 
            senderId: "Anon-9876", 
            time: "Dec 20, 2025", 
            replies: [
                { id: 201, senderId: "Anon-5555", text: "Fast-paced, high pressure but excellent learning opportunities.", time: "4 hours ago" }
            ] 
        },
    ];
    
    const queryFeedContainer = document.getElementById('query-feed-container');
    const newQueryForm = document.getElementById('new-query-form');
    const anonIdDisplay = document.getElementById('current-anon-id');
    const generateIdButton = document.getElementById('generate-anon-id');
    const noQueriesMessage = document.getElementById('no-queries-message');
    
    // Initialize or load Anonymous ID
    let anonId = localStorage.getItem('anonId');
    if (!anonId) {
        anonId = 'Anon-' + Math.floor(Math.random() * 9000 + 1000);
        localStorage.setItem('anonId', anonId);
    }
    anonIdDisplay.textContent = anonId;


    // --- Function to Render All Queries ---
    function renderQueries() {
        queryFeedContainer.innerHTML = '';
        queryDatabase.sort((a, b) => b.id - a.id); // Show latest first
        
        if (queryDatabase.length === 0) {
            noQueriesMessage.style.display = 'block';
            return;
        }
        noQueriesMessage.style.display = 'none';

        queryDatabase.forEach(query => {
            const queryDiv = document.createElement('div');
            queryDiv.className = 'query-post';
            queryDiv.innerHTML = `
                <div class="query-header">
                    <span class="query-title">${query.title}</span>
                    <span class="query-meta">Posted by: **${query.senderId}** | ${query.time}</span>
                </div>
                <p>${query.details}</p>
                
                <div class="reply-section">
                    <h4>Replies (${query.replies.length})</h4>
                    <div class="replies-list" id="replies-list-${query.id}">
                        </div>
                    
                    <form class="reply-form-container" data-query-id="${query.id}">
                        <input type="text" placeholder="Post your anonymous reply..." required>
                        <button type="submit" class="btn btn-outline"><i class="fas fa-reply"></i></button>
                    </form>
                </div>
            `;
            queryFeedContainer.appendChild(queryDiv);
            
            // Render Replies for this query
            const repliesList = document.getElementById(`replies-list-${query.id}`);
            query.replies.forEach(reply => {
                const replyItem = document.createElement('div');
                replyItem.className = 'reply-item';
                replyItem.innerHTML = `
                    <span class="reply-meta">${reply.senderId}:</span>
                    ${reply.text}
                `;
                repliesList.appendChild(replyItem);
            });
        });
        
        // --- Attach Reply Form Listeners after rendering ---
        document.querySelectorAll('.reply-form-container').forEach(form => {
            form.addEventListener('submit', handleReplySubmission);
        });
    }

    // --- Handle New Query Submission ---
    newQueryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const title = document.getElementById('query-title').value.trim();
        const details = document.getElementById('query-details').value.trim();
        
        if (title && details) {
            // In a real app: API Call to POST the new query.
            
            // Front-end Simulation: 
            const newQuery = {
                id: Date.now(),
                title: title,
                details: details,
                senderId: anonId,
                time: "Just Now",
                replies: []
            };
            queryDatabase.push(newQuery);
            renderQueries();
            
            alert('Query posted anonymously!');
            newQueryForm.reset();
        }
    });

    // --- Handle Reply Submission ---
    function handleReplySubmission(e) {
        e.preventDefault();
        const form = e.currentTarget;
        const queryId = parseInt(form.getAttribute('data-query-id'));
        const replyText = form.querySelector('input').value.trim();
        
        if (replyText) {
            // Find the query
            const query = queryDatabase.find(q => q.id === queryId);
            
            if (query) {
                // In a real app: API Call to POST the reply.
                
                // Front-end Simulation: 
                const newReply = {
                    id: Date.now(),
                    senderId: anonId,
                    text: replyText,
                    time: "A moment ago"
                };
                query.replies.push(newReply);
                renderQueries(); // Re-render the entire feed to update counts/replies
                form.reset();
            }
        }
    }
    
    // --- Handle Anon ID Change ---
    generateIdButton.addEventListener('click', () => {
        const newAnonId = 'Anon-' + Math.floor(Math.random() * 9000 + 1000);
        localStorage.setItem('anonId', newAnonId);
        anonId = newAnonId;
        anonIdDisplay.textContent = anonId;
        alert('New Anonymous ID generated: ' + anonId + '\nNew queries/replies will use this ID.');
    });


    renderQueries();
});