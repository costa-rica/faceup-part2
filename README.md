# faceup-part 2
La Capsule (#lacapsule)
![sample.gif](docs/faceup-part2.gif)

L’objectif d’aujourd’hui est d’implémenter une caméra fonctionnelle capable de prendre des photos qui pourront être visionnées depuis l’écran galerie.


## installer
1. Creetion de projet
- utiliser: `npx create-expo-app --template`
- choisir: "Blank (Typescript)

2. Install packages
- react native screens
```
yarn add @react-navigation/native@6
expo install react-native-screens react-native-safe-area-context
```
- Stack navigation:
`yarn add @react-navigation/native-stack@6`
- Tab navigation:
`yarn add @react-navigation/bottom-tabs@6`
- Redux
`yarn add react-redux @reduxjs/toolkit`

## Notes de Code en particular
- declare le payload dans le redux
- initialiser le camera, flash, et sauvgaurde photos
- useRef: prends le methods d'une baliese pour utiliser d'aillieurs
    - `import { useRef } from 'react';`
- useIsFocused: flaggé quand le composant est afficher
    - utiliser pour la camera pour ne pas tourner tout le temps quand le composant n'est pas la.
    - `import { useIsFocused } from '@react-navigation/native';`