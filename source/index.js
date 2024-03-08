let product = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
  return (product.innerHTML = clothingData
    .map((item) => {
      return `<div id=product-id-${item.id} class="shopCard">
        <img width="100%" height="230" src="${item.image}" />
        <div class="item">${item.name}</div>
        <div class="desc">
            ${item.desc}
        </div>
        <div class="amount">
          <div class="price">$${item.price.toFixed(2)}</div>
          <div class="button">
            <div onclick="decrement(${item.id})" class="decrement">-</div>
            <div id=${item.id} class="number">0     
             </div>
            <div onclick="increament(${item.id})" class="increament">+</div>
          </div>
        </div>

      </div>
      
    </div>`;
    })
    .join(""));
};
generateShop();
//********************************INCREAMENT**************************************** */
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

  localStorage.setItem("data", JSON.stringify(basket));
};
//********************************UPDATE**************************************** */
let update = (id) => {
  let search = basket.find((product) => product.id === id);
  document.getElementById(id).innerHTML = search.item;
  // console.log(search.item);
  calculation();
};
//********************************CALCULATION**************************************** */
let calculation = () => {
  let cartIcon = document.getElementById("quantity");
  cartIcon.innerHTML = basket
    .map((quantity) => quantity.item)
    .reduce((x, y) => x + y, 0); //reduce the number by adding
};
calculation(); //evey time page loads it calculate and appear number on cart
