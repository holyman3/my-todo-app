import React from 'react'

const Field = ({ className, id, label, type = 'text', onInput, value, ref }) => {
  return (
    <div className={`field ${className}`}>
      <label className="field__label" htmlFor={id}>
        {label}
      </label>
      <input
        value={value}
        onChange={onInput}
        type={type}
        className="field__input"
        id={id}
        placeholder=" "
        autoComplete="off"
        ref={ref}
      />
    </div>
  )
}

export default Field
