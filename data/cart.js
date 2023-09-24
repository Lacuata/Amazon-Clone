// for add to cart  contain all code about cart
export let itemCart = JSON.parse(localStorage.getItem('cartItem')) || [
    {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2
    },
    {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1
    },
]



// // // saved the cart to localStorage
function savedToLocalStorage(){
    localStorage.setItem('cartItem', JSON.stringify(itemCart))
}

export function addProductToCart(productId) {
    let matchingItemCart;

    itemCart.forEach((cartItem) => {
        if(cartItem.productId === productId){
            matchingItemCart = cartItem
        }

    })

          // to increase the added cart by the number of selector option not by one this is exercise
  const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`)
      const quantity = Number(quantitySelector.value)
    

    if(matchingItemCart){
        // matchingItemCart.quantity++; //orig code
        // this is when we choose morethan 1 quantity of product it will add to cart it example 5 product then we click add to cart in cart it will add +5 and from this exercise 
        matchingItemCart.quantity += quantity;

    } else {
        itemCart.push({
            // structured in our data
            productId,
            // quantity: 1, //orig code
            quantity: quantity //exercise

            
        })
    }
    
    // console.log('Added to cart1', itemCart);

    savedToLocalStorage();
}




// // for checkout to removeCart

export function removeToCart(deleteProductId){


    
    let newCart = [];

    itemCart.forEach((cartItem) => {
        if(cartItem.productId !== deleteProductId){
            newCart.push(cartItem)
        }
    })
    itemCart = newCart;

    
    
    savedToLocalStorage(); 
}

// function to update cartQty at home(amazon) and checkout page (checkout)
// Lesson 14e part1 
export function calculateCartQuantity(){
    let cartQty = 0;

    itemCart.forEach(( cartItem) => {
        cartQty += cartItem.quantity
    })
    return cartQty;



}

// Chalenge Exercise 14m
export function updateQuantity(newQuantity, savedUpdateId ) {
// Remember on how we pass the data that also how were gonna receive it so each value will not reversed
    let matchingItem;
    console.log('The new', newQuantity)


    itemCart.forEach((cartItem) => {
        if (cartItem.productId === savedUpdateId){
            matchingItem = cartItem
        }
    })  


    matchingItem.quantity = newQuantity;

    savedToLocalStorage();
  }

  
