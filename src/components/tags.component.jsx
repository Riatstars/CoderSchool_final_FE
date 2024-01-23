import { useContext, useState } from "react";
import { EditorContext } from "../pages/editor.pages";

export const Tag = ({ tag, tagIndex }) => {
  const [editable, setEditable] = useState(false);
  let {
    blog,
    setBlog,
    blog: { tags },
  } = useContext(EditorContext);

  const handleTagDelete = () => {
    tags = tags.filter((t) => t !== tag);
    setBlog({ ...blog, tags: tags });
  };

  const addEditable = (e) => {
    // e.target.setAttribute("contentEditable", true);
    setEditable(true);
    e.target.focus();
  };

  const handleTagEdit = (e) => {
    if (e.keyCode == 13 || e.keyCode == 188) {
      e.preventDefault();
      let currentTag = e.target.innerText;
      tags[tagIndex] = currentTag;
      setBlog({ ...blog, tags: tags });
      setEditable(false);

      // e.target.setAttribute("contentEditable", false);
    }
  };
  return (
    <div className=" relative p-2 mt-2 mr-2 px-5 bg-white rounded-full inline-flex items-center hover:bg-opacity-50 pr-8">
      <p
        className="outline-none "
        contentEditable={editable}
        suppressContentEditableWarning={true}
        onKeyDown={handleTagEdit}
        onClick={addEditable}
      >
        {tag}
      </p>
      <button className="mt-[2px] rounded-full ml-3 " onClick={handleTagDelete}>
        <i className="fi fi-br-cross text-sm pointer-events-none"></i>
      </button>
    </div>
  );
};
