import { useState } from "react";
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function Applications_create(){
    const user_name=localStorage.getItem('user_name');
    const navigate=useNavigate();
    const user_email=localStorage.getItem('user_email');
    const [formData,setformdata]=useState({
        name:'',
        email:'',
        mobile_number:'',
        job_name:'',
        description:'',
        street:'',
        town:'',
        district:'',
        state:'',
        pincode:'',
        country:''
    });

    async function send_application_details(){
        if(formData.name && formData.email && formData.email && formData.mobile_number && formData.job_name && formData.description && formData.state && formData.town && formData.district && formData.pincode&& formData.state && formData.country){
            try{
                if(formData.name.trim() !== user_name.trim()){
                    alert("name did not match");
                }
                else if(formData.email !== user_email){
                    alert("email did not match");
                }
                else{
                    const res=await axios.post('https://worker-client.onrender.com/api/application/insert',
                        formData
                    )
                    console.log(res.data.message);
                    toast.success("application submitted");
                    setTimeout(()=>{
                        navigate('/');
                    },2000);

                }
            }
            catch(err){
                alert(err.message);
            }
        }
        else{
            alert('hlo')
        }
    }


    return(
        <>
            <div className="container shadow-lg mt-5 w-50 mb-5" style={{borderRadius:"20px"}}>
                <div className="text-center">
                    <label className="form-label fw-medium fs-2 mt-2">JOB APPLICATION FORM</label>
                </div>
                <div className="row mt-2">
                    <div className="col-3 mt-1">
                        <label className="form-label fw-medium fs-5" >Name:</label>
                    </div>
                    <div className="col-9 mt-1">
                        <input type="text" className="form-control" onChange={(e)=>setformdata({...formData,name:e.target.value})} placeholder="enter name as per login info"></input>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-3 mt-1">
                        <label className="form-label fw-medium fs-5">Email:</label>
                    </div>
                    <div className="col-9 mt-1">
                        <input type="email" className="form-control" onChange={(e)=>setformdata({...formData,email:e.target.value})} placeholder="enter email as per login info"></input>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-3 mt-1">
                        <label className="form-label fw-medium fs-5">Mobile Number:</label>
                    </div>
                    <div className="col-9 mt-1">
                        <input type="text" className="form-control" onChange={(e)=>setformdata({...formData,mobile_number:e.target.value})} placeholder="enter mobile number"></input>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-3 mt-1">
                        <label className="form-label fw-medium fs-5">Job Name:</label>
                    </div>
                    <div className="col-9 mt-1">
                        <input type="email" className="form-control" onChange={(e)=>setformdata({...formData,job_name:e.target.value})} placeholder="enter job name"></input>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-3 mt-1">
                        <label className="form-label fw-medium  fs-5">Description:</label>
                    </div>
                    <div className="col-9 mt-1">
                        <textarea type="email" className="form-control" onChange={(e)=>setformdata({...formData,description:e.target.value})} style={{height:"120px"}} placeholder="describe about your job or your self"></textarea>
                    </div>
                </div>
                <hr></hr>
                <div className="row mt-2">
                    <label className="form-label fs-3 fw-medium">Location Details:</label>
                </div>
                <div className="row mt-2">
                    <div className="col-3 mt-1">
                        <label className="form-label fw-medium  fs-6">Street/Colony:</label>
                    </div>
                    <div className="col-9 mt-1">
                        <input type="text" className="form-control" onChange={(e)=>setformdata({...formData,street:e.target.value})}  placeholder="enter street/colony details"></input>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-3 mt-1">
                        <label className="form-label fw-medium  fs-6">Town/City:</label>
                    </div>
                    <div className="col-9 mt-1">
                        <input type="text" className="form-control" onChange={(e)=>setformdata({...formData,town:e.target.value})}  placeholder="enter town/city details"></input>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-3 mt-1">
                        <label className="form-label fw-medium  fs-6">District:</label>
                    </div>
                    <div className="col-9 mt-1">
                        <input type="text" className="form-control" onChange={(e)=>setformdata({...formData,district:e.target.value})}  placeholder="enter District name"></input>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-3 mt-1">
                        <label className="form-label fw-medium  fs-6">State:</label>
                    </div>
                    <div className="col-9 mt-1">
                        <input type="text" className="form-control" onChange={(e)=>setformdata({...formData,state:e.target.value})}  placeholder="enter State name"></input>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-3 mt-1">
                        <label className="form-label fw-medium  fs-6">Pincode:</label>
                    </div>
                    <div className="col-9 mt-1">
                        <input type="text" className="form-control" onChange={(e)=>setformdata({...formData,pincode:e.target.value})}  placeholder="enter Pincode"></input>
                    </div>
                </div>
                <div className="row mt-2 mb-5">
                    <div className="col-3 mt-1">
                        <label className="form-label fw-medium  fs-6">Country:</label>
                    </div>
                    <div className="col-9 mt-1">
                        <input type="text" className="form-control" onChange={(e)=>setformdata({...formData,country:e.target.value})}  placeholder="enter Country"></input>
                    </div>
                </div>
                <div className="text-center">
                    <button className="btn btn-success btn-lg mb-3" onClick={send_application_details}>Submit</button>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={2000}/>
        </>
    )
}

export default Applications_create;