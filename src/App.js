import Additem from './Additem';
import Content from './Content';
import Footer from './Footer';
import Header from './Header';
import { useEffect, useRef, useState } from 'react';
import Search from './Search';
function App() {
  const APIURL="http://localhost:3000/items";
 const title="To Do Lists"
 const [items,setitems]=useState([]);
 const [errors,fetcherror]=useState(null);
 const [loading,setloading]=useState(true);
 
const apirequest = async(url='',options=null,err=null) => {
  try {
     const response=await fetch(url,options);
     if(!response.ok)
     throw Error("Please reload the page"); 
  } catch (error) {
      err=error.message;
  }
  finally{
      return err;
  }
  }

useEffect(()=>{
  const fetchitems=async ()=>{
    try {
      const response=await fetch(APIURL);
      if(!response.ok)
      throw Error("Data not received");
      const listitems=await response.json();
      setitems(listitems);
      fetcherror(null);
    } catch (err) {
      fetcherror(err.message)
    }
    finally{
      setloading(false);
    }
  }
   fetchitems();
},[])
const[newitem,setnewitem]=useState("");
const handlecheck=(id)=>{
                            const listitems=items.map((x)=>(x.id===id?{...x,checked:!x.checked}:x))
                            setitems(listitems);
                            const upitem=listitems.filter((x)=>x.id===id);
                            const patchobject=
                            {
                              method:'PATCH',
                              headers:{
                              'Content-Type':'application/json'
                              },
                              body:JSON.stringify({checked:upitem[0].checked})
                            }
                            const requrl=`${APIURL}/${id}`
                            const result= apirequest(requrl,patchobject);
                            if(!result)
                            alert(result)
                        }
const handledelete=async (id)=>{
                            let i=1;
                            const listitem=items.filter((item)=>item.id!=id).map((x)=>({...x,id:Number(i++)}))
                            setitems(listitem);
                            const dlturl=`${APIURL}/${id}`
                            const dltobj={
                              method:'DELETE'
                            }
                            const result=await apirequest(dlturl,dltobj);
                            if(!result)
                            fetcherror(result);
                          }
const handleadd=(e)=>{
                          e.preventDefault();
                          if(!newitem)
                          return;
                          const id=Number(items.length+1)+"";
                        const newitemobject={
                                                id:id,
                                                checked:false,
                                                item:newitem
                                              }
                        const addeditems=[...items,newitemobject];
                        setitems(addeditems);
                        setnewitem('');
                        inref.current.focus();
                        const postobject=
                        {
                          method:'POST',
                          headers:{
                          'Content-Type':'application/json'
                          },
                          body:JSON.stringify(newitemobject)
                        }
                        const result= apirequest(APIURL,postobject);
                        if(!result)
                        fetcherror(result);
                      } 
const inref=useRef();
const[search,setsearch]=useState('');
  return (
    <div className="App">
    <Header title={title}/>
    <Additem 
      newitem={newitem}
      setnewitem={setnewitem}
      handleadd={handleadd}
      inref={inref}
    />
    <Search 
    search={search}
    setsearch={setsearch}
    />
    <p>{fetcherror}</p>
    <main>
    {errors&&<p>{'Error : '}{errors}</p>}
    {loading&&<p>Loading.....</p>}
    {!loading&&!errors&&<Content 
    items={items.filter((x)=>((x.item).toLowerCase()).includes(search.toLowerCase())||search==="")}
    handlecheck={handlecheck}
    handledelete={handledelete}
    />}
    </main>
    <Footer length={items.length}/>
    </div>
  );
}

export default App;
