const express = require('express')
const server = express()
const cors = require('cors')

const sql = require('msnodesqlv8')
require('dotenv').config()

server.use(cors())
server.use(express.json())

server.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}`)
})



server.get('/api/eventlist', (req, res) => {
    const query = "SELECT * FROM EventData WHERE IsEnabled = 1";
    sql.query(process.env.DB_CONNECTION_STRING, query, (err, rows) => {
        if(err) console.log(err)
        res.send(rows)
    });    
})
server.post('/api/searchevent', (req, res) => {
    const { SearchEventName } = req.body
    sql.open(process.env.DB_CONNECTION_STRING, function (err, conn) {
        var pm = conn.procedureMgr();
        if(err) console.log(`connection error: ${err}`)
        pm.callproc('dbo.usp_SearchEvents', [SearchEventName], function(err, results, output) {
            if (err) console.log(`proc error: ${err}`)
            res.send(results)
    });
});   
})
server.post('/api/editevent', (req, res) => {
    const { id, name, date, enabled } = req.body
    sql.open(process.env.DB_CONNECTION_STRING, function (err, conn) {
        var pm = conn.procedureMgr();
        if(err) console.log(`connection error: ${err}`)
        pm.callproc('dbo.usp_EditEvent', [id, name, date, enabled], function(err, results, output) {
            if (err) console.log(`proc error: ${err}`)
            res.send(results)
            // if(output) console.log(output)
    });
});   
})

server.get('/api/getevent/:id', (req, res) => {
    const eventId = parseInt(req.params.id)
    const query = `SELECT * FROM EventData WHERE EventID = ${eventId}`;
    sql.query(process.env.DB_CONNECTION_STRING, query, (err, rows) => {
        if(err) console.log(err)
        res.send(rows[0])
        console.log(rows)
    });    

    console.log('Event page data request')
})

server.post('/api/checkin', (req, res) => {
    const { EventID, EmployeeNumber } = req.body

    sql.open(process.env.DB_CONNECTION_STRING, function (err, conn) {
        var pm = conn.procedureMgr();
        if(err) console.log(`connection error: ${err}`)
        pm.callproc('dbo.usp_CheckInUser', [EventID, EmployeeNumber], function(err, results, output) {
        if (err) console.log(`proc error: ${err}`)
        if (output) {
            console.log(`output: ${output}`)
            if(output[0]===0) res.send(['fail'])
            else res.send(['success'])
        }
    });
});  
})


server.post('/api/addevent', (req, res) => {
    const { EventName, EventDate } = req.body
    console.log(req.body)
    const query = `INSERT INTO EventData(EventName, Date) VALUES('${EventName}', '${EventDate}')`;
    sql.query(process.env.DB_CONNECTION_STRING, query, (err, rows) => {
        if(err) console.log(err)
        if(rows) console.log(rows)
    });    
    
    res.send(['Complete'])
})

