import { MdClose } from "react-icons/md";


export default function PopUp({ children, open, onClose }: { children?: React.ReactNode; open: boolean; onClose: () => void; }) {


    return (
        <div className={`${open ? "flex" : "hidden"} w-full  h-screen flex items-center justify-center left-0 bottom-0  fixed top-0 
        backdrop-blur-[2px] `} >
            <div className="w-1/2 rounded-lg bg-white shadow-md shadow-gray-700 p-2" >
                <MdClose onClick={onClose} size={25} className="cursor-pointer text-blue-950 font-extrabold" />
                {children}
            </div>
        </div>
    )
}
