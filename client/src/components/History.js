import React, { useMemo, useState, useEffect } from "react";
import io from "socket.io-client";
import Table from "./Table";

let socket;
const ENDPOINT = 'localhost:5000';

const History = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        socket = io(ENDPOINT);

        socket.emit('history');
        socket.on('printHistory', (document) => {
            const historyData = JSON.stringify(document)
            setData(document)
        })
        
    }, []);

    const columns = useMemo(
        () => [
          {
            // first group - TV Show
            Header: "Chat History",
            // First group columns
            columns: [
              {
                Header: "Name",
                accessor: "chatUsername"
              },
              {
                Header: "Room",
                accessor: "chatRoom"
              },
              {
                Header: "Message",
                accessor: "chatMessage"
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

export default History;