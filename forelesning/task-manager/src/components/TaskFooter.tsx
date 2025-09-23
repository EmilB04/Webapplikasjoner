export default function TaskFooter({ text }: { text?: string }) {
  return (
    <footer>
      <p>
        {text || "Task Manager"} &copy; {new Date().getFullYear()}
      </p>
    </footer>
  );
}
