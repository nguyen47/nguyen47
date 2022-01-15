$(document).ready(() => {
  const state = localStorage.getItem("state");
  if (state === "true") {
    $(".btn-stop-simulation").prop("disabled", false);
    $(".btn-customer-panel").prop("disabled", false);
    $(".btn-vm-panel").prop("disabled", false);
    $(".btn-maintainer-panel").prop("disabled", false);
    $(".btn-start-simulation").prop("disabled", true);
  } else {
    $(".btn-start-simulation").prop("disabled", false);
    $(".btn-customer-panel").prop("disabled", true);
    $(".btn-vm-panel").prop("disabled", true);
    $(".btn-maintainer-panel").prop("disabled", true);
    $(".btn-stop-simulation").prop("disabled", true);
  }
  $(".btn-start-simulation").click(() => {
    startSimulation();
    location.reload();
  });
  $(".btn-stop-simulation").click(() => {
    stopSimulation();
    location.reload();
  });
  $(".btn-customer-panel").click(() => {
    window.location.href = "customer.html";
    return false;
  });
  $(".btn-vm-panel").click(() => {
    window.location.href = "machinery.html";
    return false;
  });
  $(".btn-maintainer-panel").click(() => {
    window.location.href = "maintainer.html";
    return false;
  });
  $(".btn-reset").click(async () => {
    const coins = await fetchCoins();
    const drinks = await fetchDrinks();
    localStorage.setItem("isLogin", false);
    localStorage.setItem("state", false);
    localStorage.setItem("drinks", JSON.stringify(drinks));
    localStorage.setItem("coins", JSON.stringify(coins));
  });
});

const startSimulation = () => {
  localStorage.setItem("state", JSON.stringify(true));
  $(".btn-start-simulation").prop("disabled", false);
  $(".btn-customer-panel").prop("disabled", true);
  $(".btn-vm-panel").prop("disabled", true);
  $(".btn-maintainer-panel").prop("disabled", true);
  $(".btn-stop-simulation").prop("disabled", true);
};

const stopSimulation = () => {
  localStorage.setItem("state", JSON.stringify(false));
  $(".btn-stop-simulation").prop("disabled", false);
  $(".btn-customer-panel").prop("disabled", false);
  $(".btn-vm-panel").prop("disabled", false);
  $(".btn-maintainer-panel").prop("disabled", false);
  $(".btn-start-simulation").prop("disabled", true);
};

const fetchDrinks = async () => {
  return $.getJSON("../json/drink.json", (data) => {
    localStorage.setItem("drinks", JSON.stringify(data));
  }).fail(() => {
    console.log("An error has occurred.");
  });
};

const fetchCoins = async () => {
  return $.getJSON("../json/coin.json", (data) => {
    localStorage.setItem("coins", JSON.stringify(data));
  }).fail(() => {
    console.log("An error has occurred.");
  });
};
