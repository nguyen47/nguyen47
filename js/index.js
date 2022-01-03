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
