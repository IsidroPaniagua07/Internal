import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Modal from '../../Modal/Modal'

const AddEvent = () => {

    const formatDate = (date) => {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    const [eventData, setEventData] = useState({name:'', date: formatDate(new Date()),})
    const [isOpen, setIsOpen] = useState(false)



    const handleSubmitEvent = (e) => {
        e.preventDefault()
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                EventName: eventData.name,
                EventDate: eventData.date
            }),
            };
        fetch('http://localhost:3500/api/addevent', requestOptions)
            // .then(res => res.json())
            // .then(response => console.log(response))
            
        const eventSuccessText = document.getElementById('eventText')
        eventSuccessText.textContent="Success! Event added"
        setIsOpen(false)
            
    }

    const handleInputChange = (e) => {
        const { id, value } = e.target
        setEventData({...eventData, [id]:value})
    }

    document.addEventListener('click', (event) => {
        if (event.target.id === 'portalbackground' && ( isOpen===true)) {
          setIsOpen(false)
        }
      });
  
  
     
  return (
<>
    <button onClick={() => setIsOpen(true)} className='bg-white border text-black w-1/4 h-20'>
        Add Event
    </button>

    <Modal isOpen={isOpen}>
        <div className='h-full w-full flex flex-col justify-between'>
            <div className='flex justify-center item-center text-7xl'>
                Add Event
            </div>
                <form onSubmit={handleSubmitEvent} className='flex flex-col h-3/4 justify-between items-center gap-8'>
                    <div className='flex flex-col gap w-1/2'>
                        <div className='flex gap-2 text-3xl '>
                            Name:
                            <input id='name' placeholder='Type event name here...' required autoComplete="off" onChange={handleInputChange} className='border w-full text-xl'/>
                        </div>
                        <div className='flex gap-6 text-3xl w-full'>
                            Date:
                            <TextField
                                id="date"
                                type="date"
                                fullWidth  
                                onChange={handleInputChange}
                                defaultValue={eventData.date}                                     
                                InputLabelProps={{
                                    shrink: true,

                            }}/>

                        </div>
                    </div>
                    <div className='flex justify-between h-12 w-full'>
                        <button type='submit' className='bg-jcaqua border border-black self-end text-white h-full w-1/4'>
                            Add
                        </button>
                        <button type='button' onClick={() => setIsOpen(false)} className='bg-jcruby border border-black self-end text-white h-full w-1/4'>
                            Back
                        </button>
                    </div>
                </form>

        </div>
    </Modal>






    {/* <div className='flex flex-col justify-center items-center h-full w-full bg-jcaqua'>
        <div className="flex flex-col bg-gray-300 justify-between gap-4 rounded-3xl border-2 h-[98%] w-[98%]">
            <div className="flex bg-white font-bold text-3xl h-[20%] w-full rounded-3xl justify-center items-center">
                Add Event
            </div>
            <div className="flex items-center justify-evenly gap-4 h-full w-full ">
                <div className='flex flex-col bg-white rounded-3xl p-4 h-full w-[78%] justify-start self-end'>
                <div className="flex flex-col gap-2">
                    <div>
                        <p>Name:</p> <input id='name' onChange={(e) => {handleChange(e)}} className='border border-black' />
                    </div>
                    <div>
                        <p>Date:</p>
                        <p>Month:</p> <input id='month' onChange={(e) => {handleChange(e)}} className='border border-black' />
                        <p>Day:</p> <input id='day' onChange={(e) => {handleChange(e)}} className='border border-black' />
                    </div>
                </div>
            </div>
            <div className='flex flex-col bg-white rounded-3xl h-[49%] w-[20%] p-2 gap-20 items-center self-start justify-self-center'>
                <button onClick={handleSubmitEvent} className='bg-jcruby border text-white w-2/3 h-[14%]'>
                    Add Event
                </button>
                <button onClick={() => navigate(`/events/`)} className='bg-jconyx border text-white w-2/3 h-[14%]'>
                    Back
                </button>

            </div>
        </div>
        </div>      
    </div> */}
</>
  )
}

export default AddEvent