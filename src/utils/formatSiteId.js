export const formatSiteId = (value) => {
  const formattedValue = value
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/\'/g, '')
    .replace(/\,/g, '-');

  console.log(formattedValue);

  return formattedValue;
};
