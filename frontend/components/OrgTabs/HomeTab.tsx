import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { apiDeleteOrganization } from "@/lib/apiRequests";
import showToast from "@/lib/toastNotification";
import ConfirmationDialog from "../elements/ConfirmationDialog";
interface HomeTabProps {
  org: any;
}
const HomeTab = ({ org }: HomeTabProps) => {
  const [isCreator, setIsCreator] = React.useState(false);
  const handleDeleteOrg = async () => {
    try {
      const res = await apiDeleteOrganization(org.slug);
      if (res.status === 204) {
        showToast("success", "Organization Deleted Successfully");
        window.location.href = "/dashboard/organization";
      }
    } catch (error: any) {
      if (
        error.response.data.detail ===
        "You can't delete an organization with members"
      ) {
        showToast("error", "You can't delete an organization with members");
      }
    }
  };
  useEffect(() => {
    const checkCreator = () => {
      if (org?.creator.id === localStorage.getItem("user_id")) {
        setIsCreator(true);
      }
    };
    checkCreator();
  }, [org]);
  return (
    <>
      <div className="flex justify-end">
        {isCreator && (
          <ConfirmationDialog
            onConfirm={handleDeleteOrg}
            btnName="Delete Organization"
            confirmTitle="Delete Organization"
            confirmDescription="Are you sure you want to delete this organization?"
          />
        )}
      </div>
    </>
  );
};

export default HomeTab;
