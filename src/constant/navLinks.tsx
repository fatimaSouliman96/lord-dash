import { MdOutlineLocationCity } from "react-icons/md";
import { FaBuilding } from "react-icons/fa";
import { TfiPackage } from "react-icons/tfi";
import { FaPersonCirclePlus } from "react-icons/fa6";
import { FaRegComments } from "react-icons/fa";
import { AiOutlineBranches } from "react-icons/ai";
import { FaQ } from "react-icons/fa6";
import { CiSettings } from "react-icons/ci";

export const navLinks = [
    {
        title: "ادارة المحافظات",
        link: "",
        icon: <MdOutlineLocationCity size={25} color="#162456" />
    },
    {
        title: "ادارة المناطق",
        link: "regions",
        icon: <FaBuilding size={25} color="#162456" />
    },
    {
        title: "ادارة الباقات",
        link: "packges",
        icon: <TfiPackage size={25} color="#162456" />
    },
    {
        title: "ادارة المزودات",
        link: "providres",
        icon: <FaPersonCirclePlus size={25} color="#162456" />
    },
    {
        title: "ادارة اراء العملاء",
        link: "clients",
        icon: <FaRegComments size={25} color="#162456" />
    },
    {
        title: "ادارة الافرع",
        link: "brances",
        icon: <AiOutlineBranches size={25} color="#162456" />
    },
    {
        title: "ادارة الاسئلة الشائعة",
        link: "faqs",
        icon: <FaQ size={25} color="#162456" />
    },
    {
        title: "ادارة الاعدادات",
        link: "settings",
        icon: <CiSettings size={25} color="#162456" />
    },
]