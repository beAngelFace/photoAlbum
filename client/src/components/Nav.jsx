import {NavLink} from 'react-router-dom'

function Nav({user}) {
    return (
        <nav>
            <NavLink to='/'>Домой</NavLink>
            
            {
                user ? 
                <>                    
                    <NavLink to='/auth/logout'>Выход</NavLink>
                </>
                :
                <>
                    <NavLink to='/auth/authorization'>Авторизация</NavLink>
                    <NavLink to='/auth/registration'>Регистрация</NavLink>
                </>
            }

        </nav>
    );
}

export default Nav;