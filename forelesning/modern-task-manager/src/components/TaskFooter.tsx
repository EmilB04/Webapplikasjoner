export default function TaskFooter({text}: {
    text?: string
}) {
    return (
        <footer className="app-footer">
            <p>{text ?? 'Modern Task Manager'} &copy; {new Date().getFullYear()}</p>
            <p className="footer-subtitle">Built with React & TypeScript</p>
        </footer>
    )
}