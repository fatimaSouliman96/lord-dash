
import { MdAddCircle } from 'react-icons/md';
import NavBar from '../../components/navBar/NavBar'
import PopUp from '../../components/popUp/PopUp';
import CircularProgress from '../../components/progressBar/CircularProgress';
import Table from '../../components/Table/Table';
import { useEffect, useState } from 'react';
import { postData } from '../../api/postData';
import type { Branch } from '../../types/types';
import AddBranch from '../../components/forms/AddBranch';

export default function Brances() {
  const [branchs, setBranch] = useState<Branch[]>()


  const [open, setOpen] = useState<boolean>(false)
  const columns = [
    { key: "id", label: "الرقم" },
    { key: "name", label: "اسم الفرع" },
    { key: "address", label: "العنوان" },
    { key: "phone", label: "رقم الهاتف" },
    { key: "status", label: "الحالة" }
  ];



  const changeStateOfPop = () => {
    setOpen(!open)
  }

  const fetchData = async () => {
    const data = await postData<Branch[]>("branches", "get")
    setBranch(data.data)
  }


  useEffect(() => {
    fetchData()
  }, [])



  return (
    <div className='w-full' >

      <NavBar title='ادارة أراء العملاء' />
      <div className='w-full h-full p-16' >
        <button onClick={changeStateOfPop} className='w-4/12 h-10 cursor-pointer rounded-lg bg-blue-950 gap-2 text-white flex items-center justify-center'
        >  <MdAddCircle color='white' />
          اضف فرع
        </button>
        {branchs ? <Table page='branches' url='branches' fetchData={fetchData} columns={columns} rows={branchs || []} />
          :
          <div className=" flex items-center justify-center pt-8">
            <CircularProgress indeterminate color="text-blue-950" />
          </div>
        }
        <PopUp open={open} onClose={changeStateOfPop} >
          <AddBranch close={changeStateOfPop} fetchData={fetchData} />
        </PopUp>

      </div>
    </div>
  )
}