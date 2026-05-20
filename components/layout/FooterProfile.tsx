import { getFullProfile } from "@/lib/github";
import ContactIcon, { getContactHref } from "@/components/layout/ContactIcon";
import FooterSoftSkills from "@/components/layout/FooterSoftSkills";

export default async function FooterProfile() {
  const profile = await getFullProfile();
  const contacts = profile?.contacts ?? [];
  const softSkills = profile?.skills?.soft_skills ?? [];

  if (contacts.length === 0 && softSkills.length === 0) return null;

  return (
    <div className="flex flex-col items-center gap-8 w-full px-4">
      {contacts.length > 0 && (
        <ul className="flex flex-wrap items-center justify-center gap-3 list-none p-0 m-0">
          {contacts.map((contact) => (
            <li key={contact.name}>
              <a
                href={getContactHref(contact.name, contact.value)}
                target={contact.name === "Email" || contact.name === "Phone" ? undefined : "_blank"}
                rel={
                  contact.name === "Email" || contact.name === "Phone"
                    ? undefined
                    : "noopener noreferrer"
                }
                aria-label={contact.name}
                title={contact.value}
                className="flex items-center justify-center size-10 rounded-full border border-border/80 bg-background/40 text-muted-foreground transition-colors hover:text-apple-orange hover:border-apple-orange/40"
              >
                <ContactIcon name={contact.icon} className="size-4" />
              </a>
            </li>
          ))}
        </ul>
      )}

      {softSkills.length > 0 && <FooterSoftSkills skills={softSkills} />}
    </div>
  );
}
