export function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div className="border p-4">
      <h1 className="border-b pb-2 text-xl">{title}</h1>
      <p>{children}</p>
    </div>
  );
}
