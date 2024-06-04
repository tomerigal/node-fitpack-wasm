import test from "node:test";
import { strict as assert } from "node:assert";
import { splrep, splev, splev_uniform } from "./pkg/node-esm.js";

test("simple_spline_interpolation", () => {
  let x = [0.5, 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0];
  let y = [
    0.0, 1.0, 4.0, 9.0, 16.0, 25.0, 36.0, 49.0, 64.0, 81.0, 100.0, 121.0,
  ];
  let { t, c, k } = splrep(
    x,
    y,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined
  );
  let t_ref = new Float64Array([
    0.5, 0.5, 0.5, 0.5, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 11.0, 11.0,
    11.0, 11.0,
  ]);
  let c_ref = new Float64Array([
    -2.6611993517399935e-17, 9.003206314293517e-1, 2.7876063631714838,
    8.6767816283663706, 1.5663956371192338e1, 2.4667392886864288e1,
    3.5666472081350541e1, 4.8666718787733515e1, 6.3666652767715512e1,
    8.6333342599300764e1, 1.0633332870034963e2, 1.21e2, 0.0, 0.0, 0.0, 0.0,
  ]);
  assert.deepEqual(t, t_ref);
  assert.deepEqual(c, c_ref);
  assert.equal(k, 3);
});

test("simple_spline_fit", () => {
  let x = [0.5, 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0];
  let y = [
    0.0, 1.0, 4.0, 9.0, 16.0, 25.0, 36.0, 49.0, 64.0, 81.0, 100.0, 121.0,
  ];
  let { t, c, k } = splrep(
    x,
    y,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    0.5,
    undefined,
    undefined,
    undefined,
    undefined
  );
  let t_ref = new Float64Array([0.5, 0.5, 0.5, 0.5, 11.0, 11.0, 11.0, 11.0]);
  let c_ref = new Float64Array([
    9.6048864019998764e-2, 3.9719628633913779, 4.3868995123976298e1,
    1.2101960437915093e2, 0.0, 0.0, 0.0, 0.0,
  ]);
  assert.deepEqual(t, t_ref);
  assert.deepEqual(c, c_ref);
  assert.equal(k, 3);
});

test("spline_interpolation_with_weights", () => {
  let x = [0.5, 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0];
  let y = [
    0.0, 1.0, 4.0, 9.0, 16.0, 25.0, 36.0, 49.0, 64.0, 81.0, 100.0, 121.0,
  ];
  let w = [0.5, 1.0, 2.0, 1.0, 2.0, 3.0, 1.0, 0.1, 8.0, 0.2, 3.0, 2.0];
  let { t, c, k } = splrep(
    x,
    y,
    w,
    undefined,
    undefined,
    undefined,
    undefined,
    0.0,
    undefined,
    undefined,
    undefined,
    undefined
  );
  let t_ref = new Float64Array([
    0.5, 0.5, 0.5, 0.5, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 11.0, 11.0,
    11.0, 11.0,
  ]);
  let c_ref = new Float64Array([
    3.5816830069903035e-17, 9.0032063142935159e-1, 2.7876063631714838,
    8.6767816283663706, 1.5663956371192336e1, 2.4667392886864263e1,
    3.5666472081350641e1, 4.8666718787733217e1, 6.3666652767715597e1,
    8.6333342599300707e1, 1.0633332870034965e2, 1.21e2, 0.0, 0.0, 0.0, 0.0,
  ]);
  assert.deepEqual(t, t_ref);
  assert.deepEqual(c, c_ref);
  assert.equal(k, 3);
});

test("spline_fit_with_weights", () => {
  let x = [0.5, 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0];
  let y = [
    0.0, 1.0, 4.0, 9.0, 16.0, 25.0, 36.0, 49.0, 64.0, 81.0, 100.0, 121.0,
  ];
  let w = [0.5, 1.0, 2.0, 1.0, 2.0, 3.0, 1.0, 0.1, 8.0, 0.2, 3.0, 2.0];
  let { t, c, k } = splrep(
    x,
    y,
    w,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined
  );
  let t_ref = new Float64Array([0.5, 0.5, 0.5, 0.5, 11, 11, 11, 11]);
  let c_ref = new Float64Array([
    0.20514750870201512, 3.798528924587932, 43.97864868696865,
    121.00371905567053, 0.0, 0.0, 0.0, 0.0,
  ]);
  assert.deepEqual(t, t_ref);
  assert.deepEqual(c, c_ref);
  assert.equal(k, 3);
});

test("spline_interpolation_with_specified_knots", () => {
  let x = [0.5, 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0];
  let y = [
    0.0, 1.0, 4.0, 9.0, 16.0, 25.0, 36.0, 49.0, 64.0, 81.0, 100.0, 121.0,
  ];
  let _t = [2.5, 3.5, 4.5];
  let { t, c, k } = splrep(
    x,
    y,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    _t,
    undefined,
    undefined,
    undefined
  );
  let t_ref = new Float64Array([
    0.5, 0.5, 0.5, 0.5, 2.5, 3.5, 4.5, 11.0, 11.0, 11.0, 11.0,
  ]);
  let c_ref = new Float64Array([
    4.3456188984254242e-3, 1.1369046801251863, 3.808976615325006,
    1.1942469486307893e1, 3.455410990639384e1, 7.3350195466184161e1,
    1.2099781223876728e2, 0.0, 0.0, 0.0, 0.0,
  ]);
  assert.deepEqual(t, t_ref);
  assert.deepEqual(c, c_ref);
  assert.equal(k, 3);
});

