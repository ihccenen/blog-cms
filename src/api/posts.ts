export async function getAllPosts() {
  const allPosts = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
    credentials: 'include',
  });

  const result = await allPosts.json();

  if (!allPosts.ok) throw new Error(result.message);

  return result;
}

export async function getSinglePost(postId: string) {
  const post = await fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}`, {
    credentials: 'include',
  });

  const result = await post.json();

  if (!post.ok) throw new Error(result.message);

  return result;
}
