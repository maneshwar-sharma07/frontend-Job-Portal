// ===================================
// FILE: mockJobDatabase.js
// This simulates 150 entries from the 'jobs' database table
// ===================================
export const mockAllJobs = [
    // --- Featured Top 10 Jobs ---
    { id: 101, title: "Senior Frontend Developer", company: "TechCorp Solutions", location: "Remote", salary: 125000, type: "Full-Time", description: "Design and implement high-performance user interfaces using React/Vue/Angular.", category: "Software" },
    { id: 102, title: "Data Scientist (NLP)", company: "Innovate Labs", location: "New York, USA", salary: 145000, type: "Full-Time", description: "Develop and deploy machine learning models for natural language processing.", category: "Data Science" },
    { id: 103, title: "Lead UX Designer", company: "Creative Minds Co.", location: "San Francisco, USA", salary: 110000, type: "Part-Time", description: "Lead the design process for our flagship mobile application focusing on user experience.", category: "Design" },
    { id: 104, title: "Backend Engineer (Node.js)", company: "CloudServe", location: "Remote (Global)", salary: 105000, type: "Remote", description: "Develop scalable and resilient server-side applications using Node.js and microservices.", category: "Software" },
    { id: 105, title: "Digital Marketing Specialist", company: "MarketGrow Agency", location: "London, UK", salary: 65000, type: "Full-Time", description: "Execute digital campaigns across social media, search engines, and email marketing.", category: "Marketing" },
    { id: 106, title: "Junior Python Developer", company: "Startup Hub", location: "Austin, USA", salary: 75000, type: "Full-Time", description: "Assist senior developers in building new features and maintaining existing Python scripts.", category: "Software" },
    { id: 107, title: "Cloud Architect (AWS)", company: "Global Tech", location: "Seattle, USA", salary: 160000, type: "Full-Time", description: "Design and manage complex, highly available cloud infrastructure on AWS.", category: "DevOps" },
    { id: 108, title: "Cyber Security Analyst", company: "SecureNet", location: "Washington D.C., USA", salary: 95000, type: "Full-Time", description: "Monitor security systems, analyze threats, and respond to incidents.", category: "Security" },
    { id: 109, title: "Financial Accountant", company: "FinancePro", location: "Chicago, USA", salary: 85000, type: "Full-Time", description: "Manage general ledger, prepare financial statements, and assist with audits.", category: "Finance" },
    { id: 110, title: "Technical Writer", company: "DocuGen", location: "Remote", salary: 60000, type: "Part-Time", description: "Create clear and concise technical documentation for software products.", category: "Content" },
    // --- Remaining 140 Simulated Jobs (Diverse Titles, Locations, and Salaries) ---
    { id: 111, title: "React Native Developer", company: "MobileFast", location: "San Diego, USA", salary: 98000, type: "Full-Time", description: "Build cross-platform mobile apps.", category: "Software" },
    { id: 112, title: "DevOps Engineer (Azure)", company: "AutoScale", location: "Toronto, Canada", salary: 115000, type: "Full-Time", description: "Implement CI/CD pipelines.", category: "DevOps" },
    { id: 113, title: "Database Administrator (SQL)", company: "DataKeep", location: "Dallas, USA", salary: 92000, type: "Full-Time", description: "Maintain and optimize large SQL databases.", category: "Database" },
    { id: 114, title: "Product Manager", company: "VisionCorp", location: "London, UK", salary: 130000, type: "Full-Time", description: "Define product vision and roadmap.", category: "Management" },
    { id: 115, title: "iOS Swift Developer", company: "AppGen", location: "Dublin, Ireland", salary: 105000, type: "Full-Time", description: "Develop and maintain native iOS applications.", category: "Software" },
    { id: 116, title: "Quality Assurance Tester", company: "TestRight", location: "Remote", salary: 68000, type: "Part-Time", description: "Perform manual and automated testing.", category: "QA" },
   
];


const baseJobs = mockAllJobs.slice(0, 10);
let currentId = 111;
while (mockAllJobs.length < 150) {
    const job = baseJobs[Math.floor(Math.random() * baseJobs.length)];
    mockAllJobs.push({
        ...job,
        id: currentId++,
        title: `${job.title} - Variant ${currentId % 5}`,
        location: (currentId % 3 === 0) ? "Mumbai, India" : (currentId % 3 === 1 ? "Berlin, Germany" : "Sydney, Australia"),
        salary: job.salary + (Math.floor(Math.random() * 20000) - 10000),
        company: `${job.company} International`,
        type: (currentId % 4 === 0) ? 'Remote' : 'Full-Time'
    });
}