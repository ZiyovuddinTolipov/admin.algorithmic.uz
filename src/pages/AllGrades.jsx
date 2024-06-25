import { useState, useEffect } from 'react';
import {fetchSchools, fetchClassesBySchoolId } from '../apis/apiService'
import { useNavigate } from "react-router-dom";
import TableMark from './dashboard/TableMark';

const AllGrades = () => {
    const [schoolId, setSchoolId] = useState('')
    const [schools, setSchools] = useState([]);
    const [selectedSchoolId, setSelectedSchoolId] = useState('');
    const [classes, setClasses] = useState([]);
    const [selectedClassId, setSelectedClassId] = useState('');
    const [isSchoolSelected, setIsSchoolSelected] = useState(false);
    const [isClassSelected, setIsClassSelected] = useState(false);


    const navigate = useNavigate();

    // const userIsInactive = () => {
    //     return localStorage.getItem("user_jwt") ? '' : navigate('/login');
    // }
    // console.log(localStorage.getItem("user_jwt").length);
    useEffect(() => {
        fetchSchools().then((data) => setSchools(data));

    }, []);

    const handleSchoolChange = (event) => {
        setSelectedSchoolId(event.target.value);
        setSchoolId(event.target.value);
        navigate(`?school_id=&${event.target.value}`);
        localStorage.setItem('last_school_id', event.target.value);
        setIsSchoolSelected(true);
        fetchClassesBySchoolId(event.target.value).then((data) => setClasses(data));
    };

    const handleClassChange = (event) => {
        setSelectedClassId(event.target.value);
        // searchParams.get('school_id')
        navigate(`?school_id=${schoolId}&grade_id=${event.target.value}`);
        localStorage.setItem('last_grade_id', event.target.value);
        setIsClassSelected(true);
    };
    const sty = {
        select: "bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
        label: "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    }
    return (
        <div className='backdrop-blur-xl bg-black/80 my-2 rounded-xl min-h-[400px] h-auto px-4 py-2'>
        <form className='flex gap-3 border-b-[1px] border-b-gray-900 relative' >
            <div>
                <label htmlFor="school" className={sty.label}>O`qish joyini tanlash</label>
                <select id="school" value={selectedSchoolId} onChange={handleSchoolChange} className={sty.select} >
                    {/* {searchParams("school_id")?console.log("hello")} */}
                    <option selected aria-selected hidden>O`qish joyi</option>
                    {schools.map((school) => (
                        <option key={school.id} value={school.id} >
                            {school.name}
                        </option>
                    ))}
                </select>
            </div>
            {isSchoolSelected && (
                <div>
                    <label htmlFor="default" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Guruhni tanlash</label>
                    <select value={selectedClassId} onChange={handleClassChange} className={sty.select}>
                        <option selected aria-selected hidden >Guruhni tanlang</option>
                        {classes.map((grade) => (
                            <option key={grade.id} value={grade.id}>
                                {grade.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            {/* <div className='absolute right-0 top-[30%] btn btn-info'>
            O'quvchi qo'shish
        </div> */}
        </form>
        <div className={`flex py-2 ${isClassSelected ? "table-scroll" : ""}`}>
            {
                isClassSelected ?
                    <TableMark schoolId={selectedSchoolId} gradeId={selectedClassId} /> :
                    <h1 className='text-white text-4xl font-semibold text-center w-full mt-5'>Hozircha hech narsa!</h1>
            }
        </div>
    </div>
    )
}

export default AllGrades