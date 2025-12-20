
let bagItems = [];
onloaded();

function onloaded() {
  let bagitemstr = localStorage.getItem("bagItems");
  bagItems = bagitemstr ? JSON.parse(bagitemstr) : [];
  display();
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

function goToCategory(category) {
  localStorage.setItem("selectedCategory", category);
  window.location.href = "./Pages/Productlist.html";
}

function display() {
  let itemsconatinerElement = document.querySelector(".items-container");
  if (!itemsconatinerElement) {
    return;
  }

  let innerHTML = "";
  items.forEach((item) => {
    innerHTML += `
      <div class="item-container">
        <img 
          class="item_image" 
          src="${item.image}" 
          alt="item image"
          onclick="goToCategory('${item.category}')"
        />
      </div>
    `;
  });

  itemsconatinerElement.innerHTML = innerHTML;
}
