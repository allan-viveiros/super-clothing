//Import libraries
import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

//Import logo svg
import {ReactComponent as Logo} from '../../assets/crown.svg';

//Import files 
import './header.style.scss';
import {auth} from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import {selectCartHidden} from '../../redux/cart/cart.selector';
import {selectCurrentUser} from '../../redux/user/user.selector';


const Header = ( {currentUser, hidden} ) => (
    //this part above is what my dom is render
    <div className='header'>
        <Link className='logo-container' to='/'>
            <Logo className='logo'/>
        </Link>

        <div className='options'>
            <Link className='option' to='/shop'> SHOP </Link>
            <Link className='option' to='/contact'> CONTACT </Link>      

            {currentUser ? 
                ( 
                    <div 
                        className='option' 
                        onClick={() => auth.signOut()}
                    > SIGN OUT
                    </div>
                ) 
                : ( <Link className='option' to='/signin'> SIGN IN </Link> )
            }

            <CartIcon />            
        </div>

        { hidden ? null : <CartDropdown /> }
        
    </div>
);

//The state is my root reducer
/* The createStructuredSelector pass the state automatically the top level state props
into each subsequent selectors */
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);
