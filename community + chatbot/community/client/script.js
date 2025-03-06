const API_URL = "http://localhost:5000/api/posts";  // Backend URL

// Fetch and display posts on page load
document.addEventListener("DOMContentLoaded", fetchPosts);

function fetchPosts() {
    fetch(API_URL)
        .then(response => response.json())
        .then(posts => {
            const postList = document.getElementById("postList");
            postList.innerHTML = posts.length === 0 ? "<p>No posts yet.</p>" : "";

            posts.forEach(post => {
                const postDiv = document.createElement("div");
                postDiv.classList.add("post");
                postDiv.textContent = post.content;
                postList.appendChild(postDiv);
            });
        })
        .catch(error => console.error("Error fetching posts:", error));
}

// Add a new post
function addPost() {
    const content = document.getElementById("postContent").value.trim();
    if (content === "") return;

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
    })
    .then(response => response.json())
    .then(() => {
        document.getElementById("postContent").value = "";
        fetchPosts();  // Refresh posts
    })
    .catch(error => console.error("Error adding post:", error));
}
