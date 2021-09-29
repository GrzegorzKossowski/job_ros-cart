import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addItemToCart } from '../store/cart';

const StoreView = () => {
    const { products } = useSelector(state => state.shop);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleClick = id => {
        dispatch(addItemToCart(id));
    };

    return (
        <div>
            {/* <Link to='/cart'>Cart</Link> */}
            <button
                onClick={() => {
                    history.push('/cart');
                }}
                style={{
                    height: '50px',
                    width: '100px',
                    backgroundColor: 'red',
                    color: 'white',
                    display:'flex',
                    alignItems: 'center',
                    justifyContent: 'space-evenly'
                }}
            >
                <svg
                    height='20pt'
                    color='inherit'
                    fill='currentColor'
                    viewBox='0 -31 512.00033 512'
                    width='20pt'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path d='m166 300.003906h271.003906c6.710938 0 12.597656-4.4375 14.414063-10.882812l60.003906-210.003906c1.289063-4.527344.40625-9.390626-2.433594-13.152344-2.84375-3.75-7.265625-5.964844-11.984375-5.964844h-365.632812l-10.722656-48.25c-1.523438-6.871094-7.617188-11.75-14.648438-11.75h-91c-8.289062 0-15 6.710938-15 15 0 8.292969 6.710938 15 15 15h78.960938l54.167968 243.75c-15.9375 6.929688-27.128906 22.792969-27.128906 41.253906 0 24.8125 20.1875 45 45 45h271.003906c8.292969 0 15-6.707031 15-15 0-8.289062-6.707031-15-15-15h-271.003906c-8.261719 0-15-6.722656-15-15s6.738281-15 15-15zm0 0' />
                    <path d='m151 405.003906c0 24.816406 20.1875 45 45.003906 45 24.8125 0 45-20.183594 45-45 0-24.8125-20.1875-45-45-45-24.816406 0-45.003906 20.1875-45.003906 45zm0 0' />
                    <path d='m362.003906 405.003906c0 24.816406 20.1875 45 45 45 24.816406 0 45-20.183594 45-45 0-24.8125-20.183594-45-45-45-24.8125 0-45 20.1875-45 45zm0 0' />
                </svg>{' '}
                CART
            </button>
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                }}
            >
                {products &&
                    products.map(product => (
                        <div
                            key={product.id}
                            style={{
                                margin: '1rem',
                                padding: '1rem',
                                width: '300px',
                                border: '1px solid black',
                                display: 'flex',
                            }}
                        >
                            <img
                                src={`${product.pictures[0].medium}`}
                                alt={`${product.caption}`}
                                style={{
                                    marginRight: '10px',
                                    height: '300px',
                                }}
                            />
                            <div>
                                <h3>{product.name}</h3>
                                <p>{product.caption}</p>
                                <div
                                    style={{
                                        color: 'red',
                                        fontSize: '2rem',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {product.price}
                                </div>
                                <div>{product.pricePerUnit}</div>
                                <button onClick={() => handleClick(product.id)}>
                                    Dodaj
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default StoreView;
