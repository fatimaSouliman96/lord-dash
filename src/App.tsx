import { Outlet } from 'react-router-dom';
import './App.css'
import SideBar from './components/sideBar/SideBar';
import ErrorBoundary from './components/ErrorHandler/ErrorHandler';
import { Toaster } from 'react-hot-toast';





function App() {


  return (

    <ErrorBoundary>

      <div dir='rtl' className='relative w-full max-w-[100vw] mx-auto '  >

        <div className='flex w-full' >
          <div className='w-[20%]' >
            <SideBar />
          </div>
          <div className='w-[80%]' >
            <Outlet />
          </div>

        </div>
        <Toaster position='top-center' />

      </div>
    </ErrorBoundary>


  )
}

export default App
