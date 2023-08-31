import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { createPost } from '../api/posts';
import { useNavigate } from 'react-router-dom';

export default function NewPost() {
  const navigate = useNavigate();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  const [publish, setPublish] = useState('unpublished');
  const queryClient = useQueryClient();
  const newPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries(['posts'], { exact: true });
      navigate('/');
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPublish(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (titleRef?.current == null || titleRef.current.value === '') {
      return;
    }

    if (textRef?.current == null || textRef.current.value === '') {
      return;
    }

    newPostMutation.mutate({
      title: titleRef.current.value,
      text: textRef.current.value,
      published: publish === 'published',
    });
  };

  return (
    <main className="new-post-form main flex">
      <form className="new-post-form flex" onSubmit={handleSubmit}>
        <label className="flex" htmlFor="title">
          Title:
          <input
            ref={titleRef}
            className="input"
            type="text"
            name="title"
            id="title"
          />
        </label>
        <label className="flex" htmlFor="text">
          Text:
          <textarea
            ref={textRef}
            className="textarea"
            name="text"
            id="text"
          ></textarea>
        </label>
        <fieldset className="fieldset flex">
          <label className="fieldset-label flex" htmlFor="published">
            <input
              type="radio"
              name="published"
              id="published"
              value="published"
              checked={publish === 'published'}
              onChange={handleChange}
            />
            Published
          </label>
          <label className="fieldset-label flex" htmlFor="unpublished">
            <input
              type="radio"
              name="unpublished"
              id="unpublished"
              value="unpublished"
              checked={publish === 'unpublished'}
              onChange={handleChange}
            />
            Unpublished
          </label>
        </fieldset>
        <button className="submit-post-btn" type="submit">
          Post
        </button>
      </form>
    </main>
  );
}
