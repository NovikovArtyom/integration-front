import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function EmptyFieldAlert({ field }) {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="error">Поле "{field}" не заполнено!</Alert>
    </Stack>
  );
}