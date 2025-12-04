
import { MdAddCircle } from 'react-icons/md';
import NavBar from '../../components/navBar/NavBar'
import PopUp from '../../components/popUp/PopUp';
import CircularProgress from '../../components/progressBar/CircularProgress';
import Table from '../../components/Table/Table';
import { useEffect, useState } from 'react';
import type { Package, Provider } from '../../types/types';
import AddProvider from '../../components/forms/AddProvider';
import { fetchFunc } from '../../api/fetchData';

export default function Providres() {
  const [providers, setProviders] = useState<Provider[]>()
  const [packages, setPackages] = useState<Package[]>()

  const [open, setOpen] = useState<boolean>(false)

  const columns = [
    { key: "id", label: "الرقم" },
    { key: "name", label: "اسم المزود" },
    { key: "address", label: "العنوان" },
    { key: "phone", label: "رقم الهاتف" },
    { key: "description", label: "الوصف" },
    { key: "package.name", label: "الباقة" },
  ];

  const changeStateOfPop = () => {
    setOpen(!open)
  }

  const fetchData = async () => {
    const data = await fetchFunc<Provider[]>("providers", "get")
    setProviders(data.data)
  }
  const fetchDatapackages = async () => {
    const data = await fetchFunc<Package[]>("packages", "get")
    setPackages(data.data)
  }

  useEffect(() => {
    fetchData()
    fetchDatapackages()
  }, [])



  return (
    <div className='w-full' >

      <NavBar title='ادارة المزودات' />
      <div className='w-full h-full p-16' >
        <button onClick={changeStateOfPop} className='w-4/12 h-10 cursor-pointer rounded-lg bg-blue-950 gap-2 text-white flex items-center justify-center'
        >  <MdAddCircle color='white' />
          اضف مزود
        </button>
        {providers ? <Table packages={packages} page='providers' url='providers' fetchData={fetchData} columns={columns} rows={providers || []} />
          :
          <div className=" flex items-center justify-center pt-8">
            <CircularProgress indeterminate color="text-blue-950" />
          </div>
        }
        <PopUp open={open} onClose={changeStateOfPop} >
          <AddProvider packages={packages || []} close={changeStateOfPop} fetchData={fetchData} />
        </PopUp>

      </div>
    </div>
  )
}