import logo from '../assets/logo-prim.svg';
import { Link } from 'react-router-dom';

type Props = {};

export default function Navbar({}: Props) {
  return (
    <nav className="w-full bg-customdark text-white flex justify-between py-3 items-center border-b-primary border-b-2 px-2 sm:px-4 lg:px-6">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="w-[64px] mr-1" />
        <p className="font-semibold font-sans text-3xl text-blue">Boxes</p>
      </div>

      <ul className="flex gap-3 justify-between items-center">
        <li><Link to="">Main</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
  );
}