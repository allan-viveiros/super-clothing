import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
 
//Import files 
import './checkout.style.scss'
import {selectCartItems, selectCartTotal} from '../../redux/cart/cart.selector';
import CheckOutItem from '../../component/checkout-item/checkout-item.component.jsx';
import StripeCheckoutButton from '../../component/stripe-button/stripe-button.component';


const CheckOutPage = ( {cartItems, total} ) => (
    <div className='checkout-page'>

        <div className='checkout-header'>
            
            <div className='header-block'>
                <span> Product </span>
            </div>            
            <div className='header-block'>
                <span> Description </span>
            </div>           
            <div className='header-block'>
                <span> Quantity </span>
            </div>            
            <div className='header-block'>
                <span> Price </span>
            </div>            
            <div className='header-block'>
                <span> Remove </span>
            </div>
        </div>
        
        {cartItems.map(cartItem => (
            <CheckOutItem key={cartItem.id} cartItem={cartItem} />
        ))}

        <div className='total'>
            <span> Total: ${total} </span>
        </div>

        <div className='test-warning'>
            ** Please use the following test credit card for payment **
            <p> 4242 4242 4242 4242 - Exp:01/21 - cvc:123 </p>
        </div>

        <StripeCheckoutButton price={total} />

    </div>
)

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
})

export default connect(mapStateToProps)(CheckOutPage);