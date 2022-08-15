import { useState } from 'react'
import SearchResultsModal from './SearchResultsModal';
import SearchEventModal from './SearchEventModal';
import EditEventModal from './EditEventModal';

const EditEvent = () => {
    const [eventData, setEventData] = useState({EventName:'', Date: '',})
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [searchModalOpen, setSearchModalOpen] = useState(false)
    const [resultsModalOpen, setResultsModalOpen] = useState(false)
    const [searchResults, setSearchResults] = useState(["Loading..."])

    document.addEventListener('click', (event) => {
      if (event.target.id === 'portalbackground' && ( editModalOpen===true || resultsModalOpen===true || searchModalOpen===true)) {
        setResultsModalOpen(false)
        setSearchModalOpen(false)
        setEditModalOpen(false)
      }
    });


  return (
<>
    <button onClick={() => setSearchModalOpen(true)} className='bg-white border text-black w-1/4 h-20'>
        Edit Event
    </button>

    <EditEventModal editModalOpen={editModalOpen}
                    setEditModalOpen={setEditModalOpen}
                    eventData={eventData}
                    setEventData={setEventData}
                    setResultsModalOpen={setResultsModalOpen}
                    setSearchModalOpen={setSearchModalOpen}
    />

    <SearchEventModal   searchModalOpen={searchModalOpen}
                        setSearchModalOpen={setSearchModalOpen}
                        setResultsModalOpen={setResultsModalOpen}
                        setSearchResults={setSearchResults}
                    />

    <SearchResultsModal resultsModalOpen={resultsModalOpen}
                        setResultsModalOpen={setResultsModalOpen}
                        setEditModalOpen={setEditModalOpen}
                        setEventData={setEventData}
                        searchResults={searchResults}
                    />

</>
  )
}

export default EditEvent