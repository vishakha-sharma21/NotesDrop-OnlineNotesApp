import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { Edit, PlusCircle, Save } from 'lucide-react';

/*const Home = () => {
    const [title,setTitle]=useState("");
    const [value,setValue]=useState('');
    const[searchParams,setSearchParams]=useSearchParams();
    const pasteId=searchParams.get("pasteId");
    const dispatch=useDispatch();
    const allPastes =useSelector((state)=> state.paste.pastes)

    useEffect(() => {
          if(pasteId){
            const paste =allPastes.find((p)=>p._id===pasteId);
            setTitle(paste.title);
            setValue(paste.content);
          }
        }, [pasteId]) 
        

    function createPaste(){
        const paste={
            title: title,
            content:value,
            _id: pasteId || Date.now().toString(36),
            createdAt: new Date().toISOString(),
        }

        if(pasteId){
            //update
            dispatch(updateToPastes(paste));
        }
        else{
            //create
            dispatch(addToPastes(paste));
        }

        //after creation and updation
        setTitle('');
        setValue('');
        setSearchParams({});
    }


  return (
    <div>
        <div className='flex flex-row gap-7 place-content-between rounded-2xl'>
            <input className='p-1 rounded-2xl mt-20 w-[60%] pl-4'
                    type='text'
                    placeholder='Enter title here'
                    value={title}
                    onChange={(e)=> setTitle(e.target.value)}/>

       <button className='p-2 rounded-2xl mt-20'
       onClick={createPaste}> 
        {
            pasteId ? "Update Note" :"Create Note" 
        }
       </button>
        </div>

        <div className='mt-8'>
            <textarea className='rounded-2xl mt-4 min-w-[500px] p-4'
            value={value}
            placeholder='Enter content here'
            onChange={(e)=> setValue(e.target.value)}
            rows={20}
            />
        </div>
    </div>
  )
}*/

const Home = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const pasteId = searchParams.get("pasteId");
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      // Ensure allPastes is an array and has items before finding
      const paste = Array.isArray(allPastes) ? allPastes.find((p) => p._id === pasteId) : null;
      if (paste) {
        setTitle(paste.title);
        setContent(paste.content);
      } else if (Array.isArray(allPastes)) { // Only show error if allPastes was checked
        toast.error("Note not found for editing.");
        navigate("/"); 
      }
    } else {
        setTitle('');
        setContent('');
    }
  }, [pasteId, allPastes, navigate]);

  function handleCreateOrUpdateNote() {
    if (!title.trim() || !content.trim()) {
      toast.error('Title and content cannot be empty.');
      return;
    }
    
    const existingPaste = pasteId && Array.isArray(allPastes) ? allPastes.find(p => p._id === pasteId) : null;

    const noteData = {
      title: title,
      content: content,
      _id: pasteId || Date.now().toString(36) + Math.random().toString(36).substring(2),
      createdAt: existingPaste ? existingPaste.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPastes(noteData));
      toast.success('Note updated successfully!');
    } else {
      dispatch(addToPastes(noteData));
      toast.success('Note created successfully!');
    }
    setTitle('');
    setContent('');
    setSearchParams({});
    if (!pasteId) navigate('/pastes');
  }
  

  return (
    <div className="bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl max-w-3xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-purple-400 flex items-center">
        {pasteId ? <Edit size={28} className="mr-3"/> : <PlusCircle size={28} className="mr-3"/>}
        {pasteId ? "Edit Note" : "Create New Note"}
      </h2>
      <form onSubmit={(e) => { e.preventDefault(); handleCreateOrUpdateNote(); }} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">Title</label>
          <input
            id="title"
            className='w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-shadow'
            type='text'
            placeholder='Enter note title...'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-1">Content</label>
          <textarea
            id="content"
            className='w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-shadow min-h-[200px] sm:min-h-[250px]'
            placeholder='Enter note content here...'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 ease-in-out flex items-center justify-center space-x-2 shadow-lg hover:shadow-purple-500/50"
        >
          <Save size={20} /> <span>{pasteId ? "Update Note" : "Create Note"}</span>
        </button>
      </form>
    </div>
  );
};


export default Home
