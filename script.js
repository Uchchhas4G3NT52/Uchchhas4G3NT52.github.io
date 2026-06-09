document.addEventListener("DOMContentLoaded", () => {
    // URL pointing to your hidden Blogger backend API
    const blogUrl = "https://uchchhas.blogspot.com/feeds/posts/default?alt=json&max-results=2";

    fetch(blogUrl)
        .then(response => response.json())
        .then(data => {
            const feedContainer = document.getElementById('blog-feed');
            const posts = data.feed.entry;
            
            if (posts && posts.length > 0) {
                posts.forEach(post => {
                    // Extract data from the Blogger JSON response
                    const title = post.title.$t;
                    let link = "#";
                    
                    // Find the actual URL link for the post
                    for (let i = 0; i < post.link.length; i++) {
                        if (post.link[i].rel === 'alternate') {
                            link = post.link[i].href;
                            break;
                        }
                    }

                    // Extract snippet/summary if available
                    let snippet = "";
                    if (post.summary) {
                        snippet = post.summary.$t.substring(0, 120) + "...";
                    } else if (post.content) {
                        // Strip HTML tags for clean text preview
                        let tempDiv = document.createElement("div");
                        tempDiv.innerHTML = post.content.$t;
                        snippet = tempDiv.textContent.substring(0, 120) + "...";
                    }

                    // Construct the HTML card and inject it
                    const postHTML = `
                        <div class="card project-card">
                            <h3>${title}</h3>
                            <p>${snippet}</p>
                            <a href="${link}" target="_blank" class="read-more-link">Read Article</a>
                        </div>
                    `;
                    feedContainer.innerHTML += postHTML;
                });
            } else {
                feedContainer.innerHTML = "<p>No recent articles found.</p>";
            }
        })
        .catch(error => {
            console.error('Error loading posts:', error);
            document.getElementById('blog-feed').innerHTML = "<p>Error loading articles. Please check your connection.</p>";
        });
});