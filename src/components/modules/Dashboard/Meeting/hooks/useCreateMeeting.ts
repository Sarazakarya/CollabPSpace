import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { useAlert } from "@/shared/hooks/useAlert";
import { createMeeting } from "../api/createMeeting";
import type { MeetingFormValues } from "../utils/meetingSchema";
import { getApiErrorMessage } from "../utils/meetingUtils";
import { meetingKeys } from "./meetingKeys";

interface Props {
  onSuccess: () => void;
}

const useCreateMeeting = ({ onSuccess }: Props) => {
  const { t } = useTranslation();
  const { showAlert } = useAlert();
  const queryClient = useQueryClient();

  return useApiMutation({
    mutationFn: (values: MeetingFormValues) => createMeeting(values),

    options: {
      onSuccess: () => {
        showAlert("success", t("meetings.alerts.created"));
        queryClient.invalidateQueries({ queryKey: meetingKeys.list });
        onSuccess();
      },

      onError: (error) => {
        showAlert("error", getApiErrorMessage(error) || t("meetings.alerts.createError"));
      },
    },
  });
};

export default useCreateMeeting;
