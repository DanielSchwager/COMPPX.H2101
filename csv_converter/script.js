let rawIntValues = [];
let mappedValues = [];

let maxValue = 0;
let minValue = 127;

let inputMin = document.getElementById("min");
let inputMax = document.getElementById("max");
let inputCol = document.getElementById("col");
let inputSep = document.getElementById("sep");

var fileInput = document.getElementById("csv"),
  readFile = function () {
    var reader = new FileReader();
    reader.onload = function () {
      rawIntValues = [];
      let lines = reader.result.split(/\r?\n/);
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        let value = parseFloat(
          line.split(inputSep.value)[parseInt(inputCol.value)]
        );
        if (!isNaN(value)) {
          rawIntValues.push(value);
        } else {
          console.log(value);
        }
      }

      maxValue = Math.max(...rawIntValues);
      minValue = Math.min(...rawIntValues);
      loop();
    };
    // start reading the file. When it is done, calls the onload event defined above.
    reader.readAsBinaryString(fileInput.files[0]);
  };

fileInput.addEventListener("change", readFile);

function draw() {
  noLoop();

  let inputMinValue = parseInt(inputMin.value);
  let inputMaxValue = parseInt(inputMax.value);

  mappedValues = [];
  for (let i = 0; i < rawIntValues.length; i++) {
    const rawValue = rawIntValues[i];
    mappedValues.push(
      parseInt(map(rawValue, minValue, maxValue, inputMinValue, inputMaxValue))
    );
  }
  console.log(mappedValues);
  document.getElementById("out").innerHTML = "[" + mappedValues + "\n" + "]";
}

function copyValues() {
  var copyText = document.getElementById("out");

  /* Copy the text inside the text field */
  navigator.clipboard.writeText(copyText.value);
}
