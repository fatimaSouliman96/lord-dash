

export default function Delete({
    id,
    deleteElement,
    loading
}: {
    id: React.ReactNode;
    deleteElement: (id: number) => void;
    loading: boolean
}) {

    const HandelDelete = () => {
        deleteElement(Number(id))
    }

  return (
    <div className="flex items-center flex-col justify-center gap-8" >
        <h1 className='text-blue-950 text-xl text-center font-bold' >هل انت متاكد من الحذف?</h1>
        <button disabled={loading} onClick={HandelDelete} className="w-[300px] h-16 cursor-pointer  bg-red-800 rounded-lg text-white text-xl font-bold " >
                {
                    loading ? 
                    "يتم الحذف"
                    :
                    "حذف"
                }
        </button>

    </div>
  )
}
