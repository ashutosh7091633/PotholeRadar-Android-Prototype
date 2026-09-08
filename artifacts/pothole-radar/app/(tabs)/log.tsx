import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useMemo, useState } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RadarEvent, useRadar } from '@/context/RadarContext';
import { useColors } from '@/hooks/useColors';

type Filter = 'All' | 'Severe' | 'Moderate';

function formatDate(timestamp: string) {
  return new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }).format(new Date(timestamp));
}

function toneFor(event: RadarEvent, colors: ReturnType<typeof useColors>) {
  return event.severity === 'Severe' ? colors.destructive : event.severity === 'Moderate' ? colors.accent : colors.primary;
}

export default function LogScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { events, exportCsv, clearHistory } = useRadar();
  const [filter, setFilter] = useState<Filter>('All');
  const filtered = useMemo(() => filter === 'All' ? events : events.filter((event) => event.severity === filter), [events, filter]);

  const handleClear = () => {
    Alert.alert('Clear local history?', 'This removes every saved detection from this device.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Clear history', style: 'destructive', onPress: clearHistory },
    ]);
  };

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: insets.top + 18, paddingBottom: insets.bottom + 30, paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <View style={styles.header}>
              <View>
                <Text style={[styles.eyebrow, { color: colors.primary }]}>LOCAL ARCHIVE</Text>
                <Text style={[styles.title, { color: colors.foreground }]}>Detection log</Text>
              </View>
              <Pressable testID="export-csv" onPress={exportCsv} style={({ pressed }) => [styles.exportButton, { borderColor: colors.border, opacity: pressed ? 0.7 : 1 }]}>
                <Feather name="upload" size={15} color={colors.primary} />
                <Text style={[styles.exportText, { color: colors.primary }]}>CSV</Text>
              </Pressable>
            </View>
            <View style={[styles.summary, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View>
                <Text style={[styles.summaryNumber, { color: colors.foreground }]}>{events.length}</Text>
                <Text style={[styles.summaryLabel, { color: colors.mutedForeground }]}>TOTAL IMPACTS</Text>
              </View>
              <View style={[styles.summaryDivider, { backgroundColor: colors.border }]} />
              <View>
                <Text style={[styles.summaryNumber, { color: colors.accent }]}>{events.filter((event) => event.severity === 'Moderate').length}</Text>
                <Text style={[styles.summaryLabel, { color: colors.mutedForeground }]}>MODERATE</Text>
              </View>
              <View style={[styles.summaryDivider, { backgroundColor: colors.border }]} />
              <View>
                <Text style={[styles.summaryNumber, { color: colors.destructive }]}>{events.filter((event) => event.severity === 'Severe').length}</Text>
                <Text style={[styles.summaryLabel, { color: colors.mutedForeground }]}>SEVERE</Text>
              </View>
            </View>
            <View style={styles.filterRow}>
              {(['All', 'Severe', 'Moderate'] as Filter[]).map((item) => (
                <Pressable testID={`filter-${item.toLowerCase()}`} key={item} onPress={() => { Haptics.selectionAsync(); setFilter(item); }} style={[styles.filter, { backgroundColor: filter === item ? colors.primary : colors.secondary }]}>
                  <Text style={[styles.filterText, { color: filter === item ? colors.primaryForeground : colors.mutedForeground }]}>{item}</Text>
                </Pressable>
              ))}
            </View>
            <View style={styles.listHeading}>
              <Text style={[styles.listTitle, { color: colors.foreground }]}>{filter === 'All' ? 'All detections' : `${filter} impacts`}</Text>
              <Text style={[styles.listCount, { color: colors.mutedForeground }]}>{filtered.length} records</Text>
            </View>
          </View>
        }
        renderItem={({ item }) => <LogRow event={item} />}
        ListEmptyComponent={
          <View style={[styles.empty, { borderColor: colors.border }]}>
            <Feather name="inbox" size={24} color={colors.mutedForeground} />
            <Text style={[styles.emptyTitle, { color: colors.foreground }]}>Nothing here yet</Text>
            <Text style={[styles.emptyCopy, { color: colors.mutedForeground }]}>Run a simulated drive and your local log will fill up.</Text>
          </View>
        }
        ListFooterComponent={
          events.length > 0 ? (
            <Pressable testID="clear-history" onPress={handleClear} style={({ pressed }) => [styles.clearButton, { opacity: pressed ? 0.65 : 1 }]}>
              <Feather name="trash-2" size={14} color={colors.destructive} />
              <Text style={[styles.clearText, { color: colors.destructive }]}>Clear local history</Text>
            </Pressable>
          ) : null
        }
      />
    </View>
  );
}

