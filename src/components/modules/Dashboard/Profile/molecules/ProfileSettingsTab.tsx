import React from "react";
import { useTranslation } from "react-i18next";
import { Check, Mail, User } from "lucide-react";
import type { UserProfile } from "../types/profile.types";
import { useUpdateProfileSettings } from "../hooks/useUpdateProfileSettings";

interface ProfileSettingsTabProps {
  user?: UserProfile;
  onRefetch?: () => void;
}

export const ProfileSettingsTab: React.FC<ProfileSettingsTabProps> = ({
  user,
  onRefetch,
}) => {
  const { t } = useTranslation();
  const { form, onSubmit, isPending } = useUpdateProfileSettings(
    user,
    onRefetch,
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pt-2">
      {/* Personal Info Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h3 className="text-base font-semibold text-gray-900">
            {t("profile.settings.personalInfo.title")}
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-gray-500">
            {t("profile.settings.personalInfo.subtitle")}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-8">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-700">
                {t("profile.settings.personalInfo.fullName")}
              </label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  {...register("name")}
                  placeholder="Mohamed Salah"
                  className="w-full rounded-full border border-gray-200 py-2.5 pl-10 pr-4 text-sm text-gray-800 focus:border-[#0052FF] focus:outline-none"
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-xs text-rose-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-700">
                {t("profile.settings.personalInfo.email")}
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  {...register("email")}
                  placeholder="Admin@Example.com"
                  className="w-full rounded-full border border-gray-200 py-2.5 pl-10 pr-4 text-sm text-gray-800 focus:border-[#0052FF] focus:outline-none"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-rose-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-700">
                {t("profile.settings.personalInfo.phone")}
              </label>
              <input
                type="tel"
                {...register("phone")}
                placeholder="+20 (123) 456-9878"
                className="w-full rounded-full border border-gray-200 px-4 py-2.5 text-sm text-gray-800 focus:border-[#0052FF] focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-700">
                {t("profile.settings.personalInfo.status")}
              </label>
              <input
                type="text"
                {...register("status")}
                placeholder="Active"
                className="w-full rounded-full border border-gray-200 px-4 py-2.5 text-sm text-gray-800 focus:border-[#0052FF] focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Experience Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h3 className="text-base font-semibold text-gray-900">
            {t("profile.settings.experience.title")}
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-gray-500">
            {t("profile.settings.experience.subtitle")}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-8">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-700">
                {t("profile.settings.experience.jobTitle")}
              </label>
              <input
                type="text"
                {...register("job_title")}
                placeholder="Senior UI/UX Designer"
                className="w-full rounded-full border border-gray-200 px-4 py-2.5 text-sm text-gray-800 focus:border-[#0052FF] focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-700">
                {t("profile.settings.experience.yearsOfExperience")}
              </label>
              <input
                type="number"
                {...register("years_of_experience")}
                placeholder="5"
                className="w-full rounded-full border border-gray-200 px-4 py-2.5 text-sm text-gray-800 focus:border-[#0052FF] focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-1.5 block text-xs font-medium text-gray-700">
                {t("profile.settings.experience.currentTeamProject")}
              </label>
              <input
                type="text"
                {...register("current_team_project")}
                placeholder="CollabSpace - Web Platform"
                className="w-full rounded-full border border-gray-200 px-4 py-2.5 text-sm text-gray-800 focus:border-[#0052FF] focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Save Action Button */}
      <div className="border-t border-gray-200 pt-6">
        <button
          type="submit"
          disabled={isPending}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0052FF] py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          <span>
            {isPending
              ? t("profile.settings.saving")
              : t("profile.settings.save")}
          </span>
          <Check className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
};
