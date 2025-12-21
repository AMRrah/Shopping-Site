let bagItems = [];

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn")
onload();

function onload() {
  let bagitemstr = localStorage.getItem("bagItems");
  bagItems = bagitemstr ? JSON.parse(bagitemstr) : [];
  displayhome();
  displaybagCount();
}

function addTobag(itemId) {
  bagItems.push(itemId);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  displaybagCount();
}
function displaybagCount() {
  let bagitemcountelement = document.querySelector(".bag-item-count");
  if (bagItems.length > 0) {
    bagitemcountelement.style.visibility = "visible";
    bagitemcountelement.innerHTML = bagItems.length;
  } else {
    bagitemcountelement.style.visibility = "hidden";
  }
}
// search ;

// Click on search icon
searchBtn.addEventListener("click", searchProducts);

// Press Enter key
searchInput.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    searchProducts();
  }
});

searchInput.addEventListener("input", function () {
  if (this.value.trim() === "") {
    displayhome();
  }
});

function searchProducts() {
  const searchValue = searchInput.value.toLowerCase().trim();

  const filteredProducts = products.filter(item =>
    item.item_name.toLowerCase().includes(searchValue) ||
    item.company.toLowerCase().includes(searchValue)
  );

  renderFilteredProducts(filteredProducts);
}


function displayhome() {
    
  let itemsconatinerElement = document.querySelector(".items-container");
  if (!itemsconatinerElement) {
    return;
  }
  let innerHTML = "";
  products.forEach((item) => {
    innerHTML += `<div class="item-container">
          <img class="item_image" src="${item.image}" alt="item image" />
          <div class="rating">${item.rating.stars}⭐|${item.rating.count} </div>
          <div class="company-name">${item.company}</div>
          <div class="item-name">${item.item_name}</div>
          <div class="price">
            <span class="current-price">Rs ${item.current_price} </span>
            <span class="original-price">Rs ${item.original_price}</span>
            <span class="discount">(${item.discount_percentage}% OFF)</span>
          </div>
          <button class="btn-add-bag" onclick="addTobag(${item.id})">Add to Bag</button>
        </div>`;
  });
  itemsconatinerElement.innerHTML = innerHTML;
}
function applyFilters() {
  let filteredProducts = [...products];

  const itemType = document.getElementById("ItemsFilter").value;
  const color = document.getElementById("colorFilter").value;
  const sort = document.getElementById("sortFilter").value;

  // FILTER BY CATEGORY
  if (itemType) {
    filteredProducts = filteredProducts.filter(
      item => item.category === itemType
    );
  }

  // FILTER BY COLOR
  if (color) {
    filteredProducts = filteredProducts.filter(
      item => item.color === color
    );
  }

  // SORT
  if (sort === "priceLow") {
    filteredProducts.sort(
      (a, b) => a.current_price - b.current_price
    );
  }

  if (sort === "priceHigh") {
    filteredProducts.sort(
      (a, b) => b.current_price - a.current_price
    );
  }

  if (sort === "ratingHigh") {
    filteredProducts.sort(
      (a, b) => b.rating.stars - a.rating.stars
    );
  }

  renderFilteredProducts(filteredProducts);
}
function renderFilteredProducts(list) {
  let itemsconatinerElement = document.querySelector(".items-container");
  if (!itemsconatinerElement) return;

  let innerHTML = "";

  if (list.length === 0) {
    itemsconatinerElement.innerHTML = "<p>No products found</p>";
    return;
  }

  list.forEach((item) => {
    innerHTML += `<div class="item-container">
        <img class="item_image" src="${item.image}" alt="item image" />
        <div class="rating">${item.rating.stars}⭐|${item.rating.count}</div>
        <div class="company-name">${item.company}</div>
        <div class="item-name">${item.item_name}</div>
        <div class="price">
          <span class="current-price">Rs ${item.current_price}</span>
          <span class="original-price">Rs ${item.original_price}</span>
          <span class="discount">(${item.discount_percentage}% OFF)</span>
        </div>
        <button class="btn-add-bag" onclick="addTobag(${item.id})">
          Add to Bag
        </button>
      </div>`;
  });

  itemsconatinerElement.innerHTML = innerHTML;
}

