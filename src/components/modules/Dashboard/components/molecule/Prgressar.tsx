import { cva, type VariantProps } from "class-variance-authority";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";


const progressBar = cva(
  "rtl:-scale-x-100 [&>*]:h-1.5 [&>*]:bg-current/20 [&>*>*]:bg-current",
  {
    variants: {
      variant: {
        brand: "ds-text-brand",
        success: "ds-text-success",
        warning: "ds-text-warning",
        danger: "ds-text-danger",
        info: "ds-text-info",
        purple: "ds-text-purple",
        pink: "ds-text-pink",
        teal: "text-[#14b8a6]",
      },
    },
    defaultVariants: { variant: "brand" },
  },
);

interface Props extends VariantProps<typeof progressBar> {
  value: number;
  className?: string;
}

export default function ProgressBar({ value, variant, className }: Props) {
  return (
    <Progress
      value={Math.min(100, value)}
      className={cn(progressBar({ variant }), className)}
    />
  );
}
