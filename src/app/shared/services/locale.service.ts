import {Injectable} from '@angular/core';
import {
  arrayRemove,
  arrayUnion,
  doc,
  Firestore,
  serverTimestamp,
  setDoc
} from '@angular/fire/firestore';
import {from, Observable, of} from 'rxjs';
import {traceUntilFirst} from '@angular/fire/performance';
import {tap} from 'rxjs/operators';
import {Locale} from '../models/locale.model';
import {
  SpaceFallbackLocaleUpdateFS,
  SpaceLocalesUpdateFS,
  SpaceUpdate
} from '../models/space.model';

@Injectable()
export class LocaleService {
  constructor(private firestore: Firestore) {
  }

  markAsFallback(spaceId: string, entity: Locale): Observable<void> {
    const update: SpaceFallbackLocaleUpdateFS = {
      localeFallback: entity, updatedOn: serverTimestamp()
    }
    return from(
      setDoc(doc(this.firestore, `spaces/${spaceId}`),
        update,
        {merge: true}
      )
    )
    .pipe(
      traceUntilFirst('firestore'),
      tap(it => console.log(it))
    );
  }

  add(spaceId: string, entity: Locale): Observable<void> {
    const update: SpaceLocalesUpdateFS = {
      locales: arrayUnion(entity),
      updatedOn: serverTimestamp()
    }
    return from(
      setDoc(doc(this.firestore, `spaces/${spaceId}`),
        update,
        {merge: true}
      )
    )
    .pipe(
      traceUntilFirst('firestore'),
      tap(it => console.log(it))
    );
  }

  delete(spaceId: string, entity: Locale): Observable<void> {
    const update: SpaceLocalesUpdateFS = {
      locales: arrayRemove(entity),
      updatedOn: serverTimestamp()
    }
    return from(
      setDoc(doc(this.firestore, `spaces/${spaceId}`),
        update,
        {merge: true}
      )
    )
    .pipe(
      traceUntilFirst('firestore'),
      tap(it => console.log(it))
    );
  }

  findAllLocales(): Observable<Locale[]> {
    return of(locales);
  }
}

