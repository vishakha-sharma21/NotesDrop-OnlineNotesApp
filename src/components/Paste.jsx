import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import {  List, Search, Edit3, Eye, Trash2, Copy, FileText,PlusCircle } from 'lucide-react';

/*const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (pasteId) => {
    dispatch(removeFromPastes(pasteId));
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <input
        className="w-[600px] p-4 rounded-lg border border-gray-300 mb-8 text-lg"
        type="search"
        placeholder="Search pastes by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex flex-col gap-8">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div
              key={paste._id}
              className="border p-6 rounded-lg bg-white shadow-md flex flex-col gap-4 transition-transform hover:scale-[1.02]"
            >
              <h2 className="text-2xl font-bold text-gray-800">
                {paste.title}
              </h2>
              <p className="text-gray-700 text-lg">{paste.content}</p>

              <div className="flex flex-row justify-between gap-6 mt-4 w-full ">
                <a
                  href={`/?pasteId=${paste._id}`}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </a>
                <a
                  href={`/pastes/${paste._id}`}
                  className="text-green-600 hover:underline"
                >
                  View
                </a>
                <button
                  className="text-red-600 font-semibold"
                  onClick={() => handleDelete(paste._id)}
                >
                  Delete
                </button>
                <button
                  className="text-purple-600 font-semibold"
                  onClick={() => {
                    navigator.clipboard.writeText(paste.content);
                    toast.success('Copied to Clipboard!');
                  }}
                >
                  Copy
                </button>
              </div>

              <div className="text-gray-500 text-sm mt-2">
                Created at: {new Date(paste.createdAt).toLocaleString()}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-lg text-center">No pastes found.</p>
        )}
      </div>
    </div>
  );
};*/

const Paste = () => {
  const pastesFromStore = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  // Ensure pastesFromStore is always an array before filtering and sorting
  const pastes = Array.isArray(pastesFromStore) ? pastesFromStore : [];

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));

  const handleDelete = (pasteId, pasteTitle) => {
    // Using window.confirm as a simple confirmation for now.
    // In a real app, a custom modal dialog is recommended for better UX.
    if (window.confirm(`Are you sure you want to delete the note "${pasteTitle}"?`)) {
        dispatch(removeFromPastes(pasteId));
        toast.success(`Note "${pasteTitle}" deleted!`);
    }
  };

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
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold text-purple-400 mb-6 flex items-center"><List size={28} className="mr-3"/>Your Notes</h2>
      <div className="mb-8 relative">
        <input
          className="w-full p-4 pl-12 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-shadow"
          type="search"
          placeholder="Search notes by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>

      {filteredData.length > 0 ? (
        <div className="space-y-6">
          {filteredData.map((paste) => (
            <div
              key={paste._id}
              className="bg-gray-800 p-5 rounded-xl shadow-lg hover:shadow-purple-500/20 transition-shadow duration-300"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold text-purple-300 break-all">{paste.title}</h3>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                  {new Date(paste.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="text-gray-400 mb-4 break-words line-clamp-3">{paste.content}</p>

              <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-gray-700">
                <NavLink
                  to={`/?pasteId=${paste._id}`}
                  className="px-3 py-2 text-sm bg-yellow-500 hover:bg-yellow-600 text-gray-900 rounded-lg transition-colors flex items-center space-x-1"
                >
                  <Edit3 size={16} /> <span>Edit</span>
                </NavLink>
                <NavLink
                  to={`/pastes/${paste._id}`}
                  className="px-3 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-1"
                >
                  <Eye size={16} /> <span>View</span>
                </NavLink>
                <button
                  className="px-3 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center space-x-1"
                  onClick={() => handleDelete(paste._id, paste.title)}
                >
                  <Trash2 size={16} /> <span>Delete</span>
                </button>
                <button
                  className="px-3 py-2 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center space-x-1"
                  onClick={() => copyToClipboard(paste.content, paste.title)}
                >
                  <Copy size={16} /> <span>Copy</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <FileText size={48} className="mx-auto text-gray-600 mb-4" />
          <p className="text-gray-500 text-lg">
            {searchTerm ? "No notes match your search." : "No notes found. Create one!"}
          </p>
          {!searchTerm && (
            <NavLink to="/"
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-purple-500"
            >
              <PlusCircle size={18} className="mr-2" />
              Create Note
            </NavLink>
          )}
        </div>
      )}
    </div>
  );
};

export default Paste;
