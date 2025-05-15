import { FormEvent, useState } from "react";
import { useToast } from "../components/Toast";

export default function Contact() {
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    fullName: "",
    subject: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    subject: "",
    email: "",
    message: "",
  });

  function validate() {
    let valid = true;
    const newErrors = { fullName: "", subject: "", email: "", message: "" };

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

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (validate()) {
      addToast("Message sent successfully! ✅");
      setFormData({ fullName: "", subject: "", email: "", message: "" });
      setErrors({ fullName: "", subject: "", email: "", message: "" });
    } else {
      addToast("Please fix the errors in the form ❌");
    }
  }

  return (
    <div className="max-w-screen-sm mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-black">Contact Us</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        {["fullName", "subject", "email"].map((field) => (
          <div key={field}>
            <label htmlFor={field} className="block font-medium text-black capitalize mb-1">
              {field === "fullName" ? "Full Name" : field}
            </label>
            <input
              type={field === "email" ? "email" : "text"}
              name={field}
              id={field}
              value={(formData as any)[field]}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded"
            />
            {errors[field as keyof typeof errors] && (
              <p className="text-red-500 text-sm mt-1">
                {errors[field as keyof typeof errors]}
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
