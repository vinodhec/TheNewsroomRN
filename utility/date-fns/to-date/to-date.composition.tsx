import React from 'react';
import { toDate } from './to-date';

export function ReturnsCorrectValue() {
  return <div>{toDate()}</div>;
}
