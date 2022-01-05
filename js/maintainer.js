$(document).ready(() => {
  const state = localStorage.getItem("state");
  if (state === "false" || state === null) {
    window.location.href = "index.html";
    return false;
  }
  const isLogin = localStorage.getItem("isLogin");

  if (isLogin === "false") {
    $(".password-input").show();
    $(".machine").hide();
    $(".btn-unlock").click(() => {
      const password = $("#password").val();
      if (password !== "123456") {
        console.log("Wrong Password");
        return;
      }
      localStorage.setItem("isLogin", true);
      $(".password-input").hide();
      $(".machine").show();
    });
  } else {
    $(".password-input").hide();
    $(".machine").show();

    $(".btn-10-cent").click(async (event) => {
      const coins = await fetchCoins();
      const coinIndex = coins.findIndex(
        (c) => c.value === parseInt(event.target.value)
      );
      const totalValue = coins[coinIndex].stock * 10;
      $(".coin-result").html(convertToRM(totalValue));
    });
    $(".btn-20-cent").click(async (event) => {
      const coins = await fetchCoins();
      const coinIndex = coins.findIndex(
        (c) => c.value === parseInt(event.target.value)
      );
      const totalValue = coins[coinIndex].stock * 20;
      $(".coin-result").html(convertToRM(totalValue));
    });
    $(".btn-50-cent").click(async (event) => {
      const coins = await fetchCoins();
      const coinIndex = coins.findIndex(
        (c) => c.value === parseInt(event.target.value)
      );
      const totalValue = coins[coinIndex].stock * 50;
      $(".coin-result").html(convertToRM(totalValue));
    });
    $(".btn-100-cent").click(async (event) => {
      const coins = await fetchCoins();
      const coinIndex = coins.findIndex(
        (c) => c.value === parseInt(event.target.value)
      );
      const totalValue = coins[coinIndex].stock * 100;
      $(".coin-result").html(convertToRM(totalValue));
    });
    $(".btn-new-drink").click(() => {
      window.location.href = "machinery.html";
      return false;
    });
    $(".btn-total-cash").click(async () => {
      let total = 0;
      const coins = await fetchCoins();
      for (const key in coins) {
        if (Object.hasOwnProperty.call(coins, key)) {
          const element = coins[key];
          total += element.stock * element.value;
        }
      }
      $(".total-cash").html(convertToRM(total));
    });
    $(".btn-collect-cash").click(async () => {
      const coins = await fetchCoins();
      for (const key in coins) {
        if (Object.hasOwnProperty.call(coins, key)) {
          const element = coins[key];
          const coinIndex = coins.findIndex((c) => c.id === element.id);
          coins[coinIndex].stock = 0;
          localStorage.setItem("coins", JSON.stringify(coins));
        }
      }
    });
    $(".btn-finish").click(() => {
      localStorage.setItem("isLogin", false);
      window.location.href = "index.html";
      return false;
    });
  }
});

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

const convertToRM = (value) => {
  return value.toLocaleString("ms-MY", {
    style: "currency",
    currency: "MYR",
  });
};
