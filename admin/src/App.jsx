import { useState } from 'react'
import './App.css'
import AddNewAdminForm from './addadmin';
import AddNewStudentForm from './student';

function App(){
  const [isModalOpen, setModalOpen] = useState(false);
  return(
<div>
  <button className='bg-[#005F8F] mt-6 ml-4 p-1 rounded-md text-[#CCFFFF]'
         onClick={() => setModalOpen(true)}>Add New Admin</button>
        <AddNewAdminForm 
          isOpen={isModalOpen} 
          onClose={() => setModalOpen(false)} 
        />
        
</div>
  )
}

export default App;
