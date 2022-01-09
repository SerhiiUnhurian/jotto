import axios from "axios";

// export const getSecretWord = async () => {
//   const response = await axios.get('http://localhost:3030');
//   return response.data;
// };

export const getSecretWord = async () => {
  const response = await axios.get("http://localhost:3030");
  return response.data;
};
