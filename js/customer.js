$(document).ready(async () => {
  const state = localStorage.getItem("state");
  if (state === "false" || state === null) {
    window.location.href = "index.html";
    return false;
  }
  const coinSelector = $(".coin");
  const totalCoinSelector = $(".total-coin");

  let drinks = await fetchDrinks();
  renderTable(drinks);
  const coins = await fetchCoins();
  let totalCoin = 0;

  coinSelector.click((event) => {
    const depositCoin = parseFloat(event.target.value);
    totalCoin = totalCoin + depositCoin;
    addCoin(depositCoin);
    totalCoinSelector.val(totalCoin);
  });

  $(".buy").click(async () => {
    const selectedDrink = $("input[type='radio'][name='drink']:checked");
    const drinkFound = drinks.find(
      (d) => d.id === parseInt(selectedDrink.val())
    );
    if (drinkFound) {
      const excessMoney = totalCoin - drinkFound.price;
      if (excessMoney >= 0) {
        const validCoinStorage = validCoinFound(coins);
        const moneyChange = getMoneyChange(excessMoney, validCoinStorage);
        removeDrinkStock(drinkFound.id);
        drinks = await fetchDrinks();
        renderTable(drinks);
        totalCoin = excessMoney;
        totalCoinSelector.val(excessMoney);
        renderChangeCoinsTemplate(moneyChange, excessMoney);
      } else {
        toastr.error("You need deposit more coins", "Error!");
      }
    }
  });

  $(".invalidCoin").click(() => {
    toastr.error("Invalid Coin", "Error!");
  });

  $(".terminate").click(() => {
    totalCoinSelector.val(0);
    location.reload();
  });

  $(".finish").click(() => {
    finishBuying(totalCoinSelector);
    totalCoin = 0;
  });
});

const finishBuying = (totalCoinSelector) => {
  totalCoinSelector.val(0);
  $(".excess-money").html("");
  $(".finish").prop("hidden", true);
};

const depositCoin = (event) => {
  let totalCoin = 0;
  const depositCoin = parseFloat(event.target.value);
  totalCoin = totalCoin + depositCoin;
  addCoin(depositCoin);
  return depositCoin;
};

const renderTable = (data) => {
  $("table > tbody").empty();
  let coinTable = "";
  $.each(data, (key, value) => {
    coinTable += `<tr>`;
    coinTable += `<td> ${value.drink} </td>`;
    coinTable += `<td> ${value.price}¢ </td>`;
    coinTable += `<td> ${
      value.stock <= 0 ? "Out Of Stock" : value.stock
    } </td>`;
    coinTable += `<td> <input type='radio' ${
      value.stock <= 0 ? "disabled" : ""
    } name="drink" value="${value.id}" /> </td>`;
    coinTable += `</tr>`;
  });
  $("table").append(coinTable);
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

const addCoin = (coinValue) => {
  const coins = JSON.parse(localStorage.getItem("coins"));
  const coinIndex = coins.findIndex((c) => c.value === coinValue);
  coins[coinIndex].stock++;
  localStorage.setItem("coins", JSON.stringify(coins));
  return coins;
};

const subtractCoin = (coinValue) => {
  const coins = JSON.parse(localStorage.getItem("coins"));
  const coinIndex = coins.findIndex((c) => c.value === coinValue);
  coins[coinIndex].stock--;
  localStorage.setItem("coins", JSON.stringify(coins));
  return coins;
};

const removeDrinkStock = (value) => {
  const drinks = JSON.parse(localStorage.getItem("drinks"));
  const drinkIndex = drinks.findIndex((d) => d.id === value);
  drinks[drinkIndex].stock--;
  localStorage.setItem("drinks", JSON.stringify(drinks));
  return drinks;
};

const removeCoinStock = (value, amount) => {
  const coins = JSON.parse(localStorage.getItem("coins"));
  const coinIndex = coins.findIndex((c) => c.value === parseInt(value));
  coins[coinIndex].stock -= amount;
  localStorage.setItem("coins", JSON.stringify(coins));
  return coins;
};

const getMoneyChange = (money, bills) => {
  if (bills[0] < bills[1]) bills.reverse();
  const change = {};
  bills.forEach((b) => {
    change[b] = Math.floor(money / b);
    money -= b * change[b];
  });

  for (const key in change) {
    removeCoinStock(key, change[key]);
  }
  return change;
};

const validCoinFound = (coins) => {
  const coinValid = [];
  coins.forEach((c) => {
    if (c.stock >= 0) coinValid.push(c.value);
  });
  return coinValid;
};

const renderChangeCoinsTemplate = (moneyChange, excessMoney) => {
  $(".excess-money").html(`
    <h2>Excess Money</h2>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Type Of Coin</th>
          <th scope="col">Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>10¢</td>
          <td>${moneyChange[10] || 0}</td>
        </tr>
        <tr>
          <td>20¢</td>
          <td>${moneyChange[20] || 0}</td>
        </tr>
        <tr>
          <td>50¢</td>
          <td>${moneyChange[50] || 0}</td>
        </tr>
        <tr>
          <td>RM 1</td>
          <td>${moneyChange[100] || 0}</td>
        </tr>
      </tbody>
    </table>
    <h1>${excessMoney}¢</h1>
  `);
  $(".finish").prop("hidden", false);
};
