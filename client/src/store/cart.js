import { createSlice } from '@reduxjs/toolkit';

// const localCart = JSON.parse(localStorage.getItem('localCart'))

/*
export const fetchProducts = createAsyncThunk('setCartAtStart', async () => {
  const localCart = await JSON.parse(localStorage.getItem('localCart'))
  let query = localCart.map(el => 'ids=' + el.id).join('&');
  const response = await fetch(
    `http://localhost:5000/products?${query}`
    );
    const responseData = await response.json();
    return responseData.data;
  })
*/

const initialState = {
  products: [],
}

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    setCart: (state, { payload }) => {
      state.products = payload || []
    },
  },
  /*
  extraReducers(builder) {
    builder.addCase(fetchProducts.fulfilled, (state, { payload }) => {
      const cart = payload.map(element => {
        return {
          ...element,
          amount: 1
        };
      });
      console.log('extraReducers... addCase... fetchProducts.fullfilled...');
      state.products = cart
    })
  }
  */
})


export const fetchLocal = () => async (dispach, getState) => {
  try {
    const localCart = await JSON.parse(localStorage.getItem('localCart'))
    if (!localCart || localCart.length <= 0) {
      throw new Error('Error: no data in localStorage')
    }
    let query = localCart.map(el => 'ids=' + el.id).join('&');
    console.log('query', query);
    // z listą ID wczytaj pozostałe dane produktów
    const response = await fetch(
      `http://localhost:5000/products?${query}`
    );
    if (!response.ok) throw new Error('Error: no response')
    const responseJson = await response.json()
    const data = responseJson.data
    const cart = data.map(element => {
      // zwróć do CART element wraz z ilością z lokala
      console.log('element:', element);
      return {
        ...element,
        amount: localCart.find(el => el.id === element.id).amount,
      };
    });
    dispach(setCart(cart))
    // add to local new product or new amount
    saveToLocal(getState);
  } catch (error) {
    console.error(error.message);
    dispach(setCart([]))
    // add to local new product or new amount
    saveToLocal(getState);
  }
}

export const addItemToCart = id => async (dispach, getState) => {

  // check item in SHOP by ID
  const isInShop = getState().shop.products.some(el => el.id === id);

  // no item in shop - skip
  if (isInShop) {

    // item in shop, check if in CART
    const selectedItem = getState().cart.products.find(el => el.id === id)

    // item in SHOP, not in CART, add item to cart
    if (!selectedItem) {
      // get all product data from shop
      const product = getState().shop.products.find(el => el.id === id)

      // add all required product data to in-memory CART
      dispach(setCart([
        ...getState().cart.products,
        {
          id,
          amount: 1,
          brand: product.brand,
          caption: product.caption,
          price: product.price,
          picture: product.pictures[0].mini
        }
      ]))

    } else {
      // product is in CART, increase amount + 1
      dispach(
        setCart(
          getState()
            .cart
            .products
            .map(element => {
              if (element.id === id) {
                return {
                  ...element,
                  amount: element.amount + 1,
                }
              }
              return element
            })));
    }
    // add to local new product or new amount
    saveToLocal(getState);
  }
}

export const increaseProductAmountById = id => async (dispach, getState) => {
  dispach(setCart(getState().cart.products.map(element => {
    if (element.id === id) {
      return {
        ...element,
        amount: element.amount + 1,
      }
    }
    return element
  })));

  // add to local new product or new amount
  saveToLocal(getState);
}

export const decreaseProductAmountById = id => async (dispach, getState) => {
  const newState = getState().cart.products.map(element => {
    if (element.id === id) {
      return {
        ...element,
        amount: element.amount - 1,
      }
    }
    return element
  })

  console.log('newState', newState);

  const filteredState = newState.filter(el => el.amount > 0)
  dispach(setCart(filteredState));

  // add to local new product or new amount
  saveToLocal(getState);
}

const { actions, reducer } = cartSlice
const { setCart } = actions

export default reducer

function saveToLocal(getState) {
  const newLocalState = getState().cart.products.map(element => {
    return {
      amount: element.amount,
      id: element.id
    };
  });
  console.log('newLocalState', newLocalState);
  localStorage.setItem('localCart', JSON.stringify(newLocalState));
}
