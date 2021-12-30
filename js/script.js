$(document).ready(() => {
  $(".btn-start-simulation").click(() => {
    $(".btn-stop-simulation").prop("disabled", false);
    $(".btn-customer-panel").prop("disabled", false);
    $(".btn-vm-panel").prop("disabled", false);
    $(".btn-start-simulation").prop("disabled", true);
  });
  $(".btn-stop-simulation").click(() => {
    $(".btn-start-simulation").prop("disabled", false);
    $(".btn-customer-panel").prop("disabled", true);
    $(".btn-vm-panel").prop("disabled", true);
    $(".btn-stop-simulation").prop("disabled", true);
  });
  $(".btn-customer-panel").click(() => {
    window.location.href = "customer.html";
    return false;
  });
});
