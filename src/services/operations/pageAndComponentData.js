import { toast } from "react-hot-toast";
import { apiConnector } from "../ApiConnector";
import { catalogeData } from "../apis";

export const getCatalogaPageData = async (categoryId) => {
  const endpointURL = catalogeData.GET_CATALOGUE_DATA_API;
  try {
    const response = await apiConnector("POST", endpointURL, {
      categoryId: categoryId,
    });
    return response.data;
  } catch (error) {
    console.log("Error fetching catalog data:", error);
    if (error.response) {
      console.log("Error response:", error.response.data);
    }
    return null;
  }
};
