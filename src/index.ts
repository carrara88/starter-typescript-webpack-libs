import * as my_lib from 'my_lib'
let factory = my_lib.Factory.newFactory();

document.addEventListener('DOMContentLoaded', function () {
  document.body.innerHTML = "starter-typescript-webpack-libs project is compiled";
  document.body.innerHTML += " with: " + my_lib.Factory.info();
  document.body.innerHTML += " and initialized Factory: " + factory.info();
  
});


