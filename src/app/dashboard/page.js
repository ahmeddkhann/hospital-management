// pages/admin.js
import Sidebar from "./sidebar/page";
import WelcomeMessage from "./home/page";

const AdminPage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <WelcomeMessage />
    </div>
  );
};

export default AdminPage;
