export async function loginUser({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const user = await fetch(`${import.meta.env.VITE_API_URL}/users/auth`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  const result = await user.json();

  if (!user.ok) throw new Error(result.message);

  return result;
}

export async function logoutUser() {
  const user = await fetch(`${import.meta.env.VITE_API_URL}/users/logout`, {
    method: 'POST',
    credentials: 'include',
  });

  const result = await user.json();

  if (!user.ok) throw new Error(result.message);

  return result;
}
