export async function getPostComments(postId: string) {
  const post = await fetch(
    `${import.meta.env.VITE_API_URL}/posts/${postId}/comments`,
    { credentials: 'include' }
  );

  const result = await post.json();

  if (!post.ok) throw new Error(result.message);

  return result;
}

export async function createComment({
  username,
  text,
  postId,
}: {
  username: string;
  text: string;
  postId: string;
}) {
  const comment = await fetch(
    `${import.meta.env.VITE_API_URL}/posts/${postId}/comments`,
    {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, text }),
    }
  );

  const result = await comment.json();

  if (!comment.ok) throw new Error(result.message);

  return result;
}
