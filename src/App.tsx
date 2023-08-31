import { Outlet } from 'react-router-dom';
import Header from './components/Header';

export default function App() {
  return (
    <main>
      <Header />
      <Outlet />
    </main>
  );
}
