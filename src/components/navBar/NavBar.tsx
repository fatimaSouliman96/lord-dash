

export default function NavBar({title} : {title: string}) {
  return (
    <div className="w-full  shadow-sm" >
        <h1 className="text-2xl text-gray-700 py-8 pr-16" >{title}</h1>
    </div>
  )
}
