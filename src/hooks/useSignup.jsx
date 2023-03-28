import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { dispatch } = useAuthContext();

  const signup = async (name, email, password) => {
    setLoading(true);
    setError(null);

    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/user/signup`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      }
    );

    const json = await res.json();
    console.log(json);

    // res.ok === false
    if (!res.ok) {
      setLoading(false);
      setError(json.error);
    }

    // res.ok=== true
    if (res.ok) {
      // update auth context
      dispatch({ type: 'LOGIN', payload: json });

      // save user to local storage
      localStorage.setItem('user', JSON.stringify(json));
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    signup,
  };
};
