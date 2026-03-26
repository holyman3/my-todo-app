import React from 'react'

const Button = ({ className = '', type = 'button', children }) => {
  return (
    <button className={`button ${className}`} type={type}>
      {children}
    </button>
  )
}

export default Button
