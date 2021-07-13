import { useState, useEffect } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { DocumentData, Timestamp } from '@firebase/firestore-types';
import firestore from 'database';

import { Note, Container, Spinner, Search } from 'components';
import { AddNote, EditNote } from 'widgets';

import './styles.css';

interface NoteObject {
  id: string;
  title: string;
  content: string;
  dateTime: Timestamp;
}

const NotesRouter = (): JSX.Element => {
  const [searchString, setSearchString] = useState<string>('');
  const [filteredNotes, setFilteredNotes] = useState<DocumentData[]>();
  const [noteToView, setNoteToView] = useState<NoteObject | null>(null);

  const notesRef = firestore.collection('notes');

  const [notes, isNotesLoading] = useCollectionData(notesRef.orderBy('date_time'), {
    idField: 'id',
  });

  useEffect(() => {
    if (!isNotesLoading) {
      let filtered = notes?.sort(
        (a, b) => b.date_time.toDate().getTime() - a.date_time.toDate().getTime()
      );

      if (searchString !== '') {
        filtered = notes?.filter(
          (i) =>
            i.content.toLowerCase().match(searchString.toLowerCase()) ||
            i?.title?.toLowerCase().match(searchString.toLowerCase())
        );
      }

      setFilteredNotes(filtered);
    }
  }, [notes, isNotesLoading, searchString]);

  return (
    <>
      {noteToView != null && (
        <EditNote
          isOpen={noteToView != null}
          handleClose={() => setNoteToView(null)}
          note={noteToView}
        />
      )}
      <Container>
        <div className="Notes__titlebar">
          <h3 className="Notes__heading">📝 Notes</h3>
          <Search onChange={(e) => setSearchString(e.target.value)} />
        </div>
        <AddNote />
        {isNotesLoading ? (
          <Spinner />
        ) : (
          <div className="Notes__grid">
            {filteredNotes?.map(({ id, title, content, date_time }) => (
              <Note
                key={id}
                id={id}
                title={title}
                content={content}
                onClick={() =>
                  setNoteToView({ id, title, content, dateTime: date_time })
                }
              />
            ))}
          </div>
        )}
      </Container>
    </>
  );
};

export default NotesRouter;
