"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SnapshotPolicyResponse,
  SnapshotPolicySchema,
} from "@/services/snapshot_policy.service";
import { useEditPolicyMutation } from "@/hooks";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const EditForm: React.FC<{ data: SnapshotPolicyResponse }> = ({
  data,
}) => {
  const { mutate, isPending } = useEditPolicyMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<SnapshotPolicyResponse>({
    resolver: zodResolver(SnapshotPolicySchema),
    defaultValues: data || {
      policyName: "",
      applyToDirectory: "",
      scheduleType: "Daily or Weekly",
      snapshotTime: { hours: 0, minutes: 0 },
      days: [],
      deleteEachSnapshot: "Never",
      enableLockedSnapshots: false,
      enablePolicy: false,
    },
  });

  const deleteEachSnapshot = watch("deleteEachSnapshot");

  const handleDeleteEachSnapshotChange = (value: any) => {
    setValue("deleteEachSnapshot", value);
    if (value === "Never") setValue("enableLockedSnapshots", false);
  };

  const onSubmit = (formData: SnapshotPolicyResponse) => {
    const updatedFormData = {
      ...formData,
      deleteEachSnapshot,
    };
    mutate({ data: updatedFormData, id: data?.id || "32" });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="!text-form font-normal">
      <InputWithLabel
        control={control}
        errors={errors}
        label="Policy Name"
        id="policyName"
        placeholder="ProjectX_Daily"
      />
      <InputWithLabel
        control={control}
        errors={errors}
        label="Apply to Directory"
        id="applyToDirectory"
        placeholder="Production/ProjectX"
        icon
      />
      <label htmlFor="schedule" className="text-lg">
        Run Policy on the Following Schedule
      </label>
      <div className="shadow-lg bg-secondary-background p-2 md:p-4 lg:py-9 lg:px-6 border-t border-secondary-border mt-2 text-lg">
        <ScheduleTypeSelector control={control} />
        <TimeZoneSection />
        <TimeInput control={control} errors={errors} />
        <DaysSelector control={control} errors={errors} />
        <DeleteEachSnapshot
          control={control}
          deleteEachSnapshot={deleteEachSnapshot}
          handleDeleteEachSnapshotChange={handleDeleteEachSnapshotChange}
          errors={errors}
        />
      </div>

      <SnapshotLocking
        control={control}
        deleteEachSnapshot={deleteEachSnapshot}
        errors={errors}
      />
      <EnablePolicy
        control={control}
        errors={errors}
        isPending={isPending}
        handleCancel={reset}
      />
    </form>
  );
};

const ScheduleTypeSelector = ({ control }: { control: any }) => (
  <div className="flex flex-col md:flex-row gap-2 md:gap-6 md:items-center md:w-fit">
    <label
      htmlFor="scheduleType"
      className="md:text-right text-form md:text-nowrap leading-[25.7px] md:min-w-[244px]"
    >
      Select Schedule Type
    </label>
    <Controller
      name="scheduleType"
      control={control}
      render={({ field }) => (
        <Select value={field.value} onValueChange={field.onChange}>
          <SelectTrigger className="w-full md:min-w-[189px] max-h-9 bg-input-secondary border-border-muted px-2 py-1.5 text-lg font-normal">
            <SelectValue placeholder="Schedule Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Daily or Weekly">Daily or Weekly</SelectItem>
            <SelectItem value="Monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
      )}
    />
  </div>
);

type ErrorMessage = {
  message?: string;
};

type DeleteSnapshotObj = {
  after?: ErrorMessage;
  unit?: ErrorMessage;
};

interface InputWithLabelProps {
  control: any;
  errors: Partial<Record<string, ErrorMessage>>;
  label: string;
  id: keyof SnapshotPolicyResponse;
  placeholder: string;
  className?: string;
  icon?: boolean;
}

const InputWithLabel: React.FC<InputWithLabelProps> = ({
  control,
  errors,
  label,
  id,
  placeholder,
  className,
  icon = false,
}) => (
  <div className={cn("flex flex-col gap-2 mb-3", className)}>
    <label htmlFor={id.toString()} className="text-lg leading-6">
      {label}
    </label>
    <div className="relative w-full">
      {icon && (
        <div className="absolute inset-y-0 left-0 flex items-center px-4 border border-border-muted bg-[#1a222c] rounded-l-md">
          /
        </div>
      )}
      <Controller
        name={id as string}
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            id={id as string}
            className={cn(
              "bg-input border-border-muted py-1.5 px-2 text-lg h-9",
              {
                "pl-12": icon,
              },
            )}
            placeholder={placeholder}
          />
        )}
      />
    </div>
    {errors[id] && (
      <p className="text-red-500 mt-1 text-sm">{errors[id]?.message}</p>
    )}
  </div>
);

