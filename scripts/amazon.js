import { addProductToCart, calculateCartQuantity } from "../data/cart.js"
import { products } from "../data/products.js"
import { formatCurrency } from './utility/money.js';

// console.log(products)

let productsHTML = ''
//Generating the products using an array 
products.forEach((product) => {

    productsHTML += 
    `
    <div class="product-container">
        <div class="product-image-container">
        <img class="product-image" 
        src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
       ${product.name}
        </div>

        <div class="product-rating-container">
        <img class="product-rating-stars"
            src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
        ${product.rating.count}
        </div>
        </div>

        <div class="product-price">
        $${formatCurrency(product.priceCents)}
        </div>

        <div class="product-quantity-container">
        <select class="js-quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
        </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-to-cart-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart"
        data-product-id="${product.id}">
        Add to Cart
        </button>
    </div>
    `
})

document.querySelector('.js-products-grid').innerHTML = productsHTML

let addedMessageTimeouts;

// loop the button
document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
        // specify the button we clicked or product we ad to cart using data attributes using product id for unique of it and to specify which product we  clicked
        // console.log(button.dataset.productId);
        // now store to the variable the product we add to cart
        const productId = button.dataset.productId

            // addNumberOfCart(productId)

        
        addProductToCart(productId)

        
        updateCartQuantity(productId)

        Message(productId);

    })
})


// For setTimeout Added when we add to cart 
// Challenge Exercise
let timeoutId ;
function Message(productId){
    const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);

    // setTimeout
    setTimeout(() => {
        addedMessage.classList.add('added-to-cart-visible');


        clearTimeout(timeoutId);
        // to remove the added class
        timeoutId = setTimeout(() => {
            addedMessage.classList.remove('added-to-cart-visible');
            }, 2000)
    }, 1000)
    


}




function updateCartQuantity(productId){
    // Lesson 14e part 2 
    
    // let cartQuantity = 0;
    // itemCart.forEach((cartItem) => {
    //     cartQuantity += cartItem.quantity;
    // })

    const cartQuantity = calculateCartQuantity()

    if(cartQuantity > 0){
        document.querySelector('.js-cart-quantity').innerHTML = cartQuantity
    } else {
        document.querySelector('.js-cart-quantity').innerHTML = ``
    }
    console.log(cartQuantity)




}

updateCartQuantity()// to display cartQty in web page



// add an dom and eventListener to add to cart 

// // updating the cart
// function updateCart(){
//     let cartQty = 0;

// }