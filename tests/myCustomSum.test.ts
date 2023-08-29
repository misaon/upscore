import { expect, test } from 'vitest';
import { useMyCustomSum } from '~/composables/myCustomSum';

test('adds 1 + 2 to equal 3', () => {
  expect(useMyCustomSum(1, 2)).toBe(3);
});
