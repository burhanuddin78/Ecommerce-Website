import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShipping } from '../actions/cartAction';
import CheckoutSteps from '../components/CheckoutSteps';

function ShippingScreen(props) {
  const dispatch = useDispatch();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  if (!userInfo) {
    props.history.push('/signin');
  }

  const [address, setaddress] = useState('');
  const [city, setcity] = useState('Karachi');

  const [postalCode, setpostalCode] = useState('');
  const [country, setcountry] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShipping({ address, city, postalCode, country }));
    props.history.push('payment');
  };

  return (
    <div>
      <CheckoutSteps Step1 step2></CheckoutSteps>
      <div className="form">
        <form onSubmit={submitHandler}>
          <ul className="form-container">
            <li>
              <h2>Shipping</h2>
            </li>

            <li>
              <label htmlFor="address"> Address</label>
              <input
                type="text"
                id="address"
                name="address"
                onChange={(e) => setaddress(e.target.value)}
              ></input>
            </li>
            <li>
              <label htmlFor="city"> City </label>
              <input
                type="text"
                id="city"
                name="city"
                onChange={(e) => setcity(e.target.value)}
              ></input>
            </li>
            <li>
              <label htmlFor="postalcode"> Postal Code </label>
              <input
                type="text"
                id="postalcode"
                name="postalcode"
                onChange={(e) => setpostalCode(e.target.value)}
              ></input>
            </li>
            <li>
              <label htmlFor="country"> Country </label>
              <input
                type="text"
                id="country"
                name="country"
                onChange={(e) => setcountry(e.target.value)}
              ></input>
            </li>

            <li>
              <button type="submit" className="button primary">
                Continue
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}

export default ShippingScreen;
