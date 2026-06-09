document.addEventListener("DOMContentLoaded", function() {
  const container = document.getElementById('recent-posts-container');
  
  if(container) {
    // Fetches the latest 2 posts directly from your Blogger backend
    fetch('https://uchchhas.blogspot.com/feeds/posts/default?alt=json&max-results=2')
      .then(response => response.json())
      .then(data => {
        const feed = data.feed;
        const posts = feed.entry || [];
        let html = '';
        
        if(posts.length === 0) {
          container.innerHTML = '<p style="text-align:center;">No previous posts found.</p>';
          return;
        }

        posts.forEach(post => {
          const title = post.title.$t;
          let link = '#';
          for(let i=0; i<post.link.length; i++) {
            if(post.link[i].rel === 'alternate') {
              link = post.link[i].href;
              break;
            }
          }
          
          const dateObj = new Date(post.published.$t);
          const dateString = dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
          
          html += `
            <a href="${link}" class="blog-list-item" target="_blank">
              <div class="blog-meta"><i class="fa-regular fa-calendar" style="margin-right:5px;"></i> ${dateString}</div>
              <h3 style="font-size: 1.3rem; color: var(--dark); margin-bottom: 10px;">${title}</h3>
              <div class="read-more" style="font-size: 0.9rem; color: var(--primary); font-weight: 600; display: flex; align-items: center; gap: 5px;">Read Post <i class="fa-solid fa-arrow-right"></i></div>
            </a>
          `;
        });
        container.innerHTML = html;
      })
      .catch(err => {
        console.error('Error fetching posts:', err);
        container.innerHTML = '<p style="text-align:center; color:red;">Error loading posts.</p>';
      });
  }
});

/* Security & Protection Blocks */
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

document.addEventListener('keydown', (e) => {
    // Blocks F12, Ctrl+Shift+I, and Ctrl+U
    if (e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && e.key === 'I') || 
        (e.ctrlKey && e.key === 'u')) {
        e.preventDefault();
    }
});
