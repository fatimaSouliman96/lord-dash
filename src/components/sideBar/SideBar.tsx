import { NavLink } from 'react-router-dom'
import logo from '../../../public/new-logo.svg'
import { navLinks } from '../../constant/navLinks'

export default function SideBar() {


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
                                    `mt-4 navLink w-full flex gap-3 pl-5 items-center hover:rounded-tl-lg 
     hover:rounded-bl-lg hover:text-white hover:bg-blue-950 px-8 pb-4 pt-4 duration-1000 transform
     ${isActive ? "active" : ""}`
                                }>
                                {link.icon}
                                {link.title}
                            </NavLink>

                        </li>
                    })
                }
            </ul>
        </aside>
    )
}
