const swal = require("sweetalert");

export const sweetalert = (title, icon, buttons) => {
  swal({ title, icon, buttons });
};
