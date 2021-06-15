import React, { useState } from "react";
import Head from "next/head";
import Nav from "../components/nav";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import styles from "../styles/group.module.sass";
import apiRequest from "../components/apiRequest/prodRequest";
import { CREATE_ROUND } from "../graphql/round";

const Round = () => {
	const [roundDetails, setRoundDetails] = useState({
		round: "",
	});
	const [errors, setErrors] = useState(false);

	const createRound = async () => {
		if (!roundDetails.round) {
			setErrors(true);
			return;
		}
		if (errors) setErrors(false);
		try {
			await apiRequest({
				query: CREATE_ROUND,
				operationName: "CreateRound",
				variables: {
					input: {
						...roundDetails,
						round: roundDetails.round.trim(),
					},
				},
			});
			setRoundDetails({
				round: "",
			});
		} catch (err) {
			console.log("Error occurred", err);
		}
	};

	return (
		<div>
			<Head>
				<title>Create Round</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Nav />

			<div className={styles.hero}>
				<h1 className="title">Create a Round</h1>
				<p className="description">Start Creating Rounds Here</p>

				<form noValidate autoComplete="off" className={styles.form}>
					<div>
						{[
							{
								label: "Round",
								value: "round",
							},
						].map(form => {
							return (
								<FormControl variant="outlined" style={{ width: "100%" }}>
									<TextField
										error={errors}
										value={roundDetails[form.value]}
										onChange={e =>
											setRoundDetails({
												...roundDetails,
												[form.value]: e.target.value,
											})
										}
										label={form.label}
									></TextField>
								</FormControl>
							);
						})}
					</div>

					<div className={styles.sendButton}>
						<Button variant="contained" color="primary" onClick={createRound}>
							Create
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Round;
