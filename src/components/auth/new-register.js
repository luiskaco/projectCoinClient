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


const NewRegister = () => {

     // Hook para redireccionar
     const navigate = useNavigate();

      // Validaciones y leer los formularios
      const formik = useFormik({
        initialValues: {
            nombre: '',
            apellido: '',
            country: '',
            phone:'',
            birth:'',
            address:'',
            username:'',
            password:'',
            password2:''
        }, 
        validationSchema: 
            // Validaciones
            Yup.object({
                nombre: Yup.string()
                            .required('El usuario es Obligatorio'),
                apellido: Yup.string()
                            .required('El usuario es Obligatorio'),
                country: Yup.string()
                            .required('El country es Obligatorio'),
                birth: Yup.string()
                            .required('El fecha de naciomiento es Obligatorio'),
                phone: Yup.string()
                            .required('El Telefono de naciomiento es Obligatorio'),
                address: Yup.string()
                            .required('El dirección es Obligatorio'),
                username: Yup.string()
                            .email('El campo email no tiene formato adecuado.')
                            .required('El usuario es Obligatorio'),
                password: Yup.string()
                            .min(5, 'Debes contener al menos (5) Caracteres')
                            .required('El password es obligatorio'),
                password2: Yup.string().when("password", {
                    is: val => (val && val.length > 0 ? true : false),
                    then: Yup.string().oneOf(
                        [Yup.ref("password")],
                        "Ambas contraseñas deben ser iguales"
                    )
                }),
           
        }),
        onSubmit: data => {
            const {
                nombre : username,
                password, 
                apellido:fname, 
                phone, 
                address ,
                country:country_code, 
                nombre:lname,  
                birth:birthdate 
            } = data;

         
            LoginVerify({ 
                    username, 
                    password, 
                    country_code,
                    phone,
                    fname,
                    lname,
                    address,
                    birthdate, 
                });
   
        }
    });

        const LoginVerify = async data => {
            try {
                const resultado = await clientAxios.post('/api/usuario', data);
                 console.log(resultado.data)
        
                // Redireccionar
                navigate('/login')

            } catch (error) {
                console.log(error)
            }  
        }  

    return ( 
        <>
        <div className="container ">
              <div className='row d-flex justify-content-center align-items-center vh-100 ' >
                   <div className='col-sm-12  col-md-6'>
                   <h3 className='text-center fs-2 text-white'>REGISTRAR</h3>
                   <form className="bg-white p-4 shadow rounded needs-validation "  onSubmit={formik.handleSubmit}>

                          <div className="form-row align-items-center">

                              <div className='row'>
                                    <div className="col-12 col-md-6 ">
                                        <label className="sr-only form-label" for="inlineFormInput">Nombre</label>
                                        <input type="text" className="form-control mb-2 form-control-sm" 
                                        id="nombre" placeholder="Example: tu nombre" 
                                        value={formik.values.usuario}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                            
                                        />
                                        { formik.touched.nombre && formik.errors.nombre ? (
                                            <p className='text-danger fw-light'>
                                                {formik.errors.nombre}
                                            </p>
                                        ): null}
                                    </div>

                                    <div className="col-12 col-md-6 ">
                                        <label className="sr-only form-label" for="inlineFormInput">Apellido</label>
                                        <input type="text" className="form-control mb-2 form-control-sm" 
                                        id="apellido" placeholder="Example: tu apellido" 
                                        value={formik.values.apellido}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    
                                        />
                                          { formik.touched.apellido && formik.errors.apellido ? (
                                            <p className='text-danger fw-light'>
                                                {formik.errors.apellido}
                                            </p>
                                        ): null}
                                    </div>

                              </div>

                              <div className='row'>
                                    <div className="col-12 col-md-6 ">
                                        <label className="sr-only form-label" for="country">Ciudad</label>
                                        <select className="form-select form-control-sm "  aria-label="Default select example"
                                          id="country"
                                          value={formik.values.country}
                                          onChange={formik.handleChange}
                                          onBlur={formik.handleBlur}
                                          required
                                        >
                                            <option value='0' selected>------   Selecionar   ------</option>
                                            <option value="1">Lima</option>
                                            <option value="2">Bogota</option>
                                            <option value="3">Caracas</option>
                                            <option value="4">Buenos Aires</option>
                                        </select>
                                        { formik.touched.country && formik.errors.country ? (
                                            <p className='text-danger fw-light'>
                                                {formik.errors.country}
                                            </p>
                                        ): null}
                                    </div>

                                    <div className="col-12 col-md-6 ">
                                        <label className="sr-only form-label" for="inlineFormInput">Fecha de Nacimiento</label>
                                        <input type="date" className="form-control mb-2 form-control-sm" 
                                        id="birth" placeholder=""
                                            value={formik.values.birth}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}        
                                        />
                                         { formik.touched.birth && formik.errors.birth ? (
                                            <p className='text-danger fw-light'>
                                                {formik.errors.birth}
                                            </p>
                                        ): null}
                                    </div>
                                    
                              </div>

                              <div className="col-auto">
                                        <label className="sr-only form-label" for="inlineFormInput">Direccion</label>
                                        <textarea className="form-control form-control-sm" placeholder="Example: Tu dirección" id="address" rows="3"
                                           value={formik.values.address}
                                           onChange={formik.handleChange}
                                           onBlur={formik.handleBlur}  
                                        
                                        ></textarea>

                                        { formik.touched.address && formik.errors.address ? (
                                            <p className='text-danger fw-light'>
                                                {formik.errors.address}
                                            </p>
                                        ): null}
                                    </div>
                        
                              <div className="col-auto">
                                  <label className="sr-only form-label" for="inlineFormInput">Teléfono</label>
                                  <input type="tel" className="form-control mb-2 form-control-sm" 
                                  id="phone" placeholder="Example: +51232324444" 
                                        value={formik.values.phone}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}  
                                  
                                  />
                                  { formik.touched.phone && formik.errors.phone ? (
                                        <p className='text-danger fw-light'>
                                            {formik.errors.phone}
                                        </p>
                                    ): null}
                              </div>

                              <div className="col-auto">
                                  <label className="sr-only form-label" for="inlineFormInput">Usuario</label>
                                  <input type="email" className="form-control mb-2 form-control-sm" 
                                  id="username" placeholder="Example: Tu usuario" 
                                        value={formik.values.username}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}  
                                  
                                  />
                                  { formik.touched.username && formik.errors.username ? (
                                        <p className='text-danger fw-light'>
                                            {formik.errors.username}
                                        </p>
                                    ): null}
                              </div>



                              <div className="col-auto">
                                  <label className="sr-only form-label" for="inlineFormInput">Clave</label>
                                  <input type="password" className="form-control mb-2 form-control-sm" 
                                  id="password" placeholder="Example: Tu contraseña"  
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

                              <div className="col-auto">
                                  <label className="sr-only form-label" for="inlineFormInput">Confirmar</label>
                                  <input type="password" className="form-control mb-2 form-control-sm" 
                                  id="password2" placeholder="Example: Tu contraseña" 
                                    value={formik.values.password2}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}  
                                  />

                                 { formik.touched.password2 && formik.errors.password2 ? (
                                    <p className='text-danger fw-light'>
                                        {formik.errors.password2}
                                    </p>
                                ): null}
                              </div>

                              <div className='col-auto text-center mt-4'>
                                    <button type="submit" class="btn btn-outline-success my-1 ">Registrar</button>
                              </div>

                              <Link to={'/'}  className="link-secondary">
                                    Regresar
                               </Link>
                               
                          </div>
                    </form>

                  </div>
              </div>
        </div>
       
      </>
     );
}
 
export default NewRegister;