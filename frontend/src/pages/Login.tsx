import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { login } from "../api/authApi";
import { toast } from "sonner";
import { useAuthStore } from "../stores/authStore";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const setUser = useAuthStore((state) => state.setUser);


	const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		
		try {
			const data = await login(email, password);
			console.log(data);
			setUser(data.user);
			toast.success("Logged in successfully")
			navigate('/');
		} catch(err) {
			toast.error(err instanceof Error ? err.message : "An unexpected error occurred")	
		}
	}

	return (
		<div className="min-h-screen bg-base-300 flex items-center justify-center px-4 py-8">
			<div className="w-full max-w-md">
				<div className="card bg-base-100 shadow-xl border border-base-200">
					<div className="card-body p-6 sm:p-8">

						<div className="mb-6 text-center">
							<div className="flex justify-center">
								<img src="/logo.svg" alt="applyr-logo" className="w-9 h-9 dark:invert"/>
							</div>
							<h1 className="text-2xl font-bold">
								Welcome back
							</h1>

							<p className="mt-1 text-sm text-base-content/60">
								Sign in to continue to your account.
							</p>
						</div>

						<form onSubmit={handleSubmit} className="space-y-5">

							<fieldset className="fieldset">
								<legend className="fieldset-legend">
									Email
								</legend>

								<input
									type="email"
									className="input w-full"
									placeholder="you@example.com"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</fieldset>

							<fieldset className="fieldset">
								<div className="flex items-center justify-between">
									<legend className="fieldset-legend">
										Password
									</legend>

									<button
										type="button"
										className="text-xs text-primary hover:underline"
									>
										Forgot password?
									</button>
								</div>

								<input
									type="password"
									className="input w-full"
									placeholder="••••••••"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</fieldset>

							<button
								type="submit"
								className="btn btn-primary w-full mt-2"
							>
								Sign in
							</button>
						</form>

						<div className="divider text-xs text-base-content/40">
							OR
						</div>

						<p className="text-center text-sm text-base-content/60">
							Don't have an account?{" "}
							<Link
								to="/register"
								className="font-medium text-primary hover:underline"
							>
								Create one
							</Link>
						</p>
					</div>
				</div>

			</div>
		</div>
	);
}

export default Login;