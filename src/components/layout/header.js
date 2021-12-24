import React from 'react';

// Importar reactRouterDom
import {useNavigate} from 'react-router-dom';


const Header = () => {
    // Hook para redireccionar
    const navigate = useNavigate();

    const closedSession = () => {
        localStorage.removeItem('token-user');

        navigate('/')
    }

    return ( 
        <>
         
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <div className="container">
                        
                        <a className="navbar-brand" href="#">
                            LOGO</a>
                        <div className="d-flex ">
                            <div className="collapse navbar-collapse " id="navbarSupportedContent">
                                <span className="navbar-text text-white">Luis Gomez</span>
                                <ul className="navbar-nav me-auto ">
                  
                                    <li className="nav-item dropdown ">
                                        <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Perfil
                                        </a>
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                            <li><a className="dropdown-item" href="#">Editar</a></li>
                                            <li><a className="dropdown-item" onClick={() =>closedSession()}>Cerrar</a></li>
                                        
                                        </ul>
                                
                                    </li>
                                </ul>
                            </div>
                        </div>     
                    </div>
                </nav>
           
            
        </>
     );
}
 
export default Header;