const Title = ({ text, children}) => {
    return (
        <div className='d-flex justify-content-between align-items-center'>
            <div className='fs-4'>{text}</div>
            <div>
                {children}
            </div>
        </div>
    )
}

export default Title