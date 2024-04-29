import { Button } from "./button";

interface AppbarProps {
  user?: {
    name?: string | null;
  };
  onSignin: () => void;
  onSignout: () => void;
}

export function Appbar({ user, onSignin, onSignout }: AppbarProps) {
  return (
    <div className="flex justify-between border-b px-4">
      <div className="flex flex-col justify-center text-lg">CashX</div>
      <div className="flex flex-col justify-center pt-2">
        <Button onClick={user ? onSignout : onSignin}>
          {user ? "Logout" : "Login"}
        </Button>
      </div>
    </div>
  );
}
