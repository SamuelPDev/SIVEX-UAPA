// src/services/proyectosService.ts

export interface ProyectoData {
  id: string;
  title: string;
  category: string;
  description: string;
}

const STORAGE_KEY = "sivex_proyectos";

// Leer proyectos desde LocalStorage
export const getProyectos = (): Promise<{ data: ProyectoData[] }> => {
  const raw = localStorage.getItem(STORAGE_KEY);
  const list: ProyectoData[] = raw ? JSON.parse(raw) : [];
  return Promise.resolve({ data: list });
};

// Crear un nuevo proyecto
export const createProyecto = (
  data: Omit<ProyectoData, "id">
): Promise<ProyectoData> => {
  const raw = localStorage.getItem(STORAGE_KEY);
  const list: ProyectoData[] = raw ? JSON.parse(raw) : [];
  const newItem: ProyectoData = {
    id: Date.now().toString(),
    ...data,
  };
  list.unshift(newItem);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  return Promise.resolve(newItem);
};

// Actualizar un proyecto existente
export const updateProyecto = (
  id: string,
  data: Omit<ProyectoData, "id">
): Promise<void> => {
  const raw = localStorage.getItem(STORAGE_KEY);
  const list: ProyectoData[] = raw ? JSON.parse(raw) : [];
  const updated = list.map((p) =>
    p.id === id ? { ...p, ...data } : p
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return Promise.resolve();
};

// Eliminar un proyecto
export const deleteProyecto = (id: string): Promise<void> => {
  const raw = localStorage.getItem(STORAGE_KEY);
  const list: ProyectoData[] = raw ? JSON.parse(raw) : [];
  const filtered = list.filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return Promise.resolve();
};
