document.getElementById("postForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const postContent = document.getElementById("postContent").value;

    const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: postContent }),
    });

    if (response.ok) {
        document.getElementById("message").innerText = "Post submitted!";
        document.getElementById("postForm").reset();
    } else {
        document.getElementById("message").innerText = "Failed to submit post.";
    }
});
