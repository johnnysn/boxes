import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
import BoxesProvider from './context/boxes-context';

export default function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="px-2 sm:px-4 lg:px-6 py-4 flex justify-center">
        <div className="w-full max-w-screen-lg">
          <BoxesProvider>
            <Outlet />
          </BoxesProvider>
        </div>
      </main>
    </>
  );
}
