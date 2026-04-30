import type { Salida, Ruta } from '../types';

const SALIDAS_KEY = 'oceanswim_salidas';
const RUTAS_KEY = 'oceanswim_rutas';

// --- CSV HELPERS ---

function jsonToCsv(data: any[]): string {
  if (data.length === 0) return '';
  const headers = Object.keys(data[0]);
  const rows = data.map(obj => {
    return headers.map(header => {
      let val = obj[header];
      if (val === null || val === undefined) return '""';
      if (typeof val === 'object') {
        // Stringify and escape for CSV, but ensure no real newlines in the field
        return `"${JSON.stringify(val).replace(/"/g, '""').replace(/\n/g, '\\n')}"`;
      }
      return `"${String(val).replace(/"/g, '""').replace(/\n/g, '\\n')}"`;
    }).join(',');
  });
  return [headers.join(','), ...rows].join('\n');
}

// --- SYNC HELPERS ---

async function saveToFile(type: 'salidas' | 'rutas', data: any[]) {
  // File saving only works in development with Vite backend
  // In production (GitHub Pages), data is only persisted via localStorage
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
    return; // Skip in production
  }

  try {
    const csv = jsonToCsv(data);
    await fetch(`/api/storage?type=${type}`, {
      method: 'POST',
      body: csv,
    });
  } catch (err) {
    console.warn(`Could not save ${type} to file (development feature only):`, err);
  }
}

export async function initStorage() {
  // Storage is purely localStorage-based in production
  // The /api/storage endpoints only work in development with Vite
  console.log('Storage initialized (localStorage only)');
}

// --- PUBLIC API ---

export function getSalidas(): Salida[] {
  try {
    const data = localStorage.getItem(SALIDAS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function setSalidas(salidas: Salida[]): void {
  localStorage.setItem(SALIDAS_KEY, JSON.stringify(salidas));
  saveToFile('salidas', salidas);
}

export function addSalida(salida: Salida): void {
  const salidas = getSalidas();
  salidas.push(salida);
  setSalidas(salidas);
}

export function updateSalida(id: string, updatedSalida: Salida): void {
  const salidas = getSalidas();
  const index = salidas.findIndex((s) => s.id === id);
  if (index !== -1) {
    salidas[index] = updatedSalida;
    setSalidas(salidas);
  }
}

export function deleteSalida(id: string): void {
  const salidas = getSalidas();
  setSalidas(salidas.filter((s) => s.id !== id));
}

export function getSalidaById(id: string): Salida | undefined {
  return getSalidas().find((s) => s.id === id);
}

export function getRutas(): Ruta[] {
  try {
    const data = localStorage.getItem(RUTAS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function setRutas(rutas: Ruta[]): void {
  localStorage.setItem(RUTAS_KEY, JSON.stringify(rutas));
  saveToFile('rutas', rutas);
}

export function addRuta(ruta: Ruta): void {
  const rutas = getRutas();
  rutas.push(ruta);
  setRutas(rutas);
}

export function updateRuta(id: string, updatedRuta: Ruta): void {
  const rutas = getRutas();
  const index = rutas.findIndex((r) => r.id === id);
  if (index !== -1) {
    rutas[index] = updatedRuta;
    setRutas(rutas);
  }
}

export function deleteRuta(id: string): void {
  const rutas = getRutas();
  setRutas(rutas.filter((r) => r.id !== id));
}

export function getRutaById(id: string): Ruta | undefined {
  return getRutas().find((r) => r.id === id);
}
