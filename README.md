# PotholeRadar

Offline-first mobile prototype for detecting, reviewing, and mapping road impacts.

PotholeRadar turns vehicle motion into a local detection history that can be demonstrated without a car, network connection, or cloud service. The prototype is designed for hackathon demos and provides a clear path toward a native Android sensor implementation.

## What it includes

- Live scan dashboard with G-force and speed readouts
- Start/stop scanning controls
- **Simulate Drive** mode with synthetic impact spikes and mock GPS coordinates
- Impact alerts with Minor, Moderate, and Severe severity levels
- Offline-style route map with tappable impact markers
- Local detection log with severity filters
- CSV export for locally captured detections
- Local persistence between sessions
- Device location support when available
- Custom dark product interface and app icon

## Demo flow

1. Open the app in the mobile preview or Expo Go.
2. Tap **Start scanning**.
3. Leave **Simulate Drive** enabled for a table-ready demo.
4. Watch the live G-force meter and speed update.
5. After simulated impacts appear, open **Map** to inspect pins.
6. Open **Log** to filter detections or export the local CSV.

The simulated route generates an impact event periodically so the main product story can be shown quickly.

## Tech stack

- Expo and React Native
- TypeScript
- Expo Router
- React Query provider from the workspace scaffold
- AsyncStorage for local event persistence
- Expo Location for device location when available
- React Native SVG for the offline-style map surface
- Expo Haptics for touch feedback

## Run in Replit

The project is part of the workspace monorepo. The configured mobile workflow starts the app with the environment needed by the Replit preview and Expo Go flow.

Useful commands:

```bash
pnpm --filter @workspace/pothole-radar run typecheck
pnpm --filter @workspace/pothole-radar run dev
```

For a physical-device demo, use the **Preview on your phone** flow and open the generated QR code in Expo Go.

## Project structure

```text
artifacts/pothole-radar/
├── app/
│   ├── _layout.tsx
│   └── (tabs)/
│       ├── index.tsx   # Live scan dashboard
│       ├── map.tsx     # Offline-style impact map
│       └── log.tsx     # Detection history and CSV export
├── context/
│   └── RadarContext.tsx  # Simulation, location, and local persistence
├── constants/
│   └── colors.ts
├── assets/images/
│   └── icon_2.png
└── README.md
```

## Current prototype boundary

The current build uses a local simulation loop for reliable demonstrations. It is not yet the final native Android implementation described in the original product brief.

The next native milestone is to add:

- Kotlin sensor fusion for linear acceleration and gyroscope data
- Android foreground service support
- Room persistence for `PotholeEventEntity`
- Physics-based pothole and speed-bump classification
- TensorFlow Lite classification alongside the heuristic fallback
- Background audio alerts and wake-lock handling

## License

This project is a prototype created for demonstration and development purposes.
