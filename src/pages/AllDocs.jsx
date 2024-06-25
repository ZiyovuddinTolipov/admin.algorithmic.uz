/* eslint-disable react/no-unescaped-entities */
import { FiDownload } from 'react-icons/fi';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useState, useEffect } from 'react';
import axios from "axios";
import { toast } from 'react-hot-toast';

const AllDocs = () => {
    const [documents, setDocuments] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('https://jsonplaceholder.typicode.com/photos');
                setDocuments(res.data);
                console.log(res.data);
            } catch (error) {
                toast.error("Failed to fetch documents: " + error.message);
                console.error('Error fetching documents:', error);
            }
        }
        fetchData();
    }, []);
    const handleDownload = (url) => {
        if (url) {
            toast.success('Yuklab olish boshlandi!');
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = url;
            anchor.click();
        } else {
            toast.error('Hujjat topilmadi!');
        }
    }
    const copyToClipboard = (text) => {
        console.log('text', text)
        var textField = document.createElement('textarea')
        textField.innerText = text
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove()
        toast.success('Nusxa olindi!');
    }
    return (
        <div className="text-primary-200 results">
            <h2 className="text-3xl font-semibold text-primary-200 text-center mt-5 mb-10">Barcha fayllar</h2>
            <table className="table w-100 bg-black/50 backdrop-blur-md ">
                <thead className="text-center">
                    <tr>
                        <th className='w-[90px]'>No</th>
                        <th>Hujat izohi</th>
                        <th>Yaratilgan sana</th>
                        <th>Hujjat id</th>
                        <th className='w-[150px]'>Yuklab olish</th>
                        <th className='w-[150px]'>O'chirish</th>
                        <th className='w-[150px]'>Taxrirlash</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {documents.slice(0, 10).map((doc, index) => (
                        <tr key={index}>
                            <td>{doc.id}</td>
                            <td>{doc.title}</td>
                            <td>12.04.2004</td>
                            <td onDoubleClick={()=>copyToClipboard(doc.thumbnailUrl)} className='cursor-pointer'>{doc.thumbnailUrl.slice(32)}</td>
                            <td>
                                <div className="flex items-center cursor-pointer text-blue-500 gap-2 font-semibold" onClick={() => handleDownload(doc.url)}>
                                    <FiDownload /> Yuklab olish
                                </div>
                            </td>
                            <td>
                                <div className="flex items-center cursor-pointer text-red-500 gap-2 font-semibold">
                                    <MdDelete /> O'chirish
                                </div>
                            </td>
                            <td>
                                <div className="flex items-center cursor-pointer text-green-500 gap-2 font-semibold">
                                    <MdEdit /> Taxrirlash
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot className='text-center text-white'>
                    <tr>
                        <td>
                            {/* <label htmlFor="page_size"><IoFilter /></label> */}
                            <select name="page_size" id="page_size" className="p-1  w-full max-w-xs border-2 border-white/50">
                                <option value="10" selected>10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                        </td>
                        <td>
                            <label htmlFor="page_size"></label>
                            <select name="page_size" id="page_size" className="p-3  w-full max-w-xs border-2 border-white/50">
                                <option value="all" selected>Barcha hujjatlar</option>
                                <option value="cert">Sertifikatlar</option>
                                <option value="img">Rasmlar</option>
                                <option value="docs">docs,pdf</option>
                            </select>
                        </td>
                        <td colSpan="5">
                            <h4 className='text-red-500 text-base'>O'chirilgan fayllar qayta tiklab bo'lmaydi shuni unutmang!</h4>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default AllDocs;
