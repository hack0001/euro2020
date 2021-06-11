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
const Home = () => {
	const [prediction, setPredictions] = useState({
		userName: "",
		teamName: "",
		predictions: [],
	});

	const sendPredictions = () => {
		console.log("Predictions", prediction);
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
								<div className={styles.indivForm}>
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
					<Button variant="contained" color="primary" onClick={sendPredictions}>
						Submit
					</Button>
					<ProTip />
					<Copyright />
				</Box>
			</Container>
		</div>
	);
};

export default Home;
