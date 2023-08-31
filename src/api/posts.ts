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

export async function updatePostPublishedStatus({
  published,
  postId,
}: {
  published: boolean;
  postId: string;
}) {
  const post = await fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}`, {
    method: 'PUT',
    credentials: 'include',
    body: JSON.stringify({ published }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const result = await post.json();

  if (!post.ok) throw new Error(result.message);

  return result;
}

export async function createPost({
  title,
  text,
  published,
}: {
  title: string;
  text: string;
  published: boolean;
}) {
  const post = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({ title, text, published }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const result = await post.json();

  if (!post.ok) throw new Error(result.message);

  return result;
}

export async function deletePost({ postId }: { postId: string }) {
  const post = await fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  const result = await post.json();

  if (!post.ok) throw new Error(result.message);

  return result;
}
