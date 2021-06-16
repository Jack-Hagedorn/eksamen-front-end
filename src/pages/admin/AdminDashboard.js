import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { useEffect, useState } from "react";
import { useAuth } from "../../providers/ProvideAuth";
import { API_MAIN } from "../../utils/api";

dayjs.extend(relativeTime);

export const AdminDashboard = () => {
	const [developers, setDevelopers] = useState([]);
	const [projects, setProjects] = useState([]);
	const [formData1, setFormData1] = useState({ projectname: "", projectdescription: "" })
	const [formData2, setFormData2] = useState({ projectid: "", developerid: "" })

	useEffect(() => {
		const doAsynchronousCall = async () => {
			const response = await API_MAIN.get("project/all");
			setProjects(response.data);
		};
		doAsynchronousCall();
	}, []);

	useEffect(() => {
		const doAsynchronousCall2 = async () => {
			const response2 = await API_MAIN.get("developer/all");
			setDevelopers(response2.data);
		};
		doAsynchronousCall2();
	}, [])

	const handleChange1 = (e) => {
		setFormData1({ ...formData1, [e.target.name]: e.target.value });
	};

	const handleSubmit1 = async (e) => {
		e.preventDefault();
		await fetch('https://hagedorn.live/Eksamen/api/project', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: formData1.projectname,
				description: formData1.projectdescription
			})
		}).then(res => {
			return res.json()

		})
			.then(data => console.log(data))
			.catch(() => console.log('ERROR'))
	}

	const handleChange2 = (e) => {
		setFormData2({ ...formData2, [e.target.name]: e.target.value });
	};

	const handleSubmit2 = (e) => {
		e.preventDefault();
		fetch('https://hagedorn.live/Eksamen/api/project/' + formData2.projectid, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id: String(formData2.developerid)
			})
		}).then(res => {
			return res.json()
		})
			.then(data => console.log(data))
			.catch(() => console.log('ERROR'))
	}


	return (
		<div className="container">
			<div className="content">
				<h1>Dashboard</h1>
				<section>
					<h2>Projects</h2>
					<p>Displaying all ({projects.length}) projects.</p>
					<table className="table table-bordered">
						<thead>
							<tr>
								<th>Project ID</th>
								<th>Project name</th>
								<th>Description</th>
							</tr>
						</thead>
						<tbody>
							{projects.map((project) => (
								<tr key={project.id}>
									<td>{project.id}</td>
									<td>{project.name}</td>
									<td>{project.description}</td>
								</tr>
							))}
						</tbody>
					</table>
				</section>
				<section>
					<h2>Developers</h2>
					<p>Displaying all ({developers.length}) developers.</p>
					<table className="table table-bordered">
						<thead>
							<tr>
								<th>Developer ID</th>
								<th>Developer Name</th>
								<th>Developer Email</th>
								<th>Developer Phone</th>
							</tr>
						</thead>
						<tbody>
							{console.log(developers)}
							{developers.map((developer) => (
								<tr key={developer.id}>
									<td>{developer.id}</td>
									<td>{developer.name}</td>
									<td>{developer.email}</td>
									<td>{developer.phone}</td>
								</tr>
							))}
						</tbody>
					</table>
				</section>
				<div className="container-fluid">
					<div className="row">
						<div className="col-xl-6">
							<h2>Create new Project</h2>
							<form onChange={handleChange1} onSubmit={handleSubmit1} className="w-400 mw-full">
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
						</div>
						<div className="col-xl-6">
							<h2>Add Developer to Project</h2>
							<form onChange={handleChange2} onSubmit={handleSubmit2} className="w-400 mw-full">
								<div className="form-group">
									<label htmlFor="projectid" className="required">
										Project ID
									</label>
									<input type="number" className="form-control" id="projectid" name="projectid" placeholder="Project ID" required="required" />
								</div>
								<div className="form-group">
									<label htmlFor="developerid" className="required">
										Developer ID
									</label>
									<input type="number" className="form-control" id="developerid" name="developerid" placeholder="Developer ID" required="required" />
								</div>
								<input className="btn btn-primary btn-block" type="submit" value="Add Developer" />
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
