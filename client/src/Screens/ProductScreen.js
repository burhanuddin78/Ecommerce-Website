import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct } from '../actions/productActions';
import { CommonLoading } from 'react-loadingg';

function ProductScreen(props) {
  const productDetails = useSelector((state) => state.productDetails);

  const { product, loading, error } = productDetails;
  const dispatch = useDispatch();
  const [qty, setqty] = useState(1);
  const handleAddToCart = () => {
    props.history.push('/cart/' + props.match.params.id + '?qty=' + qty);
  };

  useEffect(() => {
    dispatch(detailsProduct(props.match.params.id));
  }, [dispatch, props]);
  return (
    <div>
      {loading ? (
        <CommonLoading />
      ) : error ? (
        <div style={{ padding: '2rem' }}> No Product Found</div>
      ) : (
        <div className='details'>
          <div className='detail-image'>
            <img src={'../../' + product.image} alt='product' />
          </div>
          <div className='detail-info'>
            <ul>
              <li>
                <h4>{product.name}</h4>
              </li>
              <li>
                Rs.<b>{product.price}</b>
              </li>
              <li>
                Description
                <div>
                  <h4>{product.description}</h4>
                </div>
              </li>
            </ul>
          </div>
          <div className='detail-action'>
            <ul>
              <li>Price:Rs.{product.price}</li>
              <li>Status: Available</li>
              <li>
                Qauntity:
                <select
                  value={qty}
                  onChange={(e) => {
                    setqty(e.target.value);
                  }}>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                </select>
              </li>
              <li>
                <button onClick={handleAddToCart} className='button'>
                  Add to cart
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductScreen;
