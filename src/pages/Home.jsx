
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import Navbar from './NavbarAdmin'
import AllDocs from './AllDocs';
import { FaAddressBook, FaFile, FaRegNewspaper, FaTable, FaArrowLeft, FaUser, FaFileArchive } from "react-icons/fa";
import AllCertificate from './AllCertificate';
import AllGrades from './AllGrades';
import { useEffect } from 'react';

const Home = () => {
    const navigate = useNavigate();

    const sty = {
        listElement: "flex items-center gap-2 px-3 py-2 bg-admin-100 hover:bg-admin-300 transition rounded-md text-admin-900",
        select: "bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
        label: "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    }
    const userIsInactive = () => {
        return localStorage.getItem("user_jwt") ? '' : navigate('/login');
    }
    useEffect(() => {
    }, [userIsInactive])
    return (
        <main className="w-[100%] min-h-[100vh] bg-admin-100 relative admin-dashboard">

            <Navbar />
            <section className="flex">
                <div className="custom-scrollbar sticky inset-x-0 top-0 flex h-screen flex-col justify-between overflow-y-auto p-6 pt-32  lg:w-[300px] bg-admin-50">
                    <ul className="flex  flex-col gap-2 text-white font-semibold w-[200px]">
                        <Link to='' className={sty.listElement} ><FaTable /> <span>Baholar</span></Link>
                        <Link to='all-certificate' className={sty.listElement} ><FaFile /> <span>Sertifikatlar</span></Link>
                        <Link to='all-files' className={sty.listElement} ><FaFileArchive /><span>Hujjatlar</span></Link>
                        <Link to='add-new-election' className={sty.listElement} ><FaRegNewspaper /><span>Tanlov yaratish</span></Link>
                        <Link to='all-workers' className={sty.listElement} ><FaUser /><span>Ishchilar</span></Link>
                    </ul>
                    <ul className="flex  flex-col gap-2 text-white font-semibold">
                        <Link to='add-new-user' className='px-3 py-2 bg-blue-500 hover:bg-blue-600 transition rounded-md w-[200px] flex justify-between items-center' ><span>New User</span> <FaAddressBook /></Link>
                        <Link to="/" className='px-3 py-2 bg-red-500 hover:bg-red-600 transition rounded-md w-[200px] flex justify-between items-center' ><span>Chiqish</span> <FaArrowLeft size={23} /></Link>
                    </ul>
                </div>
                <div className="flex min-h-screen flex-1 flex-col px-4 pb-6 pt-20 md:pt-32  max-md:pb-14 sm:px-14">
                    <Routes >
                        <Route path="/all-files" element={<AllDocs />} />
                        <Route path="/all-certificate" element={<AllCertificate />} />
                        <Route path="" element={<AllGrades />} />

                    </Routes>

                    {/* <AddCourse /> */}
                    {/* <Course /> */}
                </div>
            </section>
        </main>
    )
}

export default Home