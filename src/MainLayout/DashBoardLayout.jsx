import { Outlet } from 'react-router-dom'
import Sidebar from '../Components/Dashbord/Sidebar'

const DashboardLayout = () => {
  return (
    <div className='relative min-h-screen md:flex bg-white dark:bg-gray-900'>
      {/* Left Side: Sidebar Component */}
      <Sidebar></Sidebar>
      {/* Right Side: Dashboard Dynamic Content */}
      <div className='flex-1  md:ml-64'>
        <div className='p-5'>
          {/* Outlet for dynamic contents */}
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout