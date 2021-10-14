import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = (props) => {
	const [users, setusers] = useState([]);
  const [user,setuser]=useState("");

	useEffect(() => {
		const getAllUsers = async () => {
			const usersData = await axios.get("http://localhost:4000/allData", { withCredentials: true });
			if (usersData.status !== 200) {
				props.history.push("/");
			}else{
			setusers(usersData.data.data);
      setuser(usersData.data.user)
    }
		};
		getAllUsers();
	}, [props]);
	return (
		<div className="container">
      <p style={{ textAlign: "right", fontSize: "15px", fontWeight: "700",marginBottom:"30px" }}>Current User:{user}</p>
			<p style={{ textAlign: "center", fontSize: "25px", fontWeight: "700" }}>Table of all Users</p>
			<table className="table">
				<thead className="thead-dark">
					<tr>
						<th scope="col">#</th>
						<th scope="col">UserName</th>
						<th scope="col">Email</th>
						<th scope="col">Mobile Number</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user, index) => {
						return (
							<tr key={user._id}>
								<th scope="row">{index}</th>
								<td>{user.userName}</td>
								<td>{user.email}</td>
								<td>{user.mobileNumber}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default Dashboard;
