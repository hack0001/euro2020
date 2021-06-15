import React, { useState } from "react";
import Head from "next/head";
import Nav from "../components/nav";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import styles from "../styles/group.module.sass";
import apiRequest from "../components/apiRequest/prodRequest";
import { CREATE_GROUP } from "../graphql/group";

const Group = () => {
	const [groupDetails, setGroupDetails] = useState({
		group: "",
	});
	const [errors, setErrors] = useState(false);

	const createGroup = async () => {
		if (!groupDetails.group) {
			setErrors(true);
			return;
		}
		if (errors) setErrors(false);
		try {
			await apiRequest({
				query: CREATE_GROUP,
				operationName: "CreateGroup",
				variables: {
					input: {
						...groupDetails,
						group: groupDetails.group.toUpperCase().trim(),
					},
				},
			});
			setGroupDetails({
				group: "",
			});
		} catch (err) {
			console.log("Error occurred", err);
		}
	};

	return (
		<div>
			<Head>
				<title>Create Group</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Nav />

			<div className={styles.hero}>
				<h1 className="title">Create a Group</h1>
				<p className="description">Start Creating Groups Here</p>

				<form noValidate autoComplete="off" className={styles.form}>
					<div>
						{[
							{
								label: "Group",
								value: "group",
							},
						].map(form => {
							return (
								<FormControl variant="outlined" style={{ width: "100%" }}>
									<TextField
										error={errors}
										value={groupDetails[form.value]}
										onChange={e =>
											setGroupDetails({
												...groupDetails,
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
						<Button variant="contained" color="primary" onClick={createGroup}>
							Create
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Group;
