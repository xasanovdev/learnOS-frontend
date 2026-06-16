export type User = {
  id: string;
  email: string | null;
  name: string | null;
  externalId: string;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  photoUrl: string | null;
  phone: string | null;
  languageCode: "en" | "uz" | null;
};

export type MeResponse = {
  user: User;
};
