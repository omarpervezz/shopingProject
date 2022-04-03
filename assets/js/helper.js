if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  // input elements
  var quanittyInputs = document.getElementsByClassName("quanityI");
  for (var i = 0; i < quanittyInputs.length; i++) {
    var inputEv = quanittyInputs[i];
    inputEv.addEventListener("change", quantityChanged);
  }
  // adding cart items on row
  var addToCartItem = document.getElementsByClassName("add-to-cart");
  for (var i = 0; i < addToCartItem.length; i++) {
    var button = addToCartItem[i];
    button.addEventListener("click", addTocartFunction);
  }
  document
    .getElementsByClassName("purchased")[0]
    .addEventListener("click", itemPurchased);
}

function itemPurchased() {
  var rowContainer = document.getElementsByClassName("parent_of_cartItem")[0];
  if (rowContainer.hasChildNodes()) {
    alert(
      "Thank you for purchased. You have successfully purchased item. We will send you a mail through by your Gmail. Where will be able to see when will you getting the product."
    );
    while (rowContainer.hasChildNodes()) {
      rowContainer.removeChild(rowContainer.firstChild);
    }
  } else {
    alert(
      "Please go to cart Item and select your product and then click purchased button. Thank you."
    );
  }
  updateTotal();
}
// quantity changed
function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
}

// add to cart function
function addTocartFunction(event) {
  var bucketvisible = document.getElementById("bucket");
  var closeBtn = bucketvisible.getElementsByClassName("close")[0];
  bucketvisible.style.right = "0";
  var button = event.target;
  var shoptItem = button.parentElement.parentElement;
  var tittle = shoptItem.getElementsByClassName("title")[0].innerText;
  var priceH = shoptItem
    .getElementsByClassName("price")[0]
    .getElementsByTagName("b")[0].innerText;
  var imageProduct = shoptItem.getElementsByClassName("pic-1")[0].src;

  addItemcartMethod(tittle, priceH, imageProduct);
  updateTotal();
  closeBtn.addEventListener("click", () => {
    closeBucket(bucketvisible);
  });
}
function addItemcartMethod(title, priceH, imageProduct) {
  var virtualProduct = document.createElement("div");
  var containerFlud = document.getElementsByClassName("container-fluid")[0];
  var cartRow = containerFlud.getElementsByClassName("row")[0];
  var singleProductChoice = cartRow.getElementsByClassName("display-6");
  for (var i = 0; i < singleProductChoice.length; i++) {
    if (singleProductChoice[i].innerText == title) {
      alert("you have already brought it you cannot it brought once again");
      return;
    }
  }

  virtualProduct.classList.add("col-md-12");
  virtualProduct.innerHTML = ` <div class="row">
    <div class="col-4 text-center mt-2">
      <img
      src="${imageProduct}"
      alt=""" class="img-fluid" width="90px" height="90px"/>
    </div>
    <div class="col-8">
      <div class="item-info">
        <h2
          style="font-size: 22px"
          class="text-light display-6 font-weight-bold"
        >
          ${title}
        </h2>
        <div class="size_group mt-3">
          <button class="xl_b btn btn-success text-light">xl</button>
          <button class="lg_b btn btn-primary text-light">lg</button>
          <button class="md_b btn btn-info text-light">md</button>
          <button class="sm_b btn btn-danger text-light">sm</button>
        </div>
        <div class="quantity_ mt-3 cart-row">
          <input
            type="number"
            class="quanityI"
            value="1"
            style="width: 40px"
          />
          <a class="btn btn-danger trash_btn d-inline-block" href="#"
            ><i class="fa fa-trash"></i
          ></a>
          <span class="font-weight-bold product_price text-info"
            >${priceH}</span
          >
        </div>
      </div>
    </div>
  </div>`;
  cartRow.append(virtualProduct);
  var removeCart = virtualProduct.getElementsByClassName("trash_btn");
  // remove cart item
  for (var i = 0; i < removeCart.length; i++) {
    var button = removeCart[i];
    button.addEventListener("click", removeCartItemRow);
  }
  virtualProduct
    .getElementsByClassName("quanityI")[0]
    .addEventListener("change", quantityChanged);
}
// remove cart items
function removeCartItemRow(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
  updateTotal();
}
function closeBucket(bucketvisible) {
  bucketvisible.style.right = "-497px";
}
// update total price
function updateTotal() {
  var itemsInfo = document.getElementsByClassName("container-fluid")[0]; // conatiner fluid
  var quanityElement = itemsInfo.getElementsByClassName("cart-row"); // cart row
  console.log(quanityElement);
  var total = 0; // totall vlaue

  // quanityelement for looping there is two item
  for (var i = 0; i < quanityElement.length; i++) {
    var cart_row = quanityElement[i];
    var priceElement = cart_row.getElementsByClassName("product_price")[0]; // main product price
    var quanityElementInput = cart_row.getElementsByClassName("quanityI")[0]; // input value
    var price = parseFloat(priceElement.innerText.replace("$", "")); // $ remove from string
    var quanitty = quanityElementInput.value; // input value
    total = total + price * quanitty; // addition my total value and current product price
  }
  // change number floating
  total = Math.round(total * 100) / 100;
  var cartTotatCars = (document.getElementsByClassName(
    "cart_total_p"
  )[0].innerText = "$" + total);
}
