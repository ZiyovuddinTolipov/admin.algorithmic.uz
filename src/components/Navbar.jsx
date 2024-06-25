import React from 'react';
import userimg from '../assets/tolipovblack.png'
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useEffect, useState } from "react";


const Navbar = () => {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [userData, setUserData] = useState({});
    const getToken = () => {
        return localStorage.getItem('user_jwt');
    };
    const fetchData = async () => {
        try {
            const response = await axios.get('https://bkscoring.algorithmic.uz/api/Users/me', {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            });
            // console.log(response.data);
            localStorage.setItem('user_data', JSON.stringify(response.data));
            setUserData(JSON.parse(localStorage.getItem('user_data')));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    // const userData = localStorage.getItem('user_data');
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    // console.log(userData);
    return (
        <nav className='flex justify-between items-center backdrop-blur-md bg-white/10 px-4 py-2 rounded-xl'>
            <Link to='/' className='text-white font-bold text-xl'>Algorithmic.uz</Link>
            <div className='text-white flex items-center gap-2'>
                <h3 className='text-xl font-semibold'>
                    {userData.fullName ? userData.fullName : <>Tolipov <br /> Ziyovuddin </>}
                    {/* Tolipov <br /> Ziyovuddin */}
                </h3>
                <div className="avatar online">
                    <div className="w-16 mask rounded-full" onClick={handleOpenUserMenu}>
                        <img src={userData.imageId ? `https://bkscoring.algorithmic.uz/api/Files/${userData.imageId}` : userimg} loading="lazy" />
                    </div>
                    <Menu
                        sx={{ mt: '70px', py: 0 }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        <MenuItem onClick={handleCloseUserMenu} >
                            <Link to="/">
                                <Typography textAlign="center">Baholash</Typography>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleCloseUserMenu} >
                            <Link to="/profile">
                                <Typography textAlign="center">profil</Typography>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleCloseUserMenu} >
                            <Link to="https://tatu-module.uz/" onClick={() => localStorage.clear()} >
                                <Typography textAlign="center">chiqish</Typography>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleCloseUserMenu} >
                            <Link to="/rating">
                                <Typography textAlign="center">Reytingim</Typography>
                            </Link>
                        </MenuItem>
                    </Menu>
                </div>
            </div>
        </nav>
    )
}

export default Navbar