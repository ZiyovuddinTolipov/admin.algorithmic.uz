/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { AddStudentMark } from '../../apis/apiService';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Dialog(props) {
    const [date, setDate] = useState('');
    const [savedDate, setSavedDate] = useState('');
    const [selectedRating, setSelectedRating] = useState('');
    const [comment, setComment] = useState('');
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleRatingChange = (event) => {
        setSelectedRating(event.target.value);
    };

    const handleSubmit = async () => {
        if (selectedRating) {
            const data = {
                "dailyScoringId": searchParams.get('lesson_id'),
                "studentId": searchParams.get('student_id'),
                "mark": selectedRating,
                "description": comment
            }
            try {
                const resMark = await AddStudentMark(data);
                console.log(resMark);
                setSelectedRating(null)
                setComment(null)
                resMark.status == 200 ? document.getElementById('addAttendance').close() : toast.error("Baho qo'yilmadi");
                resMark.status == 200 ? navigate(`/dashboard?school_id${searchParams.get('school_id')}&grade_id=${searchParams.get('grade_id')}`) : toast.error("Baho qo'yilmadi");
            } catch (error) {
                console.error(error);
            }
            // console.log(`Rating: ${selectedRating}, Comment: ${comment}`);
        } else {
            alert('Please select a rating.');
        }
    };

    return (
        <dialog id="addAttendance" className="modal bg-black/50 backdrop-blur-md" aria-labelledby="dialogTitle" aria-describedby="dialogDesc">
            <div className="modal-box">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 id="dialogTitle" className="my-3">Keling o`quvchilarni baholaymiz ?</h3>
                <div id="dialogDesc" className="flex gap-2 flex-col">
                    <div className="flex flex-wrap gap-3 scoring-radio">
                        <label className="btn">
                            <input
                                type="radio"
                                name="rating"
                                value="1"
                                checked={selectedRating === '1'}
                                onChange={handleRatingChange}
                                className="radio"
                            /> Kelmadi
                        </label>
                        <label className="btn btn-neutral">
                            <input
                                type="radio"
                                name="rating"
                                value="2"
                                checked={selectedRating === '2'}
                                onChange={handleRatingChange}
                                className="radio"
                            /> 0
                        </label>
                        <label className="btn btn-primary">
                            <input
                                type="radio"
                                name="rating"
                                value="3"
                                checked={selectedRating === '3'}
                                onChange={handleRatingChange}
                                className="radio"
                            /> Yahshi
                        </label>
                        <label className="btn btn-secondary">
                            <input
                                type="radio"
                                name="rating"
                                value="4"
                                checked={selectedRating === '4'}
                                onChange={handleRatingChange}
                                className="radio"
                            /> Faol
                        </label>
                        <label className="btn btn-accent">
                            <input
                                type="radio"
                                name="rating"
                                value="5"
                                checked={selectedRating === '5'}
                                onChange={handleRatingChange}
                                className="radio"
                            /> Alo
                        </label>
                    </div>
                    <label className="form-control max-w-[100%] m-1">
                        <div className="label">
                            <span className="label-text">Nega bunday baho qo`ydingiz?</span>
                        </div>
                        <input
                            type="text"
                            value={comment}
                            onChange={handleCommentChange}
                            className="input input-bordered input-primary w-full max-w-[100%]"
                            required
                        />
                    </label>
                    <button type="button" className="btn btn-active btn-info" onClick={handleSubmit}>QO'SHISH</button>
                    {savedDate && <p className="text-base">Saved Date: {savedDate}</p>}
                </div>
            </div>
        </dialog>
    );
}

export default Dialog;
