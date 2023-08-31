import { useMutation, useQueryClient } from '@tanstack/react-query';
import CommentForm from './CommentForm';
import moment from 'moment';
import { deletePostComment } from '../api/comments';

export default function Comments({
  comments,
  postId,
}: {
  comments: IComment[];
  postId: string;
}) {
  const queryClient = useQueryClient();
  const deleteCommentMutation = useMutation({
    mutationFn: deletePostComment,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['posts', postId, 'comments'],
      }),
  });

  const handleClick = (commentId: string) => {
    deleteCommentMutation.mutate({
      commentId,
      postId,
    });
  };

  return (
    <div className="comments flex">
      <h2>Comments:</h2>
      {comments.length < 1 ? (
        <p>No comments</p>
      ) : (
        comments.map(({ username, text, createdAt, _id }: IComment) => (
          <div key={_id} className="comment flex">
            <p>{username}:</p>
            <p>{text}</p>
            <p className="posted-at">{moment(createdAt).format('MMM Do YY')}</p>
            <button
              className="delete-comment-btn"
              onClick={() => handleClick(_id)}
            >
              Delete Comment
            </button>
          </div>
        ))
      )}
      <CommentForm />
    </div>
  );
}
