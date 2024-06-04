use rusty_fitpack;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct SplrepOutput {
    t: Vec<f64>,
    c: Vec<f64>,
    k: usize,
}

#[wasm_bindgen]
impl SplrepOutput {
    #[wasm_bindgen(getter)]
    pub fn t(&self) -> Vec<f64> {
        self.t.clone()
    }

    #[wasm_bindgen(getter)]
    pub fn c(&self) -> Vec<f64> {
        self.c.clone()
    }

    #[wasm_bindgen(getter)]
    pub fn k(&self) -> usize {
        self.k
    }
}

#[wasm_bindgen]
pub fn splrep(
    x: Vec<f64>,
    y: Vec<f64>,
    w: Option<Vec<f64>>,
    xb: Option<f64>,
    xe: Option<f64>,
    k: Option<usize>,
    task: Option<i8>,
    s: Option<f64>,
    t: Option<Vec<f64>>,
    full_output: Option<bool>,
    per: Option<bool>,
    quiet: Option<bool>,
) -> SplrepOutput {
    let (t, c, k) = rusty_fitpack::splrep(x, y, w, xb, xe, k, task, s, t, full_output, per, quiet);

    SplrepOutput { t, c, k }
}

#[wasm_bindgen]
pub fn splev(t: Vec<f64>, c: Vec<f64>, k: usize, x: Vec<f64>, e: usize) -> Vec<f64> {
    rusty_fitpack::splev(t, c, k, x, e)
}

#[wasm_bindgen]
pub fn splev_uniform(t: Vec<f64>, c: Vec<f64>, k: usize, x: f64) -> f64 {
    rusty_fitpack::splev_uniform(&t, &c, k, x)
}

#[wasm_bindgen]
pub fn splder(t: Vec<f64>, c: Vec<f64>, k: usize, x: Vec<f64>, nu: usize) -> Vec<f64> {
    rusty_fitpack::splder(&t, &c, k, &x, nu)
}

#[wasm_bindgen]
pub fn splder_uniform(t: Vec<f64>, c: Vec<f64>, k: usize, x: f64, nu: usize) -> f64 {
    rusty_fitpack::splder_uniform(&t, &c, k, x, nu)
}
