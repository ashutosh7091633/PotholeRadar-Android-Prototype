import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { RadarEvent, useRadar } from '@/context/RadarContext';

const severityColor = (severity: RadarEvent['severity'], colors: ReturnType<typeof useColors>) =>
  severity === 'Severe' ? colors.destructive : severity === 'Moderate' ? colors.accent : colors.primary;

function formatTime(timestamp: string) {
  return new Intl.DateTimeFormat('en-IN', { hour: '2-digit', minute: '2-digit' }).format(new Date(timestamp));
}

function Stat({ value, label, icon }: { value: string; label: string; icon: keyof typeof Feather.glyphMap }) {
  const colors = useColors();
  return (
    <View style={[styles.stat, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <Feather name={icon} size={16} color={colors.mutedForeground} />
      <Text style={[styles.statValue, { color: colors.foreground }]}>{value}</Text>
      <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>{label}</Text>
    </View>
  );
}

function DetectionRow({ event }: { event: RadarEvent }) {
  const colors = useColors();
  const tone = severityColor(event.severity, colors);
  return (
    <View style={[styles.detectionRow, { borderBottomColor: colors.border }]}>
      <View style={[styles.eventIcon, { backgroundColor: `${tone}1f` }]}>
        <Feather name={event.eventType === 'Pothole' ? 'radio' : 'minus'} size={16} color={tone} />
      </View>
      <View style={styles.eventCopy}>
        <Text style={[styles.eventTitle, { color: colors.foreground }]}>{event.eventType}</Text>
        <Text style={[styles.eventMeta, { color: colors.mutedForeground }]}>
          {formatTime(event.timestamp)}  ·  {event.speedKmh} km/h
        </Text>
      </View>
      <View style={styles.eventReading}>
        <Text style={[styles.eventG, { color: tone }]}>{event.peakGForce.toFixed(1)}G</Text>
        <Text style={[styles.eventMeta, { color: colors.mutedForeground }]}>{event.severity}</Text>
      </View>
    </View>
  );
}

export default function DashboardScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { events, isTracking, isSimulating, liveGForce, currentSpeed, elapsedSeconds, lastEvent, toggleTracking, toggleSimulation } = useRadar();
  const meterWidth = `${Math.min(100, Math.max(8, liveGForce / 5.5 * 100))}%` as `${number}%`;

  const handleTracking = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await toggleTracking();
  };

  const handleSimulation = async () => {
    await Haptics.selectionAsync();
    await toggleSimulation();
  };

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 28 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topline}>
          <View>
            <Text style={[styles.wordmark, { color: colors.primary }]}>POTHOLERADAR</Text>
            <View style={styles.readyLine}>
              <View style={[styles.readyDot, { backgroundColor: colors.primary }]} />
              <Text style={[styles.readyText, { color: colors.mutedForeground }]}>OFFLINE READY</Text>
            </View>
          </View>
          <View style={[styles.statusPill, { backgroundColor: isTracking ? `${colors.primary}20` : colors.secondary }]}>
            <View style={[styles.statusDot, { backgroundColor: isTracking ? colors.primary : colors.mutedForeground }]} />
            <Text style={[styles.statusText, { color: isTracking ? colors.primary : colors.mutedForeground }]}>
              {isTracking ? 'SCANNING' : 'PAUSED'}
            </Text>
          </View>
        </View>

        <View style={styles.hero}>
          <Text style={[styles.eyebrow, { color: colors.mutedForeground }]}>ROAD IMPACT MONITOR</Text>
          <Text style={[styles.heroTitle, { color: colors.foreground }]}>Scan the road.{'\n'}Know the impact.</Text>
          <Text style={[styles.heroCopy, { color: colors.mutedForeground }]}>
            Your phone is listening for sharp vertical impulses that feel like a pothole.
          </Text>
        </View>

        <View style={[styles.meterCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={[styles.cardLabel, { color: colors.mutedForeground }]}>LIVE G-FORCE</Text>
              <View style={styles.readingLine}>
                <Text style={[styles.bigReading, { color: colors.foreground }]}>{liveGForce.toFixed(1)}</Text>
                <Text style={[styles.unit, { color: colors.primary }]}>G</Text>
              </View>
            </View>
            <View style={[styles.speedBadge, { backgroundColor: colors.secondary }]}>
              <Feather name="navigation" size={14} color={colors.primary} />
              <Text style={[styles.speedValue, { color: colors.foreground }]}>{currentSpeed}</Text>
              <Text style={[styles.speedUnit, { color: colors.mutedForeground }]}>km/h</Text>
            </View>
          </View>
          <View style={[styles.meterTrack, { backgroundColor: colors.secondary }]}>
            <View style={[styles.meterFill, { width: meterWidth, backgroundColor: liveGForce > 3 ? colors.accent : colors.primary }]} />
          </View>
          <View style={styles.meterLabels}>
            <Text style={[styles.meterLabel, { color: colors.mutedForeground }]}>SMOOTH</Text>
            <Text style={[styles.meterLabel, { color: colors.mutedForeground }]}>IMPACT THRESHOLD</Text>
            <Text style={[styles.meterLabel, { color: colors.mutedForeground }]}>5.5G</Text>
          </View>
        </View>

        <Pressable
          testID="start-scan"
          onPress={handleTracking}
          style={({ pressed }) => [
            styles.primaryButton,
            { backgroundColor: isTracking ? colors.secondary : colors.primary, opacity: pressed ? 0.82 : 1 },
          ]}
        >
          <Feather name={isTracking ? 'square' : 'play'} size={18} color={isTracking ? colors.foreground : colors.primaryForeground} />
          <Text style={[styles.primaryButtonText, { color: isTracking ? colors.foreground : colors.primaryForeground }]}>
            {isTracking ? 'Stop scanning' : 'Start scanning'}
          </Text>
          <Text style={[styles.buttonHint, { color: isTracking ? colors.mutedForeground : `${colors.primaryForeground}99` }]}>
            {isTracking ? `${Math.floor(elapsedSeconds / 60).toString().padStart(2, '0')}:${(elapsedSeconds % 60).toString().padStart(2, '0')}` : 'Tap to begin'}
          </Text>
        </Pressable>

        <Pressable testID="simulate-drive" onPress={handleSimulation} style={styles.simulationRow}>
          <View style={[styles.simulationIcon, { backgroundColor: `${colors.accent}1f` }]}>
            <Feather name="zap" size={17} color={colors.accent} />
          </View>
          <View style={styles.simulationCopy}>
            <Text style={[styles.simulationTitle, { color: colors.foreground }]}>Simulate Drive</Text>
            <Text style={[styles.simulationSubtitle, { color: colors.mutedForeground }]}>
              {isSimulating ? 'Synthetic route + impact spikes' : 'Live phone sensors'}
            </Text>
          </View>
          <View style={[styles.toggle, { backgroundColor: isSimulating ? colors.primary : colors.secondary }]}>
            <View style={[styles.toggleKnob, { backgroundColor: isSimulating ? colors.primaryForeground : colors.mutedForeground, transform: [{ translateX: isSimulating ? 17 : 2 }] }]} />
          </View>
        </Pressable>

        {lastEvent ? (
          <View style={[styles.alertCard, { backgroundColor: `${severityColor(lastEvent.severity, colors)}18`, borderColor: severityColor(lastEvent.severity, colors) }]}>
            <View style={[styles.alertIcon, { backgroundColor: severityColor(lastEvent.severity, colors) }]}>
              <Feather name="alert-triangle" size={17} color={colors.primaryForeground} />
            </View>
            <View style={styles.alertCopy}>
              <Text style={[styles.alertTitle, { color: colors.foreground }]}>{lastEvent.severity} impact detected</Text>
              <Text style={[styles.alertSubtitle, { color: colors.mutedForeground }]}>
                {lastEvent.peakGForce.toFixed(1)}G spike  ·  {lastEvent.speedKmh} km/h  ·  saved locally
              </Text>
            </View>
            <Feather name="chevron-right" size={18} color={colors.mutedForeground} />
          </View>
        ) : null}

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Today’s scan</Text>
          <Text style={[styles.sectionCaption, { color: colors.mutedForeground }]}>LOCAL DATA</Text>
        </View>
        <View style={styles.statsRow}>
          <Stat value={events.length.toString()} label="DETECTIONS" icon="activity" />
          <Stat value="38.4" label="KM TRACKED" icon="map-pin" />
          <Stat value="92%" label="CONFIDENCE" icon="check-circle" />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Latest detections</Text>
          <Text style={[styles.sectionCaption, { color: colors.primary }]}>VIEW LOG</Text>
        </View>
        <View style={[styles.listCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {events.slice(0, 3).map((event) => <DetectionRow key={event.id} event={event} />)}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingHorizontal: 20 },
  topline: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  wordmark: { fontSize: 14, fontWeight: '700', letterSpacing: 2.2 },
  readyLine: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6 },
  readyDot: { width: 5, height: 5, borderRadius: 3 },
  readyText: { fontSize: 10, fontWeight: '600', letterSpacing: 1.2 },
  statusPill: { flexDirection: 'row', alignItems: 'center', gap: 7, borderRadius: 20, paddingHorizontal: 11, paddingVertical: 8 },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusText: { fontSize: 10, fontWeight: '700', letterSpacing: 1 },
  hero: { marginTop: 44, marginBottom: 24 },
  eyebrow: { fontSize: 11, fontWeight: '700', letterSpacing: 1.6, marginBottom: 10 },
  heroTitle: { fontSize: 35, lineHeight: 40, fontWeight: '700', letterSpacing: -1 },
  heroCopy: { fontSize: 14, lineHeight: 21, marginTop: 13, maxWidth: 310 },
  meterCard: { borderWidth: 1, borderRadius: 22, padding: 18 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  cardLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 1.5 },
  readingLine: { flexDirection: 'row', alignItems: 'baseline', marginTop: 4 },
  bigReading: { fontSize: 50, lineHeight: 56, fontWeight: '700', letterSpacing: -2 },
  unit: { fontSize: 18, fontWeight: '700', marginLeft: 5 },
  speedBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, borderRadius: 12, paddingHorizontal: 10, paddingVertical: 9 },
  speedValue: { fontSize: 15, fontWeight: '700' },
  speedUnit: { fontSize: 10 },
  meterTrack: { height: 8, borderRadius: 4, overflow: 'hidden', marginTop: 18 },
  meterFill: { height: '100%', borderRadius: 4 },
  meterLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  meterLabel: { fontSize: 9, fontWeight: '600', letterSpacing: 0.4 },
  primaryButton: { minHeight: 57, borderRadius: 17, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 18, marginTop: 13 },
  primaryButtonText: { fontSize: 16, fontWeight: '700', marginLeft: 10 },
  buttonHint: { marginLeft: 'auto', fontSize: 12, fontWeight: '600' },
  simulationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 18, paddingVertical: 5 },
  simulationIcon: { width: 35, height: 35, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  simulationCopy: { marginLeft: 11, flex: 1 },
  simulationTitle: { fontSize: 14, fontWeight: '700' },
  simulationSubtitle: { fontSize: 11, marginTop: 3 },
  toggle: { width: 39, height: 23, borderRadius: 13, justifyContent: 'center' },
  toggleKnob: { width: 19, height: 19, borderRadius: 10 },
  alertCard: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 16, padding: 12, marginTop: 18 },
  alertIcon: { width: 34, height: 34, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  alertCopy: { flex: 1, marginLeft: 10 },
  alertTitle: { fontSize: 13, fontWeight: '700' },
  alertSubtitle: { fontSize: 10, marginTop: 4 },
  sectionHeader: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 29, marginBottom: 12 },
  sectionTitle: { fontSize: 17, fontWeight: '700' },
  sectionCaption: { fontSize: 9, fontWeight: '700', letterSpacing: 1.2 },
  statsRow: { flexDirection: 'row', gap: 8 },
  stat: { flex: 1, borderWidth: 1, borderRadius: 15, padding: 12, minHeight: 94 },
  statValue: { fontSize: 22, fontWeight: '700', marginTop: 10 },
  statLabel: { fontSize: 8, fontWeight: '700', letterSpacing: 0.8, marginTop: 4 },
  listCard: { borderWidth: 1, borderRadius: 18, paddingHorizontal: 14 },
  detectionRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1 },
  eventIcon: { width: 34, height: 34, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  eventCopy: { flex: 1, marginLeft: 10 },
  eventTitle: { fontSize: 13, fontWeight: '700' },
  eventMeta: { fontSize: 10, marginTop: 4 },
  eventReading: { alignItems: 'flex-end' },
  eventG: { fontSize: 14, fontWeight: '700' },
});