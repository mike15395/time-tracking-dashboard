let activities = [];
let rootStyles = getComputedStyle(document.documentElement);
let blueColor = rootStyles.getPropertyValue("--Pale-Blue").trim();
fetchData();

function displayDaily(e) {
  e.style.color = "white";
  document.getElementById("weekly").style.color = blueColor;
  document.getElementById("monthly").style.color = blueColor;
  displayCards(activities, "daily");
}

function displayWeekly(e) {
  e.style.color = "white";
  document.getElementById("daily").style.color = blueColor;
  document.getElementById("monthly").style.color = blueColor;
  displayCards(activities, "weekly");
}

function displayMonthly(e) {
  e.style.color = "white";
  document.getElementById("weekly").style.color = blueColor;
  document.getElementById("daily").style.color = blueColor;
  displayCards(activities, "monthly");
}

function displayCards(activities, updatedTimeFrame) {
  let selectedTimeFrame;
  if (!updatedTimeFrame) {
    selectedTimeFrame = "daily";
  } else {
    selectedTimeFrame = updatedTimeFrame;
  }

  let cards = activities.map(
    (
      item
    ) => `<div class=${item.title} style="background-color:var(--${item.title})">
      <div class="card-background-image" style="background-color:var(--${item.title})">
        <img src="./images/icon-${item.title}.svg" alt="icon-work">
      </div>
      <div class="card-time-container">
        <div class="card-title-container">
          <span class="title">${item.title}</span><span class="dots">...</span></div>
        <div class="card-time-container">
          <div class="card-time">${item.timeframes[selectedTimeFrame].current}hrs</div>
          <div class="last-time">Last week-${item.timeframes[selectedTimeFrame].previous}hrs</div>
        </div>
      </div>
    </div>`
  );

  document.querySelector(".main-container").innerHTML += cards.join("");
}

async function fetchData() {
  // const url = "http://127.0.0.1:5500/time-tracking-dashboard-main/data.json";
  const url = "./data.json";
  fetch(url)
    .then((res) => {
      if (!res.ok) {
        console.log("something went wrong");
      }
      return res.json();
    })
    .then((data) => {
      activities = [...data];
      displayCards(activities);
    });
}
