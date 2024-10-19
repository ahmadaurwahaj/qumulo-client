"use client";
import React, { useCallback } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Control, Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useEditPolicyMutation } from "@/hooks";
import { cn } from "@/lib/utils";
import {
  SnapshotPolicyResponse,
  SnapshotPolicySchema,
} from "@/services/snapshot_policy.service";

type DeleteSnapshotObj = {
  after?: number;
  unit?: "day" | "week" | "month";
};

type ErrorMessage = {
  message?: string;
};

type ControlType = Control<SnapshotPolicyResponse>;
interface InputWithLabelProps {
  control: ControlType;
  errors: Partial<Record<keyof SnapshotPolicyResponse, ErrorMessage>>;
  label: string;
  id: keyof SnapshotPolicyResponse;
  placeholder: string;
  className?: string;
  icon?: boolean;
}

interface DeleteEachSnapshotProps {
  control: ControlType;
  deleteEachSnapshot: "Never" | DeleteSnapshotObj;
  handleDeleteEachSnapshotChange: (value: "Never" | DeleteSnapshotObj) => void;
}

type DaysType = Array<"Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun">;
const days: DaysType = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

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

  const handleDeleteEachSnapshotChange = useCallback(
    (value: "Never" | DeleteSnapshotObj) => {
      setValue("deleteEachSnapshot", value);
      if (value === "Never") setValue("enableLockedSnapshots", false);
    },
    [setValue],
  );

  const onSubmit = (formData: SnapshotPolicyResponse) => {
    const updatedFormData = {
      ...formData,
      deleteEachSnapshot,
    };
    mutate({ data: updatedFormData, id: data?.id || "32" });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="font-normal !text-form">
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
      <div className="mt-2 border-t border-secondary-border bg-grey-primary p-2 text-lg shadow-lg md:p-4 lg:px-6 lg:py-9">
        <ScheduleTypeSelector control={control} />
        <TimeZoneSection />
        <TimeInput control={control} errors={errors} />
        <DaysSelector control={control} errors={errors} />
        <DeleteEachSnapshot
          control={control}
          deleteEachSnapshot={deleteEachSnapshot}
          handleDeleteEachSnapshotChange={handleDeleteEachSnapshotChange}
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

const ScheduleTypeSelector: React.FC<{
  control: ControlType;
}> = ({ control }) => (
  <div className="flex flex-col gap-2 md:w-fit md:flex-row md:items-center md:gap-6">
    <label
      htmlFor="scheduleType"
      className="leading-[25.7px] text-form md:min-w-[244px] md:text-nowrap md:text-right"
    >
      Select Schedule Type
    </label>
    <Controller
      name="scheduleType"
      control={control}
      render={({ field }) => (
        <Select value={field.value} onValueChange={field.onChange}>
          <SelectTrigger className="max-h-9 w-full border-border-muted bg-input-secondary px-2 py-1.5 text-lg font-normal md:min-w-[189px]">
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
        <div className="absolute inset-y-0 left-0 flex items-center rounded-l-md border border-border-muted bg-[#1a222c] px-4">
          /
        </div>
      )}
      <Controller
        name={id}
        control={control}
        render={({ field }) => {
          // Convert value to a compatible type for the Input component
          const inputValue =
            typeof field.value === "string" || typeof field.value === "number"
              ? field.value
              : ""; // Default to an empty string if not compatible

          return (
            <Input
              {...field}
              id={id.toString()} // Ensure id is a string
              className={cn(
                "bg-grey-input border-border-muted py-1.5 px-2 text-lg h-9",
                {
                  "pl-12": icon,
                },
              )}
              placeholder={placeholder}
              value={inputValue} // Ensure value is string or number
            />
          );
        }}
      />
    </div>
    {errors[id] && (
      <p className="mt-1 text-sm text-red-500">{errors[id]?.message}</p>
    )}
  </div>
);

const TimeZoneSection = () => (
  <div className="mt-3 flex flex-col gap-2 md:flex-row md:items-center md:gap-6">
    <h2 className="md:min-w-[244px] md:text-right">Set to Time Zone</h2>
    <div className="flex items-center gap-1">
      <h2>America/Los Angeles</h2>
      <span className="ml-3 flex size-4 items-center justify-center rounded-full bg-[#0298FF] text-sm font-medium text-secondary-background">
        ?
      </span>
    </div>
  </div>
);
interface TimeInputProps {
  control: ControlType;
  errors: Partial<Record<string, { message?: string }>>;
}

const TimeInput: React.FC<TimeInputProps> = ({ control, errors }) => (
  <div className="mt-5 flex flex-col gap-2 md:mt-3 md:flex-row md:items-center md:gap-6">
    <span className="my-auto leading-[25.7px] md:min-w-[244px] md:text-right">
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
            className="h-9 w-[46px] appearance-none border-border-muted bg-input-secondary text-center"
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
            className="h-9 w-[46px] border-border-muted bg-input-secondary text-center"
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
      <p className="mt-1 text-red-500">{errors.snapshotTime.message}</p>
    )}
  </div>
);

