import {useEffect, useState, useRef} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AiOutlineIdcard } from "react-icons/ai";
import { IoIosCheckmarkCircleOutline, IoIosCloseCircleOutline } from 'react-icons/io'
import useSound from 'use-sound';
import Success from '../sounds/Success.wav';
import Error from '../sounds/Error.wav';

const EventPage = () => {
    const params = useParams()
    const navigate = useNavigate()
    const formRef = useRef("")
    const [swipeState, setSwipeState] = useState("")
    const [eventData, setEventData] = useState({EventID: 0, EventName: "", Date:"", IsEnabled: false})
    const [successSound] = useSound(Success);
    const [errorSound] = useSound(Error);



    useEffect(()=> {
        fetch(`http://localhost:3500/api/getevent/${params.id}`)
        .then(res => res.json())
        .then((result) => setEventData(result))
    },[params.id])

    const handleSubmit = event => {
        event.preventDefault();
        const inputData = formRef.current.value
        const regexData = inputData.replace(/\D/g, '');
        const employeeId = regexData.substring(regexData.length - 10)
        if (employeeId[0]!== "6" || employeeId.length!==10 || employeeId.substring(1,5)!=="0000") {
            console.log("Badge error: Incorrect length, first number isn't 6, or 4 zeros are missing.")
            setSwipeState('badge fail')
            errorSound()
            return 
        }
        formRef.current.value = ""


        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json",
                        'Accept': 'application/json' },
            body: JSON.stringify({
                EventID: eventData.EventID,
                EmployeeNumber: parseInt(employeeId),
            }),
            };
        fetch('http://localhost:3500/api/checkin', requestOptions)
            .then(res => res.json())
            .then(response => {
                if(response[0]==='fail') {
                    setSwipeState("duplicate fail")
                    errorSound()
                }
                else {
                    setSwipeState("swiped")
                    successSound()
                }
            })

    }

    const statusIcon = () => {
        if(swipeState==="") return (
            <div className='flex justify-center'>
                <AiOutlineIdcard  size="250"/>
            </div>
        )       
        if(swipeState==="swiped")  return (
            <div className='flex justify-center'>
                <IoIosCheckmarkCircleOutline color='#007079' size="250"/>
            </div>
            )
        
        else return (
            <div className='flex justify-center'>
                <IoIosCloseCircleOutline color='#72253d' size="250"/>
            </div>
        )
    }

    const statusText = () => {
        if(swipeState==="") return (
            <div className='flex justify-center'>
                Waiting for swipe...
            </div>
        )       
        if(swipeState==="swiped")  return (
            <div className='flex justify-center text-jcaqua font-semibold'>
                Swipe successful!
            </div>
            )
        
        if(swipeState==="duplicate fail") return (
            <div className='flex justify-center text-jcruby font-semibold'>
                User is already checked in
            </div>
        )
        else return (
            <div className='flex justify-center text-jcruby font-semibold'>
                There was a problem with your badge
            </div>
        )
    }

  return (
<>
    <div className='flex flex-col justify-center items-center h-full w-full bg-black'>
        <div className="flex flex-col bg-jcaqua gap-4 rounded-3xl border-2 h-[98%] w-[99%]">
            <div className="flex bg-gradient-to-b from-[#00a4af] to-jcaqua text-6xl h-[20%] w-full rounded-3xl justify-center items-center font-roboto-mono">
                {eventData.EventName}
            </div>
            <div className="flex flex-col items-center justify-center gap-4 h-full w-full ">
                <div className='flex flex-col bg-white rounded-3xl p-4 h-full w-[98%] '>
                    <div className="flex flex-col h-full w-full gap-4">
                        {statusIcon()}                        

                        <div className='flex justify-center text-3xl'>
                            {statusText()}
                        </div>
                        <div className='flex justify-center font-bold text-4xl pb-4'>
                            Swipe card to check in
                        </div>

                    </div>
                    </div>
                    <div className='h-auto flex flex-col w-[98%] pb-2'>
                        <form onSubmit={handleSubmit} className="flex h-[1%] w-[1%] justify-center">
                            <input autoFocus onBlur={()=> {formRef.current.focus()}} ref={formRef} className='border w-2/3 h-[5%] opacity-0 border-black ' />
                        </form>
                        <div className='flex justify-end h-32 w-full'>

                        <button type='button' onClick={() => navigate('/events')} className='bg-jcruby border border-black self-end text-white h-1/2 w-1/6'>
                            Back
                        </button>
                    </div>
                </div>

            </div>
        </div>      
    </div>
</>    
  )
}

export default EventPage