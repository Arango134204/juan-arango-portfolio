type Point = [number, number]
type Segment = [Point, Point, Point]

const lerp = ([ax, ay]: Point, [bx, by]: Point, t: number): Point => [ax + (bx - ax) * t, ay + (by - ay) * t]
const line = (from: Point, to: Point): Segment => [lerp(from, to, 1 / 3), lerp(from, to, 2 / 3), to]
const point = ([x, y]: Point) => `${x.toFixed(2)} ${y.toFixed(2)}`

// Every segment is a cubic, even the straight ones, so a letter and its church piece share one path structure and can morph.
function toPath(start: Point, segments: Segment[]) {
  return `M${point(start)}` + segments.map((segment) => `C${segment.map(point).join(' ')}`).join('')
}

function linePath(points: Point[]) {
  return toPath(points[0], points.slice(1).map((to, index) => line(points[index], to)))
}

export const SIGBA_VIEWBOX = '0 0 320 200'

export type SigbaStroke = { id: string; letter: string; church: string }

// Letters sit between y 72 and 128; the church they become spans y 16 to 178, centered on x 160.
export const SIGBA_STROKES: SigbaStroke[] = [
  {
    id: 's-door',
    letter: toPath(
      [37, 117],
      [
        [[40, 124], [46, 128], [54, 128]],
        [[77, 128], [77, 99], [54, 99]],
        [[32, 99], [32, 72], [54, 72]],
        [[62, 72], [68, 76], [71, 83]],
      ],
    ),
    church: toPath(
      [146, 170],
      [
        line([146, 170], [146, 140]),
        [[146, 132.27], [152.27, 126], [160, 126]],
        [[167.73, 126], [174, 132.27], [174, 140]],
        line([174, 140], [174, 170]),
      ],
    ),
  },
  {
    id: 'i-cross',
    letter: linePath([[90, 72], [90, 128]]),
    church: linePath([[160, 16], [160, 46]]),
  },
  {
    id: 'g-window',
    letter: toPath(
      [155.8, 80.2],
      [
        [[150.55, 74.95], [143.43, 72], [136, 72]],
        [[120.54, 72], [108, 84.54], [108, 100]],
        [[108, 115.46], [120.54, 128], [136, 128]],
        [[151.46, 128], [164, 115.46], [164, 100]],
        line([164, 100], [140, 100]),
      ],
    ),
    church: toPath(
      [167.78, 76.22],
      [
        [[165.72, 74.16], [162.92, 73], [160, 73]],
        [[153.92, 73], [149, 77.92], [149, 84]],
        [[149, 90.08], [153.92, 95], [160, 95]],
        [[166.08, 95], [171, 90.08], [171, 84]],
        [[171, 81.08], [169.84, 78.28], [167.78, 76.22]],
      ],
    ),
  },
  {
    id: 'b-walls',
    letter: toPath(
      [182, 72],
      [
        line([182, 72], [182, 128]),
        line([182, 128], [198, 128]),
        [[220, 128], [220, 99], [196, 99]],
        [[214, 99], [214, 72], [194, 72]],
        line([194, 72], [182, 72]),
      ],
    ),
    church: linePath([[110, 97], [110, 170], [160, 170], [210, 170], [210, 97], [210, 97]]),
  },
  {
    id: 'a-roof',
    letter: linePath([[236, 128], [260, 72], [284, 128]]),
    church: linePath([[100, 106], [160, 52], [220, 106]]),
  },
  {
    id: 'a-ground',
    letter: linePath([[245, 108], [275, 108]]),
    church: linePath([[92, 178], [228, 178]]),
  },
]

export const SIGBA_CROSSBAR = linePath([[151, 26], [169, 26]])

// Pieces morph bottom-up, so the church reads as being built: ground, walls, roof, door, window, cross.
export const SIGBA_BUILD_ORDER = ['a-ground', 'b-walls', 'a-roof', 's-door', 'g-window', 'i-cross']

const CHURCH_CENTER: Point = [160, 97]
const BADGE_CHURCH_SCALE = 0.5

// Paths only contain x/y pairs, so numbers alternate between the two axes.
function scalePath(d: string, scale: number, [cx, cy]: Point) {
  let index = 0
  return d.replace(/-?\d+(\.\d+)?/g, (value) => {
    const center = index++ % 2 === 0 ? cx : cy
    return (center + (Number(value) - center) * scale).toFixed(2)
  })
}

// The header badge keeps the letters at full size and shrinks the church so both fit the same 3:1 box.
export const SIGBA_BADGE_VIEWBOX = '25 54 270 90'
export const SIGBA_BADGE_STROKES: SigbaStroke[] = SIGBA_STROKES.map((stroke) => ({
  ...stroke,
  church: scalePath(stroke.church, BADGE_CHURCH_SCALE, CHURCH_CENTER),
}))
export const SIGBA_BADGE_CROSSBAR = scalePath(SIGBA_CROSSBAR, BADGE_CHURCH_SCALE, CHURCH_CENTER)
