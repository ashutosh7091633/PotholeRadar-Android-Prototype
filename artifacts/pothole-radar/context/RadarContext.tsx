import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import React, { createContext, ReactNode, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Alert, Platform, Share } from 'react-native';

export type EventSeverity = 'Minor' | 'Moderate' | 'Severe';
export type EventType = 'Pothole' | 'Speed bump';

export type RadarEvent = {
  id: string;
  latitude: number;
  longitude: number;
  timestamp: string;
  peakGForce: number;
  severity: EventSeverity;
  eventType: EventType;
  speedKmh: number;
};

type RadarContextValue = {
  events: RadarEvent[];
  isTracking: boolean;
  isSimulating: boolean;
  liveGForce: number;
  currentSpeed: number;
  elapsedSeconds: number;
  lastEvent: RadarEvent | null;
  currentLocation: { latitude: number; longitude: number };
  toggleTracking: () => Promise<void>;
  toggleSimulation: () => Promise<void>;
  clearHistory: () => Promise<void>;
  exportCsv: () => Promise<void>;
};

const STORAGE_KEY = '@pothole-radar/events';
const route = [
  { latitude: 12.9716, longitude: 77.5946 },
  { latitude: 12.9742, longitude: 77.5985 },
  { latitude: 12.9771, longitude: 77.6008 },
  { latitude: 12.9792, longitude: 77.5962 },
  { latitude: 12.9761, longitude: 77.5904 },
  { latitude: 12.9724, longitude: 77.5881 },
  { latitude: 12.9689, longitude: 77.5902 },
  { latitude: 12.9675, longitude: 77.5953 },
];

const seedEvents: RadarEvent[] = [
  {
    id: 'seed-1',
    latitude: 12.9764,
    longitude: 77.5981,
    timestamp: '2026-09-08T11:24:00.000Z',
    peakGForce: 4.8,
    severity: 'Severe',
    eventType: 'Pothole',
    speedKmh: 34,
  },
  {
    id: 'seed-2',
    latitude: 12.9722,
    longitude: 77.5921,
    timestamp: '2026-09-08T11:19:00.000Z',
    peakGForce: 3.6,
    severity: 'Moderate',
    eventType: 'Pothole',
    speedKmh: 28,
  },
  {
    id: 'seed-3',
    latitude: 12.9695,
    longitude: 77.5994,
    timestamp: '2026-09-08T11:12:00.000Z',
    peakGForce: 2.5,
    severity: 'Minor',
    eventType: 'Speed bump',
    speedKmh: 22,
  },
];

const RadarContext = createContext<RadarContextValue | undefined>(undefined);

function makeEvent(index: number, tick: number): RadarEvent {
  const point = route[index % route.length];
  const peakGForce = Number((3 + ((tick * 13) % 20) / 10).toFixed(1));
  const severity: EventSeverity = peakGForce > 4.5 ? 'Severe' : peakGForce > 3 ? 'Moderate' : 'Minor';
  return {
    id: `${Date.now()}-${tick}`,
    ...point,
    timestamp: new Date().toISOString(),
    peakGForce,
    severity,
    eventType: tick % 3 === 0 ? 'Speed bump' : 'Pothole',
    speedKmh: 24 + (tick % 5) * 4,
  };
}

