// Flattened list for backward compatibility (e.g. FeaturesCarousel)
export const FEATURES = [
  { label: "Truth or Dare", image: "/tod-logo.jpeg" },
  { label: "Introduction", image: "/how-to-play.jpeg" },
  { label: "Add player", image: "/add-players.jpeg" },
  { label: "Categories", image: "/categories.jpeg" },
  { label: "Gameplay", image: "/gameplay1.jpeg" },
  { label: "Game Over", image: "/game-over.jpeg" },
] as const;

// Gallery sections: Introduction, Local game, Create Game, Join Game
export const GALLERY_SECTIONS = [
  {
    id: "introduction",
    title: "Introduction",
    images: [
      { src: "/tod-logo.jpeg", label: "Truth or Dare" },
      { src: "/how-to-play.jpeg", label: "How to Play" },
      { src: "/choose-game-mode.jpeg", label: "Choose Game Mode" },
    ],
  },
  {
    id: "local-game",
    title: "Local game",
    images: [
      { src: "/add-players.jpeg", label: "Add Players" },
      { src: "/categories.jpeg", label: "Categories" },
      { src: "/gameplay1.jpeg", label: "Gameplay" },
      { src: "/gameplay2.jpeg", label: "Gameplay" },
      { src: "/questions-out.png", label: "Questions" },
      { src: "/buy-more-questions.png", label: "Buy More" },
      { src: "/game-over.jpeg", label: "Game Over" },
    ],
  },
  {
    id: "create-game",
    title: "Create Game",
    images: [
      { src: "/create-game.jpeg", label: "Create Game" },
      { src: "/create-game-lobby.jpeg", label: "Game Lobby" },
      { src: "/categories.jpeg", label: "Categories" },
      { src: "/questions-out.png", label: "Questions" },
      { src: "/buy-more-questions.png", label: "Buy More" },
      { src: "/game-over.jpeg", label: "Game Over" },
    ],
  },
  {
    id: "join-game",
    title: "Join Game",
    images: [
      { src: "/join-game.jpeg", label: "Join Game" },
      { src: "/join-game-lobby.jpeg", label: "Game Lobby" },
      { src: "/gameplay1.jpeg", label: "Gameplay" },
      { src: "/gameplay2.jpeg", label: "Gameplay" },
      { src: "/game-over.jpeg", label: "Game Over" },
    ],
  },
] as const;
