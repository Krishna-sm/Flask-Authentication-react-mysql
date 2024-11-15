import { useMainContext } from "../context/MainContext"
import ProtectedLayout from "../layouts/ProtectedLayout"

 
const HomePage = () => {

  const {user,logoutButton}  = useMainContext()

  return (
   <ProtectedLayout>
     <div className='py-24'>
              <div className=" mx-auto w-1/4 shadow-lg py-4 border-2 rounded-md px-10">
                  <h1 className="font-bold text-2xl">Profile</h1>
                    <hr />

                    <div className="flex flex-col py-4 gap-y-2">
                    <p className="capitalize">Name: {user && user.name} </p>
                    <p>Email: {user && user.email} </p>
                    </div>
                    <div className="mb-3">
                      <button onClick={logoutButton} className="px-4 py-2 bg-black text-white  rounded-md">Logout</button>
                    </div>
              </div>
    </div>
   </ProtectedLayout>
  )
}

export default HomePage
