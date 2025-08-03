import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";

function Home() {
  const navigate = useNavigate();
  const name = localStorage.getItem('user_name');
  const role = localStorage.getItem('user_role');
  const email = localStorage.getItem('user_email');
  const [jobs, setjobs] = useState([]);
  const [display_job, set_display_job] = useState([]);
  const [searchjob, setsearchjob] = useState('');
  const [searchjob_list, set_searchjob_list] = useState([]);

  async function remove_job(remove_email, remove_job) {
    try {
      const res = await axios.delete('https://worker-client.onrender.com/api/application/delete_job', {
        data: {
          email: remove_email,
          job_name: remove_job
        }
      });
      toast.success("Job deleted");
      get_jobs();
    } catch (err) {
      console.log(err.message);
    }
  }

  async function get_jobs() {
    try {
      const res = await axios.get(`https://worker-client.onrender.com/api/application/get_jobs/${email}`);
      setjobs(res.data.jobs);
    } catch (err) {
      console.log(err.message);
    }
  }

  async function get_job_details() {
    try {
      const res = await axios.get('https://worker-client.onrender.com/api/application/display_jobs');
      set_display_job(res.data.jobs);
    } catch (err) {
      console.log(err.message);
    }
  }

  async function search_job() {
    try {
      if (searchjob.trim() === '') {
        set_searchjob_list([]);
        return;
      }
      const res = await axios.get(`https://worker-client.onrender.com/api/application/job/${searchjob}`);
      set_searchjob_list(res.data.job_list);
    } catch (err) {
      alert(err.message);
    }
  }

  useEffect(() => {
    if (role === 'worker') {
      get_jobs();
    } else {
      get_job_details();
    }
  }, []);

  return (
    <>
      {name && email ? (
        role === 'worker' ? (
          <>
            <div className="container-fluid">
              <div className="text-end mt-3">
                <div className="row">
                  <div className="col-8">
                    <label className="form-label fs-1 fw-medium text-uppercase">Hi... {role} {name}</label>
                  </div>
                  <div className="col-4">
                    <Link to='/application_create' className="btn btn-success ms-3">Apply Job</Link>
                  </div>
                </div>
              </div>
            </div>

            {jobs.length === 0 ? (
              <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
                <h1 className="fs-1 fw-bold">Haven't applied any job? <Link className="text-decoration-none" to='/application_create'>Apply Job</Link></h1>
              </div>
            ) : (
              <>
                <h2 className="fs-2 fw-medium ms-3">List Of Jobs Applied:</h2>
                <div className="container mt-4">
                  <table className="table table-bordered table-hover text-center shadow-lg">
                    <thead className="table-dark">
                      <tr>
                        <th>S.NO</th>
                        <th>Name</th>
                        <th>Job Name</th>
                        <th>Mobile Number</th>
                        <th>Email</th>
                        <th>Location</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {jobs.map((job, index) => (
                        <tr key={job._id}>
                          <td>{index + 1}</td>
                          <td>{job.name}</td>
                          <td>{job.job_name}</td>
                          <td>{job.mobile_number}</td>
                          <td>{job.email}</td>
                          <td>{job.street}, {job.town}, {job.district}, {job.state}</td>
                          <td>
                            <button onClick={() => remove_job(job.email, job.job_name)} className="btn btn-danger">X</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <div className="container">
              <div className="text-center mt-3">
                <label className="form-label fs-1 fw-medium text-uppercase">Hi... {name}</label>
              </div>
              <div className="d-flex justify-content-center">
                <div className="row mt-3 w-75">
                  <div className="col-10">
                    <input
                      type="text"
                      className="form-control border-dark"
                      value={searchjob}
                      onChange={(e) => {
                        setsearchjob(e.target.value);
                        if (e.target.value.trim() === '') set_searchjob_list([]);
                      }}
                      placeholder="Search for workers here by job name..."
                    />
                  </div>
                  <div className="col-2">
                    <button className="btn btn-dark" onClick={search_job}>Search</button>
                  </div>
                </div>
              </div>

              <div className="container mt-3">
                <div className="text-start mt-4">
                  <label className="form-label fs-2 fw-medium text-uppercase mb-3">List of Jobs:</label>
                </div>
                <div className="row">
                  {(searchjob_list.length > 0 ? searchjob_list : display_job).map((job, index) => (
                    <div className="col-md-4 mb-3 mt-3" key={index}>
                      <div className="card" style={{ width: "100%" }}>
                        <div className="card-body">
                          <h4 className="card-title fw-bold">Job Name: {job.job_name}</h4>
                          <hr />
                          <label className="form-label mt-2" style={{ color: 'black' }}>Personal Details:</label>
                          <div className="row mt-1 ps-3">Name: {job.name}</div>
                          <div className="row mt-1 ps-3">Mobile Number: {job.mobile_number}</div>
                          <div className="row ps-3 mt-1">Email: {job.email}</div>
                          <hr />
                          <h6 className="card-text">
                            Location: {job.street}, {job.town}, {job.district}, {job.state}, {job.country}, {job.pincode}
                          </h6>
                          <hr />
                          <Link to='/view_application' state={{ email: job.email, job_name: job.job_name }} className="btn btn-info me-3">View Full Details</Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )
      ) : (
        <div className="container">
          <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
            <label className="form-label fs-2 fw-bold">PLEASE LOGIN FIRST</label>
            <Link to='/login' className="text-decoration-none fs-2 fw-bold ps-2">LOGIN</Link>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default Home;
