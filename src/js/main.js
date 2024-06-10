import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SlimSelect from 'slim-select';

const breedSelect = document.getElementById('breed-select');
const loader = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');
const errorElement = document.querySelector('.error');

async function loadBreeds() {
  loader.classList.remove('hidden');
  breedSelect.classList.add('hidden');
  try {
    const breeds = await fetchBreeds();
    var options = breeds.map(({ id, name }) => ({ text: name, value: id }));
    new SlimSelect({
      select: '#breed-select',
      data: [
        {
          placeholder: true,
          text: 'Select breed',
        },
        ...options,
      ],
      events: {
        afterChange: handleChangeSelect,
      },
    });
    breedSelect.classList.remove('hidden');
  } catch (error) {
    showError(error.message);
  } finally {
    loader.classList.add('hidden');
  }
}

async function loadCatInfo(breedId) {
  loader.classList.remove('hidden');
  catInfo.classList.add('hidden');
  errorElement.classList.add('hidden');
  try {
    catInfo.classList.add('hidden');
    const [cat] = await fetchCatByBreed(breedId);
    displayCatInfo(cat);
  } catch (error) {
    showError(error.message);
  } finally {
    loader.classList.add('hidden');
  }
}

function displayCatInfo(cat) {
  try {
    var { url, breeds } = cat;
    var breed = breeds[0];
    catInfo.innerHTML = `
          <img src="${url}" alt="${breed.name}">
          <div class="cat-info-text">
              <h2>${breed.name}</h2>
              <p>${breed.description}</p>
              <p><strong>Temperament:</strong> ${breed.temperament}</p>
          </div>
      `;
    catInfo.classList.remove('hidden');
  } catch (error) {
    showError(
      'We cannot find information on this breed. Please check other breeds!'
    );
    console.log(error);
  }
}

function showError(message) {
  errorElement.textContent = message;
  errorElement.classList.remove('hidden');
  iziToast.error({ title: 'Error', message });
}

document.addEventListener('DOMContentLoaded', () => {
  loadBreeds();
});

const handleChangeSelect = event => {
  const breedId = event[0].value;
  if (breedId) {
    loadCatInfo(breedId);
  }
};
