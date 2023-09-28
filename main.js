const romanInput = document.querySelector("#roman");
const resultElement = document.querySelector("#result");
const converButton = document.querySelector("#convert");
const copyButton = document.querySelector("#copy");
const alertMessage = document.querySelector("#alertMessage");

romanInput.focus();

romanInput.addEventListener("input", (e) => {
  romanInput.value = romanInput.value.toUpperCase();

  let checker =
    /^(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/.test(
      romanInput.value
    );

  if (checker) {
    alertMessage.style.display = "none";
    converButton.disabled = false;
  } else {
    alertMessage.style.display = "block";
    converButton.disabled = true;
  }
});

converButton.addEventListener("click", convert);

window.addEventListener("keydown", (e) => {
  if (e.code === "NumpadEnter" || e.code === "Enter" || e.keyCode === 13) {
    if (converButton.disabled) {
      return;
    } else {
      convert();
    }
  }
});

function convert() {
  if (romanInput.value) {
    let result = romanToInteger(romanInput.value);
    resultElement.textContent = result;
    resultElement.style.color = "#000000";
  }
}

copyButton.addEventListener("click", async () => {
  let result = resultElement.textContent;

  result = result.replace(/\D/g, ""); //copy only number

  if (result) {
    await navigator.clipboard.writeText(result);
    resultElement.textContent = `"${result}" Copied!`;
    resultElement.style.color = "#FF0800";
  }
});

romanInput.addEventListener("paste", (e) => {
  let checker =
    /^(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/.test(
      romanInput.value
    );

  if (checker) {
    alertMessage.style.display = "none";
    converButton.disabled = false;
  } else {
    alertMessage.style.display = "block";
    converButton.disabled = true;
  }
});

function romanToInteger(s) {
  const values = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  let result = 0;

  for (let i = 0; i < s.length; i++) {
    let current = values[s[i]];
    let after = values[s[i + 1]];

    if (s.length == 1) {
      result = current;
    } else if (after === undefined) {
      break;
    } else if (current == after || current > after) {
      if (result == 0) {
        result = current + after;
      } else {
        result = result + after;
      }
    } else if (result >= 1000 && current > 99) {
      result = result + (after - current) - current;
    } else if (result > 9 && current < after) {
      result = result + (after - current) - current;
    } else if (current < after) {
      result = after - current;
    }
  }
  return result;
}

romanInput.addEventListener("paste", (e) => {
  let checker =
    /^(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/.test(
      romanInput.value
    );

  if (checker) {
    alertMessage.style.display = "none";
    converButton.disabled = false;
  } else {
    alertMessage.style.display = "block";
    converButton.disabled = true;
  }
});

addEventListener("load", function () {
  var viewport = document.querySelector("meta[name=viewport]");
  viewport.setAttribute(
    "content",
    viewport.content + ", height=" + window.innerHeight
  );
});
