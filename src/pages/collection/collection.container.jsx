import {connect} from 'react-redux';
import {compose} from "redux";
import {createStructuredSelector} from 'reselect';

//Import files
import {selectIsCollectionLoaded} from '../../redux/shop/shop.selectors';
import WithSpinner from '../../component/with-spinner/with-spinner.component';
import CollectionPage from './collection.component';


const mapStateToProps = createStructuredSelector ({
    isLoading: state => !selectIsCollectionLoaded(state)
});

const CollectionPageContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionPage);

export default CollectionPageContainer;