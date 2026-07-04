export const SITE_ORIGIN = "https://cour.software";

/** Short path for App Store Connect — e.g. /starhook/privacy */
export function privacyPolicyPath(slug: string) {
  return `/${slug}/privacy`;
}

export function privacyPolicyUrl(slug: string) {
  return `${SITE_ORIGIN}${privacyPolicyPath(slug)}`;
}
