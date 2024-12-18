import "./../css/style.css";
import { shuffle } from "./utils";

const createCard = (number = 0) => {
  const item = document.createElement("button");
  const back = document.createElement("div");
  const numplace = document.createElement("span");

  item.classList.add(
    "flex",
    "justify-center",
    "items-center",
    "basis-1/5",
    "w-20",
    "h-20",
    "outline",
    "outline-emerald-600"
  );
  back.classList.add(
    "backDiv",
    "flex",
    "bg-blue-400",
    "h-full",
    "w-full",
    "justify-center",
    "items-center"
  );
  numplace.classList.add(
    "numSpan",
    "text-xl",
    "font-semibold",
    "z-10",
    "hidden"
  );
  numplace.textContent = number;

  back.append(numplace);
  item.append(back);

  return item;
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
  app.innerHTML = "";

  const wrap = document.createElement("div");
  wrap.classList.add("flex", "gap-3", "flex-row", "flex-wrap");

  wrap.id = "field";

  for (let i = 0; i < cardCount; i++) {
    const card = createCard(numbersArray[i]);
    card.id = i + 1;
    wrap.append(card);
  }
  app.append(wrap);
};

const startGame = () => {
  createField();

  let openedCards = [];
  let currentPair = [];

  const field = document.getElementById("field");

  function checkWin() {
    if (openedCards.length === 16) {
      const app = document.getElementById("app");
      const replayButton = document.createElement("button");
      replayButton.textContent = "Сыграть ещё раз";
      replayButton.classList.add(
        "bg-emerald-500",
        "text-white",
        "py-2",
        "px-4",
        "mt-4",
        "rounded"
      );
      replayButton.addEventListener("click", startGame);
      app.append(replayButton);
    }
  }

  field.addEventListener("click", (e) => {
    const targetElement = e.target.closest("button");

    if (targetElement && currentPair.length < 2) {
      const div = targetElement.querySelector(".backDiv");
      const span = targetElement.querySelector(".numSpan");
      const num = span.textContent;

      const currentCard = {
        id: targetElement.id,
        num: num,
      };

      if (openedCards.some((card) => card.id === currentCard.id)) {
        return;
      }

      currentPair.push(currentCard);

      div.classList.toggle("bg-blue-400");
      span.classList.toggle("hidden");

      if (currentPair.length === 2) {
        const [first, second] = currentPair;

        if (first.num === second.num) {
          openedCards.push(first, second);
          currentPair = [];
          checkWin();
        } else {
          setTimeout(() => {
            currentPair.forEach((card) => {
              const cardElement = document.getElementById(card.id);

              cardElement
                .querySelector(".backDiv")
                .classList.add("bg-blue-400");
              cardElement.querySelector(".numSpan").classList.add("hidden");
            });
            currentPair = [];
          }, 1000);
        }
      }
    }
  });
};

export { startGame };
