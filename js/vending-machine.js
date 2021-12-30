$(document).ready(async () => {
  let drinks = await fetchDrinks();
  let coins = await fetchCoins();
  renderDrinkTable(drinks);
  renderCoinTable(coins);
  $(".btn-edit-drink").click((event) => {
    const id = parseInt(event.target.value);
    const drink = drinks.find((d) => d.id === id);
    $("#drink-modal").modal("show");
    $("#drink-id").val(drink.id);
    $("#drink-name").val(drink.drinks);
    $("#drink-price").val(drink.price);
    $("#drink-stock").val(drink.stock);
  });
  $(".btn-save-drink").click(async () => {
    const drinkId = $("#drink-id").val();
    const drinkName = $("#drink-name").val();
    const drinkPrice = $("#drink-price").val();
    const drinkStock = $("#drink-stock").val();
    console.log(drinkId, drinkName, drinkPrice, drinkStock);
    drinks[drinkId - 1].drinks = drinkName;
    drinks[drinkId - 1].price = parseInt(drinkPrice);
    drinks[drinkId - 1].stock = parseInt(drinkStock);
    localStorage.setItem("drinks", JSON.stringify(drinks));
    $("#drink-modal").modal("hide");
    location.reload();
  });
  $(".btn-delete-drink").click((event) => {
    const id = parseInt(event.target.value);
    const drink = drinks.find((d) => d.id === id);
    $("#drink-id").val(drink.id);
    $("#drink-modal-delete").modal("show");
  });
  $(".btn-save-delete-drink").click(() => {
    const id = parseInt($("#drink-id").val());
    console.log(id);
    const removeIndex = drinks.findIndex((d) => d.id === id);
    drinks.splice(removeIndex, 1);
    localStorage.setItem("drinks", JSON.stringify(drinks));
    $("#drink-modal").modal("hide");
    location.reload();
  });
});

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
