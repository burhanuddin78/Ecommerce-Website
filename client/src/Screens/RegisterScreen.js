import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userAction';
import CommonLoading from 'react-loadingg/lib/CommonLoading';

function RegisterScreen(props) {
  const dispatch = useDispatch();

  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');

  const [Password, setPassword] = useState('');
  const [rePassword, setrePassword] = useState('');
  const userRegister = useSelector((state) => state.userRegister);

  const { loading, userInfo, error } = userRegister;
  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [userInfo, redirect, props]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(Name, Email, Password));
  };

  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <h2>Create An Account</h2>
          </li>
          {loading && <CommonLoading />}
          {error && <div>{error}</div>}

          <li>
            <label htmlFor="name"> Name</label>
            <input
              required
              type="text"
              id="name"
              name="name"
              onChange={(e) => setName(e.target.value)}
            ></input>
          </li>
          <li>
            <label htmlFor="email"> Email</label>
            <input
              required
              type="email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </li>
          <li>
            <label htmlFor="password"> Password</label>
            <input
              required
              type="password"
              id="passowrd"
              name="passowrd"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </li>
          <li>
            {!Password === rePassword ? error : ''}
            <label htmlFor="rePassword"> Re-Enter Password</label>
            <input
              type="password"
              id="rePassword"
              name="rePassword"
              onChange={(e) => setrePassword(e.target.value)}
            ></input>
          </li>

          <li>
            <button type="submit" className="button primary">
              Sign in
            </button>
          </li>

          <li>
            <Link
              to={redirect === '/' ? 'signin' : 'signin?redirect=' + redirect}
              className="button secondary text-center"
            >
              Already have an Account
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
}

export default RegisterScreen;
