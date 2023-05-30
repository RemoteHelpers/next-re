import { FC, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import type {
  IFormData,
  IFeedbackFormData,
  IStateCV,
  IEnglishLevel,
} from "@/shared/types/FormTypes";
import Api from "@/api";
import Select, { SingleValue } from "react-select";
import PhoneInput from "react-phone-number-input/react-hook-form";
import "react-phone-number-input/style.css";
import styles from "./FormFields.module.scss";
import mainCat from '@/shared/images/Form/MainForm/main-cat.png';
import Image from 'next/image';
import { FormIcon } from "@/shared/components/IconComponents/FormIcon";
import { useRouter } from "next/router";
import { Loader } from "../Loader";

type Props = {
  formData: IFormData;
};

const FormFields: FC<Props> = ({ formData }) => {
  const { register, handleSubmit, reset, setValue, control } =
    useForm<IFeedbackFormData>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [loadFile, setLoadFile] = useState<IStateCV[]>([]);
  const [load, setLoad] = useState(false);

  const { locale } = useRouter();

  const handleFileChange = async () => {
    if (!fileInputRef?.current?.files) return;
    if (fileInputRef.current.files.length > 0) {
      const file = fileInputRef.current.files[0];
      setLoadFile(await Api.uploadFile({ files: file }));
    } else {
      setLoadFile([]);
      return null;
    }
  };

  const submitForm = handleSubmit(async (data: IFeedbackFormData) => {
    try {
      await Api.feedBackForm({
        ...data,
        CV: loadFile,
        CV_url: loadFile[0]?.url ?? "",
        pageFrom: window.location.href,
      });

      reset();
      const updatedLoadFile = { ...loadFile[0], name: formData?.cv };
      setLoadFile([updatedLoadFile]);
      setLoad(true);
      window.location.pathname = `${locale}/thankyou`;
    } catch (err) {
      console.error("Form error >>> ", err);
    }
  });

  const changeEnglishLevel = (englishLevel: SingleValue<IEnglishLevel>) => {
    setValue("englishLevel", englishLevel?.value, { shouldValidate: true });
  };

  return (
    <>
      <form onSubmit={submitForm} className={styles.form}>
        <div className={styles.first_row}>
          <input
            {...register("name", { required: true })}
            placeholder={formData?.name}
            type="text"
            className={styles.name}
          />

          <PhoneInput
            name="number"
            control={control}
            defaultCountry="UA"
            international
            rules={{ required: true }}
            placeholder={formData?.number}
            className={styles.number}
          />
        </div>

        <div className={styles.second_row}>
          <input
            type="email"
            {...register("eMail", { required: true })}
            placeholder={formData?.email}
            className={styles.email}
          />

          <input
            type="text"
            minLength={2}
            maxLength={2}
            {...register("age", { pattern: /\d+/, required: true })}
            placeholder={formData?.age}
            className={styles.age}
          />
        </div>

        <div>
          <p className={styles.english_title}>{formData?.englishLabel}</p>

          <Select
            placeholder={formData?.englishLevel}
            onChange={changeEnglishLevel}
            options={formData?.enlishLevels}
          />
        </div>

        <div className={styles.work_cv}>
          <input
            type="text"
            {...register("cv_link", { required: true })}
            placeholder={formData?.cvLink}
            className={styles.cv_link}
          />

          <label className={styles.attach_cv}>
            <input
              type="file"
              {...register("CV")}
              accept=".doc, .docx, .pdf"
              ref={fileInputRef}
              onChange={handleFileChange}
              placeholder="cv_link"
              style={{ display: "none" }}
            />

            <span>{loadFile[0]?.name ?? formData?.cv}</span>

            <FormIcon id="pin" />
          </label>
        </div>

        <Image className={styles.mobile_cat} src={mainCat} alt={"main cat"} />

        <button className={styles.submit} type="submit">
          {formData?.submit}
        </button>
      </form>
      {load ? <Loader /> : ''}
    </>
  );
};

export default FormFields;
