import React from 'react'
import styles from './Field.module.scss'

const Field = ({ className, id, label, type = 'text', onInput, value, error, ref }) => {
  return (
    <div className={`${styles.field} ${className}`}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        value={value}
        onChange={onInput}
        type={type}
        className={`${styles.input} ${error ? styles.isInvalid : ''}`}
        id={id}
        placeholder=" "
        autoComplete="off"
        ref={ref}
      />
      {error && (
        //user at least somehow can red full error message via browser tooltip
        <span className={styles.error} title={error}>
          {error}
        </span>
      )}
    </div>
  )
}

export default Field
