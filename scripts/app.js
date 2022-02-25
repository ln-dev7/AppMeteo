// Key  : dac8cd8abf90c2565292a581ea165b9b
let tabDelay = document.querySelectorAll('.w-opacity')

function background(temperature) {
  if (temperature <= 15) {
    setTimeout(() => {
      document.body.style.setProperty('background', `linear-gradient(90deg, #2c91f0 ${100 - temperature * 100 / 15}%, #29f3d8 100%, #FFF57B 100%,#FA8607 100%)`)
    }, 2000);
    document.querySelector('.w-background').style.opacity = 0;
    setTimeout(() => {
      document.querySelector('.w-background').style.setProperty('background', `linear-gradient(90deg, #2c91f0 ${100 - temperature * 100 / 15}%, #29f3d8 100%, #FFF57B 100%,#FA8607 100%)`)
    }, 750);
    setTimeout(() => {
      document.querySelector('.w-background').style.opacity = 1;
    }, 850);
  } else {
    setTimeout(() => {
      document.body.style.setProperty('background', `linear-gradient(90deg, #29f3d8 0%, #2c91f0 0%, #FFF57B 0%,#FA8607 ${100 - (temperature - 15) * 100 / 15}%)`)
    }, 2000);
    document.querySelector('.w-background').style.opacity = 0;
    setTimeout(() => {
      document.querySelector('.w-background').style.setProperty('background', `linear-gradient(90deg, #29f3d8 0%, #2c91f0 0%, #FFF57B 0%,#FA8607 ${100 - (temperature - 15) * 100 / 15}%)`)
    }, 750);
    setTimeout(() => {
      document.querySelector('.w-background').style.opacity = 1;
    }, 850);
  }
}
let villeChoisie;

if ("geolocation" in navigator) {
  navigator.geolocation.watchPosition(
    (position) => {
      const url =
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
        position.coords.latitude +
        "&lon=" +
        position.coords.longitude +
        "&appid=dac8cd8abf90c2565292a581ea165b9b&units=metric";

      let requete = new XMLHttpRequest(); // Nous créons un objet qui nous permettra de faire des requêtes
      requete.open("GET", url); // Nous récupérons juste des données
      requete.responseType = "json"; // Nous attendons du JSON
      requete.send(); // Nous envoyons notre requête

      // Dès qu'on reçoit une réponse, cette fonction est executée
      requete.onload = function () {
        if (requete.readyState === XMLHttpRequest.DONE) {
          if (requete.status === 200) {
            let reponse = requete.response;
            let temperature = reponse.main.temp;
            let ville = reponse.name;
            let feels = reponse.main.feels_like;
            let humidity = reponse.main.humidity;
            let windSpeed = reponse.wind.speed;
            background(temperature)

            document.querySelector("#temperature-label").textContent =
              temperature;
            document.querySelector("#ville").textContent = ville;
            document.querySelector("#humi").textContent = humidity;
            document.querySelector("#wind").textContent = windSpeed;
            document.querySelector("#feels").textContent = feels;
          } else {
            alert("Un problème est intervenu, merci de revenir plus tard.");
          }
        }
      };
    },
    erreur,
    options
  );

  var options = {
    enableHighAccuracy: true,
  };
} else {
  villeChoisie = "saint-saulve";
  recevoirTemperature(villeChoisie);
}

let changerDeVille = document.querySelector("#changer");
changerDeVille.addEventListener("click", () => {
  villeChoisie = prompt("Quelle ville souhaitez-vous voir ?");
  recevoirTemperature(villeChoisie);
});

function erreur() {
  villeChoisie = "Douala";
  recevoirTemperature(villeChoisie);
}

function recevoirTemperature(ville) {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    ville +
    "&appid=dac8cd8abf90c2565292a581ea165b9b&units=metric";

  let requete = new XMLHttpRequest(); // Nous créons un objet qui nous permettra de faire des requêtes
  requete.open("GET", url); // Nous récupérons juste des données
  requete.responseType = "json"; // Nous attendons du JSON
  requete.send(); // Nous envoyons notre requête

  // Dès qu'on reçoit une réponse, cette fonction est executée
  requete.onload = function () {
    if (requete.readyState === XMLHttpRequest.DONE) {
      if (requete.status === 200) {
        let reponse = requete.response;
        // console.log(reponse);
        let temperature = reponse.main.temp;
        let ville = reponse.name;
        let feels = reponse.main.feels_like;
        let humidity = reponse.main.humidity;
        let windSpeed = reponse.wind.speed;
        background(temperature)
        tabDelay.forEach(element => {
          element.style.opacity = 0;
        });
        setTimeout(() => {
          document.querySelector("#temperature-label").textContent = temperature;
          document.querySelector("#ville").textContent = ville;
          document.querySelector("#humi").textContent = humidity;
          document.querySelector("#wind").textContent = windSpeed;
          document.querySelector("#feels").textContent = feels;
          setTimeout(() => {
            tabDelay.forEach(element => {
              element.style.opacity = 1;
            });
          }, 100);
        }, 750);

      } else {
        alert("Un problème est intervenu, merci de revenir plus tard.");
      }
    }
  };
}

