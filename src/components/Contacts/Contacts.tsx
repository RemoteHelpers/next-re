import { PhotoAPI } from "@/constants";
import styles from "./Contacts.module.scss";
import MainForm from "../MainForm/MainForm";
import { ContactSvg } from "@/shared/components/IconComponents/Contacts";

export const Contacts = ({ contactsData}: any) => {
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>{contactsData.title}</h1>
      <div className={styles.team_cards}>
        {contactsData.Recruiters.map((member: any) => (
          <div key={member.id} className={styles.team_card}>
            <div className={styles.member_photo}>
              <img
                src={PhotoAPI + member.img.data.attributes.url}
                alt={member.id}
              />
            </div>
            <div className={styles.member_info}>
              <h2>{member.name}</h2>
              <span>Recruiter</span>
              <div>
                <ContactSvg id="telegram" />
                <a
                  href={`https://t.me/${member.telegramNickname}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {member.telegramNickname}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      <MainForm />
    </section>
  );
};
