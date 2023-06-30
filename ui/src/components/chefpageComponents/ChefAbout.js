import React, { useState } from 'react';
import { FaPen } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ChefAbout = ({ isChef, about, phone, email }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [aboutText, setAboutText] = useState(about);
  const [phoneText, setPhoneText] = useState(phone);
  const [emailText, setEmailText] = useState(email);
  const { id } = useParams();
  const uid = localStorage.getItem('uid');

  const handleSave = () => {
    axios
      .put(`http://127.0.0.1:3001/api/v1/chefs/${id}/about`, {
        about: aboutText,
        phone: phoneText,
        email: emailText,
      })
      .then((response) => {
        console.log('Data saved successfully!')
        setIsEditing(false)
      })
      .catch((error) => {
        console.error('Error saving data:', error)
      });

    setIsEditing(false);
  }

  const handleEditClick = () => {
    if (isEditing) {
      handleSave();
    }
    setIsEditing(!isEditing);
  }
  return (
    <div>
      {isEditing ? (
        <div>
          <textarea
            cols={100}
            style={{ minWidth: 1300 }}
            value={aboutText}
            onChange={(e) => setAboutText(e.target.value)}
            className="mt-2 w-full h-32 rounded-md border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500"
          ></textarea>
          <input
            type="tel"
            value={phoneText}
            onChange={(e) => setPhoneText(e.target.value)}
            className="mt-2 w-full h-8 rounded-md border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500"
          />
          <input
            type="email"
            value={emailText}
            onChange={(e) => setEmailText(e.target.value)}
            className="mt-2 w-full h-8 rounded-md border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500"
          />
        </div>
      ) : (
        <div>
          <pre className="font-light whitespace-pre-wrap">{aboutText}</pre>
          <p>{phoneText}</p>
          <p>{emailText}</p>
        </div>
      )}
      {isChef && uid == id && (
        <div className="flex flex-row-reverse">
          <button
            onClick={handleEditClick}
            className=" mt-2 mb-2 bg-green-800 text-white spx-4 py-2 rounded-md"
          >
            {isEditing ? 'Save' : <FaPen className="fas fa-pen"></FaPen>}
          </button>
        </div>
      )}
    </div>
  )
}

export default ChefAbout
