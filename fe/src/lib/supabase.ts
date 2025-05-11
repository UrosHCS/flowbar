import { createClient } from '@supabase/supabase-js';
import { config } from '@/config/config';
import { Settings } from '@/schemas/schemas';

export const supabase = createClient(
  config.supabase.url,
  config.supabase.anonKey,
);

export const initialSettings: Settings = {
  global: {
    color: '#4f46e5', // Indigo
    textColor: '#ffffff',
    size: 60,
    buttonWidth: 120,
    buttonHeight: 60,
    buttonStyle: 'filled',
    borderRadius: 8,
    borderThickness: 2,
    layoutType: 'grid',
    hoverScale: 1.05,
    gradientTo: '#8b5cf6', // Purple
    gradientDirection: 'to-r',
    gradientAngle: 45,
    longPressDuration: 500,
    clickAndRelease: true,
    hoverBorderGradientStart: '#4f46e5',
    hoverBorderGradientEnd: '#8b5cf6',
    hoverBorderGradientAngle: 45,
    borderColor: '#3730a3',
    borderGradientStart: '#4f46e5',
    borderGradientEnd: '#8b5cf6',
    borderGradientAngle: 45,
    defaultBorderGradientStart: '#4f46e5',
    defaultBorderGradientEnd: '#8b5cf6',
    defaultBorderGradientAngle: 45,
  },
  menus: [
    {
      type: 'default',
      slots: [
        {
          id: 'slot-1',
          position: 1,
          button: {
            id: 'button-1',
            label: 'Copy',
            tooltip: null,
            icon: null,
            action: { type: 'common', command: 'copy' },
          },
        },
        {
          id: 'slot-2',
          position: 2,
          button: {
            id: 'button-2',
            label: 'Paste',
            tooltip: null,
            icon: null,
            action: { type: 'common', command: 'paste' },
          },
        },
      ],
    },
    {
      type: 'textSelection',
      slots: [
        {
          id: 'slot-1',
          position: 1,
          button: {
            id: 'button-1',
            label: 'Copy',
            tooltip: null,
            icon: null,
            action: { type: 'common', command: 'copy' },
          },
        },
        {
          id: 'slot-2',
          position: 2,
          button: {
            id: 'button-2',
            label: 'Paste',
            tooltip: null,
            icon: null,
            action: { type: 'common', command: 'paste' },
          },
        },
      ],
    },
    {
      type: 'inputSelection',
      slots: [
        {
          id: 'slot-1',
          position: 1,
          button: {
            id: 'button-1',
            label: 'Copy',
            tooltip: null,
            icon: null,
            action: { type: 'common', command: 'copy' },
          },
        },
        {
          id: 'slot-2',
          position: 2,
          button: {
            id: 'button-2',
            label: 'Paste',
            tooltip: null,
            icon: null,
            action: { type: 'common', command: 'paste' },
          },
        },
      ],
    },
  ],
  library: {},
  other: {},
};
