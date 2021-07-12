import { Delete } from '@material-ui/icons';

import firestore from 'database';

import './styles.css';

type Props = {
  id: string;
  title?: string;
  content: string;
};

const Note = ({ id, title, content }: Props): JSX.Element => {
  const notesRef = firestore.collection('notes');

  const handleDelete = () => notesRef.doc(id).delete();

  return (
    <div className="Note">
      <div>
        {title && <h4 className="Note__title">{title}</h4>}
        <p className="Note__content">{content}</p>
      </div>
      <div className="Note__actions">
        <button className="Note__actionButton" onClick={handleDelete}>
          <Delete className="Note__actionButton__icon" />
        </button>
      </div>
    </div>
  );
};

export default Note;
