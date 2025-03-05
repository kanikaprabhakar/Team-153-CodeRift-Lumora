document.addEventListener("DOMContentLoaded", async () => {
    if (document.getElementById("posts")) {
        const response = await fetch("/api/posts");
        const posts = await response.json();
        document.getElementById("posts").innerHTML = posts.map(post => `<p>${post.content}</p>`).join("");
    }
});
