import ApplicationForm from "../components/application/ApplicationForm";
import type { ApplicationForm as ApplicationFormData } from "../types/application";
import { toast } from "sonner";
import { getApplicationById, updateApplication } from "../api/applicationApi";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

function UpdateApplication() {
	const navigate = useNavigate();
	const { id } = useParams();
	const [app, setApp] = useState<ApplicationFormData | null>(null);

	useEffect(() => {
		if (!id) return;
		const fetchApplicationById = async () => {
			try {
				const app = await getApplicationById(id);
				console.log(app);
				const conformApp = {...app, applicationDate: app.applicationDate.split('T')[0],}
				setApp(conformApp);
			} catch (error) {
				toast.error(error instanceof Error ? error.message : "An unexpected error occurred");
			}
		}
		fetchApplicationById();
	}, [id]);

	const onUpdate = async (form: ApplicationFormData) => {
		if (!id) return;

		try {
			await updateApplication(form, id);
			navigate("/");
			toast.success("application successfully updated");
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "An unexpected error occurred");
		}
	}

	if (!app) {
		return <span className="loading loading-spinner" />
	}

	return (
		<ApplicationForm
			initialValues={app}
			submitLabel="Update application"
			onSubmit={onUpdate}/>
	)
}

export default UpdateApplication