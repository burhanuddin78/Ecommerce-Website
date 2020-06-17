import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listOrders, deleteOrder } from '../actions/orderActions';
import { Link } from 'react-router-dom';
import { CommonLoading } from 'react-loadingg';

function OrdrsScreen(props) {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, orders } = orderList;

  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = orderDelete;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  if (!userInfo) {
    props.history.push('/signin');
  }

  useEffect(() => {
    dispatch(listOrders());

    return () => {};
  }, [dispatch, successDelete]);

  const deleteHandler = (order) => {
    dispatch(deleteOrder(order._id));
  };

  return loading ? (
    <CommonLoading />
  ) : (
    <div className='content content-margined'>
      <div className='order-header'>
        <h3>Orders</h3>
      </div>
      <div className='order-list'>
        <table className='table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>DELIVERED AT</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user.name}</td>
                <td>{order.createdAt}</td>
                <td>{order.totalPrice}</td>
                <td>{order.isPaid.toString()}</td>
                <td>{order.isDelivered.toString()}</td>
                <td>{order.deliveredAt}</td>
                <td>
                  <Link to={'/order/' + order._id} className='button secondary'>
                    Details
                  </Link>
                  {'  '}

                  {loadingDelete ? (
                    <CommonLoading />
                  ) : errorDelete ? (
                    <div>{errorDelete}</div>
                  ) : (
                    <button
                      type='button'
                      onClick={() => deleteHandler(order)}
                      className='button secondary'>
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrdrsScreen;
