export default function TaskButton() {
  const onButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Button was clicked', e.currentTarget);
  };

  return <button onClick={onButtonClick}>En knapp du kan trykke på</button>;
}
