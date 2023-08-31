import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/userContext';

export default function Navbar() {
  const { user, logout } = useContext(UserContext);

  const handleClick = () => {
    logout();
  };

  return (
    <header className="header flex">
      <Link to="/">Home</Link>
      {user && (
        <>
          <Link to="/new-post">New Post</Link>
          <button className="logout-btn" type="button" onClick={handleClick}>
            Logout
          </button>
        </>
      )}
    </header>
  );
}
