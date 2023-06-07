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

const Dropdown = ({handleChange}) => {

  const [color, setcolor] = useState("custom_color_gray");
  const [difficulty, setDifficulty] = useState("All Difficulties");
  let selected = "Hello";

  const handleSelect = (e) => {
    setDifficulty(e.target.value);
    handleChange(e);
  }

  const handleClick = (e) => {
    const name = e.target.value;
    
    if(name == "Easy"){
      setcolor("custom_color_green")
    } else if(name == "Medium"){
      setcolor("custom_color_orange")
    } else if(name == "Hard"){
      setcolor("custom_color_red")
    } else{
      setcolor("custom_color_gray")
    }
    
  }

  return (
    <select className={`${color} py-2.5 pl-2 leading-8 border-2 border-gray-300 bg-white rounded-md cursor-pointer font-semibold font-satoshi shadow-lg focus:border-orange-500 focus:ring-0 w-max-content box-border`}
    onChange={handleSelect}
    >
      
      <option 
      className={`custom_color_gray`}
      onClick={handleClick}>
        All Difficulties
      </option>

      <option 
      className={`custom_color_green`}
      onClick={handleClick}>
        Easy
      </option>

      <option className={`custom_color_orange`}
      onClick={handleClick}>
        Medium
      </option>

      <option className={`custom_color_red`}
      onClick={handleClick}>
        Hard
      </option>
    </select>
  );
};

export default Dropdown;