export function RadarProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<RadarEvent[]>(seedEvents);
  const [isTracking, setIsTracking] = useState(false);
  const [isSimulating, setIsSimulating] = useState(true);
  const [liveGForce, setLiveGForce] = useState(0.8);
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [lastEvent, setLastEvent] = useState<RadarEvent | null>(null);
  const [currentLocation, setCurrentLocation] = useState(route[0]);
  const tickRef = useRef(0);
  const routeIndexRef = useRef(0);
  const locationSubscriptionRef = useRef<Location.LocationSubscription | null>(null);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((stored) => {
      if (!stored) return;
      try {
        const parsed = JSON.parse(stored) as RadarEvent[];
        if (parsed.length > 0) setEvents(parsed);
      } catch {
        // Keep the built-in demo history when local data is malformed.
      }
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(events)).catch(() => undefined);
  }, [events]);

  useEffect(() => {
    if (!isTracking || !isSimulating) return;
    const interval = setInterval(() => {
      tickRef.current += 1;
      const tick = tickRef.current;
      const nextIndex = (routeIndexRef.current + 1) % route.length;
      routeIndexRef.current = nextIndex;
      const hit = tick % 7 === 0;
      setCurrentLocation(route[nextIndex]);
      setCurrentSpeed(28 + Math.round(Math.sin(tick / 3) * 8));
      setElapsedSeconds((value) => value + 1);
      setLiveGForce(Number((hit ? 3.1 + (tick % 16) / 10 : 0.65 + Math.abs(Math.sin(tick / 2.7)) * 0.65).toFixed(1)));
      if (hit) {
        const event = makeEvent(nextIndex, tick);
        setEvents((value) => [event, ...value]);
        setLastEvent(event);
        setTimeout(() => setLastEvent(null), 4600);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isSimulating, isTracking]);

  useEffect(() => {
    if (!isTracking || isSimulating || Platform.OS === 'web') return;
    let cancelled = false;
    Location.requestForegroundPermissionsAsync().then(async ({ status }) => {
      if (cancelled || status !== Location.PermissionStatus.GRANTED) return;
      locationSubscriptionRef.current = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.Balanced, timeInterval: 2000, distanceInterval: 5 },
        (position) => {
          setCurrentLocation(position.coords);
          setCurrentSpeed(Math.max(0, Math.round((position.coords.speed ?? 0) * 3.6)));
        },
      );
    });
    return () => {
      cancelled = true;
      locationSubscriptionRef.current?.remove();
      locationSubscriptionRef.current = null;
    };
  }, [isSimulating, isTracking]);

  const toggleTracking = async () => {
    if (isTracking) {
      setIsTracking(false);
      setCurrentSpeed(0);
      setLiveGForce(0.8);
      return;
    }
    setIsSimulating(true);
    setElapsedSeconds(0);
    tickRef.current = 0;
    await Promise.resolve();
    setIsTracking(true);
  };

  const toggleSimulation = async () => {
    if (!isTracking) {
      setElapsedSeconds(0);
      tickRef.current = 0;
      setIsTracking(true);
      setIsSimulating(true);
      return;
    }
    setIsSimulating((value) => !value);
    if (isSimulating) setCurrentSpeed(0);
    await Promise.resolve();
  };

  const clearHistory = async () => {
    setEvents([]);
    setLastEvent(null);
    await AsyncStorage.removeItem(STORAGE_KEY);
  };

  const exportCsv = async () => {
    const header = 'timestamp,latitude,longitude,peak_g_force,severity,event_type,speed_kmh';
    const rows = events.map((event) =>
      [event.timestamp, event.latitude, event.longitude, event.peakGForce, event.severity, event.eventType, event.speedKmh].join(','),
    );
    const message = [header, ...rows].join('\n');
    try {
      await Share.share({ message, title: 'PotholeRadar detections.csv' });
    } catch {
      Alert.alert('Export ready', 'CSV data was prepared but sharing is unavailable in this preview.');
    }
  };

  const value = useMemo(
    () => ({
      events,
      isTracking,
      isSimulating,
      liveGForce,
      currentSpeed,
      elapsedSeconds,
      lastEvent,
      currentLocation,
      toggleTracking,
      toggleSimulation,
      clearHistory,
      exportCsv,
    }),
    [currentLocation, currentSpeed, elapsedSeconds, events, isSimulating, isTracking, lastEvent],
  );

  return <RadarContext.Provider value={value}>{children}</RadarContext.Provider>;
}

export function useRadar() {
  const context = useContext(RadarContext);
  if (!context) throw new Error('useRadar must be used inside RadarProvider');
  return context;
}