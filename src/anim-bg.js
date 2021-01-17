
const checkVideo = (url) => new Promise((res, _) => {
	let http = new XMLHttpRequest();
	http.open('HEAD', url);
	http.onload = (a) => res(a.target.status != 200);
	http.onerror = () => res(true);
	http.ontimeout = () => res(true);
	http.send();
});
function parseUrl(url) {
	let query = url.split(/\?(.+)/);
	const config = {
		i: query[0],
		v: null,
		m: true,
		s: 'cover'
	};
	if (query[1] == undefined) return config;
	try {
		const params = JSON.parse(atob(query[1]));
		if (params.v !== undefined) config.v = params.v;
		if (params.m !== undefined) config.m = params.m;
		if (params.s !== undefined) config.s = params.s;
	}
	finally {
		return config;
	}
}

(async function () {
	'use strict';
	const body = $('body');
	const reg = /url\( *['"]([\w\W]+?)['"] *\)/;
	let url = reg.exec(body.css('background-image'))[1];
	if (url === undefined) return;

	let config = parseUrl(url);
	if (await checkVideo(config.v)) return;

	let volume = window.localStorage.getItem('df-bg-volume') ?? '0.5';
	let video = $('<video id="df-bg-video" class="df-anim-bg" loop autoplay />');
	video.prop('volume', config.m ? '0' : volume)
	video.css('object-fit', config.s);
	const extension = config.v.split(/.+\.(.+)/);
	switch (extension[1].toLowerCase()) {
		case 'mp4':
			video.append(`<source src="${config.v}" type="video/mp4" />`);
			break;
		case 'm4v':
			video.append(`<source src="${config.v}" type="video/x-m4v" />`);
			break;
		case 'webm':
			video.append(`<source src="${config.v}" type="video/webm" />`);
			break;
		case 'ogg':
			video.append(`<source src="${config.v}" type="video/ogg" />`);
			break;
		default:
			return;
	}
	body.prepend(video);
	if (config.m) return;
	body.prepend(`	<form class="df-anim-bg" oninput="df_bg_update()">
		<input id="df-bg-volume" type="range" min="0" max="1" value="${volume}" step="0.05" />
	</form>`);
	body.append(`	<script>
		function df_bg_update() {
			let volumeElement = $('#df-bg-volume');
			$('#df-bg-video').prop("volume", volumeElement.val());
			window.localStorage.setItem('df-bg-volume', volumeElement.val());
		}
	</script>`);
})();