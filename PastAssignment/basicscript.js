function getCounterValue() {
  return Number(document.getElementById("counter").textContent);
}

function setCounterValue(newValue) {
  document.getElementById("counter").textContent = newValue;
}

function tickUp() {
  let current = getCounterValue();
  current = current + 1;
  setCounterValue(current);
}

function tickDown() {
  let current = getCounterValue();
  current = current - 1;
  setCounterValue(current);
}

function runForLoop() {
  let counter = getCounterValue();
  let output = "";
  
  for (let i = 0; i <= counter; i++) {
    output = output + i + " ";
  }

  document.getElementById("forLoopResult").textContent = output.trim();
}

function showOddNumbers() {
  let counter = getCounterValue();
  let output = "";

  for (let i = 1; i <= counter; i++) {
    if (i % 2 !== 0) {
      output = output + i + " ";
    }
  }

  document.getElementById("oddNumberResult").textContent = output.trim();
}

function addMultiplesToArray() {
  let counter = getCounterValue();
  let arr = [];

  for (let i = counter; i >= 5; i--) {
    if (i % 5 === 0) {
      arr.push(i); // push adds to the end of the array
    }
  }
  console.log(arr);
}


function printCarObject() {
  let typeValue = document.getElementById("carType").value;
  let mpgValue = document.getElementById("carMPG").value;
  let colorValue = document.getElementById("carColor").value;

  let car = {
    cType: typeValue,
    cMPG: mpgValue,
    cColor: colorValue
  };

  console.log(car);
}

function loadCar(carNumber) {
  let selectedCar;

  if (carNumber === 1) {
    selectedCar = carObject1;
  } else if (carNumber === 2) {
    selectedCar = carObject2;
  } else if (carNumber === 3) {
    selectedCar = carObject3;
  }

  document.getElementById("carType").value = selectedCar.cType;
  document.getElementById("carMPG").value = selectedCar.cMPG;
  document.getElementById("carColor").value = selectedCar.cColor;
}

function changeColor(colorNumber) {
  let p = document.getElementById("styleParagraph");

  if (colorNumber === 1) {
    p.style.color = "red";
  } else if (colorNumber === 2) {
    p.style.color = "green";
  } else if (colorNumber === 3) {
    p.style.color = "blue";
  }
}
