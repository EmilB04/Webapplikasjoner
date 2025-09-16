export default function TaskFooter({text}: {text?: string}) {
    return (
        <footer>
            {text || "Dette er footeren"}
        </footer>
    );
}