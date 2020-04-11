import React from 'react';

//Import files
import './custom-button.style.scss'; //--> This file was replaced to custom-button.style.jsx
//import {CustomButtonContainer} from './custom-button.style';


// This code was replaced in order to use styled components --> custom-button.style.jsx
const CustomButton = ( {children, isGoogleSignIn, inverted, ...otherProps} ) => (
    <button 
        className={` 
            ${inverted ? 'inverted' : ''} 
            ${isGoogleSignIn ? 'google-sign-in': ''} 
            custom-button`} 
        {...otherProps}
    >

        {children}        
    </button>
); 


/*  const CustomButton = ( {children, ...props} ) => (

    <CustomButtonContainer {...props}> {children} </CustomButtonContainer>
);  */


export default CustomButton; 