const TimeZoneSection = () => (
  <div className="flex flex-col md:flex-row gap-2 md:gap-6 mt-3 md:items-center">
    <h2 className="md:text-right md:min-w-[244px]">Set to Time Zone</h2>
    <div className="flex items-center gap-1">
      <h2>America/Los Angeles</h2>
      <span className="ml-3 flex h-4 w-4 items-center justify-center rounded-full bg-[#0298FF] text-sm text-secondary-background font-medium">
        ?
      </span>
    </div>
  </div>
);
interface TimeInputProps {
  control: any;
  errors: Partial<Record<string, { message?: string }>>;
}

const TimeInput: React.FC<TimeInputProps> = ({ control, errors }) => (
  <div className="flex flex-col md:flex-row gap-2 md:gap-6 mt-5 md:mt-3 md:items-center">
    <span className="md:text-right my-auto leading-[25.7px] md:min-w-[244px]">
      Take a Snapshot at
    </span>
    <div className="flex items-center">
      <Controller
        name="snapshotTime.hours"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            type="number"
            placeholder="HH"
            className="w-[46px] text-center bg-input-secondary border-border-muted h-9 appearance-none"
            min={0}
            max={23}
            onChange={(e) =>
              field.onChange(Math.max(0, Math.min(23, Number(e.target.value))))
            }
          />
        )}
      />
      <span className="mx-2">:</span>
      <Controller
        name="snapshotTime.minutes"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            type="number"
            placeholder="MM"
            className="w-[46px] text-center bg-input-secondary border-border-muted h-9"
            min={0}
            max={59}
            onChange={(e) =>
              field.onChange(Math.max(0, Math.min(59, Number(e.target.value))))
            }
          />
        )}
      />
    </div>
    {errors.snapshotTime && (
      <p className="text-red-500 mt-1">{errors.snapshotTime.message}</p>
    )}
  </div>
);

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const DaysSelector = ({
  control,
  errors,
}: {
  control: any;
  errors: Partial<Record<string, ErrorMessage>>;
}) => (
  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 mt-5 md:mt-3">
    <p className="md:text-right text-form leading-[25.7px] md:min-w-[244px]">
      On the Following Day(s)
    </p>
    <div className="flex flex-wrap col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-5">
      <Controller
        name="days"
        control={control}
        render={({ field }) => (
          <div className="grid grid-cols-1 sm:grid-cols-3 md:flex flex-wrap">
            <CheckboxWithLabel
              checked={field.value?.includes("Every day")}
              onChange={(e) => field.onChange(e ? ["Every day"] : [])}
              label="Every Day"
            />
            {days.map((day) => (
              <CheckboxWithLabel
                key={day}
                checked={field.value?.includes(day)}
                onChange={(e) => {
                  const newValue = e
                    ? [
                        ...field.value.filter((d: string) => d !== "Every day"),
                        day,
                      ]
                    : field.value.filter((d: string) => d !== day);
                  field.onChange(newValue);
                }}
                label={day}
              />
            ))}
          </div>
        )}
      />
    </div>
    {errors.days && <p className="text-red-500 mt-1">{errors.days.message}</p>}
  </div>
);

const CheckboxWithLabel: React.FC<{
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}> = ({ checked, onChange, label }) => (
  <div className="flex items-center mr-6">
    <Checkbox checked={checked} onCheckedChange={onChange} />
    <label className="ml-3 text-lg leading-[25.7px] capitalize">{label}</label>
  </div>
);

