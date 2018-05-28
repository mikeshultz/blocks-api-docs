import axios from 'axios';

const API_ROOT = "https://api.blocks.lol";


export async function getHealth() {
  try {
    const resp = await axios.get(`${API_ROOT}/health`);
    if (resp.status !== 200) {
      console.error("Error getting API health", resp);
      return null;
    } else {
      return resp.data;
    }
  } catch (err) {
    console.error("Error trying to get API health", err);
    return null;
  }
}


export async function docs() {
  try {
    const resp = await axios.get(`${API_ROOT}/`);
    if (resp.status !== 200) {
      console.error("Error getting API schema", resp);
      return null;
    } else {
      return resp.data.endpoints;
    }
  } catch (err) {
    console.error("Error trying to get API schema", err);
    return null;
  }
}