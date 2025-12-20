
let bagitemobjects = [];
onload();
function onload() {
  loadbagitemobjects();
  displaybagitemcount();
  displaybagsummary();
}
function displaybagsummary() {
  let bagsummaryElement = document.querySelector(".bag-summary");
  let Totalitems = bagitemobjects.length;
  let TotalMRP = 0;
  let TotalDiscount = 0;
  let CONVENIENCE_FEE = 0;

  bagitemobjects.forEach((bagItems) => {
    TotalMRP += bagItems.original_price;
    TotalDiscount += bagItems.original_price - bagItems.current_price;
    CONVENIENCE_FEE = bagItems.Convenience_fee;
  });
  let TotalAmt = TotalMRP - TotalDiscount + CONVENIENCE_FEE;

  bagsummaryElement.innerHTML = `<div class="bag-details-container">
            <div class="price-header">PRICE DETAILS (${Totalitems} Items)</div>
            <div class="price-item">
              <span class="price-item-tag">Total MRP</span>
              <span class="price-item-value">₹${TotalMRP}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Discount on MRP</span>
              <span class="price-item-value priceDetail-base-discount"
                >-₹${TotalDiscount}</span
              >
            </div>
            <div class="price-item">
              <span class="price-item-tag">Convenience Fee</span>
              <span class="price-item-value">₹${CONVENIENCE_FEE}</span>
            </div>
            <hr />
            <div class="price-footer">
              <span class="price-item-tag">Total Amount</span>
              <span class="price-item-value">₹${TotalAmt}</span>
            </div>
          </div>
          <button class="btn-place-order">
            <div class="css-xjhrni" onclick="placeOrder()">BUY NOW</div>
          </button>`;
}
function placeOrder() {
  window.location.href = "order.html";
 

}
function loadbagitemobjects() {
  console.log(bagItems);
  bagitemobjects = bagItems.map((itemId) => {
    for (let i = 0; i < products.length; i++) {
      if (itemId == products[i].id) {
        return products[i];
      }
    }
  });
  console.log(bagitemobjects);
}

function displaybagitemcount() {
  let bagcontainerElement = document.querySelector(".bag-items-container");
  let innerHTML = "";
  bagitemobjects.forEach((bagItems) => {
    innerHTML += generateitemHTML(bagItems);
    
  });

  bagcontainerElement.innerHTML = innerHTML;
}
function removefrombag(itemId) {
  bagItems = bagItems.filter((bagItemId) => bagItemId != itemId);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  loadbagitemobjects();
  displaybagCount();
  displaybagitemcount();
  displaybagsummary();
}
function generateitemHTML(item) {
  return `<div class="bag-item-container">
            <div class="item-left-part">
              <img class="bag-item-img" src="./${item.image}" />
            </div>
            <div class="item-right-part">
              <div class="company">${item.company}</div>
              <div class="item-name">
                ${item.item_name}
              </div>
              <div class="price-container">
                <span class="current-price">Rs ${item.original_price} </span>
                <span class="original-price">Rs ${item.current_price}</span>
                <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
              </div>
              <div class="return-period">
                <span class="return-period-days">${item.return_period} days</span> return available
              </div>
              <div class="delivery-details">
                Delivery by
                <span class="delivery-details-days">${item.delivery_date}</span>
              </div>
            </div>

            <div class="remove-from-cart" onclick="removefrombag(${item.id})">X</div>
          </div>
`;
}
