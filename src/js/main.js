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
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
    new SlimSelect({ select: '#breed-select' });
    breedSelect.classList.remove('hidden');

    if (breeds.length > 0) {
      loadCatInfo(breeds[0].id);
    }
  } catch (error) {
    showError(error.message);
  } finally {
    loader.classList.add('hidden');
  }
}

async function loadCatInfo(breedId) {
  loader.classList.remove('hidden');
  catInfo.classList.add('hidden');
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
  const { url, breeds } = cat;
  const breed = breeds[0];
  catInfo.innerHTML = `
          <img src="${url}" alt="${breed.name}">
          <div class="cat-info-text">
              <h2>${breed.name}</h2>
              <p>${breed.description}</p>
              <p><strong>Temperament:</strong> ${breed.temperament}</p>
          </div>
      `;
  catInfo.classList.remove('hidden');
}

function showError(message) {
  errorElement.textContent = message;
  errorElement.classList.remove('hidden');
  iziToast.error({ title: 'Error', message });
}

document.addEventListener('DOMContentLoaded', () => {
  loadBreeds();
});

breedSelect.addEventListener('change', event => {
  const breedId = event.target.value;
  console.log(event);
  if (breedId) {
    loadCatInfo(breedId);
  }
});
