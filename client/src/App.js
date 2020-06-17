import React from 'react';
import './App.css';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import ProductsScreen from './Screens/ProductsScreen';

import NotFound from './Screens/NotFound';
import ShippingScreen from './Screens/ShippingScreen';
import RegisterScreen from './Screens/RegisterScreen';
import CartScreen from './Screens/CartScreen';
import SigninScreen from './Screens/SigninScreen';
import { useSelector } from 'react-redux';
import PaymentScreen from './Screens/PaymentScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import OrderScreen from './Screens/OrderScreen';
import ProfileScreen from './Screens/ProfileScreen';
import OrdersScreen from './Screens/OrdersScreen';

function App() {
  const userSign = useSelector((state) => state.userSignin);
  const { userInfo } = userSign;

  return (
    <BrowserRouter>
      <div className='grid-container'>
        <header className='header'>
          <div className='brand'>
            <Link to='/'>
              <img src='/images/Logo.jpg' width='200' height='60' alt='Logo' />
            </Link>
          </div>
          <div className='header-links'>
            {userInfo && userInfo.isAdmin && (
              <div className='dropdown'>
                <a href='/'>Admin</a>
                <ul className='dropdown-content'>
                  <li>
                    <Link to='/orders'>Orders</Link>

                    <Link to='/products'>Products</Link>
                  </li>
                </ul>
              </div>
            )}

            <Link to='/cart'>Cart</Link>
            {userInfo ? (
              <Link to='/profile'>{userInfo.name}</Link>
            ) : (
              <Link to='/signin'>Sigin</Link>
            )}
          </div>
        </header>

        <main className='main'>
          <div className='content'>
            <Switch>
              <Route path='/orders' component={OrdersScreen} />
              <Route path='/profile' component={ProfileScreen} />
              <Route path='/order/:id' component={OrderScreen} />
              <Route path='/placeorder' component={PlaceOrderScreen} />
              <Route path='/payment' component={PaymentScreen} />
              <Route path='/shipping' component={ShippingScreen} />
              <Route path='/products' component={ProductsScreen} />
              <Route path='/register' component={RegisterScreen} />
              <Route path='/signin' component={SigninScreen} />
              <Route path='/product/:id' component={ProductScreen} />
              <Route path='/cart/:id?' component={CartScreen} />
              <Route path='/' exact={true} component={HomeScreen} />
              <Route path='*' component={NotFound} />
            </Switch>
          </div>
        </main>
        <footer className='footer'>All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
