import { z } from 'zod';

/**
 * A button can do different things called actions.
 * It can be a LLM call, a common action like copy or paste,
 * or an action to open the settings menu.
 */
export const ButtonActionSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('llm_call'),
    prompt: z.string(),
  }),
  z.object({
    type: z.literal('common'),
    command: z.enum(['copy', 'paste', 'uppercase']),
  }),
  z.object({
    type: z.literal('settings'),
  }),
]);

/**
 * A button is a single button that can be used in a menu.
 */
export const ButtonSchema = z.object({
  id: z.string(),
  label: z.string(),
  action: ButtonActionSchema,
  tooltip: z.string().nullable(),
  icon: z.string().nullable(),
});

/**
 * A slot is a component of a menu.
 */
export const SlotSchema = z.object({
  id: z.string(),
  position: z.number(),
  button: ButtonSchema.nullable(),
});

/**
 * A menu is a collection of slots.
 */
export const MenuSchema = z.object({
  type: z.enum(['default', 'textSelection', 'inputSelection']),
  slots: z.array(SlotSchema),
});

/**
 * This is the button library.
 * It's shape is TBD.
 */
export const LibrarySchema = z.object({
  buttons: z.string().array().optional(),
});

/**
 * Global settings are the settings that apply to all menus.
 */
export const GlobalSettingsSchema = z.object({
  color: z.string(),
  textColor: z.string(),
  size: z.number(),
  buttonWidth: z.number(),
  buttonHeight: z.number(),
  buttonStyle: z.string(),
  borderRadius: z.number(),
  borderThickness: z.number(),
  layoutType: z.enum(['circle', 'grid']),
  hoverScale: z.number(),
  gradientTo: z.string(),
  gradientDirection: z.string(),
  gradientAngle: z.number(),
  longPressDuration: z.number(),
  clickAndRelease: z.boolean(),
  hoverBorderGradientStart: z.string(),
  hoverBorderGradientEnd: z.string(),
  hoverBorderGradientAngle: z.number(),
  borderColor: z.string(),
  borderGradientStart: z.string(),
  borderGradientEnd: z.string(),
  borderGradientAngle: z.number(),
  defaultBorderGradientStart: z.string(),
  defaultBorderGradientEnd: z.string(),
  defaultBorderGradientAngle: z.number(),
});

/**
 * This is the schema for the settings object.
 */
export const SettingsSchema = z.object({
  global: GlobalSettingsSchema,
  menus: z.array(MenuSchema),
  library: LibrarySchema,
  /**
   * This field is for future use, if we need to save something real quick
   * without having to create db migrations.
   */
  other: z.unknown(),
});

export type ButtonAction = z.infer<typeof ButtonActionSchema>;
export type Button = z.infer<typeof ButtonSchema>;
export type Slot = z.infer<typeof SlotSchema>;
export type Menu = z.infer<typeof MenuSchema>;
export type Library = z.infer<typeof LibrarySchema>;
export type GlobalSettings = z.infer<typeof GlobalSettingsSchema>;
export type Settings = z.infer<typeof SettingsSchema>;
