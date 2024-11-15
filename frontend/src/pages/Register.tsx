import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { toast } from 'react-toastify';
import * as yup from 'yup'
import { useMainContext } from '../context/MainContext';
const Register = () => {


  const {registerUser} =useMainContext()
    const validationSchema = yup.object({
      name:yup.string().required("name is Required") ,
      username:yup.string().required("Username is Required").email("Email must be valid"),
      password:yup.string().required("Password is required")
    })
    interface initialValuesProps {
      name: string;
      username: string;
      password: string;
  }
  

    const initialValues:initialValuesProps = {
      name:'',
      username:'',
      password:''
    }

    
    const onSubmitHandler =async (e:initialValuesProps,{resetForm}:FormikHelpers<initialValuesProps>)=>{
      try {
        // console.log(e);
      await  registerUser(e.name,e.username,e.password);
        
resetForm()
        } catch (error:any) {
          console.log(error);
          
        toast.error(error.message)
      }
    }

  return (
    <>
         <Formik initialValues={initialValues} onSubmit={onSubmitHandler} validationSchema={validationSchema}>
         <Form  className="w-full flex flex-col justify-center items-center py-12 mx-auto" > 
  <div className="space-y-12 w-1/2 mx-auto">
    <div className="border-b  mx-auto border-gray-900/10 pb-12">
      <h2 className="text-base/7 font-semibold text-gray-900">Register</h2>
      <p className="mt-1 text-sm/6 text-gray-600">This information will be displayed publicly so be careful what you share.</p>
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6 mx-auto">
      <div className="sm:col-span-4">
          <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">Name</label>
          <div className="mt-2">
            
            <div className="mb-3">
              <Field name="name" type="text" className="w-full py-3 px-5 border-2 border-black rounded-lg outline-none  " placeholder="Enter Your Name" />
              <ErrorMessage className='text-sm text-red-500 capitalize ' name='name' component={'p'} />
            </div>

            
          </div>
        </div>
        <div className="sm:col-span-4">
          <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">Email</label>
          <div className="mt-2">
            
            <div className="mb-3">
              <Field name="username" type="text" className="w-full py-3 px-5 border-2 border-black rounded-lg outline-none  " placeholder="Enter Your Email" />
              <ErrorMessage className='text-sm text-red-500 capitalize ' name='username' component={'p'} />
            </div>

            
          </div>
        </div>

        <div className="sm:col-span-4">
          <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">Password</label>
          <div className="mt-2">
            
            <div className="mb-3">
              <Field  name="password" type="password" className="w-full py-3 px-5 border-2 border-black rounded-lg outline-none  " placeholder="Enter Your Password" />
              <ErrorMessage className='text-sm text-red-500 capitalize ' name='password' component={'p'} />

            </div>

            <div className="mb-3">
              <button className="w-full bg-black py-3 rounded-md text-white border-none">Register</button>
            </div>

            
          </div>
        </div>
      </div></div></div></Form>
          </Formik>

    
    </>
  )
}

export default Register
