//------------
// VARIABLES
//------------
const search                = document.querySelector("#inputSearch");
const range                 = document.querySelector("#inputRange");
const buttons               = document.querySelectorAll(".btnSort");
const countriesContainer    = document.querySelector(".countries-container");
let numberRange             = document.querySelector("#rangeValue");
let countries               = [];
let sortMethod              = "maxToMin";

//------------
// FONCTIONS
//------------

// Fonction de fetch des countries
async function fetchCountries() {
    await fetch("https://restcountries.com/v3.1/all")
        .then((res)     => res.json())
        .then((data)    => countries = data)
    console.log(countries);
    countriesDisplay();
}
fetchCountries();


// Fonction d'affichage des cartes
function countriesDisplay() {
    countriesContainer.innerHTML = countries
        .filter((country) => country.translations.fra.common.toLowerCase().includes(search.value.toLowerCase()))
        .sort((a, b) =>{
                if (sortMethod === "maxToMin") {
                    return b.population - a.population;
                }else if (sortMethod === "minToMax") {
                    return a.population - b.population;
                }else if (sortMethod === "alpha"){
                    return a.translations.fra.common.localeCompare(b.translations.fra.common);
                }
            }
        )
        .slice(0, range.value)
        .map((country) => 
        `<div class="card">
        <img src="${country.flags.png}">
        <h2>${country.translations.fra.common}</h2>
        <p>${country.capital}</p>
        <p>Nombre d'habitants : ${country.population.toLocaleString()}</p>
        </div>
        `)
        .join("")
}


//------------
// EVENEMENTS
//------------
search.addEventListener("input", ()=>{
   countriesDisplay();
})

range.addEventListener("input", ()=>{
    numberRange.textContent = range.value;
    countriesDisplay();
})

buttons.forEach(button => {
    button.addEventListener("click", (e)=>{
        sortMethod = e.target.id;
        countriesDisplay();
    })
});
