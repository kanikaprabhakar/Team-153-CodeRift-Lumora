document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();

    // Get username from the URL query parameter
    const username = urlParams.get('username');

    if (!username) {
        window.location.href = "login.html"; // Redirect to login if username is not provided
    }

    // Display username in the header
    document.getElementById('username').textContent = username;

    // Fetch and display user bookings
    fetch(`/user-bookings/${username}`)
        .then(response => response.json())
        .then(data => {
            const pastBookingsList = document.getElementById('pastBookingsList');
            const upcomingBookingsList = document.getElementById('upcomingBookingsList');

            // Display past bookings
            pastBookingsList.innerHTML = data.pastBookings.map(booking => `
                <div class="booking-card">
                    <h3>Booking ID: ${booking.id}</h3>
                    <p>Therapist ID: ${booking.therapistId}</p>
                    <p>Date: ${booking.date}</p>
                    <p>Time: ${booking.time}</p>
                    <p>Status: ${booking.status}</p>
                </div>
            `).join('');

            // Display upcoming bookings
            upcomingBookingsList.innerHTML = data.upcomingBookings.map(booking => `
                <div class="booking-card">
                    <h3>Booking ID: ${booking.id}</h3>
                    <p>Therapist ID: ${booking.therapistId}</p>
                    <p>Date: ${booking.date}</p>
                    <p>Time: ${booking.time}</p>
                    <p>Status: ${booking.status}</p>
                </div>
            `).join('');
        })
        .catch(error => {
            console.error("Error fetching bookings:", error);
            alert("Failed to fetch bookings. Please try again.");
        });

    // Add event listener for therapist booking link
    document.getElementById('therapistBookingLink').addEventListener('click', () => {
        fetch(`/user-bookings/${username}`)
            .then(response => response.json())
            .then(data => {
                const bookingsList = document.getElementById('bookingsList');
                bookingsList.innerHTML = `
                    <h2>Your Bookings</h2>
                    <div class="booking-buttons">
                        <button id="pastBookingsBtn" class="btn btn-outline">Past Bookings</button>
                        <button id="upcomingBookingsBtn" class="btn btn-outline">Upcoming Appointments</button>
                    </div>
                    <div id="pastBookingsList" class="bookings-list"></div>
                    <div id="upcomingBookingsList" class="bookings-list"></div>
                `;

                // Display past bookings
                document.getElementById('pastBookingsList').innerHTML = data.pastBookings.map(booking => `
                    <div class="booking-card">
                        <h3>Booking ID: ${booking.id}</h3>
                        <p>Therapist ID: ${booking.therapistId}</p>
                        <p>Date: ${booking.date}</p>
                        <p>Time: ${booking.time}</p>
                        <p>Status: ${booking.status}</p>
                    </div>
                `).join('');

                // Display upcoming bookings
                document.getElementById('upcomingBookingsList').innerHTML = data.upcomingBookings.map(booking => `
                    <div class="booking-card">
                        <h3>Booking ID: ${booking.id}</h3>
                        <p>Therapist ID: ${booking.therapistId}</p>
                        <p>Date: ${booking.date}</p>
                        <p>Time: ${booking.time}</p>
                        <p>Status: ${booking.status}</p>
                    </div>
                `).join('');
            })
            .catch(error => {
                console.error("Error fetching bookings:", error);
                alert("Failed to fetch bookings. Please try again.");
            });
    });

    // Logout functionality
    document.getElementById('logoutBtn').addEventListener('click', () => {
        fetch('/logout')
            .then(() => {
                window.location.href = "login.html"; // Redirect to login page after logout
            })
            // .catch(error => {
            //     console.error("Error logging out:", error);
            //     alert("Failed to log out. Please try again.");
            // });
    });
});



