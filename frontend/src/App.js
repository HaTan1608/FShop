import React from 'react';
import Header from './components/Header';
import data from './data';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import ProductsPage from './pages/ProductsPage';
import ProductScreen from './pages/ProductScreen';
import CartScreen from './pages/CartScreen';
import SigninScreen from './pages/SigninScreen';
import RegisterScreen from './pages/RegisterScreen';
import InformationScreen from './pages/InformationScreen';
import PaymentScreen from './pages/PaymentScreen';
import OrderDetails from './pages/OrderDetails';
function App() {
  return (

    <Router>
      <Route path="/" exact component={ProductsPage} />
      <Route path="/register" exact component={RegisterScreen} />
      <Route path="/signin" exact component={SigninScreen} />
      <Route path="/cart" exact component={CartScreen} />
      <Route path="/cart/:id" component={CartScreen} />
      <Route path="/products" exact component={ProductsPage} />
      <Route path="/product/:id" exact component={ProductScreen} />
      <Route path="/checkout" exact component={InformationScreen} />
      <Route path="/payment" exact component={PaymentScreen} />
      <Route path="/order/:id" exact component={OrderDetails} />
    </Router>

  );
}

export default App;
