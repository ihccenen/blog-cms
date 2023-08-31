import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { UserContextProvider } from './context/userContext';
import App from './App';
import ErrorPage from './routes/ErrorPage';
import Posts from './routes/Posts';
import Post from './components/Post';
import Login from './routes/Login';
import './index.css';
import PrivateRoute from './components/PrivateRoute';
import NewPost from './routes/NewPost';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: <Posts />,
          },
        ],
      },
      {
        path: '/posts/:postId',
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: <Post />,
          },
        ],
      },
      {
        path: '/new-post',
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: <NewPost />,
          },
        ],
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserContextProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </UserContextProvider>
  </React.StrictMode>
);
