$(document).ready(async () => {
  const state = localStorage.getItem("state");
  if (state === "false" || state === null) {
    window.location.href = "index.html";
    return false;
  }

  let drinks = await fetchDrinks();
  renderDrinkTable(drinks);
  let coins = await fetchCoins();
  renderCoinTable(coins);
  $(".btn-edit-drink").click((event) => {
    displayUpdateModal(event, drinks);
  });
  $(".btn-delete-drink").click((event) => {
    displayDrinkModal(event, drinks);
  });
  $(".btn-save-add-drink").click(() => {
    addNewDrink(drinks);
  });
  $(".btn-save-drink").click(async () => {
    await updateDrink();
  });
  $(".btn-save-delete-drink").click(() => {
    deleteDrink(drinks);
  });
  $(".btn-add-drink").click(() => {
    $("#drink-modal-adding").modal("show");
  });
  $(".btn-update-coin").click((event) => {
    displayCoinModal(event, coins);
  });
  $(".btn-save-update-coin").click(async () => {
    await updateCoin();
  });
});

const updateCoin = async () => {
  const coins = await fetchCoins();
  const coinValue = parseInt($("#typeOfCoin").val());
  const coinIndex = coins.findIndex((c) => c.value === coinValue);
  coins[coinIndex].stock = parseInt($("#coinStock").val());
  localStorage.setItem("coins", JSON.stringify(coins));
  $("#coin-coin").modal("hide");
  location.reload();
};

const displayCoinModal = (event, coins) => {
  $("#coin-modal").modal("show");
  const coin = coins.find((c) => c.id === parseInt(event.target.value));
  $("#typeOfCoin").val(coin.value);
  $("#coinStock").val(coin.stock);
};

const updateDrink = async () => {
  const drinks = await fetchDrinks();
  const drinkId = parseInt($("#drink-id").val());
  const drinkIndex = drinks.findIndex((d) => d.id === drinkId);
  const drinkName = $("#drink-name").val();
  const drinkPrice = $("#drink-price").val();
  const drinkStock = $("#drink-stock").val();
  drinks[drinkIndex].drink = drinkName;
  drinks[drinkIndex].price = parseInt(drinkPrice);
  drinks[drinkIndex].stock = parseInt(drinkStock);
  localStorage.setItem("drinks", JSON.stringify(drinks));
  $("#drink-modal").modal("hide");
  location.reload();
};

const displayUpdateModal = (event, drinks) => {
  const id = parseInt(event.target.value);
  const drink = drinks.find((d) => d.id === id);
  $("#drink-modal").modal("show");
  $("#drink-id").val(drink.id);
  $("#drink-name").val(drink.drink);
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
    drink: drinkName,
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
      coinTable += "<td>" + value.drink + "</td>";
      coinTable += "<td>" + value.price + "¢</td>";
      coinTable += "<td>Out of stock</td>";
      coinTable += `<td>
        <button type="button" class="btn-edit-drink btn btn-primary" value="${value.id}" data-toggle="modal">Edit</button>
        <button type="button" class="btn-delete-drink btn btn-danger" value="${value.id}" data-toggle="modal">Delete</button>
      </td>`;
      coinTable += "</tr>";
    } else {
      coinTable += "<tr>";
      coinTable += "<td>" + value.drink + "</td>";
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
    coinTable += "<tr>";
    coinTable += "<td>" + value.value + "</td>";
    coinTable += "<td>" + value.stock + "</td>";
    coinTable += `<td><button type="button" class="btn-update-coin btn btn-primary" value="${value.id}">Edit</button></td>`;
    coinTable += "</tr>";
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
