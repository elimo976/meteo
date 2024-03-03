import axios from "axios";

export class CountriesService {
    getCountries() {
        return axios.get("https://raw.githubusercontent.com/pmontrasio/codici-stati/master/dist/countries.json")
    }
}

export class MeteoService {
    getMeteo(api:string){
        return axios.get(api)
    }
}