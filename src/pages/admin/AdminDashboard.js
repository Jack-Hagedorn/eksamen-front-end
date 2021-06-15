import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { useEffect, useState } from "react";
import { useAuth } from "../../providers/ProvideAuth";
import { API_MAIN } from "../../utils/api";

dayjs.extend(relativeTime);

export const AdminDashboard = () => {
	const [users, setUsers] = useState([]);
	const [formData, setFormData] = useState({ projectname: "", projectdescription: "" })

	useEffect(() => {
		const doAsynchronousCall = async () => {
			const response = await API_MAIN.get("project/all");
			setUsers(response.data);
		};
		doAsynchronousCall();
	}, []);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(formData.projectname)
		console.log(formData.projectdescription)
		await fetch('https://hagedorn.live/Eksamen/api/project', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: formData.projectname,
				description: formData.projectdescription
			})
		}).then(res => {
			return res.json()

		})
			.then(data => console.log(data))
			.catch(error => console.log('ERROR'))
	}



	return (
		<div className="container">
			<div className="content">
				<h1>Dashboard</h1>
				<section>
					<h2>Projects</h2>
					<p>Displaying all ({users.length}) users.</p>
					<table className="table table-bordered">
						<thead>
							<tr>
								<th>Project name</th>
								<th>Description</th>
							</tr>
						</thead>
						<tbody>
							{console.log(users)}
							{users.map((project) => (
								<tr key={project.id}>
									<td>{project.name}</td>
									<td>{project.description}</td>
								</tr>
							))}
						</tbody>
					</table>
				</section>
				<section>
					<h2>Create new Project</h2>
					<form onChange={handleChange} onSubmit={handleSubmit} className="w-400 mw-full">
						<div className="form-group">
							<label htmlFor="projectname" className="required">
								Project Name
							</label>
							<input type="text" className="form-control" id="projectname" name="projectname" placeholder="Project Name" required="required" />
						</div>
						<div className="form-group">
							<label htmlFor="projectdescription" className="required">
								Project Description
							</label>
							<input type="text" name="projectdescription" className="form-control" id="projectdescription" placeholder="Project Description" required="required" />
						</div>
						<input className="btn btn-primary btn-block" type="submit" value="Create project" />
					</form>
				</section>
			</div>
		</div>
	);
};
