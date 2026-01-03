import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
    const { theme = "system" } = useTheme();

    return (
        <Sonner
            theme={theme as ToasterProps["theme"]}
            className="toaster group"
            toastOptions={{
                classNames: {
                    toast:
                        "group toast border shadow-lg",

                    success:
                        "bg-green-50 border-green-500 text-green-800",

                    error:
                        "bg-red-50 border-red-500 text-red-800",

                    description:
                        "text-sm",

                    actionButton:
                        "bg-primary text-primary-foreground",

                    cancelButton:
                        "bg-muted text-muted-foreground",
                },
            }}
            {...props}
        />
    );
};

export { Toaster, toast };
