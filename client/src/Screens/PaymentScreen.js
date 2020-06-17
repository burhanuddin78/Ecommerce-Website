import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePayment } from '../actions/cartAction';
import CheckoutSteps from '../components/CheckoutSteps';

function PaymentScreen(props) {
  const dispatch = useDispatch();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  if (!userInfo) {
    props.history.push('/signin');
  }

  const [paymentMethod, setpaymentMethod] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePayment({ paymentMethod }));
    props.history.push('placeorder');
  };

  return (
    <div>
      <CheckoutSteps Step1 step2 step3></CheckoutSteps>
      <div className="form">
        <form onSubmit={submitHandler}>
          <ul className="form-container">
            <li>
              <h2>Payment </h2>
            </li>

            <li>
              <div>
                <input
                  type="radio"
                  id="paymentMethod"
                  name="paymentMethod"
                  value="Cash on delivery"
                  onChange={(e) => setpaymentMethod(e.target.value)}
                ></input>
                <label htmlFor="paymentMethod">Cash On delivery</label>
              </div>
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

export default PaymentScreen;
