import React from 'react';

//Import files
import './sign-in-and-up.style.scss';
import SignIn from '../../component/sign-in/sign-in.component';
import SignUp from '../../component/sign-up/sign-up.component';

const SignInAndUpPage = () => (
    <div className='sign-in-and-up'> 

        <SignIn /> 
        <SignUp />

    </div>
);

export default SignInAndUpPage;