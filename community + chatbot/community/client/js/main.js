document.addEventListener("DOMContentLoaded", async () => {
    // Only fetch posts if we're on the posts page
    if (document.getElementById("posts")) {
      try {
        const response = await fetch("/api/posts")
  
        if (!response.ok) {
          throw new Error("Failed to fetch posts")
        }
  
        const posts = await response.json()
        const postsContainer = document.getElementById("posts")
  
        // Remove loading indicator
        postsContainer.innerHTML = ""
  
        if (posts.length === 0) {
          postsContainer.innerHTML = `
                      <div class="empty-state card">
                          <p>No posts yet. Be the first to share your thoughts!</p>
                          <a href="create-post.html" class="btn-primary">Create Post</a>
                      </div>
                  `
          return
        }
  
        // Sort posts by date (newest first)
        posts.sort((a, b) => new Date(b.date) - new Date(a.date))
  
        // Render each post
        posts.forEach((post) => {
          const postDate = new Date(post.date)
          const formattedDate = postDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
  
          const postElement = document.createElement("div")
          postElement.className = "post card"
          postElement.innerHTML = `
                      <p>${post.content}</p>
                      <div class="post-meta">Posted on ${formattedDate}</div>
                  `
  
          postsContainer.appendChild(postElement)
        })
      } catch (error) {
        console.error("Error fetching posts:", error)
        document.getElementById("posts").innerHTML = `
                  <div class="error-message card">
                      <p>Failed to load posts. Please try again later.</p>
                  </div>
              `
      }
    }
  })
  
  