
import { MdAddCircle } from 'react-icons/md';
import NavBar from '../../components/navBar/NavBar'
import PopUp from '../../components/popUp/PopUp';
import CircularProgress from '../../components/progressBar/CircularProgress';
import Table from '../../components/Table/Table';
import { useEffect, useState } from 'react';
import { fetchFunc } from '../../api/fetchData';
import type { Testimonial } from '../../types/types';
import AddTestimonial from '../../components/forms/AddTestimonial';

export default function Clients() {
  const [testimonials, setTestimonial] = useState<Testimonial[]>()

  
    const [open, setOpen] = useState<boolean>(false)
  const columns = [
  { key: "id", label: "الرقم" },
  { key: "name", label: "الاسم" },
  { key: "position", label: "الوظيفة" },
  { key: "comment", label: "التعليق" },
  { key: "created_at", label: "تاريخ الإضافة" },
  { key: "updated_at", label: "تاريخ التحديث" },
];

  
    const changeStateOfPop = () => {
      setOpen(!open)
    }
  
    const fetchData = async () => {
      const data = await fetchFunc<Testimonial[]>("testimonials", "get")
      setTestimonial(data.data)
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
            اضف تعليق
          </button>
          {testimonials ? <Table page='clients' url='testimonials' fetchData={fetchData} columns={columns} rows={testimonials || []} />
            :
            <div className=" flex items-center justify-center pt-8">
              <CircularProgress indeterminate color="text-blue-950" />
            </div>
          }
          <PopUp open={open} onClose={changeStateOfPop} >
            <AddTestimonial close={changeStateOfPop} fetchData={fetchData} />
          </PopUp>
  
        </div>
      </div>
    )
  }