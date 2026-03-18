// Flattened list for backward compatibility (e.g. FeaturesCarousel)
export const FEATURES = [
  { label: "Truth or Dare", image: "/tod-logo.jpeg" },
  { label: "Introduction", image: "/how-to-play.jpeg" },
  { label: "Add player", image: "/add-players.jpeg" },
  { label: "Categories", image: "/categories.jpeg" },
  { label: "Gameplay", image: "/gameplay1.jpeg" },
  { label: "Game Over", image: "/game-over.jpeg" },
] as const;

// Gallery sections – titles and labels use i18n keys (gallery.sections.*, gallery.labels.*)
export const GALLERY_SECTIONS = [
  {
    id: "introduction",
    titleKey: "introduction" as const,
    images: [
      { src: "/tod-logo.jpeg", labelKey: "truthOrDare" as const },
      { src: "/how-to-play.jpeg", labelKey: "howToPlay" as const },
      { src: "/choose-game-mode.jpeg", labelKey: "chooseGameMode" as const },
    ],
  },
  {
    id: "local-game",
    titleKey: "local-game" as const,
    images: [
      { src: "/add-players.jpeg", labelKey: "addPlayers" as const },
      { src: "/categories.jpeg", labelKey: "categories" as const },
      { src: "/shop1.jpeg", labelKey: "shop" as const },
      { src: "/gameplay1.jpeg", labelKey: "gameplay" as const },
      { src: "/gameplay2.jpeg", labelKey: "gameplay" as const },
      { src: "/questions-out.png", labelKey: "questions" as const },
      { src: "/buy-more-questions.png", labelKey: "buyMore" as const },
      { src: "/game-over.jpeg", labelKey: "gameOver" as const },
    ],
  },
  {
    id: "create-game",
    titleKey: "create-game" as const,
    images: [
      { src: "/create-game.jpeg", labelKey: "createGame" as const },
      { src: "/create-game-lobby.jpeg", labelKey: "gameLobby" as const },
      { src: "/categories.jpeg", labelKey: "categories" as const },
      { src: "/shop1.jpeg", labelKey: "shop" as const },
      { src: "/gameplay1.jpeg", labelKey: "gameplay" as const },
      { src: "/gameplay2.jpeg", labelKey: "gameplay" as const },
      { src: "/questions-out.png", labelKey: "questions" as const },
      { src: "/buy-more-questions.png", labelKey: "buyMore" as const },
      { src: "/game-over.jpeg", labelKey: "gameOver" as const },
    ],
  },
  {
    id: "join-game",
    titleKey: "join-game" as const,
    images: [
      { src: "/join-game.jpeg", labelKey: "joinGame" as const },
      { src: "/join-game-lobby.jpeg", labelKey: "gameLobby" as const },
      { src: "/gameplay1.jpeg", labelKey: "gameplay" as const },
      { src: "/gameplay2.jpeg", labelKey: "gameplay" as const },
      { src: "/game-over.jpeg", labelKey: "gameOver" as const },
    ],
  },
] as const;
