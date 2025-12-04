import { NavLink, useNavigate } from 'react-router-dom'
import logo from '../../../public/new-logo.svg'
import { navLinks } from '../../constant/navLinks'
import { MdLogout } from 'react-icons/md'
import { fetchFunc } from '../../api/fetchData'
import type { logout } from '../../types/types'
import toast from 'react-hot-toast'
import Cookies from "js-cookie";


export default function SideBar({setLoading} : {setLoading: (loading: boolean) => void}) {

    const navigate = useNavigate()
     
    const logout = async () => {

        setLoading(true)
        try {
          const { data: result, error, status } =
            await fetchFunc<logout>("logout", "post")
      
          if (status === 201 && result) {
      
            // احذف التوكن من الكوكيز
            Cookies.remove("token")
      
            toast.success("تم تسجيل الخروج بنجاح!")
            navigate("")
            return
          }
      
          if (error) {
            toast.error(error)
            console.error(`API Error (${status}):`, error)
          } else {
            toast.error("حدث خطأ غير متوقع. حاول مرة أخرى.")
            console.warn("Unexpected login response:", result)
          }
      
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : "حدث خطأ غير متوقع"
          toast.error(message)
          console.error("Login exception:", err)
      
        } finally {
          close()
          setLoading(false)
        }
      }
      

    return (
        <aside className="w-[20%] h-full fixed  
                             border-l border-gray-200 shadow " >
            <div className='w-full  pt-4 ' >
                <img src={logo} className='w-[200px] mx-auto ' />
            </div>

            <ul className=' text-[16px]  w-full pt-8 h-auto' >
                {
                    navLinks.map((link, index) => {
                        return <li key={index}  >

                            <NavLink to={link.link}
                                end
                                className={({ isActive }: { isActive: boolean }) =>
                                    `mt-2 navLink w-full flex gap-3 pl-5 items-center hover:rounded-tl-lg 
     hover:rounded-bl-lg hover:text-white hover:bg-blue-950 px-8 pb-4 pt-4 duration-1000 transform
     ${isActive ? "active" : ""}`
                                }>
                                {link.icon}
                                {link.title}
                            </NavLink>

                        </li>
                    })
                }
                <li
                    onClick={logout}
                    className={
                        `mt-1 cursor-pointer navLink w-full flex gap-3 pl-5 items-center hover:rounded-tl-lg 
                        hover:rounded-bl-lg hover:text-white hover:bg-blue-950 px-8 pb-4 pt-4 duration-1000 transform
                    `}>
                        <MdLogout size={25} color='#162456' />
                        تسجيل خروج
                </li>
            </ul>

        </aside>
    )
}
