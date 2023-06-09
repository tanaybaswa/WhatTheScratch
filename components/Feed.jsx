"use client";

import { useState, useEffect } from "react";

import Dropdown from "./Dropdown";
import PromptCardList from "./PromptCardList";

import { useSelectedLayoutSegment } from "next/navigation";



const Feed = () => {
  // Search states
  const [allPosts, setAllPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [difficulty, setDifficulty] = useState("All Difficulties");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();

    setAllPosts(data);
  };


  useEffect(() => {
    fetchPosts();
    console.log("Fetched all posts");

    fetchPosts();
    console.log("Fetched all posts");

    fetchPosts();
    console.log("Fetched all posts");
  }, []);

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
    //console.log(difficulty);

    const searchResult = filterPosts(searchText, e.target.value);
    setSearchedResults(searchResult);
  }

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPosts(e.target.value, difficulty);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const filterPosts = (text, diff) => {

    //console.log("filterPosts working");
    const regexp = new RegExp(text, 'i');

    if(text && diff !== "All Difficulties"){
      return allPosts.filter((item) => 
        item.diff === diff && (
          regexp.test(item.creator.username) ||
          regexp.test(item.tag) ||
          regexp.test(item.prompt)
        )
      );
    } else if(text){
      return allPosts.filter((item) => 
        regexp.test(item.creator.username) ||
        regexp.test(item.tag) ||
        regexp.test(item.prompt)
      );

    } else if (diff !== "All Difficulties") {
      return allPosts.filter((item) => 
        item.diff === diff
      );

    } else {
      return allPosts
    };
  };


  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPosts(tagName, difficulty);
    setSearchedResults(searchResult);
  };

  return (
    <section className='feed'>
      <div className="flex w-full gap-2 items-center">

      <form className='w-[67%] flex box-border'>
        <input
          type='text'
          placeholder='Search for a tag or a username or keyword'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
          />
      </form>

      <Dropdown handleChange={handleDifficultyChange} isAll={true}/>

      </div>
      
      {searchText || difficulty != "All Difficulties"? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
