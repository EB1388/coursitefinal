export const SITE_ORIGIN = "https://cour.software";

/** Public studio contact — shown in footer and about section. */
export const CONTACT_EMAIL = "team@cour.software";

/** Short path for App Store Connect — e.g. /starhook/privacy */
export function privacyPolicyPath(slug: string) {
  return `/${slug}/privacy`;
}

export function privacyPolicyUrl(slug: string) {
  return `${SITE_ORIGIN}${privacyPolicyPath(slug)}`;
}
