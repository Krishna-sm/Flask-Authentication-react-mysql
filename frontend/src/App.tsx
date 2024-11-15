 
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import { MainContextProvider } from './context/MainContext'

const App = () => {
  return (
    <MainContextProvider>
    <Navbar/>
            <Outlet/>
    </MainContextProvider>
  )
}

export default App
