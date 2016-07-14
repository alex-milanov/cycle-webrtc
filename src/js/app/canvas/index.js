'use strict';

import gfxUtil from '../../util/gfx';

const draw = () => {
	const canvas = document.getElementById('screen');
	const ctx = canvas.getContext('2d');
	const video = document.getElementById('video');

	canvas.width = video.clientWidth;
	canvas.height = video.clientHeight;

	const tr = 255;
	const tg = 0;
	const tb = 0;

	window.requestAnimFrame(draw);
	ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight,
		0, 0, ctx.canvas.width, ctx.canvas.height);

	let pixels = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
	let	i = 0;
	let brightness;

	for (; i < pixels.data.length; i += 4) {
		// brightness code from Tab Atkins' canvas demos
		brightness = ((3 * pixels.data[i] +
			4 * pixels.data[i + 1] +
			pixels.data[i + 2]) >>> 3) / 256;

		pixels.data[i] = ((tr * brightness) + 0.5) >> 0;
		pixels.data[i + 1] = ((tg * brightness) + 0.5) >> 0;
		pixels.data[i + 2] = ((tb * brightness) + 0.5) >> 0;
	}
	ctx.putImageData(pixels, 0, 0);
};

export default {
	draw
};
