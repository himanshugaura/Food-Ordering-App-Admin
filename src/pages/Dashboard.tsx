import Layout from '@/components/common/Layout';
import { Outlet } from 'react-router-dom';


export default function Dashboard() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}