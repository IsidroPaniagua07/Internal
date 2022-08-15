import { useState } from 'react'
import Modal from "../../../Modal/Modal"

const SearchEventModal = ({ searchModalOpen, setSearchModalOpen, setResultsModalOpen, setSearchResults }) => {
    const [searchInput, setSearchInput] = useState("")

    const handleSearchInputChange = (e) => {
        const { value } = e.target
        setSearchInput(value)
    }
    const handleSearchEvent = (e) => {
        e.preventDefault()
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                SearchEventName: searchInput,
            }),
            };
        fetch('http://localhost:3500/api/searchevent', requestOptions)
            .then(res => res.json())
            .then(response => setSearchResults(response))
        setResultsModalOpen(true)
    }


  
  return (
<>
    <Modal isOpen={searchModalOpen}>
        <div className='h-full w-full flex flex-col justify-between'>
            <div className='flex justify-center item-center text-7xl'>
                Search Event
            </div>
                <form onSubmit={handleSearchEvent} className='flex flex-col h-3/4 justify-between items-center gap-8'>
                    <div className='flex flex-col w-1/2'>
                        <div className='flex flex-col items-center gap-6 text-3xl'>
                            <input onChange={handleSearchInputChange} id='name' placeholder='Type event name here...' autoComplete="off" className='border'/>
                            <button type='submit' className='bg-jcaqua border border-black text-black w-2/3'>
                                Search
                            </button>
                        </div>
                    </div>
                    <div className='flex justify-end h-12 w-full'>
                        <button type='button' onClick={() => setSearchModalOpen(false)} className='bg-jcruby border border-black self-end text-white h-full w-1/4'>
                            Back
                        </button>
                    </div>
                </form>

        </div>
    </Modal>
</>
  )
}

export default SearchEventModal