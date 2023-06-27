import axios from "axios";

export const api = axios.create({
  baseURL: 'http://localhost:3000' // todas as requisições disparadas via axios serão automaticamente enviadas para esse endereço.
})