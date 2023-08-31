import { useRef, useState, useContext } from 'react';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../api/user';
import { UserContext } from '../context/userContext';
import { Navigate } from 'react-router-dom';

export default function Login() {
  const { user, login } = useContext(UserContext);
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState('');
  const createUserMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (user) => {
      login(user);
      setError('');
    },
    onError: (error: Error) => setError(error.message),
  });

  if (user) return <Navigate to="/" />;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (usernameRef?.current == null || usernameRef.current.value === '') {
      return;
    }

    if (passwordRef?.current == null || passwordRef.current.value === '') {
      return;
    }

    createUserMutation.mutate({
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    });
  };

  return (
    <main className="main flex">
      {error && <h1>{error}</h1>}
      <form className="login-form flex" onSubmit={handleSubmit}>
        <label className="flex" htmlFor="username">
          Username:
          <input
            className="input"
            ref={usernameRef}
            type="text"
            name="username"
            id="username"
            required
          />
        </label>
        <label className="flex" htmlFor="password">
          Password:
          <input
            className="input"
            ref={passwordRef}
            type="text"
            name="password"
            id="password"
            required
          />
        </label>
        <button
          className="login-btn"
          type="submit"
          disabled={createUserMutation.isLoading}
        >
          Login
        </button>
      </form>
    </main>
  );
}
