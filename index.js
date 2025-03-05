const express = require("express");
const session = require('express-session');
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: true }));
app.use(cors());

const PORT = 3001;

const usersFile = path.join(__dirname, "users.json");
const bookingsFile = path.join(__dirname, "bookings.json");

// Helper functions to read and write users
const readUsers = () => {
    if (!fs.existsSync(usersFile)) return [];
    const data = fs.readFileSync(usersFile, "utf8");
    return JSON.parse(data);
};

const writeUsers = (users) => {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), "utf8");
};

// Helper functions to read and write bookings
const readBookings = () => {
    if (!fs.existsSync(bookingsFile)) return [];
    const data = fs.readFileSync(bookingsFile, "utf8");
    return JSON.parse(data);
};

const writeBookings = (bookings) => {
    fs.writeFileSync(bookingsFile, JSON.stringify(bookings, null, 2), "utf8");
};

// Sample list of therapists (you can expand this)
const therapists = [
    { id: 1, name: "Dr. John Doe", specialization: "Anxiety and Depression", available: true },
    { id: 2, name: "Dr. Jane Smith", specialization: "Stress Management", available: true },
    { id: 3, name: "Dr. Emily Brown", specialization: "Trauma and PTSD", available: false },
];

// Middleware to check if the user is logged in
const isLoggedIn = (req, res, next) => {
    if (req.session.user) {
        next(); // User is logged in, proceed to the next middleware/route
    } else {
        res.status(401).json({ message: "Unauthorized: Please log in first." });
    }
};

// Route to get the list of therapists
app.get("/therapists", isLoggedIn, (req, res) => {
    res.json(therapists);
});

// Route to book a therapist
app.post("/book-therapist", isLoggedIn, (req, res) => {
    const { therapistId, date, time } = req.body;
    const username = req.session.user.username; // Get username from session

    if (!therapistId || !date || !time) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const therapist = therapists.find(t => t.id === therapistId);
    if (!therapist) {
        return res.status(404).json({ message: "Therapist not found" });
    }

    if (!therapist.available) {
        return res.status(400).json({ message: "Therapist is not available" });
    }

    const bookings = readBookings();
    const newBooking = {
        id: bookings.length + 1,
        therapistId,
        username,
        date,
        time,
        status: "Upcoming"
    };

    bookings.push(newBooking);
    writeBookings(bookings);

    res.json({ message: "Booking successful", booking: newBooking });
});

// Route to get past and upcoming bookings for a user
app.get("/user-bookings", isLoggedIn, (req, res) => {
    const username = req.session.user.username; // Get username from session
    const bookings = readBookings();

    const userBookings = bookings.filter(booking => booking.username === username);
    const pastBookings = userBookings.filter(booking => new Date(booking.date) < new Date());
    const upcomingBookings = userBookings.filter(booking => new Date(booking.date) >= new Date());

    res.json({ pastBookings, upcomingBookings });
});

// Route to get user profile information
app.get("/getUserProfile", isLoggedIn, (req, res) => {
    if (req.session.user) {
        res.json({ username: req.session.user.username });
    } else {
        res.json({});
    }
});

// Route to handle user login
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const users = readUsers();

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    const user = users.find((u) => u.username === username);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    if (user.password !== password) {
        return res.status(401).json({ message: "Incorrect password" });
    }

    // Store user information in session
    req.session.user = { username: user.username, email: user.email };

    // Redirect to landing page
    res.json({ message: "Login successful", redirectUrl: "/landing.html" });
});

// Route to handle user signup
app.post("/signup", (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const users = readUsers();
    const existingUser = users.find((u) => u.username === username || u.email === email);

    if (existingUser) {
        return res.status(409).json({ message: "Username or email already exists" });
    }

    users.push({ username, email, password });
    writeUsers(users);

    return res.json({ message: "User registered successfully" });
});

// Route to handle user logout
app.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: "Could not log out, please try again" });
        }
        res.redirect("/login.html");
    });
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});