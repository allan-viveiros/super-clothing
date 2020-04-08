import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

//Import files
import './collection-overview.style.scss';
import CollectionPreview from '../collection-preview/collection-preview.component';
import {selectCollectionsForPreview} from '../../redux/shop/shop.selectors';


const CollectionsOverview = ( {collections} ) => (
    <div className='collections-overview'>
        {collections.map( ({id, ...otherCollectionProps}) => (
            <CollectionPreview key={id} {...otherCollectionProps} />
        ))}
    </div>
);


const mapStateToProps = createStructuredSelector ({
    collections: selectCollectionsForPreview
});


export default connect(mapStateToProps)(CollectionsOverview);
 