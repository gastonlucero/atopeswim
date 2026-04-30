import { useState, useEffect } from 'react';
import { formatDuration } from '../../utils/formatting';
import RouteNamer from './RouteNamer';

interface TrackingRecorderProps {
  elapsedSeconds: number;
  setElapsedSeconds: (seconds: number) => void;
}

type TrackingStatus = 'idle' | 'recording' | 'finished';

export default function TrackingRecorder({ elapsedSeconds, setElapsedSeconds }: TrackingRecorderProps) {
  const [status, setStatus] = useState<TrackingStatus>('idle');
  const [timerInterval, setTimerInterval] = useState<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (status === 'recording') {
      const interval = setInterval(() => {
        setElapsedSeconds(elapsedSeconds + 1);
      }, 1000);
      setTimerInterval(interval);
      return () => clearInterval(interval);
    } else if (timerInterval) {
      clearInterval(timerInterval);
    }
  }, [status, elapsedSeconds, setElapsedSeconds]);

  const handleStart = () => {
    setElapsedSeconds(0);
    setStatus('recording');
  };

  const handleStop = () => {
    setStatus('finished');
  };

  const handleReset = () => {
    setElapsedSeconds(0);
    setStatus('idle');
  };

  if (status === 'idle') {
    return (
      <div className="text-center py-8">
        <div className="text-5xl font-bold text-blue-600 mb-4">{formatDuration(elapsedSeconds)}</div>
        <button onClick={handleStart} className="btn-primary w-full">
          Iniciar Tracking
        </button>
      </div>
    );
  }

  if (status === 'recording') {
    return (
      <div className="text-center py-8">
        <div className="text-6xl font-bold text-blue-600 mb-4 animate-pulse">{formatDuration(elapsedSeconds)}</div>
        <p className="text-gray-600 mb-6">Nada en progreso...</p>
        <button onClick={handleStop} className="btn-danger w-full">
          Detener
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-blue-50 p-4 rounded-lg mb-4 text-center">
        <p className="text-sm text-gray-600">Tiempo registrado</p>
        <div className="text-4xl font-bold text-blue-600">{formatDuration(elapsedSeconds)}</div>
      </div>
      <RouteNamer elapsedSeconds={elapsedSeconds} onReset={handleReset} />
    </div>
  );
}
