
import React, { useEffect, useState } from "react";
import { useFetchTicket } from "./useFetchTicket";


//const token = localStorage.getItem("jwtToken");

const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJBRE1JTiJdLCJzdWIiOiJzdHJpbmciLCJpYXQiOjE3MjI0NTgwMTcsImV4cCI6MTcyMjU0NDQxN30.uEHbllEPj5HGTLBgleplpQiQ1SWiA_pN2kcOSbsYp18";

//second parameter for setting header
const option = {
  // method
  method: "GET",
  // header
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

const URLS = {
  TICKETS: "http://localhost:8080/api/v1/ticket/get-ticket/created-under/1",
};

const INTIAL_TICKET_OBJ = {
    ticketId : 0,
    ticketStatus : "",

}

const Notification = () => {
  const [url, setUrl] = useState(URLS.TICKETS);

  const { data, isLoading, isError } = useFetchTicket(url, option);

  const [ticketList, setticketList] = useState([])

  useEffect(()=>{
    console.log(isError)



}, [data])

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <img src={``}/>
      <div></div>
    </div>
  );
};

export default Notification;
