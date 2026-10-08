// CI config (.gitlab-ci.yml, Jenkinsfile, azure-pipelines.yml, .travis.yml):
// a stepped pipeline built with ../shapes.ts. Three stage nodes run from the
// top-left to the bottom-right, each joined to the next by an elbow bar that
// goes across then down, so the flow reads left to right in a staircase.
// Sized for 16 px: node diameter 6.6 units, bars 3 units wide, no holes.
// Distinct from `git` (vertical trunk with a branch curve) and `workflow`
// (play button in a rounded rect). No logo, fill only.
import { circle, stroke, union, type Point } from "../shapes.js";
import type { Glyph } from "../types.js";

const NODE_R = 3.3;
const BAR_W = 3;

const STAGES: Point[] = [
  [4.3, 4.3],
  [10, 10],
  [15.7, 15.7],
];

/** Elbow route between consecutive stages: across first, then down into the next node. */
function route(stages: Point[]): Point[] {
  const pts: Point[] = [stages[0]];
  for (let i = 1; i < stages.length; i++) {
    const [x, y] = stages[i];
    pts.push([x, stages[i - 1][1]], [x, y]);
  }
  return pts;
}

export const GLYPH: Glyph = {
  id: "ci",
  source: "custom: three-stage stepped pipeline",
  d: union(
    stroke(route(STAGES), BAR_W),
    ...STAGES.map(([x, y]) => circle(x, y, NODE_R)),
  ),
};
