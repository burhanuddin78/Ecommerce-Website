import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';

function PlaceOrder(props) {
  const cart = useSelector((state) => state.cart);
  const { cartItems, shipping, payment } = cart;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { success, order } = orderCreate;

  if (!shipping.address) {
    props.history.push('/shipping');
  } else if (!payment.paymentMethod) {
    props.history.push('/payment');
  }

  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = 0;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    // create an order

    dispatch(
      createOrder({
        orderItems: cartItems,
        shipping,
        payment,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      })
    );
  };

  useEffect(() => {
    if (success) {
      props.history.push('/order/' + order._id);
    }
  }, [success, props, order]);

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className='placeorder'>
        <div className='placeorder-info'>
          <div>
            <h3>Shipping</h3>
            <div>
              {cart.shipping.address},{cart.shipping.city},
              {cart.shipping.postalcode},{cart.shipping.country},
            </div>
          </div>
          <div>
            <h3>Payment</h3>
            <div>Payment Method: {cart.payment.paymentMethod}</div>
          </div>
          <div>
            <ul className='cart-list-container'>
              <li>
                <h3>Shopping Cart </h3>
                <div>Price</div>
              </li>
              {cartItems.length === 0 ? (
                <div> Cart is Empty</div>
              ) : (
                cartItems.map((item) => (
                  <li key={item.product}>
                    <div className='cart-image'>
                      <img src={item.image} alt='product' />
                    </div>

                    <div className='cart-name'>
                      <Link to={/product/ + item.product}>
                        <div>{item.name} </div>
                      </Link>
                    </div>

                    <div>Quantity:{item.qty}</div>

                    <div className='cart-price'> ${item.price}</div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
        <div className='placeorder-action'>
          <ul>
            <li>
              <h2>Order Summary</h2>
            </li>
            <li>
              <div>ItemsPrice</div>
              <div>${itemsPrice}</div>
            </li>
            <li>
              <div>Shipping</div>
              <div>${shippingPrice}</div>
            </li>
            <li>
              <div>Tax</div>
              <div>${taxPrice}</div>
            </li>
            <li>
              <div>Order Total</div>
              <div>${totalPrice}</div>
            </li>
            <li>
              <button
                className='button primary full-width'
                onClick={placeOrderHandler}
                disabled={cartItems.length === 0}>
                Place Order
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
