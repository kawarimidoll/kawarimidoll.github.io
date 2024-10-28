const root = document.documentElement;

function getRootProperty(name) {
  return getComputedStyle(root).getPropertyValue(name).trim();
}
function swapRootProperty(left, right) {
  const leftProp = getRootProperty(left);
  const rightProp = getRootProperty(right);
  root.style.setProperty(right, leftProp);
  root.style.setProperty(left, rightProp);
}

const avagarImg = document.querySelector(".avatar img");
avagarImg.addEventListener("click", () => {
  swapRootProperty("--light-color", "--dark-color");
  swapRootProperty("--light-gray", "--dark-gray");
});
