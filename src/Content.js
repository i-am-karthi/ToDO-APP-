
import { FaTrashAlt } from "react-icons/fa";
const Content = ({items,handlecheck,handledelete}) => {
  
  return (
    <>
    {items.length ?
       ( 
        <ul>   
            {
                items.map(
                    (x)=>
                        <li className='item' key={x.id}>
                            <input type="checkbox" onChange={()=>handlecheck(x.id)} checked={x.checked}/>
                            <label 
                                style={(x.checked)?{textDecoration:'line-through'}:{}}
                                onDoubleClick={()=>handlecheck(x.id)}>{x.item}
                            </label>
                            <FaTrashAlt 
                                role='button'
                                tabIndex="0"
                                onClick={()=>handledelete(x.id)}
                            />
                        </li>)
            }
    </ul>)
    :
    (<h1>Your list is empty </h1>)
    }
    </>
  )
}

export default Content