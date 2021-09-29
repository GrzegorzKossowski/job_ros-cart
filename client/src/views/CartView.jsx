import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
    decreaseProductAmountById,
    increaseProductAmountById,
} from '../store/cart';

const CartView = () => {
    const { products } = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleIncrease = id => {
        dispatch(increaseProductAmountById(id));
    };
    const handleDecrease = id => {
        dispatch(decreaseProductAmountById(id));
    };
    if (products.length <= 0)
        return (
            <div>
                <button
                    onClick={() => {
                        history.push('/store');
                    }}
                    style={{
                        minWidth: '200px',
                        height: '50px',
                        backgroundColor: '#4c9cff',
                        color: 'white',
                        position: 'fixed',
                        top: 0,
                        left: 0,
                    }}
                >
                    Go to Store
                </button>
                <h1
                    style={{
                        marginTop: '3rem',
                    }}
                >
                    No products in cart
                </h1>
            </div>
        );
    return (
        <div>
            <div style={{ marginBottom: '5rem' }}>
                <button
                    onClick={() => {
                        history.push('/store');
                    }}
                    style={{
                        minWidth: '200px',
                        height: '50px',
                        backgroundColor: '#4c9cff',
                        color: 'white',
                        position: 'fixed',
                        top: 0,
                        left: 0,
                    }}
                >
                    Go to Store
                </button>
            </div>

            <ul style={{ listStyle: 'none' }}>
                {products.map(product => (
                    <li
                        key={product.id}
                        style={{
                            border: '1px solid black',
                            borderRadius: '10px',
                            margin: '10px',
                            padding: '10px',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <img
                                src={`${product.pictures[0].mini}`}
                                alt={`${product.caption}`}
                            />
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    margin: ' 0 0 0 10px',
                                }}
                            >
                                <div style={{ marginBottom: '5px' }}>
                                    {product.brand}
                                </div>
                                <div>{product.caption}</div>
                            </div>
                            <button
                                style={{
                                    marginLeft: 'auto',
                                    backgroundColor: 'green',
                                    borderRadius: '50%',
                                    border: '1px solid black',
                                    display: 'inline-block',
                                    cursor: 'pointer',
                                    color: '#ffffff',
                                    fontSize: '17px',
                                    padding: '5px 10px',
                                    textDecoration: 'none',
                                }}
                                onClick={() => handleIncrease(product.id)}
                            >
                                +
                            </button>
                            <div style={{ margin: '10px' }}>
                                {product.amount}
                            </div>
                            <button
                                style={{
                                    backgroundColor: 'red',
                                    borderRadius: '50%',
                                    border: '1px solid black',
                                    display: 'inline-block',
                                    cursor: 'pointer',
                                    color: '#ffffff',
                                    fontSize: '17px',
                                    padding: '5px 12px',
                                    textDecoration: 'none',
                                }}
                                onClick={() => handleDecrease(product.id)}
                            >
                                -
                            </button>
                            <div
                                style={{
                                    marginLeft: '10px',
                                }}
                            >
                                {product.price}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CartView;
