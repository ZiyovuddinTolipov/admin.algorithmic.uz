/* eslint-disable react/prop-types */
import DialogNewDate from './DialogNewDate';
import DialogMark from './DialogMark';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { getStudentsByClass, getDailyProcessByGrade, getStudentScoreByID } from '../../apis/apiService';
import { Link, useSearchParams } from 'react-router-dom';

function Mark(props) {
    // console.log(typeof props.score)
    const style = {
        buttons: 'btn btn-sm w-full h-[100%] rounded-none'
    }
    // let props = props;
    const returnColor = (props) => {
        if (props.score == 1) {
            return 'btn'
        } else if (props.score == 2) {
            return 'btn-neutral'
        } else if (props.score == 3) {
            return 'btn-primary'
        } else if (props.score == 4) {
            return 'btn-secondary'
        } else {
            return 'btn-accent'
        }
    }
    return <button className={`${style.buttons} ${returnColor(props)}`} >{props.comment}</button>
}
function StudentList(props) {
    const [searchParams] = useSearchParams();
    const [studentsList, setStudentList] = useState([]);
    const [dailyScorings, setDailyScorings] = useState([]);
    const [studentScores, setStudentScores] = useState({});

    const addMark = (id) => {
        document.getElementById(id).showModal();
    };

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const res = await getStudentsByClass(props.gradeId);
                setStudentList(res.data);
            } catch (error) {
                toast.error("Failed to fetch students: " + error.message);
                console.error('Error fetching student data:', error);
            }
        };

        const fetchDailyProcessByGrade = async () => {
            const data = {
                gradeId: searchParams.get('grade_id'),
                pageSize: 10,
                pageNumber: 1
            };
            try {
                const res = await getDailyProcessByGrade(data);
                setDailyScorings(res.data.dailyScorings);
            } catch (error) {
                toast.error("Failed to fetch daily process: " + error.message);
                console.error('Error fetching daily process data:', error);
            }
        };

        fetchStudents();
        fetchDailyProcessByGrade();
    }, [searchParams, props.gradeId]);

    useEffect(() => {
        const fetchAllScores = async () => {
            const scores = {};
            for (const student of studentsList) {
                for (const scoring of dailyScorings) {
                    const score = await fetchStudentScoreById(student.id, scoring.id);
                    if (!scores[student.id]) {
                        scores[student.id] = {};
                    }
                    scores[student.id][scoring.id] = score;
                }
            }
            setStudentScores(scores);
        };

        const fetchStudentScoreById = async (studentId, themeId) => {
            const data = {
                studentId: studentId,
                themeId: themeId
            };
            try {
                const res = await getStudentScoreByID(data);
                if (res.status === 204 || !res.data) {
                    return null;
                } else {
                    return res.data.mark;
                }
            } catch (error) {
                console.error('Error fetching student score:', error);
                return null;
            }
        };

        if (studentsList.length > 0 && dailyScorings.length > 0) {
            fetchAllScores();
        }
    }, [studentsList, dailyScorings]);

    const sty = {
        th1: "px-6 py-1 font-medium whitespace-nowrap text-white bg-black max-w-[70px]"
    };

    return (
        <table className='table-students-mark text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 min-w-[100%] h-auto'>
            <thead>
                <tr>
                    <th className={sty.th1}>NO</th>
                    <th className={sty.th1} style={{ position: 'sticky', left: 0, zIndex: 1 }}>Ism Familiya</th>
                    {dailyScorings.map(item => (
                        <td key={item.id}>{new Date(item.date).toLocaleString()} {item.theme}</td>
                    ))}
                    <th
                        className='px-6 py-1 font-medium whitespace-nowrap text-white bg-blue-800/50 cursor-pointer'
                        style={{ position: 'sticky', left: 120, zIndex: 1 }}
                        onClick={() => addMark('addColumn')}>
                        <span>+</span>
                        <DialogNewDate />
                    </th>
                </tr>
            </thead>
            <tbody>
                {studentsList.map((student, index) => (
                    <tr className='border-b bg-gray-800 border-gray-700' key={index}>
                        <td className='px-6 py-1 bg-black text-white max-w-[100px]'>{index + 1}</td>
                        <td className='px-6 py-1 bg-black text-white'>{student.fullName}</td>
                        {dailyScorings.map((item, index) => (
                            <td key={index}
                                onClick={() => addMark('addAttendance')}
                                className='p-0'>
                                {
                                    studentScores[student.id]?.[item.id] ? <Mark score={studentScores[student.id]?.[item.id]} /> :
                                        <Link to={`/?school_id=${searchParams.get('school_id')}&grade_id=${searchParams.get("grade_id")}&lesson_id=${item.id}&student_id=${student.id}`} className='px-6 py-1 m-0 w-[100%] h-full bg-blue-800 cursor-pointer font-bold text-xl text-white'>
                                            <span>+</span>
                                        </Link>
                                }
                                <DialogMark />
                            </td>
                        ))}
                        <td className='px-6 py-1 bg-blue-800/50 cursor-pointer font-bold text-xl text-white'>
                            <span>+</span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default StudentList;
