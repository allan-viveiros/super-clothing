import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

//File imports
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './component/header/header.component';
import SignInAndUpPage from './pages/sign-in-and-up/sign-in-and-up.component';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';
import {setCurrentUser} from './redux/user/user.actions';
import {selectCurrentUser} from './redux/user/user.selector';
import CheckOutPage from './pages/checkout/checkout.component';

class App extends React.Component {
  // Because I'm using setCurrentUser from user.actions (redux) 
  // I don't need to use state here.
  /*
    constructor() {
      super();

      this.state = {
        currentUser: null
      }
    }
 */

  unsubscribeFromAuth = null;

  componentDidMount() {
    const {setCurrentUser} = this.props;

    //The firebase auth method will inform any change on user status 
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        //Set the user data to our state 
        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()            
          });
          //, () => {console.log(this.state)} )
          //console.log(snapshot.data());
        });
      }
      else {
        setCurrentUser(userAuth);
      }       

    });
  }

  //This component will logout our user and remove data from user 
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return ( 
      <div>
        { /* Pass the currentUser state by props to header component   
        <Header currentUser={this.state.currentUser} />
        */ }
        
        <Header />
        {/* Pass the currentUser state by root redux directly to route render */}

        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckOutPage} />

          <Route 
            exact path='/signin' 
            render={() => 
              this.props.currentUser 
              ? ( <Redirect to='/' /> )
              : ( <SignInAndUpPage /> )
            }
          />

        </Switch>   
      </div>
    );
  }
  
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
