"use client";

export const TextInput = ({
  placeholder,
  onChange,
  label,
}: {
  placeholder: string;
  onChange: (value: string) => void;
  label: string;
}) => {
  return (
    <div className="pt-2">
      <label className="mb-2 block text-sm font-medium text-gray-900">
        {label}
      </label>
      <input
        onChange={(e) => onChange(e.target.value)}
        type="text"
        id="first_name"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        placeholder={placeholder}
      />
    </div>
  );
};
