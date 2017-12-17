Vue.directive('square', function (el, binding) {
  console.log(el);
  // <div></div>
  console.log(JSON.stringify(binding));
  // {"name":"square","rawName":"v-square","value":42,"expression":"item","modifiers":{},"def":{}}
  console.log(binding.expression+':'+binding.value);
  // item:42

  el.innerHTML = Math.pow(binding.value, 2);
});

new Vue({
  el: '#app',
  data: { item: 42 }
});
