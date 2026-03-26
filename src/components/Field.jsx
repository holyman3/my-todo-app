import React from 'react'

const Field = ({ className, id, label, type = 'text' }) => {
  return (
    <div className={`field ${className}`}>
      <label className="field__label" htmlFor={id}>
        {label}
      </label>
      <input type={type} className="field__input" id={id} placeholder=" " autoComplete="off" />
    </div>
  )
}

export default Field
