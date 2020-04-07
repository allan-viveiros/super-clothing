import React from 'react';
import {connect} from 'react-redux';

//Import files
import './checkout-item.style.scss'
import {clearItemFromCart, addItem, removeItem} from '../../redux/cart/cart.actions';

//I need the whole item because i am be able to change all items in the cart
const CheckoutItem = ( {cartItem, clearItem, addItem, removeItem} ) => {
    const {name, imageUrl, price, quantity} = cartItem;

    return (
        <div className='checkout-item'>
            {/* Image */}
            <div className='image-container'>
                <img src={imageUrl} alt='item' />
            </div>

            {/* Description */}
            <span className='name'> {name} </span>

            {/* Quantity */}
            <span className='quantity'>
                <div 
                    className='arrow' 
                    onClick={() => removeItem(cartItem)}
                > &#10094; </div>

                <span className='value'> {quantity} </span> 

                <div 
                    className='arrow' 
                    onClick={() => addItem(cartItem)}
                > &#10095; </div>
            </span>

            {/* Price */}
            <span className='price'> {price} </span>

            {/* Remove button */}
            <div className='remove-button' onClick={() => clearItem(cartItem)}> 
                &#10007; 
            </div>

        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    clearItem: item => dispatch(clearItemFromCart(item)),
    addItem: item => dispatch(addItem(item)),
    removeItem: item => dispatch(removeItem(item))
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
