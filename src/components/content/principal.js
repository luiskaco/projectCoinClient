import React, {useState} from 'react';

import Header from '../layout/header'


// import TableCell from '../content/partials/cell'

// Importar reactRouterDom
import {useNavigate} from 'react-router-dom';

// axios
import clientAxios from '../../config/axios'
import tokenAuth from '../../config/axiosAuth';


const Principal =  () => {

    // useEffect(() => {
    //     autheUser()
    // }, [])


    // Consta de estado
    const countryList = ['Otros', 'Lima','Bogota','Caracas','Buenos Aires']

    // Estate de valores
    const [listUser, setUser] = useState({});

    // Hook para redireccionar
    const navigate = useNavigate();

    const autheUser =  () => {
        try {
            const token = localStorage.getItem('token-user')

            // console.log(token)
            if(!token){
                // Redireccionar
                navigate('/')
            }else{
                tokenAuth(token);
            }

        } catch (error) {
            console.log(error)
        }  
    } 

    const queryData = async () => {
        const {data} = await clientAxios.get('/api/usuario');

        if(data){
            setUser(data.data)
        }
       
    }
 
    autheUser();
    queryData();

    return ( 
        <>
            <Header />
            
            <div className='container'>
                <div className='row justify-content-center mt-3 '>
                    {/* <div className='col-2 shadow'>
                        <div className='row vh-100 '>
                                <Sidebar />
                        </div>
                    </div> */}
                    <div className='col-10 bg-white '>
                               
                        <table className="table table-responsive table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Apellido</th>
                                    <th scope="col">Ciudad</th>
                                    <th scope="col">Correo</th>
                                    <th scope="col">Teléfono</th>
                                    <th scope="col">Dirección</th>
                                    <th scope="col">Nacimiento</th>
                                    <th scope="col">status</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>

                            {listUser.map(({
                                fname,
                                lname, 
                                country_code, 
                                username, 
                                phone, 
                                birthdate, 
                                address,
                                status}, key) => {

                                    return ( 
                                        <tr>
                                            <th scope="row">{++key}</th>
                                            <td>{fname}</td>
                                            <td>{lname}</td>
                                            <td>{countryList[country_code]}</td>
                                            <td>{username}</td>
                                            <td>{phone}</td>
                                            <td>{address}</td>
                                            <td>{birthdate}</td>
                                            <td>{Number(status) === 1 ? (<span className="badge bg-success">Activo</span>) : (<span className="badge bg-danger">Inactivo</span>)}</td>
                                            <td>TO DO:</td>
                                        </tr>
                                    )

                                })
                            } 
     
                            </tbody>
                            </table>
                
                        </div>
                </div>
            </div>

        </>
     );
}
 
export default Principal;