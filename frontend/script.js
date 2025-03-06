document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".problem-card");
    const form = document.getElementById("mentalHealthForm");
    const solutionContainer = document.getElementById("solutionContainer");

    // here we handle the card selection
    cards.forEach(card => {
        card.addEventListener("click", function () {
            if (this.classList.contains("selected")) {
                this.classList.remove("selected"); // Deselect if clicked again
            } else {
                const selectedCards = document.querySelectorAll(".problem-card.selected");
                if (selectedCards.length < 5) {
                    this.classList.add("selected"); // Select if within limit
                } else {
                    alert("You can select a maximum of 5 issues.");
                }
            }
        });
    });

    // here we handle form submission
    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const selectedProblems = Array.from(document.querySelectorAll(".problem-card.selected"))
            .map(card => card.getAttribute("data-value")); // Get selected problem values

        if (selectedProblems.length < 2 || selectedProblems.length > 5) {
            alert("Please select between 2 to 5 issues.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/get-solutions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ problems: selectedProblems }),
            });

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();

            // Format and display AI solutions
            solutionContainer.innerHTML = formatSolutions(data.solutions[0]);

        } catch (error) {
            console.error("Error fetching AI response:", error);
            solutionContainer.innerHTML = `<p style="color:red;">AI service unavailable. ${error.message}</p>`;
        }
    });

    // Function to format AI response properly
    function formatSolutions(text) {
        return text
            .replace(/\*\*(.*?)\*\*/g, "<h3>$1</h3>") // Convert **Headings** to <h3>
            .replace(/\n\* (.*?)\n/g, "<li>$1</li>") // Ensure bullet points align correctly
            .replace(/\n\n/g, "<br><br>") // Add spacing for readability
            .replace(/<li>(.*?)<\/li>/g, "<ul><li>$1</li></ul>"); // Wrap in <ul> for proper indentation
    }
});
