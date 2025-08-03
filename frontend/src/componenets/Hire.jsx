import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

function Hire() {
  const location = useLocation();
  const { receiver, receiver_name, receiver_role, job_name } = location.state || {};

  const sender = localStorage.getItem('user_email');
  const sender_role = localStorage.getItem('user_role');
  const sender_name = localStorage.getItem('user_name');

  const [msg_sent, setmsg_sent] = useState('');
  const [pre_msg, set_pre_msg] = useState([]);

  async function send_message() {
    try {
      const res = await axios.post('http://localhost:5000/api/message/insert', {
        sender,
        receiver,
        sender_role,
        receiver_role,
        sender_name,
        receiver_name,
        job_name,
        msg_sent
      });
      console.log(res.data.message);
      setmsg_sent('');
      get_msgs(); 
    } catch (err) {
      alert(err.message);
    }
  }


  async function get_msgs() {
    try {
      const res = await axios.post('http://localhost:5000/api/message/get_messages', {
        sender,
        receiver,
        job_name
      });
      console.log(res.data.message);
      set_pre_msg(res.data.all_msgs);
    } catch (err) {
      alert(err.message);
    }
  }

  useEffect(() => {
    get_msgs();
  }, []);

  return (
    <>
      <div className="container mt-3">
        <div className="text-center">
          <label className="form-label fs-2 fw-medium text-uppercase">
            chat with {sender_role === 'client' ? receiver_name : sender_name}
          </label>
        </div>

        <div className="container mt-3 w-50 shadow-lg pt-2 pb-2" style={{ borderRadius: "20px", backgroundColor: "aqua" }}>
          <div className="container-fluid mt-2 p-2" style={{ borderRadius: "20px", backgroundColor: "white" }}>
            <div className="row">
              <div className="col-10">
                <label className="form-label fs-3 fw-medium">
                  {sender_role === 'client' ? receiver_name : sender_name}
                </label>
              </div>
              <div className="col-2 text-end">
                {sender_role === 'client' &&
                  <Link to='/fix_slot' state={{worker:receiver,worker_name:receiver_name,job_name}} className="btn btn-info" >Fix Slot</Link>
                }
              </div>
            </div>
          </div>

          <div
            className="container-fluid mt-2 p-3 fs-3"
            style={{ borderRadius: "20px", backgroundColor: "white", height: '350px', overflowY: 'auto' }}
          >
            {pre_msg.map((msg, index) => (
              <div key={index} className={`d-flex ${msg.sender === sender ? 'justify-content-end' : 'justify-content-start'}`}>
                <span className={`badge ${msg.sender === sender ? 'bg-black' : 'bg-secondary'} mb-1`}>
                  {msg.msg_sent}
                </span>
              </div>
            ))}
          </div>

          <div className="container-fluid d-flex justify-content-start mt-2">
            <input
              type="text"
              className="form-control"
              value={msg_sent}
              onChange={(e) => setmsg_sent(e.target.value)}
              placeholder="Enter message here"
            />
            <button className="btn btn-success ms-2" onClick={send_message}>Send</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hire;
