import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./../editor.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link"],
  ],
};
const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
];
type Prop = { onChange: (value: string) => void };

const Editor = ({ onChange }: Prop) => {
  const [text, setText] = useState("");
  useEffect(() => {
    onChange(text);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <ReactQuill
      theme="snow"
      onChange={setText}
      value={text}
      modules={modules}
      formats={formats}
      placeholder="start writing your content here... at least 255 chars"
    />
  );
};

export default Editor;
