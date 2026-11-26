import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { useAlert } from "@/shared/hooks/useAlert";
import {
  getProjectSchema,
  type ProjectFormValues,
} from "../schema/ProjectModal";
import { createProjectModal } from "../api/createProjectModal";
import { defaultModal } from "../types/ProjesctModalType";
import { isAxiosError } from "axios";
import type { ApiErrorResponse } from "@/shared/types/api-error-response";

const useCreateProject = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { showAlert } = useAlert();

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(getProjectSchema(t)),
    defaultValues: defaultModal,
  });

  const selectedTeams = form.watch("teams");

  const handleTeamChange = (teamId: number, checked: boolean) => {
    let updatedTeams = [...selectedTeams];

    if (checked) {
      updatedTeams.push(teamId);
    } else {
      updatedTeams = updatedTeams.filter((id) => id !== teamId);
    }

    form.setValue("teams", updatedTeams, {
      shouldValidate: true,
    });
  };

  const { mutate, isPending } = useApiMutation({
    mutationFn: (values: ProjectFormValues) =>
      createProjectModal({
        ...values,
        members: [],
      }),
    options: {
      onSuccess: () => {
        setOpen(false);
        showAlert("success", t("projects.alerts.createSuccess"));
      },
      onError: (error) => {
        const message = isAxiosError<ApiErrorResponse>(error)
          ? error.response?.data?.message
          : undefined;

        showAlert("error", message || t("projects.alerts.createError"));
      },
    },
  });

  const onSubmit = (values: ProjectFormValues) => {
    mutate(values);
  };

  useEffect(() => {
    if (!open) {
      form.reset(defaultModal);
    }
  }, [open, form]);

  return {
    open,
    setOpen,
    form,
    selectedTeams,
    handleTeamChange,
    onSubmit,
    isPending,
  };
};

export default useCreateProject;
