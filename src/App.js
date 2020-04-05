import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';

//File imports
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './component/header/header.component';
import SignInAndUpPage from './pages/sign-in-and-up/sign-in-and-up.component';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';
import {setCurrentUser} from './redux/user/user.actions';

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
        { /* Pass the currentUser state by props   
        <Header currentUser={this.state.currentUser} />
        */ }
        
        <Header />
        {/* Pass the currentUser state by root redux directly to header component */}

        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInAndUpPage} />
        </Switch> 
  
      </div>
    );
  }
  
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(App);
