interface SubmitButtonProps {
	loading: boolean;
	children: React.ReactNode;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
	loading,
	children,
}) => (
	<button type="submit" className="submit-button" disabled={loading}>
		{loading ? <span className="spinner">⏳</span> : children}
	</button>
);
