import { useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {ToastContainer ,toast} from 'react-toastify';

function Signup(){
    const [name,setname]=useState('');
    const [email,setemail]=useState('');
    const [pass,setpass]=useState('');
    const [confpass,setconfpass]=useState('');
    const [role,setrole]=useState('');
    const navigate=useNavigate();
    async function send_details(){
        if(name && email && pass && confpass && role){
            if(pass === confpass){
                try{
                    const res=await axios.post('http://localhost:5000/api/auth/signup',{
                    name,email,password:pass,role
                })
                console.log(res.data.message);
                toast.success("sign up succesfull");
                setTimeout(()=>{
                    navigate('/login');
                },2000);
                }
                catch(err){
                    console.log(err.message);
                }   
            }
            else{
                alert("password missmatch");
            }
        }
        else{
            alert("please fill all areas");
        }
    }
    function handle_role(e){
        setrole(e.target.value);
    }
    return(
        <>
             <div className="container w-50 mt-5">
                <label className="form-label fw-bold fs-2">Sign up</label>
                <input type="text" className="form-control mt-2" placeholder="enter name" onChange={(e)=>setname(e.target.value)}/>
                <input type="email" className="form-control mt-2" placeholder="enter email" onChange={(e)=>setemail(e.target.value)}/>
                <input type="password" className="form-control mt-2" placeholder="enter password" onChange={(e)=>setpass(e.target.value)}/>
                <input type="password" className="form-control mt-2" placeholder="confirm password" onChange={(e)=>setconfpass(e.target.value)}/>
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
                    <button className="btn btn-success mt-2" onClick={send_details}>Sign up</button>
                </div>
                <div className=" d-flex justify-content-center mt-2">
                    <label className="form-label fw-medium">already have an account?</label>
                    <Link to='/login' className="text-decoration-none">login</Link>
                </div>
                <ToastContainer position='top-right' autoClose={2000}/>
            </div>
        </>
    )
}

export default Signup;