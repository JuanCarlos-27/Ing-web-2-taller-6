// Fecha natural con zona horaria de colombia

const naturalDate = (date) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const dateObj = new Date(date);
  const naturalDate = dateObj.toLocaleDateString('es-CO', options);

  return naturalDate;
};


export { naturalDate };