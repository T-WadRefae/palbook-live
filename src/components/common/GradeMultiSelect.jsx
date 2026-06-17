import { GRADES } from '../../utils/constants';

// Multi-grade toggle for teacher forms.
// A General lesson can serve several grades at once (e.g. [5, 7]),
// so it shows up under each of those grade filters for students.
const GradeMultiSelect = ({ value = [], onChange }) => {
  const toggle = (g) => {
    if (value.includes(g)) {
      onChange(value.filter((x) => x !== g));
    } else {
      onChange([...value, g].sort((a, b) => a - b));
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {GRADES.map((g) => {
        const active = value.includes(g);
        return (
          <button
            key={g}
            type="button"
            onClick={() => toggle(g)}
            className={`w-11 h-11 rounded-xl border-2 font-bold text-sm transition-all ${
              active
                ? 'border-secondary-500 bg-secondary-500 text-white shadow-kid'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-secondary-300'
            }`}
          >
            {g}
          </button>
        );
      })}
    </div>
  );
};

export default GradeMultiSelect;
