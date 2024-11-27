import "./../css/style.css";
import { shuffle } from "./utils";

const createCard = (number = 0) => {
  const li = document.createElement("li");
  const back = document.createElement("div");
  const numplace = document.createElement("span");

  li.classList.add(
    "flex",
    "justify-center",
    "items-center",
    "basis-1/5",
    "w-20",
    "h-20",
    "outline",
    "outline-emerald-600",
    "cursor-pointer"
  );
  back.classList.add(
    "backDiv",
    "flex",
    "bg-orange-400",
    "h-full",
    "w-full",
    "justify-center",
    "items-center"
  );
  numplace.classList.add(
    "numSpan",
    "text-xl",
    "font-semibold",
    "z-10"
    // "hidden"
  );
  numplace.textContent = number;

  back.append(numplace);
  li.append(back);

  return li;
};

const createField = (row = 4, col = 4) => {
  const cardCount = row * col;
  let numbersArray = [];

  for (let i = 1; i <= cardCount / 2; i++) {
    numbersArray.push(i);
    numbersArray.push(i);
  }
  numbersArray = shuffle(numbersArray);

  const app = document.getElementById("app");

  const ul = document.createElement("ul");
  ul.classList.add("flex", "gap-3", "flex-row", "flex-wrap");

  ul.id = "field";

  for (let i = 0; i < cardCount; i++) {
    const card = createCard(numbersArray[i]);
	card.id = i + 1
    ul.append(card);
  }
  app.append(ul);
};

const startGame = () => {
  createField();

  let openedCards = [];
  let currentPair = [];

  const field = document.getElementById("field");

  field.addEventListener("click", (e) => {
    const targetElement = e.target.closest("li");

    if (targetElement) {
      const div = targetElement.querySelector(".backDiv");
      const span = targetElement.querySelector(".numSpan");
      const num = span.textContent;

		const currentCard = {
			id: targetElement.id,
			num: num,
		}

      div.classList.toggle("bg-orange-400");
      span.classList.toggle("hidden");

	
		console.log(currentCard);
    //   console.log(`current ${currentPair}`);
    //   console.log(`opened ${openedCards}`);
    }
  });
};

export { startGame };
