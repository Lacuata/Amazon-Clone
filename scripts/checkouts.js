import { itemCart, removeToCart, calculateCartQuantity,updateQuantity } from "../data/cart.js";
import {products} from "../data/products.js";
import {formatCurrency} from "./utility/money.js";


// stor the html 
let cartSummaryHTML = '';

itemCart.forEach((cartItem) => { 
    const productId = cartItem.productId;

    let matchingProductId;

    products.forEach((product) => {
        if (product.id === productId){
            matchingProductId = product;
        }
    });

    // console.log(matchingProductId);

    cartSummaryHTML += `  
    <div class="cart-item-container 
        js-cart-item-container-${matchingProductId.id}">
        <div class="delivery-date">
            Delivery date: Wednesday, June 15
        </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
         src="${matchingProductId.image}">

      <div class="cart-item-details">
        <div class="product-name">
         ${matchingProductId.name}
        </div>
        <div class="product-price">
        $${formatCurrency(matchingProductId.priceCents)}
        </div>
        <div class="product-quantity">
          <span>
          <!--This is to hide the Quantity when we clicked the update only show the input -->
          Quantity: <span class="quantity-label js-quantity-label-${matchingProductId.id}">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProductId.id}">
            Update
          </span>

          <!-- Here is the quantity input  -->
          <input class="quantity-input js-quantity-input-${matchingProductId.id}" >
          <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingProductId.id}">
          Save
          </span>

          <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProductId.id}">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>

        <div class="delivery-option">
          <input type="radio" class="delivery-option-input"
            name="delivery-option-${matchingProductId.id}">
          <div>
            <div class="delivery-option-date">
              Tuesday, June 21
            </div>
            <div class="delivery-option-price">
              FREE Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio" checked class="delivery-option-input"
            name="delivery-option-${matchingProductId.id}">
          <div>
            <div class="delivery-option-date">
              Wednesday, June 15
            </div>
            <div class="delivery-option-price">
              $4.99 - Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio" class="delivery-option-input"
            name="delivery-option-${matchingProductId.id}">
          <div>
            <div class="delivery-option-date">
              Monday, June 13
            </div>
            <div class="delivery-option-price">
              $9.99 - Shipping
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    `
})

// console.log(cartSummaryHTML)
document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-link').forEach((deleteButton) => {

    deleteButton.addEventListener('click', () => {
        const deleteProductId = deleteButton.dataset.productId;
        // remove
        // deleteProductId.remove()
        removeToCart(deleteProductId)
        // console.log(itemCart)

        const newContainer = document.querySelector(`.js-cart-item-container-${deleteProductId}`);


        newContainer.remove();

        updateCheckoutCartQuantity()
    })

    
})


// Lesson 14 exercise cartCheckout in chceckout.js
function updateCheckoutCartQuantity(newQuantity){
    // let cartQuantity = 0;
    
    // itemCart.forEach((cartItem) => {
    //     cartQuantity += cartItem.quantity;
    // })

    // Lesson 14e part 3

    const cartQuantity = calculateCartQuantity();

    if(cartQuantity > 0){
        document.querySelector('.js-cart-checkout').innerHTML = `${cartQuantity} items`
    } else {
        document.querySelector('.js-cart-checkout').innerHTML = ``
    }
    

}
// to show in web page cart qty in checkout
updateCheckoutCartQuantity();


//   for update when we clicked
document.querySelectorAll('.js-update-link')
  .forEach((updateButton) => {
    // whwen we click 
    updateButton.addEventListener('click', () => {
        // we're gonna store the data attribute of updat to updateProduct Id
        const updateProductId = updateButton.dataset.productId;

        // then we're gonna create a newContainer = the container we clicked
        // to show the input to update
        const updateContainer = document.querySelector(`.js-cart-item-container-${updateProductId}`);

        // add class to updateContainer 
        updateContainer.classList.add('is-editing-quantity');

        // console.log(updateProductId)
        // console.log('Update')
    })
  })


//   to save the update qty 
document.querySelectorAll('.js-save-link').forEach((saveUpdateButton) => {
    saveUpdateButton.addEventListener('click', () => {
        const savedUpdateId = saveUpdateButton.dataset.productId;
        console.log('The id is', savedUpdateId)

        // saved to new variable 
        const saveContainer = document.querySelector(`.js-cart-item-container-${savedUpdateId}`);
        // remove the class
        saveContainer.classList.remove('is-editing-quantity')

        // saved to new variable
        const quantityInput = document.querySelector(`.js-quantity-input-${savedUpdateId}`)

        // newQuantity is the value we put in input
        const newQuantity = Number(quantityInput.value)

        console.log('The new', newQuantity)

    

        // to pass the value of newQuantity and savedUpdate
        updateQuantity(newQuantity,savedUpdateId)
        // to update the Qty in html 
        const quantityLabel = document.querySelector(`.js-quantity-label-${savedUpdateId}`)

        // to reassigned the value to newQuantity
        quantityLabel.innerHTML = newQuantity

        console.log(quantityLabel)

        updateCheckoutCartQuantity(newQuantity)

        // to update it in webpage
        // updateCheckoutCartQuantity()
        
    })
})


// function saveUpdateButtonFunction(saveUpdateButton){
//     const savedUpdateId = saveUpdateButton.dataset.productId;
//     console.log('The id is', savedUpdateId)

//     // saved to new variable 
//     const saveContainer = document.querySelector(`.js-cart-item-container-${savedUpdateId}`);
//     // remove the class
//     saveContainer.classList.remove('is-editing-quantity')

//     // saved to new variable
//     const quantityInput = document.querySelector(`.js-quantity-input-${savedUpdateId}`)

//     // newQuantity is the value we put in input
//     const newQuantity = Number(quantityInput.value)

//     if (newQuantity < 0 || newQuantity >= 1000) {
//         alert('Quantity must be at least 0 and less than 1000');
//         return;
//       }

//     console.log('The new', newQuantity)



//     // to pass the value of newQuantity and savedUpdate
//     updateQuantity(newQuantity,savedUpdateId)
// // Remember on how we pass the data that also how were gonna receive it so each value will not reversed

//     // to update the Qty in html 
//     const quantityLabel = document.querySelector(`.js-quantity-label-${savedUpdateId}`)

//     // to reassigned the value to newQuantity
//     quantityLabel.innerHTML = newQuantity

//     console.log(quantityLabel)

//     updateCheckoutCartQuantity(newQuantity)

//     // to update it in webpage
//     // updateCheckoutCartQuantity()
// }


// //   to save the update qty 
// document.querySelectorAll('.js-save-link').forEach((saveUpdateButton) => {
//     saveUpdateButton.addEventListener('click', () => {
//         saveUpdateButtonFunction(saveUpdateButton)
        
//     })
// })