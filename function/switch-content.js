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
        const guidePublishedDate = guideTitle.date_updated;
        const guideImage = guideTitle.image;
        const guideAuthor = guideTitle.author;
        const guideOverview = guideTitle.overview;

        const guideContent = document.getElementById("guide-content");
        guideContent.innerHTML = `
          <div class = "heading">
        <h2>${title}</h2>
        <p class="date-published">${guidePublishedDate}</p>
        <p class="author">${guideAuthor}</p>
        </div>
        <div class="image-container">
        <img src="${guideImage}">
        </div>
        <div class="overview">
        <p>${guideOverview}</p>
        </div>
        `;
      });

      newDiv.appendChild(newButton);
      newListItem.appendChild(newDiv);
      listContainer.appendChild(newListItem);
    }
  });
