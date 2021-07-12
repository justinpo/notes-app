import { useState, useEffect } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { DocumentData } from '@firebase/firestore-types';
import firestore from 'database';

import { Note, Container, Spinner, Search } from 'components';
import { AddNote } from 'widgets';

import './styles.css';

const NotesRouter = (): JSX.Element => {
  const [searchString, setSearchString] = useState<string>('');
  const [filteredNotes, setFilteredNotes] = useState<DocumentData[]>();

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
          {filteredNotes?.map(({ id, title, content }) => (
            <Note id={id} title={title} content={content} />
          ))}
        </div>
      )}
    </Container>
  );
};

export default NotesRouter;
