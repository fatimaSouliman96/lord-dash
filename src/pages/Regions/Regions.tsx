
import { useEffect, useState } from 'react';
import NavBar from '../../components/navBar/NavBar'
import type { city, region } from '../../types/types';
import { MdAddCircle } from 'react-icons/md';
import Table from '../../components/Table/Table';
import CircularProgress from '../../components/progressBar/CircularProgress';
import PopUp from '../../components/popUp/PopUp';
import { fetchFunc } from '../../api/fetchData';
import AddRegion from '../../components/forms/AddRegion';

export default function Regions() {
  const [regions, setRegions] = useState<region[]>()
  const [cities, setCities] = useState<city[]>()

  const [open, setOpen] = useState<boolean>(false)


  const columns = [
    { key: "id", label: "الرقم" },
    { key: "name", label: "المنطقة" },
    { key: "city.name", label: "المحافظة" },
  ];

  const changeStateOfPop = () => {
    setOpen(!open)
  }

  
  const fetchData = async () => {
    const data = await fetchFunc<region[]>("regions", "get")
    setRegions(data.data)   
  }
  const fetchDataCities = async () => {
    const dataCities = await fetchFunc<city[]>("cities", "get")
    setCities(dataCities.data)  
  }

  useEffect(() => {
    fetchData()
    fetchDataCities()
  }, [])


  return (
    <div className='w-full' >

      <NavBar title='ادارة المناطق' />
      <div className='w-full h-full p-16' >
        <button onClick={changeStateOfPop} className='w-4/12 h-10 cursor-pointer rounded-lg bg-blue-950 gap-2 text-white flex items-center justify-center'
        >  <MdAddCircle color='white' />
          اضف محافظة
        </button>
        {regions ? <Table cities={cities} page='regions'  url='regions' fetchData={fetchData} columns={columns} rows={regions || []} />
          :
          <div className=" flex items-center justify-center pt-8">
            <CircularProgress indeterminate color="text-blue-950" />
          </div>
        }
        <PopUp open={open} onClose={changeStateOfPop} >
          <AddRegion cities={cities || []} close={changeStateOfPop} fetchData={fetchData} />
        </PopUp>

      </div>
    </div>
  )
}
