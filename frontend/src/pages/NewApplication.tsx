import type { ApplicationForm as ApplicationFormData } from '../types/application';
import { createApplication } from '../api/applicationApi';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import ApplicationForm from '../components/application/ApplicationForm';

function NewApplication() {
	const navigate = useNavigate();

	const handleCreate = async (form: ApplicationFormData) => {
		try {
			await createApplication(form);
			navigate("/");
			toast.success("application created successfully");
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "An unexpected error occurred");
		}
	}

	return (
		<ApplicationForm submitLabel="Save application" onSubmit={handleCreate} />
	)
}

export default NewApplication