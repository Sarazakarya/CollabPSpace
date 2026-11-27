import { useTranslation } from "react-i18next";
import { useSubmitReportForm } from "../hooks/useSubmitReportForm";

export const SubmitDetailedReportCard = () => {
  const { t } = useTranslation();
  const { form, onSubmit, isPending } = useSubmitReportForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <h3 className="mb-5 text-base font-medium text-gray-800">
        {t("reports.form.title", "Submit a detailed report")}
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <select
            {...register("reportType")}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-600 focus:border-blue-500 focus:outline-none"
          >
            <option value="">
              {t("reports.form.selectType", "Select Report Type")}
            </option>
            <option value="projects">
              {t("reports.form.types.projects", "Project Reports")}
            </option>
            <option value="tasks">
              {t("reports.form.types.tasks", "Task Reports & Productivity")}
            </option>
            <option value="teams">
              {t("reports.form.types.teams", "Team Performance Reports")}
            </option>
            <option value="users">
              {t("reports.form.types.users", "Personal Productivity Report")}
            </option>
          </select>

          {errors.reportType && (
            <p className="mt-1 text-xs text-rose-500">
              {errors.reportType.message}
            </p>
          )}
        </div>

        <div>
          <input
            type="text"
            {...register("note")}
            placeholder={t("reports.form.addNote", "Add Note")}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none"
          />

          {errors.note && (
            <p className="mt-1 text-xs text-rose-500">{errors.note.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <input
              type="date"
              {...register("startDate")}
              aria-label="Start Date"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-600 focus:border-blue-500 focus:outline-none"
            />

            {errors.startDate && (
              <p className="mt-1 text-xs text-rose-500">
                {errors.startDate.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="date"
              {...register("endDate")}
              aria-label="End Date"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-600 focus:border-blue-500 focus:outline-none"
            />

            {errors.endDate && (
              <p className="mt-1 text-xs text-rose-500">
                {errors.endDate.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isPending}
            className="rounded-full bg-[#0052FF] px-7 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            {isPending
              ? t("common.submitting", "Submitting...")
              : t("common.submit", "Submit")}
          </button>
        </div>
      </form>
    </div>
  );
};
