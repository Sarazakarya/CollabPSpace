import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { isAxiosError } from "axios";
import { useQueryClient } from "@tanstack/react-query";
import type { z } from "zod";

import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { useAlert } from "@/shared/hooks/useAlert";
import type { ApiErrorResponse } from "@/shared/types/api-error-response";

import { getProfileSettingsSchema } from "../schema/profileSettingsSchema";

import {
  defaultProfileSettingsValues,
  type UserProfile,
} from "../types/profile.types";

import { updateProfileFormData } from "../api/updateProfile";

export const useUpdateProfileSettings = (
  user?: UserProfile,
  onSuccessRefetch?: () => void,
) => {
  const { t } = useTranslation();
  const { showAlert } = useAlert();
  const queryClient = useQueryClient();

  const schema = getProfileSettingsSchema(t);

  type FormInput = z.input<typeof schema>;
  type FormOutput = z.output<typeof schema>;

  const form = useForm<FormInput, unknown, FormOutput>({
    resolver: zodResolver(schema),
    defaultValues: defaultProfileSettingsValues,
  });

  const refreshProfile = () => {
    queryClient.invalidateQueries({
      queryKey: ["ProfileMe"],
    });

    onSuccessRefetch?.();
  };

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        status: user.status || "active",
        job_title: user.job_title || "",
        years_of_experience: user.years_of_experience ?? 0,
        current_team_project: user.current_team_project || "",
      });
    }
  }, [user, form.reset]);

  const { mutate, isPending } = useApiMutation({
    mutationFn: (values: FormOutput) => {
      const formData = new FormData();

      formData.append("name", values.name);

      if (values.job_title) {
        formData.append("job_title", values.job_title);
      }

      if (values.phone) {
        formData.append("phone", values.phone);
      }

      if (values.years_of_experience !== undefined) {
        formData.append(
          "years_of_experience",
          String(values.years_of_experience),
        );
      }

      return updateProfileFormData(formData);
    },
    options: {
      onSuccess: () => {
        showAlert("success", t("profile.alerts.updateSuccess"));
        refreshProfile();
      },
      onError: (error) => {
        const message = isAxiosError<ApiErrorResponse>(error)
          ? error.response?.data?.message
          : undefined;

        showAlert("error", message || t("profile.alerts.updateError"));
      },
    },
  });

  const { mutate: uploadAvatar, isPending: isUploadingAvatar } = useApiMutation(
    {
      mutationFn: (file: File) => {
        const formData = new FormData();
        formData.append("avatar", file);

        return updateProfileFormData(formData);
      },
      options: {
        onSuccess: () => {
          showAlert("success", t("profile.alerts.avatarSuccess"));
          refreshProfile();
        },
        onError: (error) => {
          const message = isAxiosError<ApiErrorResponse>(error)
            ? error.response?.data?.message
            : undefined;

          showAlert("error", message || t("profile.alerts.avatarError"));
        },
      },
    },
  );

  const onSubmit = (values: FormOutput) => {
    mutate(values);
  };

  return {
    form,
    onSubmit,
    isPending,
    uploadAvatar,
    isUploadingAvatar,
  };
};
