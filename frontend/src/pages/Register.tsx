import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { register } from "../api/authApi";
import { useAuthStore } from "../stores/authStore";

function Register() {

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const navigate = useNavigate();
	const setUser = useAuthStore((state) => state.setUser);

	
	const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			toast.error("Passwords do not match");
			return;
		}

		try {
			const data = await register(name, email, password, confirmPassword);
			console.log(data);
			setUser(data.user);
			toast.success("Account successfully created");
			navigate("/");
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "An unexpected error occurred");
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
								Welcome
							</h1>

							<p className="mt-1 text-sm text-base-content/60">
								Track your applications. Land your next opportunity.
							</p>
						</div>

						<form onSubmit={handleSubmit} className="space-y-3">

							<fieldset className="fieldset">
								<legend className="fieldset-legend">
									Name
								</legend>

								<input
									type="text"
									className="input w-full"
									placeholder="john doe"
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
								/>
							</fieldset>

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
									required
								/>
							</fieldset>

							<fieldset className="fieldset">
								<legend className="fieldset-legend">
									Password
								</legend>

								<input
									type="password"
									className="input w-full"
									placeholder="••••••••"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
							</fieldset>

							<fieldset className="fieldset">
								<legend className="fieldset-legend">
									Confirm Password
								</legend>

								<input
									type="password"
									className="input w-full"
									placeholder="••••••••"
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
									required
								/>
							</fieldset>

							<button
								type="submit"
								className="btn btn-primary w-full mt-2"
							>
								Create an account
							</button>
						</form>

						<div className="divider text-xs text-base-content/40">
							OR
						</div>

						<p className="text-center text-sm text-base-content/60">
							Already have an account?{" "}
							<Link
								to="/login"
								className="font-medium text-primary hover:underline"
							>
								Login
							</Link>
						</p>
					</div>
				</div>

			</div>
		</div>
	);
}

export default Register