export const SUPPORTED_LANGUAGES = [
  // Default - International English
  { code: 'en', name: 'English (International)', nativeName: 'English', region: 'International' },
  
  // Western Europe
  { code: 'en-GB', name: 'English (UK)', nativeName: 'English (UK)', region: 'Western Europe' },
  { code: 'de-DE', name: 'German (Germany)', nativeName: 'Deutsch', region: 'Western Europe' },
  { code: 'de-AT', name: 'German (Austria)', nativeName: 'Deutsch (Österreich)', region: 'Western Europe' },
  { code: 'de-CH', name: 'German (Switzerland)', nativeName: 'Deutsch (Schweiz)', region: 'Western Europe' },
  { code: 'fr-FR', name: 'French (France)', nativeName: 'Français', region: 'Western Europe' },
  { code: 'fr-CH', name: 'French (Switzerland)', nativeName: 'Français (Suisse)', region: 'Western Europe' },
  { code: 'es-ES', name: 'Spanish (Spain)', nativeName: 'Español', region: 'Western Europe' },
  { code: 'it-IT', name: 'Italian (Italy)', nativeName: 'Italiano', region: 'Western Europe' },
  { code: 'nl-NL', name: 'Dutch (Netherlands)', nativeName: 'Nederlands', region: 'Western Europe' },
  { code: 'pt-PT', name: 'Portuguese (Portugal)', nativeName: 'Português', region: 'Western Europe' },
  
  // Nordic Countries
  { code: 'sv-SE', name: 'Swedish (Sweden)', nativeName: 'Svenska', region: 'Nordic' },
  { code: 'da-DK', name: 'Danish (Denmark)', nativeName: 'Dansk', region: 'Nordic' },
  { code: 'nb-NO', name: 'Norwegian (Norway)', nativeName: 'Norsk', region: 'Nordic' },
  { code: 'fi-FI', name: 'Finnish (Finland)', nativeName: 'Suomi', region: 'Nordic' },
  
  // Central & Eastern Europe
  { code: 'pl-PL', name: 'Polish (Poland)', nativeName: 'Polski', region: 'Central & Eastern Europe' },
  { code: 'cs-CZ', name: 'Czech (Czech Republic)', nativeName: 'Čeština', region: 'Central & Eastern Europe' },
  { code: 'hu-HU', name: 'Hungarian (Hungary)', nativeName: 'Magyar', region: 'Central & Eastern Europe' },
  { code: 'ro-RO', name: 'Romanian (Romania)', nativeName: 'Română', region: 'Central & Eastern Europe' },
  { code: 'sk-SK', name: 'Slovak (Slovakia)', nativeName: 'Slovenčina', region: 'Central & Eastern Europe' },
  { code: 'sl-SI', name: 'Slovenian (Slovenia)', nativeName: 'Slovenščina', region: 'Central & Eastern Europe' },
  { code: 'hr-HR', name: 'Croatian (Croatia)', nativeName: 'Hrvatski', region: 'Central & Eastern Europe' },
  { code: 'bg-BG', name: 'Bulgarian (Bulgaria)', nativeName: 'Български', region: 'Central & Eastern Europe' },
  { code: 'uk-UA', name: 'Ukrainian (Ukraine)', nativeName: 'Українська', region: 'Central & Eastern Europe' },
  { code: 'ru-RU', name: 'Russian (Russia)', nativeName: 'Русский', region: 'Central & Eastern Europe' },
  { code: 'lt-LT', name: 'Lithuanian (Lithuania)', nativeName: 'Lietuvių', region: 'Central & Eastern Europe' },
  { code: 'lv-LV', name: 'Latvian (Latvia)', nativeName: 'Latviešu', region: 'Central & Eastern Europe' },
  { code: 'et-EE', name: 'Estonian (Estonia)', nativeName: 'Eesti', region: 'Central & Eastern Europe' },
  
  // Southeastern Europe
  { code: 'el-GR', name: 'Greek (Greece)', nativeName: 'Ελληνικά', region: 'Southeastern Europe' },
  
  // Belgium
  { code: 'nl-BE', name: 'Flemish (Belgium)', nativeName: 'Vlaams', region: 'Belgium' },
  { code: 'fr-BE', name: 'French (Belgium)', nativeName: 'Français (Belgique)', region: 'Belgium' },
  
  // North America
  { code: 'en-US', name: 'English (US)', nativeName: 'English (US)', region: 'North America' },
  { code: 'en-CA', name: 'English (Canada)', nativeName: 'English (Canada)', region: 'North America' },
  { code: 'fr-CA', name: 'French (Canada)', nativeName: 'Français (Canada)', region: 'North America' },
  
  // Latin America
  { code: 'es-MX', name: 'Spanish (Mexico)', nativeName: 'Español (México)', region: 'Latin America' },
  { code: 'es-AR', name: 'Spanish (Argentina)', nativeName: 'Español (Argentina)', region: 'Latin America' },
  { code: 'es-CO', name: 'Spanish (Colombia)', nativeName: 'Español (Colombia)', region: 'Latin America' },
  { code: 'es-CL', name: 'Spanish (Chile)', nativeName: 'Español (Chile)', region: 'Latin America' },
  { code: 'es-PE', name: 'Spanish (Peru)', nativeName: 'Español (Perú)', region: 'Latin America' },
  { code: 'es-GT', name: 'Spanish (Guatemala)', nativeName: 'Español (Guatemala)', region: 'Latin America' },
  { code: 'es-CR', name: 'Spanish (Costa Rica)', nativeName: 'Español (Costa Rica)', region: 'Latin America' },
  { code: 'pt-BR', name: 'Portuguese (Brazil)', nativeName: 'Português (Brasil)', region: 'Latin America' },
  
  // East Asia
  { code: 'zh-CN', name: 'Chinese (Simplified)', nativeName: '简体中文', region: 'East Asia' },
  { code: 'zh-TW', name: 'Chinese (Traditional)', nativeName: '繁體中文', region: 'East Asia' },
  { code: 'ja-JP', name: 'Japanese (Japan)', nativeName: '日本語', region: 'East Asia' },
  { code: 'ko-KR', name: 'Korean (South Korea)', nativeName: '한국어', region: 'East Asia' },
  
  // Southeast Asia
  { code: 'en-SG', name: 'English (Singapore)', nativeName: 'English (Singapore)', region: 'Southeast Asia' },
  { code: 'en-MY', name: 'English (Malaysia)', nativeName: 'English (Malaysia)', region: 'Southeast Asia' },
  { code: 'en-ID', name: 'English (Indonesia)', nativeName: 'English (Indonesia)', region: 'Southeast Asia' },
  { code: 'en-PH', name: 'English (Philippines)', nativeName: 'English (Philippines)', region: 'Southeast Asia' },
  { code: 'en-TH', name: 'English (Thailand)', nativeName: 'English (Thailand)', region: 'Southeast Asia' },
  { code: 'en-VN', name: 'English (Vietnam)', nativeName: 'English (Vietnam)', region: 'Southeast Asia' },
  
  // South Asia
  { code: 'en-IN', name: 'English (India)', nativeName: 'English (India)', region: 'South Asia' },
  { code: 'en-PK', name: 'English (Pakistan)', nativeName: 'English (Pakistan)', region: 'South Asia' },
  { code: 'en-BD', name: 'English (Bangladesh)', nativeName: 'English (Bangladesh)', region: 'South Asia' },
  { code: 'en-LK', name: 'English (Sri Lanka)', nativeName: 'English (Sri Lanka)', region: 'South Asia' },
  
  // Middle East
  { code: 'ar-AE', name: 'Arabic (UAE)', nativeName: 'العربية (الإمارات)', region: 'Middle East' },
  { code: 'ar-SA', name: 'Arabic (Saudi Arabia)', nativeName: 'العربية (السعودية)', region: 'Middle East' },
  { code: 'ar-EG', name: 'Arabic (Egypt)', nativeName: 'العربية (مصر)', region: 'Middle East' },
  { code: 'en-AE', name: 'English (UAE)', nativeName: 'English (UAE)', region: 'Middle East' },
  { code: 'en-SA', name: 'English (Saudi Arabia)', nativeName: 'English (Saudi Arabia)', region: 'Middle East' },
  { code: 'he-IL', name: 'Hebrew (Israel)', nativeName: 'עברית', region: 'Middle East' },
  { code: 'tr-TR', name: 'Turkish (Turkey)', nativeName: 'Türkçe', region: 'Middle East' },
  
  // Africa
  { code: 'en-KE', name: 'English (Kenya)', nativeName: 'English (Kenya)', region: 'Africa' },
  { code: 'en-ZA', name: 'English (South Africa)', nativeName: 'English (South Africa)', region: 'Africa' },
  { code: 'en-NG', name: 'English (Nigeria)', nativeName: 'English (Nigeria)', region: 'Africa' },
  { code: 'en-GH', name: 'English (Ghana)', nativeName: 'English (Ghana)', region: 'Africa' },
  { code: 'fr-SN', name: 'French (Senegal)', nativeName: 'Français (Sénégal)', region: 'Africa' },
  { code: 'fr-CI', name: 'French (Côte d\'Ivoire)', nativeName: 'Français (Côte d\'Ivoire)', region: 'Africa' },
  { code: 'fr-CM', name: 'French (Cameroon)', nativeName: 'Français (Cameroun)', region: 'Africa' },
  { code: 'pt-AO', name: 'Portuguese (Angola)', nativeName: 'Português (Angola)', region: 'Africa' },
  { code: 'pt-MZ', name: 'Portuguese (Mozambique)', nativeName: 'Português (Moçambique)', region: 'Africa' },
] as const;

export type LanguageCode = typeof SUPPORTED_LANGUAGES[number]['code'];

export const getLanguageByCode = (code: string) => {
  return SUPPORTED_LANGUAGES.find(lang => lang.code === code) || SUPPORTED_LANGUAGES[0];
};

export const getLanguagePrefix = (code: string) => {
  return code === 'en' ? '' : `/${code}`;
};

export const getRegions = () => {
  const regions = new Set(SUPPORTED_LANGUAGES.map(lang => lang.region));
  return Array.from(regions);
};

export const getLanguagesByRegion = (region: string) => {
  return SUPPORTED_LANGUAGES.filter(lang => lang.region === region);
};
