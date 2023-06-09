"use client";
import React, {useState} from 'react'

// const Dropdown = ({handleChange}) => {

//     const [On, setOn] = useState(false);
//     const [difficulty, setdifficulty] = useState("Difficulty↓")

//     const toggleDropdown = () =>{
//         setOn((prev) => !prev);
//     }

//     const handleSelect = (e) => {

//         setdifficulty(e.target.value);
//         handleChange(e);
//         toggleDropdown();

//     };


//   return (
//     <div>

//     <div className='dropdown_input text-gray-500 absolute'> 
    
//     <button className='w-full text-left' onClick={toggleDropdown}>{difficulty}</button>

//     {On && (
//         <ul>

//         <li><button onClick={handleSelect} value={"Difficulty↓"}>All</button></li>
//         <li><button onClick={handleSelect} value={"Easy"}>Easy</button></li>
//         <li><button onClick={handleSelect} value={"Medium"}>Medium</button></li>
//         <li><button onClick={handleSelect} value={"Hard"}>Hard</button></li>
      
//     </ul>
//     )}
    
//     </div>
    
//     </div>
//   )
// }

// export default Dropdown

const Dropdown = ({handleChange, isAll}) => {

  let startColor = "text-green-500";

  if(isAll){
    startColor = "text-gray-400";
  }

  const [color, setcolor] = useState(startColor);


  const handleSelect = (e) => {
    const name = e.target.value;
    // console.log(name);
    
    if(name == "Easy"){
      setcolor("text-green-500")
    } else if(name == "Medium"){
      setcolor("text-orange-500")
    } else if(name == "Hard"){
      setcolor("text-red-600")
    } else{
      setcolor("text-gray-400")
    }

    handleChange(e);
  };

  const handleClick = (e) => {
  
  };

  return (
    <select className={`${color} text-lg py-2.5 pl-2 leading-8 border-2 border-gray-200 bg-white rounded-md cursor-pointer font-bold font-satoshi shadow-lg focus:border-orange-500 w-max-content box-border`}
    onChange={handleSelect}
    >
      
      {isAll && (<option 
      className={`text-gray-400`}
      onClick={handleClick}>
        All Difficulties
      </option>)
      }

      <option 
      className={`text-green-500`}
      onClick={handleClick}>
        Easy
      </option>

      <option className={`text-orange-500`}
      onClick={handleClick}>
        Medium
      </option>

      <option className={`text-red-600`}
      onClick={handleClick}>
        Hard
      </option>
    </select>
  );
};

export default Dropdown;