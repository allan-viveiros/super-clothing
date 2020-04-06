import {createSelector} from 'reselect';

//Input selector - This function gets the whole state and return a slice of then
const selectCart = state => state.cart;

//Selector to hidden/show cartDropDown
export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
);

//Cart items
export const selectCartItems = createSelector(
    [selectCart],
    cart => cart.cartItems
);
//Group the duplicated items in cart item
export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => 
        cartItems.reduce(
            (accumulatedQuantity, cartItem) => 
                accumulatedQuantity + cartItem.quantity, 0
        )
);
//Accumulate total price os items
export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems => 
        cartItems.reduce(
            (accumulatedQuantity, cartItem) => 
                accumulatedQuantity + cartItem.quantity * cartItem.price, 0
        )
)

