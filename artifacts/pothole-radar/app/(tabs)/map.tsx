import { Feather } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Line, Path, Rect } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RadarEvent, useRadar } from '@/context/RadarContext';
import { useColors } from '@/hooks/useColors';

const bounds = { minLat: 12.965, maxLat: 12.982, minLon: 77.575, maxLon: 77.605 };

function pointForCoords(latitude: number, longitude: number) {
  return {
    x: 22 + ((longitude - bounds.minLon) / (bounds.maxLon - bounds.minLon)) * 316,
    y: 24 + (1 - (latitude - bounds.minLat) / (bounds.maxLat - bounds.minLat)) * 284,
  };
}

function pointFor(event: RadarEvent) {
  return pointForCoords(event.latitude, event.longitude);
}

function toneFor(event: RadarEvent, colors: ReturnType<typeof useColors>) {
  return event.severity === 'Severe' ? colors.destructive : event.severity === 'Moderate' ? colors.accent : colors.primary;
}

function MapMarker({ event, selected, onPress }: { event: RadarEvent; selected: boolean; onPress: () => void }) {
  const colors = useColors();
  const point = pointFor(event);
  const tone = toneFor(event, colors);
  return (
    <Pressable
      testID={`map-marker-${event.id}`}
      onPress={onPress}
      style={[styles.marker, { left: point.x - 15, top: point.y - 15, backgroundColor: tone, borderColor: selected ? colors.foreground : colors.background, transform: [{ scale: selected ? 1.15 : 1 }] }]}
    >
      <Feather name={event.eventType === 'Pothole' ? 'alert-circle' : 'minus'} size={14} color={colors.primaryForeground} />
    </Pressable>
  );
}

