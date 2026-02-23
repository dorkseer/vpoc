"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Client, SocialMediaLinks } from "@/app/types/client";

const SOCIAL_PLATFORMS: { key: keyof SocialMediaLinks; label: string; placeholder: string }[] = [
  { key: "facebook", label: "Facebook", placeholder: "https://facebook.com/username" },
  { key: "instagram", label: "Instagram", placeholder: "https://instagram.com/username" },
  { key: "x", label: "X (Twitter)", placeholder: "https://x.com/username" },
  { key: "youtube", label: "YouTube", placeholder: "https://youtube.com/@channel" },
  { key: "tiktok", label: "TikTok", placeholder: "https://tiktok.com/@username" },
  { key: "linkedin", label: "LinkedIn", placeholder: "https://linkedin.com/in/username" },
  { key: "spotify", label: "Spotify", placeholder: "https://open.spotify.com/artist/id" },
  { key: "soundcloud", label: "SoundCloud", placeholder: "https://soundcloud.com/username" },
  { key: "twitch", label: "Twitch", placeholder: "https://twitch.tv/username" },
  { key: "reddit", label: "Reddit", placeholder: "https://reddit.com/user/username" },
];

type ClientFormProps = {
  initialData?: Client;
  submitLabel: string;
  onSubmit: (data: Omit<Client, "id" | "takedowns">) => void;
};

export default function ClientForm({ initialData, submitLabel, onSubmit }: ClientFormProps) {
  const [fullName, setFullName] = useState("");
  const [publicName, setPublicName] = useState("");
  const [email, setEmail] = useState("");
  const [managementCompany, setManagementCompany] = useState("");
  const [socialMedia, setSocialMedia] = useState<SocialMediaLinks>({});

  useEffect(() => {
    if (initialData) {
      setFullName(initialData.fullName);
      setPublicName(initialData.publicName);
      setEmail(initialData.email);
      setManagementCompany(initialData.managementCompany ?? "");
      setSocialMedia(initialData.socialMedia ?? {});
    }
  }, [initialData]);

  function handleSocialChange(key: keyof SocialMediaLinks, value: string) {
    setSocialMedia((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const hasAnySocial = Object.values(socialMedia).some((v) => v);

    onSubmit({
      fullName,
      publicName,
      email,
      ...(managementCompany ? { managementCompany } : {}),
      ...(hasAnySocial ? { socialMedia } : {}),
    });
  }

  return (
    <>
      <Card>
        <CardContent className="pt-6">
          <form id="client-form" onSubmit={handleSubmit} className="flex flex-col gap-5">

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="fullName">Full name</Label>
              <Input
                id="fullName"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Jane Doe"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="publicName">Public name</Label>
              <Input
                id="publicName"
                type="text"
                required
                value={publicName}
                onChange={(e) => setPublicName(e.target.value)}
                placeholder="J. Doe"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@example.com"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="managementCompany">
                Rights management company
                <span className="ml-1 font-normal text-muted-foreground">(optional)</span>
              </Label>
              <Input
                id="managementCompany"
                type="text"
                value={managementCompany}
                onChange={(e) => setManagementCompany(e.target.value)}
                placeholder="Acme Rights Ltd."
              />
            </div>

          </form>
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Proactive Detection Details</CardTitle>
          <CardDescription>
            This section is only applicable if the client has opted in to proactive monitoring for unauthorized use of their content. If this does not apply, you may leave these fields empty.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {SOCIAL_PLATFORMS.map(({ key, label, placeholder }) => (
              <div key={key} className="flex flex-col gap-1.5">
                <Label htmlFor={`social-${key}`}>{label}</Label>
                <Input
                  id={`social-${key}`}
                  type="url"
                  value={socialMedia[key] ?? ""}
                  onChange={(e) => handleSocialChange(key, e.target.value)}
                  placeholder={placeholder}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end pt-4">
        <Button type="submit" form="client-form">{submitLabel}</Button>
      </div>
    </>
  );
}
