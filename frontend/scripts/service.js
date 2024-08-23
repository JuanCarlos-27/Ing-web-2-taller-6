const API_URL = import.meta.env.VITE_API_URL;

console.log(API_URL);

const saveReview = async (review) => {
  try {
    const response = await fetch(`${API_URL}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(review),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    alert('Ocurrió un error al guardar la reseña');
    return false;
  }
};

const getReviews = async () => {
  try {
    const response = await fetch(`${API_URL}/reviews`);
    const { data } = await response.json();

    return data;
  } catch (error) {
    alert('Ocurrió un error al obtener las reseñas');
    return false;
  }
};

const deleteReview = async (id) => {
  try {
    const response = await fetch(`${API_URL}/reviews/${id}`, {
      method: 'DELETE',
    });

    const data = await response.json();
    return data;
  } catch (error) {
    alert('Ocurrió un error al eliminar la reseña');
    return false;
  }
};

const updateReview = async ({ comment, id }) => {
  try {
    const response = await fetch(`${API_URL}/reviews`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comment, id }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    alert('Ocurrió un error al actualizar la reseña');
    return false;
  }
};

const getHostInfoById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/reviews/${id}`);
    const data = await response.json();

    return data;
  } catch (error) {
    alert('Ocurrió un error al obtener la información del host');
    return false;
  }
};

export { saveReview, getReviews, deleteReview, updateReview, getHostInfoById };
