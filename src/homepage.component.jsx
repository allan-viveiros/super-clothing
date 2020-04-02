import React from 'react';

//Import files
import './homepage.style.scss';

const HomePage = () => (
    // All products
    <div className='homepage'>
        <div className='directory-menu'>
            { /*Shopping Hats*/ }
            <div className='menu-item'>
                <div className='content'>
                    <h1 className='title'>Hats</h1>
                    <span className='subtitle'>Shop now</span>
                </div>
            </div>
            { /*Shopping Jackets*/ }
            <div className='menu-item'>
                <div className='content'>
                    <h1 className='title'>Jackets</h1>
                    <span className='subtitle'>Shop now</span>
                </div>
            </div>
            { /*Shopping Sneakers*/ }
            <div className='menu-item'>
                <div className='content'>
                    <h1 className='title'>Sneakers</h1>
                    <span className='subtitle'>Shop now</span>
                </div>
            </div>
            { /*Shopping Womens*/}
            <div className='menu-item'>
                <div className='content'>
                    <h1 className='title'>Womens</h1>
                    <span className='subtitle'>Shop now</span>
                </div>
            </div>
            { /*Shopping Mens*/ }
            <div className='menu-item'>
                <div className='content'>
                    <h1 className='title'>Mens</h1>
                    <span className='subtitle'>Shop now</span>
                </div>
            </div>
        </div>
    </div>    
);

export default HomePage;