export default function MapScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { events, currentLocation } = useRadar();
  const [selectedId, setSelectedId] = useState(events[0]?.id ?? '');
  const selected = events.find((event) => event.id === selectedId) ?? events[0];
  const currentPoint = pointForCoords(currentLocation.latitude, currentLocation.longitude);
  const routePath = 'M28 238 C78 214 68 175 122 163 S194 104 176 74 S252 42 334 62';
  const ticks = useMemo(() => Array.from({ length: 14 }, (_, index) => index), []);

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={{ paddingTop: insets.top + 18, paddingBottom: insets.bottom + 28 }} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={[styles.eyebrow, { color: colors.primary }]}>FIELD VIEW</Text>
            <Text style={[styles.title, { color: colors.foreground }]}>Impact map</Text>
          </View>
          <View style={[styles.offlineBadge, { backgroundColor: colors.secondary }]}>
            <Feather name="wifi-off" size={13} color={colors.mutedForeground} />
            <Text style={[styles.offlineText, { color: colors.mutedForeground }]}>OFFLINE</Text>
          </View>
        </View>

        <View style={[styles.mapCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.mapCanvas}>
            <Svg width="100%" height={340} viewBox="0 0 360 340">
              <Rect x="0" y="0" width="360" height="340" fill={colors.card} />
              {ticks.map((tick) => (
                <React.Fragment key={`grid-${tick}`}>
                  <Line x1={tick * 30 - 10} y1="0" x2={tick * 30 + 35} y2="340" stroke={colors.border} strokeWidth="1" opacity="0.45" />
                  <Line x1="0" y1={tick * 30 - 7} x2="360" y2={tick * 30 + 38} stroke={colors.border} strokeWidth="1" opacity="0.45" />
                </React.Fragment>
              ))}
              <Path d="M-15 276 C62 248 61 196 120 181 S178 119 168 88 S252 48 376 74" stroke={colors.secondary} strokeWidth="22" fill="none" opacity="0.9" />
              <Path d={routePath} stroke={colors.primary} strokeWidth="2.5" strokeDasharray="6 5" fill="none" opacity="0.9" />
              <Circle cx={currentPoint.x} cy={currentPoint.y} r="8" fill={colors.primary} opacity="0.22" />
              <Circle cx={currentPoint.x} cy={currentPoint.y} r="4" fill={colors.primary} />
            </Svg>
            {events.slice(0, 8).map((event) => (
              <MapMarker key={event.id} event={event} selected={event.id === selected?.id} onPress={() => setSelectedId(event.id)} />
            ))}
            <View style={[styles.mapLabel, { backgroundColor: `${colors.background}dd` }]}>
              <Text style={[styles.mapLabelText, { color: colors.mutedForeground }]}>BENGALURU · LIVE ROUTE</Text>
            </View>
          </View>
          <View style={styles.legend}>
            <LegendDot color={colors.destructive} label="Severe" />
            <LegendDot color={colors.accent} label="Moderate" />
            <LegendDot color={colors.primary} label="Minor" />
            <View style={{ flex: 1 }} />
            <Text style={[styles.countText, { color: colors.mutedForeground }]}>{events.length} pins</Text>
          </View>
        </View>

        {selected ? (
          <View style={[styles.detailCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.detailTop}>
              <View style={[styles.detailIcon, { backgroundColor: `${toneFor(selected, colors)}1f` }]}>
                <Feather name={selected.eventType === 'Pothole' ? 'radio' : 'minus'} size={18} color={toneFor(selected, colors)} />
              </View>
              <View style={{ flex: 1, marginLeft: 11 }}>
                <Text style={[styles.detailTitle, { color: colors.foreground }]}>{selected.eventType} detected</Text>
                <Text style={[styles.detailSubtitle, { color: colors.mutedForeground }]}>{selected.severity} · {selected.peakGForce.toFixed(1)}G peak</Text>
              </View>
              <Feather name="navigation" size={16} color={colors.mutedForeground} />
            </View>
            <View style={[styles.detailRule, { backgroundColor: colors.border }]} />
            <View style={styles.detailMetrics}>
              <Metric label="SPEED" value={`${selected.speedKmh} km/h`} colors={colors} />
              <Metric label="COORDINATES" value={`${selected.latitude.toFixed(4)}, ${selected.longitude.toFixed(4)}`} colors={colors} />
              <Metric label="STATUS" value="SAVED LOCAL" colors={colors} />
            </View>
          </View>
        ) : (
          <View style={[styles.empty, { borderColor: colors.border }]}>
            <Feather name="map-pin" size={22} color={colors.mutedForeground} />
            <Text style={[styles.emptyTitle, { color: colors.foreground }]}>No impacts mapped yet</Text>
            <Text style={[styles.emptyCopy, { color: colors.mutedForeground }]}>Start a simulated drive to drop the first pin.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  const colors = useColors();
  return <View style={styles.legendItem}><View style={[styles.legendDot, { backgroundColor: color }]} /><Text style={[styles.legendText, { color: colors.mutedForeground }]}>{label}</Text></View>;
}

function Metric({ label, value, colors }: { label: string; value: string; colors: ReturnType<typeof useColors> }) {
  return <View style={styles.metric}><Text style={[styles.metricLabel, { color: colors.mutedForeground }]}>{label}</Text><Text style={[styles.metricValue, { color: colors.foreground }]} numberOfLines={1}>{value}</Text></View>;
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: { paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 },
  eyebrow: { fontSize: 10, fontWeight: '700', letterSpacing: 1.5, marginBottom: 7 },
  title: { fontSize: 31, fontWeight: '700', letterSpacing: -0.8 },
  offlineBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 10, paddingVertical: 8, borderRadius: 10 },
  offlineText: { fontSize: 9, fontWeight: '700', letterSpacing: 0.8 },
  mapCard: { marginHorizontal: 20, borderRadius: 20, borderWidth: 1, overflow: 'hidden' },
  mapCanvas: { height: 340, position: 'relative', overflow: 'hidden' },
  marker: { width: 30, height: 30, borderRadius: 15, borderWidth: 2, position: 'absolute', alignItems: 'center', justifyContent: 'center' },
  mapLabel: { position: 'absolute', top: 14, left: 14, borderRadius: 7, paddingHorizontal: 8, paddingVertical: 6 },
  mapLabelText: { fontSize: 8, fontWeight: '700', letterSpacing: 1 },
  legend: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 13, gap: 11 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  legendDot: { width: 7, height: 7, borderRadius: 4 },
  legendText: { fontSize: 9, fontWeight: '600' },
  countText: { fontSize: 10, fontWeight: '600' },
  detailCard: { margin: 20, marginTop: 16, borderRadius: 18, borderWidth: 1, padding: 15 },
  detailTop: { flexDirection: 'row', alignItems: 'center' },
  detailIcon: { width: 38, height: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  detailTitle: { fontSize: 14, fontWeight: '700' },
  detailSubtitle: { fontSize: 11, marginTop: 4 },
  detailRule: { height: 1, marginVertical: 14 },
  detailMetrics: { flexDirection: 'row', gap: 12 },
  metric: { flex: 1 },
  metricLabel: { fontSize: 8, fontWeight: '700', letterSpacing: 0.7 },
  metricValue: { fontSize: 11, fontWeight: '600', marginTop: 5 },
  empty: { margin: 20, borderWidth: 1, borderStyle: 'dashed', borderRadius: 18, alignItems: 'center', padding: 26 },
  emptyTitle: { fontSize: 15, fontWeight: '700', marginTop: 12 },
  emptyCopy: { fontSize: 12, marginTop: 6, textAlign: 'center' },
});