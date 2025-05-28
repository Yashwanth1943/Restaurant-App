import React from 'react'
import {IoMdCart} from 'react-icons/io'

const CartIcon = ({count = 0}) => (
  <div style={{position: 'relative', display: 'inline-block'}}>
    <IoMdCart style={{fontSize: '24px'}} />
    <span
      style={{
        position: 'absolute',
        top: '-6px',
        right: '-10px',
        background: 'red',
        color: 'white',
        borderRadius: '50%',
        padding: '2px 6px',
        fontSize: '12px',
        fontWeight: 'bold',
      }}
    >
      {count > 0 ? count : 0}
    </span>
  </div>
)

export default CartIcon
