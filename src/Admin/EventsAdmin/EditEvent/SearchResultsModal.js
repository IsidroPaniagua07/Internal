import Modal from "../../../Modal/Modal"

const SearchResultsModal = ({ resultsModalOpen, setResultsModalOpen, setEventData, searchResults, setEditModalOpen }) => {

        
    const handleSetEvent = (index) => {
        setEventData(searchResults[index])
        setEditModalOpen(true)
        console.log(searchResults[index])

    }

  return (
<>

    <Modal isOpen={resultsModalOpen}>
        <div className='h-full w-full flex flex-col justify-between'>
            <div className='flex justify-center item-center text-7xl'>
                Search Results
            </div>
                <div className='flex flex-col h-3/4 justify-between items-center gap-8'>
                    <div className='flex flex-col items-center border border-black h-full w-full text-3xl overflow-y-auto'>
                        {searchResults.map(({ EventName }, index) => {
                            if (index % 2 === 0) return (
                                <div key={index}  onClick={() => handleSetEvent(index)} className="w-full h-[10%] min-h-[30px] text-center bg-slate-300 hover:bg-jcaqua">
                                    {EventName}
                                </div>
                            )
                            else return (
                                <div key={index}  onClick={() => handleSetEvent(index)} className="w-full h-[10%] min-h-[30px] text-center bg-slate-200 hover:bg-jcaqua">
                                    {EventName}
                                </div>
                            )
                        })}
                    </div>

                    <div className='flex justify-end h-12 w-full'>
                        <button type='button' onClick={() => setResultsModalOpen(false)} className='bg-jcruby border border-black self-end text-white h-full w-1/4'>
                            Back
                        </button>
                    </div>
                </div>
        </div>
    </Modal>
</>
  )
}

export default SearchResultsModal