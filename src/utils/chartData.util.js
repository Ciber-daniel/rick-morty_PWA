export const calculateChartData = (characters) => {
  const types = {};
  const genders = {};
  const statuses = {};

  characters.forEach((character) => {
    const type = character.type.trim() || character.species.trim() || "Unknown";
    const gender = character.gender.trim() || "Unknown";
    const status = character.status.trim() || "Unknown";

    types[type] = (types[type] || 0) + 1;
    genders[gender] = (genders[gender] || 0) + 1;
    statuses[status] = (statuses[status] || 0) + 1;
  });

  return {
    types,
    genders,
    statuses,
  };
};
