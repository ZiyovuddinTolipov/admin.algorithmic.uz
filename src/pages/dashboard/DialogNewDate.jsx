/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useSearchParams } from "react-router-dom";
import { AddDialogNewDate } from '../../apis/apiService';
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
function Dialog() {
    const [searchParams] = useSearchParams();
    const [date, setDate] = useState('');
    const [topic, setTopic] = useState('');
    const navigate = useNavigate();


    const saveDate = async (event) => {
        event.preventDefault(); // Prevent form submission
        const dataToSave = {
            "date": new Date(date).toISOString(), // Convert date to ISO format
            "topic": topic,
            "gradeId": searchParams.get('grade_id')
        };
        try {
            const res = await AddDialogNewDate(dataToSave);
            console.log(res);
            localStorage.setItem('last_updated_lesson', res.data);
            toast.success("Mavzu qo'shildi!");
            res.data.status == 200 && window.location.reload();
            if(res.status == 200) {
                navigate(`/dashboard?school_id=${searchParams.get('school_id')}&grade_id=${searchParams.get('grade_id')}&test=test`);
                document.getElementById('addColumn').close()
            }
        } catch (error) {
            console.log(error);
        }
        // console.log(dataToSave);
        // alert('Date and topic saved successfully!');
    }

    const handleDateChange = (event) => {
        setDate(event.target.value);
    }
    const currentDate = new Date();
    const nextMonthDate = new Date();
    nextMonthDate.setMonth(currentDate.getMonth() + 1);

    const handleTopicChange = (event) => {
        setTopic(event.target.value);
    }

    return (
        <dialog id="addColumn" className="modal z-1 bg-black/50 backdrop-blur-md">
            <div className="modal-box">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                {/* <h3 className="font-bold text-lg">{props.data.fullName}</h3> */}
                <h3 className='my-3'>Assalomu Aleykum bugun qanday mavzu o`tamiz ?</h3>
                <form className='flex gap-2 flex-col' onSubmit={saveDate}>
                    <label className="form-control max-w-[100%] m-1">
                        <div className="label">
                            <span className="label-text">Sana oy/kun/yil</span>
                        </div>
                        <input
                            type="datetime-local"
                            value={date}
                            min={new Date().toISOString().slice(0, 16)}
                            max={nextMonthDate.toISOString().slice(0, 16)}
                            onChange={handleDateChange}
                            className='input input-bordered input-primary w-full max-w-[100%] text-blue-600'
                        />
                    </label>
                    <label className="form-control max-w-[100%] m-1">
                        <div className="label">
                            <span className="label-text">Dars mavzusi</span>
                        </div>
                        <textarea
                            placeholder="JavaScript Top"
                            value={topic}
                            onChange={handleTopicChange}
                            className="textarea textarea-bordered textarea-xs w-full max-w-[100%] text-blue-600"
                        ></textarea>
                    </label>
                    <button type='submit' className='btn btn-active btn-primary'>QO`SHISH</button>
                </form>
            </div>
        </dialog>
    );
}

export default Dialog;
