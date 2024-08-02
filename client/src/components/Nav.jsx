import { NavLink } from 'react-router-dom';
import './Nav.css'; // Импорт CSS-файла

function Nav({ user }) {
  return (
    <nav>
      <NavLink to='/' className={({ isActive }) => (isActive ? 'active' : '')}>Домой</NavLink>
      {
        user ? 
        <>                    
          <NavLink to='/auth/logout' className={({ isActive }) => (isActive ? 'active' : '')}>Выход</NavLink>
        </>
        :
        <>
          <NavLink to='/auth/authorization' className={({ isActive }) => (isActive ? 'active' : '')}>Авторизация</NavLink>
          <NavLink to='/auth/registration' className={({ isActive }) => (isActive ? 'active' : '')}>Регистрация</NavLink>
        </>
      }
    </nav>
  );
}

export default Nav;
