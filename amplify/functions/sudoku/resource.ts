import { defineFunction } from '@aws-amplify/backend';

export const sudoku = defineFunction({
  name: 'sudoku',
  entry: './handler.ts',
});
