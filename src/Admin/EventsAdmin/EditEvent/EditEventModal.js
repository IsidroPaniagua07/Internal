import Modal from "../../../Modal/Modal"
import { TextField } from "@material-ui/core"


const EditEventModal = ({ editModalOpen, setEditModalOpen, setResultsModalOpen, eventData, setEventData, setSearchModalOpen }) => {

    const formatDate = (date) => {
        var d = new Date(date.slice(0, -1)), //Remove "Z" at the end to avoid timezone conversion
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    const handleEditEvent = (e) => {
        e.preventDefault()
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: eventData.EventID,
                name: eventData.EventName,
                date: eventData.Date,
                enabled: eventData.IsEnabled

            }),
            };
        fetch('http://localhost:3500/api/editevent', requestOptions)
            // .then(res => res.json())
            // .then(response => console.log(response))

        const eventSuccessText = document.getElementById('eventText')
        eventSuccessText.textContent=`Success! Event "${eventData.EventName}" updated`
        setEditModalOpen(false)
        setResultsModalOpen(false)
        setSearchModalOpen(false)
            
    }

    const handleInputChange = (e) => {
        const { id, value } = e.target
        setEventData({...eventData, [id]:value})
        }

  return (
<>
<Modal isOpen={editModalOpen}>
        <div className='h-full w-full flex flex-col justify-between'>
            <div className='flex justify-center item-center text-7xl'>
                Editing Event
            </div>
                <form onSubmit={handleEditEvent} className='flex flex-col h-3/4 justify-between items-center gap-8'>
                    <div className='flex flex-col gap w-1/2'>
                        <div className='flex gap-2 text-3xl '>
                            Name:
                            <input id='EventName' required defaultValue={eventData.EventName} autoComplete="off" onChange={handleInputChange} className='border w-full text-xl'/>
                        </div>
                        <div className='flex gap-6 text-3xl w-full'>
                            Date:
                            <TextField
                                id="Date"
                                type="date"
                                fullWidth    
                                onChange={handleInputChange}
                                defaultValue={formatDate(eventData.Date)}
                                InputLabelProps={{
                                    shrink: true,

                                }}/>

                        </div>
                        <div className='flex justify-between text-3xl '>
                            Enabled:
                            <select onChange={handleInputChange} defaultValue={eventData.IsEnabled} id='IsEnabled' className="text-xl border">
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                            </select>
                        </div>
                    </div>
                    <div className='flex justify-between h-12 w-full'>
                        <button type='submit' className='bg-jcaqua border border-black self-end text-white h-full w-1/4'>
                            Submit
                        </button>
                        <button type='button' onClick={() => setEditModalOpen(false)} className='bg-jcruby border border-black self-end text-white h-full w-1/4'>
                            Back
                        </button>
                    </div>
                </form>
        </div>
    </Modal>
</>
  )
}

export default EditEventModal