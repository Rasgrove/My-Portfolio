// 3D ASCII Animation - Torus (Donut)
// Based on the Sloan classic Donut.c

(function () {
    const pre = document.getElementById('ascii-pre');
    if (!pre) return;

    let A = 0;
    let B = 0;

    // Parameters for the torus
    const R1 = 1;
    const R2 = 2;
    const K1 = 150;
    const K2 = 5;

    // Animation function
    function renderFrame() {
        let b = [];
        let z = [];
        A += 0.03;
        B += 0.01;

        const cA = Math.cos(A);
        const sA = Math.sin(A);
        const cB = Math.cos(B);
        const sB = Math.sin(B);

        // Pre-fill buffers
        for (let k = 0; k < 1760; k++) {
            b[k] = " ";
            z[k] = 0;
        }

        // Project the torus
        for (let j = 0; j < 6.28; j += 0.07) { // theta
            const ct = Math.cos(j);
            const st = Math.sin(j);

            for (let i = 0; i < 6.28; i += 0.02) { // phi
                const sp = Math.sin(i);
                const cp = Math.cos(i);

                const h = ct + 2; // R2 + R1*cos(theta)
                const D = 1 / (sp * h * sA + st * cA + 5); // 1/z
                const t = sp * h * cA - st * sA;

                const x = 0 | (40 + 30 * D * (cp * h * cB - t * sB));
                const y = 0 | (12 + 15 * D * (cp * h * sB + t * cB));
                const o = x + 80 * y;
                const N = 0 | (8 * ((st * sA - sp * ct * cA) * cB - sp * ct * sA - st * cA - cp * ct * sB));

                if (y < 22 && y >= 0 && x >= 0 && x < 80 && D > z[o]) {
                    z[o] = D;
                    b[o] = ".,-~:;=!*#$@"[N > 0 ? N : 0];
                }
            }
        }

        // Build the string
        let output = "";
        for (let k = 0; k < 1761; k++) {
            output += k % 80 === 79 ? "\n" : b[k];
        }

        pre.innerHTML = output;
        requestAnimationFrame(renderFrame);
    }

    renderFrame();
})();
