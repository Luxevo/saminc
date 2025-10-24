export const translations = {
  fr: {
    // Header
    login: "Se connecter",
    signup: "S'inscrire",
    contactUs: "Nous contacter",
    
    // Hero section
    heroTitle: "Obtenez un service",
    heroSubtitle: "Nous vous connectons avec les meilleurs professionnels pour vos besoins immobiliers",
    getStarted: "Démarrer un projet",
    exploreOffers: "Explorer les offres",
    
    // Animated words
    need: "Besoin d'",
    animatedWords: [
      { article: "un", word: "inspecteur" },
      { article: "une", word: "ressource" },
      { article: "un", word: "professionnel" },
      { article: "un", word: "conseil" },
      { article: "un", word: "financement" }
    ],
    
    // Mission section
    ourMission: "Notre mission",
    missionTitle: "Aider les gens.",
    missionText: "Permettre à chacun de réaliser ce dont ils ont véritablement besoin; les accompagner dans cette direction avec soin, et harmoniser.",
    ourValues: "Nos valeurs",
    valuesTitle: "La transparence, la bienveillance et la compétence.",
    valuesText: "Notre modèle est fondé sur la transparence, notre système permet à nos clients d'avoir une vision claire, nos conseils et recommandations sont basés et adaptés selon les besoins et nous dirigeons les transactions, avec compétence.",
    motivationValues: "Quelques-uns de nos valeurs de motivation",
    motivationText: "L'innovation, La créativité, L'authenticité, Persévérance, L'éthique. L'envie de contribuer et aidez les gens.",
    innovation: "L'innovation",
    creativity: "La créativité",
    authenticity: "L'authenticité",
    perseverance: "Persévérance",
    ethics: "L'éthique",
    
    // Transaction section
    transactionTitle: "Vous êtes en transaction ?",
    transactionText: "Obtenez l'accompagnement personnalisé dont vous avez besoin pour réussir votre transaction immobilière.",
    followProcess: "Suivre le processus",
    
    // Resource section
    resourceTitle: "Besoin d'",
    resourceText: "L'envie de contribuer et aidez les gens.",
    connectYou: "On vous connecte",
    signUp: "Inscrivez-vous",
    
    // Footer
    siteMap: "Plan du site",
    contact: "Contact",
    about: "À propos",
    services: "Services",
    solutions: "Solutions",
    privacy: "Politique de confidentialité",
    terms: "Conditions d'utilisation",
    linkedin: "LinkedIn"
  },
  
  en: {
    // Header
    login: "Login",
    signup: "Sign up",
    contactUs: "Contact us",
    
    // Hero section
    heroTitle: "Get a service",
    heroSubtitle: "We connect you with the best professionals for your real estate needs",
    getStarted: "Start a project",
    exploreOffers: "Explore offers",
    
    // Animated words
    need: "Need ",
    animatedWords: [
      { article: "an", word: "inspector" },
      { article: "a", word: "resource" },
      { article: "a", word: "professional" },
      { article: "a", word: "consultant" },
      { article: "a", word: "financing" }
    ],
    
    // Mission section
    ourMission: "Our mission",
    missionTitle: "Help people.",
    missionText: "Enable everyone to achieve what they truly need; accompany them in this direction with care, and harmonize.",
    ourValues: "Our values",
    valuesTitle: "Transparency, benevolence and competence.",
    valuesText: "Our model is based on transparency, our system allows our clients to have a clear vision, our advice and recommendations are based and adapted according to needs and we direct transactions, with competence.",
    motivationValues: "Some of our motivational values",
    motivationText: "Innovation, Creativity, Authenticity, Perseverance, Ethics. The desire to contribute and help people.",
    innovation: "Innovation",
    creativity: "Creativity",
    authenticity: "Authenticity",
    perseverance: "Perseverance",
    ethics: "Ethics",
    
    // Transaction section
    transactionTitle: "Are you in a transaction?",
    transactionText: "Get the personalized support you need to succeed in your real estate transaction.",
    followProcess: "Follow the process",
    
    // Resource section
    resourceTitle: "Need ",
    resourceText: "The desire to contribute and help people.",
    connectYou: "We connect you",
    signUp: "Sign up",
    
    // Footer
    siteMap: "Site map",
    contact: "Contact",
    about: "About",
    services: "Services",
    solutions: "Solutions",
    privacy: "Privacy policy",
    terms: "Terms of use",
    linkedin: "LinkedIn"
  }
};

export type Language = 'fr' | 'en';
export type TranslationKey = keyof typeof translations.fr;
