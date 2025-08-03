import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
    const navigate = useNavigate();
    const name = localStorage.getItem('user_name');
    const role = localStorage.getItem('user_role');
    const email = localStorage.getItem('user_email');
    const [slots, setslots] = useState([]);

    function logout() {
        localStorage.removeItem('user_name');
        localStorage.removeItem('user_email');
        localStorage.removeItem('user_role');
        toast.warn("Logging out...");
        setTimeout(() => {
            navigate('/login');
        }, 2000);
    }

    async function get_slot_details() {
        try {
            const res = await axios.post('http://localhost:5000/api/slot/get_profile_details', {
                client: email
            });
            setslots(res.data.applied_slot);
        } catch (err) {
            console.log(err.message);
        }
    }

    async function delete_slot(id) {
        try {
            const res = await axios.delete('http://localhost:5000/api/slot/delete', {
                data: {
                    _id: id
                }
            });
            console.log(res.data.message);
            get_slot_details();
        } catch (err) {
            alert(err.message);
        }
    }

    useEffect(() => {
        if (role === 'client') {
            get_slot_details();
        }
    }, [role]);

    return (
        <>
            {name && email && (
                <div className="container-fluid mt-3">
                    <div className="text-center">
                        <div className="row">
                            <div className="col-11 ps-5">
                                <label className="form-label fw-bold fs-2">Hi... {name}</label>
                            </div>
                            <div className="col-1">
                                <button className="btn btn-danger" onClick={logout}>LOGOUT</button>
                            </div>
                        </div>
                    </div>

                    <div className="container mt-3 w-50 shadow-lg" style={{ border: "2px solid black", borderRadius: "20px" }}>
                        <div className="text-center">
                            <label className="fs-4 fw-medium mt-3">Profile Details</label>
                        </div>
                        <div className="row mt-3 fw-medium">
                            <hr />
                            <div className="col-4">
                                <label className="form-label">NAME:</label>
                            </div>
                            <div className="col-4">
                                <label className="form-label">{name}</label>
                            </div>
                        </div>
                        <div className="row mt-3 fw-medium">
                            <hr />
                            <div className="col-4">
                                <label className="form-label">EMAIL:</label>
                            </div>
                            <div className="col-4">
                                <label className="form-label">{email}</label>
                            </div>
                        </div>
                        <div className="row mt-3 fw-medium mb-3">
                            <hr />
                            <div className="col-4">
                                <label className="form-label">ROLE:</label>
                            </div>
                            <div className="col-4">
                                <label className="form-label">{role}</label>
                            </div>
                        </div>
                        <div className="text-center mb-3">
                            <hr />
                            <Link to={'/'} className="btn btn-dark hover">Home page</Link>
                        </div>
                    </div>

                    <div className="container w-75 mt-3">
                        {slots.length === 0 ? (
                            <h3 className="text-center">You haven't hired any worker yet.</h3>
                        ) : (
                            <table className="table table-bordered table-hover text-center shadow-lg text-uppercase">
                                <thead className="fw-medium">
                                    <tr>
                                        <th>S.No</th>
                                        <th>Worker Name</th>
                                        <th>Job Name</th>
                                        <th>Scheduled Day</th>
                                        <th>Time</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {slots.map((slot, index) => (
                                        <tr key={slot._id}>
                                            <td>{index + 1}</td>
                                            <td>{slot.worker_name}, {slot.worker}</td>
                                            <td>{slot.job_name}</td>
                                            <td>{slot.date}</td>
                                            <td>{slot.time}</td>
                                            <td>
                                                <button
                                                    onClick={() => delete_slot(slot._id)}
                                                    className="btn btn-danger"
                                                >
                                                    X
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>

                    <ToastContainer position="top-right" autoClose={2000} />
                </div>
            )}

            {!name && !email && (
                <div className="container">
                    <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
                        <label className="form-label fs-2 fw-bold">PLEASE LOGIN FIRST?</label>
                        <Link to={'/login'} className="text-decoration-none fs-2 fw-bold ps-2">LOGIN</Link>
                    </div>
                </div>
            )}
        </>
    );
}

export default Profile;
