import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { COLORS, TEMPLATES, isTemplateLocked } from '../utils/constants';

export default function TemplateSelector({ selected, onSelect, currentTier = 'free' }) {
  const keys = Object.keys(TEMPLATES);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {keys.map(key => {
        const template = TEMPLATES[key];
        const locked = isTemplateLocked(key, currentTier);
        const active = selected === key;

        return (
          <TouchableOpacity
            key={key}
            style={[
              styles.card,
              active && styles.cardActive,
              locked && styles.cardLocked,
            ]}
            onPress={() => {
              if (locked) {
                // Parent should show upgrade modal
                onSelect(key, true);
              } else {
                onSelect(key, false);
              }
            }}
            activeOpacity={0.7}
          >
            <Text style={styles.icon}>{template.icon}</Text>
            <Text style={[
              styles.name,
              active && styles.nameActive,
              locked && styles.nameLocked,
            ]}>
              {template.name}
            </Text>
            <Text style={[
              styles.desc,
              active && styles.descActive,
            ]}>
              {template.description}
            </Text>
            {locked && (
              <View style={styles.lockBadge}>
                <Text style={styles.lockText}>
                  {TEMPLATES[key].tier === 'pro' ? 'PRO' : 'ENT'}
                </Text>
              </View>
            )}
            {active && !locked && (
              <View style={styles.activeDot} />
            )}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    gap: 10,
  },
  card: {
    width: 140,
    padding: 14,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
    borderWidth: 1.5,
    borderColor: COLORS.borderLight,
    position: 'relative',
  },
  cardActive: {
    borderColor: COLORS.accent,
    backgroundColor: COLORS.accentLight,
  },
  cardLocked: {
    opacity: 0.65,
  },
  icon: {
    fontSize: 22,
    marginBottom: 8,
  },
  name: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  nameActive: {
    color: COLORS.accent,
  },
  nameLocked: {
    color: COLORS.textMuted,
  },
  desc: {
    fontSize: 11,
    color: COLORS.textMuted,
    lineHeight: 15,
  },
  descActive: {
    color: COLORS.accent,
  },
  lockBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: COLORS.surfaceRaised,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  lockText: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.textFaint,
    letterSpacing: 0.8,
  },
  activeDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.accent,
  },
});
