import { useState } from 'react';
import type { ApplicationForm as ApplicationFormData } from '../../types/application';
import type { SubmitEvent, ChangeEvent } from 'react';
import { BriefcaseBusiness, FileText, Info } from 'lucide-react';

const initialForm: ApplicationFormData = {
	companyName: '',
	jobTitle: '',
	location: '',
	applicationDate: new Date().toISOString().split('T')[0],
	applicationSource: '',
	status: 'APPLIED',
	description: '',
}

type ApplicationFormProps = {
	initialValues?: ApplicationFormData
	submitLabel: string
	onSubmit: (form: ApplicationFormData) => Promise<void>
}

function ApplicationForm({
	initialValues = initialForm,
	submitLabel,
	onSubmit
}: ApplicationFormProps) {

	const [form, setForm] = useState<ApplicationFormData>(initialValues);

	const handleChange = (
			event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
		) => {
			const { name, value } = event.target

			setForm((currentForm) => ({
				...currentForm,
				[name]: value,
			}))
		}

	const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
		event.preventDefault();
		await onSubmit(form);
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="card mx-4 flex flex-col gap-4 bg-base-100 p-4 shadow-lg"
		>
			<div className="flex items-center gap-3">
				<div className="rounded-lg bg-primary/10 p-1.5 text-primary ring-1 ring-primary/20">
					<Info className="h-4 w-4" />
				</div>
				<h2 className="text-base font-semibold text-primary">
					General information
				</h2>
			</div>

			<div className="grid grid-cols-1 gap-x-4 md:grid-cols-2">
				<fieldset className="fieldset">
					<legend className="fieldset-legend">
						Company <span className="text-error">*</span>
					</legend>
					<input
						name="companyName"
						value={form.companyName}
						onChange={handleChange}
						className="input input-bordered w-full"
						type="text"
						placeholder="e.g. OpenAI"
						required
					/>
				</fieldset>

				<fieldset className="fieldset">
					<legend className="fieldset-legend">
						Job title <span className="text-error">*</span>
					</legend>
					<input
						name="jobTitle"
						value={form.jobTitle}
						onChange={handleChange}
						className="input input-bordered w-full"
						type="text"
						placeholder="e.g. Backend Developer"
						required
					/>
				</fieldset>

				<fieldset className="fieldset">
					<legend className="fieldset-legend">Location</legend>
					<input
						name="location"
						value={form.location}
						onChange={handleChange}
						className="input input-bordered w-full"
						type="text"
						placeholder="e.g. Remote, Paris, France"
					/>
				</fieldset>
			</div>

			<div className="divider my-1" />

			<div className="flex items-center gap-3">
				<div className="rounded-lg bg-primary/10 p-1.5 text-primary ring-1 ring-primary/20">
					<BriefcaseBusiness className="h-4 w-4" />
				</div>
				<h2 className="text-base font-semibold text-primary">
					Application details
				</h2>
			</div>

			<div className="grid grid-cols-1 gap-x-4 md:grid-cols-3">
				<fieldset className="fieldset">
					<legend className="fieldset-legend">
						Status <span className="text-error">*</span>
					</legend>
					<select
						name="status"
						value={form.status}
						onChange={handleChange}
						className="select select-bordered w-full"
						required
					>
						<option value="DRAFT">Draft</option>
						<option value="APPLIED">Applied</option>
						<option value="SCREENING">Screening</option>
						<option value="INTERVIEW">Interview</option>
						<option value="OFFER">Offer</option>
						<option value="REJECTED">Rejected</option>
						<option value="WITHDRAWN">Withdrawn</option>
					</select>
				</fieldset>

				<fieldset className="fieldset">
					<legend className="fieldset-legend">
						Application date <span className="text-error">*</span>
					</legend>
					<input
						name="applicationDate"
						value={form.applicationDate}
						onChange={handleChange}
						className="input input-bordered w-full"
						type="date"
						required
					/>
				</fieldset>

				<fieldset className="fieldset">
					<legend className="fieldset-legend">Source</legend>
					<select
						name="applicationSource"
						value={form.applicationSource}
						onChange={handleChange}
						className="select select-bordered w-full"
					>
						<option value="">Select a source</option>
						<option value="LINKEDIN">LinkedIn</option>
						<option value="WELCOME_TO_THE_JUNGLE">
							Welcome to the Jungle
						</option>
						<option value="INDEED">Indeed</option>
						<option value="COMPANY_WEBSITE">Company website</option>
						<option value="OTHER">Other</option>
					</select>
				</fieldset>
			</div>

			<div className="divider my-1" />

			<div className="flex items-center gap-3">
				<div className="rounded-lg bg-primary/10 p-1.5 text-primary ring-1 ring-primary/20">
					<FileText className="h-4 w-4" />
				</div>
				<h2 className="text-base font-semibold text-primary">Notes</h2>
			</div>

			<fieldset className="fieldset">
				<legend className="fieldset-legend">Description</legend>
				<textarea
					name="description"
					value={form.description}
					onChange={handleChange}
					className="textarea textarea-bordered w-full"
					placeholder="Add notes about this application..."
					rows={4}
				/>
			</fieldset>

			<div className="flex justify-end gap-2">
				<button
					type="button"
					className="btn btn-ghost"
					onClick={() => setForm(initialForm)}
				>
					Reset
				</button>
				<button className="btn btn-primary" type="submit">
					{submitLabel}
				</button>
			</div>
		</form>
	)
}

export default ApplicationForm