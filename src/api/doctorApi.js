import axios from 'axios';

const url = 'https://medicity-server.herokuapp.com';

export async function showDoctor(values) {
  try {
    const response = await axios.post(`${url}/doctor/show`, values);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
}

export async function loginDoctor(values) {
  try {
    const response = await axios.post(`${url}/doctor/login`, values);
    const data = response.data;
    if (data.doctor) {
      localStorage.setItem('doctor', data.token);
      return { data: data };
    }
    if (data.errors) {
      const error = data.errors;
      return { error };
    }
  } catch (error) {
    console.log(error.message);
  }
}

// admin part
export async function createDoctor(doctor) {
  try {
    const response = await axios.post(`${url}/doctor/create`, doctor);
    const data = response.data;
    if (data.doctor) {
      return { data: data.doctor };
    }
    if (data.errors) {
      const error = data.errors.email;
      return { error };
    }
  } catch (error) {
    console.log(error);
  }
}

export async function destroyDoctor(doctor) {
  try {
    const response = await axios.post(`${url}/doctor/destroy`, doctor);
    const data = response.data;
    if (data.doctor) {
      return { data: data.doctor };
    }
    if (data.errors) {
      const error = data.errors;
      return { error };
    }
  } catch (error) {
    console.log(error.message);
  }
}
