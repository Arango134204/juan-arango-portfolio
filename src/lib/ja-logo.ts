type Point = [number, number];
type Segment = [Point, Point, Point];

const lerp = ([ax, ay]: Point, [bx, by]: Point, t: number): Point => [ax + (bx - ax) * t, ay + (by - ay) * t];
const line = (from: Point, to: Point): Segment => [lerp(from, to, 1 / 3), lerp(from, to, 2 / 3), to];
const point = ([x, y]: Point) => `${x.toFixed(2)} ${y.toFixed(2)}`;

// Every segment is a cubic, even the straight ones, so a letter and its logo piece share one path structure and can morph.
function toPath(start: Point, segments: Segment[]) {
  return `M${point(start)}` + segments.map((segment) => `C${segment.map(point).join(" ")}`).join("");
}

function linePath(points: Point[]) {
  return toPath(points[0], points.slice(1).map((to, index) => line(points[index], to)));
}

export const JA_VIEWBOX = "0 0 320 200";
export const JA_MARK_VIEWBOX = "80 46 160 108";

export type JaStroke = { id: string; letter: string; mark: string };

// Letters sit between y 60 and 140; the [>_] mark they become spans y 56 to 144, centered on x 160.
export const JA_STROKES: JaStroke[] = [
  {
    id: "j-bracket",
    letter: toPath(
      [122, 60],
      [
        line([122, 60], [122, 112]),
        [[122, 130], [112, 140], [100, 140]],
        [[88, 140], [80, 132], [78, 120]],
      ],
    ),
    mark: linePath([[110, 56], [90, 56], [90, 144], [110, 144]]),
  },
  {
    id: "dot-bracket",
    letter: linePath([[144, 136], [145.33, 136], [146.67, 136], [148, 136]]),
    mark: linePath([[210, 56], [230, 56], [230, 144], [210, 144]]),
  },
  {
    id: "a-chevron",
    letter: linePath([[170, 140], [201, 60], [232, 140]]),
    mark: linePath([[124, 74], [154, 100], [124, 126]]),
  },
  {
    id: "a-cursor",
    letter: linePath([[182, 112], [220, 112]]),
    mark: linePath([[168, 126], [198, 126]]),
  },
];

export const JA_CURSOR_ID = "a-cursor";

// Brackets close first, then the prompt and its cursor land between them.
export const JA_BUILD_ORDER = ["j-bracket", "dot-bracket", "a-chevron", "a-cursor"];
