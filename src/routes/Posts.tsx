import { useQuery } from '@tanstack/react-query';
import PostPreview from '../components/PostPreview';
import { getAllPosts } from '../api/posts';

export default function Posts() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['posts'],
    queryFn: getAllPosts,
  });

  if (isLoading) {
    return (
      <main className="main center">
        <h1>Loading...</h1>
      </main>
    );
  }

  if (isError && error instanceof Error) {
    return (
      <main className="main center">
        <h1>Error: {error.message}</h1>
      </main>
    );
  }

  return (
    <main className="posts-list main flex">
      {data.length < 1 ? (
        <h1>No posts</h1>
      ) : (
        data.map((post: IPost) => <PostPreview key={post._id} post={post} />)
      )}
    </main>
  );
}
