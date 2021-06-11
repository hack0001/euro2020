import React, { useState } from "react";
import Head from "next/head";
import Nav from "../components/nav";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Teams from "../data/team.json";
import Venues from "../data/venue.json";

const Home = () => {
	const [match, setMatch] = useState({
		homeTeam: "",
		awayTeam: "",
		date: "",
		kickoff: "",
		venue: "",
		homeGoals: "",
		awayGoals: "",
		group: "",
	});

	const sendMatch = () => {
		console.log("MATCH", match);
	};

	return (
		<div>
			<Head>
				<title>Create Match</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Nav />

			<div className="hero">
				<h1 className="title">Create a Match</h1>
				<p className="description">Start Creating Matches Here</p>
			</div>

			<form noValidate autoComplete="off">
				<div>
					{[
						{
							label: "Home Team",
							value: "homeTeam",
							data: Teams.teams,
							dataValue: "id",
							dataLabel: "label",
						},
						{
							label: "Away Team",
							value: "awayTeam",
							data: Teams.teams,
							dataValue: "id",
							dataLabel: "label",
						},
						{
							label: "Venue",
							value: "venue",
							data: Venues.venue,
							dataValue: "id",
							dataLabel: "label",
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
					].map(form => {
						if (form.data === "time") {
							return (
								<div>
									<FormControl variant="outlined" style={{ width: "25%" }}>
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
												setMatch({ ...match, [form.dataValue]: e.target.value })
											}
										/>
									</FormControl>
								</div>
							);
						}
						return (
							<FormControl variant="outlined" style={{ width: "25%" }}>
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
						);
					})}
				</div>

				<Button variant="contained" color="primary" onClick={sendMatch}>
					Create
				</Button>
			</form>
		</div>
	);
};

export default Home;
