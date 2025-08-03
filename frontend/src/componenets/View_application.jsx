import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
function View_application(){
    const location=useLocation();
    const [jobs,set_jobs]=useState([]);
    const {email,job_name}=location.state || {};
    async function view_particular_job_application() {
        try{
            const res=await axios.get(`http://localhost:5000/api/application/view_particular_job_details/${email}/${job_name}`);
            console.log(res.data.message);
            set_jobs(res.data.jobs);
        }
        catch(err){
            alert(err.message);
        }
    }
    useEffect(()=>{
        view_particular_job_application();
    },[]);

    return(
        <>
            <div className="container mt-5 shadow w-50" style={{borderRadius:"20px"}}>
                <div className="text-center">
                    <label className="form-label fs-3 fw-medium text-break text-uppercase mt-3">APPLICATION FORM OF "{jobs.name}" for job "{jobs.job_name}."</label>
                    <hr></hr>
                </div>
                <div className="container-fluid mt-3 fs-5 fw-medium">
                    <div className="row">
                        <div className="col-3">
                            <label className="form-label">Name</label>
                        </div>
                        <div className="col-1">
                            <label className="form-label">:</label>
                        </div>
                        <div className="col-8">
                            <label className="form-label text-break">{jobs.name}</label>
                        </div>
                    </div>
                     <div className="row">
                        <div className="col-3">
                            <label className="form-label">Email</label>
                        </div>
                        <div className="col-1">
                            <label className="form-label">:</label>
                        </div>
                        <div className="col-8">
                            <label className="form-label text-break">{jobs.email}</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <label className="form-label">Mobile Number</label>
                        </div>
                        <div className="col-1">
                            <label className="form-label">:</label>
                        </div>
                        <div className="col-8">
                            <label className="form-label text-break">{jobs.mobile_number}</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <label className="form-label">Job Name</label>
                        </div>
                        <div className="col-1">
                            <label className="form-label">:</label>
                        </div>
                        <div className="col-8">
                            <label className="form-label text-break">{jobs.job_name}</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <label className="form-label">Description</label>
                        </div>
                        <div className="col-1">
                            <label className="form-label">:</label>
                        </div>
                        <div className="col-8">
                            <label className="form-label text-break">{jobs.description}.</label>
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-3">
                            <label className="form-label">Location</label>
                        </div>
                        <div className="col-1">
                            <label className="form-label">:</label>
                        </div>
                        <div className="col-8">
                            <label className="form-label text-break">{jobs.street},{jobs.town},{jobs.district},{jobs.state},{jobs.pincode},{jobs.country}.</label>
                        </div>
                    </div>
                    <div className="text-center mt-2 mb-2">
                        <hr></hr>
                    <div className="row">
                        <div className="col-6">
                            <Link to='/' className="btn btn-danger">Back to Home</Link>
                        </div>
                        <div className="col-6">
                            <Link to='/hire' state={{receiver:jobs.email,receiver_name:jobs.name,receiver_role:"worker",job_name:jobs.job_name}} className="btn btn-success">HIRE</Link>
                        </div>
                    </div>
                    <div >
                        <br></br>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default View_application;