const DaysSelector: React.FC<{
  control: ControlType;
  errors: Partial<Record<string, ErrorMessage>>;
}> = ({ control, errors }) => (
  <div className="mt-5 flex flex-col gap-2 md:mt-3 md:flex-row md:items-center md:gap-6">
    <p className="leading-[25.7px] text-form md:min-w-[244px] md:text-right">
      On the Following Day(s)
    </p>
    <div className="col-span-1 flex flex-wrap md:col-span-2 lg:col-span-3 xl:col-span-5">
      <Controller
        name="days"
        control={control}
        render={({ field }) => (
          <div className="grid grid-cols-1 flex-wrap sm:grid-cols-3 md:flex">
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
    {errors.days && <p className="mt-1 text-red-500">{errors.days.message}</p>}
  </div>
);

const CheckboxWithLabel: React.FC<{
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}> = ({ checked, onChange, label }) => (
  <div className="mr-6 flex items-center">
    <Checkbox checked={checked} onCheckedChange={onChange} />
    <label className="ml-3 text-lg capitalize leading-[25.7px]">{label}</label>
  </div>
);

const DeleteEachSnapshot: React.FC<DeleteEachSnapshotProps> = ({
  control,
  deleteEachSnapshot,
  handleDeleteEachSnapshotChange,
}) => (
  <div className="mt-5 flex flex-col gap-2 md:mt-3 md:flex-row md:items-center md:gap-6">
    <p className="leading-[25.7px] md:min-w-[244px] md:text-right">
      Delete Each Snapshot
    </p>
    <div className="col-span-1 flex flex-wrap md:col-span-2 lg:col-span-3 xl:col-span-5">
      <Controller
        name="deleteEachSnapshot"
        control={control}
        render={({ field }) => (
          <>
            <div className="mr-6 flex items-center">
              <input
                id="deleteEachSnapshot"
                name="deleteEachSnapshot"
                type="radio"
                value="Never"
                checked={field.value === "Never"}
                onChange={() => handleDeleteEachSnapshotChange("Never")}
                className="size-4"
              />
              <label
                htmlFor="deleteEachSnapshot"
                className="ml-2 text-lg text-form"
              >
                Never
              </label>
            </div>

            <div className="flex flex-wrap items-center sm:flex-nowrap md:flex-wrap lg:flex-nowrap">
              <input
                id="auto-delete-radio"
                type="radio"
                checked={field.value !== "Never"}
                onChange={() =>
                  handleDeleteEachSnapshotChange({ after: 7, unit: "day" })
                }
                className="size-4 "
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
                      className="ml-3 h-9 w-[41px] border-border-muted bg-input-secondary"
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
                      <SelectTrigger className="ml-3 h-9 w-[97px] border-border-muted bg-input-secondary">
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
  control: ControlType;
  deleteEachSnapshot: "Never" | DeleteSnapshotObj;
  errors: Partial<Record<string, ErrorMessage>>;
}) => (
  <>
    <h2 className="mt-11 text-lg text-form">Snapshot Locking</h2>
    <p className="mt-1 text-base text-form/80">
      Locked snapshots cannot be deleted before the deletion schedule expires.
      For this feature to be available, snapshots must be set to automatically
      delete.
    </p>
    <div className="mt-1.5 flex items-center">
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
      <p className="mt-1 text-red-500">
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
  control: ControlType;
  errors: Partial<Record<string, ErrorMessage>>;
  isPending: boolean;
  handleCancel: () => void;
}) => (
  <>
    <div className="mt-14 flex items-center">
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
      <p className="mt-1 text-red-500">{errors.enablePolicy.message}</p>
    )}
    <div className="my-7 flex gap-2.5">
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
