

export default function Component() {

  if (true) {
    return (
      <div className="flex items-center gap-2">
        <p className="text-sm font-normal">email </p>
        <button
          className="bg-red-50 p-1 text-sm font-normal"
        >
          Sign out
        </button>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2">
      <button
        className="bg-primary-50 p-1 text-sm font-normal"
      >
        Sign in
      </button>
    </div>
  );
}
