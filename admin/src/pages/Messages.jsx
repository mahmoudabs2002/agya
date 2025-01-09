import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
// import { dataset, valueFormatter } from "../assets/data";
import { format } from "date-fns";

export default function Messages() {
  const[message , setMessage] = useState([])
  useEffect(() => {
    try {
      fetch("http://localhost:5000/api/message/all-messages", {
      }).then((response) => {
        response.json().then((data) => {
            setMessage(data.data)
        });
      });
    } catch (e) {
      console.log(e);
    }
  }, []);
  return (
    <div className=" flex justify-between">
      <Sidebar />
      <div className="flex-1 mx-[100px] py-8">
        <Navbar />
        <div>
          <div className=" my-4">
            <div className=" border-b pb-4">Messages</div>
             {
              message === undefined ? <div>Loading</div> : message.length === 0 ? <div className=" font-bold text-center my-4 text-3xl">no messages</div> :
              message.map((message)=> {
                return(
                  <div key={message._id} className="  flex items-center  border-b py-4">
                  <img
                    src={message.image === "" || message.image === undefined ?"https://via.placeholder.com/80": message.image } // Replace with the actual image URL
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className=" ml-2">
                    <h3>{message.senderName}</h3>
                    <p className="text-black/30 text-sm">{message.message}</p>
                  </div>
                  <div className="text-black/30 flex-1 text-right ">
                  {message === undefined ? null: format(message?.createdAt, "p")}
                  </div>
                </div>
                )
              })
             }
          </div>
        </div>
      </div>
    </div>
  );
}
