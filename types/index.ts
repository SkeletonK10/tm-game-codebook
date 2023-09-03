import { Tag, TileType, Version, CardPool } from '../enum';

export type PlayerID = number;

export interface Resource {
  mc?: number;
  steel?: number;
  titanium?: number;
  plant?: number;
  energy?: number;
  heat?: number;
}

export interface Production {
  mc?: number;
  steel?: number;
  titanium?: number;
  plant?: number;
  energy?: number;
  heat?: number;
}

export interface Effect {
  player?: PlayerID;
  value: {
    resource?: Resource,
    production?: Production,
    card?: number;
    // TODO: and more...
  }
};

export interface Tile {
  owner?: PlayerID;
  type: TileType;
}

export interface Place {
  constraint: (tile: Tile) => boolean;
  tile?: Tile;
  reward?: Effect;
}

export interface Milestone {
  owner?: PlayerID;
  constraint: (c: Circumstance) => boolean;
}

export interface Award {
  owner?: PlayerID;
  evaluation: (c: Circumstance) => PlayerID[];
}

export interface Map {
  places: Place[];
  milestones: Milestone[];
  awards: Award[];
}

export interface Card {
  id: string;
  name: string;
  cost: number;
  tags: Tag[];
  constraint: (c: Circumstance, use: Action) => boolean;
  vp: (c: Circumstance) => number;
  token?: number;
  effects?: (c: Circumstance, use: Action) => Effect[];
};

export type Corp = Card;

export interface Player {
  id: PlayerID;
  tr: number;
  resource: Resource;
  production: Production;
  corp: Corp;
  hand: CardPool[];
  playedCards: CardPool[];
  passives: CardPool[];
}

export interface GlobalParameter {
  temperature: number;
  oxygen: number;
  ocean: number;
  // venus?: number;
}

export interface Circumstance {
  players: Player[];
  map: Map;
  globalParameter: GlobalParameter;
  turn: PlayerID;
};

export interface Action {
  // TODO: Action type specification
}

export type Shuffle = number[];

export interface GameShuffle {
  card: Shuffle[];             // Can be shuffled more than once in one game
  corp: Shuffle;
  // prelude?: Shuffle;
  // colony?: Shuffle;
  // globalEvent?: Shuffle;
}

export interface Game {
  version: Version;
  shuffle: GameShuffle;
  history: Circumstance[];
};