const DeleteEachSnapshot = ({
  control,
  deleteEachSnapshot,
  handleDeleteEachSnapshotChange,
  errors,
}: {
  control: any;
  deleteEachSnapshot: any;
  handleDeleteEachSnapshotChange: (value: any) => void;
  errors: Partial<Record<string, ErrorMessage | DeleteSnapshotObj>>;
}) => (
  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 mt-5 md:mt-3">
    <p className="md:text-right leading-[25.7px] md:min-w-[244px]">
      Delete Each Snapshot
    </p>
    <div className="flex flex-wrap col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-5">
      <Controller
        name="deleteEachSnapshot"
        control={control}
        render={({ field }) => (
          <>
            <div className="flex items-center mr-6">
              <input
                id="deleteEachSnapshot"
                name="deleteEachSnapshot"
                type="radio"
                value="Never"
                checked={field.value === "Never"}
                onChange={() => handleDeleteEachSnapshotChange("Never")}
                className="w-4 h-4"
              />
              <label
                htmlFor="deleteEachSnapshot"
                className="ml-2 text-lg text-form"
              >
                Never
              </label>
            </div>

            <div className="flex items-center flex-wrap sm:flex-nowrap md:flex-wrap lg:flex-nowrap">
              <input
                id="auto-delete-radio"
                type="radio"
                checked={field.value !== "Never"}
                onChange={() =>
                  handleDeleteEachSnapshotChange({ after: 7, unit: "day" })
                }
                className="w-4 h-4 "
              />
              <label
                htmlFor="auto-delete-radio"
                className="ml-2 text-lg text-form"
              >
                Automatically After
              </label>
              <div className="flex flex-nowrap">
                <Controller
                  name="deleteEachSnapshot.after"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="deleteEachSnapshot.after"
                      type="number"
                      className="w-[41px] ml-3 bg-input-secondary border-border-muted h-9"
                      {...field}
                      disabled={deleteEachSnapshot === "Never"}
                      onChange={(e) =>
                        field.onChange(Number(e.target.value) || 0)
                      }
                    />
                  )}
                />
                <Controller
                  name="deleteEachSnapshot.unit"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={deleteEachSnapshot === "Never"}
                    >
                      <SelectTrigger className="w-[97px] ml-3 bg-input-secondary border-border-muted h-9">
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="day">Day(s)</SelectItem>
                        <SelectItem value="week">Week(s)</SelectItem>
                        <SelectItem value="month">Month(s)</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
          </>
        )}
      />
    </div>
  </div>
);

const SnapshotLocking = ({
  control,
  deleteEachSnapshot,
  errors,
}: {
  control: any;
  deleteEachSnapshot: any;
  errors: Partial<Record<string, ErrorMessage>>;
}) => (
  <>
    <h2 className="text-lg text-form mt-11">Snapshot Locking</h2>
    <p className="text-base text-form/80 mt-1">
      Locked snapshots cannot be deleted before the deletion schedule expires.
      For this feature to be available, snapshots must be set to automatically
      delete.
    </p>
    <div className="flex items-center mt-1.5">
      <Controller
        name="enableLockedSnapshots"
        control={control}
        render={({ field }) => (
          <Checkbox
            id="lock-checkbox"
            checked={field.value}
            onCheckedChange={field.onChange}
            disabled={
              deleteEachSnapshot === "Never" ||
              (deleteEachSnapshot.after === undefined &&
                deleteEachSnapshot.unit === undefined)
            }
          />
        )}
      />
      <label htmlFor="lock-checkbox" className="ml-3 text-lg text-form">
        Enable locked snapshots
      </label>
    </div>
    {errors.enableLockedSnapshots && (
      <p className="text-red-500 mt-1">
        {errors.enableLockedSnapshots.message}
      </p>
    )}
  </>
);

const EnablePolicy = ({
  control,
  errors,
  isPending,
  handleCancel,
}: {
  control: any;
  errors: Partial<Record<string, ErrorMessage>>;
  isPending: boolean;
  handleCancel: () => void;
}) => (
  <>
    <div className="flex items-center mt-14">
      <Controller
        name="enablePolicy"
        control={control}
        render={({ field }) => (
          <Checkbox
            id="policy-checkbox"
            checked={field.value}
            onCheckedChange={field.onChange}
          />
        )}
      />
      <label htmlFor="policy-checkbox" className="ml-3 text-lg text-form">
        Enable policy
      </label>
    </div>
    {errors.enablePolicy && (
      <p className="text-red-500 mt-1">{errors.enablePolicy.message}</p>
    )}
    <div className="flex gap-2.5 my-7">
      <Button
        type="submit"
        className="w-[125px] shadow-custom-bottom"
        variant="secondary"
        disabled={isPending}
      >
        Save Policy
      </Button>
      <Button
        type="button"
        onClick={handleCancel}
        variant="ghost"
        disabled={isPending}
      >
        Cancel
      </Button>
    </div>
  </>
);

export default EditForm;
