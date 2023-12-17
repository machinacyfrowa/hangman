function guess() {
    //funkcja pobiera pojedynczy znak z pola tekstowego
    //na stronie i wyszukuje oraz ujawnia pasujące znaki w haśle



    //zgadywany znak
    let guessedChar = document.getElementById("guessedChar").value;
    //odczekaj "chwilkę" i wyczyść pole tekstowe
    //setTimeout to funkcja która ma dwa argumenty w nawiasie
    //pierwszy argument to "co" ma zrobić i musi to być funkcja
    //drugi argument to opóźnienie w milisekundach "kiedy" ma to zrobić
    setTimeout(() => {
        document.getElementById("guessedChar").value = ""
    }, 1000);

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
    if(!correct) {
        errorCounter++;
    }

    //wyświetl zamaskowane hasło
    document.getElementById("maskedPassword").innerHTML = maskedPassword.join("");
}
//dodaj zdarzenie, które odpali się po załadowaniu strony
window.addEventListener("load", () => { //funkcja anonimowa
    //dodaj do pola edycyjnego funkcję guess(), która uruchomi sie
    //przy każdej zmianie zawartości (wpisaniu znaku)
    document.getElementById("guessedChar")
        .addEventListener("input", guess);

    //wyświetl zamaskowane hasło
    document.getElementById("maskedPassword").innerHTML = maskedPassword.join("");
})

const password = "choinka".split("");
var maskedPassword = "_______".split("");
var errorCounter = 0;