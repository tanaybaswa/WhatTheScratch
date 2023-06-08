import React, { useState } from 'react';
import {AiOutlineClose, AiOutlinePlus} from 'react-icons/ai';

const TagInput = ({tags, setTags}) => {
//   const [tags, setTags] = useState(['']); // Initial state with an empty tag

  const handleTagChange = (index, event) => {
    const newTags = [...tags];
    newTags[index] = event.target.value;
    setTags(newTags);
  };

  const handleAddTag = () => {
    setTags([...tags, '']); // Add an empty tag to the list
  };

  const handleRemoveTag = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  return (
    <div>
      {tags.map((tag, index) => (
        <div key={index}>
            <div className='flex'>
            <input
                className='tag_input'
                type="text"
                placeholder='Tag'
                required
                value={tag}
                onChange={(event) => handleTagChange(index, event)}
            />
            {index > 0 && (
                <button type="button" onClick={() => handleRemoveTag(index)} className='ml-2'>
                <AiOutlineClose size={20} fill='gray'/>
                </button>
            )}
            </div>
        </div>
      ))}
      {tags.length < 6 && <button type="button" onClick={handleAddTag} className='flex items-center text-gray-500'>
        <AiOutlinePlus size={20} fill='gray'/>
        Add Tag
      </button>
        }
    </div>
  );
};

export default TagInput;
