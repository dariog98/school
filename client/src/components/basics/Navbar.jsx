const Navbar = ({ children }) => {
    return (
        <nav className='navbar card border-0 rounded-0 shadow-sm text-light'>
            <div className='container my-auto'>
                <div className='w-100 d-flex justify-content-between align-items-center gap-3'>
                    {children}
                </div>
            </div>
        </nav>
    )
}

export default Navbar