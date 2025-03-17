// Function to calculate age from date of birth
function calculateAge(dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return age;
}

// Function to load users from localStorage
function loadUsers() {
    try {
        const users = localStorage.getItem('users');
        return users ? JSON.parse(users) : [];
    } catch (error) {
        console.error('Error loading users:', error);
        return [];
    }
}

// Function to save users to localStorage
function saveUsers(users) {
    try {
        localStorage.setItem('users', JSON.stringify(users));
    } catch (error) {
        console.error('Error saving users:', error);
    }
}

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const password = e.target[1].value;
    
    const users = loadUsers();
    const user = users.find(u => u.name === username && u.pwd === password);
    
    if (user) {
        // Store current user and API key
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('apiKey', '88df89421df5889a5d7835fce11b9210b42723b79a8c47ef5940a739b50c33db');
        window.location.href = 'dashboard.html';
    } else {
        alert('Invalid username or password');
    }
});

// Handle signup form submission
document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const password = e.target[1].value;
    const dateOfBirth = e.target[2].value;
    const email = e.target[3].value;
    
    const users = loadUsers();
    
    // Check if username already exists
    if (users.some(user => user.name === username)) {
        alert('Username already exists!');
        return;
    }
    
    // Create new user object
    const newUser = {
        id: users.length + 1,
        name: username,
        pwd: password,
        email: email,
        DOB: dateOfBirth,
        age: calculateAge(dateOfBirth)
    };
    
    // Add new user to users array
    users.push(newUser);
    
    // Save updated users array
    saveUsers(users);
    
    alert('Sign up successful!');
    e.target.reset();
}); 