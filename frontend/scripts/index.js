import { deleteReview, getHostInfoById, getReviews, saveReview, updateReview } from './service.js';
import { naturalDate } from './utils.js';

const form = document.getElementById('rating-form');
let hostId = null;

document.addEventListener('DOMContentLoaded', async () => {
  hostId = localStorage.getItem('hostId');
  if (!hostId) {
    const uuid = crypto.randomUUID();
    localStorage.setItem('hostId', uuid);
    hostId = uuid;
  }

  const response = await getHostInfoById(hostId);

  if (response?.success && response.data.length > 0) {
    const [{ name, email }] = response.data;
    setFormForHost({ name, email });
  }

  renderAllreviews();
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const email = formData.get('email');
  const comment = formData.get('comment');
  const name = formData.get('name');

  const review = {
    email,
    comment,
    name,
    hostId,
  };

  const result = await saveReview(review);

  if (result?.success) {
    await renderAllreviews();
    showAlert('Reseña guardada correctamente');
    form.reset();
    setFormForHost({ name, email });
  } else {
    result?.error?.existsEmail && showAlert('Ya has dejado una reseña');
  }
});

const createDOMCard = (review) => {
  const card = document.createElement('article');
  card.classList.add('card');

  const { name, comment, id_visiting, created_at, id, email } = review;

  card.innerHTML = `
    <div class="card-body">
      <h5 class="card-title">${name}</h5>
    </div>
    <div class="card-footer text-body-secondary">
      ${naturalDate(created_at)}
    </div>
  `;

  const p = document.createElement('p');
  p.classList.add('card-text');
  p.textContent = comment;

  card.querySelector('.card-body').appendChild(p);

  if (id_visiting === hostId) {
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Eliminar';

    const updateButton = document.createElement('button');
    updateButton.classList.add('btn', 'btn-primary');
    updateButton.textContent = 'Editar';

    deleteButton.addEventListener('click', async () => {
      const response = await deleteReview(review.id);
      if (response?.success) {
        await renderAllreviews();
        showAlert('Reseña eliminada correctamente');
      }
    });
    updateButton.addEventListener('click', async () => {
      p.contentEditable = true;
      p.focus();

      if (updateButton.textContent === 'Guardar') {
        const response = await updateReview({ comment: p.textContent, id });
        if (response?.success) {
          showAlert('Reseña actualizada correctamente');
          await renderAllreviews();
          p.contentEditable = false;
        }
      }

      updateButton.textContent = 'Guardar';
    });

    card.querySelector('.card-body').appendChild(deleteButton);
    card.querySelector('.card-body').appendChild(updateButton);
  }

  return card;
};

const renderAllreviews = async () => {
  const reviews = await getReviews();
  const reviewsContainer = document.getElementById('reviews-container');
  reviewsContainer.innerHTML = '';

  for (const review of reviews) {
    const card = createDOMCard(review);
    reviewsContainer.appendChild(card);
  }
};

const setFormForHost = ({ name, email }) => {
  const inputNombre = document.querySelector('input[name="name"]');
  const inputEmail = document.querySelector('input[name="email"]');

  inputNombre.value = name;
  inputEmail.value = email;

  inputNombre.setAttribute('readonly', true);
  inputEmail.setAttribute('readonly', true);
};

const showAlert = (message) => {
  const alert = document.getElementById('success-message');
  alert.textContent = message;
  alert.classList.remove('d-none');

  setTimeout(() => {
    alert.classList.add('d-none');
  }, 5000);
};
