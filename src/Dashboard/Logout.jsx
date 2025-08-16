import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout(); // ✅ এই ফাংশন call করতে হবে
    navigate('/login'); // ✅ logout এর পর redirect
  }, [logout, navigate]);

  return (
    <div className="text-center mt-10 text-lg font-semibold text-gray-600">
      Logging out...
    </div>
  );
};

export default Logout;
