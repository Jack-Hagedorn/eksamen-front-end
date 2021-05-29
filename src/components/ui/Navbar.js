import { NavLink } from "react-router-dom";
import { useAuth } from "../../routes/ProvideAuth";

export const Navbar = () => {
	const auth = useAuth();
	const user = auth.user;

	return (
		<nav className="navbar">
			<div className="container">
				<NavLink to="/" className="navbar-brand">
					Start Code
				</NavLink>
				<span className="navbar-text text-monospace">v2.0</span>

				<ul className="ml-auto navbar-nav">
					{
						/**
						 *
						 * If user isn't set, show login button.
						 * Else show user dropdown.
						 *
						 *  */

						!user ? (
							<li className="nav-item d-flex align-items-center">
								<NavLink role="button" to="/sign-in" className="nav btn btn-primary">
									Sign in
								</NavLink>
							</li>
						) : (
							<li className="nav-item dropdown with-arrow">
								<button className="nav-link" data-toggle="dropdown" id="nav-link-dropdown-toggle">
									{user.username}
								</button>
								<div className="dropdown-menu dropdown-menu-right" aria-labelledby="nav-link-dropdown-toggle">
									<NavLink to="/settings" className="dropdown-item">
										Settings
									</NavLink>
									<div className="dropdown-divider"></div>
									<div className="dropdown-content">
										<button className="btn btn-block btn-danger" onClick={auth.logout}>
											Sign out
										</button>
									</div>
								</div>
							</li>
						)
					}
				</ul>
			</div>
		</nav>
	);
};
