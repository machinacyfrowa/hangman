function guess(guessedChar) {


    //zgadywany znak
    //let guessedChar = document.getElementById("guessedChar").value;
    //odczekaj "chwilkę" i wyczyść pole tekstowe
    //setTimeout to funkcja która ma dwa argumenty w nawiasie
    //pierwszy argument to "co" ma zrobić i musi to być funkcja
    //drugi argument to opóźnienie w milisekundach "kiedy" ma to zrobić
    //setTimeout(() => {
    //   document.getElementById("guessedChar").value = ""
    //}, 1000);

    //wypisz do konsoli jaki znak próbowaliśmy odgadnąć
    console.log("Próba odgadnięcia znaku: " + guessedChar);

    //dodaj flagę określającą czy w tej próbie trafiliśmy jakąś literę,
    //domyślnie flaga ma wartość false czyli nie trafiony
    let correct = false;

    //odkryj literki jeśli trafiłem


    //przejdź pętlą przez całe hasło, jesli znajdziesz pasującą
    //literę to w zamaskowanym haśle zamien "_" na właściwą literę
    for (let i = 0; i < password.length; i++) {
        //jeżeli w zamaskowany haśle jest "_"
        //tylko wtedy cokolwiek zmieniamy 
        if (maskedPassword[i] == "_") {
            //jeżeli zgadywana litera jest taka sama jak
            //i-ta litera w haśle
            if (guessedChar == password[i]) {
                //odkryj w zamaskowanym haśle tą literę
                maskedPassword[i] = password[i];
                //zgadliśmy literę - postaw flagę
                correct = true;
            }
        }

    }
    //sprawdz czy trafiliśmy i w razie potrzeby zwiększ licznik nieudanych prób
    if (!correct) {
        //inkrementuj licznik
        errorCounter++;
        if (errorCounter >= 8) {
            //zmień funkcje wywoływaną po próbie odgadnięcia znaku
            //document.getElementById("guessedChar").removeEventListener("input", guess);
            //document.getElementById("guessedChar")
            //            .addEventListener("input", gameOver);

            //wyświetl kompletnego wisielca
            let imageUrl = "img/8.png";
            document.getElementById("image").src = imageUrl;
            //zablokuj klawiaturę - usuń przypięte zdarzenia z guzików
            //stworz tablicę złozoną z guzików pobranych z DOM
            //potrzebujemy array.from ponieważ foreach nie umie pracować z HTMLCollection
            let buttons = Array.from(document.getElementById("keyboard").children);
            //używamy pętli foreach żeby wykonac to samo działanie dla każdego guzika
            buttons.forEach((button) => {
                //wyłączamy guzik
                button.disabled = true;
                //odpinamy zdarzenie
                button.removeEventListener("click", ButtonPressed);
                //zmieniamy kolor tła na szare
                button.style.backgroundColor = "gray";
            })
            //wyświetl komunika o końcu gry
            setTimeout(gameOver, 1000);
        } else {
            //wygeneruj nowy url obrazka
            let imageUrl = "img/" + errorCounter + ".png";
            //podmień obrazek na stronie (zmień jego src)
            document.getElementById("image").src = imageUrl;
        }


    } else {
        //sprawdz czy zgadliśmy ostatnią literę
        if(maskedPassword.indexOf("_") == -1) {
            document.getElementById("victorySound").play();
            window.alert("Gratulacje!");
        }
    }

    //wyświetl zamaskowane hasło
    document.getElementById("maskedPassword").innerHTML = maskedPassword.join("");
}
//dodaj zdarzenie, które odpali się po załadowaniu strony
window.addEventListener("load", () => { //funkcja anonimowa
    //dodaj do pola edycyjnego funkcję guess(), która uruchomi sie
    //przy każdej zmianie zawartości (wpisaniu znaku)
    //document.getElementById("guessedChar")
    //    .addEventListener("input", guess);





    //przypnij funkcję newGame do guzika
    document.getElementById("newGameButton")
        .addEventListener("click", newGame);

    //uruchom new game po załadowaniu okna
    newGame();
})
function gameOver() {
    //funkcja uruchamia się po osiągnięciu maksymalnej liczby błędnych odpowiedzi
    alert("Koniec gry :(");
}
function newGame() {
    //zapisz do hasła ciąg tekstowy otrzymany z okna dialogowego
    //podzielony metodą split na tablicę po jednym znaku w komórce
    password = prompt("Podaj hasło do odgadnięcia: ").split("");
    errorCounter = 0;
    document.getElementById("image").src = "img/0.png";
    let passwordLength = password.length;
    maskedPassword = Array(passwordLength).fill("_");
    //wyświetl zamaskowane hasło
    document.getElementById("maskedPassword").innerHTML = maskedPassword.join("");
    //zresetuj eventListener dla pola tekstowego
    //document.getElementById("guessedChar").removeEventListener("input", gameOver);
    //document.getElementById("guessedChar").addEventListener("input", guess);
    drawKeyboard();
}
function drawKeyboard() {
    //tworzymy string zawierający wszystkie możliwe do użycia litery
    const chars = "abcdefghijklmnopqrstuwxyz";
    //zamieniamy je na tablicę - po jednym znaku w każdej komórce
    let charsArray = chars.split("");
    //znajdz i przygotuj odnośnik do lewej części strony
    let keyboardDiv = document.getElementById("keyboard");
    //czyścimy diva przed rozpoczęciem rysowania
    keyboardDiv.innerHTML = "";
    //lecimy pętlą foreach przez tablicę
    //dla każdego elementu tablicy wywołaj funkcję anonimową
    //dla każdego wywołana aktualny element jest dostępny pod nazwą zmiennej "c"
    charsArray.forEach((c) => {
        let newButton = document.createElement("button");
        newButton.innerHTML = c;
        newButton.addEventListener("click", ButtonPressed);
        keyboardDiv.appendChild(newButton);
    });
}
function ButtonPressed(event) {
    //console.log(event);
    let button = event.srcElement;
    let char = button.innerHTML;
    button.disabled = true;
    button.style.backgroundColor = "gray";
    console.log("Wciśnięto guzik:" + char);
    guess(char);
}

var password = "choinka".split("");
var maskedPassword;
