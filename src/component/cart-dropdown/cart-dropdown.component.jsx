import React from 'react';
import {connect} from 'react-redux'; 
import {createStructuredSelector} from 'reselect';
import {withRouter} from 'react-router-dom';

//Import files 
import './cart-dropdown.style.scss'
import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import {selectCartItems} from '../../redux/cart/cart.selector';
import {toggleCartHidden} from '../../redux/cart/cart.actions'


//The connect function pass the dispatch as props
const CartDropdown = ( {cartItems, history, dispatch} ) => (
    <div className='cart-dropdown'>

        <div className='cart-items'>

            {cartItems.length 
                ? (cartItems.map(cartItem => (
                    <CartItem key={cartItem.id} item={cartItem} />
                  ))
                ) 
                : (<span className='empty-message'> Your cart is empty </span>) 
            }

        </div>

        <CustomButton onClick={() =>{ 
            history.push('/checkout');
            dispatch(toggleCartHidden());
            }}
        >
            Go to Checkout 
        </CustomButton>
    </div>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
});

/* I have to wrap the connected function inside of my withRouter. The withRouter 
just taking the component that got returned from my connect call as it's component
argument. It pass the history and location objects. 
*/
export default withRouter(connect(mapStateToProps)(CartDropdown));
