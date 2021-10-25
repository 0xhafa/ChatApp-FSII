import React, { useMemo, useState, useEffect } from "react";
import io from "socket.io-client";
import Table from "./Table";

let socket;
const ENDPOINT = 'localhost:5000';

const Log = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        socket = io(ENDPOINT);

        socket.emit('log');
        socket.on('printLog', (document) => {
            const historyData = JSON.stringify(document)
            setData(document)
        })
        
    }, []);

    const columns = useMemo(
        () => [
          {
            // first group - TV Show
            Header: "Log History",
            // First group columns
            columns: [
              {
                Header: "Event Name",
                accessor: "eventName"
              },
              {
                Header: "Event Owner",
                accessor: "eventOwner"
              },
              {
                Header: "Description",
                accessor: "eventDesc"
              },
              {
                Header: "Datetime",
                accessor: "createdAt"
              }
            ]
          }
        ],
        []
      ); 

    return (  
        <div>
            <Table columns={columns} data={data}/>
        </div>
    ); 
}

export default Log;