import axios from "axios";

export const getPosts = async () => {
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
    return response.data;
  } catch (error) {
    console.error("Gagal mengambil data postingan:", error);
    return [];
  }
};
