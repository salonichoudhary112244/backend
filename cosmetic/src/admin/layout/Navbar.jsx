export default function Navbar() {
  return (
    <div className="h-16 bg-pink-100 flex items-center justify-between px-6 border-b">
      <h1 className="text-xl font-bold text-pink-600">
        SALONI Admin
      </h1>

      <div className="flex items-center gap-3">
        <span className="text-gray-600">Admin</span>
        <div className="w-8 h-8 rounded-full bg-pink-400 text-white flex items-center justify-center">
          A
        </div>
      </div>
    </div>
  );
}
