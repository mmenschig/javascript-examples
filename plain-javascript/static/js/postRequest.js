

// Submit button event listener
document.getElementById("buttonSubmit").addEventListener("click", parseForm)

// Defining module vars
numClicks = 1

function parseForm(event) {
  event.preventDefault();

  document.getElementById("resultUsername").innerHTML = '';
  document.getElementById("resultAddition").innerHTML = '';

  // Displays the spinner
  document.getElementById("loader").style.display = "inline"; // Removes (hides) spinner/loader when data is returned.

  // Fetches form data before sending it
  let username = document.getElementById("inputUsername").value;
  let value1 = parseInt(document.getElementById("inputValue1").value);
  let value2 = parseInt(document.getElementById("inputValue2").value);

  let sumResult = value1 + value2; // Calculated, but no longer used
  console.log(`Client side addition: ${sumResult}`)

  // Obsolete, as we let our Flask server receive the data first
  // document.getElementById("username-result").innerHTML = `You've signed up under name '${username}'`;
  // document.getElementById("addition-result").innerHTML = `The sum of the values is ${sumResult}`;

  const requestBody = {
    'username': username,
    'value1': value1,
    'value2': value2
  }

  postData(requestBody).then(data => {
    document.getElementById("loader").style.display = "none"; // Removes (hides) spinner/loader when data is returned.
    console.log(data)
    renderData(data)
  }).catch(error => {
    document.getElementById("loader").style.display = "none"; // Removes (hides) spinner/loader when error is returned.
    console.error(error);
  });
  document.getElementById("loader").style.display = "block";

  renderChart()
}

function renderData(data) {
  document.getElementById("resultUsername").innerHTML = `You've signed up under name <strong>'${data.username}'</strong>`;
  document.getElementById("resultAddition").innerHTML = `The sum of the values is <strong>${data.result}</strong>`;
}

async function postData(requestData) {
  const requestURL = 'http://127.0.0.1:5000/simplePost'

  const response = await fetch(requestURL, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData)
  })
  return response.json();
}

// Simple function to render a Chart.js chart
// Find it at: https://www.chartjs.org/
function renderChart() {
  // Destroys a previously created chart so that we can re-render
  window.myChart instanceof Chart ? window.myChart.destroy() : null;

  const labels = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  let dataset = Array.from({length: 12}, () => Math.floor(Math.random() * 100)) // Creates an array with 12 random values

  const data = {
    labels: labels,
    datasets: [{
      label: "Users registered per month",
      fillColor: "rgba(220,220,220,0.2)",
      strokeColor: "rgba(220,220,220,1)",
      pointColor: "rgba(220,220,220,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(220,220,220,1)",
      data: dataset
    }]
  };

  const config = {
    type: 'line',
    data,
    options: {
      elements: {
        line: {
          tension: 0.4 // line smoothing
        }
      }
    }
};

  myChart = new Chart(
    document.getElementById('myChart').getContext("2d"),
    config
  );
}

// Simple function to console.log something
// Try using console.error or console.table
// Find docs here:https://developer.mozilla.org/en-US/docs/Web/API/console
function alarmBell() {
  console.log("Button has been clicked!");
}

// Increments numClicks variable defined at top level
function clickCounter() {
  console.log(`You've clicked the button ${numClicks} times`);
  numClicks += 1
}

// Simple example showing async code
// Great video on event loop: https://www.youtube.com/watch?v=8aGhZQkoFbQ&vl=en
function delayMessage() {
  console.log("This is the first message!")
  setTimeout(function() {
    console.log("This is the second message")
  }, 0)
  console.log("This is the third message!")
}