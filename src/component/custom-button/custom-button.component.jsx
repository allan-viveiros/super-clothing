import React from 'react'

//Import files
import './custom-button.style.scss'

const CustomButton = ( {children, ...otherProps} ) => (
    <button className='custom-button' {...otherProps}>
        {children}
    </button>

);

export default CustomButton;