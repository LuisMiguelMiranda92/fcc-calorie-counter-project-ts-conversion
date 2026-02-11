const calorieCounter = document.getElementById(
  "calorie-counter",
) as HTMLFormElement;
const budgetNumberInput = document.getElementById("budget") as HTMLInputElement;
const entryDropdown = document.getElementById(
  "entry-dropdown",
) as HTMLSelectElement;
const addEntryButton = document.getElementById(
  "add-entry",
) as HTMLButtonElement;
const clearButton = document.getElementById("clear") as HTMLButtonElement;
const output = document.getElementById("output") as HTMLDivElement;
let isError: boolean = false;

function cleanInputString(str: string): string {
  const regex = /[+-\s]/g;
  return str.replace(regex, "");
}

function isInvalidInput(str: string): RegExpMatchArray | null {
  const regex = /\d+e\d+/i;
  return str.match(regex);
}

function addEntry() {
  const targetInputContainer = document.querySelector<HTMLDivElement>(
    `#${entryDropdown.value} .input-container`,
  )!;
  const entryNumber: number =
    targetInputContainer.querySelectorAll('input[type="text"]').length + 1;
  const HTMLString: string = `
  <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
  <input type="text" id="${entryDropdown.value}-${entryNumber}-name" placeholder="Name" />
  <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
  <input
    type="number"
    min="0"
    id="${entryDropdown.value}-${entryNumber}-calories"
    placeholder="Calories"
  />`;
  targetInputContainer.insertAdjacentHTML("beforeend", HTMLString);
}

function calculateCalories(e: Event) {
  e.preventDefault();
  isError = false;

  const breakfastNumberInputs = document.querySelectorAll<HTMLInputElement>(
    "#breakfast input[type='number']",
  );
  const lunchNumberInputs = document.querySelectorAll<HTMLInputElement>(
    "#lunch input[type='number']",
  );
  const dinnerNumberInputs = document.querySelectorAll<HTMLInputElement>(
    "#dinner input[type='number']",
  );
  const snacksNumberInputs = document.querySelectorAll<HTMLInputElement>(
    "#snacks input[type='number']",
  );
  const exerciseNumberInputs = document.querySelectorAll<HTMLInputElement>(
    "#exercise input[type='number']",
  );

  const breakfastCalories: number | null = getCaloriesFromInputs(
    breakfastNumberInputs,
  );
  const lunchCalories: number | null = getCaloriesFromInputs(lunchNumberInputs);
  const dinnerCalories: number | null =
    getCaloriesFromInputs(dinnerNumberInputs);
  const snacksCalories: number | null =
    getCaloriesFromInputs(snacksNumberInputs);
  const exerciseCalories: number | null =
    getCaloriesFromInputs(exerciseNumberInputs);
  const budgetCalories: number | null = getCaloriesFromInputs([
    budgetNumberInput,
  ]);

  if (isError) {
    return;
  }

  const consumedCalories: number =
    (breakfastCalories ?? 0) +
    (lunchCalories ?? 0) +
    (dinnerCalories ?? 0) +
    (snacksCalories ?? 0);
  const remainingCalories: number =
    (budgetCalories ?? 0) - consumedCalories + (exerciseCalories ?? 0);
  const surplusOrDeficit: string =
    remainingCalories < 0 ? "Surplus" : "Deficit";
  output.innerHTML = `
  <span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(remainingCalories)} Calorie ${surplusOrDeficit}</span>
  <hr>
  <p>${budgetCalories} Calories Budgeted</p>
  <p>${consumedCalories} Calories Consumed</p>
  <p>${exerciseCalories} Calories Burned</p>
  `;

  output.classList.remove("hide");
}

function getCaloriesFromInputs(
  list: NodeListOf<HTMLInputElement> | HTMLInputElement[],
): number | null {
  let calories: number = 0;
  const itemList = Array.from(list);

  for (const item of itemList) {
    const currVal: string = cleanInputString(item.value);
    const invalidInputMatch: RegExpMatchArray | null = isInvalidInput(currVal);

    if (invalidInputMatch) {
      alert(`Invalid Input: ${invalidInputMatch[0]}`);
      isError = true;
      return null;
    }
    calories += Number(currVal);
  }
  return calories;
}

function clearForm() {
  const inputContainers: HTMLDivElement[] = Array.from(
    document.querySelectorAll(".input-container"),
  );

  for (const container of inputContainers) {
    container.innerHTML = "";
  }

  budgetNumberInput.value = "";
  output.innerText = "";
  output.classList.add("hide");
}

addEntryButton.addEventListener("click", addEntry);
calorieCounter.addEventListener("submit", calculateCalories);
clearButton.addEventListener("click", clearForm);
