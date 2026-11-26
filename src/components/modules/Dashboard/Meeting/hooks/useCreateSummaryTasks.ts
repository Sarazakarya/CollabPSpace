import { useTranslation } from "react-i18next";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { useAlert } from "@/shared/hooks/useAlert";
import { createTasksFromSummary } from "../api/createTasksFromSummary";
import { getApiErrorMessage } from "../utils/meetingUtils";

const useCreateSummaryTasks = (meetingId: number) => {
  const { t } = useTranslation();
  const { showAlert } = useAlert();

  return useApiMutation({
    mutationFn: () => createTasksFromSummary(meetingId),

    options: {
      onSuccess: () => showAlert("success", t("meetings.alerts.tasksCreated")),

      onError: (error) => {
        showAlert("error", getApiErrorMessage(error) || t("meetings.alerts.tasksError"));
      },
    },
  });
};

export default useCreateSummaryTasks;
