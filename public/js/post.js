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