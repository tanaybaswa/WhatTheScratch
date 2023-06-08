import Link from "next/link";
import TagInput from "./TagInput";
import Dropdown from "./Dropdown";
const Filter = require('bad-words');


const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  const filter = new Filter();
  const handleTagChange = (newTags) =>{
    setPost({...post, tag:newTags});
  }

  const handleDiffChange = (e) =>{
    const newDiff = e.target.value;
    setPost({...post, diff:newDiff});
  }


  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='orange_gradient'>{type} Post</span>
      </h1>
      <p className='desc text-left max-w-md'>
        {type} and share your amazing ideas with the world!
        Remember to include any tags and the level of difficulty!
      </p>

      <form
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700 pl-1'>
            Your Idea:
          </span>

          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder='Write your post here'
            required
            className='form_textarea '
          />
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700 pl-1'>
            Tags{" "}
            <span className='font-normal'>
              (game, animation, physics, etc.)
            </span>
          </span>
          {/* <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            type='text'
            placeholder='#Tag'
            required
            className='form_input'
          /> */}

          <TagInput tags={post.tag} setTags={handleTagChange}/>
        </label>
        
        <label>
          <span className='font-satoshi flex font-semibold text-base text-gray-700 w-full mb-1 pl-1'>
            Difficulty
          </span>
          {/* <input
            value={post.diff}
            onChange={(e) => setPost({ ...post, diff: e.target.value })}
            type='text'
            placeholder='Difficulty'
            required
            className='form_input'
          /> */}
          <Dropdown handleChange={handleDiffChange} isAll={false}/>
        </label>
        
        

        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href='/' className='text-gray-500 text-sm'>
            Cancel
          </Link>

          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-lg bg-primary-orange rounded-full text-white'
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
