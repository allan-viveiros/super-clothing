import React from 'react';

//Import files
import './checkout-item.style.scss'

//I need the whole item because i am be able to change all items in the cart
const CheckoutItem = ( {cartItem: {name, imageUrl, price, quantity}} ) => (
    <div className='checkout-item'>
        <div className='image-container'>
            <img src={imageUrl} alt='item' />
        </div>

        <span className='name'> {name} </span>
        <span className='quantity'> {quantity} </span>
        <span className='price'> {price} </span>
        <div className='remove-button'> &#10007; </div>
    </div>
)

export default CheckoutItem;