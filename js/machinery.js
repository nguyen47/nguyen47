$(document).ready(async () => {
  const state = localStorage.getItem("state");
  if (state === "false") {
    window.location.href = "index.html";
    return false;
  }
  const editDrinkModalSelector = $(".btn-edit-drink");
  const updateDrinkButtonSelector = $(".btn-save-drink");
  const deleteDrinkModalSelector = $(".btn-delete-drink");
  const addDrinkModalSelector = $(".btn-add-drink");
  const addNewDrinkButtonSelector = $(".btn-add-new-drink");
  const deleteDrinkButtonSelector = $(".btn-save-delete-drink");

  let drinks = await fetchDrinks();
  renderDrinkTable(drinks);
  let coins = await fetchCoins();
  renderCoinTable(coins);
  editDrinkModalSelector.click((event) => {
    displayUpdateModal(event, drinks);
  });
  updateDrinkButtonSelector.click(async () => {
    drinks = await fetchDrinks();
    updateDrink(drinks);
  });
  deleteDrinkModalSelector.click((event) => {
    displayDrinkModal(event, drinks);
  });
  deleteDrinkButtonSelector.click(() => {
    deleteDrink(drinks);
  });
  addDrinkModalSelector.click(() => {
    $("#drink-modal-adding").modal("show");
  });
  addNewDrinkButtonSelector.click(() => {
    addNewDrink(drinks);
  });
});

const updateDrink = (drinks) => {
  const drinkId = $("#drink-id").val();
  const foundIndex = drinks.findIndex((d) => d.id === drinkId);
  const drinkName = $("#drink-name").val();
  const drinkPrice = $("#drink-price").val();
  const drinkStock = $("#drink-stock").val();
  drinks[foundIndex].drinks = drinkName;
  drinks[foundIndex].price = parseInt(drinkPrice);
  drinks[foundIndex].stock = parseInt(drinkStock);
  localStorage.setItem("drinks", JSON.stringify(drinks));
  $("#drink-modal").modal("hide");
  location.reload();
};

const displayUpdateModal = (event, drinks) => {
  const id = parseInt(event.target.value);
  const drink = drinks.find((d) => d.id === id);
  $("#drink-modal").modal("show");
  $("#drink-id").val(drink.id);
  $("#drink-name").val(drink.drinks);
  $("#drink-price").val(drink.price);
  $("#drink-stock").val(drink.stock);
};

const displayDrinkModal = (event, drinks) => {
  const id = parseInt(event.target.value);
  const drink = drinks.find((d) => d.id === id);
  $("#drink-id").val(drink.id);
  $("#drink-modal-delete").modal("show");
};

const deleteDrink = (drinks) => {
  const id = parseInt($("#drink-id").val());
  console.log(id);
  const removeIndex = drinks.findIndex((d) => d.id === id);
  drinks.splice(removeIndex, 1);
  localStorage.setItem("drinks", JSON.stringify(drinks));
  $("#drink-modal").modal("hide");
  location.reload();
};

const addNewDrink = (drinks) => {
  const drinkId = new Date().getTime();
  const drinkName = $("#add-drink-name").val();
  const drinkPrice = parseInt($("#add-drink-price").val());
  const drinkStock = parseInt($("#add-drink-stock").val());
  const newDrink = {
    id: drinkId,
    drinks: drinkName,
    price: drinkPrice,
    stock: drinkStock,
  };
  drinks.push(newDrink);
  localStorage.setItem("drinks", JSON.stringify(drinks));
  $("#drink-modal-adding").modal("hide");
  location.reload();
};

const renderDrinkTable = (data) => {
  $(".drinks-management > tbody").empty();
  let coinTable = "";
  $.each(data, (key, value) => {
    if (value.stock <= 0) {
      coinTable += "<tr>";
      coinTable += "<td>" + value.drinks + "</td>";
      coinTable += "<td>" + value.price + "¢</td>";
      coinTable += "<td>Out of stock</td>";
      coinTable += `<td>
        <button type="button" class="btn-edit-drink btn btn-primary" value="${value.id}" data-toggle="modal">Edit</button>
        <button type="button" class="btn-delete-drink btn btn-danger" value="${value.id}" data-toggle="modal">Delete</button>
      </td>`;
      coinTable += "</tr>";
    } else {
      coinTable += "<tr>";
      coinTable += "<td>" + value.drinks + "</td>";
      coinTable += "<td>" + value.price + "¢ </td>";
      coinTable += "<td>" + value.stock + "</td>";
      coinTable += `<td>
        <button type="button" class="btn-edit-drink btn btn-primary" value="${value.id}" data-toggle="modal">Edit</button>
        <button type="button" class="btn-delete-drink btn btn-danger" value="${value.id}" data-toggle="modal">Delete</button>
      </td>`;
      coinTable += "</tr>";
    }
  });
  $(".drinks-management").append(coinTable);
};

const renderCoinTable = (data) => {
  $(".coins-management > tbody").empty();
  let coinTable = "";
  $.each(data, (key, value) => {
    if (value.stock <= 0) {
      coinTable += "<tr>";
      coinTable += "<td>" + value.value + "</td>";
      coinTable += "<td>" + value.stock + "</td>";
      coinTable += `<td><button type="button" disabled class="btn btn-primary value="${value.id}">Edit</button></td>`;
      coinTable += "</tr>";
    } else {
      coinTable += "<tr>";
      coinTable += "<td>" + value.value + "</td>";
      coinTable += "<td>" + value.stock + "</td>";
      coinTable += `<td><button type="button" class="btn btn-primary value="${value.id}">Edit</button></td>`;
      coinTable += "</tr>";
    }
  });
  $(".coins-management").append(coinTable);
};

const fetchDrinks = async () => {
  if (!localStorage.getItem("drinks")) {
    return $.getJSON("../json/drink.json", (data) => {
      localStorage.setItem("drinks", JSON.stringify(data));
    }).fail(() => {
      console.log("An error has occurred.");
    });
  }
  return JSON.parse(localStorage.getItem("drinks"));
};

const fetchCoins = async () => {
  if (!localStorage.getItem("coins")) {
    return $.getJSON("../json/coin.json", (data) => {
      localStorage.setItem("coins", JSON.stringify(data));
    }).fail(() => {
      console.log("An error has occurred.");
    });
  }
  return JSON.parse(localStorage.getItem("coins"));
};
