import api from "./api";

let cachedItems = null;
let fetchPromise = null;

export const getNewItems = async () => {
  if (cachedItems) {
    return cachedItems;
  }

  if (!fetchPromise) {
    fetchPromise = api
      .get("/newItems")
      .then((response) => {
        const data = response.data;

        if (!Array.isArray(data)) {
          throw new Error("Invalid response format");
        }

        cachedItems = data;
        return data;
      })
      .catch((error) => {
        fetchPromise = null;
        throw error;
      });
  }

  return fetchPromise;
};

export const getNewItemById = async (id) => {
  const items = await getNewItems();
  return items.find((item) => String(item.id) === String(id));
};

export const getItemsByAuthorId = async (authorId) => {
  const items = await getNewItems();
  return items.filter((item) => String(item.authorId) === String(authorId));
};

export const getApiErrorMessage = (error) => {
  if (!error.response) {
    return "Unable to connect. Please check your network and try again.";
  }

  if (error.response.status === 404) {
    return "The requested resource was not found.";
  }

  if (error.response.status >= 500) {
    return "Server error. Please try again later.";
  }

  return "Something went wrong. Please try again.";
};
