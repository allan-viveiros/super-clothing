import React from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';

//Import files
import CollectionsOverview from '../../component/collection-overview/collection-overview.component';
import CollectionPage from '../collection/collection.component';
import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils';
import {updateCollections} from '../../redux/shop/shop.actions';
import WithSpinner from '../../component/with-spinner/with-spinner.component';


const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
    state ={
        loading: true
    };

    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const {updateCollections} = this.props;
        const collectionRef = firestore.collection('collections');

        /* fetch('https://firestore.googleapis.com/v1/projects/superclothing-db/databases/(default)/documents/collections')
            .then(response => response.json())
            .then(collections => console.log(collections)); */

        //Using promises - reference objects
         collectionRef.get().then(snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionsMap);
            this.setState({loading: false});
        }); 

        //Getting the snapshot directly
        /*  this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);

            updateCollections(collectionsMap);
            //console.log(collectionsMap);

            this.setState( {loading: false} );
        }); */
    }

    render() {
        const {match} = this.props;
        const {loading} = this.state;

        return (
            <div className='shop-page'>
                <Route 
                    exact path={`${match.path}`} 
                    render={props => (
                        <CollectionsOverviewWithSpinner isLoading={loading} {...props} />
                    )}
                />
                <Route 
                    path={`${match.path}/:collectionId`} 
                    render={props => (
                        <CollectionPageWithSpinner isLoading={loading} {...props} />
                    )}
                /> 
            </div>    
        );
    }
}


const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);
