# Éléments retirés du menu

Ce fichier documente les éléments qui ont été temporairement retirés du menu et qui pourront être réintégrés plus tard.

## Menu de navigation

### Éléments retirés

1. **Solutions** (`t.solutions`)
   - **Emplacement original** : Menu desktop (header) et menu mobile
   - **Type** : Menu déroulant avec sous-menu "À venir"
   - **Fichiers modifiés** :
     - `app/components/TranslatedHeader.tsx` (lignes 23-32 supprimées)
     - `app/components/MobileMenu.tsx` (lien supprimé)
   - **Traductions** :
     - FR: "Solutions"
     - EN: "Solutions"
   - **Note** : Le contenu était "À venir", donc retiré temporairement

2. **À propos** (`t.about`)
   - **Emplacement original** : Menu desktop (header) et menu mobile
   - **Type** : Menu déroulant avec sous-menu "À venir"
   - **Fichiers modifiés** :
     - `app/components/TranslatedHeader.tsx` (lignes 34-42 supprimées)
     - `app/components/MobileMenu.tsx` (lien supprimé)
   - **Traductions** :
     - FR: "À propos"
     - EN: "About"
   - **Note** : Le contenu était "À venir", donc retiré temporairement

## État actuel du menu

### Menu desktop
- Logo (lien vers accueil)
- Sélecteur de langue
- Bouton "Nous contacter" / "Contact us" (ouvre le modal de contact)

### Menu mobile
- Menu hamburger avec :
  - Sélecteur de langue
  - Bouton "Nous contacter" / "Contact us" (ouvre le modal de contact)

## Pour réintégrer plus tard

1. **Solutions** :
   - Ajouter un `<details>` dans `app/components/TranslatedHeader.tsx` dans la section `<nav>`
   - Ajouter un `<Link>` dans `app/components/MobileMenu.tsx` dans la section du menu
   - Les traductions existent déjà dans `app/lib/translations.ts`

2. **À propos** :
   - Ajouter un `<details>` dans `app/components/TranslatedHeader.tsx` dans la section `<nav>`
   - Ajouter un `<Link>` dans `app/components/MobileMenu.tsx` dans la section du menu
   - Les traductions existent déjà dans `app/lib/translations.ts`

3. **Se connecter** :
   - Ajouter un `<Link>` dans `app/components/TranslatedHeader.tsx` dans la section desktop avec l'icône `/icons/userConnect.svg`
   - Ajouter un `<Link>` avec l'icône `/icons/userConnectMobile.svg` dans la section mobile
   - Les traductions existent déjà dans `app/lib/translations.ts` (`t.login`)

3. **Se connecter** / **Login** (`t.login`)
   - **Emplacement original** : Menu desktop (header) et menu mobile (icône utilisateur)
   - **Type** : Bouton avec icône utilisateur
   - **Fichiers modifiés** :
     - `app/components/TranslatedHeader.tsx` (bouton desktop et icône mobile supprimés)
   - **Traductions** :
     - FR: "Se connecter"
     - EN: "Login"
   - **Icônes utilisées** :
     - Desktop: `/icons/userConnect.svg`
     - Mobile: `/icons/userConnectMobile.svg`
   - **Note** : Retiré temporairement, pas besoin pour l'instant

4. **Inscrivez-vous** / **Sign up** (`t.signUp`)
   - **Emplacement original** : Section "Besoin d'une ressource" sur la page d'accueil
   - **Type** : Bouton avec texte "• Professionnels •" en dessous
   - **Fichiers modifiés** :
     - `app/page.tsx` (bouton et texte supprimés)
   - **Traductions** :
     - FR: "Inscrivez-vous"
     - EN: "Sign up"
   - **Note** : Retiré temporairement, pas besoin pour l'instant

5. **Suivre le processus** / **Follow the process** (`t.followProcess`)
   - **Emplacement original** : Section "Vous êtes en transaction ?" / "Are you in a transaction?" sur la page d'accueil
   - **Type** : Bouton avec icône
   - **Fichiers modifiés** :
     - `app/page.tsx` (bouton supprimé)
   - **Traductions** :
     - FR: "Suivre le processus"
     - EN: "Follow the process"
   - **Icône utilisée** : `/icons/suivreProcess.svg`
   - **Note** : Retiré temporairement, pas besoin pour l'instant

## Date de retrait

- **Date** : 2025-01-XX
- **Raison** : Pas besoin pour l'instant, contenu "À venir" non pertinent

