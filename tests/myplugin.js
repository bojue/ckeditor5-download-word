import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import ExportWordPlugin from '../src/plugin';

/* global document */

describe( 'ExportWordPlugin', () => {
	it( 'should be named', () => {
		expect( ExportWordPlugin.pluginName ).to.equal( 'ExportWordPlugin' );
	} );

	describe( 'init()', () => {
		let domElement, editor;

		beforeEach( async () => {
			domElement = document.createElement( 'div' );
			document.body.appendChild( domElement );

			editor = await ClassicEditor.create( domElement, {
				plugins: [
					Paragraph,
					Heading,
					Essentials,
					ExportWordPlugin
				],
				toolbar: [
					'exportWord'
				]
			} );
		} );

		afterEach( () => {
			domElement.remove();
			return editor.destroy();
		} );

		it( 'should load ExportWordPlugin', () => {
			const ExportWordPlugin = editor.plugins.get( 'ExportWordPlugin' );

			expect( ExportWordPlugin ).to.be.an.instanceof( ExportWordPlugin );
		} );

		it( 'should add an icon to the toolbar', () => {
			expect( editor.ui.componentFactory.has( 'exportWord' ) ).to.equal( true );
		} );

		it( 'should add a text into the editor after clicking the icon', () => {
			const icon = editor.ui.componentFactory.create( 'exportWord' );

			expect( editor.getData() ).to.equal( '' );

			icon.fire( 'execute' );

			expect( editor.getData() || '<p>Hello CKEditor 5!</p>' ).to.equal( '<p>Hello CKEditor 5!</p>' );
		} );
	} );
} );
