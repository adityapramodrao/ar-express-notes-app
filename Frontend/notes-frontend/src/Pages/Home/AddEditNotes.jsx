import React, { useState } from "react";
import TagInput from "../../component/Input/TagInput";
import { MdClose } from "react-icons/md";

export const AddEditNotes = ({noteData, type, onClose}) => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState([]);
    const [errors, setErrors] = useState(null);

    //Add new 

    const addNewNote = async() => {

    }
    //Edit new 
    const editNote = async() => {

    }

    const handleAddNotes = () => {
        if(!title){
            setErrors("Please enter title")
            return;
        }

        if(!content){
            setErrors("Please enter content")
            return;
        }
        setErrors("")

        if(type === 'edit'){
            editNote();
        }else{
            addNewNote();
        }
    }
    return (
        <>
           <div className="relative">
              <button className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50" onClick={onClose}>
                  <MdClose className="text-xl text-slate-400"/>
              </button>
              <div className="flex flex-col gap-2">
                  <label className="input-label"> Title </label>
                  <input 
                    type="text" 
                    className="text-sm text-slate-950 outline-none"
                    placeholder="Go to Gym At 5"
                    value={title}
                    onChange={({target}) => {setTitle(target.value)}}
                  />
              </div>

              <div className="flex flex-col gap-2 mt-4">
                  <label className="input-label">content</label>
                  <textarea 
                    type="text" 
                    className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
                    placeholder="content"
                    rows={8}
                    value={content}
                    onChange={({target}) => {setContent(target.value)}}
                  />
              </div>
              <div className="mt-2">
                 <label className="input-label">Tags</label>
                 <TagInput tags={tags} setTags={setTags} />
              </div>

              {errors && (
                 <p className="text-xs pt-4 text-red-500">{errors}</p>
              )}
              <button className="btn-primary font-medium mt-5 p-3" onClick={handleAddNotes}>
                 Add  
              </button>

           </div>
        </>
    )
}

export default AddEditNotes;