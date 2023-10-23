import axiosApi from "./axios.util";

export const fetchData = async (page) => {
  try {
    const response = await axiosApi.get(`api/character/?page=${page}`);
    const totalPages = response.data.info.pages;
    const characters = response.data.results;

    return {
      totalPages,
      characters,
    };
  } catch (error) {
    return {
      totalPages: 0,
      characters: [],
    };
  }
};

export const fetchImage = (imageUrl) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageUrl;
    image.onload = () => resolve(image);
    image.onerror = (err) => reject(err);
  });
};
