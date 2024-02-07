import { TLUiOverrides, findMenuItem, menuItem } from '@tldraw/tldraw'


export const  uiOverridesMenu: TLUiOverrides = {
	actions(editor, actions) {
		// Create a new action or replace an existing one
		actions['save-file'] = {
			id: 'save-file',
			label: 'Save',
			readonlyOk: true,
			kbd: '$s',
			onSelect(source: any) {
                const link = document.createElement("a");
                const file = new Blob([JSON.stringify(editor.store.getSnapshot())], { type: 'text/plain' });
                link.href = URL.createObjectURL(file);
                link.download = "sample.tldr";
                link.click();
                URL.revokeObjectURL(link.href);
			},
		};
		
		actions['open-file'] = {
			id: 'open-file',
			label: 'Open',
			readonlyOk: true,
			kbd: '$o',
			onSelect(source: any) {
                const input = document.createElement("input");
                input.type = "file";
                input.onchange = function(event) {
                    try {
                        let files = input.files;
                        if (files !== null) { 
                            if ( files.length > 0) {
                                let file = files[0];
                                if (file !== null) { 
                                    let reader = new FileReader();
                                    const self = this;
                                    reader.onload = (event) => {
                                        if (event.target !== null) { 
                                            var result = event.target.result as string;
                                            if (result !== null) {
                                                editor.store.loadSnapshot(JSON.parse(result));
                                                console.log('FILE CONTENT', JSON.parse(result))
                                            };
                                        }
                                    };
                                    reader.readAsText(file);
                                }
                            }
                        }
                    } catch (err) {
                        console.error(err);
                    }
                };
                input.click();
			},
		};
		
		return actions
	},
	menu(editor, menu, { actions }) {
		// using the findMenuItem helper
		const fileMenu = findMenuItem(menu, ['menu', 'file'])
		if (fileMenu.type === 'submenu') {
			// add the new item to the file menu's children
			const newMenuItemSave = menuItem(actions['save-file'])
			fileMenu.children.unshift(newMenuItemSave)
			const newMenuItemOpen = menuItem(actions['open-file'])
			fileMenu.children.unshift(newMenuItemOpen)
		}
		return menu
	},
}