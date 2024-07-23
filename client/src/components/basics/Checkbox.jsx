const Checkbox = ({ label, before, after, form, name, placeholder, isDisabled, isReadOnly, value, handleOnChange }) => {
    return (
        <div>
            {label && <label className='form-label'>{label}</label>}
            <div className='input-group'>
                {before && <div className='input-group-text'>{before}</div>}
                <input
                    className={`form-check-input ${form?.formState.errors[name] ? 'is-invalid' : ''}`}
                    type='checkbox'
                    placeholder={placeholder}
                    disabled={isDisabled}
                    readOnly={isReadOnly}
                    value={value}
                    { ...form?.register(name) }
                    onChange={handleOnChange}
                />
                {after && <div className='input-group-text'>{after}</div>}
            </div>
            <div>
            {
                form && form.formState.errors[name] &&
                <div className='invalid-feedback' style={{ display: 'inherit' }}>{form.formState.errors[name].message}</div>
            }
            </div>
        </div>
    )
}

export default Checkbox