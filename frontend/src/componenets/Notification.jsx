import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Notification() {
  const user_name = localStorage.getItem("user_name");
  const user_email = localStorage.getItem("user_email");
  const user_role = localStorage.getItem("user_role");
  const [notification, setNotification] = useState([]);

  async function get_notification_details() {
    try {
      const res = await axios.post("http://localhost:5000/api/message/get_notification", {
        receiver: user_email,
        receiver_name: user_name,
        receiver_role: user_role,
      });
      setNotification(res.data.get_all_notifications); // array of objects
    } catch (err) {
      alert(err.message);
    }
  }

  useEffect(() => {
    get_notification_details();
  }, []);

  const uniqueNotifications = [];
  const seen = new Set();
  notification.forEach((noti) => {
    const key = `${noti.sender}-${noti.job_name}`;
    if (!seen.has(key)) {
      seen.add(key);
      uniqueNotifications.push(noti);
    }
  });

  return (
    <>
      <div className="container my-3">
        <h2 className="text-center fs-2 fw-medium">Notifications</h2>
        {uniqueNotifications.length === 0 ? (
          <p className="text-center">No notifications yet.</p>
        ) : (
          <div className="container mt-4">
            <table className="table table-bordered table-hover text-center shadow-lg">
              <thead className="table-dark">
                <tr>
                  <th>S.NO</th>
                  <th className="fs-4 fw-medium">{user_role==='worker'?(<label>client</label>):(<label>worker</label>)}</th>
                  <th>JOB NAME</th>
                  <th>Chat</th>
                </tr>
              </thead>
              <tbody>
                {uniqueNotifications.map((not, index) => (
                  <tr key={not._id}>
                    <td>{index + 1}</td>
                    <td>{not.sender_name} ({not.sender})</td>
                    <td>{not.job_name}</td>
                    <td>
                      <Link
                        to="/hire"
                        state={{
                          receiver: not.sender,
                          receiver_name: not.sender_name,
                          receiver_role: not.sender_role,
                          job_name: not.job_name,
                        }}
                        className="btn btn-success"
                      >
                        CHAT
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default Notification;
