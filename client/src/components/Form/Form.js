import { Button, Paper, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import useStyles from "./styles";

const Form = ({ currentId, setCurrentId }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [postData, setPostData] = useState({
		author: "",
		title: "",
		content: "",
		tags: "",
		selectedFile: "",
	});
	const post = useSelector((state) =>
		currentId ? state.posts.find((p) => p._id === currentId) : null
	);

	useEffect(() => {
		if (post) {
			setPostData(post);
		}
	}, [post]);

	const [fileNameState, setFileNameState] = useState(0);

	const clear = () => {
		setCurrentId(0);
		setPostData({
			author: "",
			title: "",
			content: "",
			tags: "",
			selectedFile: "",
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setFileNameState(1);

		if (currentId === 0) {
			dispatch(createPost(postData));
			clear();
		} else {
			dispatch(updatePost(currentId, postData));
			clear();
		}
	};

	return (
		<Paper className={classes.paper}>
			<form
				autoComplete="off"
				noValidate
				className={`${classes.root} ${classes.form}`}
				onSubmit={handleSubmit}
			>
				<Typography variant="h6">
					{currentId ? "Editing" : "Create"} a Journal Entry
				</Typography>
				<TextField
					name="author"
					variant="outlined"
					label="Author"
					fullWidth
					value={postData.author}
					onChange={(e) => setPostData({ ...postData, author: e.target.value })}
				></TextField>
				<TextField
					name="title"
					variant="outlined"
					label="Title"
					fullWidth
					value={postData.title}
					onChange={(e) => setPostData({ ...postData, title: e.target.value })}
				></TextField>
				<TextField
					name="content"
					variant="outlined"
					label="Content"
					fullWidth
					value={postData.content}
					onChange={(e) =>
						setPostData({ ...postData, content: e.target.value })
					}
				></TextField>
				<TextField
					name="tags"
					variant="outlined"
					label="Tags"
					fullWidth
					value={postData.tags}
					onChange={(e) => setPostData({ ...postData, tags: e.target.value.trim().split(',') })}
				></TextField>
				<div className={classes.fileInput} ref={()=>{setFileNameState(0)}}>
					<FileBase
						type="file"
						multiple={false}
						key={fileNameState}
						onDone={({ base64 }) =>
							setPostData({ ...postData, selectedFile: base64 })
						}
					></FileBase>
				</div>
				<Button
					className={classes.buttonSubmit}
					variant="contained"
					color="primary"
					size="large"
					type="submit"
					fullWidth
				>
					Submit
				</Button>
				<Button
					variant="contained"
					color="secondary"
					size="small"
					onClick={clear}
					fullWidth
				>
					Clear
				</Button>
			</form>
		</Paper>
	);
};

export default Form;
