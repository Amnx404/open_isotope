import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export function WalletCard() {
  // Sample data - in a real app, this would come from your backend
  const credits = 2500;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Wallet Balance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <div className="text-4xl font-bold">
            ${credits.toLocaleString()}
          </div>
          <p className="text-sm text-muted-foreground">
            Available Credits
          </p>
        </div>
      </CardContent>
    </Card>
  );
}