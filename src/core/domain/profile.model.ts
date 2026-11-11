/**
 * @file profile.model.ts
 * @description Definición de tipos y modelos para el perfil profesional del desarrollador.
 * Capa: Core / Domain (Independiente de frameworks y UI).
 */

export interface SocialLink {
  readonly platform: 'github' | 'linkedin' | 'twitter' | 'instagram' | 'facebook';
  readonly url: string;
  readonly iconClass: string;
  readonly ariaLabel: string;
}

export interface PersonalDetails {
  readonly fullName: string;
  readonly birthDate: string; // Formato YYYY-MM-DD para cálculo dinámico
  readonly careerStartDate: string; // Formato YYYY-MM-DD
  readonly maritalStatus: string;
  readonly location: string;
  readonly isFreelanceAvailable: boolean;
}

export interface Profile {
  readonly name: string;
  readonly shortName: string;
  readonly titles: readonly string[]; // Lista de roles rotativos en Home
  readonly headline: string;
  readonly bioSummary: string;
  readonly cvPdfPath: string;
  readonly avatarUrl: string;
  readonly socialLinks: readonly SocialLink[];
  readonly details: PersonalDetails;
}
