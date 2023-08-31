import CommentForm from './CommentForm';
import moment from 'moment';

export default function Comments({ comments }: { comments: IComment[] }) {
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
          </div>
        ))
      )}
      <CommentForm />
    </div>
  );
}
