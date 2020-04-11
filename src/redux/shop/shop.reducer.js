//Import files
//import SHOP_DATA from './shop.data'; // --> the SHOP_DATA file now is on
import ShopActionTypes from './shop.types';


const INITIAL_STATE = {
    collections: null
};

const shopReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ShopActionTypes.UPDATE_COLLECTIONS:
            return {
                ...state,
                collections: action.payload
            };

        default: 
            return state;
    }
};

export default shopReducer;
 