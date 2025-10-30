export default function StatusFilter({ selected, onChange }) {
  const statuses = ['All', 'Planned', 'In Progress', 'Completed', 'Rejected'];
  return (
    <div>
      {statuses.map((status) => (
        <button
          key={status}
          style={{ fontWeight: selected === status ? 'bold' : 'normal', margin: '0 4px' }}
          onClick={() => onChange(status)}
        >
          {status}
        </button>
      ))}
    </div>
  );
}
