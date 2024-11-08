import axios from "axios";
let baseUrl = "http://localhost:3001/";

export const getAllPost = async (logintype) => {
  try {
    return await axios.get(`${baseUrl}api/v1/get/post`, {
      headers: {
        logintype,
      },
    });
  } catch (error) {
    return error;
  }
};

export const cretePostController = async (post) => {
  try {
    return await axios.post(`${baseUrl}api/v1/create/post`, post, {
      headers: {
        logintype: post.author,
      },
    });
  } catch (error) {
    return error;
  }
};