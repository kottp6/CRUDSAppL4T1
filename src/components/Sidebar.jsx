import { NavLink } from 'react-router-dom';


export default function Sidebar() {
  return (
   <div>
      <nav>
        <ul >
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? 'active-link' : ''}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" className={({ isActive }) => isActive ? 'active-link' : ''}>
              Products
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
