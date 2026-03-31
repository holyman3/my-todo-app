import React from 'react'

const Button = ({ className = '', type = 'button', children, isDisabled, onClick }) => {
  return (
    <button disabled={isDisabled} onClick={onClick} className={`button ${className}`} type={type}>
      {children}
    </button>
  )
}

export default Button
