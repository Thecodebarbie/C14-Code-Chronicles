
const commentFormHandler = async (event) => {
  event.preventDefault(); // Prevent default form submission behavior
  
  // Collect values from the comment form
  const comment = document.querySelector('#comment-content').value.trim();

  const post_id = window.location.href.split("/")[4]
  
  if (comment) {
    try {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ comment, post_id }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        // If successful, refresh the page to display the new comment
        location.reload();
      } else {
        // Handle response status other than 200 (OK)
        console.error('Failed to submit comment');
      }
    } catch (error) {
      // Handle fetch error
      console.error('Error submitting comment:', error);
    }
  } else {
    // Handle empty comment content
    alert('Please enter a comment.');
  }
};


const deleteComment = async (commentId) => {
    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Handle success, such as removing the comment from the UI
        console.log('Comment deleted successfully');
        // Optionally, remove the deleted comment from the UI
        const deletedCommentElement = document.querySelector(`[data-comment-id="${commentId}"]`);
        if (deletedCommentElement) {
          deletedCommentElement.remove();
        }
      } else {
        // Handle error
        console.error('Failed to delete comment');
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  // Event listener to handle click on delete comment button
document.addEventListener('click', async (event) => {
    if (event.target.classList.contains('delete-comment-btn')) {
      const commentId = event.target.getAttribute('data-comment-id');
      if (commentId) {
        await deleteComment(commentId);
      }
    }
  });

  document.querySelector('#comment-form').addEventListener('submit', commentFormHandler)