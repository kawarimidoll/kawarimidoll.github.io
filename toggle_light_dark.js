const root = document.documentElement;

function getRootProperty(name) {
  return getComputedStyle(root).getPropertyValue(name).trim();
}

// ref: https://stackoverflow.com/a/76448868
const toggleTargetKeys = Array.from(document.styleSheets)
  .flatMap((styleSheet) => Array.from(styleSheet.cssRules))
  .flatMap((cssRule) =>
    cssRule.selectorText === ":root" ? Array.from(cssRule.style) : []
  )
  .flatMap((style) =>
    style.startsWith("--light-") &&
      !!getRootProperty(style.replace("light", "dark"))
      ? [style.replace("--light-", "")]
      : []
  );

[...document.querySelectorAll(".toggle-light-dark")].forEach((e) => {
  e.addEventListener("click", () => {
    for (const key of toggleTargetKeys) {
      // swap light and dark
      const lightKey = `--light-${key}`;
      const darkKey = `--dark-${key}`;
      const lightValue = getRootProperty(lightKey);
      const darkValue = getRootProperty(darkKey);
      root.style.setProperty(lightKey, darkValue);
      root.style.setProperty(darkKey, lightValue);
    }
  });
});
