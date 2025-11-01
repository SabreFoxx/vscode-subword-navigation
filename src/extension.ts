import * as vscode from 'vscode';
import * as subwordNavigation from './commands';

export function activate(context: vscode.ExtensionContext) {

    const register = (commandId: string, command: (...args: any[]) => any) => {
        const disposable = vscode.commands.registerCommand(commandId, command);
        context.subscriptions.push(disposable);
    };

    register('subwordNavigation.cursorSubwordLeft', subwordNavigation.cursorSubwordLeft);
    register('subwordNavigation.cursorSubwordRight', subwordNavigation.cursorSubwordRight);
    register('subwordNavigation.cursorSubwordLeftSelect', subwordNavigation.cursorSubwordLeftSelect);
    register('subwordNavigation.cursorSubwordRightSelect', subwordNavigation.cursorSubwordRightSelect);
    register('subwordNavigation.deleteSubwordLeft', subwordNavigation.deleteSubwordLeft);
    register('subwordNavigation.deleteSubwordRight', subwordNavigation.deleteSubwordRight);
}

export function deactivate() { }