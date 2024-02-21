import Navbar from './Navbar'

const Container = ({ title, children }) => {
    return (
        <div className='d-flex flex-column gap-4'>
            <Navbar title={title}/>
            <div className='container'>
            {children}
            </div>
        </div>
    )
}

export default Container