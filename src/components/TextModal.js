import React from "react";
import PrivacyPolicy from "../staticData/PrivacyPolicy";
import RefundPolicy from "../staticData/RefundPolicy";
import Terms from "../staticData/Terms";
function TextModal({ title, content, id }) {
	return (
		<div
			className="modal fade"
			id={id}
			tabIndex="-1"
			aria-labelledby={`${id}Label`}
			aria-hidden="true"
		>
			<div className="modal-dialog modal-dialog-scrollable">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title color-1" id={`${id}Label`}>
							{title}
						</h5>
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
						></button>
					</div>
					<div className="modal-body text-dark">
						{content === "1" ? (
							<RefundPolicy />
						) : content === "3" ? (
							<PrivacyPolicy />
						) : content === "2" ? (
							<Terms />
						) : null}
					</div>
					<div className="modal-footer">
						<button
							type="button"
							className="btn btn-danger"
							data-bs-dismiss="modal"
						>
							Close
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default TextModal;
