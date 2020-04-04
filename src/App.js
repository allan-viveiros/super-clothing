import React from 'react';
import {Switch, Route} from 'react-router-dom';

//File imports
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './component/header/header.component';
import SignInAndUpPage from './pages/sign-in-and-up/sign-in-and-up.component';
import {auth} from './firebase/firebase.utils';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    //The firebase auth method will inform any change on user status 
    auth.onAuthStateChanged(user => {
      this.setState( {currentUser: user} );

      //console.log(user);      
    });
  }

  //This component will logout our user and remove data from user 
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return ( 
      <div>
  
        <Header />
  
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInAndUpPage} />
        </Switch> 
  
      </div>
    );
  }
  
}

export default App;
