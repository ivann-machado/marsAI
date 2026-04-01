import AdminSidebar from "../../components/AdminSidebar/AdminSidebar.jsx";
import AdminReviewsDash from "../../components/AdminVideosDash/AdminReviewsDash.jsx";

function AdminReviewVideos() {
  return (
    <div className="flex">
      <AdminSidebar />
      <AdminReviewsDash />
    </div>
  );
}

export default AdminReviewVideos;
