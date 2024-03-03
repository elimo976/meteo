// import { CountryModel } from "./country.model";
import { CountriesService } from "./countries.service";

export class Country {
    constructor()
    {
        this.optionConstructor()
    }
    
    optionConstructor() {
        let response = new CountriesService();
        response.getCountries()
            .then(res => {
                console.log(res.data);
                let dati: { [ley: string]: string }[] = res.data;
                let select = document.querySelector("#inputSelect")!;
                for (const nazioni in dati) {
                    select.innerHTML += this.toHTML(dati[nazioni]);
                }
            })
            .catch(err => console.log(err));
    }
    toHTML(dato: { [key: string]: string }) {
        if (dato.italian_country_name_1 == undefined ||dato.iso3361_2_characters=="") return"";
        return `<option value="${dato.iso3361_2_characters}">${dato.italian_country_name_1}</option>`;
      }
}