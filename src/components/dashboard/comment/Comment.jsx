import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import image1 from '/src/assets/comment-images/image1.svg';
import attachmentIcon from '/src/assets/comment-images/attachment-icon.svg';
import replyIcon from '/src/assets/comment-images/reply-icon.svg'; 

const API_URL = 'http://localhost:8080/api/v1/ticket/category/ticket'; // Base URL for the API
const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJVU0VSIl0sInN1YiI6ImRhbWkyODMiLCJpYXQiOjE3MjI0MTA0NTcsImV4cCI6MTcyMjQ5Njg1N30.TixsU3TJPXzmSbrIbq4kmH8OFyBeLrMM4M3nyHkdmgQ'; 
const token = localStorage.getItem('token');

export const Comment = ({ ticketId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      console.log('Fetching comments with token:', token); // Debug token
      const response = await axios.get(`${API_URL}/${ticketId}/get-comments`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Fetched comments:', response.data); // Log fetched comments
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error.response?.data || error.message); // Improved error logging
    }
  };

  const handleNewCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleAttachmentClick = () => {
    fileInputRef.current.click();
  };

  const handlePostComment = async () => {
    if (!newComment.trim()) return; // Prevent posting empty comments

    try {
      console.log('Posting comment with token:', token); // Debug token
      const response = await axios.post(`${API_URL}/${ticketId}/create-comment`, 
        { comment: newComment }, 
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      console.log('Posted comment:', response.data); // Log posted comment

      // Add the new comment to the state to update the UI immediately
      setComments(prevComments => [
        ...prevComments,
        { ...response.data.ticketCommentInfo, createdAt: new Date().toISOString() } // Add current date for display
      ]);
      setNewComment('');
    } catch (error) {
      console.error('Error posting comment:', error.response?.data || error.message); // Improved error logging
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h4 className='mb-5'>Comments</h4>
      <div className="space-y-4">
        {comments.map((comment, index) => (
          <div key={index} className="border-b border-gray-200 pb-4">
            <div className="flex items-start space-x-4">
              <img src={image1} alt="User" className="w-10 h-10 rounded-full" />
              <div className="flex-auto">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    <div className="font-semibold text-[#334253]">User</div>
                    <div className="ml-2 text-xs text-gray-500">
                      {comment.createdAt ? new Date(comment.createdAt).toLocaleString() : 'Invalid Date'}
                    </div>
                  </div>
                  <button className="text-gray-500 hover:text-gray-700">
                    <img src={replyIcon} alt="Reply" className="w-4 h-4 inline" />
                    <span className="ml-1 text-xs">Reply</span>
                  </button>
                </div>
                <p className="text-[#67727E] text-left mt-5">{comment.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-14 flex items-start space-x-4">
        <img src={image1} alt="User" className="w-10 h-10 rounded-full" />
        <div className="flex-1 relative">
          <textarea
            placeholder="Add a comment..."
            rows="3"
            value={newComment}
            onChange={handleNewCommentChange}
            className="w-full p-2 border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="button" className='absolute right-2 top-2 text-gray-500 hover:text-gray-700' onClick={handleAttachmentClick}>
            <img src={attachmentIcon} alt="Attachment" className='w-4 h-4' />
          </button>
          <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => console.log(e.target.files)} />
        </div>
        <button className="bg-custom-blue text-white px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={handlePostComment}>
          Send
        </button>
      </div>
    </div>
  );
};