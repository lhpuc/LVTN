import React from "react";
import { Alert } from "antd";

const AlertDialog = ({ isOpen, onClose, type, message, closable }) => {
	return (
		<>
			{isOpen && (
				<Alert
					style={{ margin: "20px 0" }}
					message={message}
					type={type}
					closable={closable !== undefined ? closable : "true"}
					onClose={onClose}
				/>
			)}
		</>
	);
};

export default AlertDialog;
