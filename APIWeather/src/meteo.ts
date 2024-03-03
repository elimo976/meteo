import { MeteoService } from "./countries.service";

export class Meteo {

    cerca() {
        document.querySelector("#btnInvia")!.addEventListener("click", (e) => {
            e.preventDefault();
            let textInput = document.querySelector("#textInput") as HTMLInputElement;
            let inputSelect = document.querySelector("#inputSelect") as HTMLSelectElement;
            if (textInput.value.trim().toLocaleLowerCase() == "" || inputSelect.value == "0") {
                return;
            }
                const apiMeteo = `https://api.openweathermap.org/data/2.5/weather?q=${textInput.value.trim().toLocaleLowerCase()},${inputSelect.value}&appid=3d8aa45f7271f6bcb67cba7a6b0896d7`
            let response = new MeteoService().getMeteo(apiMeteo)
                .then(res => {
                console.log(res.data);
                let boxCard = document.querySelector("#boxCard")!;
                boxCard.innerHTML = "";
                boxCard.innerHTML += this.createHTMLMeteo(res.data);
            })
                .catch(err => console.log(err));
        })
    }
    createHTMLMeteo(data:any) {
        return `<div class="container mp-3 mt-4"><div class="card" style="width: 18rem;">
        <ul class="list-group list-group-flush">
          <li class="list-group-item font-weight-bold ">Condizione: ${data.weather[0].main}  <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png"></li>
          <li class="list-group-item font-weight-bold ">Temperatura: ${
            (parseInt(data.main.temp) - 273.15).toFixed(0)} °C</li>
          <li class="list-group-item font-weight-bold ">Temperatura percepita: ${(parseInt(data.main.feels_like)- 273.15).toFixed(0)} °C</li>
          <li class="list-group-item font-weight-bold ">Temperatura min: ${(parseInt(data.main.temp_min)- 273.15).toFixed(0)} °C</li>
          <li class="list-group-item font-weight-bold ">Temperatura max: ${(parseInt(data.main.temp_max)- 273.15).toFixed(0)} °C</li>
          <li class="list-group-item font-weight-bold ">Umidità: ${data.main.humidity} %</li>
          <li class="list-group-item font-weight-bold ">Vento: ${data.wind.speed} Km/h ${this.ventoAngolare(data.wind.deg)}</li>
          <li class="list-group-item font-weight-bold ">Pressione: ${data.main.pressure} hPa</li>
        </ul>
      </div>
      </div>`
    }
    ventoAngolare(angolo:any) {
        const direzioni = ["Nord", "Nord-Est", "Est", "Sud-Est", "Sud", "Sud-Ovest", "Ovest", "Nord-Ovest"];
        const indice = Math.round((angolo % 360) / 45) % 8;
        return direzioni[indice];
    }
}