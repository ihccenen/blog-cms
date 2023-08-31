import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import {
  deletePost,
  getSinglePost,
  updatePostPublishedStatus,
} from '../api/posts';
import { getPostComments } from '../api/comments';
import Comments from './Comments';
import moment from 'moment';

export default function Post() {
  const { postId = '' } = useParams();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const postQuery = useQuery({
    queryKey: ['posts', postId],
    queryFn: () => getSinglePost(postId),
  });

  const commentsQuery = useQuery({
    queryKey: ['posts', postId, 'comments'],
    queryFn: () => getPostComments(postId),
  });

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
      published: !postQuery.data.published,
      postId: postQuery.data._id,
    });
  };

  const handleDeleteClick = () => {
    postDeleteMutation.mutate({
      postId: postQuery.data._id,
    });
    navigate('/');
  };

  if (postQuery.isLoading) {
    return (
      <main className="main center">
        <h1>Loading...</h1>
      </main>
    );
  }

  if (postQuery.isError && postQuery.error instanceof Error) {
    return (
      <main className="main center">
        <h1>Error: {postQuery.error.message}</h1>
      </main>
    );
  }

  return (
    <main className="main flex">
      <div
        className={`${
          postQuery.data.published ? 'published' : 'unpublished'
        } post-wrapper`}
      >
        <div className="post-top-wrapper flex">
          <div className="flex">
            <h1>{postQuery.data.title}</h1>
            <p>Posted by: {postQuery.data.user.username}</p>
          </div>

          <div className="flex">
            <button
              className={`published-status-btn ${
                postQuery.data.published ? 'unpublish-btn' : 'publish-btn'
              }`}
              type="button"
              onClick={handlePublishClick}
              disabled={postPublishedMutation.isLoading}
            >
              {postQuery.data.published ? 'Unpublish' : 'Publish'} Post
            </button>

            <button
              className="delete-post-btn"
              type="button"
              onClick={handleDeleteClick}
              disabled={postDeleteMutation.isLoading}
            >
              Delete Post
            </button>
          </div>
        </div>
        <div className="post-text">
          <p>{postQuery.data.text}</p>
        </div>
        <div className="posted-at">
          <p>{moment(postQuery.data.updatedAt).format('MMM Do YY')}</p>
        </div>
      </div>
      {commentsQuery.isLoading ? (
        <p>Loading Comments</p>
      ) : commentsQuery.isError && commentsQuery.error instanceof Error ? (
        <p>{commentsQuery.error.message}</p>
      ) : (
        <Comments comments={commentsQuery.data} postId={postId}/>
      )}
    </main>
  );
}
