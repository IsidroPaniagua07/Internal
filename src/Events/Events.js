import {useState, useEffect} from 'react'
import EventList from './EventList'

const Events = () => {
    const [eventList, setEventList] = useState([])


    useEffect(()=> {
        fetch('http://localhost:3500/api/eventlist')
        .then(res => res.json())
        .then((result) => setEventList(result))

    },[])
    
// Add Sort Event by Event Date
  return (
<>
    <div className='flex flex-col justify-center items-center h-full w-full bg-jconyx'>
        <div className="flex flex-col bg-jcaqua justify-between gap-4 rounded-3xl border-2 border-white h-[98%] w-[99%] overflow-y-hidden">
            <div className="flex bg-gradient-to-b from-[#00a4af] to-jcaqua text-6xl h-[20%] w-full rounded-3xl justify-center items-center font-roboto-mono">
                Events
            </div>
            <div className="flex flex-col items-center overflow-y-hidden gap-4 h-full w-full ">
                <div className='flex flex-col bg-gray-300 border-black p h-[98%] w-[98%] justify-start items-start overflow-y-scroll'>
                    <EventList eventList={eventList}/>
                </div>
            </div>
        </div>      
    </div>
</>
  )
}

export default Events