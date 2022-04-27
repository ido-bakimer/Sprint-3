import { utilService } from './util.service.js';
import { storageService } from './storage.service.js';

export const noteService = {
  query,
  createNote,
  updateNote,
  deleteNote,
  saveNotesToStorage,
};

const KEY = 'notes';
let gNotes;

_createNotes();

function query() {
  return Promise.resolve(gNotes);
}

function addNote(noteToAdd) {
  gNotes.unshift(noteToAdd);
  saveNotesToStorage();
  return Promise.resolve(noteToAdd);
}

function deleteNote(noteId) {
  let noteIdx = gNotes.findIndex((note) => note.id === noteId);
  gNotes.splice(noteIdx, 1);
  saveNotesToStorage();
  return Promise.resolve();
}


function updateNote(noteId, note) {
  let noteIdx = gNotes.findIndex((note) => note.id === noteId);

  if (noteIdx === -1) {
    console.log('Error. Cant find noteIdx in updateNote');
    return;
  }
  gNotes[noteIdx] = note;
  saveNotesToStorage();
  return Promise.resolve();
}


function createNote(inputVal, noteType) {
  if (!inputVal) return;
  let note = {
    id: utilService.makeId(),
    type: noteType,
    isPinned: false,
    style: {
      backgroundColor: '#c988ff',
    },
  };

  switch (noteType) {
    case 'NoteText':
      note.info = {
        txt: inputVal,
      };
      break;  
    default:
      return 'switch error';
  }

  addNote(note);
}

function _createNotes() {
  let notes = storageService.loadFromStorage(KEY);
  if (!notes || !notes.length) {
    notes = [
      {
        id: utilService.makeId(),
        type: 'NoteText',
        isPinned: true,
        info: {
          txt:
            "yoyo here comes the hackerman",
        },
        style: {
          backgroundColor: '#b1ffaa',
        },
      },
      {
        id: utilService.makeId(),
        type: 'NoteText',
        isPinned: true,
        info: {
          txt:
            "very manly note",
        },
        style: {
          backgroundColor: '#b1ffaa',
        },
      },
    ];
  }
  gNotes = notes;
  saveNotesToStorage();
}

function saveNotesToStorage() {
  storageService.saveToStorage(KEY, gNotes);
}
