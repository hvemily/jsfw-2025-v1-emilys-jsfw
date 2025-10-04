import { FormEvent, useMemo, useRef, useState } from "react";
import { useToast } from "../components/Toast";

type FormFields = {
  fullName: string;
  subject: string;
  email: string;
  message: string;
};

type ErrorState = Partial<Record<keyof FormFields, string>>;

const MIN = {
  fullName: 3,
  subject: 3,
  message: 3,
} as const;

const EMAIL_RE = /^\S+@\S+\.\S+$/;

const initialFormState: FormFields = {
  fullName: "",
  subject: "",
  email: "",
  message: "",
};

export default function Contact() {
  const { addToast } = useToast();
  const [formData, setFormData] = useState<FormFields>(initialFormState);
  const [errors, setErrors] = useState<ErrorState>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // refs for focusing first invalid field
  const refs = {
    fullName: useRef<HTMLInputElement>(null),
    subject: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    message: useRef<HTMLTextAreaElement>(null),
  };

  const charCount = formData.message.trim().length;
  const messageMin = MIN.message;

  function validate(values: FormFields): ErrorState {
    const next: ErrorState = {};

    if (values.fullName.trim().length < MIN.fullName) {
      next.fullName = `Full name must be at least ${MIN.fullName} characters.`;
    }
    if (values.subject.trim().length < MIN.subject) {
      next.subject = `Subject must be at least ${MIN.subject} characters.`;
    }
    if (!EMAIL_RE.test(values.email)) {
      next.email = "Please enter a valid email address.";
    }
    if (values.message.trim().length < MIN.message) {
      next.message = `Message must be at least ${MIN.message} characters.`;
    }

    return next;
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // live-clear the error for that field when user types something valid
    if (errors[name as keyof FormFields]) {
      const draft = { ...errors };
      delete draft[name as keyof FormFields];
      setErrors(draft);
    }
  }

  function focusFirstInvalid(errs: ErrorState) {
    const order: (keyof FormFields)[] = ["fullName", "subject", "email", "message"];
    for (const key of order) {
      if (errs[key]) {
        refs[key].current?.focus();
        break;
      }
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const v = validate(formData);
    setErrors(v);

    if (Object.keys(v).length > 0) {
      addToast("Please fix the errors in the form ❌");
      focusFirstInvalid(v);
      return;
    }

    setIsSubmitting(true);
    try {
      console.log("Contact form submitted:", formData);
      addToast("Message sent successfully! ✅");

      setFormData(initialFormState);
      setErrors({});
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputFields: { name: keyof FormFields; label: string; type: "text" | "email" }[] = [
    { name: "fullName", label: "Full Name", type: "text" },
    { name: "subject", label: "Subject", type: "text" },
    { name: "email", label: "Email", type: "email" },
  ];

  const hasAnyError = useMemo(() => Object.keys(errors).length > 0, [errors]);

  return (
    <div className="mx-auto max-w-screen-sm px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold text-black">Contact Us</h1>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
      >
        {/* Error summary (accessible) */}
        {hasAnyError && (
          <div
            role="alert"
            className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          >
            <p className="font-medium">Please fix the following:</p>
            <ul className="ml-4 list-disc">
              {Object.entries(errors).map(([key, msg]) => (
                <li key={key}>{msg}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Inputs */}
        <div className="space-y-5">
          {inputFields.map(({ name, label, type }) => {
            const err = errors[name];
            const describedBy = err ? `${name}-error` : `${name}-help`;
            return (
              <div key={name}>
                <label htmlFor={name} className="mb-1 block font-medium text-black">
                  {label}
                </label>
                <input
                  ref={refs[name] as React.RefObject<HTMLInputElement>}
                  id={name}
                  name={name}
                  type={type}
                  value={formData[name]}
                  onChange={handleChange}
                  aria-invalid={!!err}
                  aria-describedby={describedBy}
                  className={`w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 ${
                    err
                      ? "border-red-400 focus:ring-red-500"
                      : "border-neutral-300 focus:ring-black"
                  }`}
                />
                <p
                  id={`${name}-help`}
                  className="mt-1 text-xs text-neutral-500"
                >
                  {name === "fullName" && `Min ${MIN.fullName} characters.`}
                  {name === "subject" && `Min ${MIN.subject} characters.`}
                  {name === "email" && `We’ll never share your email.`}
                </p>
                {err && (
                  <p id={`${name}-error`} className="mt-1 text-sm text-red-600">
                    {err}
                  </p>
                )}
              </div>
            );
          })}

          {/* Message */}
          <div>
            <label htmlFor="message" className="mb-1 block font-medium text-black">
              Message
            </label>
            <textarea
              ref={refs.message}
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : "message-help"}
              className={`w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 ${
                errors.message
                  ? "border-red-400 focus:ring-red-500"
                  : "border-neutral-300 focus:ring-black"
              }`}
            />
            <div className="mt-1 flex items-center justify-between text-xs text-neutral-500">
              <p id="message-help">Min {messageMin} characters.</p>
              <p>{charCount} / 1000</p>
            </div>
            {errors.message && (
              <p id="message-error" className="mt-1 text-sm text-red-600">
                {errors.message}
              </p>
            )}
          </div>
        </div>

        {/* Submit */}
        <div className="mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-lg bg-black px-6 py-2 font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? (
              <span className="inline-flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Sending…
              </span>
            ) : (
              "Send Message"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
