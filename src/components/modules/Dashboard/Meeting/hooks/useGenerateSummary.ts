import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { useAlert } from "@/shared/hooks/useAlert";
import { generateMeetingSummary } from "../api/generateMeetingSummary";
import { getApiErrorMessage } from "../utils/meetingUtils";
import { meetingKeys } from "./meetingKeys";

const useGenerateSummary = (meetingId: number) => {
  const { t } = useTranslation();
  const { showAlert } = useAlert();
  const queryClient = useQueryClient();

  return useApiMutation({
    mutationFn: () => generateMeetingSummary(meetingId),

    options: {
      onSuccess: () => {
        showAlert("success", t("meetings.alerts.summaryGenerated"));
        queryClient.invalidateQueries({ queryKey: meetingKeys.summary(meetingId) });
      },

      onError: (error) => {
        showAlert("error", getApiErrorMessage(error) || t("meetings.alerts.summaryError"));
      },
    },
  });
};

export default useGenerateSummary;
