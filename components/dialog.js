import { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
const MatchDialog = ({
	open,
	handleClose,
	selectedMatch,
	setSelectedMatch,
}) => {
	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="form-dialog-title"
		>
			<DialogTitle id="form-dialog-title">Update Match</DialogTitle>
			<DialogContent>
				<DialogContentText>Update the selected match here</DialogContentText>

				{[
					{
						label: "Venue",
						value: "venue",
						readOnly: true,
					},
					{
						label: "Home Team",
						value: "homeTeam",
						readOnly: true,
					},
					{
						label: "Home Goals",
						value: "homeTeamGoals",
						type: "number",
						readOnly: false,
					},

					{
						label: "Away Goals",
						value: "awayTeamGoals",
						type: "number",
						readOnly: true,
					},
					{
						label: "Away Team",
						value: "awayTeam",
						readOnly: false,
					},
					{
						label: "Round",
						value: "group",
						readOnly: true,
					},

					{
						label: "Date",
						type: "date",
						value: "date",
						defaultValue: new Date(),
						readOnly: true,
					},
					{
						label: "Kickoff",
						type: "time",
						value: "kickoff",
						defaultValue: new Date(),
						readOnly: true,
					},
				].map(form => {
					return (
						<div>
							<FormControl
								variant="outlined"
								style={{ width: "100%", margin: "2rem 0rem" }}
							>
								<TextField
									id={form.type}
									label={form.label}
									readOnly={form.readOnly}
									type={form.type}
									defaultValue={form.defaultValue}
									InputLabelProps={{
										shrink: true,
									}}
									autoComplete="off"
									value={selectedMatch[form.value]}
									onChange={e =>
										setSelectedMatch({
											...selectedMatch,
											[form.value]: e.target.value,
										})
									}
								/>
							</FormControl>
						</div>
					);
				})}
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary">
					Cancel
				</Button>
				<Button onClick={handleClose} color="primary">
					Update
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default MatchDialog;
