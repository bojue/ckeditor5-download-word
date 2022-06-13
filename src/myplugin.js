import { Plugin } from 'ckeditor5/src/core';
import { ButtonView } from 'ckeditor5/src/ui';
import ckeditor5Icon from '../theme/icons/ckeditor.svg';

function exportHTMLToWord(data) {
	const header = `<html xmlns:o='urn:schemas-microsoft-com:office:office'
		xmlns:w='urn:schemas-microsoft-com:office:word'
		xmlns='http://www.w3.org/TR/REC-html40'>
		<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>`;
	const footer = '</body></html>';
	const sourceHTML = `${ header } + ${ data } + ${ footer }`;

	const source = `data:application/vnd.ms-word;charset=utf-8,${ encodeURIComponent(
		sourceHTML
	) }`;
	const fileDownload = document?.createElement('a');
	document?.body?.appendChild(fileDownload);
	fileDownload.href = source;
	fileDownload.download = 'document.doc';
	fileDownload.click();
	document?.body?.removeChild(fileDownload);
}

export default class MyPlugin extends Plugin {
	static get pluginName() {
		return 'MyPlugin';
	}

	init() {
		const editor = this.editor;
		const t = editor.t;
		const model = editor.model;

		// Add the "myPlugin" button to feature components.
		editor.ui.componentFactory.add('myButton', (locale) => {
			const view = new ButtonView(locale);

			view.set({
				label: t('下载Word'),
				icon: ckeditor5Icon,
				tooltip: true,
			});

			// Insert a text into the editor after clicking the button.
			this.listenTo(view, 'execute', () => {
				model.change(() => {
					const data = editor.getData();

					exportHTMLToWord(data);
				});
			});
			return view;
		});
	}
}
