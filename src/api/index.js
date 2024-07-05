import axios from 'axios'

const api = axios.create({
    baseURL: 'https://crud-e81t.onrender.com', // Remplacez par l'URL de votre backend
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  export default api;

  

