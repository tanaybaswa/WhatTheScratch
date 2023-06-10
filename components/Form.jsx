import Link from "next/link";
import TagInput from "./TagInput";
import Dropdown from "./Dropdown";


const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  
  const handleTagChange = (newTags) =>{
    setPost({...post, tag:newTags});
  }

  const handleDiffChange = (e) =>{
    const newDiff = e.target.value;
    setPost({...post, diff:newDiff});
  }

  let verb = "Creat"
  if (type == "Edit"){
    verb = "Edit";
  }



  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='orange_gradient'>{type} Post</span>
      </h1>
      <p className='desc text-left max-w-md'>
        {type} your scratch idea here!
        <br/>
        Remember to include tag(s) and choose difficulty. 
      </p>

      <form
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >
        <label>
          <span className='font-satoshi font-bold text-lg text-gray-800 pl-1'>
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
          <span className='font-satoshi font-semibold text-lg text-gray-800 pl-1'>
            Tags{" "}
            <span className='font-normal'>
              (game, animation, physics, etc.)
            </span>
          </span>
        
          <TagInput tags={post.tag} setTags={handleTagChange}/>
        </label>
        
        <label>
          <span className='font-satoshi flex font-semibold text-lg text-gray-800 w-full mb-1 pl-1'>
            Difficulty
          </span>
          
          <Dropdown handleChange={handleDiffChange} isAll={false}/>
        </label>

        <label>
          <span className='font-satoshi flex font-semibold text-lg text-gray-800 w-full mb-1 pl-1'>
            Scratch Link:
          </span>

          <input type="text" className="form_input"
          value={post.scratch_link}
          onChange={(e) => setPost({ ...post, scratch_link: e.target.value })}
          placeholder='Paste your link here'
          />

        </label>
        
        

        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href='/' className='outline_btn'>
            Cancel
          </Link>

          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-lg black_btn'
          >
            {submitting ? `${verb}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
