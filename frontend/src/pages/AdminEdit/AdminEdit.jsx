import AdminSidebar from "../../components/AdminSidebar/AdminSidebar.jsx";
import Homepage from "../homepage/Homepage.jsx";

function AdminEdit() {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="w-4/5 ml-64">
        <Homepage />
      </div>
    </div>
  );
}

export default AdminEdit;
