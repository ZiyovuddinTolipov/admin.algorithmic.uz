import logo from '../assets/logo14.png'

const Navbar = () => {

    return (
        <header className="fixed z-40 py-3 w-full pr-3 sm:px-12 bg-admin-50 border-b text-primary-50">
            <nav className=" mx-auto flex items-center justify-between px-2 md:px-0">
                <img src={logo} alt="logo sb tuit" className='lg:w-[128px] md:w-[80px] w-[64px]'/>
                {/* <img src={localStorage.getItem('role')== "Admin"? logo : user} alt="logo" className="h-8 md:h-12 mr-2" /> */}
                <ul className="flex items-center gap-3">
                    <li className="text-xl font-semibold">Admin</li>
                    {/* <li><RxHamburgerMenu size={28}/></li> */}
                </ul>
            </nav>
        </header>
    )
}

export default Navbar