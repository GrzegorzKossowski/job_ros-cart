import { lazy, Suspense, useEffect } from 'react';
import './App.css';
import { Route, Switch } from 'react-router';
import { useDispatch } from 'react-redux';
import { fetchData } from './store/shop';
import { fetchLocal } from './store/cart';

const StoreView = lazy(() => import('./views/StoreView'))
const CartView = lazy(() => import('./views/CartView'))

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    // dispatch(fetchProducts())
    dispatch(fetchLocal())
    dispatch(fetchData())
    
    return () => {
    }
  }, [dispatch])


  return (
    <Switch>
      <Suspense fallback={<div>Loading...</div>}>
        <Route exact path={['/', '/store']} component={StoreView} />
        <Route exact path={['/cart']} component={CartView} />
      </Suspense>
    </Switch>
  );
}

export default App;
