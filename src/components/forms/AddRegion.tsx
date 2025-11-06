
import { MdAddCircle } from 'react-icons/md'
import { useState } from 'react'
import { postData } from '../../api/postData'
import type { city, region } from '../../types/types'
import toast from 'react-hot-toast'

export default function AddRegion({ close, fetchData, cities }: { close: () => void; fetchData: () => void, cities: city[] }) {

    const [name, setName] = useState<string>("")
    const [idCity, setIdCity] = useState<number>()

    const [loading, setLoading] = useState(false);

    const handelSubmit = async () => {
        setLoading(true)
        try {
            const { data: result, error, status } = await postData<region>(
                `regions`,
                "post",
                ({
                    name: name,
                    city_id: idCity
                }
                ))

            if (status === 201 && result) {
                toast.success("تم الاضافة بنجاح!");
                return;
            }

            if (error) {
                toast.error(error);
                console.error(`API Error (${status}):`, error);
            } else {
                toast.error("حدث خطأ غير متوقع. حاول مرة أخرى.");
                console.warn("Unexpected login response:", result);
            }
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "حدث خطأ غير متوقع";
            toast.error(message);
            console.error("Login exception:", err);
        } finally {
            close()
            setLoading(false)
            fetchData()
        }


    }

    return (
        <form>
            <h1 className='text-xl text-center text-blue-950 font-semibold'>اضافة محافظة</h1>
            <div className="flex flex-col text-right gap-1 pt-8">
                <label htmlFor="name">اختر محافظة</label>
                <select
                    onChange={e => setIdCity(Number(e.target.value))}
                    id="idCity"
                    value={idCity}
                    className="text-right outline-gray-300 p-2 text-blue-950 h-10 border border-gray-200 shadow rounded-xl"

                >
                    <option value={""} ></option>
                    {
                        cities.map(op => {
                            return <option value={op.id} key={op.id} >
                                {op.name}
                            </option>
                        })
                    }
                </select>



            </div>
            <div className="flex flex-col text-right gap-1 pt-8">
                <label htmlFor="name">المنطقة</label>
                <input
                    onChange={e => setName(e.target.value)}
                    id="name"
                    type='text'
                    value={name}
                    className="text-right outline-gray-300 p-2 text-blue-950 h-10 border border-gray-200 shadow rounded-xl"

                />



            </div>
            <button disabled={loading} type='button' onClick={handelSubmit} className='w-4/12 mt-8 h-10 cursor-pointer rounded-lg bg-blue-950 gap-2 text-white flex items-center justify-center'
            >  <MdAddCircle color='white' />
                {
                    loading ?
                        "يتم الاضافة"
                        :
                        "اضافة"
                }
            </button>
        </form>
    )
}
