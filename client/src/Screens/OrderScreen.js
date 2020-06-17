import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder, deliverOrder } from '../actions/orderActions';
import { CommonLoading } from 'react-loadingg';

function OrderScreen(props) {
  const dispatch = useDispatch();

  const orderdeliver = useSelector((state) => state.orderdeliver);
  const {
    loading: loadingDeliver,
    success: successDeliver,
    error: errorDeliver,
  } = orderdeliver;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  if (!userInfo) {
    props.history.push('/signin');
  }

  useEffect(() => {
    dispatch(detailsOrder(props.match.params.id));

    return () => {};
  }, [successDeliver, dispatch, props, errorDeliver]);

  const deliverHandler = (e) => {
    dispatch(deliverOrder(props.match.params.id));
  };

  return loading ? (
    <CommonLoading />
  ) : loadingDeliver ? (
    <CommonLoading />
  ) : error ? (
    <div>Order Not Found</div>
  ) : (
    <div>
      <h1>Order:{order._id}</h1>
      <div className='placeorder'>
        <div className='placeorder-info'>
          <div>
            <h3>Shipping</h3>
            <div>
              {order.shipping.address}, {order.shipping.city},
              {order.shipping.postalCode}, {order.shipping.country},
            </div>
            <br />
            <div>
              {order.isDelivered
                ? 'Delivered at ' + order.deliveredAt
                : 'Not Delivered.'}
            </div>
          </div>
          <div>
            <h3>Payment</h3>
            <div>Payment Method: {order.payment.paymentMethod}</div>
          </div>
          <div>
            <ul className='cart-list-container'>
              <li>
                <h3>Shopping Cart</h3>
                <div>Price</div>
              </li>
              {order.orderItems.length === 0 ? (
                <div>Cart is empty</div>
              ) : (
                order.orderItems.map((item) => (
                  <li key={item._id}>
                    <div className='cart-image'>
                      <img src={'../../' + item.image} alt='product' />
                    </div>
                    <div className='cart-name'>
                      <div>
                        <Link to={'/product/' + item.product}>{item.name}</Link>
                      </div>
                      <div>Qty: {item.qty}</div>
                    </div>
                    <div className='cart-price'>${item.price}</div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
        <div className='placeorder-action'>
          <ul>
            <li className='placeorder-actions-payment'>
              {userInfo && userInfo.isAdmin && !order.isPaid && (
                <button
                  className='button primary full-width'
                  onClick={() => deliverHandler()}>
                  Deliver Order
                </button>
              )}
            </li>
            <li>
              <h3>Order Summary</h3>
            </li>
            <li>
              <div>Items</div>
              <div>${order.itemsPrice}</div>
            </li>
            <li>
              <div>Shipping</div>
              <div>${order.shippingPrice}</div>
            </li>
            <li>
              <div>Tax</div>
              <div>${order.taxPrice}</div>
            </li>
            <li>
              <div>Order Total</div>
              <div>${order.totalPrice}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default OrderScreen;
