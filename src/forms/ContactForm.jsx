import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { budgetRanges, projectTypes } from '../data/portfolio';

function FieldError({ id, message }) {
  return message ? <span className="field-error" id={id} role="alert">{message}</span> : null;
}

export default function ContactForm() {
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});
  const statusRef = useRef(null);
  const submittingRef = useRef(false);

  useEffect(() => {
    if (status === 'success' || status === 'error') statusRef.current?.focus();
  }, [status]);

  const clearError = (event) => {
    const { name } = event.currentTarget;
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const submit = async (event) => {
    event.preventDefault();
    if (submittingRef.current) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const values = {
      name: String(data.get('name') || '').trim(),
      email: String(data.get('email') || '').trim(),
      type: String(data.get('type') || ''),
      budget: String(data.get('budget') || ''),
      message: String(data.get('message') || '').trim(),
    };
    const nextErrors = {};
    if (values.name.length < 2) nextErrors.name = 'Enter your name using at least 2 characters.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) nextErrors.email = 'Enter a valid email address.';
    if (!projectTypes.includes(values.type)) nextErrors.type = 'Choose a project type.';
    if (!budgetRanges.includes(values.budget)) nextErrors.budget = 'Choose a budget range.';
    if (values.message.length < 20) nextErrors.message = 'Add at least 20 characters so I can understand the project.';

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      const firstInvalid = Object.keys(nextErrors)[0];
      form.elements.namedItem(firstInvalid)?.focus();
      return;
    }

    Object.entries(values).forEach(([key, value]) => data.set(key, value));
    setErrors({});
    submittingRef.current = true;
    setStatus('submitting');
    try {
      const body = new URLSearchParams(data).toString();
      const response = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body });
      if (!response.ok) throw new Error('Submission failed');
      form.reset();
      submittingRef.current = false;
      setStatus('success');
    } catch {
      submittingRef.current = false;
      setStatus('error');
    }
  };

  return <form className="contact-form" name="project-enquiry" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={submit} noValidate>
    <input type="hidden" name="form-name" value="project-enquiry" />
    <div className="honeypot" aria-hidden="true"><label>Leave this field empty<input name="bot-field" tabIndex={-1} autoComplete="off" /></label></div>
    <div className="field-row">
      <label>Name<input name="name" autoComplete="name" maxLength="80" required aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} onChange={clearError} /><FieldError id="name-error" message={errors.name} /></label>
      <label>Email<input name="email" type="email" inputMode="email" autoComplete="email" maxLength="254" required aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} onChange={clearError} /><FieldError id="email-error" message={errors.email} /></label>
    </div>
    <div className="field-row">
      <label>Project type<select name="type" required defaultValue="" aria-invalid={Boolean(errors.type)} aria-describedby={errors.type ? 'type-error' : undefined} onChange={clearError}><option value="" disabled>Select one</option>{projectTypes.map((item) => <option key={item}>{item}</option>)}</select><FieldError id="type-error" message={errors.type} /></label>
      <label>Budget range<select name="budget" required defaultValue="" aria-invalid={Boolean(errors.budget)} aria-describedby={errors.budget ? 'budget-error' : undefined} onChange={clearError}><option value="" disabled>Select one</option>{budgetRanges.map((item) => <option key={item}>{item}</option>)}</select><FieldError id="budget-error" message={errors.budget} /></label>
    </div>
    <label>Message<textarea name="message" rows="5" minLength="20" maxLength="2000" required placeholder="What are you building, who is it for, and when would you like to launch?" aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : undefined} onChange={clearError} /><FieldError id="message-error" message={errors.message} /></label>
    <div className="form-footer"><button className="button button-red" type="submit" disabled={status === 'submitting'}>{status === 'submitting' ? 'Sending…' : 'Send enquiry'} <ArrowUpRight size={17} /></button><p>Submitted through Netlify Forms. Please avoid sharing sensitive information.</p></div>
    <p ref={statusRef} tabIndex="-1" className={`status-message status-${status}`} role="status" aria-live="polite">{status === 'success' && 'Thanks—your enquiry has been sent. I’ll reply within one working day.'}{status === 'error' && <>The form could not send. Please email <a href="mailto:gmanisandeep@gmail.com">gmanisandeep@gmail.com</a>.</>}</p>
  </form>;
}
