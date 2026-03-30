import React from 'react'

const Button = ({ className = '', type = 'button', children, onClick }) => {
  return (
    <button onClick={onClick} className={`button ${className}`} type={type}>
      {children}
    </button>
  )
}

export default Button
