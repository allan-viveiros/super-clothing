import React from 'react';

//Import files
import './collection-item.style.scss';

//Functional component - Will receive by props the item data
const CollectionItem = ( {id, name, price, imageUrl} ) => (
    <div className='collection-item'>
        <div 
            className='image'
            style={{
                backgroundImage: `url(${imageUrl})`
            }}
        />

        <div className='collection-footer'>
            <span className='name'> {name} </span>
            <span className='price'> {price} </span>
        </div>
        
    </div>
    
);

export default CollectionItem;