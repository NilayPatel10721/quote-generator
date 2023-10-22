const apiUrl = "https://api.quotable.io/random";

        // Function to fetch a random quote
        async function fetchRandomQuote() {
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error(`Failed to fetch data from ${apiUrl}`);
                }

                const data = await response.json();
                return {
                    content: data.content,
                    author: data.author,
                };
            } catch (error) {
                console.error(error);
                return { content: "An error occurred while fetching the quote.", author: "" };
            }
        }

        // Function to display the fetched quote
        async function displayRandomQuote() {
            const quoteText = document.getElementById("quote-text");
            const authorSpan = document.getElementById("author");
            const tweetButton = document.getElementById("tweet");

            quoteText.textContent = "Loading...";
            authorSpan.textContent = "";

            const quote = await fetchRandomQuote();

            quoteText.textContent = `"${quote.content}"`;
            authorSpan.textContent = `- ${quote.author}`;

            // Update the tweet button's link
            tweetButton.setAttribute("href", `https://twitter.com/intent/tweet?text="${quote.content}" - ${quote.author}`);
        }

        // Attach a click event listener to the "New Quote" button
        document.getElementById("new-quote").addEventListener("click", displayRandomQuote);

        // Display an initial random quote
        displayRandomQuote();


        function tweetQuote() {
            const quoteText = document.getElementById("quote-text").textContent;
            const author = document.getElementById("author").textContent;
            const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(quoteText + author)}`;
            window.open(tweetUrl, "_blank");
        }
        