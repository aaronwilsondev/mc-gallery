import React from "react";
import './index.css';

import {BrowserRouter, Link, Route} from "react-router-dom";
import ProductScreen from "./pages/ProductScreen/productscreen.component.jsx";
import HomeScreen from "./pages/HomeScreen/homescreen.component";
import CartScreen from "./pages/CartScreen/cartscreen";
import { useDispatch, useSelector } from "react-redux";
import SignInScreen from "./pages/SignInScreen/SignInScreen";
import { signout } from "./redux/actions/userActions";
import RegisterScreen from "./pages/RegisterScreen/RegisterScreen";
import ShippingAddressScreen from "./pages/ShippingAddressScreen/ShippingAddressScreen";
import PaymentMethodScreen from "./pages/PaymentMethodScreen/PaymentMethodScreen";
import PlaceOrderScreen from "./pages/PlaceOrderScreen/PlaceOrderScreen";
import OrderScreen from "./pages/OrderScreen/OrderScreen";
import OrderHistoryScreen from "./pages/OrderHistoryScreen/OrderHistoryScreen";
import ProfileScreen from "./pages/ProfileScreen/ProfileScreen";
import PrivateRoute from "./components/PrivateRoute";

function App() {

  const cart = useSelector((state) => state.cart);
  const {cartItems} = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();

  const signoutHandler = () => {
     dispatch(signout());
  }

  return (
    <BrowserRouter>
    <div className="grid-container">
      <header className="row">
        <div>
          <Link className="brand" to="/" alt="home">ELLA CREATES</Link>
        </div>
        <div>
          <Link to="/cart">Cart
          {
            cartItems.length > 0 && (
              <span className="badge">{cartItems.length}</span>
            )
          }
          </Link>
          {
            userInfo ? (
              <div className="dropdown">
              <Link to="#">{userInfo.name} <i className="fa fa-caret-down"></i>
              </Link>
              <ul className="dropdown-content">
               <li>
                 <Link to="#signout" onClick={signoutHandler}>Sign Out</Link>
               </li>
               <li>
                 <Link to="/profile">User</Link>
               </li>
               <li>
                 <Link to="/orderhistory">Order History</Link>
               </li>
              </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )
          }
        </div>
      </header>
      <main>
      <Route path="/cart/:id?" component={CartScreen} exact></Route>
      <Route path="/product/:id" component={ProductScreen}></Route>
      <Route path="/signin" component={SignInScreen}></Route>
      <Route path="/register" component={RegisterScreen}></Route>
      <Route path="/shipping" component={ShippingAddressScreen}></Route>
      <Route path="/payment" component={PaymentMethodScreen}></Route>
      <Route path="/placeorder" component={PlaceOrderScreen}></Route>
      <Route path="/order/:id" component={OrderScreen}></Route>
      <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
      <PrivateRoute 
      path="/profile"
      component={ProfileScreen}>
       </PrivateRoute>
      <Route path="/" component={HomeScreen} exact></Route>
      </main>
      <footer className="row center">
         All right reserved
      </footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
