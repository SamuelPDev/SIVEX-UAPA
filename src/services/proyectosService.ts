// src/services/proyectosService.ts
import axios from "axios";

const API_URL = "/api/proyectos";

export const getProyectos = () => axios.get(API_URL);

export interface ProyectoData {
  title: string;
  category: string;
  description: string;
}

export const createProyecto = (data: ProyectoData) =>
  axios.post(API_URL, data);

export const updateProyecto = (id: string, data: Partial<ProyectoData>) =>
  axios.put(`${API_URL}/${id}`, data);

export const deleteProyecto = (id: string) =>
  axios.delete(`${API_URL}/${id}`);
