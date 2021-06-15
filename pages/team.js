import React, { useState } from "react";
import Head from "next/head";
import Nav from "../components/nav";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import styles from "../styles/group.module.sass";
import apiRequest from "../components/apiRequest/prodRequest";
import { LIST_GROUPS } from "../graphql/group";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { CREATE_TEAM } from "../graphql/team";
import { cleanCapitalise } from "../helper/helper";

const Team = ({ listGroups }) => {
	const [teamDetails, setTeamDetails] = useState({
		teamName: "",
		country: "",
		groupId: "",
		flagCode: "",
	});
	const [errors, setErrors] = useState(false);

	const createTeam = async () => {
		if (!teamDetails.teamName || !teamDetails.groupId) {
			setErrors(true);
			return;
		}
		if (errors) setErrors(false);

		const cleanName = cleanCapitalise(teamDetails.teamName);
		try {
			await apiRequest({
				query: CREATE_TEAM,
				operationName: "CreateTeam",
				variables: {
					input: {
						...teamDetails,
						country: cleanName,
						teamName: cleanName,
						flagCode: teamDetails.flagCode.trim(),
					},
				},
			});
			setTeamDetails({ teamName: "", country: "", groupId: "", flagCode: "" });
		} catch (err) {
			console.log("Error occurred", err);
		}
	};

	return (
		<div>
			<Head>
				<title>Create Team</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Nav />

			<div className={styles.hero}>
				<h1 className="title">Create a Team</h1>
				<p className="description">Start Creating teams Here</p>

				<form noValidate autoComplete="off">
					<div>
						{[
							{
								label: "Team",
								value: "teamName",
							},
							{
								label: "Group",
								value: "groupId",
								type: "select",
								data: listGroups.items.sort((a, b) =>
									a.group.localeCompare(b.group),
								),
							},
							{
								label: "Flag Code",
								value: "flagCode",
							},
						].map(form => {
							if (form.type === "select") {
								return (
									<FormControl
										variant="outlined"
										key={form.label}
										style={{ width: "100%", margin: "2rem 0rem" }}
										error={errors}
									>
										<InputLabel>{form.label}</InputLabel>
										<Select
											value={teamDetails[form.value]}
											onChange={e =>
												setTeamDetails({
													...teamDetails,
													[form.value]: e.target.value,
												})
											}
											label={form.label}
										>
											<MenuItem value="" key={1}>
												<em>None</em>
											</MenuItem>
											{form.data.map(group => {
												return (
													<MenuItem key={group.id} value={group.id}>
														{group.group}
													</MenuItem>
												);
											})}
										</Select>
									</FormControl>
								);
							}
							return (
								<div key={form.label}>
									<FormControl variant="outlined" style={{ width: "100%" }}>
										<TextField
											error={errors}
											value={teamDetails[form.value]}
											onChange={e =>
												setTeamDetails({
													...teamDetails,
													[form.value]: e.target.value,
												})
											}
											label={form.label}
										></TextField>
									</FormControl>
								</div>
							);
						})}
					</div>
					<div className={styles.sendButton}>
						<Button variant="contained" color="primary" onClick={createTeam}>
							Create
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export async function getStaticProps() {
	const { data } = await apiRequest({
		query: LIST_GROUPS,
		operationName: "listGroups",
	});

	return {
		props: data,
		// Next.js will attempt to re-generate the page:
		// - When a request comes in
		// - At most once every second
		revalidate: 10, // In seconds
	};
}

export default Team;
