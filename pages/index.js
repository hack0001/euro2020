import React, { useState } from "react";
import Head from "next/head";
import Nav from "../components/nav";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ProTip from "../src/ProTip";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import styles from "../styles/index.module.sass";
import Copyright from "../src/Copyright";
import apiRequest from "../components/apiRequest/prodRequest";
import { LIST_MATCHES, DELETE_MATCH, UPDATE_MATCH } from "../graphql/match";
import Image from "next/image";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Paper from "@material-ui/core/Paper";
import Dialog from "../components/dialog";
const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
});

const Home = ({ databaseMatches }) => {
	const classes = useStyles();
	const [matches, setMatches] = useState(
		databaseMatches.data.listMatches.items,
	);

	const [selectedMatch, setSelectedMatch] = useState({});
	const [prediction, setPredictions] = useState({
		userName: "",
		teamName: "",
		predictions: [],
	});
	const [open, setOpen] = useState(false);
	const handleClickOpen = id => {
		const filteredMatch = matches.filter(x => x.id === id)[0];
		setSelectedMatch({
			id: filteredMatch.id,
			venue: filteredMatch.venue,
			homeTeam: filteredMatch.homeTeam.country,
			awayTeam: filteredMatch.awayTeam.country,
			homeTeamGoals: filteredMatch.homeTeamGoals,
			awayTeamGoals: filteredMatch.awayTeamGoals,
			group: filteredMatch.matchGroup.group,
			date: filteredMatch.date,
			kickoff: filteredMatch.kickoff,
		});
		setOpen(true);
	};

	const handleClose = async () => {
		try {
			await apiRequest({
				query: UPDATE_MATCH,
				operationName: "updateMatch",
				variables: {
					input: {
						id: selectedMatch.id,
						homeTeamGoals: Number(selectedMatch.homeTeamGoals),
						awayTeamGoals: Number(selectedMatch.awayTeamGoals),
					},
				},
			});

			const filteredMatch = matches.filter(x => x.id === selectedMatch.id)[0];
			const updatedMatch = {
				...filteredMatch,
				homeTeamGoals: Number(selectedMatch.homeTeamGoals),
				awayTeamGoals: Number(selectedMatch.awayTeamGoals),
			};

			const a = matches.map(obj =>
				obj.id === updatedMatch.id ? updatedMatch : obj,
			);
			setMatches(a);
		} catch (err) {
			console.log("Error occurred", err);
		}
		setSelectedMatch({});
		setOpen(false);
	};

	const sendPredictions = () => {
		console.log("Predictions", prediction);
	};
	const sendDelete = async id => {
		try {
			await apiRequest({
				query: DELETE_MATCH,
				operationName: "deleteMatch",
				variables: {
					id,
				},
			});

			const a = matches.slice();
			a.splice(
				matches.findIndex(i => {
					return i.id === id;
				}),
				1,
			);
			setMatches(a);
		} catch (err) {
			console.log("Error occurred", err);
		}
	};

	return (
		<div>
			<Head>
				<title>Home</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Nav />
			<Container maxWidth="lg" className={styles.container}>
				<Box my={4}>
					<div className={styles.imageWrap}>
						<Image src="/euro_cover.webp" width="248px" height="142px" />
					</div>
					<Typography variant="h1" component="h1" gutterBottom>
						Euro 2020 Predictor
					</Typography>
					<div className={styles.formWrap}>
						{[
							{
								type: "text",
								label: "User Name",
								id: "userName",
							},
							{
								type: "text",
								label: "Team Name",
								id: "teamName",
							},
							{
								type: "email",
								label: "Email",
								id: "email",
							},
						].map(form => {
							return (
								<div className={styles.indivForm} key={form.id}>
									<FormControl variant="outlined" style={{ width: "60%" }}>
										<TextField
											id={form.id}
											label={form.label}
											type={form.type}
											InputLabelProps={{
												shrink: true,
											}}
											value={prediction[form.id]}
											onChange={e =>
												setPredictions({
													...prediction,
													[form.id]: e.target.value,
												})
											}
										/>
									</FormControl>
								</div>
							);
						})}
					</div>

					<TableContainer component={Paper}>
						<Table className={classes.table} aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell>Date</TableCell>
									<TableCell align="left">Kickoff</TableCell>

									<TableCell align="left">Home</TableCell>
									<TableCell align="left">Score</TableCell>
									<TableCell align="left">Away</TableCell>
									<TableCell align="center">Group</TableCell>
									{prediction.userName === "Tom" && (
										<>
											<TableCell align="center">Update</TableCell>
											<TableCell align="center">Delete</TableCell>
										</>
									)}
								</TableRow>
							</TableHead>
							<TableBody>
								{matches
									.sort((a, b) => a.kickoff.localeCompare(b.kickoff))
									.sort((a, b) => a.date.localeCompare(b.date))
									.map(match => {
										return (
											<TableRow key={match.name}>
												<TableCell component="th" scope="row">
													{match.date}
												</TableCell>
												<TableCell align="left">{match.kickoff}</TableCell>
												<TableCell align="left">
													<div
														style={{ display: "flex", flexDirection: "row" }}
													>
														<Image
															src={`/svg/${match.homeTeam.flagCode}.svg`}
															width="25px"
															height="25px"
														/>
														<span
															style={{
																paddingTop: "2px",
																margin: "0rem 0.5rem",
															}}
														>
															{match.homeTeam.country}
														</span>
													</div>
												</TableCell>
												<TableCell align="left">
													{match.homeTeamGoals} : {match.awayTeamGoals}
												</TableCell>
												<TableCell align="left">
													<div
														style={{ display: "flex", flexDirection: "row" }}
													>
														<Image
															src={`/svg/${match.awayTeam.flagCode}.svg`}
															width="25px"
															height="25px"
														/>
														<span
															style={{
																paddingTop: "2px",
																margin: "0rem 0.5rem",
															}}
														>
															{match.awayTeam.country}{" "}
														</span>
													</div>
												</TableCell>
												<TableCell align="center">
													{match.matchGroup.group}
												</TableCell>
												{prediction.userName === "Tom" && (
													<>
														<TableCell align="center">
															<Button
																variant="contained"
																color="primary"
																onClick={() => handleClickOpen(match.id)}
															>
																Update
															</Button>
														</TableCell>
														<TableCell align="center">
															<Button
																variant="contained"
																color="primary"
																onClick={() => sendDelete(match.id)}
															>
																Delete
															</Button>
														</TableCell>
													</>
												)}
											</TableRow>
										);
									})}
							</TableBody>
						</Table>
					</TableContainer>
					<div className={styles.bottomButton}>
						<Button
							variant="contained"
							color="primary"
							onClick={sendPredictions}
						>
							Submit
						</Button>
					</div>
					{open && (
						<Dialog
							open={open}
							handleClose={handleClose}
							selectedMatch={selectedMatch}
							setSelectedMatch={setSelectedMatch}
						/>
					)}
					<ProTip />
					<Copyright />
				</Box>
			</Container>
		</div>
	);
};

export async function getStaticProps() {
	const databaseMatches = await apiRequest({
		query: LIST_MATCHES,
		operationName: "listMatches",
	});

	return {
		props: {
			databaseMatches,
		},
		// Next.js will attempt to re-generate the page:
		// - When a request comes in
		// - At most once every second
		revalidate: 10, // In seconds
	};
}

export default Home;
