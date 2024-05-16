document.addEventListener("DOMContentLoaded", function () {
  let scenarios = [];
  let characters = [];
  let traits = [];

  function handleAddClick(event) {
    const cardId = event.target.dataset.cardId;
    const inputElement = document.getElementById(cardId);

    if (inputElement.value.trim()) {
      const normalizedInputValue = inputElement.value.toLowerCase();
      const existingListItems = document.querySelectorAll(`#${cardId}-list li`);
      const existingListItemTexts = Array.from(existingListItems).map((li) =>
        li.textContent.trim().toLowerCase()
      );

      if (existingListItemTexts.includes(normalizedInputValue)) {
        inputElement.value = "";
        return;
      }

      const listItem = document.createElement("li");
      listItem.textContent = inputElement.value;
      const listId = `#${cardId}-list`;
      document.querySelector(listId).appendChild(listItem);

      arraysOptions(cardId, inputElement.value);

      inputElement.value = "";
    }
  }

  function arraysOptions(array, value) {
    switch (array) {
      case "scenario":
        scenarios.push(value);
        fillScenarioComboBox(value);
        break;
      case "characters":
        fillCharacterComboBox(value);
        break;
    }
  }

  function fillScenarioComboBox(value) {
    const characterCard = document.getElementById(`characters-card`);
    const scenarioComboBox = document.getElementById(`scenario-box`);
    characterCard.classList.remove("hidden");
    const newOption = document.createElement("option");
    newOption.textContent = value;
    scenarioComboBox.appendChild(newOption);
  }

  function fillCharacterComboBox(value) {
    const traitCard = document.getElementById(`traits-card`);
    traitCard.classList.remove("hidden");
    const scenarioSelected = document
      .getElementById("scenario-box")
      .value.toLowerCase();
    value = value.toLowerCase();

    const existScenarioIndex = characters.findIndex(
      (scenario) => scenario.scenarioSelected === scenarioSelected
    );

    if (existScenarioIndex === -1) {
      const characterObject = {
        scenarioSelected,
        characterList: [value],
      };
      characters.push(characterObject);
    } else {
      characters[existScenarioIndex].characterList.push(value);
    }
  }

  const addButtons = document.querySelectorAll(".card-btn");
  addButtons.forEach((button) => {
    button.addEventListener("click", handleAddClick);
  });
});
