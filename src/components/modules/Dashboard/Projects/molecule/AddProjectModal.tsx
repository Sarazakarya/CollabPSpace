import { useTranslation } from "react-i18next";
import type { UseFormReturn, SubmitHandler } from "react-hook-form";
import { CalendarDays, Flag } from "@/assets/icons/Icons";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { priorityModal, statusModal } from "../types/ProjesctModalType";
import type { ProjectFormValues } from "../schema/ProjectModal";
import TeamListSkeleton from "./TeamListSekelton";
import ProjectModalHeader from "./ProjectModalHeader";
import ActionModalButtons from "./ActionModalButtons";

interface AddProjectModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  teams: {
    id: number;
    name: string;
    members: number;
  }[];
  isLoading: boolean;
  form: UseFormReturn<ProjectFormValues>;
  selectedTeams: number[];
  handleTeamChange: (teamId: number, checked: boolean) => void;
  onSubmit: SubmitHandler<ProjectFormValues>;
  isPending: boolean;
}

export default function AddProjectModal({
  open,
  setOpen,
  teams = [],
  isLoading = false,
  form,
  selectedTeams,
  handleTeamChange,
  onSubmit,
  isPending,
}: AddProjectModalProps) {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = form;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="ds-bg-card flex max-h-[90vh] flex-col gap-0 overflow-hidden p-0 sm:max-w-2xl">
        <ProjectModalHeader />

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex min-h-0 flex-1 flex-col"
        >
          <div className="flex-1 space-y-8 overflow-y-auto px-6 py-6">
            <section className="space-y-4">
              <div>
                <h3 className="ds-title-md ds-text-primary">
                  {t("projects.modal.basicInfo")}
                </h3>
                <p className="ds-text-sm ds-text-secondary">
                  {t("projects.modal.basicInfoDescription")}
                </p>
              </div>

              <div className="space-y-2">
                <label htmlFor="project-name" className="text-sm font-medium">
                  {t("projects.modal.projectName")} *
                </label>

                <Input
                  id="project-name"
                  placeholder={t("projects.modal.namePlaceholder")}
                  className="h-12 rounded-xl"
                  {...register("name")}
                />

                {errors.name && (
                  <p className="text-sm text-destructive">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="project-description"
                  className="text-sm font-medium"
                >
                  {t("projects.modal.projectDescription")} *
                </label>

                <Textarea
                  id="project-description"
                  placeholder={t("projects.modal.descriptionPlaceholder")}
                  className="min-h-32 rounded-xl"
                  {...register("description")}
                />

                {errors.description && (
                  <p className="text-sm text-destructive">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </section>

            <div className="border-t border-border" />

            <section className="space-y-4">
              <div>
                <h3 className="ds-title-md ds-text-primary">
                  {t("projects.modal.timeline")}
                </h3>
                <p className="ds-text-sm ds-text-secondary">
                  {t("projects.modal.timelineDescription")}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label
                    htmlFor="start-date"
                    className="flex items-center gap-2 text-sm font-medium"
                  >
                    <CalendarDays className="ds-text-secondary size-4" />
                    {t("projects.modal.startDate")} *
                  </label>

                  <Input
                    id="start-date"
                    type="date"
                    className="h-12 rounded-xl"
                    {...register("start_date")}
                  />

                  {errors.start_date && (
                    <p className="text-sm text-destructive">
                      {errors.start_date.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="deadline"
                    className="flex items-center gap-2 text-sm font-medium"
                  >
                    <CalendarDays className="ds-text-secondary size-4" />
                    {t("projects.modal.deadline")} *
                  </label>

                  <Input
                    id="deadline"
                    type="date"
                    className="h-12 rounded-xl"
                    {...register("deadline")}
                  />

                  {errors.deadline && (
                    <p className="text-sm text-destructive">
                      {errors.deadline.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {t("projects.modal.status")}
                  </label>

                  <Select
                    value={watch("status")}
                    onValueChange={(value) =>
                      setValue("status", value as ProjectFormValues["status"], {
                        shouldValidate: true,
                      })
                    }
                  >
                    <SelectTrigger className="h-10 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      {statusModal.map((status) => (
                        <SelectItem key={status} value={status}>
                          {t(`projects.status.${status}`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium">
                    <Flag className="ds-text-secondary size-4" />
                    {t("projects.modal.priority")}
                  </label>

                  <Select
                    value={watch("priority")}
                    onValueChange={(value) =>
                      setValue(
                        "priority",
                        value as ProjectFormValues["priority"],
                        { shouldValidate: true },
                      )
                    }
                  >
                    <SelectTrigger className="h-10 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      {priorityModal.map((priority) => (
                        <SelectItem key={priority} value={priority}>
                          {t(`projects.priority.${priority}`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </section>

            <div className="border-t border-border" />

            <section className="space-y-3">
              <div>
                <h3 className="ds-title-md ds-text-primary">
                  {t("projects.modal.assignTeams")}
                </h3>
                <p className="ds-text-sm ds-text-secondary">
                  {t("projects.modal.assignTeamsDescription")}
                </p>
              </div>

              <div className="max-h-64 overflow-y-auto rounded-xl border border-border p-2">
                {isLoading ? (
                  <TeamListSkeleton />
                ) : (
                  teams.map((team) => (
                    <label
                      key={team.id}
                      htmlFor={`team-${team.id}`}
                      className="hover:bg-accent flex cursor-pointer items-center gap-4 rounded-lg px-3 py-3"
                    >
                      <Checkbox
                        id={`team-${team.id}`}
                        checked={selectedTeams.includes(team.id)}
                        onCheckedChange={(checked) =>
                          handleTeamChange(team.id, checked === true)
                        }
                      />

                      <div className="flex-1">
                        <p className="ds-text-primary text-base font-medium">
                          {team.name}
                        </p>

                        <p className="ds-text-sm ds-text-secondary">
                          {team.members} members
                        </p>
                      </div>
                    </label>
                  ))
                )}
              </div>

              {errors.teams && (
                <p className="text-sm text-destructive">
                  {errors.teams.message}
                </p>
              )}
            </section>
          </div>

          <ActionModalButtons setOpen={setOpen} isPending={isPending} />
        </form>
      </DialogContent>
    </Dialog>
  );
}
