import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "helloworld" is now active!');
	
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	vscode.window.registerTreeDataProvider('ReferFunction', new TreeDataProvider());

	let disposable = vscode.commands.registerCommand('helloworld.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Testing Tree Data View! Look at your Explorer\nby @alvansga');
	});
	
	let disposable2 = vscode.commands.registerCommand('helloworld.openPROJECT', async () => {
		// The code you place here will be executed every time your command is executed
		// let uri = vscode.Uri.file('D:/Working/3663/PROJECT/code');
		// let success = vscode.commands.executeCommand('vscode.openFolder', uri);

		const value = await vscode.window.showQuickPick(["OK","Cancel"],{placeHolder: 'Select OK or Cancel'});

		// const value = await vscode.window.showQuickPick(
		// 	[
		// 		{ label: 'User', description: 'User Settings', target: vscode.ConfigurationTarget.Global },
		// 		{ label: 'Workspace', description: 'Workspace Settings', target: vscode.ConfigurationTarget.Workspace }
		// 	],
		// 	{ placeHolder: 'Select the view to show when opening a window.' });
		
		console.log(value);
		// if(value)
		// {
		// 	console.log('OK');
		// }
		// else
		// {
		// 	console.log('CANCEL');
		// }
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(disposable2);

}

class TreeDataProvider implements vscode.TreeDataProvider<TreeItem> {
  onDidChangeTreeData?: vscode.Event<TreeItem|null|undefined>|undefined;

  data: TreeItem[];

  constructor() {
    this.data = [new TreeItem('MApp_DVB_Scan', [
		new TreeItem(
			'MApp_DTV_Scan MApp_Scan.c'),
		new TreeItem(
			'MApp_DTV_Scan_Update_Mux MApp_Scan.c'),
		new TreeItem(
			'MApp_DTV_Scan MApp_Scan_CVT.c'),
		new TreeItem(
			'MApp_DTV_Scan_Update_Mux MApp_Scan_CVT.c'),
		new TreeItem(
			'MApp_OAD_Scan MApp_OAD.c'),
		new TreeItem(
			'MApp_OAD_Scan_Update_Mux MApp_OAD.c')
    ])];
  }

  getTreeItem(element: TreeItem): vscode.TreeItem|Thenable<vscode.TreeItem> {
    return element;
  }

  getChildren(element?: TreeItem|undefined): vscode.ProviderResult<TreeItem[]> {
    if (element === undefined) {
      return this.data;
    }
    return element.children;
  }
}

class TreeItem extends vscode.TreeItem {
  children: TreeItem[]|undefined;

  constructor(label: string, children?: TreeItem[]) {
    super(
        label,
        children === undefined ? vscode.TreeItemCollapsibleState.None :
                                 vscode.TreeItemCollapsibleState.Expanded);
    this.children = children;
  }
}