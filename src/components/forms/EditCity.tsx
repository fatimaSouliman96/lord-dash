
import { MdAddCircle } from 'react-icons/md'
import { syrianGovernorates } from '../../constant/citiesOptions'
import { useState } from 'react'
import type { city } from '../../types/types'
import toast from 'react-hot-toast'
import { putData } from '../../api/putData'


export default function EditCity({
    close,
    fetchData,
    id,
    name
}: {
    close: () => void;
    fetchData: () => void;
    id: React.ReactNode;
    name: React.ReactNode;
}) {

    const [newName, setNewName] = useState<string>(name ? String(name) : "")
    const [loading, setLoading] = useState(false);

    console.log(id)
    const handelSubmit = async () => {
        setLoading(true)
        try {
            const { data: result, error, status } = await putData<city>(
                `cities/${id && Number(id)}`,
                ({
                    name: newName
                }
                ))

            if (status === 200 && result) {
                toast.success("تم التعديل بنجاح!");
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
            close()
            setLoading(false)
            setNewName(name ? String(name) : "")
        } finally {
            close()
            setLoading(false)
            fetchData()
            setNewName(name ? String(name) : "")
        }


    }

    return (
        <form>
            <h1 className='text-xl text-center text-blue-950 font-semibold'>اضافة محافظة</h1>
            <div className="flex flex-col text-right gap-1 pt-8">
                <label htmlFor="name">اختر مدينة</label>
                <select
                    onChange={e => setNewName(e.target.value)}
                    id="name"
                    value={newName}
                    className="text-right outline-gray-300 p-2 text-blue-950 h-10 border border-gray-200 shadow rounded-xl"

                >
                    <option value={""} ></option>
                    {
                        syrianGovernorates.map(op => {
                            return <option value={op.name} key={op.id} >
                                {op.name}
                            </option>
                        })
                    }
                </select>
                <button disabled={loading} type='button' onClick={handelSubmit} className='w-4/12 mt-8 h-10 cursor-pointer rounded-lg bg-blue-950 gap-2 text-white flex items-center justify-center'
                >  <MdAddCircle color='white' />
                    {
                        loading ?
                            "يتم التعديل"
                            :
                            "تعديل"
                    }
                </button>

            </div>
        </form>
    )
}