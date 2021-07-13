import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { isEmpty } from 'lodash';
import TextareaAutosize from 'react-textarea-autosize';
import { useKeyPress, useOnClickOutside } from 'hooks';

import firestore from 'database';

import './styles.css';

type Note = {
  title: string;
  content: string;
};

const AddNote = (): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null!);
  const [isToggled, setIsToggled] = useState(false);
  const { register, handleSubmit, reset, watch } = useForm();
  const notesRef = firestore.collection('notes');
  const enterKeyPress = useKeyPress('Enter', true);
  const shiftKeyPress = useKeyPress('Shift');
  const escKeyPress = useKeyPress('Escape');
  const watchContent = watch('content', '');

  const onSubmit = ({ title, content }: Note) => {
    notesRef
      .add({
        title: title !== '' ? title : null,
        content,
        date_time: new Date(),
        is_pinned: false,
      })
      .catch((e) => console.log(e));
  };

  useOnClickOutside(ref, () => setIsToggled(false));

  useEffect(() => {
    if (!isEmpty(watchContent)) {
      setIsToggled(true);
    }
  }, [watchContent]);

  useEffect(() => {
    if (escKeyPress && isEmpty(watchContent)) {
      setIsToggled(false);
      reset({ title: null, content: null });
    }

    if ((enterKeyPress || escKeyPress) && !shiftKeyPress && !isEmpty(watchContent)) {
      handleSubmit(onSubmit)();
      reset({ title: null, content: null });
      setIsToggled(false);
    }
    // eslint-disable-next-line
  }, [enterKeyPress, escKeyPress]);

  return (
    <div ref={ref}>
      <form onSubmit={handleSubmit(onSubmit)} className="AddNote">
        {isToggled && (
          <input
            placeholder="Title"
            className="AddNote__input--title"
            {...register('title')}
          />
        )}
        <TextareaAutosize
          placeholder="Take a note..."
          className="AddNote__input--content"
          onClick={() => setIsToggled(true)}
          {...register('content', { required: true })}
        />
      </form>
    </div>
  );
};

export default AddNote;
