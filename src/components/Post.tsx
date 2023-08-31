import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getSinglePost } from '../api/posts';
import { getPostComments } from '../api/comments';
import Comments from './Comments';
import moment from 'moment';

export default function Post() {
  const { postId = '' } = useParams();

  const postQuery = useQuery({
    queryKey: ['posts', postId],
    queryFn: () => getSinglePost(postId),
  });

  const commentsQuery = useQuery({
    queryKey: ['posts', postId, 'comments'],
    queryFn: () => getPostComments(postId),
  });

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
      <div className="post-wrapper">
        <h1>{postQuery.data.title}</h1>
        <div className="post-text">
          <p>{postQuery.data.text}</p>
        </div>
        <div className="posted-at">
          <p>{moment(postQuery.data.createdAt).format('MMM Do YY')}</p>
        </div>
      </div>
      {commentsQuery.isLoading ? (
        <p>Loading Comments</p>
      ) : commentsQuery.isError && commentsQuery.error instanceof Error ? (
        <p>{commentsQuery.error.message}</p>
      ) : (
        <Comments comments={commentsQuery.data} />
      )}
    </main>
  );
}
