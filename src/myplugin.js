import { Plugin } from 'ckeditor5/src/core';
import { ButtonView } from 'ckeditor5/src/ui';
import ckeditor5Icon from '../theme/icons/ckeditor.svg';

function exportHTMLToWord(data = '') {
	// word样式定义
	const SHEET_STYLE = {
		table: 'border-collapse: collapse; border-spacing: 0;',
		border: 'border:1px solid #000000;',
	}

	const header = `<html xmlns:o='urn:schemas-microsoft-com:office:office'
		xmlns:w='urn:schemas-microsoft-com:office:word'
		xmlns='http://www.w3.org/TR/REC-html40'>
		<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>`;
	const footer = '</body></html>';

	const data_replace_by_table = data.replace(/<table/g, `<table style="${SHEET_STYLE.table}" `)
	const data_replace_by_table_td = data_replace_by_table.replace(/<td/g, `<td style="${SHEET_STYLE.border}" `)
	const printData = data_replace_by_table_td
	const sourceHTML = `${header}${printData}${footer}`;
	const source = `data:application/vnd.ms-word;charset=utf-8,${ encodeURIComponent(
		sourceHTML
	)}`;
	const fileDownload = document.createElement('a');
	document.body.appendChild(fileDownload);
	fileDownload.href = source;
	fileDownload.download = 'document.doc';
	fileDownload.click();
	document.body.removeChild(fileDownload);
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
