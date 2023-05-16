import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { TFeedbackFormData } from "@/shared/types/FormFieldsTypes";
import Api from "@/api";
import Select from "react-select";
import PhoneInput from "react-phone-number-input/react-hook-form";
import "react-phone-number-input/style.css";
import styles from "./FormFields.module.scss";

const FormFields = ({ formData }: any) => {
  const { register, handleSubmit, reset, setValue, control } =
    useForm<TFeedbackFormData>();
  const fileInputRef = useRef<any>(null);
  const [loadFile, setLoadFile] = useState<any>();

  console.log("Form data >>> ", formData);

  const EnglishLevel = [
    { value: "beginner", label: "Beginner" },
    { value: "elementary ", label: "Elementary" },
    { value: "pre-intermediate", label: "Pre-Intermediate" },
    { value: "intermediate", label: "Intermediate" },
    { value: "upper-intermediate", label: "Upper-Intermediate" },
    { value: "advanced", label: "Advanced" },
    { value: "Proficiency", label: "Proficiency" },
  ];

  const handleFileChange = async () => {
    if (fileInputRef.current.files.length > 0) {
      const file = fileInputRef.current.files[0];
      setLoadFile(
        await Api.uploadFile({
          files: file,
        })
      );
    } else {
      setLoadFile(null);
      return null;
    }
  };

  const submitForm = handleSubmit(async (data: TFeedbackFormData) => {
    try {
      await Api.feedBackForm({
        ...data,
        CV: loadFile,
        CV_url: loadFile ? loadFile[0]?.url : "",
        pageFrom: window.location.href,
      });

      reset();
    } catch (err) {
      console.error("Form error >>> ", err);
    }
  });

  const changeEnglishLevel = (value: any) => {
    setValue("englishLevel", value.value, { shouldValidate: true });
  };

  return (
    <section className={styles.container}>
      <h1>{formData?.title}</h1>
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
          />
          <input
            type="text"
            minLength={2}
            maxLength={2}
            {...register("age", { pattern: /\d+/, required: true })}
            placeholder={formData?.age}
          />
        </div>
        <h2>{formData?.englishLabel}</h2>
        <Select
          placeholder={formData?.englishLevel}
          onChange={changeEnglishLevel}
          options={EnglishLevel}
        />
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
            <span>{loadFile ? loadFile[0]?.name : formData?.cv}</span>
          </label>
        </div>
        <button className={styles.submit} type="submit">
          {formData?.submit}
        </button>
      </form>
    </section>
  );
};

export default FormFields;
