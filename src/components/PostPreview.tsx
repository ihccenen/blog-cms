import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import { deletePost, updatePostPublishedStatus } from '../api/posts';

export default function PostPreview({ post }: { post: IPost }) {
  const queryClient = useQueryClient();
  const postPublishedMutation = useMutation({
    mutationFn: updatePostPublishedStatus,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
  });
  const postDeleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
  });

  const handlePublishClick = () => {
    postPublishedMutation.mutate({
      published: !post.published,
      postId: post._id,
    });
  };

  const handleDeleteClick = () => {
    postDeleteMutation.mutate({
      postId: post._id,
    });
  };

  return (
    <div
      className={`${
        post.published ? 'published' : 'unpublished'
      } post-wrapper flex`}
    >
      <div className="post-top-wrapper flex">
        <div className="flex">
          <h2>
            <Link to={`/posts/${post._id}`}>{post.title}</Link>
          </h2>
          <p>Posted by: {post.user.username}</p>
        </div>

        <div className="flex">
          <button
            className={`published-status-btn ${
              post.published ? 'unpublish-btn' : 'publish-btn'
            }`}
            type="button"
            onClick={handlePublishClick}
            disabled={postPublishedMutation.isLoading}
          >
            {post.published ? 'Unpublish' : 'Publish'} Post
          </button>
        </div>
      </div>
      <div className="post-text">
        <p>
          {post.text.length > 100 ? (
            <>
              {post.text.slice(0, 100)}...{' '}
              <Link to={`posts/${post._id}`}>Read More</Link>
            </>
          ) : (
            <>{post.text}</>
          )}
        </p>
      </div>
      <div className="post-bottom-wrapper flex">
        <button
          className="delete-post-btn"
          type="button"
          onClick={handleDeleteClick}
          disabled={postDeleteMutation.isLoading}
        >
          Delete Post
        </button>
        <div>
          <p>{moment(post.updatedAt).format('MMM Do YY')}</p>
        </div>
      </div>
    </div>
  );
}
