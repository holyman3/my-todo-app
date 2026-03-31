import React from 'react'

const Field = ({ className, id, label, type = 'text', onInput, value, error, ref }) => {
  return (
    <div className={`field ${className}`}>
      <label className="field__label" htmlFor={id}>
        {label}
      </label>
      <input
        value={value}
        onChange={onInput}
        type={type}
        className={`field__input ${error ? 'is-invaild' : ''}`}
        id={id}
        placeholder=" "
        autoComplete="off"
        ref={ref}
      />
      {error && (
        //user at least somehow can red full error message via browser tooltip
        <span className="field__error" title={error}>
          {error}
        </span>
      )}
    </div>
  )
}

export default Field
