import { useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {ToastContainer ,toast} from 'react-toastify';

function Login(){
    const [email,setemail]=useState('');
    const [pass,setpass]=useState('');
    const navigate=useNavigate();
    const [role,setrole]=useState('');
    async function send_details(){
        if( email && pass && role){
            try{
                    const res=await axios.post('https://worker-client.onrender.com/api/auth/login',{
                    email,password:pass,role
                })
                toast.warn(res.data.message);
                toast.success("log in succesfull");
                localStorage.setItem("user_name",res.data.name);
                localStorage.setItem("user_email",res.data.email);
                localStorage.setItem("user_role",res.data.role);
                setTimeout(()=>{
                    navigate('/');
                },2000);
                }
                catch(err){
                    console.log(err.message);
                }   
        }
        else{
            toast.warn("please fill all areas");
        }
    }
    function handle_role(e){
        setrole(e.target.value);
    }
    return(
        <>
             <div className="container w-50 mt-5">
                <label className="form-label fw-bold fs-2">Log in</label>
                <input type="email" className="form-control mt-2" placeholder="enter email" onChange={(e)=>setemail(e.target.value)}/>
                <input type="password" className="form-control mt-2" placeholder="enter password" onChange={(e)=>setpass(e.target.value)}/>
                <div className='container m-3'>
                    <div className='row'>
                        <div className='col-1 text-end'>
                            <input type='radio' className='m-2' value='client' onChange={handle_role} name='role'></input>
                        </div>
                        <div className='col-5 text-start'>
                            <label className='form-label fw-medium'>client</label>
                        </div>
                        <div className='col-1 text-end'>
                            <input type='radio' className='m-2' value='worker' onChange={handle_role} name="role"></input>
                        </div>
                        <div className='col-5 text-start'>
                            <label className='form-label text-start fw-medium'>worker</label>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <button className="btn btn-success mt-2" onClick={send_details}>login</button>
                </div>
                <div className=" d-flex justify-content-center mt-2">
                    <label className="form-label fw-medium">dont have an account?</label>
                    <Link to='/signup' className="text-decoration-none">signup</Link>
                </div>
                <ToastContainer position='top-right' autoClose={2000}/>
            </div>
        </>
    )
}

export default Login;