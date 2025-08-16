
import useAuth from '../hooks/useAuth';
import AdminDashboard from './AdminHome';
import ViewBiodata from './ViewBiodata';

const Overview = () => {
  const { user } = useAuth();
  return user?.role?.role === 'admin' ? (
    <AdminDashboard></AdminDashboard>
  ) : (
    <ViewBiodata></ViewBiodata>
  );
};

export default Overview;
