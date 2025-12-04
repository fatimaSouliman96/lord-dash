
import { MdAddCircle } from 'react-icons/md';
import NavBar from '../../components/navBar/NavBar'
import Table from '../../components/Table/Table'
import { useEffect, useState } from 'react';
import type { city } from '../../types/types';
import PopUp from '../../components/popUp/PopUp';
import CircularProgress from '../../components/progressBar/CircularProgress';
import AddCity from '../../components/forms/AddCity';
import { fetchFunc } from '../../api/fetchData';


export default function Cities() {
  const [cities, setCities] = useState<city[]>()
  const [open, setOpen] = useState<boolean>(false)


  const columns = [
    { key: "id", label: "الرقم" },
    { key: "name", label: "Name" },

  ];

  const changeStateOfPop = () => {
    setOpen(!open)
  }


  const fetchData = async () => {
    const data = await fetchFunc<city[]>("cities", "get")
    setCities(data.data)
  }
  useEffect(() => {
    fetchData()
  }, [])



  return (
    <div className='w-full' >

      <NavBar title='ادارة المحافظات' />
      <div className='w-full h-full p-16' >
        <button onClick={changeStateOfPop} className='w-4/12 h-10 cursor-pointer rounded-lg bg-blue-950 gap-2 text-white flex items-center justify-center'
        >  <MdAddCircle color='white' />
          اضف محافظة
        </button>
        {cities ? <Table  page='cities'  url='cities' fetchData={fetchData} columns={columns} rows={cities || []} />
          :
          <div className=" flex items-center justify-center pt-8">
            <CircularProgress indeterminate color="text-blue-950" />
          </div>
        }
        <PopUp open={open} onClose={changeStateOfPop} >
          <AddCity close={changeStateOfPop} fetchData={fetchData} />
        </PopUp>

      </div>
    </div>
  )
}
