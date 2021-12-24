import React from 'react';
import {Link} from 'react-router-dom';

// axios
 import clientAxios from '../../config/axios'

// Importar reactRouterDom
 import {useNavigate} from 'react-router-dom';

// Importando formik
import {useFormik} from 'formik'

// Importando validacion
import * as Yup from 'yup';


const Login =  () => {

     // Hook para redireccionar
      const navigate = useNavigate();

     // Validaciones y leer los formularios
     const formik = useFormik({
        initialValues: {
            usuario: '',
            password: ''
        }, 
        validationSchema: 
            // Validaciones
            Yup.object({
                usuario: Yup.string()
                            .required('El usuario es Obligatorio'),
                password: Yup.string()
                            .min(5, 'Debes contener al menos (5) Caracteres')
                            .required('El password es obligatorio'),
           
        }),
        onSubmit: data => {

            //
            const {usuario : username, password} = data;
            LoginVerify({username, password});
   
        }
    });


    const LoginVerify = async data => {
        try {
            const resultado = await clientAxios.post('/api/auth/login', data);
            // console.log(resultado.data)
            const {token} = resultado.data
            // Guardamos en local
            localStorage.setItem('token-user', token);

             // Redireccionar
             navigate('/principal')

        } catch (error) {
            console.log(error)
        }  
    }   


    return ( 
        <>
          <div className="container ">
                <div className='row d-flex justify-content-center align-items-center vh-100 ' >
                    <div className='col-sm-12  col-md-6' >
                    <h3 className='text-center fs-2 text-white'>REGISTRAR</h3>

                     <form className="bg-white p-4 shadow rounded" onSubmit={formik.handleSubmit}>

                            <div className="form-row align-items-center">
                               
                            <div className="col-auto">
                                  <label className="sr-only form-label" for="inlineFormInput">Usuario</label>
                                  <input type="text" className="form-control mb-2" 
                                  id="usuario" placeholder="Example: Ingresa Usuario" 
                                    value={formik.values.usuario}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                  
                                  
                                  />

                                { formik.touched.usuario && formik.errors.usuario ? (
                                    <p className='text-danger fw-light'>
                                        {formik.errors.usuario}
                                    </p>
                                ): null}

                              </div>

                              <div className="col-auto">
                                  <label className="sr-only form-label" for="inlineFormInput">Clave</label>
                                  <input type="password" className="form-control mb-2" 
                                  
                                  id="password" placeholder="Example: Ingresa clave"  
                                  value={formik.values.password}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                    
                                  />

                                { formik.touched.password && formik.errors.password ? (
                                    <p className='text-danger fw-light'>
                                         {formik.errors.password}
                                    </p>
                                ): null}
                              </div>

                            
                              <div className='col-auto text-center mt-4'>
                                    <button type="submit" class="btn btn-outline-success my-1 ">Registrar</button>
                              </div>

                               <Link to={'/nueva'}  className="link-secondary d-block">
                                    Obtener Cuenta
                                </Link>
                                <Link to={'/principal'}  className="link-secondary">
                                    principal
                                </Link>
                                                        
                            </div>
                      </form>

                    </div>
                </div>
          </div>
         
        </>
       
    );
}
 
export default Login;