document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();

    // Get username from the URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');

    if (username) {
        // Hide the login/signup button
        document.getElementById('loginBtn').style.display = 'none';

        // Show the user profile section
        const userProfile = document.getElementById('userProfile');
        userProfile.style.display = 'flex';
        document.getElementById('username').textContent = username;

        // Fetch and display user bookings
        fetch(`/user-bookings/${username}`)
            .then(response => response.json())
            .then(data => {
                const pastBookingsList = document.getElementById('pastBookingsList');
                const upcomingBookingsList = document.getElementById('upcomingBookingsList');

                // Display past bookings
                pastBookingsList.innerHTML = data.pastBookings.map(booking => `
                    <div class="booking-card">
                        <h3>Booking ID: ${booking.id}</h3>
                        <p>Therapist ID: ${booking.therapistId}</p>
                        <p>Date: ${booking.date}</p>
                        <p>Time: ${booking.time}</p>
                        <p>Status: ${booking.status}</p>
                    </div>
                `).join('');

                // Display upcoming bookings
                upcomingBookingsList.innerHTML = data.upcomingBookings.map(booking => `
                    <div class="booking-card">
                        <h3>Booking ID: ${booking.id}</h3>
                        <p>Therapist ID: ${booking.therapistId}</p>
                        <p>Date: ${booking.date}</p>
                        <p>Time: ${booking.time}</p>
                        <p>Status: ${booking.status}</p>
                    </div>
                `).join('');
            })
            // .catch(error => {
            //     console.error("Error fetching bookings:", error);
            //     alert("Failed to fetch bookings. Please try again.");
            // });
    } else {
        // Redirect to login if username is not provided
        window.location.href = "login.html";
    }

    // Add event listener for therapist booking link
    document.getElementById('therapistBookingLink').addEventListener('click', () => {
        fetch(`/user-bookings/${username}`)
            .then(response => response.json())
            .then(data => {
                const bookingsList = document.getElementById('bookingsList');
                bookingsList.innerHTML = `
                    <h2>Your Bookings</h2>
                    <div class="booking-buttons">
                        <button id="pastBookingsBtn" class="btn btn-outline">Past Bookings</button>
                        <button id="upcomingBookingsBtn" class="btn btn-outline">Upcoming Appointments</button>
                    </div>
                    <div id="pastBookingsList" class="bookings-list"></div>
                    <div id="upcomingBookingsList" class="bookings-list"></div>
                `;

                // Display past bookings
                document.getElementById('pastBookingsList').innerHTML = data.pastBookings.map(booking => `
                    <div class="booking-card">
                        <h3>Booking ID: ${booking.id}</h3>
                        <p>Therapist ID: ${booking.therapistId}</p>
                        <p>Date: ${booking.date}</p>
                        <p>Time: ${booking.time}</p>
                        <p>Status: ${booking.status}</p>
                    </div>
                `).join('');

                // Display upcoming bookings
                document.getElementById('upcomingBookingsList').innerHTML = data.upcomingBookings.map(booking => `
                    <div class="booking-card">
                        <h3>Booking ID: ${booking.id}</h3>
                        <p>Therapist ID: ${booking.therapistId}</p>
                        <p>Date: ${booking.date}</p>
                        <p>Time: ${booking.time}</p>
                        <p>Status: ${booking.status}</p>
                    </div>
                `).join('');
            })
            // .catch(error => {
            //     console.error("Error fetching bookings:", error);
            //     alert("Failed to fetch bookings. Please try again.");
            // });
    });

    // Logout functionality
    document.getElementById('logoutBtn').addEventListener('click', () => {
        fetch('/logout')
            .then(() => {
                window.location.href = "login.html"; // Redirect to login page after logout
            })
            .catch(error => {
                console.error("Error logging out:", error);
                alert("Failed to log out. Please try again.");
            });
    });
});
// In your login.js or wherever the login logic is handled
function handleLogin(username) {
    sessionStorage.setItem("username", username);
    window.location.href = "landing.html"; // Redirect to landing page after login
}