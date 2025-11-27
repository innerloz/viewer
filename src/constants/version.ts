/**
 * Version and Certification Information
 * CE Marked Medical Device - MDR 2017/745
 */

export const VERSION_INFO = {
  version: '2.1.0-MDR',
  ceMark: 'CE',
  regulation: 'MDR 2017/745',
  deviceClass: 'Class I',
  releaseDate: '2025-11-27',
  intendedUse: 'For professional medical use only',
} as const;

export const CERTIFICATION_TEXT = `CE Marked Medical Device | ${VERSION_INFO.regulation} | ${VERSION_INFO.deviceClass}`;

