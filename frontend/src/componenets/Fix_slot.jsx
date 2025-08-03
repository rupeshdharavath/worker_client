import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import {ToastContainer,toast} from 'react-toastify';

function Fix_slot() {
  const location=useLocation();
  const client=localStorage.getItem('user_email');
  const {worker,worker_name,job_name}=location.state;
  const [date, setDate] = useState(new Date());
  const [slot_time, set_slot_time] = useState('');

  const today = new Date();
  const nextMonthSameDate = new Date();
  nextMonthSameDate.setMonth(today.getMonth() + 1);

  const disableInvalidDates = ({ date }) => {
    return date < today || date > nextMonthSameDate;
  };
  async function send_slot_info() {
    try{
      if(date && slot_time){
        const res=await axios.post('http://localhost:5000/api/slot/insert',{
          worker,worker_name,client,job_name,date,time:slot_time
        })
        toast.success(res.data.message);
      }
      else{
        toast.warn("select slot data and time");
      }
    }
    catch(err){
      toast.warn("slot already booked by others");
    }
  }

  return (
    <>
      <div className='text-center mt-3'>
        <label className='form-label fs-2 fw-medium'>Select Slot to Hire Worker For Job</label>
      </div>

      <div className="text-center mt-4">
        <div className='row'>
          <div className='col-md-6 text-end'>
            <div className="mt-4 d-flex justify-content-center">
              <Calendar
                onChange={setDate}
                value={date}
                tileDisabled={disableInvalidDates}
                style={{color:"red"}}
              />
            </div>
          </div>

          <div className='col-md-6 text-start'>
            <div className='container'>
              <label className='form-label fs-4 fw-bold'>Select Slot:</label>
              {[
                '9am - 12pm',
                '12pm - 3pm',
                '3pm - 6pm',
                '6pm - 9pm',
              ].map((slot, index) => (
                <div className='row mt-2' key={index}>
                  <div className='col-1'>
                    <input
                      type='radio'
                      name='select_slot'
                      value={slot}
                      checked={slot_time === slot}
                      onChange={(e) => set_slot_time(e.target.value)}
                    />
                  </div>
                  <div className='col-11'>
                    <label className='form-label'>{slot}</label>
                  </div>
                </div>
              ))}
              <button className='btn btn-success mt-5 btn-lg' onClick={send_slot_info}>fix slot</button>
            </div>
          </div>
        </div>

        <p className="mt-4 fs-5 fw-medium">Selected Date: {date.toDateString()}</p>
        {slot_time && <p className="fs-5 fw-medium">Selected Slot: {slot_time}</p>}
      </div>
      <ToastContainer position='top-right' autoClose={1500}/>
    </>
  );
}

export default Fix_slot;
