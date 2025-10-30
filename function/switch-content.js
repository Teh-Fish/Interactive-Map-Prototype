fetch("/data/map-preview/map-preview.json")
  .then((response) => response.json())
  .then((mapData) => {
    const listContainer = document.getElementById("map-list");

    for (let title in mapData) {
      const newListItem = document.createElement("li");
      const newButton = document.createElement("button");
      const newDiv = document.createElement("div");
      newDiv.className = "list-item";
      newButton.textContent = title;
      newButton.id = title;

      newButton.addEventListener("click", () => {
        const guideTitle = mapData[title];
        const mapName = guideTitle.map;
        const guidePublishedDate = guideTitle.date_updated;
        const guideImage = guideTitle.image;
        const guideAuthor = guideTitle.author;
        const guideOverview = guideTitle.overview;

        const guideContent = document.getElementById("guide-content");
        guideContent.innerHTML = `
        <div class = "heading">
        <h2>${title}</h2>
        <p class="date-published">Date published: ${guidePublishedDate}</p>
        <p class="author">Created by: ${guideAuthor}</p>
        </div>
        <div class="image-container">
        <a href = "/map-detail/${mapName}.html"><img src="${guideImage}"></a>
        </div>
        <div class="overview">
        <p id="overview-title">Overview</p>
        <p>${guideOverview}</p>
        </div>
        `;
      });

      newDiv.appendChild(newButton);
      newListItem.appendChild(newDiv);
      listContainer.appendChild(newListItem);
    }
  });
