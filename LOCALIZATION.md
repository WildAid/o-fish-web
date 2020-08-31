Localization information for the o-fish-web project

Localization is in src/helpers/i18n/

Every translation has a directory with its language code, and a translation.json file. e.g.:
src/helpers/i18n/en/translation.json
src/helpers/i18n/es-419/translation.json
src/helpers/i18n/fr/translation.json

When adding a NEW language, you will need to add it in 3 places in src/helpers/i18n/index.js:
1. Import it, e.g.:
` import en from './en/translation';`
` import fr from './fr/translation';`

2. Update the "default to en" to NOT include the new language:
`if (!(lang.includes('fr') || lang.includes('es'))) {`
`  lang = 'en';`
`}`
 
3. You will need to add it into the resources, e.g.:
`const i18nOptions = {`
`   resources: {`
`     en: {`
`       translation: en`
`    },`
`    fr: {`
`      translation: fr`
`     }`
`   }`
` };`



The format is a json document where the variable name is in ALL CAPS and in quotes, e.g.:
`{`
`  "LOGIN_PAGE": {`
`    "LOGIN": "Connexion",`
`    "FORGOT_PASSWORD": "Mot de passe oublié?",`
`    "EMAIL_USERNAME": "Email/Identifiant:",`
`    "PASSWORD": "Mot de passe"`

