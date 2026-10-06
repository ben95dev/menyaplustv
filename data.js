
/* ===== CONFIGURATION : à modifier ===== */
const STREAM_URL = "";            // lien du direct (.m3u8) fourni par votre plateforme de streaming
const CONTACT_EMAIL = "contact@menyaplustv.com";
const CONTACT_ENDPOINT = "";      // service qui reçoit le formulaire (ex. Formspree)

const SECTORS = [
    { id: "politique", name: "Politique et gouvernance", d: "Institutions, élections, justice, droits du citoyen." },
    { id: "economie", name: "Économie et entrepreneuriat", d: "Emploi, commerce, agriculture, startups et marchés." },
    { id: "education", name: "Éducation et jeunesse", d: "Écoles, universités, orientation, bourses et concours." },
    { id: "sante", name: "Santé et bien-être", d: "Prévention, conseils de médecins, alertes sanitaires." },
    { id: "culture", name: "Culture et traditions", d: "Patrimoine, musique, danse, artisanat et histoire." },
    { id: "societe", name: "Société et famille", d: "Vie familiale, cohésion sociale, religion, diaspora." },
    { id: "environnement", name: "Environnement et climat", d: "Eau, reboisement, énergies, météo et biodiversité." },
    { id: "sport", name: "Sport et divertissement", d: "Matchs en direct, musique, humour, séries et jeux." }
];
/* Exemples : remplacez par vos vraies vidéos (lien = fichier ou page de la vidéo) */
const VIDEOS = [
    { s: "politique", t: "Le débat de la semaine", d: "45 min", u: "#" },
    { s: "economie", t: "Entreprendre au pays", d: "26 min", u: "#" },
    { s: "education", t: "Orientation : choisir sa filière", d: "30 min", u: "#" },
    { s: "sante", t: "Consultation : prévenir le paludisme", d: "35 min", u: "#" },
    { s: "culture", t: "Sur les pas des tambourinaires", d: "52 min", u: "#" },
    { s: "societe", t: "Parents et adolescents : se parler", d: "40 min", u: "#" },
    { s: "environnement", t: "Reboiser nos collines", d: "24 min", u: "#" },
    { s: "sport", t: "Magazine sportif du week-end", d: "38 min", u: "#" }
];
const S = Object.fromEntries(SECTORS.map(x => [x.id, x.name]));
const GRID = {
    sem: [["06h-08h", "Matinale : infos, revue de presse, météo"], ["08h-10h", "Éducation et jeunesse"], ["10h-12h", "Santé (lun., mer.) · Environnement (mar., jeu.) · Société (ven.)"], ["12h-13h", "Journal de midi"], ["13h-15h", "Économie et entrepreneuriat"], ["15h-17h", "Culture et traditions (lun., mer., ven.) · Rediffusions"], ["17h-19h", "Sport et divertissement"], ["19h-20h", "Journal du soir"], ["20h-21h30", "Débat politique (lun., mer., jeu.) · Talk-show société (mar., ven.)"], ["21h30-23h", "Séries, films, humour"], ["23h-06h", "Rediffusions et musique"]],
    sam: [["06h-08h", "Matinale week-end"], ["08h-10h", "Éducation et jeunesse"], ["10h-12h", "Magazine santé et bien-être"], ["12h-13h", "Journal de midi"], ["13h-15h", "Environnement et climat"], ["15h-17h", "Sport en direct"], ["17h-19h", "Culture et traditions"], ["19h-20h", "Journal du soir"], ["20h-21h30", "Concert, spectacle ou festival"], ["21h30-23h", "Film ou soirée musicale"], ["23h-06h", "Rediffusions et musique"]],
    dim: [["06h-08h", "Spiritualité : émissions religieuses"], ["08h-10h", "Spiritualité et famille"], ["10h-12h", "Société et famille"], ["12h-13h", "Journal de midi"], ["13h-15h", "Rediffusion des meilleures émissions"], ["15h-17h", "Sport en direct"], ["17h-19h", "Documentaires : culture, environnement"], ["19h-20h", "Journal du soir"], ["20h-21h30", "Bilan de la semaine"], ["21h30-23h", "Film ou série"], ["23h-06h", "Rediffusions et musique"]]
};
