import React from 'react'
import './Button.scss'
export default function ButtonType1({value="Submit", action, flag}) {
  return (
    <button onClick={action} className="button-type-1">
      {value}
    </button>
  )
}
