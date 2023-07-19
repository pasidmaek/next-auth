import axios from "axios";

// export const useApiGetWithBearer = async (url, session) => {
//   try {
//     const response = await fetch(url, {
//       headers: {
//         Authorization: `Bearer ${session.token}`,
//       },
//     });
//   } catch (error) {
//     console.error("Error fetching user data:", error);
//     throw error;
//   }
// };

export const getApiWithAxios = async (url: string, token: any) => {
  const instance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  try {
    const response = await instance.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
