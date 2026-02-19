import AdminSponsorDash from "../../components/AdminSponsorsDash/AdminSponsorsDash.jsx";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar.jsx";

function AdminSponsors() {
  return (
    <div className="flex">
      <AdminSidebar />
      <AdminSponsorDash />
    </div>
  );
}

export default AdminSponsors;