function LogRow({ event }: { event: RadarEvent }) {
  const colors = useColors();
  const tone = toneFor(event, colors);
  return (
    <View style={[styles.row, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={[styles.rowIcon, { backgroundColor: `${tone}1f` }]}>
        <Feather name={event.eventType === 'Pothole' ? 'radio' : 'minus'} size={17} color={tone} />
      </View>
      <View style={styles.rowCopy}>
        <View style={styles.rowTitleLine}>
          <Text style={[styles.rowTitle, { color: colors.foreground }]}>{event.eventType}</Text>
          <View style={[styles.severityChip, { backgroundColor: `${tone}1f` }]}><Text style={[styles.severityText, { color: tone }]}>{event.severity}</Text></View>
        </View>
        <Text style={[styles.rowMeta, { color: colors.mutedForeground }]}>{formatDate(event.timestamp)}  ·  {event.speedKmh} km/h</Text>
        <Text style={[styles.coords, { color: colors.mutedForeground }]}>{event.latitude.toFixed(5)}, {event.longitude.toFixed(5)}</Text>
      </View>
      <View style={styles.gForce}>
        <Text style={[styles.gValue, { color: tone }]}>{event.peakGForce.toFixed(1)}G</Text>
        <Text style={[styles.gLabel, { color: colors.mutedForeground }]}>PEAK</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 },
  eyebrow: { fontSize: 10, fontWeight: '700', letterSpacing: 1.5, marginBottom: 7 },
  title: { fontSize: 31, fontWeight: '700', letterSpacing: -0.8 },
  exportButton: { borderWidth: 1, borderRadius: 10, paddingHorizontal: 11, paddingVertical: 9, flexDirection: 'row', alignItems: 'center', gap: 6 },
  exportText: { fontSize: 10, fontWeight: '700', letterSpacing: 0.8 },
  summary: { borderWidth: 1, borderRadius: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingVertical: 17 },
  summaryNumber: { fontSize: 25, fontWeight: '700', textAlign: 'center' },
  summaryLabel: { fontSize: 8, fontWeight: '700', letterSpacing: 0.7, marginTop: 5, textAlign: 'center' },
  summaryDivider: { width: 1, height: 35 },
  filterRow: { flexDirection: 'row', gap: 8, marginTop: 18 },
  filter: { paddingHorizontal: 15, paddingVertical: 9, borderRadius: 20 },
  filterText: { fontSize: 11, fontWeight: '700' },
  listHeading: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 28, marginBottom: 11 },
  listTitle: { fontSize: 17, fontWeight: '700' },
  listCount: { fontSize: 10 },
  row: { borderRadius: 16, borderWidth: 1, padding: 13, flexDirection: 'row', alignItems: 'center', marginBottom: 9 },
  rowIcon: { width: 38, height: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  rowCopy: { flex: 1, marginLeft: 10 },
  rowTitleLine: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  rowTitle: { fontSize: 13, fontWeight: '700' },
  severityChip: { paddingHorizontal: 7, paddingVertical: 3, borderRadius: 5 },
  severityText: { fontSize: 8, fontWeight: '700' },
  rowMeta: { fontSize: 10, marginTop: 5 },
  coords: { fontSize: 9, marginTop: 4, letterSpacing: 0.1 },
  gForce: { alignItems: 'flex-end' },
  gValue: { fontSize: 16, fontWeight: '700' },
  gLabel: { fontSize: 8, fontWeight: '700', letterSpacing: 0.8, marginTop: 3 },
  clearButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 19 },
  clearText: { fontSize: 12, fontWeight: '700' },
  empty: { borderWidth: 1, borderStyle: 'dashed', borderRadius: 18, alignItems: 'center', padding: 28, marginTop: 12 },
  emptyTitle: { fontSize: 15, fontWeight: '700', marginTop: 12 },
  emptyCopy: { fontSize: 12, marginTop: 6, textAlign: 'center', lineHeight: 18 },
});