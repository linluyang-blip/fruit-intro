"use client";

import { useId, useState, type ChangeEvent, type FormEvent } from "react";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const errorId = useId();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
    if (error) setError(null);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = email.trim();

    if (!trimmed) {
      setError("請輸入 Email");
      return;
    }
    if (!EMAIL_PATTERN.test(trimmed)) {
      setError("請輸入正確的 Email 格式，例如 you@example.com");
      return;
    }

    setError(null);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <p className="pt-2 text-sm text-cream/80">
        收到囉，接下來只要耐心等好消息，當季鮮果一上市就會通知你 📮
      </p>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="flex w-full max-w-md flex-col gap-4 pt-2 sm:flex-row sm:items-end"
    >
      <label className="flex flex-1 flex-col gap-2 text-left">
        <span className="text-xs uppercase tracking-wide text-cream/50">Email</span>
        <input
          type="email"
          value={email}
          onChange={handleChange}
          placeholder="you@example.com"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className="border-b border-cream/30 bg-transparent py-2 text-sm text-cream placeholder:text-cream/40 outline-none focus:border-terracotta"
        />
        {error && (
          <span id={errorId} className="text-xs text-terracotta">
            {error}
          </span>
        )}
      </label>
      <button
        type="submit"
        className="border border-cream/40 px-6 py-2.5 text-sm font-medium tracking-wide text-cream transition hover:border-terracotta hover:bg-terracotta"
      >
        訂閱通知
      </button>
    </form>
  );
}
