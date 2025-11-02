let currentAddMarker = false;
let xPos = 0;
let yPos = 0;
let markerArray = [];

function getCursorLocation(e) {
  const mapImage = document.getElementById("map-container");
  const rect = mapImage.getBoundingClientRect();
  let xPos = e.clientX - rect.left;
  let yPos = e.clientY - rect.top;

  return [xPos, yPos];
}

const mapImage = document.getElementById("map-container");
mapImage.addEventListener("mousemove", (e) => {
  let tempPos = getCursorLocation(e);
  xPos = tempPos[0];
  yPos = tempPos[1];
});

function toggleAddMarker(markerClass) {
  currentAddMarker = !currentAddMarker;

  if (currentAddMarker) {
    mapImage.addEventListener(
      "click",
      () => {
        let markerInfo = prompt("Enter marker description:");
        markerArray.push(addMarker(xPos, yPos, markerClass, markerInfo));
        currentAddMarker = !currentAddMarker;
      },
      { once: true }
    );
  }
}

function addMarker(xPos, yPos, markerClass, markerInfo) {
  const container = document.getElementById("map-container");
  const newMarker = document.createElement("img");
  newMarker.className = markerClass;
  newMarker.style.position = "absolute";
  newMarker.style.height = "40px";
  newMarker.style.width = "40px";
  newMarker.style.left = `${xPos}px`;
  newMarker.style.top = `${yPos}px`;
  newMarker.style.transform = `translate(-50%, -50%)`;
  newMarker.dataset.markerInfo = markerInfo;
  newMarker.addEventListener("click", () => {
    alert(newMarker.dataset.markerInfo);
  });
  switch (markerClass) {
    case "poi":
      newMarker.src = "/data/icons/geo-alt.svg";
      newMarker.style.transform = `translate(-50%, -100%)`;
      break;
    case "vehicle":
      newMarker.src = "/data/icons/car-front.svg";
      break;
    case "medical":
      newMarker.src = "/data/icons/prescription2.svg";
      break;
    case "fuel":
      newMarker.src = "/data/icons/ev-station.svg";
      break;
  }
  container.appendChild(newMarker);
  return newMarker;
}

function hideMarker(markerArray) {
  for (const marker of markerArray) {
    marker.style.opacity = "0";
  }
}

function showMarker(markerArray) {
  for (const marker of markerArray) {
    marker.style.opacity = "1";
  }
}

const addLocationButton = document.getElementById("poi-button");
const addVehicleButton = document.getElementById("vehicle-button");
const addMedicalButton = document.getElementById("medical-button");
const addFuelButton = document.getElementById("fuel-button");
addLocationButton.addEventListener("click", () => {
  toggleAddMarker("poi");
});
addVehicleButton.addEventListener("click", () => {
  toggleAddMarker("vehicle");
});
addMedicalButton.addEventListener("click", () => {
  toggleAddMarker("medical");
});
addFuelButton.addEventListener("click", () => {
  toggleAddMarker("fuel");
});

const poiFilter = document.getElementById("poi-filter");
const vehicleFilter = document.getElementById("vehicle-filter");
const medicalFilter = document.getElementById("medical-filter");
const fuelFilter = document.getElementById("fuel-filter");
poiFilter.addEventListener("change", () => {
  const array = markerArray.filter((marker) => marker.className === "poi");
  if (poiFilter.checked) {
    showMarker(array);
  } else {
    hideMarker(array);
  }
});
vehicleFilter.addEventListener("change", () => {
  const array = markerArray.filter((marker) => marker.className === "vehicle");
  if (vehicleFilter.checked) {
    showMarker(array);
  } else {
    hideMarker(array);
  }
});
medicalFilter.addEventListener("change", () => {
  const array = markerArray.filter((marker) => marker.className === "medical");
  if (medicalFilter.checked) {
    showMarker(array);
  } else {
    hideMarker(array);
  }
});
fuelFilter.addEventListener("change", () => {
  const array = markerArray.filter((marker) => marker.className === "fuel");
  if (fuelFilter.checked) {
    showMarker(array);
  } else {
    hideMarker(array);
  }
});
