import { Outlet } from 'react-router-dom';
import './App.css'
import SideBar from './components/sideBar/SideBar';
import ErrorBoundary from './components/ErrorHandler/ErrorHandler';
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import CircularProgress from './components/progressBar/CircularProgress';





function App() {
  const [loading, setLoading] = useState(false);

  return (

    <ErrorBoundary>

      <div dir='rtl' className='relative w-full max-w-[100vw] mx-auto '  >

        <div className='flex w-full' >
          <div className='w-[20%]' >
            <SideBar setLoading={setLoading} />
          </div>
          <div className='w-[80%]' >
            <Outlet />
          </div>

        </div>
        <Toaster position='top-center' />

        {
          loading && 
          <div className='w-full  h-screen flex items-center justify-center left-0 bottom-0  fixed top-0 
        backdrop-blur-[2px] ' >
            <CircularProgress/>
          </div>
        }
      </div>
    </ErrorBoundary>


  )
}

export default App
