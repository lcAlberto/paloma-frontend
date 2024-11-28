export interface AuthUserType {
  id: number | null | undefined,
  name: string | null | undefined,
  email_verified_at: string | undefined | null,
  email: string,
  farm_id: number | null,
  updated_at: string | undefined | null,
  created_at: string | undefined | null
}
