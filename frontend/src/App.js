import React from 'react';
import Header from './components/Header';
import data from './data';
import {BrowserRouter as Router,Route,Switch} from "react-router-dom"
import ProductsPage from './pages/ProductsPage';
function App() {
  return (
    
    <Router>
      <Route path="/products" exact component={ProductsPage}/>
    </Router>
    
  );
}

export default App;
