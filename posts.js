let postContainer = document.getElementById('postsContainer');
let loading = document.getElementById('loading');
let limit = 9; // Number of posts to load per request
let page = 1; // Keep track of the page number for pagination

// Fetch posts from JSONPlaceholder API
function fetchPosts() {
    loading.style.display = 'block'; // Show loading spinner
    let url = `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`; // Url with page and number of posts

    fetch(url)
        .then(response => response.json())
        .then(data => {
            loading.style.display = 'none'; // Hide loading spinner
            displayPosts(data);             // Call on display posts function with data
        })
        .catch(error => console.error('Error fetching posts:', error)); // in case of error
}

// Display posts
function displayPosts(posts) {
    posts.forEach(post => {                 // Go through every post
        let postElement = document.createElement('div');    // Create div
        postElement.classList.add('post');                  // Add class post
        postElement.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.body}</p>
        `;      // Fill the post with title and body
        postContainer.appendChild(postElement); // Append to postContainer
    });
}

// Load more posts when the user scrolls to the bottom
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        page++; // Increment page number
        fetchPosts();   // Load more posts
    }
});

// Initial fetch
fetchPosts();