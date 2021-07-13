import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { isEmpty } from 'lodash';
import TextareaAutosize from 'react-textarea-autosize';
import { useKeyPress, useOnClickOutside } from 'hooks';
import { Delete } from '@material-ui/icons';

import { Timestamp } from '@firebase/firestore-types';

import firestore from 'database';
import Modal from 'react-modal';

import './styles.css';

type Note = {
  id: string;
  title: string;
  content: string;
  dateTime: Timestamp;
};

type EditNoteProps = {
  isOpen: boolean;
  handleClose: () => void;
  note: Note;
};

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const EditNote = ({ isOpen, handleClose, note }: EditNoteProps): JSX.Element => {
  const ref = useRef<HTMLFormElement>(null!);
  const notesRef = firestore.collection('notes');
  const { register, handleSubmit, reset, watch, setValue } = useForm();
  const enterKeyPress = useKeyPress('Enter');
  const shiftKeyPress = useKeyPress('Shift');
  const escKeyPress = useKeyPress('Escape');
  const watchContent = watch('content', '');
  const watchTitle = watch('title', '');
  const noteDate = note.dateTime.toDate();

  const handleDelete = () => notesRef.doc(note.id).delete();

  const onSubmit = ({ title, content }: Note) => {
    if (note.content !== watchContent || note.title !== watchTitle) {
      notesRef
        .doc(note.id)
        .update({
          title: !isEmpty(title) ? title : null,
          content,
          date_time: new Date(),
          is_pinned: false,
        })
        .catch((e) => console.log(e));
    }
  };

  const closeModal = () => {
    reset({ title: null, content: null });
    handleClose();
  };

  useOnClickOutside(ref, () => {
    handleSubmit(onSubmit)();
    closeModal();
  });

  useEffect(() => {
    setValue('title', note.title);
    setValue('content', note.content);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (escKeyPress && isEmpty(watchContent)) {
      closeModal();
    }

    if ((enterKeyPress || escKeyPress) && !shiftKeyPress && !isEmpty(watchContent)) {
      handleSubmit(onSubmit)();
      closeModal();
    }
    // eslint-disable-next-line
  }, [enterKeyPress, escKeyPress]);

  return (
    <Modal
      isOpen={isOpen}
      className="EditNote__modal"
      onRequestClose={handleClose}
      overlayClassName="EditNote__modal__overlay"
      contentLabel="EditNote__modal"
      ariaHideApp
      shouldFocusAfterRender
      shouldReturnFocusAfterClose
      shouldCloseOnEsc={false}
      shouldCloseOnOverlayClick={false}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="EditNote" ref={ref}>
        <input
          placeholder="Title"
          className="EditNote__input--title"
          {...register('title')}
        />
        <TextareaAutosize
          placeholder="Take a note..."
          className="EditNote__input--content"
          {...register('content', { required: true })}
        />
        <p className="EditNote__date">
          Edited {monthNames[noteDate.getMonth()]} {noteDate.getDate()}
        </p>
        <div className="EditNote__actions">
          <button className="EditNote__actionButton" onClick={handleDelete}>
            <Delete className="EditNote__actionButton__icon" />
          </button>
        </div>
      </form>
    </Modal>
  );
};

Modal.setAppElement('body');

export default EditNote;
