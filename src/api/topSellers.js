import api from "./api";
import { getApiErrorMessage } from "./newItems";

let cachedSellers = null;
let fetchPromise = null;

export const getTopSellers = async () => {
  if (cachedSellers) {
    return cachedSellers;
  }

  if (!fetchPromise) {
    fetchPromise = api
      .get("/topSellers")
      .then((response) => {
        const data = response.data;

        if (!Array.isArray(data)) {
          throw new Error("Invalid response format");
        }

        cachedSellers = data;
        return data;
      })
      .catch((error) => {
        fetchPromise = null;
        throw error;
      });
  }

  return fetchPromise;
};

export const getTopSellerByAuthorId = async (authorId) => {
  const sellers = await getTopSellers();
  return sellers.find((seller) => String(seller.authorId) === String(authorId));
};

export { getApiErrorMessage };
