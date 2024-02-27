const ClassData = ({ data }) => {
    return (
        <div className='card shadow-sm'>
            <div className='card-body'>
                <div className='fs-4'>{data.description}</div>
                <div className='d-grid gap-5' style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
                    <div>
                        <div className='fw-bold'>Professors</div>
                        <div>
                            {
                                data.professors.map(professor =>
                                    <div key={professor.id}>{`${professor.surnames} ${professor.names}`}</div>
                                )
                            }
                        </div>
                    </div>
                    <div>
                        <div>
                            <div className='fw-bold'>Students</div>
                            <div className='d-flex justify-content-between'>
                                <div>Total</div>
                                <div>{data.totalStudents}</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div className='fw-bold'>Classes</div>
                            <div className='d-flex justify-content-between'>
                                <div>Total</div>
                                <div>{data.totalClasses}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClassData