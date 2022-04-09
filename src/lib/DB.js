let Db = {selected: "intitle"};

export const setVal = (key, val) => {
    Db[key] = val;
    console.log(`set value ${key} `, val, `\n\n Db `, Db);
    localStorage.setItem("Db", JSON.stringify(Db));
} 

export const getVal = (key) => Db[key]; 

export const restoreDb = () => {
    Db = JSON.parse(localStorage.Db);
}
//JSON.parse(localStorage.getItem("results"))
//localStorage.setItem("books", JSON.stringify(results));
//localStorage.setItem("selected", JSON.stringify(selected));