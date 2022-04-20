import fetch, { RequestInfo, RequestInit } from 'node-fetch';

export default async function consultarREST(html: RequestInfo) {
    try {
      // 👇️ const response: Response
      const response = await fetch(html, {
        method: 'GET',
        headers: { Accept: 'application/json', },
      });
  
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
  
      const result = (await response.json());
      //console.log('result is: ', JSON.stringify(result, null, 4));
      return result;
    } catch (error) {
      if (error instanceof Error) {
        console.log('error message: ', error.message);
        return error.message;
      } else {
        console.log('unexpected error: ', error);
        return 'An unexpected error occurred';
      }
    }
  }