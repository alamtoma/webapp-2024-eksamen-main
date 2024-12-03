import React, { useState } from 'react';
import { Editor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';

const CreateLessonPage: React.FC = () => {
  const [editorContent, setEditorContent] = useState('');

  const editor = new Editor({
    extensions: [StarterKit],
    content: editorContent,
    onUpdate: ({ editor }) => {
      setEditorContent(editor.getHTML());
    }
  });

  return (
    <div>
      <h1>Create New Lesson</h1>
      <div>
        <EditorContent editor={editor} />
      </div>
      <textarea
        value={editorContent}
        onChange={(e) => setEditorContent(e.target.value)}
      />
    </div>
  );
}

export default CreateLessonPage;