const locales: Locale[] =
  [
    {id: 'af', name: 'Afrikaans'},
    {id: 'af-NA', name: 'Afrikaans (Namibia)'},
    {id: 'af-ZA', name: 'Afrikaans (South Africa)'},
    {id: 'agq', name: 'Aghem'},
    {id: 'agq-CM', name: 'Aghem (Cameroon)'},
    {id: 'ak', name: 'Akan'},
    {id: 'ak-GH', name: 'Akan (Ghana)'},
    {id: 'sq', name: 'Albanian'},
    {id: 'sq-AL', name: 'Albanian (Albania)'},
    {id: 'am', name: 'Amharic'},
    {id: 'am-ET', name: 'Amharic (Ethiopia)'},
    {id: 'ar', name: 'Arabic'},
    {id: 'ar-DZ', name: 'Arabic (Algeria)'},
    {id: 'ar-BH', name: 'Arabic (Bahrain)'},
    {id: 'ar-EG', name: 'Arabic (Egypt)'},
    {id: 'ar-IQ', name: 'Arabic (Iraq)'},
    {id: 'ar-JO', name: 'Arabic (Jordan)'},
    {id: 'ar-KW', name: 'Arabic (Kuwait)'},
    {id: 'ar-LB', name: 'Arabic (Lebanon)'},
    {id: 'ar-LY', name: 'Arabic (Libya)'},
    {id: 'ar-MA', name: 'Arabic (Morocco)'},
    {id: 'ar-OM', name: 'Arabic (Oman)'},
    {id: 'ar-QA', name: 'Arabic (Qatar)'},
    {id: 'ar-SA', name: 'Arabic (Saudi Arabia)'},
    {id: 'ar-SD', name: 'Arabic (Sudan)'},
    {id: 'ar-SY', name: 'Arabic (Syria)'},
    {id: 'ar-TN', name: 'Arabic (Tunisia)'},
    {id: 'ar-AE', name: 'Arabic (United Arab Emirates)'},
    {id: 'ar-001', name: 'Arabic (World)'},
    {id: 'ar-YE', name: 'Arabic (Yemen)'},
    {id: 'hy', name: 'Armenian'},
    {id: 'hy-AM', name: 'Armenian (Armenia)'},
    {id: 'as', name: 'Assamese'},
    {id: 'as-IN', name: 'Assamese (India)'},
    {id: 'asa', name: 'Asu'},
    {id: 'asa-TZ', name: 'Asu (Tanzania)'},
    {id: 'az', name: 'Azerbaijani'},
    {id: 'az-Cyrl', name: 'Azerbaijani (Cyrillic)'},
    {id: 'az-Cyrl-AZ', name: 'Azerbaijani (Cyrillic, name:  Azerbaijan)'},
    {id: 'az-Latn', name: 'Azerbaijani (Latin)'},
    {id: 'az-Latn-AZ', name: 'Azerbaijani (Latin, name:  Azerbaijan)'},
    {id: 'ksf', name: 'Bafia'},
    {id: 'ksf-CM', name: 'Bafia (Cameroon)'},
    {id: 'bm', name: 'Bambara'},
    {id: 'bm-ML', name: 'Bambara (Mali)'},
    {id: 'bas', name: 'Basaa'},
    {id: 'bas-CM', name: 'Basaa (Cameroon)'},
    {id: 'eu', name: 'Basque'},
    {id: 'eu-ES', name: 'Basque (Spain)'},
    {id: 'be', name: 'Belarusian'},
    {id: 'be-BY', name: 'Belarusian (Belarus)'},
    {id: 'bem', name: 'Bemba'},
    {id: 'bem-ZM', name: 'Bemba (Zambia)'},
    {id: 'bez', name: 'Bena'},
    {id: 'bez-TZ', name: 'Bena (Tanzania)'},
    {id: 'bn', name: 'Bengali'},
    {id: 'bn-BD', name: 'Bengali (Bangladesh)'},
    {id: 'bn-IN', name: 'Bengali (India)'},
    {id: 'brx', name: 'Bodo'},
    {id: 'brx-IN', name: 'Bodo (India)'},
    {id: 'bs', name: 'Bosnian'},
    {id: 'bs-BA', name: 'Bosnian (Bosnia and Herzegovina)'},
    {id: 'br', name: 'Breton'},
    {id: 'br-FR', name: 'Breton (France)'},
    {id: 'bg', name: 'Bulgarian'},
    {id: 'bg-BG', name: 'Bulgarian (Bulgaria)'},
    {id: 'my', name: 'Burmese'},
    {id: 'my-MM', name: 'Burmese (Myanmar [Burma])'},
    {id: 'ca', name: 'Catalan'},
    {id: 'ca-ES', name: 'Catalan (Spain)'},
    {id: 'ckb', name: 'Central Kurdish'},
    {id: 'tzm', name: 'Central Morocco Tamazight'},
    {id: 'tzm-Latn', name: 'Central Morocco Tamazight (Latin)'},
    {id: 'tzm-Latn-MA', name: 'Central Morocco Tamazight (Latin, name:  Morocco)'},
    {id: 'chr', name: 'Cherokee'},
    {id: 'chr-US', name: 'Cherokee (United States)'},
    {id: 'cgg', name: 'Chiga'},
    {id: 'cgg-UG', name: 'Chiga (Uganda)'},
    {id: 'zh', name: 'Chinese'},
    {id: 'zh-Hans', name: 'Chinese (Simplified)'},
    {id: 'zh-CN', name: 'Chinese (Simplified, name:  China)'},
    {id: 'zh-Hans-CN', name: 'Chinese (Simplified, name:  China)'},
    {id: 'zh-Hans-HK', name: 'Chinese (Simplified, name:  Hong Kong SAR China)'},
    {id: 'zh-Hans-MO', name: 'Chinese (Simplified, name:  Macau SAR China)'},
    {id: 'zh-Hans-SG', name: 'Chinese (Simplified, name:  Singapore)'},
    {id: 'zh-Hant', name: 'Chinese (Traditional)'},
    {id: 'zh-Hant-HK', name: 'Chinese (Traditional, name:  Hong Kong SAR China)'},
    {id: 'zh-Hant-MO', name: 'Chinese (Traditional, name:  Macau SAR China)'},
    {id: 'zh-Hant-TW', name: 'Chinese (Traditional, name:  Taiwan)'},
    {id: 'swc', name: 'Congo Swahili'},
    {id: 'swc-CD', name: 'Congo Swahili (Congo - Kinshasa)'},
    {id: 'kw', name: 'Cornish'},
    {id: 'kw-GB', name: 'Cornish (United Kingdom)'},
    {id: 'hr', name: 'Croatian'},
    {id: 'hr-HR', name: 'Croatian (Croatia)'},
    {id: 'cs', name: 'Czech'},
    {id: 'cs-CZ', name: 'Czech (Czech Republic)'},
    {id: 'da', name: 'Danish'},
    {id: 'da-DK', name: 'Danish (Denmark)'},
    {id: 'dua', name: 'Duala'},
    {id: 'dua-CM', name: 'Duala (Cameroon)'},
    {id: 'nl', name: 'Dutch'},
    {id: 'nl-AW', name: 'Dutch (Aruba)'},
    {id: 'nl-BE', name: 'Dutch (Belgium)'},
    {id: 'nl-CW', name: 'Dutch (Curaçao)'},
    {id: 'nl-NL', name: 'Dutch (Netherlands)'},
    {id: 'nl-SX', name: 'Dutch (Sint Maarten)'},
    {id: 'ebu', name: 'Embu'},
    {id: 'ebu-KE', name: 'Embu (Kenya)'},
    {id: 'en', name: 'English'},
    {id: 'en-AS', name: 'English (American Samoa)'},
    {id: 'en-AU', name: 'English (Australia)'},
    {id: 'en-BB', name: 'English (Barbados)'},
    {id: 'en-BE', name: 'English (Belgium)'},
    {id: 'en-BZ', name: 'English (Belize)'},
    {id: 'en-BM', name: 'English (Bermuda)'},
    {id: 'en-BW', name: 'English (Botswana)'},
    {id: 'en-CA', name: 'English (Canada)'},
    {id: 'en-EG', name: 'English (Egypt)'},
    {id: 'en-EU', name: 'English (Europe)'},
    {id: 'en-GU', name: 'English (Guam)'},
    {id: 'en-GY', name: 'English (Guyana)'},
    {id: 'en-HK', name: 'English (Hong Kong SAR China)'},
    {id: 'en-IN', name: 'English (India)'},
    {id: 'en-IE', name: 'English (Ireland)'},
    {id: 'en-JM', name: 'English (Jamaica)'},
    {id: 'en-MT', name: 'English (Malta)'},
    {id: 'en-MH', name: 'English (Marshall Islands)'},
    {id: 'en-MU', name: 'English (Mauritius)'},
    {id: 'en-NA', name: 'English (Namibia)'},
    {id: 'en-NZ', name: 'English (New Zealand)'},
    {id: 'en-MP', name: 'English (Northern Mariana Islands)'},
    {id: 'en-PK', name: 'English (Pakistan)'},
    {id: 'en-PH', name: 'English (Philippines)'},
    {id: 'en-SA', name: 'English (Saudi Arabia)'},
    {id: 'en-SG', name: 'English (Singapore)'},
    {id: 'en-ZA', name: 'English (South Africa)'},
    {id: 'en-TT', name: 'English (Trinidad and Tobago)'},
    {id: 'en-AE', name: 'English (U.A.E.)'},
    {id: 'en-UM', name: 'English (U.S. Minor Outlying Islands)'},
    {id: 'en-VI', name: 'English (U.S. Virgin Islands)'},
    {id: 'en-US-POSIX', name: 'English (U.S., name:  Computer)'},
    {id: 'en-GB', name: 'English (United Kingdom)'},
    {id: 'en-US', name: 'English (United States)'},
    {id: 'en-ZW', name: 'English (Zimbabwe)'},
    {id: 'eo', name: 'Esperanto'},
    {id: 'et', name: 'Estonian'},
    {id: 'et-EE', name: 'Estonian (Estonia)'},
    {id: 'ee', name: 'Ewe'},
    {id: 'ee-GH', name: 'Ewe (Ghana)'},
    {id: 'ee-TG', name: 'Ewe (Togo)'},
    {id: 'ewo', name: 'Ewondo'},
    {id: 'ewo-CM', name: 'Ewondo (Cameroon)'},
    {id: 'fo', name: 'Faroese'},
    {id: 'fo-FO', name: 'Faroese (Faroe Islands)'},
    {id: 'fil', name: 'Filipino'},
    {id: 'fil-PH', name: 'Filipino (Philippines)'},
    {id: 'fi', name: 'Finnish'},
    {id: 'fi-FI', name: 'Finnish (Finland)'},
    {id: 'fr', name: 'French'},
    {id: 'fr-BE', name: 'French (Belgium)'},
    {id: 'fr-BJ', name: 'French (Benin)'},
    {id: 'fr-BF', name: 'French (Burkina Faso)'},
    {id: 'fr-BI', name: 'French (Burundi)'},
    {id: 'fr-CM', name: 'French (Cameroon)'},
    {id: 'fr-CA', name: 'French (Canada)'},
    {id: 'fr-CF', name: 'French (Central African Republic)'},
    {id: 'fr-TD', name: 'French (Chad)'},
    {id: 'fr-KM', name: 'French (Comoros)'},
    {id: 'fr-CG', name: 'French (Congo - Brazzaville)'},
    {id: 'fr-CD', name: 'French (Congo - Kinshasa)'},
    {id: 'fr-CI', name: 'French (Côte d’Ivoire)'},
    {id: 'fr-DJ', name: 'French (Djibouti)'},
    {id: 'fr-GQ', name: 'French (Equatorial Guinea)'},
    {id: 'fr-FR', name: 'French (France)'},
    {id: 'fr-GF', name: 'French (French Guiana)'},
    {id: 'fr-GA', name: 'French (Gabon)'},
    {id: 'fr-GP', name: 'French (Guadeloupe)'},
    {id: 'fr-GN', name: 'French (Guinea)'},
    {id: 'fr-LU', name: 'French (Luxembourg)'},
    {id: 'fr-MG', name: 'French (Madagascar)'},
    {id: 'fr-ML', name: 'French (Mali)'},
    {id: 'fr-MQ', name: 'French (Martinique)'},
    {id: 'fr-YT', name: 'French (Mayotte)'},
    {id: 'fr-MC', name: 'French (Monaco)'},
    {id: 'fr-NE', name: 'French (Niger)'},
    {id: 'fr-RW', name: 'French (Rwanda)'},
    {id: 'fr-RE', name: 'French (Réunion)'},
    {id: 'fr-BL', name: 'French (Saint Barthélemy)'},
    {id: 'fr-MF', name: 'French (Saint Martin)'},
    {id: 'fr-SN', name: 'French (Senegal)'},
    {id: 'fr-CH', name: 'French (Switzerland)'},
    {id: 'fr-TG', name: 'French (Togo)'},
    {id: 'ff', name: 'Fulah'},
    {id: 'ff-SN', name: 'Fulah (Senegal)'},
    {id: 'gl', name: 'Galician'},
    {id: 'gl-ES', name: 'Galician (Spain)'},
    {id: 'lg', name: 'Ganda'},
    {id: 'lg-UG', name: 'Ganda (Uganda)'},
    {id: 'ka', name: 'Georgian'},
    {id: 'ka-GE', name: 'Georgian (Georgia)'},
    {id: 'de', name: 'German'},
    {id: 'de-AT', name: 'German (Austria)'},
    {id: 'de-BE', name: 'German (Belgium)'},
    {id: 'de-DE', name: 'German (Germany)'},
    {id: 'de-LI', name: 'German (Liechtenstein)'},
    {id: 'de-LU', name: 'German (Luxembourg)'},
    {id: 'de-CH', name: 'German (Switzerland)'},
    {id: 'el', name: 'Greek'},
    {id: 'el-CY', name: 'Greek (Cyprus)'},
    {id: 'el-GR', name: 'Greek (Greece)'},
    {id: 'gu', name: 'Gujarati'},
    {id: 'gu-IN', name: 'Gujarati (India)'},
    {id: 'guz', name: 'Gusii'},
    {id: 'guz-KE', name: 'Gusii (Kenya)'},
    {id: 'ha', name: 'Hausa'},
    {id: 'ha-Latn', name: 'Hausa (Latin)'},
    {id: 'ha-Latn-GH', name: 'Hausa (Latin, name:  Ghana)'},
    {id: 'ha-Latn-NE', name: 'Hausa (Latin, name:  Niger)'},
    {id: 'ha-Latn-NG', name: 'Hausa (Latin, name:  Nigeria)'},
    {id: 'haw', name: 'Hawaiian'},
    {id: 'haw-US', name: 'Hawaiian (United States)'},
    {id: 'he', name: 'Hebrew'},
    {id: 'he-IL', name: 'Hebrew (Israel)'},
    {id: 'hi', name: 'Hindi'},
    {id: 'hi-IN', name: 'Hindi (India)'},
    {id: 'hu', name: 'Hungarian'},
    {id: 'hu-HU', name: 'Hungarian (Hungary)'},
    {id: 'is', name: 'Icelandic'},
    {id: 'is-IS', name: 'Icelandic (Iceland)'},
    {id: 'ig', name: 'Igbo'},
    {id: 'ig-NG', name: 'Igbo (Nigeria)'},
    {id: 'id', name: 'Indonesian'},
    {id: 'id-ID', name: 'Indonesian (Indonesia)'},
    {id: 'ga', name: 'Irish'},
    {id: 'ga-IE', name: 'Irish (Ireland)'},
    {id: 'it', name: 'Italian'},
    {id: 'it-IT', name: 'Italian (Italy)'},
    {id: 'it-CH', name: 'Italian (Switzerland)'},
    {id: 'ja', name: 'Japanese'},
    {id: 'ja-JP', name: 'Japanese (Japan)'},
    {id: 'dyo', name: 'Jola-Fonyi'},
    {id: 'dyo-SN', name: 'Jola-Fonyi (Senegal)'},
    {id: 'kea', name: 'Kabuverdianu'},
    {id: 'kea-CV', name: 'Kabuverdianu (Cape Verde)'},
    {id: 'kab', name: 'Kabyle'},
    {id: 'kab-DZ', name: 'Kabyle (Algeria)'},
    {id: 'kl', name: 'Kalaallisut'},
    {id: 'kl-GL', name: 'Kalaallisut (Greenland)'},
    {id: 'kln', name: 'Kalenjin'},
    {id: 'kln-KE', name: 'Kalenjin (Kenya)'},
    {id: 'kam', name: 'Kamba'},
    {id: 'kam-KE', name: 'Kamba (Kenya)'},
    {id: 'kn', name: 'Kannada'},
    {id: 'kn-IN', name: 'Kannada (India)'},
    {id: 'kk', name: 'Kazakh'},
    {id: 'kk-Cyrl', name: 'Kazakh (Cyrillic)'},
    {id: 'kk-Cyrl-KZ', name: 'Kazakh (Cyrillic, name:  Kazakhstan)'},
    {id: 'km', name: 'Khmer'},
    {id: 'km-KH', name: 'Khmer (Cambodia)'},
    {id: 'ki', name: 'Kikuyu'},
    {id: 'ki-KE', name: 'Kikuyu (Kenya)'},
    {id: 'rw', name: 'Kinyarwanda'},
    {id: 'rw-RW', name: 'Kinyarwanda (Rwanda)'},
    {id: 'kok', name: 'Konkani'},
    {id: 'kok-IN', name: 'Konkani (India)'},
    {id: 'ko', name: 'Korean'},
    {id: 'ko-KR', name: 'Korean (South Korea)'},
    {id: 'khq', name: 'Koyra Chiini'},
    {id: 'khq-ML', name: 'Koyra Chiini (Mali)'},
    {id: 'ses', name: 'Koyraboro Senni'},
    {id: 'ses-ML', name: 'Koyraboro Senni (Mali)'},
    {id: 'nmg', name: 'Kwasio'},
    {id: 'nmg-CM', name: 'Kwasio (Cameroon)'},
    {id: 'lag', name: 'Langi'},
    {id: 'lag-TZ', name: 'Langi (Tanzania)'},
    {id: 'lv', name: 'Latvian'},
    {id: 'lv-LV', name: 'Latvian (Latvia)'},
    {id: 'ln', name: 'Lingala'},
    {id: 'ln-CG', name: 'Lingala (Congo - Brazzaville)'},
    {id: 'ln-CD', name: 'Lingala (Congo - Kinshasa)'},
    {id: 'lt', name: 'Lithuanian'},
    {id: 'lt-LT', name: 'Lithuanian (Lithuania)'},
    {id: 'lu', name: 'Luba-Katanga'},
    {id: 'lu-CD', name: 'Luba-Katanga (Congo - Kinshasa)'},
    {id: 'luo', name: 'Luo'},
    {id: 'luo-KE', name: 'Luo (Kenya)'},
    {id: 'luy', name: 'Luyia'},
    {id: 'luy-KE', name: 'Luyia (Kenya)'},
    {id: 'mk', name: 'Macedonian'},
    {id: 'mk-MK', name: 'Macedonian (Macedonia)'},
    {id: 'jmc', name: 'Machame'},
    {id: 'jmc-TZ', name: 'Machame (Tanzania)'},
    {id: 'mgh', name: 'Makhuwa-Meetto'},
    {id: 'mgh-MZ', name: 'Makhuwa-Meetto (Mozambique)'},
    {id: 'kde', name: 'Makonde'},
    {id: 'kde-TZ', name: 'Makonde (Tanzania)'},
    {id: 'mg', name: 'Malagasy'},
    {id: 'mg-MG', name: 'Malagasy (Madagascar)'},
    {id: 'ms', name: 'Malay'},
    {id: 'ms-BN', name: 'Malay (Brunei)'},
    {id: 'ms-MY', name: 'Malay (Malaysia)'},
    {id: 'ml', name: 'Malayalam'},
    {id: 'ml-IN', name: 'Malayalam (India)'},
    {id: 'mt', name: 'Maltese'},
    {id: 'mt-MT', name: 'Maltese (Malta)'},
    {id: 'gv', name: 'Manx'},
    {id: 'gv-GB', name: 'Manx (United Kingdom)'},
    {id: 'mr', name: 'Marathi'},
    {id: 'mr-IN', name: 'Marathi (India)'},
    {id: 'mas', name: 'Masai'},
    {id: 'mas-KE', name: 'Masai (Kenya)'},
    {id: 'mas-TZ', name: 'Masai (Tanzania)'},
    {id: 'mer', name: 'Meru'},
    {id: 'mer-KE', name: 'Meru (Kenya)'},
    {id: 'mfe', name: 'Morisyen'},
    {id: 'mfe-MU', name: 'Morisyen (Mauritius)'},
    {id: 'mua', name: 'Mundang'},
    {id: 'mua-CM', name: 'Mundang (Cameroon)'},
    {id: 'naq', name: 'Nama'},
    {id: 'naq-NA', name: 'Nama (Namibia)'},
    {id: 'ne', name: 'Nepali'},
    {id: 'ne-IN', name: 'Nepali (India)'},
    {id: 'ne-NP', name: 'Nepali (Nepal)'},
    {id: 'nd', name: 'North Ndebele'},
    {id: 'nd-ZW', name: 'North Ndebele (Zimbabwe)'},
    {id: 'nb', name: 'Norwegian Bokmål'},
    {id: 'nb-NO', name: 'Norwegian Bokmål (Norway)'},
    {id: 'nn', name: 'Norwegian Nynorsk'},
    {id: 'nn-NO', name: 'Norwegian Nynorsk (Norway)'},
    {id: 'nus', name: 'Nuer'},
    {id: 'nus-SD', name: 'Nuer (Sudan)'},
    {id: 'nyn', name: 'Nyankole'},
    {id: 'nyn-UG', name: 'Nyankole (Uganda)'},
    {id: 'or', name: 'Oriya'},
    {id: 'or-IN', name: 'Oriya (India)'},
    {id: 'om', name: 'Oromo'},
    {id: 'om-ET', name: 'Oromo (Ethiopia)'},
    {id: 'om-KE', name: 'Oromo (Kenya)'},
    {id: 'ps', name: 'Pashto'},
    {id: 'ps-AF', name: 'Pashto (Afghanistan)'},
    {id: 'fa', name: 'Persian'},
    {id: 'fa-AF', name: 'Persian (Afghanistan)'},
    {id: 'fa-IR', name: 'Persian (Iran)'},
    {id: 'pl', name: 'Polish'},
    {id: 'pl-PL', name: 'Polish (Poland)'},
    {id: 'pt', name: 'Portuguese'},
    {id: 'pt-AO', name: 'Portuguese (Angola)'},
    {id: 'pt-BR', name: 'Portuguese (Brazil)'},
    {id: 'pt-GW', name: 'Portuguese (Guinea-Bissau)'},
    {id: 'pt-MZ', name: 'Portuguese (Mozambique)'},
    {id: 'pt-PT', name: 'Portuguese (Portugal)'},
    {id: 'pt-ST', name: 'Portuguese (São Tomé and Príncipe)'},
    {id: 'pa', name: 'Punjabi'},
    {id: 'pa-Arab', name: 'Punjabi (Arabic)'},
    {id: 'pa-Arab-PK', name: 'Punjabi (Arabic, name:  Pakistan)'},
    {id: 'pa-Guru', name: 'Punjabi (Gurmukhi)'},
    {id: 'pa-Guru-IN', name: 'Punjabi (Gurmukhi, name:  India)'},
    {id: 'ro', name: 'Romanian'},
    {id: 'ro-MD', name: 'Romanian (Moldova)'},
    {id: 'ro-RO', name: 'Romanian (Romania)'},
    {id: 'rm', name: 'Romansh'},
    {id: 'rm-CH', name: 'Romansh (Switzerland)'},
    {id: 'rof', name: 'Rombo'},
    {id: 'rof-TZ', name: 'Rombo (Tanzania)'},
    {id: 'rn', name: 'Rundi'},
    {id: 'rn-BI', name: 'Rundi (Burundi)'},
    {id: 'ru', name: 'Russian'},
    {id: 'ru-MD', name: 'Russian (Moldova)'},
    {id: 'ru-RU', name: 'Russian (Russia)'},
    {id: 'ru-UA', name: 'Russian (Ukraine)'},
    {id: 'rwk', name: 'Rwa'},
    {id: 'rwk-TZ', name: 'Rwa (Tanzania)'},
    {id: 'saq', name: 'Samburu'},
    {id: 'saq-KE', name: 'Samburu (Kenya)'},
    {id: 'sg', name: 'Sango'},
    {id: 'sg-CF', name: 'Sango (Central African Republic)'},
    {id: 'sbp', name: 'Sangu'},
    {id: 'sbp-TZ', name: 'Sangu (Tanzania)'},
    {id: 'seh', name: 'Sena'},
    {id: 'seh-MZ', name: 'Sena (Mozambique)'},
    {id: 'sr', name: 'Serbian'},
    {id: 'sr-Cyrl', name: 'Serbian (Cyrillic)'},
    {id: 'sr-Cyrl-BA', name: 'Serbian (Cyrillic, name:  Bosnia and Herzegovina)'},
    {id: 'sr-Cyrl-ME', name: 'Serbian (Cyrillic, name:  Montenegro)'},
    {id: 'sr-Cyrl-RS', name: 'Serbian (Cyrillic, name:  Serbia)'},
    {id: 'sr-Latn', name: 'Serbian (Latin)'},
    {id: 'sr-Latn-BA', name: 'Serbian (Latin, name:  Bosnia and Herzegovina)'},
    {id: 'sr-Latn-ME', name: 'Serbian (Latin, name:  Montenegro)'},
    {id: 'sr-Latn-RS', name: 'Serbian (Latin, name:  Serbia)'},
    {id: 'ksb', name: 'Shambala'},
    {id: 'ksb-TZ', name: 'Shambala (Tanzania)'},
    {id: 'sn', name: 'Shona'},
    {id: 'sn-ZW', name: 'Shona (Zimbabwe)'},
    {id: 'ii', name: 'Sichuan Yi'},
    {id: 'ii-CN', name: 'Sichuan Yi (China)'},
    {id: 'si', name: 'Sinhala'},
    {id: 'si-LK', name: 'Sinhala (Sri Lanka)'},
    {id: 'sk', name: 'Slovak'},
    {id: 'sk-SK', name: 'Slovak (Slovakia)'},
    {id: 'sl', name: 'Slovenian'},
    {id: 'sl-SI', name: 'Slovenian (Slovenia)'},
    {id: 'xog', name: 'Soga'},
    {id: 'xog-UG', name: 'Soga (Uganda)'},
    {id: 'so', name: 'Somali'},
    {id: 'so-DJ', name: 'Somali (Djibouti)'},
    {id: 'so-ET', name: 'Somali (Ethiopia)'},
    {id: 'so-KE', name: 'Somali (Kenya)'},
    {id: 'so-SO', name: 'Somali (Somalia)'},
    {id: 'es', name: 'Spanish'},
    {id: 'es-AR', name: 'Spanish (Argentina)'},
    {id: 'es-BO', name: 'Spanish (Bolivia)'},
    {id: 'es-CL', name: 'Spanish (Chile)'},
    {id: 'es-CO', name: 'Spanish (Colombia)'},
    {id: 'es-CR', name: 'Spanish (Costa Rica)'},
    {id: 'es-DO', name: 'Spanish (Dominican Republic)'},
    {id: 'es-EC', name: 'Spanish (Ecuador)'},
    {id: 'es-SV', name: 'Spanish (El Salvador)'},
    {id: 'es-GQ', name: 'Spanish (Equatorial Guinea)'},
    {id: 'es-GT', name: 'Spanish (Guatemala)'},
    {id: 'es-HN', name: 'Spanish (Honduras)'},
    {id: 'es-419', name: 'Spanish (Latin America)'},
    {id: 'es-MX', name: 'Spanish (Mexico)'},
    {id: 'es-NI', name: 'Spanish (Nicaragua)'},
    {id: 'es-PA', name: 'Spanish (Panama)'},
    {id: 'es-PY', name: 'Spanish (Paraguay)'},
    {id: 'es-PE', name: 'Spanish (Peru)'},
    {id: 'es-PR', name: 'Spanish (Puerto Rico)'},
    {id: 'es-ES', name: 'Spanish (Spain)'},
    {id: 'es-US', name: 'Spanish (United States)'},
    {id: 'es-UY', name: 'Spanish (Uruguay)'},
    {id: 'es-VE', name: 'Spanish (Venezuela)'},
    {id: 'sw', name: 'Swahili'},
    {id: 'sw-KE', name: 'Swahili (Kenya)'},
    {id: 'sw-TZ', name: 'Swahili (Tanzania)'},
    {id: 'sv', name: 'Swedish'},
    {id: 'sv-FI', name: 'Swedish (Finland)'},
    {id: 'sv-SE', name: 'Swedish (Sweden)'},
    {id: 'gsw', name: 'Swiss German'},
    {id: 'gsw-CH', name: 'Swiss German (Switzerland)'},
    {id: 'shi', name: 'Tachelhit'},
    {id: 'shi-Latn', name: 'Tachelhit (Latin)'},
    {id: 'shi-Latn-MA', name: 'Tachelhit (Latin, name:  Morocco)'},
    {id: 'shi-Tfng', name: 'Tachelhit (Tifinagh)'},
    {id: 'shi-Tfng-MA', name: 'Tachelhit (Tifinagh, name:  Morocco)'},
    {id: 'dav', name: 'Taita'},
    {id: 'dav-KE', name: 'Taita (Kenya)'},
    {id: 'ta', name: 'Tamil'},
    {id: 'ta-IN', name: 'Tamil (India)'},
    {id: 'ta-LK', name: 'Tamil (Sri Lanka)'},
    {id: 'twq', name: 'Tasawaq'},
    {id: 'twq-NE', name: 'Tasawaq (Niger)'},
    {id: 'te', name: 'Telugu'},
    {id: 'te-IN', name: 'Telugu (India)'},
    {id: 'teo', name: 'Teso'},
    {id: 'teo-KE', name: 'Teso (Kenya)'},
    {id: 'teo-UG', name: 'Teso (Uganda)'},
    {id: 'th', name: 'Thai'},
    {id: 'th-TH', name: 'Thai (Thailand)'},
    {id: 'bo', name: 'Tibetan'},
    {id: 'bo-CN', name: 'Tibetan (China)'},
    {id: 'bo-IN', name: 'Tibetan (India)'},
    {id: 'ti', name: 'Tigrinya'},
    {id: 'ti-ER', name: 'Tigrinya (Eritrea)'},
    {id: 'ti-ET', name: 'Tigrinya (Ethiopia)'},
    {id: 'to', name: 'Tongan'},
    {id: 'to-TO', name: 'Tongan (Tonga)'},
    {id: 'tr', name: 'Turkish'},
    {id: 'tr-TR', name: 'Turkish (Turkey)'},
    {id: 'uk', name: 'Ukrainian'},
    {id: 'uk-UA', name: 'Ukrainian (Ukraine)'},
    {id: 'ur', name: 'Urdu'},
    {id: 'ur-IN', name: 'Urdu (India)'},
    {id: 'ur-PK', name: 'Urdu (Pakistan)'},
    {id: 'uz', name: 'Uzbek'},
    {id: 'uz-Arab', name: 'Uzbek (Arabic)'},
    {id: 'uz-Arab-AF', name: 'Uzbek (Arabic, name:  Afghanistan)'},
    {id: 'uz-Cyrl', name: 'Uzbek (Cyrillic)'},
    {id: 'uz-Cyrl-UZ', name: 'Uzbek (Cyrillic, name:  Uzbekistan)'},
    {id: 'uz-Latn', name: 'Uzbek (Latin)'},
    {id: 'uz-Latn-UZ', name: 'Uzbek (Latin, name:  Uzbekistan)'},
    {id: 'vai', name: 'Vai'},
    {id: 'vai-Latn', name: 'Vai (Latin)'},
    {id: 'vai-Latn-LR', name: 'Vai (Latin, name:  Liberia)'},
    {id: 'vai-Vaii', name: 'Vai (Vai)'},
    {id: 'vai-Vaii-LR', name: 'Vai (Vai, name:  Liberia)'},
    {id: 'vi', name: 'Vietnamese'},
    {id: 'vi-VN', name: 'Vietnamese (Vietnam)'},
    {id: 'vun', name: 'Vunjo'},
    {id: 'vun-TZ', name: 'Vunjo (Tanzania)'},
    {id: 'cy', name: 'Welsh'},
    {id: 'cy-GB', name: 'Welsh (United Kingdom)'},
    {id: 'yav', name: 'Yangben'},
    {id: 'yav-CM', name: 'Yangben (Cameroon)'},
    {id: 'yo', name: 'Yoruba'},
    {id: 'yo-NG', name: 'Yoruba (Nigeria)'},
    {id: 'dje', name: 'Zarma'},
    {id: 'dje-NE', name: 'Zarma (Niger)'},
    {id: 'zu', name: 'Zulu'},
    {id: 'zu-ZA', name: 'Zulu (South Africa)'}
  ]
