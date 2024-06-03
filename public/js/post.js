// Global variable to store comments
let cachedComments = {};

// Function to fetch comments for a specific post
const fetchComments = async () => {
  try {
    // Get post ID from URL
    const postId = window.location.pathname.split('/').pop();
    
    // Check if comments are already cached
    if (cachedComments[postId]) {
      renderComments(cachedComments[postId]); // Render comments from cache
      return;
    }

    // Fetch comments from the server
    const response = await fetch(`/api/posts/${postId}/comments`);
    if (response.ok) {
      const comments = await response.json();
      cachedComments[postId] = comments; // Update cache with fetched comments
      renderComments(comments); // Render comments
    } else {
      console.error('Failed to fetch comments');
    }
  } catch (error) {
    console.error('Error fetching comments:', error);
  }
};

// Call fetchComments function when the page loads
fetchComments();
