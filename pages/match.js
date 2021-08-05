import React, { useState } from "react";
import Head from "next/head";
import Nav from "../components/nav";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import styles from "../styles/group.module.sass";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Teams from "../data/team.json";
import Venues from "../data/venue.json";
import apiRequest from "../components/apiRequest/prodRequest";
import { LIST_GROUPS } from "../graphql/group";
import { LIST_TEAMS } from "../graphql/team";
import { LIST_ROUNDS } from "../graphql/round";
import { CREATE_MATCH } from "../graphql/match";

const Match = ({ groups, teams, rounds }) => {
	const [match, setMatch] = useState({
		homeTeam: "",
		awayTeam: "",
		date: "",
		kickoff: "",
		venue: "",
		homeGoals: "",
		awayGoals: "",
		groupId: "",
		roundId: "",
	});

	const [errors, setErrors] = useState(false);

	const sendMatch = async () => {
		if (!match.homeTeam || !match.awayTeam) {
			setErrors(true);
			return;
		}
		if (errors) setErrors(false);
		try {
			await apiRequest({
				query: CREATE_MATCH,
				operationName: "CreateMatch",
				variables: {
					input: {
						homeTeamId: match.homeTeam,
						awayTeamId: match.awayTeam,
						groupId: match.groupId,
						date: match.date,
						kickoff: match.kickoff,
						venue: match.venue,
						roundId: match.roundId,
					},
				},
			});
			setMatch({
				homeTeam: "",
				awayTeam: "",
				date: "",
				kickoff: "",
				venue: "",
				homeGoals: "",
				awayGoals: "",
				groupId: "",
				roundId: "",
			});
		} catch (err) {
			console.log("Error occurred", err);
		}
	};

	return (
		<div>
			<Head>
				<title>Create Match</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Nav />

			<div className={styles.hero}>
				<h1 className="title">Create a Match</h1>
				<p className="description">Start Creating Matches Here</p>

				<form noValidate autoComplete="off">
					<div style={{ width: "400px" }}>
						{[
							{
								label: "Venue",
								value: "venue",
								data: Venues.venue,
								dataValue: "id",
								dataLabel: "label",
							},
							{
								label: "Home Team",
								value: "homeTeam",
								data: teams.data.listTeams.items,
								dataValue: "id",
								dataLabel: "country",
							},
							{
								label: "Away Team",
								value: "awayTeam",
								data: teams.data.listTeams.items,
								dataValue: "id",
								dataLabel: "country",
							},
							{
								label: "Group",
								value: "groupId",
								data: groups.data.listGroups.items,
								dataValue: "id",
								dataLabel: "group",
							},
							{
								label: "Round",
								value: "roundId",
								data: rounds.data.listRounds.items,
								dataValue: "id",
								dataLabel: "round",
							},

							{
								label: "Date",
								data: "time",
								type: "date",
								dataValue: "date",
								defaultValue: new Date(),
							},
							{
								label: "Kickoff",
								data: "time",
								type: "time",
								dataValue: "kickoff",
								defaultValue: new Date(),
							},
						].map((form, index) => {
							if (form.data === "time") {
								return (
									<div key={index}>
										<FormControl
											variant="outlined"
											style={{ width: "100%", margin: "2rem 0rem" }}
										>
											<TextField
												id={form.type}
												label={form.label}
												type={form.type}
												defaultValue={form.defaultValue}
												InputLabelProps={{
													shrink: true,
												}}
												value={match[form.dataValue]}
												onChange={e =>
													setMatch({
														...match,
														[form.dataValue]: e.target.value,
													})
												}
											/>
										</FormControl>
									</div>
								);
							}
							return (
								<div key={index}>
									<FormControl
										variant="outlined"
										style={{ width: "100%", margin: "1rem 0rem" }}
									>
										<InputLabel>{form.label}</InputLabel>
										<Select
											value={match[form.value]}
											onChange={e =>
												setMatch({ ...match, [form.value]: e.target.value })
											}
											label={form.label}
										>
											<MenuItem value="">
												<em>None</em>
											</MenuItem>
											{form.data.map(team => {
												return (
													<MenuItem value={team[form.dataValue]}>
														{team[form.dataLabel]}
													</MenuItem>
												);
											})}
										</Select>
									</FormControl>
								</div>
							);
						})}
					</div>

					<Button variant="contained" color="primary" onClick={sendMatch}>
						Create
					</Button>
				</form>
			</div>
		</div>
	);
};

export async function getStaticProps() {
	const groups = await apiRequest({
		query: LIST_GROUPS,
		operationName: "listGroups",
	});
	const teams = await apiRequest({
		query: LIST_TEAMS,
		operationName: "listTeams",
	});
	const rounds = await apiRequest({
		query: LIST_ROUNDS,
		operationName: "listRounds",
	});

	return {
		props: {
			groups,
			teams,
			rounds,
		},
		// Next.js will attempt to re-generate the page:
		// - When a request comes in
		// - At most once every second
		revalidate: 10, // In seconds
	};
}

export default Match;
