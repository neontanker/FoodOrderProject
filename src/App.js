import React, { useState } from "react";
import Meals from "./Components/Meals/Meals";
import Header from "./Components/Layout/Header";
import Cart from "./Components/Cart/Cart";
import CartProvider from "./store/CartProvider";



function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const hideCartHandler = () => {
    console.log("SetModalFalse")
    setCartIsShown(false)
  }
  const showCartHandler = () => {
    console.log("SetModalTrue")
    setCartIsShown(true)
  }

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler}/>}
    <Header onCartClick={showCartHandler}/>
    <main>
      <Meals />
    </main>
    </CartProvider>
  );
}

export default App;
