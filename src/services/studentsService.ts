export interface StudentData {
  id: string;
  nombre: string;
  carrera: string;
  email: string;
  semestre: string;
  estado: boolean;
}

const STORAGE_KEY = "sivex_students";

// Leer todos los estudiantes
export const getStudents = (): Promise<{ data: StudentData[] }> => {
  const raw = localStorage.getItem(STORAGE_KEY);
  const list: StudentData[] = raw ? JSON.parse(raw) : [];
  return Promise.resolve({ data: list });
};

/**
 * Crear un estudiante nuevo.
 * Usa el `id` que venga en data; si está vacío, genera uno.
 */
export const createStudent = (
  data: StudentData
): Promise<StudentData> => {
  const raw = localStorage.getItem(STORAGE_KEY);
  const list: StudentData[] = raw ? JSON.parse(raw) : [];

  const newId = data.id?.trim() || Date.now().toString();
  const newItem: StudentData = { ...data, id: newId };

  list.unshift(newItem);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  return Promise.resolve(newItem);
};

/**
 * Actualizar un estudiante existente.
 * oldId es el id anterior; si data.id cambia, se renombra.
 */
export const updateStudent = (
  oldId: string,
  data: StudentData
): Promise<void> => {
  const raw = localStorage.getItem(STORAGE_KEY);
  const list: StudentData[] = raw ? JSON.parse(raw) : [];

  const updated = list.map((s) =>
    s.id === oldId
      ? { ...data, id: data.id?.trim() || oldId }
      : s
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return Promise.resolve();
};

// Eliminar un estudiante
export const deleteStudent = (id: string): Promise<void> => {
  const raw = localStorage.getItem(STORAGE_KEY);
  const list: StudentData[] = raw ? JSON.parse(raw) : [];
  const filtered = list.filter((s) => s.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return Promise.resolve();
};