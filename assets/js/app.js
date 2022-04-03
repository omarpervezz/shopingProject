if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  // final purchased button
  document
    .getElementsByClassName("purchased")[0]
    .addEventListener("click", finalMessage);
  // add to car item
  var addTocart = document.getElementsByClassName("add-to-cart");
  for (var i = 0; i < addTocart.length; i++) {
    var buttoncart = addTocart[i];
    buttoncart.addEventListener("click", addtoCartItemOnBulk);
  }
  // remove item
  var removeCart = document.getElementsByClassName("trash_btn");
  for (var i = 0; i < removeCart.length; i++) {
    var removeButton = removeCart[i];
    removeButton.addEventListener("click", (event) => {
      removeCartItemFromRow(event);
    });
  }
}

function finalMessage() {
  var fluidRowContainerRow =
    document.getElementsByClassName("parent_of_cartItem")[0];
  if (fluidRowContainerRow.hasChildNodes()) {
    alert("thank you for your purhased");
    while (fluidRowContainerRow.hasChildNodes()) {
      fluidRowContainerRow.removeChild(fluidRowContainerRow.firstChild);
    }
  } else {
    alert("you should to cart list and cart product");
  }
  updateTotal();
}

function removeCartItemFromRow(event) {
  event.path[5].remove();
  updateTotal();
}

function inputHasChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  } else {
    updateTotal();
  }
}

function addtoCartItemOnBulk(event) {
  var bucketX = document.getElementById("bucket");

  bucketX.style.right = "0";
  var close = document.getElementsByClassName("close")[0];
  close.addEventListener("click", () => {
    bucketX.style.right = "-497px";
  });
  var buttonX = event.target;
  var shoptItem = buttonX.parentElement.parentElement;
  console.log(shoptItem);
  var imageProduct = shoptItem.getElementsByClassName("pic-1")[0].src;
  var priceText = shoptItem.getElementsByTagName("b")[0].innerText;
  var title = shoptItem.getElementsByClassName("title")[0].innerText;
  addToCartItemAgain(title, priceText, imageProduct);
  updateTotal();
}

function addToCartItemAgain(title, priceText, imageProduct) {
  var colMd12 = document.createElement("div");
  colMd12.setAttribute("class", "col-md-12");
  colMd12.classList.add("mt-5");
  const fluidRowContainer =
    document.getElementsByClassName("parent_of_cartItem")[0];
  var checkTitle = fluidRowContainer.getElementsByClassName("display-6");
  for (var i = 0; i < checkTitle.length; i++) {
    if (checkTitle[i].innerText == title) {
      alert("you have already cart it on your bucket");
      return;
    }
  }
  colMd12.innerHTML = `
  <div class="row">
  <div class="col-4 text-center mt-2">
    <img
      src="${imageProduct}"
      alt=""
      class="img-fluid"
      width="90px"
      height="90px"
    />
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
          value="2"
          style="width: 40px"
        />
        <button class="btn btn-danger trash_btn d-inline-block">
          <i class="fa fa-trash"></i>
        </button>
        <span class="font-weight-bold product_price text-info"></span>
          <strong>${priceText}</strong> <strike>$20.00</strike></span
        >
      </div>
    </div>
  </div>
</div>
  `;
  fluidRowContainer.append(colMd12);
  colMd12
    .getElementsByClassName("trash_btn")[0]
    .addEventListener("click", removeCartItemFromRow);
  colMd12
    .getElementsByTagName("input")[0]
    .addEventListener("change", inputHasChanged);
}

// update function for refesh our pricing
function updateTotal() {
  const fluidContainer = document.getElementsByClassName("container-fluid")[0];
  var quantity_ = fluidContainer.getElementsByClassName("quantity_");
  var total = 0;
  for (var i = 0; i < quantity_.length; i++) {
    var quantityRow = quantity_[i];
    var price = quantityRow.getElementsByTagName("strong")[0];
    var inputElement = quantityRow.getElementsByClassName("quanityI")[0].value;
    var priceElement = parseFloat(price.innerText.replace("$", ""));
    total = total + priceElement * inputElement;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("cart_total_p")[0].innerText = "$" + total;
}
