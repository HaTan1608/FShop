import React from 'react';

import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import ProductsPage from './pages/ProductsPage';
import ProductScreen from './pages/ProductScreen';
import CartScreen from './pages/CartScreen';
import SigninScreen from './pages/SigninScreen';
import RegisterScreen from './pages/RegisterScreen';
import InformationScreen from './pages/InformationScreen';
import PaymentScreen from './pages/PaymentScreen';
import OrderDetails from './pages/OrderDetails';
import OrdersHistoryScreen from './pages/OrdersHistoryScreen';
import PrivateRoute from './components/PrivateRoute';
import ProfileScreen from './pages/ProfileScreen';

import ProductListScreen from './pages/ProductListScreen';
import AdminRoute from './components/AdminRoute';
import ProductEditScreen from './pages/ProductEditScreen';
import OrderListScreen from './pages/OrderListScreen.';
import HomePage from './pages/HomePages';
import SearchScreen from './pages/SearchScreen';
import LoadingBox from './components/Message/LoadingBox';
import NotFound from './pages/NotFound';
import AnimationsProvider from './animations/AnimationsProvider';
import Header from './components/Header';
import Footer from './components/Footer/Footer';
function App() {
  return (

    <Router>  <AnimationsProvider><HelmetProvider>
      <Switch>


        <Route path="/" exact component={HomePage} />
        <Route path="/register" exact component={RegisterScreen} />
        <Route path="/signin" exact component={SigninScreen} />
        <Route path="/cart" exact component={CartScreen} />
        <Route path="/cart/:id" component={CartScreen} />
        <Route path="/products/:gender" exact component={ProductsPage} />
        <Route path="/product/:id" exact component={ProductScreen} />
        <Route path="/orderhistory" exact component={OrdersHistoryScreen} />
        <Route
          path="/product/:id/edit"
          component={ProductEditScreen}
          exact
        />

        <Route
          path="/search/name/:name?"
          component={SearchScreen}
          exact
        ></Route>
        <PrivateRoute
          path="/profile"
          component={ProfileScreen}
        ></PrivateRoute>
        <AdminRoute
          path="/productlist"
          component={ProductListScreen}
        ></AdminRoute>
        <AdminRoute
          path="/orderlist"
          component={OrderListScreen}
        ></AdminRoute>
        <Route path="/checkout" exact component={InformationScreen} />
        <Route path="/payment" exact component={PaymentScreen} />
        <Route path="/order/:id" exact component={OrderDetails} />
        <Route path='/loading' excart component={LoadingBox} />
        <Route component={NotFound} />




      </Switch></HelmetProvider>   </AnimationsProvider>
    </Router>

  );
}

export default App;
