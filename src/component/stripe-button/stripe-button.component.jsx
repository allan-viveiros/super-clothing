import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ( {price} ) => {
    const priceForStripe = price * 100;
    const publishablekey = 'pk_test_vaNbLqb0Q5TrYTXJPzd1Yai700Ly2rPatJ';

    const onToken = token => {
        console.log(token);
        alert('Payment Successful');
    }

    return (
        <StripeCheckout
            label='Pay Now'
            name='Super Clothing'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total: $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishablekey}
        />        
    );
};

export default StripeCheckoutButton;