test("spline_fit_limits_knots_weights", () => {
  let x = [0.5, 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0];
  let y = [
    0.0, 1.0, 4.0, 9.0, 16.0, 25.0, 36.0, 49.0, 64.0, 81.0, 100.0, 121.0,
  ];
  let w = [0.5, 1.0, 2.0, 1.0, 2.0, 3.0, 1.0, 0.1, 8.0, 0.2, 3.0, 2.0];
  let _t = [2.5, 3.5, 4.5];
  let { t, c, k } = splrep(
    x,
    y,
    w,
    0.0,
    16.0,
    undefined,
    undefined,
    undefined,
    _t,
    undefined,
    undefined,
    undefined
  );
  let t_ref = new Float64Array([
    0.0, 0.0, 0.0, 0.0, 2.5, 3.5, 4.5, 16.0, 16.0, 16.0, 16.0,
  ]);
  let c_ref = new Float64Array([
    -0.6664597168700137, 0.3028630978060425, 2.794512609590209,
    11.928341312803433, 47.88510264536114, 133.3993745547405,
    255.87891800341376, 0.0, 0.0, 0.0, 0.0,
  ]);

  assert.deepEqual(t, t_ref);
  assert.deepEqual(c, c_ref);
  assert.equal(k, 3);
});

test("spline_interpolation_fifth_order", () => {
  let x = [0.5, 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0];
  let y = [
    0.0, 1.0, 4.0, 9.0, 16.0, 25.0, 36.0, 49.0, 64.0, 81.0, 100.0, 121.0,
  ];
  let { t, c, k } = splrep(
    x,
    y,
    undefined,
    undefined,
    undefined,
    5,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined
  );
  let t_ref = new Float64Array([
    0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 3, 4, 5, 6, 7, 8, 11, 11, 11, 11, 11, 11,
  ]);
  let c_ref = new Float64Array([
    -3.1525642173709244e-17, 9.618723358751512e-1, 2.2151448816620882,
    5.9694686107264907, 1.2784814311098723e1, 2.4504570963883427e1,
    3.5498043000268858e1, 5.3701926216065736e1, 7.2898267193716578e1,
    9.1401339513703903e1, 1.0779928004881573e2, 1.21e2, 0.0, 0.0, 0.0, 0.0, 0.0,
    0.0,
  ]);
  assert.deepEqual(t, t_ref);
  assert.deepEqual(c, c_ref);
  assert.equal(k, 5);
});

test("simple_spline_int_evaluation", () => {
  let x = [0.5, 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0];
  let y = [
    0.0, 1.0, 4.0, 9.0, 16.0, 25.0, 36.0, 49.0, 64.0, 81.0, 100.0, 121.0,
  ];
  let { t, c, k } = splrep(
    x,
    y,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined
  );
  let x_ev = [1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0];
  let y_ev = splev(t, c, k, x_ev, 0);
  let y_ev_ref = new Float64Array([
    1.0, 2.288675134602655, 4.0, 6.239637028890708, 9.0, 12.252776749834513,
    16.0,
  ]);
  assert.deepEqual(y_ev, y_ev_ref);
});

test("simple_spline_fit_evaluation", () => {
  let x = [0.5, 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0];
  let y = [
    0.0, 1.0, 4.0, 9.0, 16.0, 25.0, 36.0, 49.0, 64.0, 81.0, 100.0, 121.0,
  ];
  let { t, c, k } = splrep(
    x,
    y,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    0.5,
    undefined,
    undefined,
    undefined,
    undefined
  );

  let x_ev = [1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0];
  let y_ev = splev(t, c, k, x_ev, 0);
  let y_ev_ref = new Float64Array([
    0.8949255652788439, 2.1846839913312492, 3.9661226253216117,
    6.240039950394328, 9.007234449693795, 12.268504606364406,
    16.024648903550563,
  ]);
  assert.deepEqual(y_ev, y_ev_ref);
});

test("spline_interpolation_evaluation_uniform", () => {
  let x = [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0];
  let y = [1.0, 4.0, 7.0, 18.0, 22.0, 41.0, 45.0, 63.0, 80.0, 99.0, 119.0];
  let { t, c, k } = splrep(
    x,
    y,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined
  );
  let x_ev = [1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 7.5, 10.5, 10.9, 11.0];
  let y_ev = new Float64Array(x_ev.length);
  for (let i = 0; i < x_ev.length; i++) {
    y_ev[i] = splev_uniform(t, c, k, x_ev[i]);
  }
  let y_ev_ref = new Float64Array([
    1.0000000000000002, 3.636971879602356, 4.000000000000001, 4.363028120397647,
    7.000000000000003, 12.910915638807067, 17.999999999999996,
    52.58594325294551, 109.1626415224595, 117.08616453424153, 119.0,
  ]);
  assert.deepEqual(y_ev, y_ev_ref);
});
