import React, { useState } from 'react';

interface FormData {
  username: string;
  password: string;
}

interface ErrorMsg {
  username: string;
  password: string;
}

const Body: React.FC = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
  });
  const [errorMsg, setErrorMsg] = useState<ErrorMsg>({
    username: '',
    password: '',
  });

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    if (!formData.username) {
      setErrorMsg({
        ...errorMsg,
        username: 'Username is empty',
      });
      return;
    }

    if (!formData.password) {
      setErrorMsg({
        ...errorMsg,
        password: 'Password is empty',
      });
      return;
    }

    // Simulating sending data to the server (replace with your actual API endpoint)
    try {
      const response = await sendDataToServer(formData);
      console.log('Server Response:', response);

      // Assuming the server responds with a success status, set isLogged to true
      setIsLogged(true);
    } catch (error) {
      console.error('Error sending data to the server:', error);
    }
  };

  const handleInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrorMsg({
      ...errorMsg,
      [name]: '',
    });
  };

  if (isLogged) {
    window.location.href = '/dashboard';
  }

  // Simulated function to send data to the server
  const sendDataToServer = async (data: FormData) => {
    // Replace this with your actual API endpoint and request logic
    const apiUrl = 'https://example.com/api/login';
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to send data to the server');
    }

    return response.json();
  };

  return (
    <div className='mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8'>
      <h2 className='text-2xl mb-4'>Login</h2>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <div>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            name='username'
            onChange={handleInputChange}
            className='block w-full rounded-[4px] border border-neutral-300 bg-transparent py-3 pl-4 pr-20 text-base/6 text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5'
            id='username'
            value={formData.username}
          />
          <p className='error'>{errorMsg.username}</p>
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            onChange={handleInputChange}
            className='block w-full rounded-[6px] border border-neutral-300 bg-transparent py-3 pl-4 pr-20 text-base/6 text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5'
            id='password'
            value={formData.password}
          />
          <p className='error'>{errorMsg.password}</p>
        </div>
        <div className='flex justify-end'>
          <button
            type='submit'
            className='pointer-events-auto rounded-md bg-indigo-600 px-5 py-3 text-[0.85rem] font-semibold leading-4 text-white hover:bg-indigo-500'
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Body;
