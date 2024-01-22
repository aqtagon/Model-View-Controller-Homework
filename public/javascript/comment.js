async function handleCommentSubmission(event) {
    event.preventDefault();

    const commentInput = document
        .querySelector('textarea[name="comment-body"]')
        .value.trim();

        const postId = window.location.toString().split('/')[
            window.location.toString().split('/').length - 1
        ];