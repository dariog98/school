import { Modal, Checkbox } from '../basics'

const ParticipantsModal = ({ show, handleClose, students, form }) => {

    const handleCheckboxChange = () => {
        
    }

    return (
        <Modal title='Participants' show={show} modalSize='modal-lg' handleClose={handleClose}>
            <div className='d-flex flex-column gap-2'>
                {
                    students.map((student, index) =>
                        <div key={student.id} className={`flex-grow-1 card shadow-sm ${index % 2 ? 'bg-body-secondary' : ''}`}>
                            <div className='py-2 px-3'>
                                <div className='d-flex align-items-center justify-content-between'>
                                    {`${student.surnames} ${student.names}`}

                                    <div>
                                        <Checkbox
                                            form={form}
                                            name={`students.${String(student.id)}.enabled`}
                                            handleOnChange={({ target }) => {
                                                const isChecked = target.checked
                                                const studentId = student.id
                                                console.log(students)
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </Modal>
    )
}

export default ParticipantsModal