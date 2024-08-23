let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newGame = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".message-container");
let msg = document.querySelector("#msg");

let turnO = true;
let gameActive = true;

const winningPattern = [
    [0, 1, 2], [0, 3, 6], [0, 4, 8],
    [1, 4, 7], [2, 5, 8], [2, 4, 6],
    [3, 4, 5], [6, 7, 8]
];

boxes.forEach((box) => {
    box.addEventListener("click", function () {
        if (!gameActive) return;

        if (turnO) {
            box.innerHTML = "O";
            turnO = false;
        } else {
            box.innerHTML = "X";
            turnO = true;
        }

        box.disabled = true;
        checkWinner();
    });
});

const showWinner = (winner) => {
    console.log("showWinner called with", winner); // Debugging line
    msg.innerHTML = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide"); // Ensure container is shown
    msgContainer.style.display = "block";  // Ensure message is visible
    gameActive = false; // Stop the game after a win
};

const checkWinner = () => {
    for (let pattern of winningPattern) {
        let posVal1 = boxes[pattern[0]].innerHTML;
        let posVal2 = boxes[pattern[1]].innerHTML;
        let posVal3 = boxes[pattern[2]].innerHTML;

        if (posVal1 !== "" && posVal1 === posVal2 && posVal2 === posVal3) {
            console.log("Winner", posVal1);
            showWinner(posVal1);
            disableAllBoxes(); // Disable all boxes after a win
            return;
        }
    }

    // Check for a draw if all boxes are filled and no winner
    if ([...boxes].every(box => box.innerHTML !== "")) {
        msg.innerHTML = `It's a Draw!`;
        msg.classList.remove("hide");
        msg.style.display = "block"; // Ensure message is visible
        gameActive = false;
    }
};

function disableAllBoxes() {
    boxes.forEach((box) => box.disabled = true);
}

// Reset game functionality
resetbtn.addEventListener("click", function () {
    boxes.forEach((box) => {
        box.innerHTML = "";
        box.disabled = false;
    });
    msg.classList.add("hide");
    msg.style.display = "none"; // Hide the message
    gameActive = true;
    turnO = true; // Optionally reset turn to "O"
});

// New Game functionality
newGame.addEventListener("click", function() {
    boxes.forEach((box) => {
        box.innerHTML = "";
        box.disabled = false;
    });
    msg.classList.add("hide");
    msg.style.display = "none"; // Hide the message
    gameActive = true;
    turnO = true; // Optionally reset turn to "O"
});
