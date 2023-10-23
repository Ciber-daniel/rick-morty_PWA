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

