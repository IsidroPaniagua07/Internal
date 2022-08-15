import AddEvent from './EventsAdmin/AddEvent'
import EditEvent from './EventsAdmin/EditEvent/EditEvent'

const Admin = () => {
  return (
    <>
      <div className="grid grid-cols-2 grid-rows-2 h-full w-full">
        <div className='flex flex-col bg-jcaqua h-full w-full justify-start items-center gap-8'>
          <div className='flex text-6xl'>Events</div>
          <div className='flex flex-col h-full w-full justify-center'>
            <div className='flex flex-row h-full w-full justify-center items-center gap-2'>
              <AddEvent />
              <EditEvent />
            </div>
            <p id='eventText' className='self-center text-2xl'></p>
          </div>
        </div>
        <div className='flex flex-col bg-jcslate h-full w-full justify-start items-center gap-8'>
          <div className='flex text-6xl'>???</div>
          <div className='flex h-full w-full justify-center'>
            {/* <AddEvent /> */}
          </div>
        </div>
        <div className='flex flex-col bg-jcamber h-full w-full justify-start items-center gap-8'>
          <div className='flex text-6xl'>???</div>
          <div className='flex h-full w-full justify-center'>
            {/* <AddEvent /> */}
          </div>
        </div>
        <div className='flex flex-col bg-jcruby h-full w-full justify-start items-center gap-8'>
          <div className='flex text-6xl'>???</div>
          <div className='flex h-full w-full justify-center'>
            {/* <AddEvent /> */}
          </div>
        </div>


      </div>
    </>
  )
}

export default Admin


