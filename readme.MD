# APPLICATION DE METEO

C'est une application qui permet de voir la meteo dans une ville.
<br>
Pour ce projet bien evidemment on a utilise du HTML et du CSS
<br>
On a utilise https://openweathermap.org/current comme API pour nous fournir les meteos des villes
<br>
Pour avoir access a l'api vous devez juste creer un compte et vous devez recuperer votre token
<br>
l' URL utilise doit etre sous cette forme : `https://api.openweathermap.org/data/2.5/weather?q=nom_de_la_ville&appid=votre_token&units=metric`
<br>
Mais vu que l'on veut connaitre la ville de l'utilisateur au cas ou il active la localisation alors on utilise plus tot ce lien :
`https://api.openweathermap.org/data/2.5/weather?lat=latitude&lon=longitude&appid=votre_token&units=metric`
<br>
Cet API nous retourne un JSON avec beaucoup d'information mais on utilisera juste quelques ...
<br>
Ce code est un extrait de comment recuperer les informations grace a l'API

`const url = " ... ";
  let requete = new XMLHttpRequest();
  requete.open("GET", url);
  requete.responseType = "json";
  requete.send();
  requete.onload = function () {
    if (requete.readyState === XMLHttpRequest.DONE) {
      if (requete.status === 200) { 
        let reponse = requete.response;
        let temperature = reponse.main.temp;
        let ville = reponse.name;
        let feels = reponse.main.feels_like;
        let humidity = reponse.main.humidity;
        let windSpeed = reponse.wind.speed;
      }
    }
  }`

  `temperature` : c'est la temperature dans la ville <br>
  `ville` : c'est le nom de la ville <br>
  `feels` : c'est la temperature ressentie <br>
  `humidity` : c'est l'humidite <br>
  `windSpeed` : c'est la vitesse du vent <br>
