import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { update, logout } from '../actions/userAction';
import { CommonLoading } from 'react-loadingg';
import { listMyOrders } from '../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';

function ProfileScreen(props) {
  const [name, setname] = useState('');
  const [password, setpassword] = useState('');
  const [email, setemail] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  if (!userInfo) {
    props.history.push('/signin');
  }

  const updateHandler = (e) => {
    dispatch(update({ userId: userInfo._id, name, email, password }));
  };

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, success, error } = userUpdate;

  const myOrderList = useSelector((state) => state.myOrderList);

  const { loading: loadingOrders, orders, error: errorOrders } = myOrderList;
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    dispatch(logout());
    window.location.href = '/signin';
  };

  useEffect(() => {
    if (userInfo) {
      setemail(userInfo.email);
      setname(userInfo.name);
      setpassword(userInfo.password);
    }
    dispatch(listMyOrders());
  }, [userInfo, dispatch]);

  return (
    <div className='profile'>
      <div className='profile-info'>
        <div className='form-profile'>
          <ul className='form-container'>
            <li>
              <h2>User Profile</h2>
            </li>
            <li>
              {loading && <div>Loading...</div>}
              {error && <div>Error</div>}
              {success && <div>Profile Saved Successfully.</div>}
            </li>
            <li>
              <label htmlFor='name'>Name</label>
              <input
                value={name}
                type='name'
                name='name'
                id='name'
                onChange={(e) => setname(e.target.value)}></input>
            </li>
            <li>
              <label htmlFor='email'>Email</label>
              <input
                value={email}
                type='email'
                name='email'
                id='email'
                onChange={(e) => setemail(e.target.value)}></input>
            </li>
            <li>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                id='password'
                name='password'
                onChange={(e) => setpassword(e.target.value)}></input>
            </li>

            <li>
              <button
                type='submit'
                className='button primary'
                onClick={updateHandler}>
                Update
              </button>
            </li>
            <li>
              <button
                type='button'
                onClick={handleLogout}
                className='button secondary full-width'>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className='profile-orders content-margined'>
        {loadingOrders ? (
          <CommonLoading />
        ) : errorOrders ? (
          <div>No Order Found </div>
        ) : orders.length === 0 ? (
          <div> No order Found</div>
        ) : (
          <table className='table'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>Delivered</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt}</td>
                  <td>{order.totalPrice}</td>
                  <td>{order.isPaid.toString()}</td>
                  <td>{order.isDelivered.toString()}</td>
                  <td>
                    <Link to={'/order/' + order._id}>DETAILS</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ProfileScreen;
