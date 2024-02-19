import { NavLink } from 'react-router-dom';
import '../styles/nav.css';

const paths = [
  { path: 'cars', text: 'CARS' },
  { path: 'new-rentals', name: 'NEW RENTALS' },
  { path: 'my-rentals', name: 'MY RENTALS' },
  { path: 'add-car', name: 'ADD CAR' },
  { path: 'delete-car', name: 'DELETE CAR' },
];

const NavBar = () => (
  <div className="border-r h-screen w-auto pt-[100px]">
    <aside>
      <ul className="space-y-2 font-medium items-start flex flex-col ml-3 gap-2">
        {paths.map((link) => (
          <li key={link.text} className={`pl-5 active:bg-color-green active:text-white hover:bg-color-green hover:text-white h-[40px] flex items-center w-full pr-5 font-bold ${({ isActive }) => (isActive ? 'active' : '')}`}>
            <NavLink
              to={link.path}
            >
              {link.text}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  </div>
);

export default NavBar;
