
console.log('%c HI', 'color: firebrick');

document.addEventListener("DOMContentLoaded", () => {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
  
    const addImage = () =>
      fetch(imgUrl)
        .then((res) => res.json())
        .then(({ message: dogImgs }) => {
          const container = document.querySelector("#dog-image-container");
          const imgElements = dogImgs.map((imageUrl) => {
            const img = document.createElement("img");
            img.src = imageUrl;
            return img;
          });
          container.append(...imgElements);
        });
  
    const addList = () => {
      const breedDropdown = document.querySelector("#breed-dropdown");
  
      fetch(breedUrl)
        .then((res) => res.json())
        .then(({ message: dogBreed }) => {
          const breeds = Object.keys(dogBreed);
          const dogBreedsList = document.getElementById("dog-breeds");
          breeds.forEach((breed) => {
            const listItem = document.createElement("li");
            listItem.textContent = breed;
            dogBreedsList.appendChild(listItem);
            listItem.addEventListener("click", () => {
              listItem.style.color = "red";
            });
          });
        });
  
      const dogBreedsList = document.getElementById("dog-breeds");
  
      breedDropdown.addEventListener("change", () => {
        const selectedValue = breedDropdown.value;
  
        fetch(breedUrl)
          .then((response) => response.json())
          .then(({ message: dogObject }) => {
            const dogArray = Object.keys(dogObject);
            const filteredStrings = dogArray.filter((str) =>
              str.startsWith(selectedValue)
            );

            dogBreedsList.innerHTML = "";
  
            // Add filtered strings to the list
            filteredStrings.forEach((breed) => {
              const listItem = document.createElement("li");
              listItem.textContent = breed;
              dogBreedsList.appendChild(listItem);
              listItem.addEventListener("click", () => {
                listItem.style.color = "red";
              });
            });
          });
      });
  
      const options = breedDropdown.options;
      for (const option of options) {
        const optionText = option.innerText;
      }
    };
  
    addImage();
    addList();
  });