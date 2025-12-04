
import { MdAddCircle } from 'react-icons/md';
import NavBar from '../../components/navBar/NavBar'
import PopUp from '../../components/popUp/PopUp';
import CircularProgress from '../../components/progressBar/CircularProgress';
import Table from '../../components/Table/Table';
import { useEffect, useState } from 'react';
import { fetchFunc } from '../../api/fetchData';
import type {  Package, region } from '../../types/types';
import AddPackage from '../../components/forms/AddPackage';

export default function Packges() {
  const [Packages, setPackages] = useState<Package[]>()
  const [regions, setRegions] = useState<region[]>()

  const [open, setOpen] = useState<boolean>(false)


  const columns = [
    { key: "id", label: "الرقم" },
    { key: "name", label: "اسم الباقة" },
    { key: "speed", label: "السرعة" },
    { key: "limit", label: "الحد" },
    { key: "duration", label: "المدة" },
    { key: "price", label: "السعر" },
    { key: "region.name", label: "المنطقة" },

  ];


  const changeStateOfPop = () => {
    setOpen(!open)
  }

  const fetchData = async () => {
    const data = await fetchFunc<Package[]>("packages", "get")
    setPackages(data.data)
  }
  const fetchDataRegions = async () => {
    const data = await fetchFunc<region[]>("regions", "get")
    setRegions(data.data)
  }

  useEffect(() => {
    fetchData()
    fetchDataRegions()
  }, [])



  return (
    <div className='w-full' >

      <NavBar title='ادارة الباقات' />
      <div className='w-full h-full p-16' >
        <button onClick={changeStateOfPop} className='w-4/12 h-10 cursor-pointer rounded-lg bg-blue-950 gap-2 text-white flex items-center justify-center'
        >  <MdAddCircle color='white' />
          اضف باقة
        </button>
        {regions ? <Table regions={regions}  page='packages'  url="packages" fetchData={fetchData} columns={columns} rows={Packages || []} />
          :
          <div className=" flex items-center justify-center pt-8">
            <CircularProgress indeterminate color="text-blue-950" />
          </div>
        }
        <PopUp open={open} onClose={changeStateOfPop} >
          <AddPackage regions={regions || []} close={changeStateOfPop} fetchData={fetchData} />
        </PopUp>

      </div>
    </div>
  )
}

