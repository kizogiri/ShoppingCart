let label = document.getElementById("label");
let basket = JSON.parse(localStorage.getItem("data")) || [];
console.log(basket);
let ShoppingCart = document.getElementById("container");

let calculation = () => {
  let cartIcon = document.getElementById("quantity");
  cartIcon.innerHTML = basket
    .map((quantity) => quantity.item)
    .reduce((x, y) => x + y, 0);
};
calculation(); //evey time page loads it calculate and appear number on cart

let generateCart = () => {
  if (basket.length !== 0) {
    return (ShoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x; //from basket
        let search = clothingData.find((y) => y.id === id) || []; // get from data.js and comapre to basket
        // let { img , name , price}= search //destructing the object
        return `<div class="cart-details">
          <img class= "image" height="110" width="140" src= ${search.image} />
            <div class="item">
              <div class="product-details">
              <h4>${search.name}</h4>
              <div class="price">
              <p class="amount-cart">$ ${search.price}</p>
              <i onclick=" removeItem(${id}) " class="fa fa-x"></i>
              </div>
              </div>
            <div class="button">
            <div onclick="decrement(${id})" class="decrement">-</div>
            <div id=${id} class="number">${item}</div>
            <div onclick="increament(${id})">+</div>
            </div>
             <h4> $ ${(item * search.price).toFixed(2)}<h4>
            </div>
           
          </div> 
          
    `;
      })
      .join(""));
  } else {
    ShoppingCart.innerHTML = ``;
    label.innerHTML = `
    <h2> Cart is Empty</h2>
    <a href="index.html">
    <button class="homeButton">Back to Home</button>
    </a>
    `;
  }
};
generateCart();

let increament = (id) => {
  let search = basket.find((product) => product.id === id);
  if (search === undefined) {
    basket.push({
      id: id,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  generateCart();
  update(id);
  localStorage.setItem("data", JSON.stringify(basket));
  //console.log(basket);
};
//********************************DECREMENT**************************************** */
let decrement = (id) => {
  let search = basket.find((product) => product.id === id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(id);

  basket = basket.filter((id) => id.item !== 0); //remove 0 item from basket
  //console.log(basket);
  generateCart();
  localStorage.setItem("data", JSON.stringify(basket));
};
//********************************UPDATE**************************************** */
let update = (id) => {
  let search = basket.find((product) => product.id === id);
  document.getElementById(id).innerHTML = search.item;
  // console.log(search.item);
  generateCart();
  calculation();
  totalAmount();
};

let removeItem = (id) => {
  let selectedItem = id;
  console.log(selectedItem);
  basket = basket.filter((x) => x.id !== selectedItem);
  generateCart();
  totalAmount();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
};

let clearCart = () => {
  basket = [];
  generateCart();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
};

let totalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { item, id } = x;
        let search = clothingData.find((y) => y.id == id) || [];
        return item * search.price;
      })
      .reduce((x, y) => x + y, 0);
    //console.log(amount);
    label.innerHTML = `
    <h2> Totoal Bill : $ ${amount}</h2>
    <button class=checkout>Checkout</button>
     <button onclick="clearCart()" class=removeAll>Clear Cart</button>
    `;
  } else return;
};
totalAmount();
