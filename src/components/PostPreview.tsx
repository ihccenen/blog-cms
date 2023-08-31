import { Link } from 'react-router-dom';
import moment from 'moment';

export default function PostPreview({ post }: { post: IPost }) {
  return (
    <div className="post-wrapper flex">
      <div className="flex">
        <h2>
          <Link to={`/posts/${post._id}`}>{post.title}</Link>
        </h2>
        <p>Posted by: {post.user.username}</p>
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
      <div className="posted-at">
        <p>{moment(post.createdAt).format('MMM Do YY')}</p>
      </div>
    </div>
  );
}
