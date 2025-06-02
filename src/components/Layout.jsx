import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function Layout() {
  return (
   <div className="app-container">
      <div className="navbar"><Navbar /></div>
      <div className="main-content">
        <div className="sidebar">
            <Sidebar />
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
