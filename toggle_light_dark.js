const root = document.documentElement;

function getRootProperty(name) {
  return getComputedStyle(root).getPropertyValue(name).trim();
}

const rootCssVariables = Array.from(document.styleSheets)
  .flatMap((styleSheet) => Array.from(styleSheet.cssRules))
  .filter(
    (cssRule) =>
      cssRule instanceof CSSStyleRule && cssRule.selectorText === ":root",
  )
  .flatMap((cssRule) => Array.from(cssRule.style))
  .filter((style) => style.startsWith("--"));

const toggleTargets = [];
for (const cssVar of rootCssVariables) {
  if (!cssVar.startsWith("--light-")) {
    continue;
  }
  const key = cssVar.replace("--light-", "");
  const darkValue = getRootProperty(`--dark-${key}`);
  if (!darkValue) {
    continue;
  }
  toggleTargets.push(key);
}

const avagarImg = document.querySelector(".avatar img");
avagarImg.addEventListener("click", () => {
  for (const key of toggleTargets) {
    // swap light and dark
    const lightKey = `--light-${key}`;
    const darkKey = `--dark-${key}`;
    const lightValue = getRootProperty(lightKey);
    const darkValue = getRootProperty(darkKey);
    root.style.setProperty(lightKey, darkValue);
    root.style.setProperty(darkKey, lightValue);
  }
});
