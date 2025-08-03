import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Fix_slot() {
  const location = useLocation();
  const client = localStorage.getItem('user_email');
  const { worker, worker_name, job_name } = location.state;

  const [date, setDate] = useState(new Date());
  const [slot_time, set_slot_time] = useState('');
  const [bookedSlots, setBookedSlots] = useState([]);

  const today = new Date();
  const nextMonthSameDate = new Date();
  nextMonthSameDate.setMonth(today.getMonth() + 1);

  const disableInvalidDates = ({ date }) => {
    return date < today || date > nextMonthSameDate;
  };

  const allSlots = ['9am - 12pm', '12pm - 3pm', '3pm - 6pm', '6pm - 9pm'];

  async function fetchBookedSlots(selectedDate) {
    try {
      const res = await axios.post('https://worker-client.onrender.com/api/slot/get_booked_slots', {
        worker,
        date: selectedDate.toDateString()
      });
      setBookedSlots(res.data.booked.map(slot => slot.time));
    } catch (err) {
      console.log("Error fetching booked slots:", err.message);
    }
  }

  useEffect(() => {
    fetchBookedSlots(date);
  }, [date]);

  async function send_slot_info() {
    try {
      if (date && slot_time) {
        const res = await axios.post('https://worker-client.onrender.com/api/slot/insert', {
          worker, worker_name, client, job_name,
          date: date.toDateString(), time: slot_time
        });
        toast.success(res.data.message);
        set_slot_time('');
        fetchBookedSlots(date); 
      } else {
        toast.warn("Select slot date and time");
      }
    } catch (err) {
      toast.warn(err.response?.data?.message || "Slot already booked");
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
              />
            </div>
          </div>

          <div className='col-md-6 text-start'>
            <div className='container'>
              <label className='form-label fs-4 fw-bold'>Select Slot:</label>
              {allSlots.map((slot, index) => (
                <div className='row mt-2' key={index}>
                  <div className='col-1'>
                    <input
                      type='radio'
                      name='select_slot'
                      value={slot}
                      checked={slot_time === slot}
                      onChange={(e) => set_slot_time(e.target.value)}
                      disabled={bookedSlots.includes(slot)}
                      style={{
                        backgroundColor: bookedSlots.includes(slot) ? 'yellow' : 'white'
                      }}
                    />
                  </div>
                  <div className='col-11'>
                    <label className='form-label'>{slot}</label>
                  </div>
                </div>
              ))}
              <button className='btn btn-success mt-5 btn-lg' onClick={send_slot_info}>Fix Slot</button>
            </div>
          </div>
        </div>

        <p className="mt-4 fs-5 fw-medium">Selected Date: {date.toDateString()}</p>
        {slot_time && <p className="fs-5 fw-medium">Selected Slot: {slot_time}</p>}
      </div>
      <ToastContainer position='top-right' autoClose={1500} />
    </>
  );
}

export default Fix_slot;
