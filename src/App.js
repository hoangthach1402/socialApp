import {useState,useEffect} from 'react'
import {getUsers,searchUser,getUser} from './graphql/query';
import './App.css';
import {useQuery} from '@apollo/client'  
function App() {
  const [currentPage,setCurrentPage]=useState(1);
  const [search,setSearch] = useState();
  const [selectedUser,setSelectedUser] = useState();
  const {loading, error,data}= useQuery(getUsers,{variables:{
  page:currentPage,
  limit:10
  }})
 const {loading:loading_serch,error:error_search,data:data_search} = useQuery(searchUser,{
 variables:{
 mobile:search
 }
 })
  const {loading:loading_user, error:error_user,data:data_user} = useQuery(getUser,{
  variables:{
  userId:selectedUser
  }
  })
  const showPage = (totalPage)=>{
    const listBtn=[]
    for(var i=0 ; i<totalPage; i++){  <button>hello</button>  
      listBtn.push(<button key={i} onClick={()=>setCurrentPage(i+1)}>{i+1}</button>)
    }
    console.log(currentPage)
    return listBtn
  }
  
 
  data_user && console.log(data_user)
  
  return (
    
    
    <div className="App ">
     <div className="row">
      <div className="col-xs-12 col-sm-6 col-md-6 bg-info">
      {selectedUser && <h3>hello {selectedUser}</h3>} 
     
     <input type="text" value={search} onInput={(e)=>setSearch(e.target.value)} placeholder='input name or mobile' />
     <ul>
     {data_search && search!=='' && data_search.searchUserByMobile.map(user=>{
      return <li key={user.id} className={selectedUser===user.id?'bg-light':'dark'} onClick={()=>setSelectedUser(user.id)}>Name: {user.name} Phone: </li>
     })}
     
     </ul>
     <h3>currentpage : {currentPage}</h3>
     <h1 >App Xin xo</h1>
     {data && data.users.map(user=>{
    return   <p className={selectedUser===user.id?'bg-light':''} onClick={()=>setSelectedUser(user.id)}>{user.name}</p>
     })}
     
     <div>
     <button disabled={currentPage===1}  onClick={()=>setCurrentPage(prev=>prev-1)}>prev</button>
     {data && data.users.map((user,index)=>{
    return <button className={currentPage===(index+1)?'bg-dark':''} onClick={()=>setCurrentPage(index)}>
     {++index}
     </button>
     })
     }
     </div>
     <button disabled={currentPage===10} onClick={()=>setCurrentPage(prev=>prev+1)}>next</button>
     </div>  
      <div className="col-xs-12 col-sm-6 col-md-6 bg-dark text-light" >
     {data_user && <div>
     <p>{data_user.user.name}</p>
     </div>} 
      </div>
    
      </div>
    </div>
  );
}

export default App;
