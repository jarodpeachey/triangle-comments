/* eslint-disable import/prefer-default-export */
export const formatDate = date => {
  const newDate = new Date(date);

  const formattedDate = `${
    newDate.getMonth() > 8 ?
      newDate.getMonth() + 1 :
      `0${newDate.getMonth() + 1}`
  }/${
    newDate.getDate() > 9 ? newDate.getDate() : `0${newDate.getDate()}`
  }/${newDate.getFullYear()}`;

  return formattedDate;
};

