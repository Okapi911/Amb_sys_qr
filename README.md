# [Amb_sys_qr](https://github.com/Okapi911/Amb_sys_qr/edit/main/README.md)

## Présentation du projet

QR TAG est une application Android développée dans le cadre du [cours d'Ambiant Systems du département informatique de l'école des Mines de Nancy](https://mines-nancy.univ-lorraine.fr/cours/ambient-systems-iss8af/).

Elle se présente sous la forme d'un jeu au cours duquel après s'être connectés, les utilisateurs peuvent ajuster leur profil, produire un QR code unique qui les identifie, et scanner les QR codes d'autres joueurs dans le cadre d'un système se score semblable à celui d'un lasergame. 

L'avantage d'utiliser des QR codes est que cette technologie est accessible à tous les modèles Android, et la précision des outils de lecture et de génération est bien plus précise que pour un faisceau laser. 

En revanche, du fait d'un manque de ressources, notre application ne propose pas encore d'objet connecté associé qui permettrait d'afficher son propre QR code pour devenir une cible dans le même temps où l'on cherche à scanner les autres participants.

## Structure du dépôt git et structure finale du projet

Ce répertoire git est divisé entre deux sous-dossiers : AmbDB et AmbQR. Néanmoins on peut dès à présent noter que la version actuelle du projet n'exploite que le répertoire AmbQR dédié à l'application. AmbDB correspond à une tentative infructueuse en début de projet d'utiliser un serveur Heroku avec notamment l'add-on postgres pour la gestion du serveur et du back-end assurant les services de l'application. 

Toutefois suite à des problèmes de compatibilité entre les outils Heroku et les frameworks React Natif, nous avons abandonné cette première architecture pour utiliser plutôt les services de database de Supabase. Ils nous permettent d'assurer l'authentification des utilisateurs (connexion et inscription).

L'application a été développée en utilisant le framework Expo pour le développement et Expo Go pour la phase de tests. Ce framework React Natif permet de développer une application compatible avec la plupart des Android et produits IOS, mais aussi accessible sur le web. Cependant nous avons très vite abandonné la compatibilité avec les IOS (pour lesquels nous ne pouvions pas effectuer de tests puisque nous n'en possédons pas) et le web (car la lecture de QR code y aurait nécessité une implémentation très différente). Ainsi si vous souhaitez clôner ce répertoire, pour accéder à l'application il faudra utiliser la commande 


<div align="center">npx expo start --tunnel</div>


et scanner le QR code avec Expo Go après s'être connecté à Expo Cli depuis l'ordinatieur où aura effectué un 


<div align="center">npm install </div>

 
La lecture et la génération de QR codes a été mise en place à partir des librairies 'react-native-qrcode-svg' et 'expo-barcode-scanner' ainsi qu'en accédant aux permissions de l'appareil mobile pour demander l'accès à la caméra de l'appareil.

## Répartition des tâches au sein du groupe

- Front End et accès aux outils Android --> Lucas Kloubert
- Mise en place d'un serveur Heroku (inutilisé dans le build final)   --> Pierre Anxionnat
- Authentification avec Supabase (confirmation par mail) --> Pierre Anxionnat et Lucas Kloubert
- Profil utilisateur modifiable avec Supabase    --> Lucas Kloubert
- Tests de l'application et debug   --> Lucas Kloubert
- Appels à la database lors d'une lecture de QR code --> Pierre Anxionnat
- Support de présentation (format pptx)   --> Lucas Kloubert et Pierre Anxionnat
