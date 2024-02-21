const Card = ({ title, body, footer, children, style }) => {
    return (
        <div className='card rounded-4 border-0' style={style}>
            {
                title &&
                <div className='card-title'>
                    {title}
                </div> 
            }
            {
                title &&
                <div className='card-title'>
                    {title}
                </div>
            }
                <div className='card-body p-5'>
                    {children}
                </div>
            {
                footer &&
                <div className='card-footer'>
                    {footer}
                </div>
            }
        </div>
    )
}

export default Card