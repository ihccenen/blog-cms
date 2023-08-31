import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import { createComment } from '../api/comments';
import { useParams } from 'react-router-dom';

export default function CommentForm() {
  const { postId = '' } = useParams();
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  const queryClient = useQueryClient();
  const createCommentMutation = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries(['posts', postId, 'comments'], {
        exact: true,
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (usernameRef?.current == null || usernameRef.current.value === '') {
      return;
    }

    if (textRef?.current == null || textRef.current.value === '') {
      return;
    }

    createCommentMutation.mutate({
      username: usernameRef.current.value,
      text: textRef.current.value,
      postId,
    });

    usernameRef.current.value = '';
    textRef.current.value = '';
  };

  return (
    <form className="comment-form flex" onSubmit={handleSubmit}>
      <label className="flex" htmlFor="username">
        Username:
        <input
          className="input"
          ref={usernameRef}
          type="text"
          name="username"
          id="username"
          required
        />
      </label>
      <label className="flex" htmlFor="text">
        Text:
        <textarea
          className="textarea"
          ref={textRef}
          name="text"
          id="text"
          required
        ></textarea>
      </label>
      <button
        className="send-btn"
        type="submit"
        disabled={createCommentMutation.isLoading}
      >
        {createCommentMutation.isLoading ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
}
