import { ExportWordPlugin as ExportWordPluginDll, icons } from '../src';
import ExportWordPlugin from '../src/plugin';

import ckeditor from './../theme/icons/ckeditor.svg';

describe( 'CKEditor5 ExportWordPlugin DLL', () => {
	it( 'exports ExportWordPlugin', () => {
		expect( ExportWordPluginDll ).to.equal( ExportWordPlugin );
	} );

	describe( 'icons', () => {
		it( 'exports the "ckeditor" icon', () => {
			expect( icons.ckeditor ).to.equal( ckeditor );
		} );
	} );
} );
