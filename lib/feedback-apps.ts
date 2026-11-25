/** Apps whose users send feedback through /contact?app=<id>, and where it goes. */
const FEEDBACK_APPS = {
  werewolves: { name: "Werewolves", url: "https://werewolves.hy13dev.com", recipient: "ylyamartchenko+werewolves-feedback@proton.me" },
} as const;

export type FeedbackAppId = keyof typeof FEEDBACK_APPS;
export type FeedbackApp = { id: FeedbackAppId; name: string; url: string };

export function findFeedbackApp(id: string | null | undefined): FeedbackApp | null {
  if (!id || !Object.hasOwn(FEEDBACK_APPS, id)) return null;
  const appId = id as FeedbackAppId;
  const { name, url } = FEEDBACK_APPS[appId];
  return { id: appId, name, url };
}

/** Server only in practice: the address never reaches the page (the form only gets `FeedbackApp`). */
export function feedbackRecipient(id: FeedbackAppId): string {
  return FEEDBACK_APPS[id].recipient;
}
