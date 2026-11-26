import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { CalendarPlus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import useCreateMeeting from "../hooks/useCreateMeeting";
import useGetMeetingProjects from "../hooks/useGetMeetingProjects";
import useGetProjectMembers from "../hooks/useGetProjectMembers";
import {
  DEFAULT_MEETING_VALUES,
  createMeetingSchema,
  type MeetingFormValues,
} from "../utils/meetingSchema";
import type { AddMeetingProps } from "../types/MeetingTypes";

const AddMeetingModal = ({ open, setOpen }: AddMeetingProps) => {
  const { t } = useTranslation();

  const schema = useMemo(() => createMeetingSchema(t), [t]);
  const form = useForm<MeetingFormValues>({
    resolver: zodResolver(schema),
    defaultValues: DEFAULT_MEETING_VALUES,
  });

  const { handleSubmit, reset, setValue, watch, register } = form;
  const projectId = watch("project_id");

  const { data: projects = [] } = useGetMeetingProjects(open);
  const { data: members = [], isLoading: loadingMembers } =
    useGetProjectMembers(projectId);

  const createMutation = useCreateMeeting({ onSuccess: () => setOpen(false) });

  useEffect(() => {
    if (!open) reset(DEFAULT_MEETING_VALUES);
  }, [open, reset]);

  const required = <span className="ds-text-danger">*</span>;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="ds-bg-card flex max-h-[90vh] flex-col gap-0 overflow-hidden p-0 sm:max-w-xl">
        <DialogHeader className="flex-row items-start gap-4 border-b border-border px-6 py-5 text-start">
          <div className="ds-bg-brand-soft ds-text-brand flex size-12 shrink-0 items-center justify-center rounded-2xl">
            <CalendarPlus className="size-5" />
          </div>
          <div className="space-y-1 pe-6">
            <DialogTitle className="ds-title-lg">
              {t("meetings.modal.title")}
            </DialogTitle>
            <DialogDescription className="ds-text-base ds-text-secondary">
              {t("meetings.modal.description")}
            </DialogDescription>
          </div>
        </DialogHeader>

        <form
          onSubmit={handleSubmit((values) => createMutation.mutate(values))}
          noValidate
          className="flex min-h-0 flex-1 flex-col"
        >
          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-6 py-6">
            {/* Project */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {t("meetings.modal.project")} {required}
              </label>
              <Select
                value={projectId > 0 ? String(projectId) : ""}
                onValueChange={(value) => {
                  setValue("project_id", Number(value));
                  setValue("attendee_ids", []);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={t("meetings.modal.selectProject")}
                  />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={String(project.id)}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.project_id && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.project_id.message}
                </p>
              )}
            </div>

            {/* Title */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {t("meetings.modal.name")} {required}
              </label>
              <Input
                placeholder={t("meetings.modal.namePlaceholder")}
                className="h-11 rounded-xl"
                {...register("title")}
              />
              {form.formState.errors.title && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.title.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {t("meetings.modal.descriptionLabel")}
              </label>
              <Textarea
                rows={3}
                placeholder={t("meetings.modal.descriptionPlaceholder")}
                className="rounded-xl"
                {...register("description")}
              />
              {form.formState.errors.description && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.description.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                {t("meetings.modal.date")} {required}
              </label>
              <Input
                type="date"
                className="h-11 rounded-xl"
                {...register("meeting_date")}
              />
              {form.formState.errors.meeting_date && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.meeting_date.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {t("meetings.modal.startTime")} {required}
                </label>
                <Input
                  type="time"
                  className="h-11 rounded-xl"
                  {...register("start_time")}
                />
                {form.formState.errors.start_time && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.start_time.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {t("meetings.modal.endTime")} {required}
                </label>
                <Input
                  type="time"
                  className="h-11 rounded-xl"
                  {...register("end_time")}
                />
                {form.formState.errors.end_time && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.end_time.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                {t("meetings.modal.link")}
              </label>
              <Input
                dir="ltr"
                placeholder="https://meet.google.com/..."
                className="h-11 rounded-xl"
                {...register("meeting_link")}
              />
              {form.formState.errors.meeting_link && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.meeting_link.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div>
                <label className="text-sm font-medium">
                  {t("meetings.modal.attendees")}
                </label>
                <p className="ds-text-sm ds-text-secondary">
                  {t("meetings.modal.attendeesDescription")}
                </p>
              </div>

              <div className="max-h-44 overflow-y-auto rounded-xl border border-border p-2">
                {projectId <= 0 ? (
                  <p className="ds-text-sm ds-text-disabled p-2">
                    {t("meetings.modal.selectProjectFirst")}
                  </p>
                ) : loadingMembers ? (
                  <p className="ds-text-sm ds-text-disabled p-2">…</p>
                ) : members.length === 0 ? (
                  <p className="ds-text-sm ds-text-disabled p-2">
                    {t("meetings.modal.noMembers")}
                  </p>
                ) : (
                  members.map((member) => (
                    <label
                      key={member.id}
                      htmlFor={`member-${member.id}`}
                      className="hover:bg-accent flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2"
                    >
                      <Checkbox
                        id={`member-${member.id}`}
                        checked={form.watch("attendee_ids").includes(member.id)}
                        onCheckedChange={(checked) => {
                          const currentIds = form.getValues("attendee_ids");

                          setValue(
                            "attendee_ids",
                            checked
                              ? [...currentIds, member.id]
                              : currentIds.filter((id) => id !== member.id),
                          );
                        }}
                      />
                      <span className="ds-text-sm ds-text-primary">
                        {member.name}
                      </span>
                    </label>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-center justify-between gap-3 border-t border-border px-6 py-4">
            <p className="ds-text-sm ds-text-secondary">
              {required} {t("projects.modal.requiredFields")}
            </p>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="h-11 rounded-xl px-6"
                onClick={() => setOpen(false)}
                disabled={createMutation.isPending}
              >
                {t("common.cancel")}
              </Button>
              <Button
                type="submit"
                className="h-11 rounded-xl px-5"
                disabled={createMutation.isPending}
              >
                {createMutation.isPending
                  ? t("meetings.modal.creating")
                  : t("meetings.modal.create")}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMeetingModal;
