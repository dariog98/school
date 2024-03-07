export const Card = ({ title, body, footer, children, className, style }) => {
    return (
        <div className={`card ${className ?? ''}`} style={style}>
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

export const CardBody = ({ className, style, children }) => {
    return (
        <div className={`card-body ${className ?? ''}`} style={style}>
            {children}
        </div>
    )
}