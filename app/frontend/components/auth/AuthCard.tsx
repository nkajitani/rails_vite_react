type AuthCardProps = {
	title: string;
	subtitle: string;
	children?: React.ReactNode;
	footer?: React.ReactNode;
};

export const AuthCard: React.FC<AuthCardProps> = ({
	title,
	subtitle,
	children,
	footer,
}) => (
	<div className="auth-card">
		<div className="auth-header">
			<h1>{title}</h1>
			<p>{subtitle}</p>
		</div>

		{children}

		{footer && <div className="auth-footer">{footer}</div>}
	</div>
);
