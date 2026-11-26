import ProfilePage from "@/components/modules/Dashboard/Profile/organisms/ProfilePage";
import Seo from "@/core/seo/Seo";

const Profile = () => {
  return (
    <>
      <Seo
        title=" Chats | Collabspace"
        description="Manage your projects, tasks, meetings and teams in one place."
        keywords={["Dashboard", "Projects", "Tasks", "Teams", "Meeting"]}
        noIndex
      />
      <ProfilePage />
    </>
  );
};

export default Profile;
