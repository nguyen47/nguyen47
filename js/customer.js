$(document).ready(async () => {
  const coinSelector = $(".coin");
  const totalCoinSelector = $(".total-coin");

  const drinks = await fetchDrinks();
  const coins = await fetchCoins();

  let totalCoin = 0;
  coinSelector.click((event) => {
    const value = event.target.value;
    totalCoin = totalCoin + parseFloat(value);
    totalCoinSelector.val(totalCoin.toFixed(1));
  });

  renderTable(drinks);

  $(".buy").click(() => {
    const selectedDrink = $("input[type='radio'][name='drink']:checked");
    const drinkFound = drinks.find(
      (d) => d.id === parseInt(selectedDrink.val())
    );
    if (drinkFound) {
      const excessMoney = totalCoin - drinkFound.price;

      if (excessMoney >= 0) {
        drinks[drinkFound.id - 1].stock--;
        renderTable(drinks);

        totalCoin = excessMoney;

        totalCoinSelector.val(excessMoney.toFixed(1));
        $(".excess-money").html(excessMoney.toFixed(1));
      } else {
        console.log(`You don't have enough money`);
      }
    }
  });
});

const renderTable = (data) => {
  $("table > tbody").empty();
  let coinTable = "";
  $.each(data, (key, value) => {
    if (value.stock <= 0) {
      coinTable += "<tr>";
      coinTable += "<td>" + value.drinks + "</td>";
      coinTable += "<td>" + value.price + "</td>";
      coinTable += "<td>Out of stock</td>";
      coinTable += `<td> <input type='radio' disabled name="drink" value="${value.id}" /> </td>`;
      coinTable += "</tr>";
    } else {
      coinTable += "<tr>";
      coinTable += "<td>" + value.drinks + "</td>";
      coinTable += "<td>" + value.price + "</td>";
      coinTable += "<td>" + value.stock + "</td>";
      coinTable += `<td> <input type='radio' name="drink" value="${value.id}" /> </td>`;
      coinTable += "</tr>";
    }
  });
  $("table").append(coinTable);
};

const fetchDrinks = async () => {
  const drinks = $.getJSON("../drink.json", (data) => {
    return data;
  }).fail(function () {
    console.log("An error has occurred.");
  });
  return drinks;
};

const fetchCoins = async () => {
  const coins = $.getJSON("../coin.json", (data) => {
    return data;
  }).fail(function () {
    console.log("An error has occurred.");
  });
  return coins;
};
