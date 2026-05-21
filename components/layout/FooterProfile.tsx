import { getFullProfile } from "@/lib/github";
import ContactIcon, { getContactHref } from "@/components/layout/ContactIcon";
import FooterSoftSkills from "@/components/layout/FooterSoftSkills";

export default async function FooterProfile() {
  const profile = await getFullProfile();
  const contacts = profile?.communication?.channels ?? [];
  const leadershipTraits = profile?.skills_matrix?.leadership_traits ?? [];

  if (contacts.length === 0 && leadershipTraits.length === 0) return null;

  return (
    <div className="flex flex-col items-center gap-8 w-full px-4">
      {contacts.length > 0 && (
        <ul className="flex flex-wrap items-center justify-center gap-3 list-none p-0 m-0">
          {contacts.map((contact) => {
            const isDirectContact =
              contact.platform === "Email" || contact.platform === "Phone";

            return (
              <li key={contact.platform}>
                <a
                  href={getContactHref(contact.platform, contact.value)}
                  target={isDirectContact ? undefined : "_blank"}
                  rel={isDirectContact ? undefined : "noopener noreferrer"}
                  aria-label={contact.platform}
                  title={contact.value}
                  className="flex items-center justify-center size-10 rounded-full border border-border/80 bg-background/40 text-muted-foreground transition-colors hover:text-apple-orange hover:border-apple-orange/40"
                >
                  <ContactIcon name={contact.icon} className="size-4" />
                </a>
              </li>
            );
          })}
        </ul>
      )}

      {leadershipTraits.length > 0 && (
        <FooterSoftSkills leadershipTraits={leadershipTraits} />
      )}
    </div>
  );
}
