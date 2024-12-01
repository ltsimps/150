import React from 'react';
import { StyleSheet } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import { theme } from '../theme/theme';

type Props = {
  mode?: 'text' | 'outlined' | 'contained';
  onPress: () => void;
  style?: object;
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
};

export const Button = ({
  mode = 'contained',
  onPress,
  style,
  children,
  loading = false,
  disabled = false,
}: Props) => {
  return (
    <PaperButton
      mode={mode}
      onPress={onPress}
      style={[styles.button, style]}
      loading={loading}
      disabled={disabled}
    >
      {children}
    </PaperButton>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginVertical: theme.spacing.sm,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
  },
});
