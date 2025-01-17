import React from 'react'
//import "./App.css";//
import { SidebarData } from './SidebarData';
import { Link, NavLink } from 'react-router-dom'


function Sidebar() {
  return (
    <div style={{marginTop:'0%',height:'100%',width:'200px',marginRight:'50px', backgroundColor:'maroon'}} className="Sidebar">
      <ul style={{ marginTop:'0%', height:'90vh', width:'100%',padding:'1px'}} className="SidebarList">
       {SidebarData.map((val,key)=> {
        return (

         <li style={{height:'50px',margin:'0%', display:'flex', flexDirection:'row',color:'white',justifyContent:'center',alignItems:'center', paddingLeft:'5px'}}
         key={key}
         className='row' 
         >
         <NavLink to={val.path} style={{display:'flex',color:'#fff',textAlign:'left',width:'160px'}}> 
          <div style={{flex:'30%', display:'grid', placeItems:'center'}}>{val.icon}</div>
          <div style={{flex:'70%'}}> {val.name} </div>
          </NavLink>

          
        </li>
      );
      })}
      </ul>
    </div>
  );
}

export default Sidebar