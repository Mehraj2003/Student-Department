import HomeIcon from '@mui/icons-material/Home';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import SellIcon from '@mui/icons-material/Sell';
import React from 'react'

export const SidebarData=[
  {  
    name:"Home",
    icon:<HomeIcon/>,
    path:"/home",
  },

  { 
    name:"Department",
    icon:<AccountTreeIcon/>,
    path:"/departments",
   },
   
  { 
      name:"Scholarship",
      icon:<SellIcon/>,
      path:"/scholarship",
     },
  { 
      name:"Add Department",
      icon:<SellIcon/>,
      path:"/departments/AddDepartments",
     },
  { 
      name:"Payment",
      icon:<SellIcon/>,
      path:"/scholarship/payment",
     },
 
]
