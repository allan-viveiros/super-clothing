import React from 'react';
import {connect} from 'react-redux';

//Import files
import './collection.style.scss';
import CollectionItem from '../../component/collection-item/collection-item.component';
import {selectCollection} from '../../redux/shop/shop.selectors';

const CollectionPage = ( {collection} ) => { 
    const {title, items} = collection;
    //console.log(match.params.collectionId);
    
    return (
        <div className='collection-page'>
            <h2 className='title'> {title} </h2>
            <div className='items'>
                {items.map(item => (
                    <CollectionItem key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

/** ownProps give to me all of the props that I get it on the CollectionPage
 *  including the match object that I get from the root component that passing 
 * my collection on my ShopPage*/ 
const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionId)(state)
})
/** Because it's a function that return another function I have to pass a function
 * that comes out of this function, (state)  in order to wire everything together.
 */


export default connect(mapStateToProps)(CollectionPage);
