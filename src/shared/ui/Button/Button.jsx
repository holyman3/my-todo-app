import React from 'react'
import styles from './Button.module.scss'
//now styles will be in the final bundle only if button component is used

const Button = ({ className = '', type = 'button', children, isDisabled, onClick }) => {
  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      className={`${styles.button} ${className}`}
      type={type}>
      {children}
    </button>
  )
}

export default Button
