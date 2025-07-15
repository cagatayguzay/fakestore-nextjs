// components/atoms/Button.tsx
import MuiButton from '@mui/material/Button';
import React from 'react';

interface ButtonProps extends React.ComponentProps<typeof MuiButton> {}

export default function Button(props: ButtonProps) {
  return <MuiButton {...props} />;
}
