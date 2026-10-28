import { t } from '../schema';
/**
 * The principal-voice-symbol type represents the type of symbol used to indicate a principal or secondary voice.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/principal-voice-symbol/}
 */
export const principalVoiceSymbol = () => t.choices(...(['none', 'Hauptstimme', 'Nebenstimme', 'plain'] as const));
