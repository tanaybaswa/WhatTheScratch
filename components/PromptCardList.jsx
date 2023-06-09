import Loading from "@app/profile/loading";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick, handleEdit, handleDelete }) => {

    if(!data || data.length == 0){
      return (
        <div className="my-14 text-3xl desc text-center">
          <Loading/>
          Loading posts. <br/> Please reload page if needed. <br/> 
          <span className="text-xl mt-4">(Your search may have no results.)</span>
        </div>
      )
    };
  
    return (
      <div className='mt-16 prompt_layout'>
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    );
  };

  export default PromptCardList;