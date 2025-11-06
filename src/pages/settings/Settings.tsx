
import { useEffect, useState } from 'react'
import NavBar from '../../components/navBar/NavBar'
import type { settings } from '../../types/types'
import { postData } from '../../api/postData'
import PopUp from '../../components/popUp/PopUp'
import CircularProgress from '../../components/progressBar/CircularProgress'
import Table from '../../components/Table/Table'
import { MdAddCircle } from 'react-icons/md'
import AddSettings from '../../components/forms/AddSetiing'

export default function Settings() {
  const [info, setInfo] = useState<settings[]>()
  const [open, setOpen] = useState<boolean>(false)


  const columns = [
    { key: "id", label: "الرقم" },
    { key: "title", label: "العنوان" },
    { key: "description", label: "الوصف" },

  ];


  const changeStateOfPop = () => {
    setOpen(!open)
  }


  const fetchData = async () => {
    const data = await postData<settings[]>("settings", "get")
    setInfo(data.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className='w-full' >

      <NavBar title='ادارة الاعدادات' />
         <div className='w-full h-full p-16' >
        <button onClick={changeStateOfPop} className='w-4/12 h-10 cursor-pointer rounded-lg bg-blue-950 gap-2 text-white flex items-center justify-center'
        >  <MdAddCircle color='white' />
          اضف سؤال
        </button>
        {info ? <Table   page='Settings' url='Settings' fetchData={fetchData} columns={columns} rows={info || []} />
          :
          <div className=" flex items-center justify-center pt-8">
            <CircularProgress indeterminate color="text-blue-950" />
          </div>
        }
        <PopUp open={open} onClose={changeStateOfPop} >
          <AddSettings  close={changeStateOfPop} fetchData={fetchData} />
        </PopUp>

      </div>
    </div>
  )
}
