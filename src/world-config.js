function dfExt_pack(data) {
	let image = data['df-bg-img'];
	let config = {};
	if (!!data['df-bg-vid']) config.v = data['df-bg-vid'];
	if (data['df-bg-vid-mute'] !== undefined && data['df-bg-vid-mute'] == false) config.m = data['df-bg-vid-mute'];
	if (data['df-bg-vid-scale'] !== undefined && data['df-bg-vid-scale'] !== 'cover') config.s = data['df-bg-vid-scale'];
	let json = JSON.stringify(config);
	let base64 = btoa(json);
	data.background = image + '?' + base64;
	console.log('Packed Background: ' + data.background);
	delete data['df-bg-img'];
	delete data['df-bg-vid'];
	delete data['df-bg-vid-mute'];
	delete data['df-bg-vid-scale'];
	return data;
}

function dfExt_parse(uri) {
	let config = { image: '', video: '', mute: true, scale: 'cover' };
	if (uri.length == 0) return config;
	var tokens = uri.split(/\?(.+)/);
	config.image = tokens[0];
	if (tokens[1] == undefined || tokens[1].length == 0) return config;
	var params;
	try {
		params = JSON.parse(atob(tokens[1]));
		if (params.v !== undefined) config.video = params.v;
		if (params.m !== undefined) config.mute = params.m;
		if (params.s !== undefined) config.scale = params.s;
	}
	finally {
		return config;
	}
}

function dfExt_getSubmitData(updateData = {}) {
	if (!this.form) throw new Error('The FormApplication subclass has no registered form element');
	const fd = new FormDataExtended(this.form, { editors: this.editors });
	let data = fd.toObject();
	if (updateData) data = flattenObject(mergeObject(data, updateData));
	return dfExt_pack(data);
}

(function () {
	'use strict';
	if (typeof WorldConfig === "undefined") return;
	Hooks.on('renderWorldConfig', function (sender, html, data) {
		const div = $(html).find("div.banner-image");
		var config = dfExt_parse(div.find('input').val());
		div.find('div').html(`
<button type="button" class="file-picker" data-type="image" data-target="df-bg-img" title="Browse Files" tabindex="-1"><i class="fas fa-file-import fa-fw"></i></button>
<input type="text" name="df-bg-img" placeholder="path/image.png" value="${config.image}" data-dtype="String">
`);
		const height = div.after(`
<div class="form-group banner-image">
	<label>Background Video</label>
	<div class="form-fields">
		<button type="button" class="file-picker" data-type="video" data-target="df-bg-vid" title="Browse Files" tabindex="-1"><i class="fas fa-file-import fa-fw"></i></button>
		<input type="text" name="df-bg-vid" placeholder="path/video.[mp4|webm|ogg]" value="${config.video}" data-dtype="String">
	</div>
</div>
<div class="form-group">
	<label>Mute Video</label>
	<input type="checkbox" name="df-bg-vid-mute" ${config.mute ? 'checked' : ''}>
</div>
<div class="form-group">
	<label>Video Scaling <a title="Video Scaling Help" target="_blank" href="https://github.com/flamewave000/dragonflagon-fvtt/blob/master/df-fvtt-es/README.md#adjust-video-scalingfit"><i class="fas fa-question-circle"></i></a></label>
	<div class="form-fields">
		<select name="df-bg-vid-scale">
			<option value="cover" ${config.scale == 'cover' ? 'selected' : ''}>cover (default)</option>
			<option value="fill" ${config.scale == 'fill' ? 'selected' : ''}>fill</option>
			<option value="contain" ${config.scale == 'contain' ? 'selected' : ''}>contain</option>
			<option value="scale-down" ${config.scale == 'scale-down' ? 'selected' : ''}>scale-down</option>
			<option value="none" ${config.scale == 'none' ? 'selected' : ''}>none</option>
		</select>
	</div>
</div>
`).height();
		html.find('button.file-picker').each((i, button) => sender._activateFilePicker(button));
		html.height(html.height() + (height * 3.5));
	});
	WorldConfig.prototype._getSubmitData = dfExt_getSubmitData;
})();
