import { useThemeColor } from '@/hooks/use-theme-color';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

export type ThemedButtonProps = TouchableOpacityProps & {
  title: string;
  lightColor?: string;
  darkColor?: string;
  accent?: boolean;
};

export function ThemedButton({
  title,
  style,
  lightColor,
  darkColor,
  accent = false,
  ...rest
}: ThemedButtonProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const textColor = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const accentColor = accent ? '#eda43fff' : textColor;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        accent ? styles.accentButton : styles.primaryButton,
        style,
      ]}
      {...rest}
    >
      <Text style={[styles.text, accent ? styles.accentText : styles.primaryText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
  },
  primaryButton: {
    backgroundColor: '#F5F5DC',
  },
  accentButton: {
    backgroundColor: '#eda43fff',
  },
  text: {
    fontFamily: 'MontserratBold',
    fontSize: 16,
    textAlign: 'center',
  },
  primaryText: {
    color: '#000000',
  },
  accentText: {
    color: '#ffffff',
  },
});