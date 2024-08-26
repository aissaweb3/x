import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import Spinner from "./MiniSpinner";

export default function FormBtn({ children }: any) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="inline-flex items-center justify-center whitespace-nowrap text-gray-600 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-primary-light hover:bg-background h-9 rounded-md px-3 bg-transparent text-primary-light"
      disabled={pending}
    >
      {pending ? (
        <div className="flex items-center justify-center">
          <div className="h-5 w-5 mr-2">
            {/* Add a spinner or loading animation here */}
          </div>
          <Spinner />
        </div>
      ) : (
        children
      )}
    </Button>
  );
}
