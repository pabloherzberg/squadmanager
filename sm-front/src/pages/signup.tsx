import WithAuthRedirect from '@/components/WithAuthRedirect';
import { register } from '@/store/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state.auth);
  const router = useRouter();

  console.log(selector);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    await dispatch(register({ Email: email, Password: password }));
    router.push('/signin');
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default WithAuthRedirect(Register);
