export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
}

export function formatDateTime(dateString: string): string {
  return `${formatDate(dateString)} ${formatTime(dateString)}`;
}

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function formatDistance(km: number): string {
  return `${km.toFixed(2)} km`;
}

export function isFutureDate(dateString: string): boolean {
  return new Date(dateString) > new Date();
}

export function getMinDateTimeLocal(): string {
  const now = new Date();
  now.setMinutes(now.getMinutes() + 1);
  return now.toISOString().slice(0, 16);
}
