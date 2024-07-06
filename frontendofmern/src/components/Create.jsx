import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [name, setName] = useState('');
  const [tweetmsg, setTweetMsg] = useState('');
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('tweetmsg', tweetmsg);
      formData.append('photo', photo);

      const response = await axios.post('http://localhost:5000', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('File uploaded:', response.data.filePath);
      setError('');
      setName('');
      setTweetMsg('');
      setPhoto(null);
      navigate('/all');
    } catch (error) {
      console.error('Error uploading file:', error);
      setError('Error uploading file');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-200">
      <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
        <h2 className="text-3xl text-center text-blue-900 mb-6">Enter the data</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-900">Name</label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="tweetmsg" className="block text-sm font-medium text-gray-900">Tweet Message</label>
            <input
              type="text"
              id="tweetmsg"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={tweetmsg}
              onChange={(e) => setTweetMsg(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="photo" className="block text-sm font-medium text-gray-900">Upload Photo</label>
            <input
              type="file"
              id="photo"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={(e) => setPhoto(e.target.files[0])}
              accept="image/*"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
