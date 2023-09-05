import React, { useState} from 'react';

function App() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [followers, setFollowers] = useState('');
  const [avatar, setAvatar] = useState('');
  const [publicRepos, setPublicRepos] = useState('');
  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const isDataAvailable = name || username || followers || avatar || publicRepos;

  const setData = ({ name, login, followers, avatar_url, public_repos }) => {
    setName(name);
    setUsername(login);
    setFollowers(followers);
    setAvatar(avatar_url);
    setPublicRepos(public_repos);
    setIsLoading(false);
    setError(null);
  };

  const handleSearch = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    fetch(`https://api.github.com/users/${userInput}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'Not Found') {
          setError('User not found');
          setIsLoading(false);
        } else {
          setData(data);
        }
      })
      .catch((error) => {
        console.error(error);
        setError('An error occurred');
        setIsLoading(false);
      });
  };

  return (
    <div className="pt-10">
      <div className="flex justify-center text-white italic font-bold text-5xl">
        GITHUB EXPLORER
      </div>
      <div className="pt-10 flex justify-center">
        <div className="flex border border-purple-200 rounded">
          <input
            type="text" 
            value={userInput}
            style={{ width: '340px' }}
            className="block px-4 py-2 text-purple-700 bg-white focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="Enter Github Username..."
            onChange={handleSearch}
          />
          <button
            className="px-4 text-white bg-[#155e75] border-l"
            onClick={handleSubmit} 
          >
            Search
          </button>
        </div>
      </div>
      {isLoading ? (
        <div className="text-center text-white text-2xl pt-6">Loading...</div>
      ) : error ? (
        <div className="text-center text-white text-2xl pt-6">{error}</div>
      ) : isDataAvailable ? (
        <div className="pt-9 flex justify-center pb-9">
          <div className="max-w-md rounded overflow-hidden shadow-lg border-4 border-white">
            <img className="w-full" src={avatar} alt="User Avatar" />
            <div className="px-6 pt-4 pb-2">
             
             <div className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
               Name: {name ? ` ${name}` : ' Not given'}
              </div>
               <div className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                Username: {username}
              </div>
              <div className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                Followers: {followers}
              </div>
              <div className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                Repos: {publicRepos}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
