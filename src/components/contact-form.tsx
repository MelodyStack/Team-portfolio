"use client";

import { useId, useState } from "react";
import { Check, Copy, Loader2, Send } from "lucide-react";
import { sendEnquiry } from "@/app/actions/send-enquiry";
import { Button } from "@/components/button";
import { contact, services } from "@/lib/site";
import { cn } from "@/lib/utils";

const BUDGETS = [
  "Under $20k",
  "$20k – $50k",
  "$50k – $120k",
  "$120k+",
  "Not sure yet",
] as const;

const TIMELINES = [
  "As soon as possible",
  "Within 1–2 months",
  "This quarter",
  "Exploring for later",
] as const;

/**
 * Enquiry form.
 *
 * Submitting calls the `sendEnquiry` server action, which emails the address
 * in `CONTACT_TO_EMAIL`. If that is not configured, or the provider is down,
 * the form falls back to composing the message in the visitor's mail client
 * and offers it as copyable text.
 *
 * That fallback is the point of the whole design. A contact form that fails
 * silently is worse than one that was never wired up, because nobody finds
 * out for months. Here there is no path where a visitor is told "sent" and
 * nothing was.
 */
type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "sent" }
  /** Delivered to the mail client instead, because sending was unavailable. */
  | { state: "fallback" }
  | { state: "error"; message: string };

export function ContactForm() {
  const uid = useId();
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [copied, setCopied] = useState(false);
  const [composed, setComposed] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();

    const payload = {
      name: get("name"),
      company: get("company"),
      email: get("email"),
      service: get("service"),
      budget: get("budget"),
      timeline: get("timeline"),
      message: get("message"),
      website: get("website"),
    };

    // Composed up front so the fallback is ready the moment it's needed.
    const body = [
      `Name: ${payload.name}`,
      `Company: ${payload.company || "n/a"}`,
      `Email: ${payload.email}`,
      "",
      `Service: ${payload.service}`,
      `Budget: ${payload.budget}`,
      `Timeline: ${payload.timeline}`,
      "",
      "What we're trying to build:",
      payload.message,
    ].join("\n");
    const subject = `Build review: ${payload.company || payload.name}`;
    setComposed(`To: ${contact.email}\nSubject: ${subject}\n\n${body}`);

    setStatus({ state: "sending" });

    const result = await sendEnquiry(payload);

    if (result.ok) {
      setStatus({ state: "sent" });
      return;
    }

    if (result.reason === "invalid") {
      setStatus({ state: "error", message: result.message });
      return;
    }

    // Unconfigured or the provider failed: hand it to the mail client rather
    // than losing it.
    setStatus({ state: "fallback" });
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(composed);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // Clipboard can be blocked by permissions; the textarea below is still
      // selectable by hand, so there is nothing to recover from.
    }
  }

  /* Sent for real. No mail client involved, so no copyable fallback here:
     offering one would imply the message might not have arrived. */
  if (status.state === "sent") {
    return (
      <div className="rounded-3xl border border-line bg-card p-7 md:p-9">
        <div className="grid size-12 place-items-center rounded-full bg-teal text-on-teal">
          <Check className="size-6" aria-hidden />
        </div>

        <h3 className="headline mt-5 text-2xl text-ink">
          Thanks. That is with us.
        </h3>
        <p className="mt-3 max-w-lg text-[0.9375rem] leading-relaxed text-muted">
          You will get a reply from a person, not an autoresponder, within one
          working day. If it is urgent,{" "}
          <a
            href={contact.calendar}
            target="_blank"
            rel="noreferrer noopener"
            className="font-medium text-clay-ink underline decoration-clay/40 underline-offset-4 transition-colors hover:decoration-clay"
          >
            book a slot directly
          </a>
          .
        </p>
      </div>
    );
  }

  /* Sending was unavailable, so the message went to the visitor's mail client
     instead. Say exactly that, and give them the text in case it didn't open. */
  if (status.state === "fallback") {
    return (
      <div className="rounded-3xl border border-line bg-card p-7 md:p-9">
        <div className="grid size-12 place-items-center rounded-full bg-clay text-on-teal">
          <Check className="size-6" aria-hidden />
        </div>

        <h3 className="headline mt-5 text-2xl text-ink">
          Your email client should be opening.
        </h3>
        <p className="mt-3 max-w-lg text-[0.9375rem] leading-relaxed text-muted">
          If nothing happened, copy the message below and send it to{" "}
          <a
            href={`mailto:${contact.email}`}
            className="font-medium text-clay-ink underline decoration-clay/40 underline-offset-4 transition-colors hover:decoration-clay"
          >
            {contact.email}
          </a>
          . Either way you will hear back within one working day.
        </p>

        <textarea
          readOnly
          value={composed}
          rows={10}
          aria-label="Your enquiry, ready to copy"
          className="mt-6 w-full resize-none rounded-2xl border border-line bg-cream-2 p-4 text-[0.8125rem] leading-relaxed text-muted"
        />

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button variant="secondary" arrow={false} onClick={copy}>
            {copied ? (
              <Check className="size-4" aria-hidden />
            ) : (
              <Copy className="size-4" aria-hidden />
            )}
            {copied ? "Copied" : "Copy message"}
          </Button>
          <Button href={contact.calendar} variant="ghost" size="md">
            Or book a slot directly
          </Button>
        </div>
      </div>
    );
  }

  const sending = status.state === "sending";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot. Hidden from people and from screen readers, so anything
          filled in here came from a script. */}
      <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${uid}-website`}>Leave this field empty</label>
        <input
          id={`${uid}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field id={`${uid}-name`} name="name" label="Your name" required />
        <Field id={`${uid}-company`} name="company" label="Company" />
      </div>

      <Field
        id={`${uid}-email`}
        name="email"
        label="Email"
        type="email"
        required
      />

      {/* The service names are long ("Performance & technical SEO"), so this
          one gets a full row rather than a third of one; in a 3-up it truncated to "Web product engineeri…". */}
      <Select
        id={`${uid}-service`}
        name="service"
        label="What you need"
        options={services.map((s) => s.title)}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Select
          id={`${uid}-budget`}
          name="budget"
          label="Budget"
          options={BUDGETS}
        />
        <Select
          id={`${uid}-timeline`}
          name="timeline"
          label="Timeline"
          options={TIMELINES}
        />
      </div>

      <Field
        id={`${uid}-message`}
        name="message"
        label="What are you trying to build?"
        textarea
        required
        hint="A few lines is plenty. What it does, who it's for, and what's forcing the deadline."
      />

      {status.state === "error" && (
        <p
          role="alert"
          className="rounded-2xl bg-clay-soft px-4 py-3 text-[0.9375rem] text-clay-ink"
        >
          {status.message}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <Button type="submit" size="lg" arrow={false} disabled={sending}>
          {sending ? (
            <Loader2 className="size-4 animate-spin" aria-hidden />
          ) : (
            <Send className="size-4" aria-hidden />
          )}
          {sending ? "Sending" : "Send enquiry"}
        </Button>
        <p className="text-[0.8125rem] text-faint">
          Replies within one working day. No mailing list, ever.
        </p>
      </div>
    </form>
  );
}

