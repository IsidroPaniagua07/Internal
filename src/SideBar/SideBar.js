import { useNavigate  } from 'react-router-dom';
import { BsFillFilePersonFill, BsKey } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";

const SideBar = () => {
  const navigate = useNavigate()

  return (
    <>
    <div className='relative h-screen min-w-[60px] m-0
                    flex flex-col justify-between
                    bg-gray-900 text-white shadow flex-1 '>
      <div>
        <SideBarIcon icon = { <AiOutlineHome size="40"/>} navigate={navigate} destination='' text='Home'/>
        <SideBarIcon icon = { <BsFillFilePersonFill size="36"/>} navigate={navigate} destination='events' text='Events'/>
      </div>
      <div>
        <SideBarIcon icon = { <BsKey size="40"/>} navigate={navigate} destination='admin' text='Admin Center'/>
        
      </div>

    </div>
    </>
  )
}

const SideBarIcon = ({ icon, text = "Blank", navigate, destination }) => (
  
    <div className='sidebar-icon group' onClick={()=>{navigate(`/${destination}`)}}>
        { icon }

        <span className="sidebar-tooltip group-hover:scale-100 pointer-events-none">
            { text }
        </span>

    </div>
    
)

export default SideBar