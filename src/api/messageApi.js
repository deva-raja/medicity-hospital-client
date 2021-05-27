import axios from 'axios';

const url = 'http://localhost:5000';

export async function getMessage() {
  try {
    const response = await axios.get(`${url}/message/show`);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
}

export async function sendMessage(message) {
  try {
    const response = await axios.post(`${url}/message/create`, message);
    const data = response.data;
    if (data.message) {
      return { data: response.data.message };
    }
    if (data.errors) {
      const error = response.data.errors.errorMsg;
      return { error };
    }
  } catch (error) {
    console.log(error);
  }
}

export async function destroyMessage(id) {
  try {
    const response = await axios.get(`${url}/message/destroy`, { id });
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
}