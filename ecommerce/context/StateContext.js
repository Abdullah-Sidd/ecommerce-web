import React, { createContext, useContext, useState, useEffect } from 'react';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  useEffect(() => {
    try {
      if(localStorage.getItem("cartItems")){
        setCartItems(JSON.parse(localStorage.getItem("cartItems"))) 
        savecart(JSON.parse(localStorage.getItem("cartItems"))) 
      }
    } catch (error) {
      localStorage.clear()
    }
   }, [])


   const savecart = (cartItems) =>{
    localStorage.setItem("cartItems" , JSON.stringify(cartItems))
    let total = 0;
    for(let i=0  ; i<cartItems.length ; i++){
      total += cartItems[i].price * cartItems[i].quantity;
    }
    setTotalPrice(total)
  }


  // subt += mycart[keys[i].price] * mycart[keys[i]].qty;    
// working currently
  let foundProduct;
  let index;


  const onAdd = (products, quantity) => {
    const checkProductInCart = cartItems.find((item) => item._id === products._id);
    
    setTotalPrice((prevTotalPrice) => prevTotalPrice + products.price * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    
    if(checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if(cartProduct._id === products._id) return {
          quantity: cartProduct.quantity + quantity
        }
      })

      setCartItems(updatedCartItems);
    } else {
      
      setCartItems([...cartItems, { ...products }]);
      savecart([...cartItems, { ...products }])
    }

    // toast.success(`${qty} ${product.name} added to the cart.`);
  } 
  // const onAdd = (product, quantity) =>
  //   {
  //       // see if product is already in the cart
  //       const productInCart = cartItems.find((item) => item._id === product._id);
  //       // this needs to happen regardless if item is already in cart
  //       setTotalPrice(prevTotalPrice => prevTotalPrice + product.price * quantity);
  //       setTotalQuantities(prevTotalQuantities => prevTotalQuantities + quantity);
  //       // if product is already in cart -> add new quantity to previous quantity
  //       if (productInCart)
  //       {
  //           const updatedCartItems = cartItems.map((item) =>
  //           {
  //               // find the matching product and adjust the number in the cart
  //               if (item._id === product._id)
  //               {
  //                   return { ...item, quantity: item.quantity + quantity };
  //               }
  //           });
  //           setCartItems(updatedCartItems);
  //       }    else
  //       {
  //           product.quantity = quantity;
  //           setCartItems(productInCart);
  //       }
  //       // so each product defaults to 1 when navigating to a new product
  //       setQty(1);
  //       savecart([...cartItems, { ...product }])
  //   }


  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice -foundProduct.price * foundProduct.quantity);
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
    setCartItems(newCartItems);
    savecart(newCartItems)
  }

  const toggleCartItemQuanitity = (id, value) => {

    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id);
 
    if (value === "inc") {
      newCartItems.splice(index, 0, {...foundProduct, quantity: foundProduct.quantity + 1})
 
      setCartItems([ ...newCartItems ]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        newCartItems.splice(index, 0, {...foundProduct, quantity: foundProduct.quantity - 1})
 
        setCartItems([ ...newCartItems ]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
    savecart(newCartItems)
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
    savecart(newCartItems)
  }

  const decQty = () => {
    setQty((prevQty) => {
      if(prevQty - 1 < 1) return 1;
     
      return prevQty - 1;
    });
    savecart(newCartItems)
  }


         
    return (
        <Context.Provider
          value={{
            showCart,
            setShowCart,
            cartItems,
            totalPrice,
            totalQuantities,
            qty,
            incQty,
            decQty,
            onAdd,
            toggleCartItemQuanitity,
            onRemove,
            setCartItems,
            setTotalPrice,
            setTotalQuantities
                    }}
        >
          {children}
        </Context.Provider>
      )
}
export const useStateContext = () => useContext(Context);