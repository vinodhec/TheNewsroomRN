import React from 'react';
import { differenceInMilliseconds } from './difference-in-milliseconds';

export function ReturnsCorrectValue() {
  return <div>{differenceInMilliseconds()}</div>;
}