const fieldClasses =
  "w-full rounded-2xl border border-line bg-cream-2 px-4 py-3 text-[0.9375rem] text-ink transition-colors duration-300 placeholder:text-faint/70 hover:border-line focus:border-line focus:bg-cream-2";

function Field({
  id,
  name,
  label,
  type = "text",
  required,
  textarea,
  hint,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  hint?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[0.8125rem] text-faint"
      >
        {label}
        {required && <span className="ml-1 text-muted">*</span>}
      </label>

      {textarea ? (
        <textarea
          id={id}
          name={name}
          required={required}
          rows={5}
          className={cn(fieldClasses, "resize-y")}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          autoComplete={
            name === "email" ? "email" : name === "name" ? "name" : "organization"
          }
          className={fieldClasses}
        />
      )}

      {hint && <p className="mt-2 text-[0.8125rem] text-faint">{hint}</p>}
    </div>
  );
}

function Select({
  id,
  name,
  label,
  options,
}: {
  id: string;
  name: string;
  label: string;
  options: readonly string[];
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[0.8125rem] text-faint"
      >
        {label}
      </label>
      <select
        id={id}
        name={name}
        defaultValue={options[0]}
        className={cn(fieldClasses, "appearance-none bg-no-repeat pr-10")}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1.5 6 6.5l5-5' stroke='%238a8a94' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E\")",
          backgroundPosition: "right 1rem center",
        }}
      >
        {options.map((option) => (
          <option key={option} value={option} className="bg-cream text-ink">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
