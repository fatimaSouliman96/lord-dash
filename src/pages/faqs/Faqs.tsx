
import { MdAddCircle } from 'react-icons/md';
import NavBar from '../../components/navBar/NavBar'
import PopUp from '../../components/popUp/PopUp';
import CircularProgress from '../../components/progressBar/CircularProgress';
import Table from '../../components/Table/Table';
import {  fetchFunc } from '../../api/fetchData';
import { useEffect, useState } from 'react';
import type { faq } from '../../types/types';
import AddFAQ from '../../components/forms/AddFaq';

export default function Faqs() {
   const [faqs, setFaqs] = useState<faq[]>()


  const [open, setOpen] = useState<boolean>(false)


  const columns = [
    { key: "id", label: "الرقم" },
    { key: "name", label: "اسم الباقة" },
    { key: "question", label: "السؤال" },
    { key: "answer", label: "الجواب" },


  ];


  const changeStateOfPop = () => {
    setOpen(!open)
  }

  const fetchData = async () => {
    const data = await fetchFunc<faq[]>("faqs", "get")
    setFaqs(data.data)
  }

  useEffect(() => {
    fetchData()
  }, [])



  return (
    <div className='w-full' >

      <NavBar title='ادارة الاسئلة الشائعة' />
      <div className='w-full h-full p-16' >
        <button onClick={changeStateOfPop} className='w-4/12 h-10 cursor-pointer rounded-lg bg-blue-950 gap-2 text-white flex items-center justify-center'
        >  <MdAddCircle color='white' />
          اضف سؤال
        </button>
        {faqs ? <Table   page='faqs' url='faqs' fetchData={fetchData} columns={columns} rows={faqs || []} />
          :
          <div className=" flex items-center justify-center pt-8">
            <CircularProgress indeterminate color="text-blue-950" />
          </div>
        }
        <PopUp open={open} onClose={changeStateOfPop} >
          <AddFAQ  close={changeStateOfPop} fetchData={fetchData} />
        </PopUp>

      </div>
    </div>
  )
}


