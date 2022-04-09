export const createRadioButton = (value, label) => {
    const element = document.createElement("div");
    element.innerHTML = String.raw`
        <input  class="radio-search" type="radio" name="search-choice" value="intitle"><label for="r1">By Title</label>
    `
    return element.firstChild;
}


