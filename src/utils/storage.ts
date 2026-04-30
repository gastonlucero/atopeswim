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

function csvToJson(csv: string): any[] {
  if (!csv || csv.trim() === '') return [];
  const lines = csv.split('\n');
  const headers = lines[0].split(',');
  const result: any[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values: string[] = [];
    let current = '';
    let inQuotes = false;
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char === '"' && line[j + 1] === '"') {
        current += '"';
        j++;
      } else if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current);

    const obj: any = {};
    headers.forEach((header, idx) => {
      let val = values[idx];
      if (!val) {
        obj[header] = header === 'participants' ? [] : '';
        return;
      }
      
      // Try to parse JSON objects/arrays
      if (val.startsWith('{') || val.startsWith('[')) {
        try {
          obj[header] = JSON.parse(val.replace(/\\n/g, '\n'));
        } catch {
          obj[header] = val;
        }
      } else if (!isNaN(Number(val)) && val !== '') {
        obj[header] = Number(val);
      } else {
        obj[header] = val;
      }
    });
    result.push(obj);
  }
  return result;
}

// --- SYNC HELPERS ---

async function saveToFile(type: 'salidas' | 'rutas', data: any[]) {
  try {
    const csv = jsonToCsv(data);
    await fetch(`/api/storage?type=${type}`, {
      method: 'POST',
      body: csv,
    });
  } catch (err) {
    console.error(`Error saving ${type} to file:`, err);
  }
}

export async function initStorage() {
  try {
    const sRes = await fetch('/api/storage?type=salidas');
    const sCsv = await sRes.text();
    if (sCsv) {
      const salidas = csvToJson(sCsv);
      localStorage.setItem(SALIDAS_KEY, JSON.stringify(salidas));
    }

    const rRes = await fetch('/api/storage?type=rutas');
    const rCsv = await rRes.text();
    if (rCsv) {
      const rutas = csvToJson(rCsv);
      localStorage.setItem(RUTAS_KEY, JSON.stringify(rutas));
    }
  } catch (err) {
    console.warn('Could not load storage from file, falling back to localStorage only', err);
  }
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
