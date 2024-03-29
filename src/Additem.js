import React from 'react'
import { FaPlus } from 'react-icons/fa'
const Additem = ({newitem,setnewitem,handleadd,inref}) => {
  
 
  return (
    <form className='addform' onSubmit={(e)=>handleadd(e)}>
       <label htmlFor='addItem'>Add Item</label>
       <input
       autoFocus
       id='addItem'
        type="text"
        ref={inref}
        placeholder='Add Item'
        value={newitem}
        onChange={(e)=> setnewitem(e.target.value)}
        required
       />
       <button type='submit'> <FaPlus/></button>
    </form>
  )
}

export default Additem