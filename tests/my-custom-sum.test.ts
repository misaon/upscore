import { expect, test } from 'vitest';
import { useCustomSum } from '~/composables/custom-sum';

test('adds 1 + 2 to equal 3', () => {
  expect(useCustomSum(1, 2)).toBe(3);
});
