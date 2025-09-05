import Input from "./Input";

function Form({ title, subtitle, fields, onSubmit, buttonText, footer }) {
  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
      {/* Heading */}
      <h2 className="text-2xl font-bold text-center mb-2">{title}</h2>
      {subtitle && <p className="text-gray-500 text-center mb-6">{subtitle}</p>}

      <form onSubmit={onSubmit} className="space-y-2">
        {fields.map((f, i) => (
          <Input key={i} {...f} />
        ))}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition"
        >
          {buttonText}
        </button>
      </form>

      {footer && <div className="mt-6 text-center text-sm">{footer}</div>}
    </div>
  );
}
export default Form;
