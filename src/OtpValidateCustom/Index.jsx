import React, { useEffect, useRef, useState } from "react";
import "./index.css";

const OtpValidateCustomIndex = ({ digitLength = 6 }) => {
	const [otpValues, setOtpValues] = useState(new Array(digitLength).fill(""));
	const inputRefs = useRef([]);

	useEffect(() => {
		inputRefs.current[0]?.focus();
	}, []);

	const handleChangeOtpInput = (value, index) => {
		if (isNaN(value)) return;

		const updatedOtpValues = [...otpValues];
		const cleanValue = value.trim().slice(-1);

		updatedOtpValues[index] = cleanValue;
		setOtpValues(updatedOtpValues);

		if (cleanValue && index < digitLength - 1) {
			inputRefs.current[index + 1]?.focus();
		}
	};

	const handleBackspaceKey = (e, index) => {
		if (e.key === "Backspace" && !otpValues[index] && index > 0) {
			inputRefs.current[index - 1]?.focus();
		}
	};

	const handlePasteOtp = (e) => {
		e.preventDefault();
		const pastedData = e.clipboardData.getData("text").trim();
		if (!/^\d+$/.test(pastedData)) return;

		const pastedArray = pastedData.slice(0, digitLength).split("");
		const updatedOtpValues = [...otpValues];

		pastedArray.forEach((char, idx) => {
			if (idx < digitLength) {
				updatedOtpValues[idx] = char;
			}
		});
		setOtpValues(updatedOtpValues);

		const nextIndex =
			pastedArray.length >= digitLength ? digitLength - 1 : pastedArray.length;
		inputRefs.current[nextIndex]?.focus();
	};

	const handleSetRef = (el, index) => {
		inputRefs.current[index] = el;
	};

	const otpString = otpValues.join("");

	return (
		<div className="otp-container">
			<h1>OTP Validation</h1>
			<div className="otp-input-wrapper">
				{otpValues.map((value, index) => (
					<input
						key={index}
						ref={(el) => handleSetRef(el, index)}
						className="otp-input"
						type="text"
						inputMode="numeric"
						autoComplete="one-time-code"
						value={value}
						maxLength={1}
						onChange={(e) => handleChangeOtpInput(e.target.value, index)}
						onKeyDown={(e) => handleBackspaceKey(e, index)}
						onPaste={handlePasteOtp}
					/>
				))}
			</div>
			<p>Entered OTP: {otpString}</p>
		</div>
	);
};

export default OtpValidateCustomIndex;
