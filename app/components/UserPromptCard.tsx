"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";

type UserPromptCardProps = {
  header: string;
  body: string;
  onConfirm: () => void;
  onDeny: () => void;
};

export default function UserPromptCard({ header, body, onConfirm, onDeny }: UserPromptCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{header}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{body}</p>
        <div className="flex justify-end gap-3">
          <Button onClick={onConfirm}>Confirm</Button>
          <Button variant="outline" onClick={onDeny}>Deny</Button>
        </div>
      </CardContent>
    </Card>
  );
}
