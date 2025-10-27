fetch("/data/map-preview/map-preview.json")
  .then((response) => response.json())
  .then((mapData) => {
    const listContainer = document.getElementById("map-list");

    for (let title in mapData) {
      const newListItem = document.createElement("li");
      const newAnchor = document.createElement("a");
      newAnchor.textContent = title;
      newAnchor.href = `index.html?id=${encodeURIComponent(title)}`;

      newListItem.appendChild(newAnchor);
      listContainer.appendChild(newListItem);
    }
  });
