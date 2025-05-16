export interface Point {
  x: number;
  y: number;
}

export interface BoxPoints extends Point {
  w: number;
  h: number;
}

export interface Box extends BoxPoints {
  type: string;
}

export interface Polygon {
  type: string;
  points: Point[];
}

export type Annotations = Box | Polygon;

export type Tool = 'box' | 'polygon';

export interface Scale {
  scaleX: number;
  scaleY: number;
}
