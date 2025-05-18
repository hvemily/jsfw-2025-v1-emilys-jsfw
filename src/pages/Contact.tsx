import { FormEvent, useState } from "react";
import { useToast } from "../components/Toast";

type FormFields = {
  fullName: string;
  subject: string;
  email: string;
  message: string;
};

export default function Contact() {
  const { addToast } = useToast();

  const initialFormState: FormFields = {
    fullName: "",
    subject: "",
    email: "",
    message: "",
  };

  const [formData, setFormData] = useState<FormFields>(initialFormState);
  const [errors, setErrors] = useState<FormFields>(initialFormState);

  function validate() {
    let valid = true;
    const newErrors: FormFields = { ...initialFormState };

    if (formData.fullName.trim().length < 3) {
      newErrors.fullName = "Full Name must be at least 3 characters";
      valid = false;
    }
    if (formData.subject.trim().length < 3) {
      newErrors.subject = "Subject must be at least 3 characters";
      valid = false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email must be a valid format";
      valid = false;
    }
    if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (validate()) {
      console.log("Contact form submitted:", formData);

      addToast("Message sent successfully! ✅");
      setFormData(initialFormState);
      setErrors(initialFormState);
    } else {
      addToast("Please fix the errors in the form ❌");
    }
  }

  const inputFields: (keyof FormFields)[] = ["fullName", "subject", "email"];

  return (
    <div className="max-w-screen-sm mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-black">Contact Us</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        {inputFields.map((field) => (
          <div key={field}>
            <label htmlFor={field} className="block font-medium text-black capitalize mb-1">
              {field === "fullName" ? "Full Name" : field}
            </label>
            <input
              type={field === "email" ? "email" : "text"}
              name={field}
              id={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded"
            />
            {errors[field] && (
              <p className="text-red-500 text-sm mt-1">
                {errors[field]}
              </p>
            )}
          </div>
        ))}

        <div>
          <label htmlFor="message" className="block font-medium text-black mb-1">
            Message
          </label>
          <textarea
            name="message"
            id="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded"
          />
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
        </div>

        <button
          type="submit"
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
