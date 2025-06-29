import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams,NavLink,useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { X, Copy, Edit3 } from 'lucide-react';

/*const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.find((p) => p._id === id);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">View Paste</h1>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Title</h2>
        <input
          className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-700"
          type="text"
          value={paste?.title || ''}
          disabled
        />
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Content</h2>
        <textarea
          className="w-[600px] p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-700 resize-none"
          value={paste?.content || ''}
          rows={15}
          disabled
        />
      </div>
    </div>
  );
};
*/

const ViewPaste = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const allPastesFromStore = useSelector((state) => state.paste.pastes);
  // Ensure allPastes is an array before finding
  const allPastes = Array.isArray(allPastesFromStore) ? allPastesFromStore : [];
  const paste = allPastes.find((p) => p._id === id);

  useEffect(() => {
    // Only navigate if allPastes has been populated and the paste is still not found.
    if (allPastes.length > 0 && !paste) {
      toast.error("Note not found.");
      navigate("/pastes");
    }
  }, [id, paste, allPastes, navigate]);

  if (!paste) {
    // This can show if `allPastes` is initially empty or if the ID is genuinely not found after `allPastes` is populated.
    return <div className="text-center py-10 text-gray-400">Loading note details or note not found...</div>;
  }
  
  const copyToClipboard = (text, title) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      toast.success(`Content of "${title}" copied!`);
    } catch (err) {
      toast.error('Failed to copy content.');
      console.error('Failed to copy: ', err);
    }
    document.body.removeChild(textArea);
  };

  return (
    <div className="max-w-3xl mx-auto bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-700">
        <h1 className="text-3xl font-semibold text-purple-400 break-all">{paste.title}</h1>
        <NavLink
            to="/pastes"
            className="text-gray-400 hover:text-purple-400 transition-colors"
            title="Back to notes list"
        >
            <X size={28} />
        </NavLink>
      </div>
      
      <div className="mb-6">
        <h2 className="block text-sm font-medium text-gray-400 mb-1">Title</h2>
        <p className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 break-all">{paste.title}</p>
      </div>

      <div className="mb-8">
        <h2 className="block text-sm font-medium text-gray-400 mb-1">Content</h2>
        <pre className="w-full p-4 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 whitespace-pre-wrap break-words min-h-[200px] max-h-[60vh] overflow-y-auto">
          {paste.content}
        </pre>
      </div>
      
      <div className="text-xs text-gray-500 mb-6">
          Created: {new Date(paste.createdAt).toLocaleString()}
          {paste.updatedAt && paste.updatedAt !== paste.createdAt && (
            <span className="ml-2">| Updated: {new Date(paste.updatedAt).toLocaleString()}</span>
          )}
      </div>

      <div className="flex flex-col sm:flex-row justify-end items-center gap-3 pt-4 border-t border-gray-700">
        <button
          onClick={() => copyToClipboard(paste.content, paste.title)}
          className="w-full sm:w-auto px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
        >
          <Copy size={18}/> <span>Copy Content</span>
        </button>
        <NavLink
          to={`/?pasteId=${paste._id}`}
          className="w-full sm:w-auto px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 rounded-lg transition-colors flex items-center justify-center space-x-1"
        >
          <Edit3 size={16} /> <span>Edit This Note</span>
        </NavLink>
      </div>
    </div>
  );
};
export default ViewPaste;
