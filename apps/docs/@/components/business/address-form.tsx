"use client";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@chaos_team/chaos-ui/lib";
import { Input } from "@chaos_team/chaos-ui/ui";
import { Label } from "@chaos_team/chaos-ui/ui";

const addressSchema = z.object({
  line1: z.string().min(1, "Address line 1 is required"),
  line2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().optional(),
  postalCode: z.string().min(1, "Postal code is required"),
  country: z.string().min(1, "Country is required"),
});

type AddressValue = z.infer<typeof addressSchema>;

interface AddressFormProps extends Omit<
  React.ComponentProps<"form">,
  "onChange"
> {
  value?: AddressValue;
  onChange?: (value: AddressValue) => void;
  country?: string;
  className?: string;
}

function AddressForm({
  value,
  onChange,
  country,
  className,
  ...props
}: AddressFormProps) {
  const form = useForm<AddressValue>({
    resolver: zodResolver(addressSchema),
    defaultValues: value ?? {
      line1: "",
      line2: "",
      city: "",
      state: "",
      postalCode: "",
      country: country ?? "",
    },
  });

  React.useEffect(() => {
    if (value) form.reset(value);
  }, [value, form]);

  React.useEffect(() => {
    if (country) form.setValue("country", country);
  }, [country, form]);

  const subscription = React.useRef(
    form.watch((data) => {
      if (form.formState.isValid) {
        onChange?.(data as AddressValue);
      }
    }),
  );

  React.useEffect(() => {
    subscription.current = form.watch((data) => {
      if (form.formState.isValid) {
        onChange?.(data as AddressValue);
      }
    });
    return () => subscription.current?.unsubscribe();
  }, [form, onChange]);

  return (
    <form
      data-slot="address-form"
      className={cn("space-y-3", className)}
      {...props}
    >
      <div className="space-y-1.5">
        <Label htmlFor="address-line1">Address Line 1</Label>
        <Input
          id="address-line1"
          placeholder="123 Main St"
          {...form.register("line1")}
        />
        {form.formState.errors.line1 && (
          <p className="text-destructive text-xs">
            {form.formState.errors.line1.message}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="address-line2">Address Line 2</Label>
        <Input
          id="address-line2"
          placeholder="Apt, suite, etc. (optional)"
          {...form.register("line2")}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="address-city">City</Label>
          <Input
            id="address-city"
            placeholder="City"
            {...form.register("city")}
          />
          {form.formState.errors.city && (
            <p className="text-destructive text-xs">
              {form.formState.errors.city.message}
            </p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="address-state">State / Province</Label>
          <Input
            id="address-state"
            placeholder="State"
            {...form.register("state")}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="address-postal">Postal Code</Label>
          <Input
            id="address-postal"
            placeholder="12345"
            {...form.register("postalCode")}
          />
          {form.formState.errors.postalCode && (
            <p className="text-destructive text-xs">
              {form.formState.errors.postalCode.message}
            </p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="address-country">Country</Label>
          <Input
            id="address-country"
            placeholder="Country"
            {...form.register("country")}
          />
          {form.formState.errors.country && (
            <p className="text-destructive text-xs">
              {form.formState.errors.country.message}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}

AddressForm.displayName = "AddressForm";

export { AddressForm };
export type { AddressValue, AddressFormProps };
