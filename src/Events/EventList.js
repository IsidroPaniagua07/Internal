import { useNavigate } from "react-router-dom"

const EventList = ({ eventList }) => {
  const navigate = useNavigate()

  const formatDate = (date) => {
    let d = new Date(date.slice(0, -1)),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear().toString().slice(2,4);

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;    

    return [month, day, year].join('/');
}
// Add alternating colors
  return (
<>
      {eventList.map(({ EventID, EventName, Date }, index) => {
        let style = ""
        if (index===eventList.length-1) style = {border:"none"} //Remove overlapping border on first index
        return (
          <div id={EventID} key={EventID} stlye={style} onClick={() => navigate(`/events/${EventID}`)} className="flex h-[30px] md:min-h-[10%] w-full px-2 items-center justify-between border-b
          border-black hover:bg-white text-3xl font-roboto">
              <div>
                {EventName}
              </div>
              <div>
                {formatDate(Date)}
              </div>
          </div>
              )
              })}
</>
  )
}

export default EventList