export const Skills: React.FC<{ skills: string[] }> = ({ skills }) => {
  return (
    <div className="flex flex-wrap gap-1.5">
      {skills?.map((skill, index) => (
        <p
          className="rounded-2xl bg-secondary px-3 py-1 text-muted-foreground"
          key={index}
        >
          {skill}
        </p>
      ))}
    </div>
  );
};
