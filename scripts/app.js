// https://api.openweathermap.org/data/2.5/weather?q=saint-saulve&appid=dac8cd8abf90c2565292a581ea165b9b&units=metric
// dac8cd8abf90c2565292a581ea165b9b

const changerVille = document.querySelector("#changer");

recevoirTemperature('Douala');
changerVille.addEventListener("click", () => {
  var villeChoisie = prompt("Entrer le nom de la ville");
  console.log(villeChoisie);
  recevoirTemperature(villeChoisie);
});

function recevoirTemperature(ville) {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    ville +
    "&appid=dac8cd8abf90c2565292a581ea165b9b&units=metric";

  let requete = new XMLHttpRequest(); // Créer un objet
  requete.open("GET", url); // Premier paramètre GET / POST, deuxième paramètr : url
  requete.responseType = "json"; // Nous attendons du JSON
  requete.send(); // Nous envoyons notre requête

  // Dèss qu'on reçoit une réponse, cette fonction est executée
  requete.onload = function () {
    if (requete.readyState === XMLHttpRequest.DONE) {
      if (requete.status === 200) {
        let reponse = requete.response; // on stock la réponse
        let temperature = reponse.main.temp;
        let ville = reponse.name;
        // "temp": 10,
        // "feels_like": 7.35,
        // "temp_min": 7.99,
        // "temp_max": 11.64,
        // "pressure": 1028,
        // "humidity": 61
        document.querySelector("#temperature-label").textContent = temperature;
        document.querySelector("#ville").textContent = ville;
      } else {
        alert("Un problème est intervenu, merci de revenir plus tard.");
      }
    }
  };
}
