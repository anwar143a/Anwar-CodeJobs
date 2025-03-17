// Check if user is logged in
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'index.html';
        return;
    }

    // Display user name
    document.querySelector('.user-name').textContent = currentUser.name;

    // Fetch jobs from API
    const apiKey = localStorage.getItem('apiKey');
    fetchJobs(apiKey);

    // Handle logout
    document.querySelector('.logout-btn').addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('apiKey');
        window.location.href = 'index.html';
    });

    // Handle job search
    const searchInput = document.querySelector('.search-bar input');
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const jobCards = document.querySelectorAll('.job-card');
        
        jobCards.forEach(card => {
            const title = card.querySelector('.job-title').textContent.toLowerCase();
            const company = card.querySelector('.job-company').textContent.toLowerCase();
            const location = card.querySelector('.job-location').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || company.includes(searchTerm) || location.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Handle apply buttons
    document.querySelectorAll('.apply-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const jobCard = e.target.closest('.job-card');
            const jobTitle = jobCard.querySelector('.job-title').textContent;
            alert(`Application submitted for ${jobTitle}!`);
        });
    });

    // Handle navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            e.target.classList.add('active');
            console.log(`Navigating to ${e.target.textContent}`);
        });
    });

    // Handle notifications
    document.querySelector('.notifications').addEventListener('click', () => {
        alert('Notifications feature coming soon!');
    });
});

async function fetchJobs(apiKey) {
    try {
        // API endpoint for jobs
        const response = await fetch('https://api.kodjobs.com/v1/jobs', {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch jobs');
        }

        const jobs = await response.json();

        // Update stats
        document.querySelector('.stat-number:nth-child(1)').textContent = '0';
        document.querySelector('.stat-number:nth-child(2)').textContent = '0';
        document.querySelector('.stat-number:nth-child(3)').textContent = '0';
        document.querySelector('.stat-number:nth-child(4)').textContent = jobs.length;

        // Display jobs in cards
        const jobsContainer = document.querySelector('.recommended-jobs');
        jobsContainer.innerHTML = jobs.map(job => `
            <div class="job-card">
                <h3 class="job-title">${job.title}</h3>
                <p class="job-company">${job.company}</p>
                <p class="job-location">${job.location}</p>
                <p class="job-salary">${job.salary}</p>
                <p class="job-description">${job.description}</p>
                <div class="job-requirements">
                    ${job.requirements.map(req => `<span class="requirement-tag">${req}</span>`).join('')}
                </div>
                <button class="apply-btn">Apply Now</button>
            </div>
        `).join('');

        // Add event listeners to new apply buttons
        document.querySelectorAll('.apply-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const jobCard = e.target.closest('.job-card');
                const jobTitle = jobCard.querySelector('.job-title').textContent;
                alert(`Application submitted for ${jobTitle}!`);
            });
        });

    } catch (error) {
        console.error('Error fetching jobs:', error);
        // Fallback to sample data if API fails
        const jobs = [
            {
                id: 1,
                title: 'Senior Software Engineer',
                company: 'Tech Solutions Inc.',
                location: 'New York, NY',
                salary: '$120,000 - $150,000',
                description: 'Looking for an experienced software engineer to join our team.',
                requirements: ['5+ years experience', 'React', 'Node.js', 'AWS']
            },
            {
                id: 2,
                title: 'Frontend Developer',
                company: 'Digital Innovations',
                location: 'San Francisco, CA',
                salary: '$90,000 - $120,000',
                description: 'Join our frontend team to build amazing user experiences.',
                requirements: ['3+ years experience', 'JavaScript', 'React', 'CSS']
            },
            {
                id: 3,
                title: 'Full Stack Developer',
                company: 'WebTech Solutions',
                location: 'Remote',
                salary: '$100,000 - $130,000',
                description: 'Seeking a full stack developer for our growing team.',
                requirements: ['4+ years experience', 'Python', 'Django', 'React']
            }
        ];

        // Update stats with fallback data
        document.querySelector('.stat-number:nth-child(1)').textContent = '0';
        document.querySelector('.stat-number:nth-child(2)').textContent = '0';
        document.querySelector('.stat-number:nth-child(3)').textContent = '0';
        document.querySelector('.stat-number:nth-child(4)').textContent = jobs.length;

        // Display fallback jobs in cards
        const jobsContainer = document.querySelector('.recommended-jobs');
        jobsContainer.innerHTML = jobs.map(job => `
            <div class="job-card">
                <h3 class="job-title">${job.title}</h3>
                <p class="job-company">${job.company}</p>
                <p class="job-location">${job.location}</p>
                <p class="job-salary">${job.salary}</p>
                <p class="job-description">${job.description}</p>
                <div class="job-requirements">
                    ${job.requirements.map(req => `<span class="requirement-tag">${req}</span>`).join('')}
                </div>
                <button class="apply-btn">Apply Now</button>
            </div>
        `).join('');

        // Add event listeners to fallback apply buttons
        document.querySelectorAll('.apply-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const jobCard = e.target.closest('.job-card');
                const jobTitle = jobCard.querySelector('.job-title').textContent;
                alert(`Application submitted for ${jobTitle}!`);
            });
        });
    }
} 