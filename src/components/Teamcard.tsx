type TeamCardProps = {
  name: string;
  tag: string;
  logo_url: string;
};

export default function TeamCard({ name, tag, logo_url }: TeamCardProps) {
  return (
    <div className="border rounded shadow p-4 flex flex-col items-center">
      <img src={logo_url} alt={name} className="w-24 h-24 object-contain"/>
      <h2 className="font-bold mt-2">{name}</h2>
      <p className="text-gray-500">{tag}</p>
    </div>
  );
}
