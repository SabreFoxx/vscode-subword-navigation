import { Selection, TextEditor, TextEditorRevealType, Position, TextDocument, window, Range } from 'vscode';
import { nextBoundaryLeft as left, nextBoundaryRight as right } from './boundaries';

type BoundaryFunc = (doc: TextDocument, pos: Position) => Position;
type SelectionFunc = (selection: Selection, boundary: Position) => Selection;

function _cursorSubword(editor: TextEditor, next: BoundaryFunc, sel: SelectionFunc) {
    editor.selections = editor.selections.map(s => sel(s, next(editor.document, s.active)));
    _reveal(editor);
}

async function _deleteSubword(editor: TextEditor, next: BoundaryFunc) {
    await editor.edit(e => {
        editor.selections.forEach(s => {
            const range = s.isEmpty ? new Range(s.active, next(editor.document, s.active)) : s;
            e.delete(range);
        });
    });
    _reveal(editor);
}

function _reveal(editor: TextEditor) {
    if (editor.selections.length === 1) {
        editor.revealRange(editor.selection, TextEditorRevealType.InCenterIfOutsideViewport);
    }
}

function move(selection: Selection, boundary: Position): Selection {
    return new Selection(boundary, boundary);
}

function select(selection: Selection, boundary: Position): Selection {
    return new Selection(selection.anchor, boundary);
}

function getEditor(): TextEditor | undefined {
    const editor = window.activeTextEditor;
    return editor;
}

export function cursorSubwordLeft() {
    const editor = getEditor();
    if (editor) {
        _cursorSubword(editor, left, move);
    }
}

export function cursorSubwordRight() {
    const editor = getEditor();
    if (editor) {
        _cursorSubword(editor, right, move);
    }
}

export function cursorSubwordLeftSelect() {
    const editor = getEditor();
    if (editor) {
        _cursorSubword(editor, left, select);
    }
}

export function cursorSubwordRightSelect() {
    const editor = getEditor();
    if (editor) {
        _cursorSubword(editor, right, select);
    }
}

export async function deleteSubwordLeft() {
    const editor = getEditor();
    if (editor) {
        await _deleteSubword(editor, left);
    }
}

export async function deleteSubwordRight() {
    const editor = getEditor();
    if (editor) {
        await _deleteSubword(editor, right);
    }
}