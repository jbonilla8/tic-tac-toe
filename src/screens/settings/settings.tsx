import { ScrollView, TouchableOpacity, View, Switch } from "react-native";
import React, { ReactElement } from "react";
import { GradientBackground, Text } from "@components";
import styles from "./settings.styles";
import { colors } from "@utils";
import { difficulties, useSettings } from "@contexts/settings/settingsContext";

export default function Settings(): ReactElement | null {
  const { settings, saveSetting } = useSettings();

  if (!settings) return null;

  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.field}>
          <Text style={styles.label}>Bot Difficulty</Text>
          <View style={styles.choicesListContainer}>
            {Object.keys(difficulties).map((level) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    saveSetting(
                      "difficulty",
                      level as keyof typeof difficulties
                    )
                  }
                  style={[
                    styles.choice,
                    {
                      backgroundColor:
                        settings.difficulty === level
                          ? colors.pink
                          : colors.lightGreen,
                    },
                  ]}
                  key={level}
                >
                  <Text
                    style={[
                      styles.choiceText,
                      {
                        color:
                          settings.difficulty === level
                            ? colors.lightGreen
                            : colors.darkTeal,
                      },
                    ]}
                  >
                    {difficulties[level as keyof typeof difficulties]}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={[styles.field, styles.switchField]}>
            <Text style={styles.label}>Sounds</Text>
            <Switch
              trackColor={{ false: colors.teal, true: colors.pink }}
              thumbColor={colors.lightGreen}
              ios_backgroundColor={colors.darkTeal}
              onValueChange={() => saveSetting("sounds", !settings.sounds)}
              value={settings.sounds}
            />
          </View>
          <View style={[styles.field, styles.switchField]}>
            <Text style={styles.label}>Haptics/Vibrations</Text>
            <Switch
              trackColor={{ false: colors.teal, true: colors.pink }}
              thumbColor={colors.lightGreen}
              ios_backgroundColor={colors.darkTeal}
              onValueChange={() => saveSetting("haptics", !settings.haptics)}
              value={settings.haptics}
            />
          </View>
        </View>
      </ScrollView>
    </GradientBackground>
  );
}
