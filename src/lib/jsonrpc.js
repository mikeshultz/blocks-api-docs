import axios from 'axios';
import { JSONRPC_ROOT } from '../config'


/**
 * makeRequest creates a javascript object representing the JSON for 
 * a JSON-RPC request.
 * @param method {string} - The JSON-RPC method
 * @param params {array} - An array of JSON-RPC parameters
 * @returns {object} - An object to be sent in a JSON-RPC request body
 */
function makeRequest(method, params) {
  params = typeof params !== 'undefined' ? params : [];
  const id = new Date().getTime();
  return {
    "jsonrpc": "2.0",
    "method": method,
    "params": params,
    "id": id
  }
}

/**
 * getBlockNo returns the latest block number that Infura is aware of
 * @returns {number} - The latest block number
 */
export async function getBlockNo() {
  try {
    const resp = await axios.post(
      JSONRPC_ROOT,
      makeRequest('eth_blockNumber'),
      {
        headers: { 'Accept': 'application/json' }
      }
    );
    if (resp.status !== 200) {
      console.error("Error getting blockNumber", resp);
      return null;
    } else {
      return parseInt(resp.data.result);
    }
  } catch (err) {
    console.error("Error trying to get mainnet block number", err);
    return null;
  }
}

export default { makeRequest, getBlockNo }
