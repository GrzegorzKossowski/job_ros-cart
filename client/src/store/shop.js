import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: []
}

const shopSlice = createSlice({
  name: 'shopSlide',
  initialState,
  reducers: {
    setProducts: (state, { payload }) => {
      state.products = payload
      state.error = null
    }
  }
})

export const fetchData = () => async (dispach, getState) => {
  try {
    const response = await fetch(
      'http://127.0.0.1:5000'
    );
    const data = await response.json()
    const products = await data.data.products
    dispach(setProducts(products))
  } catch (error) {
    console.log(error);
  }

}

const { actions, reducer } = shopSlice
const { setProducts } = actions

export default reducer