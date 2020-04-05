import React from 'react';
import {Switch, Route} from 'react-router-dom';

//File imports
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './component/header/header.component';
import SignInAndUpPage from './pages/sign-in-and-up/sign-in-and-up.component';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';

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
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        //Set the user data to our state 
        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          });
          //, () => {console.log(this.state)} )
          //console.log(snapshot.data());
          
          console.log(this.state)
        });
      }
      else {
        this.setState( {currentUser: userAuth} );
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
  
        <Header currentUser={this.state.currentUser} />
  
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
